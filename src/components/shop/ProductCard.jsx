'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import { useCart } from '@/hooks/useCart';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, loading } = useCart();
  
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop';
  const hoverImage = product.images?.[1] || mainImage;
  
  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ 
      product_id: product.id, 
      variant_id: product.variants?.[0]?.id, 
      quantity: 1, 
      price: product.price, 
      name: product.name 
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div 
      className="group flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug || product.id}`} className="relative aspect-[3/4] overflow-hidden bg-[#0F0F0F] mb-5 block border border-white/5 group-hover:border-gold/20 transition-all duration-700">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.is_new && <Badge variant="gold">New</Badge>}
          {product.compare_price > product.price && <Badge variant="red">Sale</Badge>}
        </div>

        {/* Wishlist Icon */}
        <button 
          onClick={handleWishlist}
          className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            isWishlisted 
              ? 'bg-gold/20 text-gold scale-110 border border-gold/30' 
              : 'bg-black/40 text-grey hover:text-gold hover:bg-black/60 border border-white/10 hover:border-gold/30'
          }`}
        >
          <Heart className="w-4 h-4 transition-transform duration-300 active:scale-90" fill={isWishlisted ? 'currentColor' : 'none'} strokeWidth={1.5} />
        </button>

        {/* Images */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={mainImage} 
            alt={product.name} 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${
              isHovered ? 'opacity-0 scale-105 blur-[2px]' : 'opacity-100 scale-100'
            }`}
          />
          <img 
            src={hoverImage} 
            alt={`${product.name} alternate`} 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        </div>

        {/* Luxury subtle shadow gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Quick Add overlay */}
        <div className={`absolute bottom-0 left-0 w-full p-4 transform transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}>
          <button 
            onClick={handleQuickAdd}
            disabled={loading}
            className="w-full bg-ivory text-black hover:bg-gold hover:text-black py-3 px-4 font-montserrat text-[10px] uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 border border-ivory hover:border-gold shadow-lg shadow-black/40"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add
          </button>
        </div>
      </Link>

      <div className="flex flex-col gap-1.5 px-1">
        <Link href={`/product/${product.slug || product.id}`} className="font-cormorant text-xl text-ivory/95 hover:text-gold transition-colors duration-300 tracking-wide line-clamp-1">
          {product.name}
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-poppins text-sm text-gold font-medium tracking-wide">{formatPrice(product.price)}</span>
          {product.compare_price > product.price && (
            <span className="font-poppins text-xs text-grey line-through tracking-wide">{formatPrice(product.compare_price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
