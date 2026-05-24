'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

// Inline SVGs for brand icons
const InstagramIcon = ({ className, strokeWidth = 1.5 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const FacebookIcon = ({ className, strokeWidth = 1.5 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ className, strokeWidth = 1.5 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = ({ className, strokeWidth = 1.5 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);

const FOOTER_LINKS = [
  {
    title: 'The Maison',
    links: [
      { label: 'Collections', path: '/shop' },
      { label: 'Bridal Studio', path: '/bridal-studio' },
      { label: 'Academy', path: '/academy' },
      { label: 'Franchise', path: '/franchise' },
      { label: 'About Us', path: '/about' },
    ],
  },
  {
    title: 'Client Services',
    links: [
      { label: 'Book Consultation', path: '/consultation/book' },
      { label: 'Shipping & Returns', path: '/shipping' },
      { label: 'Size Guide', path: '/size-guide' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
  { label: 'Cookie Policy', path: '/cookies' },
];

const SOCIALS = [
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: FacebookIcon, label: 'Facebook', href: '#' },
  { icon: TwitterIcon, label: 'Twitter / X', href: '#' },
  { icon: YoutubeIcon, label: 'YouTube', href: '#' },
];

export default function Footer() {

  return (
    <footer className="relative bg-[#050505] overflow-hidden text-white border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-xl relative z-10">
        
        {/* Newsletter Section */}
        <div className="py-20 border-b border-white/10 flex flex-col items-center text-center">
          <h3 className="font-cormorant text-4xl md:text-5xl text-gold mb-4 tracking-wide uppercase">Join the Inner Circle</h3>
          <p className="font-playfair text-white/60 text-lg mb-10 italic max-w-xl">
            Priority access to new collections, private sales, and editorial stories.
          </p>
          <form className="relative w-full max-w-md group" onSubmit={e => e.preventDefault()}>
            <div className="relative border-b border-white/20 pb-2 flex items-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent border-none outline-none w-full text-white placeholder-white/30 font-montserrat text-[10px] tracking-[0.2em] uppercase px-2"
                required
              />
              <button
                type="submit"
                className="text-gold/70 hover:text-gold transition-colors duration-300 p-2"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-700 ease-out group-hover:w-full" />
          </form>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 py-20">
          
          {/* Brand col */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="inline-flex items-center gap-4 mb-6 group">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Noore Imperial"
                  fill
                  className="object-contain drop-shadow-[0_0_12px_rgba(201,168,76,0.2)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <p className="font-cormorant text-[20px] tracking-[0.25em] uppercase text-white group-hover:text-gold transition-colors duration-400">
                  Noore Imperial
                </p>
                <p className="font-montserrat text-[7px] tracking-[0.45em] text-gold/60 uppercase mt-1">
                  Luxury Fashion
                </p>
              </div>
            </Link>

            <p className="font-playfair text-white/50 text-sm leading-loose max-w-sm mb-8 font-light italic">
              Elevating elegance to an imperial standard. Where timeless tradition meets contemporary couture.
            </p>
          </div>

          {/* Link cols */}
          {FOOTER_LINKS.map(col => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-white mb-8 relative inline-block">
                {col.title}
                <span className="absolute -bottom-2 left-0 w-4 h-px bg-gold/50" />
              </h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.path}
                      className="font-poppins text-[12px] text-white/50 hover:text-gold transition-colors duration-300 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-gold group-hover:w-3 transition-all duration-300 shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Social col */}
          <div className="lg:col-span-4 lg:pl-12">
            <h4 className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-white mb-8 relative inline-block">
              Connect
              <span className="absolute -bottom-2 left-0 w-4 h-px bg-gold/50" />
            </h4>
            
            <div className="space-y-5 mb-10">
              <a href="mailto:hello@nooreimperial.com" className="flex items-center gap-4 group">
                <Mail className="w-4 h-4 text-white/30 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
                <span className="font-poppins text-[13px] text-white/50 group-hover:text-white transition-colors duration-300">
                  hello@nooreimperial.com
                </span>
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-4 group">
                <Phone className="w-4 h-4 text-white/30 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
                <span className="font-poppins text-[13px] text-white/50 group-hover:text-white transition-colors duration-300">
                  +91 12345 67890
                </span>
              </a>
              <div className="flex items-center gap-4">
                <MapPin className="w-4 h-4 text-white/30" strokeWidth={1.5} />
                <span className="font-poppins text-[13px] text-white/50">
                  New Delhi, India
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-white/30">
            © {new Date().getFullYear()} Noore Imperial. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link, idx) => (
              <div key={link.label} className="flex items-center gap-6">
                <Link href={link.path} className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-gold transition-colors duration-300">
                  {link.label}
                </Link>
                {idx < LEGAL_LINKS.length - 1 && <span className="w-1 h-1 rounded-full bg-white/10" />}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
             <p className="font-montserrat text-[9px] tracking-[0.2em] text-white/20 uppercase mr-2">Secure</p>
            {['Visa', 'Mastercard', 'UPI'].map(m => (
              <span key={m} className="px-3 py-1.5 border border-white/10 rounded font-montserrat text-[9px] tracking-[0.15em] uppercase text-white/30">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
