'use client';
import { useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Loader } from '@/components/ui/Loader';
import Sidebar from '@/components/dashboard/Sidebar';
import { LayoutDashboard, ShoppingBag, Calendar, BookOpen, Settings, Users, BarChart } from 'lucide-react';

function DashboardNav({ links }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams ? searchParams.get('tab') : null;

  return (
    <>
      <Sidebar links={links} currentTab={currentTab} />
      
      {/* Mobile dashboard navigation */}
      <div 
        className="md:hidden flex overflow-x-auto gap-6 px-6 py-4 border-b border-white/5 bg-[#0B0B0B] scrollbar-none sticky top-16 z-20"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {links.map((link) => {
          const isActive = link.path.includes('?tab=')
            ? link.path.endsWith(`?tab=${currentTab}`)
            : pathname === link.path && !currentTab;

          return (
            <Link
              key={link.name}
              href={link.path}
              className={`flex-shrink-0 text-[10px] font-montserrat uppercase tracking-[0.15em] pb-1 border-b transition-all duration-300 ${
                isActive 
                  ? "text-gold border-gold font-medium" 
                  : "text-grey border-transparent"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return <div className="min-h-screen pt-20 bg-black flex items-center justify-center"><Loader /></div>;
  }

  // Define links based on role
  const getLinks = () => {
    const base = [
      { name: 'Dashboard', path: `/dashboard/${role || 'customer'}`, icon: LayoutDashboard },
      { name: 'Settings', path: `/dashboard/${role || 'customer'}?tab=settings`, icon: Settings },
    ];

    switch (role) {
      case 'customer':
        return [
          base[0],
          { name: 'My Orders', path: '/dashboard/customer?tab=orders', icon: ShoppingBag },
          { name: 'Consultations', path: '/dashboard/customer?tab=consultations', icon: Calendar },
          base[1]
        ];
      case 'student':
        return [
          base[0],
          { name: 'My Courses', path: '/dashboard/student?tab=courses', icon: BookOpen },
          { name: 'Assignments', path: '/dashboard/student?tab=assignments', icon: BookOpen },
          base[1]
        ];
      case 'stylist':
        return [
          base[0],
          { name: 'Appointments', path: '/dashboard/stylist?tab=appointments', icon: Calendar },
          { name: 'Clients', path: '/dashboard/stylist?tab=clients', icon: Users },
          base[1]
        ];
      case 'admin':
      case 'ceo':
        return [
          base[0],
          { name: 'Analytics', path: `/dashboard/${role}?tab=analytics`, icon: BarChart },
          { name: 'Orders', path: `/dashboard/${role}?tab=orders`, icon: ShoppingBag },
          { name: 'Products', path: `/dashboard/${role}?tab=products`, icon: ShoppingBag },
          { name: 'Users', path: `/dashboard/${role}?tab=users`, icon: Users },
          base[1]
        ];
      default:
        return base;
    }
  };

  const links = getLinks();

  return (
    <div className="min-h-screen bg-black pt-20 flex flex-col md:flex-row">
      <Suspense fallback={<div className="w-64 bg-[#0B0B0B] border-r border-white/5 animate-pulse hidden md:block" />}>
        <DashboardNav links={links} />
      </Suspense>

      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
