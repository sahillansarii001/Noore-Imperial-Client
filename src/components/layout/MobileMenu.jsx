'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MobileMenu({ isOpen, onClose, isAuthenticated, dashboardPath }) {
  const links = [
    { name: 'Shop All', path: '/shop' },
    { name: 'Bridal Studio', path: '/bridal-studio' },
    { name: 'Book Consultation', path: '/consultation/book' },
    { name: 'Academy', path: '/academy' },
    { name: 'Franchise Opportunities', path: '/franchise' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
          />
          
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-black border-r border-gold/20 z-50 md:hidden flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <span className="font-cormorant text-2xl text-gold tracking-wider uppercase">Menu</span>
              <button onClick={onClose} className="text-grey hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={onClose}
                  className="flex items-center justify-between p-4 rounded bg-[#111] border border-transparent hover:border-gold/30 hover:bg-[#1a1a1a] transition-all group"
                >
                  <span className="font-montserrat text-sm tracking-widest uppercase text-ivory group-hover:text-gold transition-colors">
                    {link.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-grey group-hover:text-gold transition-colors" />
                </Link>
              ))}
            </nav>

            <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
              {isAuthenticated ? (
                <Link 
                  href={dashboardPath}
                  onClick={onClose}
                  className="block w-full text-center bg-transparent border border-gold text-gold hover:bg-gold hover:text-black py-3 font-montserrat uppercase tracking-wider text-sm transition-colors"
                >
                  My Account
                </Link>
              ) : (
                <div className="flex gap-4">
                  <Link 
                    href="/auth/login"
                    onClick={onClose}
                    className="flex-1 text-center bg-transparent border border-gold text-gold hover:bg-gold hover:text-black py-3 font-montserrat uppercase tracking-wider text-sm transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/auth/register"
                    onClick={onClose}
                    className="flex-1 text-center bg-gold text-black hover:bg-gold-light py-3 font-montserrat uppercase tracking-wider text-sm transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
