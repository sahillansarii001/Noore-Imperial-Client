'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scroll down
      } else {
        setIsVisible(true); // Scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const dashboardPath = isAuthenticated ? (role ? `/dashboard/${role}` : '/dashboard/customer') : '/auth/login';

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled ? 'glass-navbar py-1' : 'bg-transparent py-2'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Mobile Hamburger */}
          <button 
            className="md:hidden text-ivory hover:text-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-14 h-14 md:w-20 md:h-20 transition-transform duration-500 group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Noore Imperial" 
                fill 
                className="object-contain drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]"
                priority
              />
            </div>
            {/* Keeping text hidden on mobile if logo is prominent, or shown alongside */}
            <span className="hidden md:block font-cormorant text-2xl tracking-widest uppercase font-semibold text-ivory group-hover:text-gold transition-colors duration-300">
              Noore Imperial
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10 items-center">
            {[
              { name: 'Collections', path: '/shop' },
              { name: 'Bridal Studio', path: '/bridal-studio' },
              { name: 'Consultations', path: '/consultation/book' },
              { name: 'Academy', path: '/academy' },
              { name: 'Franchise', path: '/franchise' }
            ].map(link => (
              <Link 
                key={link.name} 
                href={link.path}
                className={`font-montserrat text-[11px] tracking-[0.2em] uppercase transition-all duration-300 relative group py-2 ${
                  pathname === link.path ? 'text-gold' : 'text-ivory/80 hover:text-ivory'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-gold transform origin-left transition-transform duration-300 ${
                  pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5 md:gap-7">
            <button className="text-ivory/80 hover:text-gold transition-colors hidden md:block">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link href="/dashboard/customer" className="text-ivory/80 hover:text-gold transition-colors hidden md:block">
              <Heart className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link href={dashboardPath} className="text-ivory/80 hover:text-gold transition-colors">
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link href="/cart" className="relative text-ivory/80 hover:text-gold transition-colors group">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow-[0_0_10px_rgba(201,168,76,0.6)] group-hover:scale-110 transition-transform">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        isAuthenticated={isAuthenticated} 
        dashboardPath={dashboardPath} 
      />
    </>
  );
}
