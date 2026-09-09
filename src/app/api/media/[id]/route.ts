// Serves images that were uploaded through the admin panel.
//
// They live in the shared `media` collection rather than public/, because both
// apps deploy to Vercel where the filesystem is read-only. Ids are immutable,
// so the response is cached hard and Vercel's CDN does the rest.
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';

export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return new NextResponse('Not found', { status: 404 });

  try {
    const db = await getDb();
    const doc = await db.collection('media').findOne({ _id: new ObjectId(id) });
    if (!doc) return new NextResponse('Not found', { status: 404 });

    const raw = doc.data as unknown as { buffer?: Buffer } | Buffer | undefined;
    const buffer = Buffer.isBuffer(raw)
      ? raw
      : raw && 'buffer' in raw && raw.buffer
        ? Buffer.from(raw.buffer)
        : null;
    if (!buffer) return new NextResponse('Not found', { status: 404 });

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': String(doc.contentType ?? 'application/octet-stream'),
        'Content-Length': String(buffer.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('[api/media/:id]', error);
    return new NextResponse('Image unavailable', { status: 500 });
  }
}
