'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Loader({ fullPage = false, className }) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="text-gold font-cormorant text-4xl tracking-[0.2em] uppercase"
        >
          Noore Imperial
        </motion.div>
        <motion.div 
          className="mt-4 h-[1px] bg-gold w-0"
          animate={{ w: "100px", width: "100px" }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    );
  }

  return (
    <div className={cn("flex justify-center py-8", className)}>
      <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  );
}

export function Skeleton({ className }) {
  return (
    <div className={cn("animate-pulse bg-[#1a1a1a]", className)} />
  );
}
