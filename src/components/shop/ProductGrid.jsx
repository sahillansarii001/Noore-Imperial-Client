'use client';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/Loader';
import { ShoppingBag } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 lg:gap-x-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Skeleton className="absolute inset-0 w-full h-full" />
            </div>
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/3 h-4" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center px-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gold/60 border border-white/5 mb-6">
          <ShoppingBag className="w-6 h-6 font-light" />
        </div>
        <h3 className="font-cormorant text-3xl text-gold mb-3 tracking-wide uppercase">No Creations Found</h3>
        <p className="font-poppins text-xs text-grey leading-relaxed">
          We couldn't find any creations matching your current filters. Try resetting the filters or broadening your selection.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 lg:gap-x-8"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={itemVariants}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
