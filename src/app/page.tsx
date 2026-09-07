// Server component: reads MongoDB directly, no HTTP hop, no client-side
// loading state. The project_type filter runs in Mongo, so each slider joins
// only its own handful of rows instead of the whole collection.
import { connection } from 'next/server';
import RootLayout from '@/components/layout/RootLayout';
import HeroSection from '@/components/home/HeroSection';
import RecommendedSection from '@/components/home/RecommendedSection';
import StatsBand from '@/components/home/StatsBand';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import TrendingProjects from '@/components/home/TrendingProjects';
import WhyUs from '@/components/home/WhyUs';
import CtaBand from '@/components/home/CtaBand';
import { getAllMicrositesMain } from '@/lib/microsites';

export const revalidate = 60;

export default async function Home() {
  // Defer MongoDB access to the first request so Vercel builds succeed even
  // when Atlas is unreachable from the build environment. ISR still applies.
  await connection();

  const [featured, trending] = await Promise.all([
    getAllMicrositesMain({ projectType: 'featured' }),
    getAllMicrositesMain({ projectType: 'Trending' }),
  ]);

  return (
    <RootLayout>
      <HeroSection />
      <RecommendedSection />
      <FeaturedProjects projects={featured} />
      <StatsBand />
      <TrendingProjects projects={trending} />
      <WhyUs />
      <CtaBand />
    </RootLayout>
  );
}
