// components/home/FeaturedProjects.tsx
// Server component — the data arrives from src/app/page.tsx, which reads it
// straight out of MongoDB. No client-side fetch, no loading flash.
import React from 'react';
import ProjectsCarousel from '@/components/home/ProjectsCarousel';
import type { MicrositeListItem } from '@/lib/microsites';

export default function FeaturedProjects({ projects }: { projects: MicrositeListItem[] }) {
  return (
    <ProjectsCarousel
      eyebrow="Handpicked for you"
      heading="Featured Projects"
      subtitle="Signature addresses our advisors would shortlist for their own families — vetted for build quality, approvals and long-term value."
      badge="Featured"
      projects={projects}
      emptyMessage="No featured projects yet — set a project's type to 'featured' in the admin panel."
    />
  );
}
