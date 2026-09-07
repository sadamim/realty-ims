import React from 'react';
import RootLayout from '@/components/layout/RootLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

// Mock data for blogs
const blogs = [
  {
    id: 1,
    title: 'How to Choose the Right Property in Bangalore: A Comprehensive Guide',
    slug: 'how-to-choose-right-property-bangalore',
    excerpt: `Buying a property is one of the biggest investments you'll make in your lifetime. Here's how to make the right choice in Bangalore's competitive real estate market.`,
    image: '/images/projects/project1.jpeg',
    date: 'June 15, 2023',
    author: 'RealtyFocus Team',
    category: 'Property Buying',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Top 10 Upcoming Residential Areas in Bangalore for 2024',
    slug: 'top-upcoming-residential-areas-bangalore-2024',
    excerpt: 'Discover the most promising areas for real estate investment in Bangalore with excellent appreciation potential and infrastructure development.',
    image: '/images/projects/project2.jpeg',
    date: 'May 22, 2023',
    author: 'RealtyFocus Team',
    category: 'Market Trends',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'RERA Regulations: What Home Buyers in Bangalore Need to Know',
    slug: 'rera-regulations-home-buyers-bangalore',
    excerpt: 'Understanding the Real Estate Regulatory Authority (RERA) guidelines can help you make informed property buying decisions and protect your investment.',
    image: '/images/projects/project3.png',
    date: 'April 10, 2023',
    author: 'RealtyFocus Team',
    category: 'Legal',
    readTime: '7 min read'
  },
  {
    id: 4,
    title: 'Luxury Housing in Bangalore: Is It Worth the Investment?',
    slug: 'luxury-housing-bangalore-worth-investment',
    excerpt: 'The premium housing segment in Bangalore has been growing steadily. We analyze if luxury properties provide good returns on investment.',
    image: '/images/about-img.jpeg',
    date: 'March 5, 2023',
    author: 'RealtyFocus Team',
    category: 'Luxury Real Estate',
    readTime: '6 min read'
  },
  {
    id: 5,
    title: 'Home Loan Interest Rates: Which Banks Offer the Best Deals?',
    slug: 'home-loan-interest-rates-best-banks',
    excerpt: 'Comparing the current home loan interest rates from major banks and financial institutions to help you find the most affordable financing option.',
    image: '/images/about-bg.jpeg',
    date: 'February 18, 2023',
    author: 'RealtyFocus Team',
    category: 'Finance',
    readTime: '4 min read'
  },
  {
    id: 6,
    title: 'Sustainable Living: Eco-Friendly Residential Projects in Bangalore',
    slug: 'sustainable-living-eco-friendly-projects-bangalore',
    excerpt: 'Green buildings are becoming increasingly popular. Here are some top eco-friendly residential projects in Bangalore offering sustainable living options.',
    image: '/images/projects/project1.jpeg',
    date: 'January 30, 2023',
    author: 'RealtyFocus Team',
    category: 'Green Living',
    readTime: '5 min read'
  },
  {
    id: 7,
    title: 'Rental Market Analysis: Best Areas for Rental Investment in 2023',
    slug: 'rental-market-analysis-best-areas-2023',
    excerpt: 'Looking to invest in rental properties? Discover the areas in Bangalore with high rental yields and strong tenant demand.',
    image: '/images/projects/project2.jpeg',
    date: 'December 12, 2022',
    author: 'RealtyFocus Team',
    category: 'Rental Properties',
    readTime: '7 min read'
  },
  {
    id: 8,
    title: `Commercial vs Residential Property Investment: What's Right for You?`,
    slug: 'commercial-vs-residential-property-investment',
    excerpt: `Comparing the pros and cons of investing in commercial and residential properties to help you determine the best option for your investment goals.`,
    image: '/images/projects/project3.png',
    date: 'November 5, 2022',
    author: 'RealtyFocus Team',
    category: 'Investment',
    readTime: '9 min read'
  },
  {
    id: 9,
    title: 'First-Time Home Buyer? Here\'s What You Should Know',
    slug: 'first-time-home-buyer-guide',
    excerpt: 'A complete guide for first-time home buyers covering everything from budgeting to paperwork to moving in.',
    image: '/images/about-img.jpeg',
    date: 'October 17, 2022',
    author: 'RealtyFocus Team',
    category: 'Property Buying',
    readTime: '10 min read'
  }
];

// Categories for filtering
const categories = [
  'All',
  'Property Buying',
  'Market Trends',
  'Legal',
  'Luxury Real Estate',
  'Finance',
  'Green Living',
  'Rental Properties',
  'Investment'
];

export default function BlogsPage() {
  return (
    <RootLayout>
      {/* Header Banner */}
      <div className="relative bg-realty-darkNavy py-16">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-3xl font-bold text-center">
            Real Estate Blogs
          </h1>
          <p className="text-center mt-2">Insights, advice, and updates from the Bangalore real estate market</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category === 'All' 
                    ? 'bg-realty-red text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-realty-red text-white text-xs px-2 py-1 rounded-sm">
                    {blog.category}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{blog.date}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-realty-navy mb-3 line-clamp-2">
                    <Link href={`/blogs/${blog.slug}`} className="hover:text-realty-red transition-colors">
                      {blog.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>
                </CardContent>
                
                <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    By {blog.author}
                  </div>
                  
                  <Link 
                    href={`/blogs/${blog.slug}`}
                    className="text-realty-red text-sm hover:underline"
                  >
                    Read More
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-1">
              <div className="w-10 h-10 bg-realty-navy text-white flex items-center justify-center">
                1
              </div>
              <Link href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                2
              </Link>
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">
                ...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-realty-lightGray">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Stay updated with the latest real estate news, market trends, and exclusive property listings in Bangalore.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="border rounded-sm px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-realty-red"
              />
              <button className="bg-realty-red hover:bg-realty-red/90 text-white px-6 py-2 rounded-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}