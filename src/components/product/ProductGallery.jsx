'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductGallery({ images }) {
  const [mobileIndex, setMobileIndex] = useState(0);
  const containerRef = useRef(null);
  
  if (!images || images.length === 0) return null;

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== mobileIndex) {
      setMobileIndex(newIndex);
    }
  };

  const slide = (direction) => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const targetScroll = containerRef.current.scrollLeft + (direction === 'next' ? width : -width);
    containerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Desktop Layout: Editorial vertical list */}
      <div className="hidden md:flex flex-col gap-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] w-full overflow-hidden bg-[#0A0A0A] border border-white/5"
          >
            <img 
              src={img} 
              alt={`Product View ${i + 1}`} 
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-[1.2s] ease-out" 
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile Layout: Carousel slider */}
      <div className="md:hidden relative group">
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth w-full aspect-[3/4] bg-[#0A0A0A]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, i) => (
            <div 
              key={i} 
              className="w-full h-full flex-shrink-0 snap-start relative"
            >
              <img 
                src={img} 
                alt={`Product View ${i + 1}`} 
                className="w-full h-full object-cover object-center" 
              />
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        {images.length > 1 && (
          <>
            <button 
              onClick={() => slide('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-ivory border border-white/10 p-2 backdrop-blur-sm transition-colors duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => slide('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-ivory border border-white/10 p-2 backdrop-blur-sm transition-colors duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Fractional Index Indicator */}
        <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/10">
          <span className="font-montserrat text-[10px] tracking-widest text-ivory">
            {String(mobileIndex + 1).padStart(2, '0')}
          </span>
          <span className="font-montserrat text-[10px] text-grey mx-1">/</span>
          <span className="font-montserrat text-[10px] text-grey">
            {String(images.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
