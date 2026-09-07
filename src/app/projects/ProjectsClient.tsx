'use client';
// Interactive shell for /projects. Only the current page of projects is passed
// in — pagination is server-driven through the ?page= query string, so the
// browser never receives rows it is not displaying.
import React from 'react';
import Link from 'next/link';
import RootLayout from '@/components/layout/RootLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import ProjectCard from '@/components/home/ProjectCard';
import { decodeHtml, formatDate, formatPriceRange } from '@/lib/format';
import type { MicrositeListItem } from '@/lib/microsites';

const PAGES_PER_GROUP = 10;

interface Props {
  projects: MicrositeListItem[];
  currentPage: number;
  totalPages: number;
  total: number;
}

export default function ProjectsClient({ projects, currentPage, totalPages, total }: Props) {
  const group = Math.floor((currentPage - 1) / PAGES_PER_GROUP);
  const startPage = group * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);

  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  const prevGroupPage = Math.max(1, startPage - PAGES_PER_GROUP);
  const nextGroupPage = Math.min(totalPages, startPage + PAGES_PER_GROUP);

  return (
    <RootLayout>
      {/* Header Banner */}
      <div className="relative bg-realty-darkNavy py-16">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-3xl font-bold text-center">PROJECTS</h1>
          <p className="text-center mt-2">Residential Projects in Bangalore for Sale</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-realty-darkNavy py-10 container">
        <div className="container mx-auto px-4">
          <h2 className="text-white text-center text-xl mb-6">Search Your Dream Home!</h2>
          <div className="bg-white p-6 rounded-sm shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Project Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential-apartment">Residential Apartment</SelectItem>
                  <SelectItem value="residential-villas">Residential Villas</SelectItem>
                  <SelectItem value="residential-plot">Residential Plot</SelectItem>
                  <SelectItem value="apartment-penthouse">
                    Residential Apartment and Penthouse
                  </SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="text"
                placeholder="Select Project / Locality / Builder"
                className="bg-white"
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button className="bg-realty-red hover:bg-realty-red/90 text-white px-8">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <section className="py-16 container">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">OUR PROJECTS</h2>
          <p className="text-sm text-gray-500 mb-6">
            {total.toLocaleString()} projects · page {currentPage} of {totalPages}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project) => (
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
                    imageUrl: project.featured_image,
                    buildername: project.builder_name || 'N/A',
                    status: project.status,
                    slug: project.name?.toLowerCase().replace(/\s+/g, '-'),
                  }}
                />
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </div>

          {/* Pagination — plain links so each page is server-rendered and shareable */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
              <Link
                href={`/projects?page=${prevGroupPage}`}
                aria-disabled={startPage === 1}
                className={`px-3 py-1 border rounded ${
                  startPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
                }`}
              >
                Prev
              </Link>

              {pageNumbers.map((num) => (
                <Link
                  key={num}
                  href={`/projects?page=${num}`}
                  aria-current={currentPage === num ? 'page' : undefined}
                  className={`w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100 ${
                    currentPage === num ? 'bg-gray-200 font-semibold' : ''
                  }`}
                >
                  {num}
                </Link>
              ))}

              <Link
                href={`/projects?page=${nextGroupPage}`}
                aria-disabled={endPage === totalPages}
                className={`px-3 py-1 border rounded ${
                  endPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
                }`}
              >
                Next
              </Link>
            </div>
          )}
        </div>
      </section>
    </RootLayout>
  );
}
