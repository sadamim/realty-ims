// Server component. Only the requested page of projects is queried, joined and
// serialised — rendering 6 cards used to ship all 2,200+ rows to the browser.
import ProjectsClient from './ProjectsClient';
import { getMicrositesPage } from '@/lib/microsites';

export const revalidate = 60;

export const metadata = {
  title: 'Residential Projects in Bangalore for Sale',
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const requested = Number.parseInt(page ?? '1', 10);
  const currentPage = Number.isFinite(requested) && requested > 0 ? requested : 1;

  const { items, page: resolvedPage, totalPages, total } = await getMicrositesPage({
    page: currentPage,
    limit: 6,
  });

  return (
    <ProjectsClient
      projects={items}
      currentPage={resolvedPage}
      totalPages={totalPages}
      total={total}
    />
  );
}
