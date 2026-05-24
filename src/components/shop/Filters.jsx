'use client';
import { useState } from 'react';
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function Filters({ filters, setFilters, onApply, isMobileOpen, setIsMobileOpen }) {
  const [openSections, setOpenSections] = useState({ categories: true, price: true, size: true });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = ['Bridal', 'Western', 'Indo Western', 'Kids', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const FilterContent = () => (
    <div className="flex flex-col gap-8">
      {/* Categories */}
      <div className="border-b border-white/5 pb-6">
        <button 
          onClick={() => toggleSection('categories')} 
          className="flex justify-between w-full items-center mb-4 text-ivory hover:text-gold transition-colors duration-300 group"
        >
          <h4 className="font-montserrat text-xs tracking-[0.2em] uppercase font-medium">Category</h4>
          {openSections.categories ? (
            <ChevronUp className="w-4 h-4 text-grey group-hover:text-gold transition-colors" />
          ) : (
            <ChevronDown className="w-4 h-4 text-grey group-hover:text-gold transition-colors" />
          )}
        </button>
        <AnimatePresence initial={false}>
          {openSections.categories && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }} 
              transition={{ duration: 0.3 }}
              className="overflow-hidden flex flex-col gap-3.5"
            >
              {categories.map(cat => {
                const isChecked = filters.categories?.includes(cat) || false;
                return (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={isChecked}
                        onChange={(e) => {
                          const newCats = e.target.checked 
                            ? [...(filters.categories || []), cat]
                            : (filters.categories || []).filter(c => c !== cat);
                          setFilters(prev => ({ ...prev, categories: newCats }));
                        }}
                      />
                      <div className={`w-4 h-4 border transition-all duration-300 flex items-center justify-center ${
                        isChecked 
                          ? 'border-gold bg-gold text-black' 
                          : 'border-white/20 bg-transparent group-hover:border-gold/50'
                      }`}>
                        {isChecked && (
                          <svg className="w-2.5 h-2.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={`font-poppins text-xs transition-colors duration-300 ${
                      isChecked ? 'text-gold' : 'text-grey group-hover:text-ivory'
                    }`}>{cat}</span>
                  </label>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div className="border-b border-white/5 pb-6">
        <button 
          onClick={() => toggleSection('price')} 
          className="flex justify-between w-full items-center mb-4 text-ivory hover:text-gold transition-colors duration-300 group"
        >
          <h4 className="font-montserrat text-xs tracking-[0.2em] uppercase font-medium">Price Range</h4>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-grey group-hover:text-gold transition-colors" />
          ) : (
            <ChevronDown className="w-4 h-4 text-grey group-hover:text-gold transition-colors" />
          )}
        </button>
        <AnimatePresence initial={false}>
          {openSections.price && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }} 
              transition={{ duration: 0.3 }}
              className="overflow-hidden flex gap-4"
            >
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-grey font-poppins">₹</span>
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-full bg-[#0F0F0F]/80 border border-white/10 p-2.5 pl-7 text-xs font-poppins text-ivory placeholder-grey/50 focus:border-gold/50 focus:ring-0 transition-colors"
                  value={filters.minPrice || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                />
              </div>
              <span className="text-grey flex items-center font-light">-</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-grey font-poppins">₹</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-full bg-[#0F0F0F]/80 border border-white/10 p-2.5 pl-7 text-xs font-poppins text-ivory placeholder-grey/50 focus:border-gold/50 focus:ring-0 transition-colors"
                  value={filters.maxPrice || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Size */}
      <div className="border-b border-white/5 pb-6">
        <button 
          onClick={() => toggleSection('size')} 
          className="flex justify-between w-full items-center mb-4 text-ivory hover:text-gold transition-colors duration-300 group"
        >
          <h4 className="font-montserrat text-xs tracking-[0.2em] uppercase font-medium">Size</h4>
          {openSections.size ? (
            <ChevronUp className="w-4 h-4 text-grey group-hover:text-gold transition-colors" />
          ) : (
            <ChevronDown className="w-4 h-4 text-grey group-hover:text-gold transition-colors" />
          )}
        </button>
        <AnimatePresence initial={false}>
          {openSections.size && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }} 
              transition={{ duration: 0.3 }}
              className="overflow-hidden flex flex-wrap gap-2.5"
            >
              {sizes.map(size => {
                const isSelected = filters.sizes?.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      const newSizes = isSelected
                        ? (filters.sizes || []).filter(s => s !== size)
                        : [...(filters.sizes || []), size];
                      setFilters(prev => ({ ...prev, sizes: newSizes }));
                    }}
                    className={`w-11 h-11 border text-[10px] font-montserrat flex items-center justify-center transition-all duration-300
                      ${isSelected 
                        ? 'bg-gold border-gold text-black font-semibold' 
                        : 'bg-transparent border-white/10 text-grey hover:border-gold/50 hover:text-ivory'}`}
                  >
                    {size}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex flex-col gap-3 mt-2">
        <Button variant="primary" className="w-full text-[10px] tracking-[0.2em] py-3.5" onClick={onApply}>
          Apply Filters
        </Button>
        <button 
          onClick={() => { setFilters({}); onApply(); }} 
          className="text-grey text-[10px] font-montserrat tracking-[0.2em] uppercase underline underline-offset-4 hover:text-gold transition-colors duration-300 text-center py-2"
        >
          Clear All
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0 pr-12 border-r border-white/5">
        <div className="sticky top-28">
          <div className="flex items-center gap-3 mb-8 text-gold">
            <SlidersHorizontal className="w-4 h-4" />
            <h3 className="font-cormorant text-2xl tracking-widest uppercase">Filters</h3>
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-[#0B0B0B] border-r border-white/5 z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-2 text-gold">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="font-cormorant text-2xl tracking-wider uppercase">Filters</span>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="text-grey hover:text-white transition-colors duration-300 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
