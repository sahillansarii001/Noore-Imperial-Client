'use client';
import ProductCard from '@/components/shop/ProductCard';

export default function RelatedProducts({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-24 border-t border-white/10">
      <div className="text-center mb-12">
        <h2 className="font-cormorant text-4xl text-ivory mb-4">You May Also Like</h2>
        <div className="w-12 h-[1px] bg-gold mx-auto" />
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
