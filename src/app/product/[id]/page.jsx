'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Loader } from '@/components/ui/Loader';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';
import SizeSelector from '@/components/product/SizeSelector';
import AddToCart from '@/components/product/AddToCart';
import RelatedProducts from '@/components/product/RelatedProducts';

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.getProduct(id);
        if (res.success) {
          setProduct(res.data);
          if (res.data.variants && res.data.variants.length > 0) {
            // Select first available variant
            const available = res.data.variants.find(v => v.stock > 0);
            setSelectedVariant(available || res.data.variants[0]);
          }
          
          // Fetch related (mocking by fetching first few products in same category)
          const relatedRes = await api.getProducts(`category=${res.data.category_id}&limit=4`);
          if (relatedRes.success) {
            setRelated(relatedRes.data.filter(p => p.id !== res.data.id));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 bg-black flex items-center justify-center">
        <h2 className="text-2xl text-gold font-cormorant">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 justify-between items-start">
          
          {/* Left: Gallery (60% width on desktop) */}
          <div className="w-full lg:w-[58%]">
            <ProductGallery images={product.images || []} />
          </div>
          
          {/* Right: Details & Actions (38% width on desktop, sticky) */}
          <div className="w-full lg:w-[38%] flex flex-col lg:sticky lg:top-28 lg:self-start gap-2">
            <ProductDetails product={product} />
            
            {product.variants && product.variants.length > 0 && (
              <SizeSelector 
                variants={product.variants} 
                selectedSize={selectedVariant}
                onSelect={setSelectedVariant}
              />
            )}
            
            <AddToCart product={product} selectedVariant={selectedVariant} />
          </div>

        </div>
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
