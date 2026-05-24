'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar({ links, currentTab }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0B0B0B] border-r border-white/5 min-h-[calc(100vh-80px)] flex flex-col pt-10 hidden md:flex select-none">
      <div className="px-8 mb-8 flex flex-col gap-1">
        <span className="font-montserrat text-[10px] text-grey uppercase tracking-[0.3em]">Imperial Access</span>
        <h2 className="font-cormorant text-2xl text-gold uppercase tracking-wider">Dashboard</h2>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-4">
        {links.map((link) => {
          const isActive = link.path.includes('?tab=')
            ? link.path.endsWith(`?tab=${currentTab}`)
            : pathname === link.path && !currentTab;

          return (
            <Link
              key={link.name}
              href={link.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-300 font-montserrat text-[10px] uppercase tracking-[0.2em] group",
                isActive 
                  ? "bg-white/5 text-gold border-l border-gold" 
                  : "text-grey hover:text-ivory hover:bg-white/[0.02] border-l border-transparent"
              )}
            >
              {link.icon && (
                <link.icon className={cn(
                  "w-3.5 h-3.5 transition-colors duration-300",
                  isActive ? "text-gold" : "text-grey/60 group-hover:text-ivory"
                )} />
              )}
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-red-400/90 hover:bg-red-950/10 hover:text-red-400 transition-all duration-300 font-montserrat text-[10px] uppercase tracking-[0.2em] group"
        >
          <LogOut className="w-3.5 h-3.5 text-red-500/70 group-hover:text-red-400 transition-colors" />
          Logout
        </button>
      </div>
    </aside>
  );
}
