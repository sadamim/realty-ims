// app/project/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import RootLayout from '@/components/layout/RootLayout';
import ProjectSlider from '@/components/ProjectSlider';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faKey, faBed, faHammer, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

// Components
import Gallery from '@/components/microsite/Gallery';
import FloorPlan from '@/components/microsite/FloorPlan';
import MasterPlanImage from '@/components/microsite/MasterPlan';
import { getMicrositeBySlug } from '@/lib/microsites';

export const revalidate = 60;

// Types
interface Project {
  id: number;
  title: string;
  location: string;
  description: string;
  configuration: string;
  area: string;
  possession: string;
  price: Array<{
    type: string;
    sqft: string;
    price: number;
    basic_cost: number;
  }>;
  imageUrls: string[];
  galleryimageUrls: string[];
  masterPlan: string;
  floorPlanimageUrls: string[];
  amenitiesimageUrls: string[];
  builderLogo: string;
  builderName: string;
  category: string;
  amenities: Array<{ name: string; image: string }>;
  specifications: { [key: string]: string };
  slug: string;
}

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Helper to convert CSV to image URL array
const toUrlArray = (csv, base) => {
  if (!csv) return [];
  return csv
    .split(',')
    .map(idOrUrl => {
      const trimmed = idOrUrl.trim();

      if (trimmed.startsWith("http")) {
        return trimmed;
      }

      const hasValidExtension = /\.(jpg|jpeg|png|webp)$/i.test(trimmed);
      return `${base}${trimmed}${hasValidExtension ? '' : '.jpg'}`;
    })
    .filter(url => url);
};

// Main Page Component
export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  // Read straight from MongoDB — no HTTP round trip on the server.
  const rawData = await getMicrositeBySlug(slug);

  if (!rawData) {
    notFound();
  }

  // Base URLs
  const BASE = {
    slider: "https://realtyfocus.info/images/slider/",
    gallery: "https://realtyfocus.info/images/gallery/",
    floorPlan: "https://realtyfocus.info/images/floor_plan/",
    masterPlan: "https://realtyfocus.info/images/master_plan/",
    amenities: "https://realtyfocus.info/images/amenities/",
    builder: "https://realtyfocus.info/images/builderimage/",
  };

  const details = rawData.details || {};
  const floorplan = rawData.floorplan || [];
  const amenities = rawData.amenities || [];
  const name = rawData.name || "Unknown Project";

  const project: Project = {
    id: rawData.micro_id ?? 0,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    title: name,
    location: rawData.location ?? '',
    description: details.about ?? '',
    configuration: details.rooms ?? '',
    area: rawData.total_area ?? '',
    possession: rawData.possession ?? '',
    price: Array.isArray(rawData.price) ? rawData.price : [],
    imageUrls: toUrlArray(details.slider_image, BASE.slider),
    galleryimageUrls: toUrlArray(details.gallery_image, BASE.gallery),
    masterPlan: details.masterplan_image || '',
    floorPlanimageUrls: Array.isArray(floorplan)
      ? floorplan.map(fp => BASE.floorPlan + fp.image)
      : [],
    amenitiesimageUrls: Array.isArray(amenities)
      ? amenities.map(am => BASE.amenities + am.image)
      : [],
    builderLogo: details.mlogo ? BASE.builder + details.mlogo : '',
    builderName: details.builderName ?? "House of Hiranandani",
    category: rawData.project_type ?? '',
    amenities: Array.isArray(amenities) ? amenities : [],
    specifications: details.specifications ?? {},
  };

  return (
    <RootLayout>
      {/* Header Banner */}
      <div className="relative bg-realty-darkNavy py-10">
        <div className="container mx-auto px-4 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
              <p className="mt-2">{project.location}</p>
              <div className="mt-3 inline-block px-4 py-1 bg-realty-green text-white text-sm">
                {project.category}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-2xl font-bold">Price here</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2">
              {/* Slider */}
              <div className="relative aspect-video overflow-hidden rounded-md mb-6">
                <ProjectSlider title={project.title} imageUrls={project.imageUrls} />
              </div>

              {/* Overview */}
              <div className="bg-white p-6 rounded-md shadow-md mb-6 single-property-overview">
                <h2 className="text-xl font-bold mb-4 text-realty-navy">Overview</h2>
                <ul className="info-box">
                  <li className="item">
                    <div className="box-icon w-52"><FontAwesomeIcon icon={faHouse} /></div>
                    <div className="content">
                      <span className="label">Configuration:</span>
                      <span>{project.configuration}</span>
                    </div>
                  </li>
                  <li className="item">
                    <div className="box-icon w-52"><FontAwesomeIcon icon={faKey} /></div>
                    <div className="content">
                      <span className="label">Possession:</span>
                      <span>{project.possession}</span>
                    </div>
                  </li>
                  <li className="item">
                    <div className="box-icon w-52"><FontAwesomeIcon icon={faBed} /></div>
                    <div className="content">
                      <span className="label">Builder:</span>
                      <span>{project.builderName}</span>
                    </div>
                  </li>
                  <li className="item">
                    <div className="box-icon w-52"><FontAwesomeIcon icon={faHammer} /></div>
                    <div className="content">
                      <span className="label">Year Built:</span>
                      <span>2024</span>
                    </div>
                  </li>
                  <li className="item">
                    <div className="box-icon w-52"><FontAwesomeIcon icon={faArrowsAlt} /></div>
                    <div className="content">
                      <span className="label">Area:</span>
                      <span>{project.area}</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Description */}
              <div className="bg-white p-6 rounded-md shadow-md mb-6" id='about'>
                <h2 className="text-xl font-bold mb-4 text-realty-navy">Description</h2>
                <p className="text-gray-600 text-justify">{project.description}</p>
              </div>

              {/* Amenities */}
              {project.amenitiesimageUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 my-6">
                  {amenities.map((am, idx) => (
                    <div key={idx} className="text-center">
                      <Image
                        src={
                          am.image.includes('https://storage.googleapis.com/')
                            ? am.image
                            : `https://realtyfocus.info/images/amenities/${am.image}`
                        }
                        alt={am.name}
                        width={100}
                        height={100}
                        className="rounded mx-auto object-contain"
                      />
                      <p className="text-sm mt-2">{am.name}</p>
                      <p className="text-sm mt-2">{am.details}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Specifications */}
              {project.specifications && Object.keys(project.specifications).length > 0 && (
                <div className="bg-white p-6 rounded-md shadow-md mb-6" id="specifications">
                  <h2 className="text-xl font-bold mb-4 text-realty-navy">Specifications</h2>
                  <div className="space-y-4">
                    {Object.entries(project.specifications).map(([key, value]) => (
                      <div key={key}>
                        <p className="font-semibold capitalize">{key}</p>
                        <p className="text-gray-600">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Master Plan */}
              <MasterPlanImage imageUrl={project.masterPlan} />

              {/* Floor Plans */}
              <div className="bg-white p-6 rounded shadow my-6" id='floor-plan'>
                <h2 className="text-xl font-bold mb-4 text-realty-navy">Floor Plans</h2>
                <FloorPlan floorplan={floorplan} />
              </div>

              {/* Gallery */}
              <div className="bg-white p-6 rounded shadow my-6" id='gallery'>
                <h2 className="text-xl font-bold mb-4 text-realty-navy">Gallery</h2>
                <Gallery urls={project.galleryimageUrls} />
              </div>
            </div>

            {/* Right Column - Contact */}
            <div>
              <div className="bg-white p-6 rounded-md shadow-md sticky top-4">
                <h2 className="text-xl font-bold mb-4 text-realty-navy">Enquire Now</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input id="name" type="text" className="form-input" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input id="email" type="email" className="form-input" placeholder="Enter your email" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input id="phone" type="tel" className="form-input" placeholder="Enter your phone number" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea id="message" rows={4} className="form-textarea" placeholder="Enter your message"></textarea>
                  </div>
                  <Button className="w-full bg-realty-red hover:bg-realty-red/90 text-white">
                    Submit Enquiry
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}

// Pages are rendered on demand and cached for `revalidate` seconds, so there is
// no need to pre-build 2,200+ project routes at deploy time. Any slug not yet
// generated is rendered on first request.
export const dynamicParams = true;