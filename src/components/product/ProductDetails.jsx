'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export default function ProductDetails({ product }) {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="flex flex-col">
      <span className="font-montserrat text-gold tracking-[0.3em] text-[10px] uppercase mb-3">
        {product.category?.name || 'Pret-a-Porter'}
      </span>
      
      <h1 className="font-cormorant text-3xl lg:text-4xl text-ivory mb-4 tracking-wide leading-tight">{product.name}</h1>
      
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-poppins text-2xl text-gold font-medium">{formatPrice(product.price)}</span>
        {product.compare_price > product.price && (
          <span className="font-poppins text-sm text-grey line-through">{formatPrice(product.compare_price)}</span>
        )}
      </div>

      {/* Reviews Summary */}
      <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-6 select-none">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-3.5 h-3.5 fill-gold text-gold" strokeWidth={0} />
          ))}
        </div>
        <span className="font-poppins text-xs text-grey tracking-wide">(12 reviews)</span>
      </div>

      <div className="font-poppins text-xs text-grey leading-[1.8] mb-8 font-light max-w-md">
        {product.description || 'Elevate your wardrobe with this exquisite piece from Noore Imperial. Crafted with the finest materials and meticulous attention to detail.'}
      </div>

      {/* Accordions */}
      <div className="border-t border-white/5 pt-1 mb-8">
        
        <div className="border-b border-white/5">
          <button 
            onClick={() => toggleAccordion('fabric')}
            className="w-full py-4 flex justify-between items-center text-ivory hover:text-gold transition-colors duration-300 group"
          >
            <span className="font-montserrat text-[10px] tracking-[0.2em] uppercase font-medium">Fabric & Care</span>
            {openAccordion === 'fabric' ? (
              <ChevronUp className="w-4 h-4 text-grey group-hover:text-gold transition-colors" />
            ) : (
              <ChevronDown className="w-4 h-4 text-grey group-hover:text-gold transition-colors" />
            )}
          </button>
          <AnimatePresence initial={false}>
            {openAccordion === 'fabric' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }} 
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pb-5 font-poppins text-xs text-grey leading-[1.8] font-light">
                  Crafted from premium Italian silk. Dry clean only. Iron on low heat. Store in the provided Noore Imperial garment bag.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-b border-white/5">
          <button 
            onClick={() => toggleAccordion('delivery')}
            className="w-full py-4 flex justify-between items-center text-ivory hover:text-gold transition-colors duration-300 group"
          >
            <span className="font-montserrat text-[10px] tracking-[0.2em] uppercase font-medium">Shipping & Returns</span>
            {openAccordion === 'delivery' ? (
              <ChevronUp className="w-4 h-4 text-grey group-hover:text-gold transition-colors" />
            ) : (
              <ChevronDown className="w-4 h-4 text-grey group-hover:text-gold transition-colors" />
            )}
          </button>
          <AnimatePresence initial={false}>
            {openAccordion === 'delivery' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }} 
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pb-5 font-poppins text-xs text-grey leading-[1.8] font-light">
                  Complimentary worldwide shipping on orders above ₹50,000. Returns accepted within 14 days of delivery. Custom-tailored pieces are non-refundable.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
