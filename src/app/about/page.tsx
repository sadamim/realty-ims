import React from 'react';
import RootLayout from '@/components/layout/RootLayout';
import Image from 'next/image';
import { buildMetadata } from '@/lib/seo';


// Page-level SEO. Without this the page inherits only the site-wide title
// and description from the root layout, which every other page also has.
export const metadata = buildMetadata({
  title: 'About Us',
  description:
    'Realty Focus is a Bangalore real estate platform connecting buyers, sellers and developers — with transparency, licensed advisors and over 5,000 homes sold.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <RootLayout>
      {/* Header Banner */}
      <div className="relative bg-about bg-cover bg-center py-16 ">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-white relative z-10">
          <h1 className="text-3xl font-bold text-center">
            ABOUT US
          </h1>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="py-16 container">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 relative">
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image
                  src="/images/about-img.jpeg"
                  alt="About Realty Focus"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-bold text-realty-navy">WHO WE ARE</h2>
                <span className="text-realty-red text-2xl ml-2 font-bold">?</span>
              </div>
              <p className="text-gray-600 mb-4">
                At Realty Focus, we believe that home is more than just a shared space of family.
                Keeping this value system central to our operations, Realty Focus is one of the leading
                real estate organisations continually working for our clients to find the best property
                which they can call home. We understand buying or renting a home is an arduous process.
                We simplify real estate buying and selling making the process of owning a dream home a
                seamless and smooth. As a recognised real estate platform, we make the interactions between
                buyers; sellers as well as agents interact more engagingly and meaningfully.
              </p>
              <p className="text-gray-600">
                Since our inception, Realty Focus has always strived for setting new standards for
                customer service, business ethics and transparency. The unwavering commitments of
                Realty Focus have made us one of the most preferred real estate platforms by many.
                Realty Focus in its commitment on delivering international quality products in a timely
                manner with utmost perfection, have sold more than 5,000 homes across major metropolitan
                cities in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-gray-50 container">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-bold text-realty-navy">WHAT WE DO</h2>
                <span className="text-realty-red text-2xl ml-2 font-bold">?</span>
              </div>
              <p className="text-gray-600 mb-4">
                Realty Focus gives you the opportunity to exchange information about property you want to
                buy or sell with others. Here you also get the opportunity to search, advertise, and
                browse through a vast and exhaustive listing of properties. Apart from offering an online
                platform wherein property owners, brokers, and developers can list their properties for
                sale, rent or purchase of any property, Realty Focus also allows you to advertise on the site.
              </p>
              <p className="text-gray-600">
                Due to the ever evolving nature of the real estate industry, we share the latest information
                and updates related to real estate so that prospective buyers can make informed decisions.
                Our focus is on making property search quicker and easier for everyone.
              </p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-md shadow-md">
                  <div className="w-12 h-12 bg-realty-navy/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-realty-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-realty-navy">Property Search</h3>
                  <p className="text-gray-600 text-sm">Easily search for properties that match your criteria and preferences.</p>
                </div>

                <div className="bg-white p-6 rounded-md shadow-md">
                  <div className="w-12 h-12 bg-realty-navy/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-realty-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-realty-navy">Property Listing</h3>
                  <p className="text-gray-600 text-sm">List your property for sale, rent or purchase with detailed information.</p>
                </div>

                <div className="bg-white p-6 rounded-md shadow-md">
                  <div className="w-12 h-12 bg-realty-navy/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-realty-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-realty-navy">Expert Consultation</h3>
                  <p className="text-gray-600 text-sm">Get expert advice on buying, selling, or renting properties.</p>
                </div>

                <div className="bg-white p-6 rounded-md shadow-md">
                  <div className="w-12 h-12 bg-realty-navy/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-realty-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-realty-navy">Market Updates</h3>
                  <p className="text-gray-600 text-sm">Stay updated with latest trends and information in the real estate market.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-realty-darkNavy text-white container">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-10">
            <h2 className="text-2xl font-bold">WHY CHOOSE US</h2>
            <span className="text-realty-red text-2xl ml-2 font-bold">?</span>
          </div>

          <p className="text-center max-w-4xl mx-auto mb-10">
            Realty Focus takes every project with dedication working towards greatest client satisfaction.
            In our endeavor to constantly enhance the quality of our work, we stand out and preferred by
            many because:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border border-white/20 rounded-md">
              <h3 className="text-lg font-semibold mb-2">We are Licensed Real Estate Professionals</h3>
            </div>
            <div className="p-6 border border-white/20 rounded-md">
              <h3 className="text-lg font-semibold mb-2">We are transparent in all our dealings!</h3>
            </div>
            <div className="p-6 border border-white/20 rounded-md">
              <h3 className="text-lg font-semibold mb-2">We value time getting the deal done instantly</h3>
            </div>
            <div className="p-6 border border-white/20 rounded-md">
              <h3 className="text-lg font-semibold mb-2">We work on your trust and help you in find the best houses you make home</h3>
            </div>
            <div className="p-6 border border-white/20 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Buyers and sellers like us because we connect them to their potential client instantly</h3>
            </div>
            <div className="p-6 border border-white/20 rounded-md">
              <h3 className="text-lg font-semibold mb-2">We simplify all the complicated real estate contracts</h3>
            </div>
            <div className="p-6 border border-white/20 rounded-md lg:col-span-3">
              <h3 className="text-lg font-semibold mb-2 text-center">We are known for impeccable execution and on-time delivery track record</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 container">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-md shadow-md">
              <div className="w-16 h-16 bg-realty-red rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Our Vision</h3>
              <p className="text-gray-600 text-center">
                Realty Focus gives special emphasis on effective strategies to be the number one online real
                estate platform. In doing so, we place the highest standard of ethics, sincerity and
                determination and giving quality real estate services to our clients. To turn your property
                into a valuable prized asset, we work with you as your friend and a guide.
              </p>
            </div>

            <div className="bg-white p-8 rounded-md shadow-md">
              <div className="w-16 h-16 bg-realty-red rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Our Mission</h3>
              <p className="text-gray-600 text-center">
                At Realty Focus, we constantly strive to meet or exceed our customer needs and expectations
                of price, service, and selection. Our Mission is to provide high quality real estate products
                and services of value pricing and establishing a successful relationship with our customers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-md shadow-md">
              <div className="w-16 h-16 bg-realty-red rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Our Value</h3>
              <p className="text-gray-600 text-center">
                Realty Focus is committed for a predominant focus on being a transparent and accountable
                online diversified real estate platform where we connect real estate buyers, sellers and
                developers get the best deal while delivering on being the best for client satisfaction
                and increase their return on investment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}
