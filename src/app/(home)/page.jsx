import HeroBanner from '@/components/home/HeroBanner';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import BridalStudioSection from '@/components/home/BridalStudioSection';
import WesternCollectionSection from '@/components/home/WesternCollectionSection';
import IndoWesternSection from '@/components/home/IndoWesternSection';
import KidsCollectionSection from '@/components/home/KidsCollectionSection';
import AcademySection from '@/components/home/AcademySection';
import FranchiseSection from '@/components/home/FranchiseSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InstagramFeed from '@/components/home/InstagramFeed';
import Newsletter from '@/components/home/Newsletter';
import ConsultationSection from '@/components/home/ConsultationSection';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedCollections />
      <BridalStudioSection />
      <WesternCollectionSection />
      <IndoWesternSection />
      <KidsCollectionSection />
      <AcademySection />
      <ConsultationSection />
      <FranchiseSection />
      <TestimonialsSection />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
