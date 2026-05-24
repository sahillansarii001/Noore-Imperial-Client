'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isAuthenticated } = useAuth();
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
    
    const res = await login(email, password);
    if (res.success) {
      router.push('/dashboard/customer');
    } else {
      setError(res.error || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Left side: Editorial Image */}
      <div className="hidden md:block w-1/2 relative bg-[#0a0a0a]">
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1964&auto=format&fit=crop" 
          alt="Luxury Fashion" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12">
          <h2 className="font-cormorant text-5xl text-ivory leading-tight mb-4">Enter the<br/>Imperial Circle</h2>
          <p className="font-poppins text-sm text-ivory/70 font-light max-w-sm leading-relaxed">
            Experience exclusive collections, bespoke bridal services, and personalized styling consultations.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 pt-32 md:pt-16">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-12">
            <h1 className="font-cormorant text-4xl text-ivory mb-3 tracking-wide">Welcome Back</h1>
            <p className="font-poppins text-grey text-sm font-light tracking-wide">Please sign in to access your account.</p>
          </div>

          {error && (
            <div className="bg-red-900/10 border border-red-900/50 text-red-200 p-4 mb-8 text-xs font-montserrat tracking-wide uppercase text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-ivory text-sm focus:border-gold outline-none transition-colors peer" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder=" "
              />
              <label className="absolute left-0 top-4 font-montserrat text-xs text-grey tracking-[0.2em] uppercase transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:[10px] peer-[:not(:placeholder-shown)]:text-gold">
                Email Address
              </label>
            </div>

            <div className="relative group">
              <input 
                type="password" 
                className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-ivory text-sm focus:border-gold outline-none transition-colors peer" 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder=" "
              />
              <label className="absolute left-0 top-4 font-montserrat text-xs text-grey tracking-[0.2em] uppercase transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:[10px] peer-[:not(:placeholder-shown)]:text-gold">
                Password
              </label>
              <a href="#" className="absolute right-0 top-1/2 -translate-y-1/2 font-montserrat text-[10px] text-grey hover:text-gold transition-colors uppercase tracking-widest">
                Forgot?
              </a>
            </div>
            
            <div className="pt-4">
              <Button variant="primary" type="submit" className="w-full group" isLoading={loading}>
                <span className="group-hover:tracking-[0.3em] transition-all duration-500">Sign In</span>
              </Button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="font-montserrat text-[10px] uppercase tracking-widest text-grey">
              Don't have an account? <Link href="/auth/register" className="text-gold hover:text-ivory transition-colors ml-2">Register Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
