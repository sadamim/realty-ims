import React from 'react';
import RootLayout from '@/components/layout/RootLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { buildMetadata } from '@/lib/seo';


// Page-level SEO. Without this the page inherits only the site-wide title
// and description from the root layout, which every other page also has.
export const metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Talk to a Realty Focus advisor about buying, selling or renting property in Bangalore. Site visits, home-loan help and documentation support.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <RootLayout>
      {/* Header Banner */}
      <div className="relative bg-about bg-cover bg-center py-16 ">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-white relative z-10">
          <h1 className="text-3xl font-bold text-center">
            CONTACT US
          </h1>
          <p className="text-center mt-2">Real Estate Property Portal in Bangalore</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="py-16 container">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-8 text-center text-realty-navy">
              CONTACT US<span className="text-realty-red">.</span>
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input id="name" placeholder="Enter your name" className="w-full" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" className="w-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="isd" className="block text-sm font-medium text-gray-700 mb-1">
                    ISD
                  </label>
                  <select id="isd" className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-realty-red">
                    <option value="india">India (+91)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact No.
                  </label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" className="w-full" />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea id="message" placeholder="Enter your message" className="w-full" rows={6} />
              </div>

              <div className="flex justify-center">
                <Button className="bg-realty-red hover:bg-realty-red/90 text-white px-8 py-2 rounded-sm">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Google Map Would Be Embedded Here</p>
              <p className="text-sm text-gray-400">(Contact address location map)</p>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}
