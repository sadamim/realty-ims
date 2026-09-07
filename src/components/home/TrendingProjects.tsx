// components/home/TrendingProjects.tsx
// Server component — see FeaturedProjects.tsx.
import React from 'react';
import ProjectsCarousel from '@/components/home/ProjectsCarousel';
import type { MicrositeListItem } from '@/lib/microsites';

export default function TrendingProjects({ projects }: { projects: MicrositeListItem[] }) {
  return (
    <ProjectsCarousel
      eyebrow="Moving fast this month"
      heading="Trending Projects"
      subtitle="The launches drawing the most site visits and enquiries right now across Bangalore's growth corridors."
      badge="Trending"
      projects={projects}
      emptyMessage="No trending projects yet — set a project's type to 'Trending' in the admin panel."
      tone="cream"
    />
  );
}
