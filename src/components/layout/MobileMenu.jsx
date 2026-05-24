'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ArrowRight, ShoppingBag, Heart, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const LINKS = [
  {
    name: 'Collections',
    path: '/shop',
    children: [
      { label: 'Women', path: '/shop/women', tag: 'New' },
      { label: 'Men', path: '/shop/men' },
      { label: 'Kids & Babies', path: '/shop/kids' },
      { label: 'Bridal Couture', path: '/shop/bridal', tag: 'Exclusive' },
      { label: 'Western Edit', path: '/shop/western' },
      { label: 'Indo Western', path: '/shop/indo-western' },
      { label: 'Accessories', path: '/shop/accessories' },
    ],
  },
  { name: 'Bridal Studio', path: '/bridal-studio' },
  { name: 'Book Consultation', path: '/consultation/book' },
  { name: 'Academy', path: '/academy' },
  { name: 'Franchise', path: '/franchise' },
];

export default function MobileMenu({ isOpen, onClose, isAuthenticated, dashboardPath }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 md:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 h-full w-[88%] max-w-[360px] bg-[#0c0c0c] border-r border-white/[0.06] z-50 md:hidden flex flex-col"
          >
            {/* Top gold line */}
            <div className="h-[1px] bg-gradient-to-r from-gold/60 via-gold/30 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.05]">
              <Link href="/" onClick={onClose} className="flex items-center gap-3">
                <div className="relative w-9 h-9">
                  <Image src="/logo.png" alt="Noore Imperial" fill className="object-contain drop-shadow-[0_0_10px_rgba(201,168,76,0.3)]" />
                </div>
                <div>
                  <p className="font-cormorant text-[16px] tracking-[0.22em] uppercase text-ivory leading-none">Noore Imperial</p>
                  <p className="font-montserrat text-[7px] tracking-[0.38em] text-gold/60 uppercase mt-0.5">Luxury Fashion</p>
                </div>
              </Link>
              <button
                onClick={onClose}
                className="p-2 text-grey/60 hover:text-ivory transition-colors duration-300 border border-white/[0.06] hover:border-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-3 px-3 scrollbar-none">
              {LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                >
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setExpanded(expanded === link.name ? null : link.name)}
                        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.03] group transition-colors duration-200"
                      >
                        <span className="font-montserrat text-[11px] tracking-[0.22em] uppercase text-ivory/70 group-hover:text-ivory transition-colors duration-200">
                          {link.name}
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 text-grey/40 transition-all duration-300 ${expanded === link.name ? 'rotate-180 text-gold' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {expanded === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 pl-4 border-l border-gold/15 py-1 space-y-0.5 mb-1">
                              {link.children.map(child => (
                                <Link
                                  key={child.label}
                                  href={child.path}
                                  onClick={onClose}
                                  className="flex items-center justify-between px-3 py-2.5 hover:bg-white/[0.03] group/child transition-colors duration-200"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-montserrat text-[10px] tracking-[0.18em] uppercase text-grey/60 group-hover/child:text-gold transition-colors duration-200">
                                      {child.label}
                                    </span>
                                    {child.tag && (
                                      <span className="tag bg-gold/10 text-gold border border-gold/20 text-[7px] py-0.5 px-1.5">
                                        {child.tag}
                                      </span>
                                    )}
                                  </div>
                                  <ArrowRight className="w-3 h-3 text-grey/20 group-hover/child:text-gold transition-colors duration-200" />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.path}
                      onClick={onClose}
                      className="flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.03] group transition-colors duration-200"
                    >
                      <span className="font-montserrat text-[11px] tracking-[0.22em] uppercase text-ivory/70 group-hover:text-ivory transition-colors duration-200">
                        {link.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-grey/20 group-hover:text-gold transition-colors duration-200" />
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Divider */}
              <div className="my-3 mx-4 h-[1px] bg-white/[0.05]" />

              {/* Quick links */}
              <div className="px-4 space-y-1">
                <Link href="/dashboard/customer" onClick={onClose} className="flex items-center gap-3 py-2.5 text-grey/50 hover:text-ivory transition-colors duration-200 group">
                  <Heart className="w-3.5 h-3.5 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                  <span className="font-montserrat text-[10px] tracking-[0.18em] uppercase">Wishlist</span>
                </Link>
                <Link href="/cart" onClick={onClose} className="flex items-center gap-3 py-2.5 text-grey/50 hover:text-ivory transition-colors duration-200 group">
                  <ShoppingBag className="w-3.5 h-3.5 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                  <span className="font-montserrat text-[10px] tracking-[0.18em] uppercase">Cart</span>
                </Link>
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/[0.05] space-y-2.5">
              {isAuthenticated ? (
                <Link
                  href={dashboardPath}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-gold/30 text-gold font-montserrat text-[10px] tracking-[0.22em] uppercase hover:bg-gold hover:text-black transition-all duration-300"
                >
                  <User className="w-3.5 h-3.5" />
                  My Account
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href="/auth/login"
                    onClick={onClose}
                    className="flex items-center justify-center py-3.5 border border-white/15 text-ivory/70 font-montserrat text-[10px] tracking-[0.2em] uppercase hover:border-gold/40 hover:text-gold transition-all duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={onClose}
                    className="flex items-center justify-center py-3.5 bg-gold text-black font-montserrat text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
              <Link
                href="/consultation/book"
                onClick={onClose}
                className="flex items-center justify-center w-full py-3.5 bg-white/[0.03] border border-white/[0.06] text-ivory/50 font-montserrat text-[10px] tracking-[0.2em] uppercase hover:text-gold hover:border-gold/20 transition-all duration-300"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
