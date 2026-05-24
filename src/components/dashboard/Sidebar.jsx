'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar({ links, currentTab }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0a0a0a] border-r border-white/[0.05] min-h-[calc(100vh-76px)] flex flex-col hidden md:flex select-none">
      {/* Top gold line */}
      <div className="h-[1px] bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />

      {/* User info */}
      <div className="px-6 py-7 border-b border-white/[0.04]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
            <span className="font-cormorant text-lg text-gold leading-none">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-poppins text-[12px] text-ivory/90 truncate font-medium">{user?.name || 'User'}</p>
            <p className="font-montserrat text-[8px] tracking-[0.2em] text-gold/60 uppercase mt-0.5">{user?.role || 'Member'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-montserrat text-[8px] tracking-[0.2em] text-grey/40 uppercase">Active Session</span>
        </div>
      </div>

      {/* Nav label */}
      <div className="px-6 pt-6 pb-2">
        <span className="font-montserrat text-[8px] tracking-[0.35em] text-grey/30 uppercase">Navigation</span>
      </div>

      <nav className="flex-1 flex flex-col gap-0.5 px-3 pb-4">
        {links.map((link) => {
          const isActive = link.path.includes('?tab=')
            ? link.path.endsWith(`?tab=${currentTab}`)
            : pathname === link.path && !currentTab;

          return (
            <Link
              key={link.name}
              href={link.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 transition-all duration-300 font-montserrat text-[10px] uppercase tracking-[0.18em] group relative",
                isActive
                  ? "sidebar-active text-gold"
                  : "text-grey/50 hover:text-ivory/80 hover:bg-white/[0.025] border-l-2 border-transparent"
              )}
            >
              {link.icon && (
                <link.icon className={cn(
                  "w-3.5 h-3.5 transition-colors duration-300 flex-shrink-0",
                  isActive ? "text-gold" : "text-grey/35 group-hover:text-ivory/60"
                )} strokeWidth={1.5} />
              )}
              <span className="flex-1">{link.name}</span>
              {isActive && (
                <ChevronRight className="w-3 h-3 text-gold/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-white/[0.04]">
        <div className="px-3 py-3">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400/60 hover:bg-red-950/15 hover:text-red-400 transition-all duration-300 font-montserrat text-[10px] uppercase tracking-[0.18em] group border-l-2 border-transparent"
          >
            <LogOut className="w-3.5 h-3.5 text-red-500/40 group-hover:text-red-400 transition-colors flex-shrink-0" strokeWidth={1.5} />
            Sign Out
          </button>
        </div>
        <div className="px-6 py-4 border-t border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 flex-shrink-0">
              <Image src="/logo.png" alt="Noore Imperial" fill className="object-contain opacity-40" />
            </div>
            <span className="font-montserrat text-[8px] tracking-[0.2em] text-grey/20 uppercase">Noore Imperial</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
