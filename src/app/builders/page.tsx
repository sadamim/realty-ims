import React from 'react';
import RootLayout from '@/components/layout/RootLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

// Mock data for builders
const builders = [
  {
    id: 1,
    name: 'Brigade Group',
    logo: '/images/builder-logo.jpeg',
    description: `Brigade Group, one of India's leading property developers, has been transforming cityscapes across South India with its developments across Residential, Commercial, Retail, Hospitality and Education sectors.`,
    established: '1986',
    completedProjects: '250+',
    ongoingProjects: '30+',
    locations: ['Bangalore', 'Chennai', 'Hyderabad', 'Mysore', 'Kochi'],
    slug: 'brigade-group'
  },
  {
    id: 2,
    name: 'Prestige Group',
    logo: '/images/builder-logo.jpeg',
    description: `The Prestige Group has cemented its place as one of India's leading real estate developers, having completed more than 247 projects covering over 134 million sq ft.`,
    established: '1986',
    completedProjects: '247+',
    ongoingProjects: '45+',
    locations: ['Bangalore', 'Chennai', 'Hyderabad', 'Goa', 'Mangalore', 'Kochi'],
    slug: 'prestige-group'
  },
  {
    id: 3,
    name: 'Sobha Developers',
    logo: '/images/builder-logo.jpeg',
    description: `Sobha Limited is one of the fastest growing and foremost backward integrated real estate players in the country. The company has a pan India presence with focus on residential and contractual projects.`,
    established: '1995',
    completedProjects: '140+',
    ongoingProjects: '25+',
    locations: ['Bangalore', 'Gurgaon', 'Chennai', 'Pune', 'Coimbatore'],
    slug: 'sobha-developers'
  },
  {
    id: 4,
    name: 'Puravankara',
    logo: '/images/builder-logo.jpeg',
    description: `Puravankara Limited is one of India's leading listed real estate companies, with presence in Bangalore, Kochi, Chennai, Coimbatore, Mangaluru, Hyderabad, Mysore, Mumbai and Pune.`,
    established: '1975',
    completedProjects: '75+',
    ongoingProjects: '22+',
    locations: ['Bangalore', 'Chennai', 'Hyderabad', 'Kochi', 'Pune', 'Mumbai'],
    slug: 'puravankara'
  },
  {
    id: 5,
    name: 'Shriram Properties',
    logo: '/images/builder-logo.jpeg',
    description: 'Shriram Properties is a leading residential real estate development company in South India, primarily focused on the mid-market and affordable housing categories.',
    established: '2000',
    completedProjects: '30+',
    ongoingProjects: '15+',
    locations: ['Bangalore', 'Chennai', 'Coimbatore', 'Visakhapatnam'],
    slug: 'shriram-properties'
  },
  {
    id: 6,
    name: 'Godrej Group',
    logo: '/images/builder-logo.jpeg',
    description: 'Godrej Properties brings the Godrej Group philosophy of innovation, sustainability, and excellence to the real estate industry.',
    established: '1990',
    completedProjects: '100+',
    ongoingProjects: '35+',
    locations: ['Bangalore', 'Mumbai', 'Pune', 'NCR', 'Ahmedabad', 'Kolkata'],
    slug: 'godrej-group'
  },
  {
    id: 7,
    name: 'Assetz Homes',
    logo: '/images/builder-logo.jpeg',
    description: 'Assetz is a Singapore-based multi-faceted property development company focusing on Residential, Commercial and Warehousing assets.',
    established: '2006',
    completedProjects: '20+',
    ongoingProjects: '10+',
    locations: ['Bangalore'],
    slug: 'assetz-homes'
  },
  {
    id: 8,
    name: 'Ds-max Properties',
    logo: '/images/builder-logo.jpeg',
    description: 'DS-MAX Properties is one of the fastest growing real estate companies in Bangalore. The company has successfully completed numerous residential projects across the city.',
    established: '2007',
    completedProjects: '80+',
    ongoingProjects: '15+',
    locations: ['Bangalore'],
    slug: 'ds-max-properties'
  },
  {
    id: 9,
    name: 'Salarpuria Sattva Group',
    logo: '/images/builder-logo.jpeg',
    description: 'Salarpuria Sattva Group is a leading property development, management and consulting company in India.',
    established: '1986',
    completedProjects: '120+',
    ongoingProjects: '30+',
    locations: ['Bangalore', 'Hyderabad', 'Pune', 'Kolkata', 'Jaipur', 'Goa'],
    slug: 'sattva-group'
  },
  {
    id: 10,
    name: 'Adarsh Developers',
    logo: '/images/builder-logo.jpeg',
    description: 'Adarsh Developers has been at the forefront of creating landmark residential projects in Bangalore.',
    established: '1988',
    completedProjects: '40+',
    ongoingProjects: '12+',
    locations: ['Bangalore'],
    slug: 'adarsh-developers'
  },
  {
    id: 11,
    name: 'Mahaveer Group',
    logo: '/images/builder-logo.jpeg',
    description: 'Mahaveer Group has established itself as one of the most reputed builders in Bangalore.',
    established: '1994',
    completedProjects: '35+',
    ongoingProjects: '8+',
    locations: ['Bangalore'],
    slug: 'mahaveer-group'
  },
  {
    id: 12,
    name: 'Century Real Estate',
    logo: '/images/builder-logo.jpeg',
    description: 'Century Real Estate is one of the oldest and most trusted real estate companies in India.',
    established: '1973',
    completedProjects: '50+',
    ongoingProjects: '10+',
    locations: ['Bangalore'],
    slug: 'century-real-estate'
  }
];

export default function BuildersPage() {
  return (
    <RootLayout>
      {/* Header Banner */}
      <div className="relative bg-realty-darkNavy py-16">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-3xl font-bold text-center">
            Top Builders in Bangalore
          </h1>
          <p className="text-center mt-2">List of the most prestigious real estate developers in Bangalore</p>
        </div>
      </div>

      {/* Builders Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {builders.map((builder) => (
              <Card key={builder.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-realty-navy">
                        <Link href={`/builders/${builder.slug}`} className="hover:text-realty-red transition-colors">
                          {builder.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">Est. {builder.established}</p>
                    </div>
                    <div className="w-16 h-16 relative">
                      <Image 
                        src={builder.logo}
                        alt={builder.name}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {builder.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {builder.locations.slice(0, 3).map((location, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {location}
                      </span>
                    ))}
                    {builder.locations.length > 3 && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        +{builder.locations.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Completed Projects</p>
                      <p className="font-semibold">{builder.completedProjects}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Ongoing Projects</p>
                      <p className="font-semibold">{builder.ongoingProjects}</p>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
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
              Bangalore, also known as the Silicon Valley of India, has witnessed tremendous growth in its real estate sector over the years. The city's booming IT industry, pleasant climate, and cosmopolitan culture have made it a preferred destination for homebuyers and investors alike.
            </p>
            <p className="mb-4">
              Realty Focus brings you a comprehensive list of the top builders in Bangalore who have contributed significantly to the city's skyline. These developers are known for their quality construction, innovative designs, timely delivery, and customer satisfaction.
            </p>
            <p>
              Explore our curated list of top builders and discover the right developer for your next property investment in Bangalore.
            </p>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}