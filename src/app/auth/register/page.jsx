'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard/customer');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await register(formData);
    if (res.success) {
      router.push('/dashboard/customer');
    } else {
      setError(res.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row-reverse">
      {/* Right side: Editorial Image */}
      <div className="hidden md:block w-1/2 relative bg-[#0a0a0a]">
        <img 
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1964&auto=format&fit=crop" 
          alt="Luxury Fashion Registry" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-right">
          <h2 className="font-cormorant text-5xl text-ivory leading-tight mb-4">A Legacy<br/>of Elegance</h2>
          <p className="font-poppins text-sm text-ivory/70 font-light max-w-sm leading-relaxed ml-auto">
            Become a part of the Maison Noore Imperial and gain unparalleled access to the world of high fashion.
          </p>
        </div>
      </div>

      {/* Left side: Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 pt-32 md:pt-16">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-12">
            <h1 className="font-cormorant text-4xl text-ivory mb-3 tracking-wide">Create Account</h1>
            <p className="font-poppins text-grey text-sm font-light tracking-wide">Join the exclusive imperial circle.</p>
          </div>

          {error && (
            <div className="bg-red-900/10 border border-red-900/50 text-red-200 p-4 mb-8 text-xs font-montserrat tracking-wide uppercase text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-ivory text-sm focus:border-gold outline-none transition-colors peer" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder=" "
              />
              <label className="absolute left-0 top-4 font-montserrat text-xs text-grey tracking-[0.2em] uppercase transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:[10px] peer-[:not(:placeholder-shown)]:text-gold">
                Full Name
              </label>
            </div>

            <div className="relative group">
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-ivory text-sm focus:border-gold outline-none transition-colors peer" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder=" "
              />
              <label className="absolute left-0 top-4 font-montserrat text-xs text-grey tracking-[0.2em] uppercase transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:[10px] peer-[:not(:placeholder-shown)]:text-gold">
                Email Address
              </label>
            </div>

            <div className="relative group">
              <input 
                type="tel" 
                className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-ivory text-sm focus:border-gold outline-none transition-colors peer" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder=" "
              />
              <label className="absolute left-0 top-4 font-montserrat text-xs text-grey tracking-[0.2em] uppercase transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:[10px] peer-[:not(:placeholder-shown)]:text-gold">
                Phone Number
              </label>
            </div>

            <div className="relative group">
              <input 
                type="password" 
                className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-ivory text-sm focus:border-gold outline-none transition-colors peer" 
                required 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder=" "
              />
              <label className="absolute left-0 top-4 font-montserrat text-xs text-grey tracking-[0.2em] uppercase transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:[10px] peer-[:not(:placeholder-shown)]:text-gold">
                Password
              </label>
            </div>
            
            <div className="pt-4">
              <Button variant="primary" type="submit" className="w-full group" isLoading={loading}>
                <span className="group-hover:tracking-[0.3em] transition-all duration-500">Create Account</span>
              </Button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="font-montserrat text-[10px] uppercase tracking-widest text-grey">
              Already have an account? <Link href="/auth/login" className="text-gold hover:text-ivory transition-colors ml-2">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
