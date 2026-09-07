// GET /api/microsites/all — aggregated project list for the client components.
import { NextResponse } from 'next/server';
import { getAllMicrositesMain } from '@/lib/microsites';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const onlyPriced = searchParams.get('onlyPriced') === '1' || searchParams.get('onlyPriced') === 'true';

    const microsites = await getAllMicrositesMain({ onlyPriced });
    return NextResponse.json(microsites);
  } catch (error) {
    console.error('[api/microsites/all]', error);
    return NextResponse.json(
      { error: 'Error fetching microsites', message: (error as Error).message },
      { status: 500 }
    );
  }
}
