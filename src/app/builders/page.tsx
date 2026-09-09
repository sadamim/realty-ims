// Builders, read from the same Atlas database the admin panel writes to.
//
// This page used to render a hardcoded array of twelve developers, so adding a
// builder in the panel changed nothing here. It now reads the `builder`
// collection — the same rows the panel edits — and keeps the original twelve as
// a fallback for the case where the collection is unreachable or empty, so the
// page can never come up blank.
import React from 'react';
import RootLayout from '@/components/layout/RootLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { getSiteBuilders, type SiteBuilder } from '@/lib/content';

export const revalidate = 60;

export const metadata = {
  title: 'Top Builders in Bangalore | Realty Focus',
  description:
    'The most prestigious real estate developers in Bangalore, with their completed and ongoing projects.',
};

const FALLBACK_LOGO = '/images/builder-logo.jpeg';

// Used only when the database returns nothing at all.
const FALLBACK_BUILDERS: SiteBuilder[] = [
  {
    _id: 'fallback-brigade',
    builder_id: '',
    name: 'Brigade Group',
    slug: 'brigade-group',
    logo: FALLBACK_LOGO,
    description:
      "Brigade Group, one of India's leading property developers, has been transforming cityscapes across South India with developments across residential, commercial, retail, hospitality and education.",
    established: '1986',
    completedProjects: '250+',
    ongoingProjects: '30+',
    locations: ['Bangalore', 'Chennai', 'Hyderabad', 'Mysore', 'Kochi'],
    website: '',
    address: '',
  },
  {
    _id: 'fallback-prestige',
    builder_id: '',
    name: 'Prestige Group',
    slug: 'prestige-group',
    logo: FALLBACK_LOGO,
    description:
      "The Prestige Group has cemented its place as one of India's leading real estate developers, having completed more than 247 projects covering over 134 million sq ft.",
    established: '1986',
    completedProjects: '247+',
    ongoingProjects: '45+',
    locations: ['Bangalore', 'Chennai', 'Hyderabad', 'Goa', 'Mangalore', 'Kochi'],
    website: '',
    address: '',
  },
  {
    _id: 'fallback-sobha',
    builder_id: '',
    name: 'Sobha Developers',
    slug: 'sobha-developers',
    logo: FALLBACK_LOGO,
    description:
      'Sobha Limited is one of the fastest growing and foremost backward-integrated real estate players in the country, with a pan-India presence.',
    established: '1995',
    completedProjects: '140+',
    ongoingProjects: '25+',
    locations: ['Bangalore', 'Gurgaon', 'Chennai', 'Pune', 'Coimbatore'],
    website: '',
    address: '',
  },
];

export default async function BuildersPage() {
  const fromDb = await getSiteBuilders();
  const builders = fromDb.length > 0 ? fromDb : FALLBACK_BUILDERS;

  return (
    <RootLayout>
      {/* Header Banner */}
      <div className="relative bg-realty-darkNavy py-16">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-3xl font-bold text-center">Top Builders in Bangalore</h1>
          <p className="text-center mt-2">
            List of the most prestigious real estate developers in Bangalore
          </p>
        </div>
      </div>

      {/* Builders */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {builders.map((builder) => (
              <Card key={builder._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6 flex h-full flex-col">
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-realty-navy capitalize">
                        <Link
                          href={`/builders/${builder.slug}`}
                          className="hover:text-realty-red transition-colors"
                        >
                          {builder.name}
                        </Link>
                      </h3>
                      {builder.established && (
                        <p className="text-sm text-gray-500">Est. {builder.established}</p>
                      )}
                    </div>
                    <div className="w-16 h-16 relative shrink-0">
                      <Image
                        src={builder.logo || FALLBACK_LOGO}
                        alt={builder.name}
                        width={64}
                        height={64}
                        className="object-contain w-16 h-16"
                      />
                    </div>
                  </div>

                  {builder.description && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{builder.description}</p>
                  )}

                  {builder.locations.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {builder.locations.slice(0, 3).map((location) => (
                        <span key={location} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {location}
                        </span>
                      ))}
                      {builder.locations.length > 3 && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          +{builder.locations.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {(builder.completedProjects || builder.ongoingProjects) && (
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {builder.completedProjects && (
                        <div>
                          <p className="text-gray-500">Completed Projects</p>
                          <p className="font-semibold">{builder.completedProjects}</p>
                        </div>
                      )}
                      {builder.ongoingProjects && (
                        <div>
                          <p className="text-gray-500">Ongoing Projects</p>
                          <p className="font-semibold">{builder.ongoingProjects}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-end mt-auto pt-4">
                    <Link
                      href={`/builders/${builder.slug}`}
                      className="text-realty-red text-sm hover:underline"
                    >
                      View Projects
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Builders */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">About Top Builders in Bangalore</h2>
          <div className="max-w-4xl mx-auto text-gray-600">
            <p className="mb-4">
              Bangalore, also known as the Silicon Valley of India, has witnessed tremendous growth
              in its real estate sector over the years. The city&apos;s booming IT industry, pleasant
              climate, and cosmopolitan culture have made it a preferred destination for homebuyers
              and investors alike.
            </p>
            <p className="mb-4">
              Realty Focus brings you a comprehensive list of the top builders in Bangalore who have
              contributed significantly to the city&apos;s skyline. These developers are known for
              their quality construction, innovative designs, timely delivery, and customer
              satisfaction.
            </p>
            <p>
              Explore our curated list of top builders and discover the right developer for your next
              property investment in Bangalore.
            </p>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}
