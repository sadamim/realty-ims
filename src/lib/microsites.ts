// src/lib/microsites.ts
//
// SERVER ONLY. The data-access layer, ported from RealtyFocus-API so that the
// Next app can render server-side straight from MongoDB.
//
// ---------------------------------------------------------------------------
// How this data is shaped
// ---------------------------------------------------------------------------
// The collections were imported verbatim from the old MySQL dump. Each document
// got a new ObjectId in `_id`, but every relationship still runs through the
// ORIGINAL MySQL primary keys, stored as STRINGS under their own names:
//
//   microsite.micro_id          "1"   <- legacy PK (NOT _id)
//   microsite_detail.micro_id   "12"  -> microsite.micro_id
//   microsite_detail.builder_id "6"   -> builder.builder_id
//   microsite_detail.type_id    "17"  -> prop_type.type_id
//   microsite_detail.status_id  "14"  -> prop_status.status_id
//   price.micro_id              "2"   -> microsite.micro_id
//   floor_plan.micro_id         "2"   -> microsite.micro_id
//
// Numeric columns (sqft, basic_cost, price, latitude, longitude) also arrived as
// strings and must be converted before any comparison — otherwise Mongo sorts
// them lexically and "9" ranks above "10000000".
// ---------------------------------------------------------------------------
import { getDb } from '@/lib/mongodb';

export interface MicrositeListItem {
  _id: string;
  micro_id: string;
  name: string;
  possession: string | null;
  city: string | null;
  zone: string | null;
  project_type: string | null;
  location: string;
  type: string;
  rooms: string;
  status: string | null;
  about: string | null;
  latitude: number | null;
  longitude: number | null;
  featured_image: string | null;
  builder_id: string | null;
  builder_name: string | null;
  logo: string | null;
  min_sqft: number | null;
  max_sqft: number | null;
  min_basic_cost: number | null;
  max_basic_cost: number | null;
}

// Convert a string column into a number, tolerating "", "N/A" and null.
const num = (expr: string) => ({
  $convert: { input: expr, to: 'double', onError: null, onNull: null },
});

const escapeRegex = (value: string) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// "3,5,9,11" -> ["3","5","9","11"]
const csvToIds = (value: unknown): string[] =>
  String(value ?? '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

const toNumber = (value: unknown): number | null => {
  const n = Number(String(value ?? '').replace(/[^\d.-]/g, ''));
  return Number.isFinite(n) ? n : null;
};

// ObjectId and Date are not serialisable across the server/client boundary.
const serialize = <T>(doc: T): T => JSON.parse(JSON.stringify(doc));

export const slugify = (name: string) =>
  String(name || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');

export interface MicrositeQuery {
  /** Case-insensitive exact match on microsite.project_type, e.g. "featured". */
  projectType?: string;
  /** Drop projects with no non-zero basic_cost. Ignored when paginating. */
  onlyPriced?: boolean;
  /** 1-based. Omit to return every match. */
  page?: number;
  /** Page size. Only applies when `page` is set. */
  limit?: number;
}

/**
 * The aggregated project list — the equivalent of the SQL "getAllMicrositesMain".
 *
 * Filtering and pagination are pushed into the FIRST stages, before the
 * $lookups, so only the rows actually being returned get joined. Joining all
 * 2,200+ microsites to serve 6 cards is what made /projects ship megabytes.
 */
export async function getAllMicrositesMain(
  options: MicrositeQuery = {}
): Promise<MicrositeListItem[]> {
  const db = await getDb();
  const paginated = typeof options.page === 'number';

  const pipeline: Record<string, unknown>[] = [];

  if (options.projectType) {
    pipeline.push({
      $match: { project_type: new RegExp(`^${escapeRegex(options.projectType)}$`, 'i') },
    });
  }

  // Sort/skip/limit up front — cheap, and it shrinks everything downstream.
  if (paginated) {
    const page = Math.max(1, options.page as number);
    const limit = Math.max(1, options.limit ?? 6);
    pipeline.push({ $sort: { _id: -1 } }, { $skip: (page - 1) * limit }, { $limit: limit });
  }

  pipeline.push(
    { $addFields: { legacy_id: { $toString: '$micro_id' } } },

    { $lookup: { from: 'price', localField: 'legacy_id', foreignField: 'micro_id', as: 'prices' } },
    {
      $lookup: {
        from: 'microsite_detail',
        localField: 'legacy_id',
        foreignField: 'micro_id',
        as: 'details',
      },
    },
    // $arrayElemAt, NOT $unwind: five microsites (Dreaming Blue, Meraki, ...)
    // have more than one microsite_detail row in the imported data, and
    // unwinding fanned them out into duplicate cards with duplicate React keys.
    // One microsite in, one microsite out.
    { $set: { details: { $arrayElemAt: ['$details', 0] } } },
    {
      $lookup: {
        from: 'builder',
        localField: 'details.builder_id',
        foreignField: 'builder_id',
        as: 'builder',
      },
    },
    { $set: { builder: { $arrayElemAt: ['$builder', 0] } } },
    {
      $lookup: {
        from: 'prop_status',
        localField: 'details.status_id',
        foreignField: 'status_id',
        as: 'status',
      },
    },
    { $set: { status: { $arrayElemAt: ['$status', 0] } } },
    {
      $lookup: {
        from: 'prop_type',
        localField: 'details.type_id',
        foreignField: 'type_id',
        as: 'type',
      },
    },
    { $set: { type: { $arrayElemAt: ['$type', 0] } } },
    {
      $addFields: {
        numericPrices: {
          $map: {
            input: '$prices',
            as: 'p',
            in: { sqft: num('$$p.sqft'), basic_cost: num('$$p.basic_cost') },
          },
        },
      },
    }
  );

  // Skipped when paginating: filtering after $limit would yield short pages.
  if (options.onlyPriced && !paginated) {
    pipeline.push({ $match: { 'numericPrices.basic_cost': { $gt: 0 } } });
  }

  pipeline.push(
    {
      $project: {
        micro_id: '$legacy_id',
        possession: 1,
        min_sqft: { $min: '$numericPrices.sqft' },
        max_sqft: { $max: '$numericPrices.sqft' },
        min_basic_cost: { $min: '$numericPrices.basic_cost' },
        max_basic_cost: { $max: '$numericPrices.basic_cost' },
        latitude: num('$details.latitude'),
        longitude: num('$details.longitude'),
        about: '$details.about',
        status: '$status.status',
        type: { $toLower: { $ifNull: ['$type.type', ''] } },
        location: { $toLower: { $ifNull: ['$location', ''] } },
        name: 1,
        city: 1,
        zone: 1,
        project_type: 1,
        featured_image: '$details.featured_image',
        builder_id: '$details.builder_id',
        rooms: { $toLower: { $ifNull: ['$details.rooms', ''] } },
        logo: '$builder.logo',
        builder_name: '$builder.name',
      },
    }
  );

  // Already sorted before $skip/$limit when paginating.
  if (!paginated) {
    pipeline.push({ $sort: { _id: -1 } });
  }

  const rows = await db
    .collection('microsite')
    .aggregate(pipeline, { allowDiskUse: true })
    .toArray();

  return serialize(rows) as MicrositeListItem[];
}

export interface MicrositePage {
  items: MicrositeListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MicrositeDetail {
  _id: string;
  micro_id: string;
  name: string;
  location?: string;
  total_area?: string;
  possession?: string;
  project_type?: string;
  price: Array<{
    type?: string;
    sqft?: number | null;
    price?: number | null;
    basic_cost?: number | null;
  }>;
  details: {
    about?: string;
    rooms?: string;
    slider_image?: string;
    gallery_image?: string;
    masterplan_image?: string;
    mlogo?: string;
    builderName?: string | null;
    specifications?: Record<string, string>;
    builder?: Record<string, unknown> | null;
    status?: Record<string, unknown> | null;
    type?: Record<string, unknown> | null;
  } | null;
  floorplan: Array<{ image: string; name?: string; details?: string }>;
  amenities: Array<{ name: string; image: string; details?: string }>;
  builder?: Record<string, unknown> | null;
  status?: string | null;
  type?: string | null;
  specifications?: Record<string, string>;
  bankapproval?: Record<string, unknown>[];
  legalapproval?: Record<string, unknown>[];
}

/**
 * One page of projects plus the total count. Used by /projects so the server
 * only joins and serialises the rows actually being displayed.
 */
export async function getMicrositesPage(
  options: { page?: number; limit?: number; projectType?: string } = {}
): Promise<MicrositePage> {
  const db = await getDb();
  const limit = Math.max(1, options.limit ?? 6);
  const page = Math.max(1, options.page ?? 1);

  const filter = options.projectType
    ? { project_type: new RegExp(`^${escapeRegex(options.projectType)}$`, 'i') }
    : {};

  const [items, total] = await Promise.all([
    getAllMicrositesMain({ page, limit, projectType: options.projectType }),
    db.collection('microsite').countDocuments(filter),
  ]);

  return { items, total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

/**
 * Lightweight list — name/location/city only. Powers the location and project
 * dropdowns and any slug list.
 */
export async function getMicrositeNames(): Promise<
  Array<{ name: string; micro_id: string; location: string; city: string }>
> {
  const db = await getDb();
  const rows = await db
    .collection('microsite')
    .find({}, { projection: { name: 1, micro_id: 1, location: 1, city: 1, _id: 0 } })
    .sort({ name: 1 })
    .toArray();
  return serialize(rows) as unknown as Array<{
    name: string;
    micro_id: string;
    location: string;
    city: string;
  }>;
}

/**
 * A single project with everything the detail page needs.
 * `slug` is the project name lowercased with spaces replaced by hyphens.
 */
export async function getMicrositeBySlug(slug: string): Promise<MicrositeDetail | null> {
  const db = await getDb();
  const name = String(slug || '').replace(/-/g, ' ');

  const microsite = await db
    .collection('microsite')
    .findOne({ name: new RegExp(`^${escapeRegex(name)}$`, 'i') });

  if (!microsite) return null;

  const legacyId = String(microsite.micro_id ?? '');

  const [details, price, floorplan] = await Promise.all([
    db.collection('microsite_detail').findOne({ micro_id: legacyId }),
    db.collection('price').find({ micro_id: legacyId }).toArray(),
    db.collection('floor_plan').find({ micro_id: legacyId }).toArray(),
  ]);

  let builder: Record<string, unknown> | null = null;
  let status: Record<string, unknown> | null = null;
  let type: Record<string, unknown> | null = null;
  let amenities: Record<string, unknown>[] = [];
  let bankapproval: Record<string, unknown>[] = [];
  let legalapproval: Record<string, unknown>[] = [];
  let galleryImages: string[] = [];
  let sliderImages: string[] = [];
  const specifications: Record<string, string> = {};

  if (details) {
    [builder, status, type] = await Promise.all([
      details.builder_id
        ? db.collection('builder').findOne({ builder_id: String(details.builder_id) })
        : Promise.resolve(null),
      details.status_id
        ? db.collection('prop_status').findOne({ status_id: String(details.status_id) })
        : Promise.resolve(null),
      details.type_id
        ? db.collection('prop_type').findOne({ type_id: String(details.type_id) })
        : Promise.resolve(null),
    ]);

    // am_id / bank_id / legal_id are comma-separated id lists in the export.
    const amIds = csvToIds(details.am_id);
    const bankIds = csvToIds(details.bank_id);
    const legalIds = csvToIds(details.legal_id);

    [amenities, bankapproval, legalapproval] = await Promise.all([
      amIds.length ? db.collection('amenities').find({ am_id: { $in: amIds } }).toArray() : [],
      bankIds.length
        ? db.collection('bankapproval').find({ bank_id: { $in: bankIds } }).toArray()
        : [],
      legalIds.length
        ? db.collection('legalapproval').find({ legal_id: { $in: legalIds } }).toArray()
        : [],
    ]);

    // gallery_image / slider_image hold image_data ids, not filenames.
    const galleryIds = csvToIds(details.gallery_image);
    const sliderIds = csvToIds(details.slider_image);
    const imgIds = Array.from(new Set([...galleryIds, ...sliderIds]));

    if (imgIds.length) {
      const images = await db
        .collection('image_data')
        .find({ img_id: { $in: imgIds } })
        .toArray();
      const nameById = new Map(images.map((i) => [String(i.img_id), i.image_name as string]));
      galleryImages = galleryIds.map((id) => nameById.get(id)).filter(Boolean) as string[];
      sliderImages = sliderIds.map((id) => nameById.get(id)).filter(Boolean) as string[];
    }

    const specRows = await db.collection('specification').find({ micro_id: legacyId }).toArray();

    if (specRows.length) {
      const spIds = Array.from(new Set(specRows.map((s) => String(s.sp_id)).filter(Boolean)));
      const specNames = await db
        .collection('specifications')
        .find({ id: { $in: spIds } })
        .toArray();
      const labelById = new Map(specNames.map((s) => [String(s.id), s.name as string]));
      for (const row of specRows) {
        const label = labelById.get(String(row.sp_id)) || `Specification ${row.sp_id}`;
        specifications[label] = row.description as string;
      }
    }
  }

  return serialize({
    ...microsite,
    micro_id: legacyId,
    name: String(microsite.name ?? name),
    details: details
      ? {
          ...details,
          builder,
          status,
          type,
          builderName: (builder?.name as string) ?? null,
          // Resolved filenames, so the page's toUrlArray() builds real URLs.
          gallery_image: galleryImages.join(','),
          slider_image: sliderImages.join(','),
          gallery_image_ids: details.gallery_image,
          slider_image_ids: details.slider_image,
          gallery_images: galleryImages,
          slider_images: sliderImages,
          specifications,
        }
      : null,
    builder,
    status: (status?.status as string) ?? null,
    type: (type?.type as string) ?? null,
    price: price.map((p) => ({
      ...p,
      price: toNumber(p.price),
      sqft: toNumber(p.sqft),
      basic_cost: toNumber(p.basic_cost),
    })),
    floorplan,
    amenities,
    bankapproval,
    legalapproval,
    specifications,
  }) as unknown as MicrositeDetail;
}
