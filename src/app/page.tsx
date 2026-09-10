// Server component: reads MongoDB directly, no HTTP hop, no client-side
// loading state. The project_type filter runs in Mongo, so each slider joins
// only its own handful of rows instead of the whole collection.
import RootLayout from '@/components/layout/RootLayout';
import HeroSection from '@/components/home/HeroSection';
import RecommendedSection from '@/components/home/RecommendedSection';
import StatsBand from '@/components/home/StatsBand';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import TrendingProjects from '@/components/home/TrendingProjects';
import WhyUs from '@/components/home/WhyUs';
import Testimonials from '@/components/home/Testimonials';
import CtaBand from '@/components/home/CtaBand';
import { getAllMicrositesMain } from '@/lib/microsites';
import { getActiveBanners, getTestimonials } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';


// Page-level SEO. Without this the page inherits only the site-wide title
// and description from the root layout, which every other page also has.
export const metadata = buildMetadata({
  title: 'Real Estate in Bangalore — Apartments, Villas & Plots',
  description:
    "Bangalore's top real estate platform. Verified apartments, villas and plots from the city's most trusted builders, with honest pricing and zero brokerage advisory.",
  path: '/',
});

export const revalidate = 60;

export default async function Home() {
  const [featured, trending, banners, testimonials] = await Promise.all([
    getAllMicrositesMain({ projectType: 'featured' }),
    getAllMicrositesMain({ projectType: 'Trending' }),
    getActiveBanners(),
    getTestimonials(),
  ]);

  return (
    <RootLayout>
      <HeroSection slides={banners} />
      <RecommendedSection />
      <FeaturedProjects projects={featured} />
      <StatsBand />
      <TrendingProjects projects={trending} />
      {/* Renders nothing until a testimonial is added in the admin panel. */}
      <Testimonials items={testimonials} />
      <WhyUs />
      <CtaBand />
    </RootLayout>
  );
}
