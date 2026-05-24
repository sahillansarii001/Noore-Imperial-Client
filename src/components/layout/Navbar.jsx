'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, ChevronDown, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import MobileMenu from './MobileMenu';

const NAV = [
  {
    name: 'Collections',
    path: '/shop',
    mega: [
      { label: 'Women', path: '/shop/women', tag: 'New' },
      { label: 'Men', path: '/shop/men' },
      { label: 'Kids', path: '/shop/kids' },
      { label: 'Babies', path: '/shop/babies' },
      { label: 'Bridal Couture', path: '/shop/bridal', tag: 'Exclusive' },
      { label: 'Western Edit', path: '/shop/western' },
      { label: 'Indo Western', path: '/shop/indo-western' },
      { label: 'Accessories', path: '/shop/accessories' },
    ],
  },
  { name: 'Bridal Studio', path: '/bridal-studio' },
  { name: 'Consultations', path: '/consultation/book' },
  { name: 'Academy', path: '/academy' },
  { name: 'Franchise', path: '/franchise' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { isAuthenticated, role } = useAuth();
  const searchRef = useRef(null);
  const megaTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleMegaEnter = (name) => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(name);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(null), 120);
  };

  const dashPath = isAuthenticated
    ? `/${role ? `dashboard/${role}` : 'dashboard/customer'}`
    : '/auth/login';

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 z-40 transition-all duration-500 bg-black/30 backdrop-blur-lg border-b border-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.4)] top-0`}
      >
        <div className="container-xl flex items-center justify-between h-[68px] md:h-[76px]">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -ml-2 text-ivory/60 hover:text-gold transition-colors duration-300"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0">
            <div className="relative w-10 h-10 md:w-11 md:h-11 transition-all duration-500 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Noore Imperial"
                fill
                className="object-contain drop-shadow-[0_0_16px_rgba(201,168,76,0.35)]"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none gap-0.5">
              <span className="font-cormorant text-[18px] md:text-[20px] tracking-[0.28em] uppercase text-ivory group-hover:text-gold transition-colors duration-400">
                Noore Imperial
              </span>
              <span className="font-montserrat text-[7px] tracking-[0.45em] text-gold/60 uppercase">
                Luxury Fashion
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center">
            {NAV.map(link => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.mega && handleMegaEnter(link.name)}
                onMouseLeave={() => link.mega && handleMegaLeave()}
              >
                <Link
                  href={link.path}
                  className={`relative flex items-center gap-1.5 px-4 py-2.5 font-montserrat text-[10px] tracking-[0.2em] uppercase transition-all duration-300 group ${
                    pathname.startsWith(link.path) && link.path !== '/'
                      ? 'text-gold'
                      : 'text-ivory/60 hover:text-ivory'
                  }`}
                >
                  {link.name}
                  {link.mega && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${megaOpen === link.name ? 'rotate-180 text-gold' : ''}`} />
                  )}
                  <span className={`absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent transform origin-center transition-transform duration-400 ${
                    pathname.startsWith(link.path) && link.path !== '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>

                {/* Mega dropdown */}
                <AnimatePresence>
                  {link.mega && megaOpen === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => handleMegaEnter(link.name)}
                      onMouseLeave={handleMegaLeave}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 glass-dark border border-white/[0.07] shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden"
                    >
                      {/* Top gold line */}
                      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                      <div className="p-2.5">
                        {link.mega.map(item => (
                          <Link
                            key={item.label}
                            href={item.path}
                            className="flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.04] group/item transition-colors duration-200"
                          >
                            <span className="font-montserrat text-[10px] tracking-[0.18em] uppercase text-ivory/60 group-hover/item:text-ivory transition-colors duration-200">
                              {item.label}
                            </span>
                            <div className="flex items-center gap-2">
                              {item.tag && (
                                <span className="tag bg-gold/10 text-gold border border-gold/20 text-[8px]">
                                  {item.tag}
                                </span>
                              )}
                              <ArrowRight className="w-3 h-3 text-grey/20 group-hover/item:text-gold group-hover/item:translate-x-0.5 transition-all duration-200" />
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="px-4 py-3 border-t border-white/[0.05] bg-white/[0.015]">
                        <Link href="/shop" className="font-montserrat text-[9px] tracking-[0.22em] uppercase text-gold/70 hover:text-gold transition-colors flex items-center gap-2 group/all">
                          View All Collections
                          <span className="w-4 h-[1px] bg-current group-hover/all:w-6 transition-all duration-300" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5 md:gap-1">
            {/* Search */}
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search-open"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden md:flex items-center gap-2 border-b border-white/20 overflow-hidden"
                >
                  <input
                    ref={searchRef}
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    placeholder="Search collections..."
                    className="bg-transparent text-ivory text-[11px] font-poppins placeholder-grey/30 py-1.5 w-full focus:outline-none tracking-wide"
                  />
                  <button onClick={() => { setSearchOpen(false); setSearchVal(''); }} className="text-grey hover:text-gold transition-colors flex-shrink-0 p-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="search-closed"
                  onClick={() => setSearchOpen(true)}
                  className="hidden md:flex p-2.5 text-ivory/50 hover:text-gold transition-colors duration-300"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" strokeWidth={1.5} />
                </motion.button>
              )}
            </AnimatePresence>

            <Link href="/dashboard/customer" className="hidden md:flex p-2.5 text-ivory/50 hover:text-gold transition-colors duration-300" aria-label="Wishlist">
              <Heart className="w-4 h-4" strokeWidth={1.5} />
            </Link>

            <Link href={dashPath} className="hidden md:flex p-2.5 text-ivory/50 hover:text-gold transition-colors duration-300" aria-label="Account">
              <User className="w-4 h-4" strokeWidth={1.5} />
            </Link>

            <Link href="/cart" className="relative p-2.5 text-ivory/50 hover:text-gold transition-colors duration-300 group" aria-label="Cart">
              <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-gold text-black text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(201,168,76,0.6)] font-montserrat"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* CTA */}
            <Link
              href="/consultation/book"
              className="hidden lg:flex ml-3 items-center gap-2 px-5 py-2.5 bg-gold text-black font-montserrat text-[9px] tracking-[0.22em] uppercase font-semibold hover:bg-gold-light transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Book Now</span>
              <div className="absolute inset-0 bg-gold-dark transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-out" />
            </Link>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isAuthenticated={isAuthenticated}
        dashboardPath={dashPath}
      />
    </>
  );
}
