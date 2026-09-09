// src/lib/mongodb.ts
//
// SERVER ONLY. Never import this from a file that carries 'use client'.
//
// A single MongoClient is shared across the whole Next.js server process and
// cached on globalThis so that Fast Refresh in development does not open a new
// connection pool on every edit (which exhausts an Atlas cluster very quickly).
import { MongoClient, type Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'realtyfocus';

if (!uri) {
  throw new Error(
    'MONGODB_URI is not set. Add it to .env.local (and to the Netlify environment variables for deploys).'
  );
}

type MongoCache = {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
  indexesReady: Promise<void> | null;
};

const globalForMongo = globalThis as unknown as { _realtyfocusMongo?: MongoCache };

const cache: MongoCache =
  globalForMongo._realtyfocusMongo ??
  (globalForMongo._realtyfocusMongo = { client: null, promise: null, indexesReady: null });

export async function getClient(): Promise<MongoClient> {
  if (cache.client) return cache.client;

  if (!cache.promise) {
    cache.promise = new MongoClient(uri as string, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 15000,
    }).connect();
  }

  cache.client = await cache.promise;
  return cache.client;
}

/*
 * The data was imported from MySQL, so every relationship is expressed through
 * the legacy string primary keys rather than ObjectIds. Those fields need
 * indexes or each $lookup degenerates into a full collection scan.
 * Runs at most once per server process.
 */
const LEGACY_INDEXES: Array<[string, Record<string, 1>]> = [
  ['microsite', { micro_id: 1 }],
  ['microsite', { name: 1 }],
  ['microsite', { project_type: 1 }],
  ['microsite_detail', { micro_id: 1 }],
  ['microsite_detail', { builder_id: 1 }],
  ['price', { micro_id: 1 }],
  ['floor_plan', { micro_id: 1 }],
  ['builder', { builder_id: 1 }],
  ['prop_status', { status_id: 1 }],
  ['prop_type', { type_id: 1 }],
  ['amenities', { am_id: 1 }],
  ['bankapproval', { bank_id: 1 }],
  ['legalapproval', { legal_id: 1 }],
  ['image_data', { img_id: 1 }],
  ['specification', { micro_id: 1 }],
  ['specifications', { id: 1 }],
];

async function ensureIndexes(db: Db): Promise<void> {
  const existing = new Set((await db.listCollections().toArray()).map((c) => c.name));
  await Promise.all(
    LEGACY_INDEXES.filter(([name]) => existing.has(name)).map(([name, spec]) =>
      db
        .collection(name)
        .createIndex(spec, { background: true })
        .catch((error) => {
          console.warn(`[mongo] index ${name} ${JSON.stringify(spec)}: ${error.message}`);
        })
    )
  );
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  const db = client.db(dbName);

  if (!cache.indexesReady) {
    cache.indexesReady = ensureIndexes(db).catch((error) => {
      console.warn('[mongo] index setup skipped:', error.message);
    });
  }
  await cache.indexesReady;

  return db;
}
