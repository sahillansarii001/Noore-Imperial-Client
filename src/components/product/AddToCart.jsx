'use client';
import { useState } from 'react';
import { Heart, Minus, Plus, Share2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/Toast';

export default function AddToCart({ product, selectedVariant }) {
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, loading } = useCart();
  const { addToast } = useToast();

  const handleAdd = async () => {
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      addToast('Please select a size first', 'error');
      return;
    }

    try {
      await addItem({
        product_id: product.id,
        variant_id: selectedVariant?.id,
        quantity: qty,
        price: product.price,
        name: product.name,
        image: product.images?.[0]
      });
      addToast('Added to cart successfully', 'success');
    } catch (err) {
      addToast('Failed to add to cart', 'error');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard', 'success');
    }
  };

  const isOutOfStock = (selectedVariant ? selectedVariant.stock : product.stock) <= 0;

  return (
    <div className="flex flex-col gap-4 mb-12">
      <div className="flex gap-3">
        
        {/* Quantity Stepper */}
        <div className="flex items-center border border-white/10 bg-[#0F0F0F] h-12 select-none">
          <button 
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-full flex items-center justify-center text-grey hover:text-gold transition-colors duration-300"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center font-poppins text-xs text-ivory font-medium">{qty}</span>
          <button 
            onClick={() => setQty(qty + 1)}
            className="w-10 h-full flex items-center justify-center text-grey hover:text-gold transition-colors duration-300"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add to Cart */}
        <Button 
          variant="primary" 
          className="flex-1 text-[10px] tracking-[0.2em] font-semibold h-12" 
          onClick={handleAdd}
          disabled={isOutOfStock || loading}
          isLoading={loading}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add To Cart'}
        </Button>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1 text-[10px] tracking-[0.2em] font-semibold h-12">
          Buy It Now
        </Button>
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`w-12 h-12 border flex items-center justify-center transition-all duration-300 ${
            isWishlisted 
              ? 'border-gold text-gold bg-gold/10' 
              : 'border-white/10 text-grey hover:border-gold/30 hover:text-gold bg-[#0F0F0F]'
          }`}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} strokeWidth={1.5} />
        </button>
        <button 
          onClick={handleShare}
          className="w-12 h-12 border border-white/10 bg-[#0F0F0F] text-grey flex items-center justify-center hover:border-gold/30 hover:text-gold transition-colors duration-300"
        >
          <Share2 className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
