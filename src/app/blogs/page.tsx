// Blogs listing — reads the `blog` collection the admin panel writes to.
// (It used to be a hardcoded array in this file.)
//
// Images use a plain <img> rather than next/image on purpose: an editor can
// point a post at any host, and next/image rejects hostnames that are not in
// next.config's remotePatterns.
import React from 'react';
import Link from 'next/link';
import RootLayout from '@/components/layout/RootLayout';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getBlogCategories, getPublishedBlogs } from '@/lib/content';

export const revalidate = 30;

export const metadata = {
  title: 'Real Estate Blogs',
  description: 'Insights, advice and updates from the Bangalore real estate market.',
};

const PER_PAGE = 9;

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);

  const [posts, categories] = await Promise.all([
    getPublishedBlogs({ category }),
    getBlogCategories(),
  ]);

  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const visible = posts.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const filterHref = (name?: string) => {
    const qs = new URLSearchParams();
    if (name && name !== 'All') qs.set('category', name);
    return `/blogs${qs.toString() ? `?${qs}` : ''}`;
  };

  const pageHref = (n: number) => {
    const qs = new URLSearchParams();
    if (category) qs.set('category', category);
    if (n > 1) qs.set('page', String(n));
    return `/blogs${qs.toString() ? `?${qs}` : ''}`;
  };

  return (
    <RootLayout>
      {/* Header banner */}
      <div className="relative bg-realty-darkNavy py-16">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-center text-3xl font-bold">Real Estate Blogs</h1>
          <p className="mt-2 text-center">
            Insights, advice, and updates from the Bangalore real estate market
          </p>
        </div>
      </div>

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="bg-gray-100 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {['All', ...categories].map((name) => {
                const active = name === 'All' ? !category : category === name;
                return (
                  <Link
                    key={name}
                    href={filterHref(name)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-realty-red text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {visible.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
              <h2 className="text-lg font-semibold text-realty-navy">
                {category ? `Nothing in ${category} yet` : 'No articles published yet'}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {category
                  ? 'Try another category — new pieces are added regularly.'
                  : 'Our team is working on the first posts. Check back shortly.'}
              </p>
              {category && (
                <Link
                  href="/blogs"
                  className="mt-6 inline-block rounded-sm bg-realty-red px-5 py-2 text-sm text-white transition-colors hover:bg-realty-red/90"
                >
                  View all articles
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((post) => (
                <Card key={post._id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <Link href={`/blogs/${post.slug}`} className="relative block aspect-[4/3] bg-gray-100">
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center bg-realty-navy/5 text-4xl font-bold text-realty-navy/20">
                        {post.title.charAt(0)}
                      </span>
                    )}
                    <span className="absolute left-4 top-4 rounded-sm bg-realty-red px-2 py-1 text-xs text-white">
                      {post.category}
                    </span>
                  </Link>

                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center text-sm text-gray-500">
                      {post.dateLabel && <span>{post.dateLabel}</span>}
                      {post.dateLabel && <span className="mx-2">•</span>}
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="mb-3 line-clamp-2 text-xl font-bold text-realty-navy">
                      <Link href={`/blogs/${post.slug}`} className="transition-colors hover:text-realty-red">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between px-6 pb-6 pt-0">
                    <div className="text-sm text-gray-500">By {post.author}</div>
                    <Link href={`/blogs/${post.slug}`} className="text-sm text-realty-red hover:underline">
                      Read More
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const n = index + 1;
                  return n === current ? (
                    <span
                      key={n}
                      aria-current="page"
                      className="flex h-10 w-10 items-center justify-center bg-realty-navy text-white"
                    >
                      {n}
                    </span>
                  ) : (
                    <Link
                      key={n}
                      href={pageHref(n)}
                      className="flex h-10 w-10 items-center justify-center border border-gray-300 transition-colors hover:bg-gray-100"
                    >
                      {n}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-realty-lightGray py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-4 text-2xl font-bold">Subscribe to Our Newsletter</h2>
            <p className="mb-6 text-gray-600">
              Stay updated with the latest real estate news, market trends, and exclusive property
              listings in Bangalore.
            </p>

            <div className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow rounded-sm border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-realty-red"
              />
              <button className="rounded-sm bg-realty-red px-6 py-2 text-white transition-colors hover:bg-realty-red/90">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}
