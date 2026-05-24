import { Cormorant_Garamond, Playfair_Display, Poppins, Montserrat } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/components/ui/Toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant' 
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair' 
});

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500'],
  variable: '--font-poppins' 
});

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600'],
  variable: '--font-montserrat' 
});

export const metadata = {
  title: 'NOORE IMPERIAL | Luxury Fashion & Academy',
  description: 'Exclusive luxury fashion, bridal studio, and professional fashion academy.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${poppins.variable} ${montserrat.variable}`}>
      <body className="bg-black text-ivory min-h-screen flex flex-col">
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
