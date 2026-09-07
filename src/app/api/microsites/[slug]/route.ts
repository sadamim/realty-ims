// GET /api/microsites/:slug — one project with details, prices, floor plans,
// amenities, approvals and specifications.
import { NextResponse } from 'next/server';
import { getMicrositeBySlug } from '@/lib/microsites';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const microsite = await getMicrositeBySlug(slug);

    if (!microsite) {
      return NextResponse.json({ message: 'Microsite not found' }, { status: 404 });
    }

    return NextResponse.json(microsite);
  } catch (error) {
    console.error('[api/microsites/:slug]', error);
    return NextResponse.json(
      { error: 'Error fetching microsite', message: (error as Error).message },
      { status: 500 }
    );
  }
}
