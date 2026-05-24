'use client';
import { cn } from '@/lib/utils';

export default function SizeSelector({ variants, selectedSize, onSelect }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-end mb-4 select-none">
        <h4 className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-ivory font-medium">Select Size</h4>
        <button className="font-montserrat text-[10px] text-gold underline underline-offset-4 tracking-[0.15em] uppercase hover:text-ivory transition-colors duration-300">
          Size Guide
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2.5">
        {variants.map(variant => {
          const isSelected = selectedSize?.id === variant.id;
          const isOutOfStock = variant.stock <= 0;
          
          return (
            <button
              key={variant.id}
              disabled={isOutOfStock}
              onClick={() => onSelect(variant)}
              className={cn(
                "w-11 h-11 border text-[10px] font-montserrat flex items-center justify-center transition-all duration-300 relative",
                isSelected 
                  ? "bg-gold border-gold text-black font-semibold" 
                  : "bg-transparent border-white/10 text-ivory hover:border-gold hover:text-gold",
                isOutOfStock && "opacity-35 cursor-not-allowed border-white/5 text-grey/65 overflow-hidden"
              )}
            >
              {variant.size}
              {isOutOfStock && (
                <div className="absolute inset-0 w-full h-[1px] bg-white/20 rotate-45 top-1/2 -translate-y-1/2 left-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
