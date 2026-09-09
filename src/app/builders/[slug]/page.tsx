// One builder and everything they are building.
//
// This route did not exist before: every "View Projects" link on /builders was
// a 404. It reads the builder from the same collection the admin panel edits,
// and lists that builder's projects through the shared microsite query.
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RootLayout from '@/components/layout/RootLayout';
import ProjectCard from '@/components/home/ProjectCard';
import { getSiteBuilderBySlug, getSiteBuilders } from '@/lib/content';
import { getAllMicrositesMain } from '@/lib/microsites';
import { decodeHtml, formatDate, formatPriceRange } from '@/lib/format';

export const revalidate = 60;

const FALLBACK_LOGO = '/images/builder-logo.jpeg';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const builder = await getSiteBuilderBySlug(slug);
  if (!builder) return { title: 'Builder not found | Realty Focus' };

  return {
    title: `${builder.name} — Projects in Bangalore | Realty Focus`,
    description:
      builder.description.slice(0, 155) ||
      `Residential projects by ${builder.name}, with pricing, configurations and possession dates.`,
  };
}

export default async function BuilderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const builder = await getSiteBuilderBySlug(slug);
  if (!builder) notFound();

  // A builder with no legacy id (created in the panel and not yet linked to any
  // project) simply has no projects to list.
  const projects = builder.builder_id
    ? await getAllMicrositesMain({ builderId: builder.builder_id })
    : [];

  const others = (await getSiteBuilders()).filter((item) => item.slug !== builder.slug).slice(0, 6);

  const stats = [
    { label: 'Established', value: builder.established },
    { label: 'Completed projects', value: builder.completedProjects },
    { label: 'Ongoing projects', value: builder.ongoingProjects },
    { label: 'Listed here', value: projects.length ? String(projects.length) : '' },
  ].filter((stat) => stat.value);

  return (
    <RootLayout>
      {/* Header */}
      <div className="relative bg-realty-darkNavy py-14">
        <div className="container mx-auto px-4 text-white">
          <Link href="/builders" className="text-sm text-white/70 hover:text-white transition-colors">
            ← All builders
          </Link>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 shrink-0 rounded-md bg-white p-2 flex items-center justify-center">
              <Image
                src={builder.logo || FALLBACK_LOGO}
                alt={builder.name}
                width={64}
                height={64}
                className="object-contain w-16 h-16"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold capitalize">{builder.name}</h1>
              {builder.locations.length > 0 && (
                <p className="mt-1 text-white/70">{builder.locations.join(' · ')}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About + stats */}
      {(builder.description || stats.length > 0 || builder.address || builder.website) && (
        <section className="py-12">
          <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {builder.description ? (
                <>
                  <h2 className="text-xl font-bold text-realty-navy mb-3">About {builder.name}</h2>
                  <p className="text-gray-600 text-justify">{builder.description}</p>
                </>
              ) : (
                <p className="text-gray-500">
                  No description has been added for this builder yet.
                </p>
              )}

              {builder.address && (
                <p className="mt-4 text-sm text-gray-500 capitalize">{builder.address}</p>
              )}
              {builder.website && (
                <a
                  href={builder.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-realty-red hover:underline"
                >
                  Visit website
                </a>
              )}
            </div>

            {stats.length > 0 && (
              <dl className="grid grid-cols-2 gap-4 self-start">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-md bg-gray-50 p-4">
                    <dt className="text-xs uppercase tracking-wide text-gray-500">{stat.label}</dt>
                    <dd className="mt-1 text-lg font-semibold text-realty-navy">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>
      )}

      {/* Projects */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">Projects by {builder.name}</h2>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.micro_id}
                  project={{
                    title: project.name,
                    location: `${project.location} ${project.city ?? ''}`.trim() || 'Bangalore',
                    category: project.type || 'N/A',
                    configuration: project.rooms
                      ? decodeHtml(project.rooms).replace(/<\/?[^>]+(>|$)/g, '')
                      : 'N/A',
                    area:
                      project.min_sqft && project.max_sqft
                        ? `${project.min_sqft} - ${project.max_sqft}`
                        : project.min_sqft
                          ? `${project.min_sqft}`
                          : project.max_sqft
                            ? `${project.max_sqft}`
                            : 'N/A',
                    possession: formatDate(project.possession),
                    price: formatPriceRange(project.min_basic_cost, project.max_basic_cost),
                    imageUrl: project.featured_image ?? undefined,
                    buildername: project.builder_name || builder.name,
                    status: project.status,
                    slug: project.name?.toLowerCase().replace(/\s+/g, '-'),
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No projects are linked to this builder yet. Assign one from the admin panel and it will
              appear here.
            </p>
          )}
        </div>
      </section>

      {/* Other builders */}
      {others.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="section-heading">Other builders</h2>
            <div className="flex flex-wrap gap-3">
              {others.map((item) => (
                <Link
                  key={item._id}
                  href={`/builders/${item.slug}`}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm capitalize text-realty-navy transition-colors hover:border-realty-red hover:text-realty-red"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </RootLayout>
  );
}
