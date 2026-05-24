'use client';
import CategoryBanner from '@/components/shop/CategoryBanner';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function BridalStudioPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <CategoryBanner title="Bridal Studio" breadcrumb={false} />
      
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-cormorant text-5xl text-ivory mb-8">The Bespoke Bridal Experience</h2>
          <p className="font-poppins text-lg text-grey leading-relaxed mb-12">
            Your wedding day is a tapestry of moments that last a lifetime. At the Noore Imperial Bridal Studio, 
            we weave your dreams into reality. From the first consultation to the final fitting, our master 
            artisans work tirelessly to ensure you look nothing short of imperial.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/consultation/book">
              <Button variant="primary" size="lg">Book a Bridal Consultation</Button>
            </Link>
            <Link href="/shop/bridal">
              <Button variant="secondary" size="lg">Explore Bridal Collection</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-0 relative h-[60vh] min-h-[500px]">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1964&auto=format&fit=crop" 
          alt="Bridal Process" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="font-cormorant text-6xl text-gold italic text-center px-4">
            "Crafting legends, one gown at a time."
          </h3>
        </div>
      </section>
    </div>
  );
}
