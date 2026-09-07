// GET /api/microsites — flat list of projects (name + legacy id).
import { NextResponse } from 'next/server';
import { getMicrositeNames } from '@/lib/microsites';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const microsites = await getMicrositeNames();
    return NextResponse.json(microsites);
  } catch (error) {
    console.error('[api/microsites]', error);
    return NextResponse.json(
      { error: 'Error fetching microsites', message: (error as Error).message },
      { status: 500 }
    );
  }
}
