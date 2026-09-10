import { buildMetadata, seoText } from '@/lib/seo';
// Individual blog post. This route did not exist before — the listing linked
// to it and every "Read more" landed on a 404.
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import RootLayout from '@/components/layout/RootLayout';
import { Card, CardContent } from '@/components/ui/card';
import { getBlogBySlug, getRelatedBlogs } from '@/lib/content';
import { renderBody } from '@/lib/richtext';

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return buildMetadata({ title: 'Article not found', path: `/blogs/${slug}`, noIndex: true });

  // An SEO title written in the admin panel wins; otherwise the post's own
  // title and excerpt describe the page.
  return buildMetadata({
    title: seoText(post.metaTitle, post.title),
    description: seoText(post.metaDescription, post.excerpt),
    path: `/blogs/${post.slug}`,
    image: post.image,
    type: 'article',
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogs(post);
  const html = renderBody(post.body);

  return (
    <RootLayout>
      {/* Hero */}
      <div className="relative bg-realty-darkNavy">
        {post.image && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-realty-darkNavy/70 to-realty-darkNavy/95" />
          </>
        )}

        <div className="container relative mx-auto px-4 py-16 text-white">
          <Link href="/blogs" className="text-sm text-white/70 transition-colors hover:text-white">
            ← Back to blogs
          </Link>

          <span className="mt-6 inline-block rounded-sm bg-realty-red px-2 py-1 text-xs">
            {post.category}
          </span>

          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-4xl">{post.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
            <span>By {post.author}</span>
            {post.dateLabel && (
              <>
                <span aria-hidden="true">•</span>
                <span>{post.dateLabel}</span>
              </>
            )}
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <article className="py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {post.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image}
                alt={post.title}
                className="mb-10 aspect-[16/9] w-full rounded-lg object-cover"
              />
            )}

            {post.excerpt && (
              <p className="mb-8 border-l-4 border-realty-red pl-4 text-lg leading-relaxed text-gray-700">
                {post.excerpt}
              </p>
            )}

            {html ? (
              <div
                className="prose-realty space-y-5 text-[16.5px] leading-[1.75] text-gray-700"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p className="text-gray-500">This article has no body content yet.</p>
            )}
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-realty-lightGray py-14">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold text-realty-navy">More from the blog</h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((item) => (
                <Card key={item._id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <Link href={`/blogs/${item.slug}`} className="relative block aspect-[4/3] bg-gray-100">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center bg-realty-navy/5 text-4xl font-bold text-realty-navy/20">
                        {item.title.charAt(0)}
                      </span>
                    )}
                  </Link>
                  <CardContent className="p-5">
                    <h3 className="line-clamp-2 text-base font-bold text-realty-navy">
                      <Link href={`/blogs/${item.slug}`} className="transition-colors hover:text-realty-red">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </RootLayout>
  );
}
