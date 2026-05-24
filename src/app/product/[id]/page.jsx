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
      // Intercept dummy product slugs from homepage sections
      if (id && id.length < 10) {
        setProduct({
          id: id,
          name: 'Exclusive Designer Piece',
          price: 129900,
          compare_price: 149900,
          description: 'Experience luxury with this carefully crafted piece. Featuring elegant draping and premium fabrics. Note: This is a demo product for testing the UI.',
          fabric: 'Premium Blend',
          sku: `DEMO-${id.toUpperCase()}`,
          stock: 10,
          images: [
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1974&auto=format&fit=crop'
          ],
          variants: [
            { id: `v1-${id}`, size: 'S', stock: 5 },
            { id: `v2-${id}`, size: 'M', stock: 5 },
            { id: `v3-${id}`, size: 'L', stock: 5 }
          ]
        });
        setSelectedVariant({ id: `v1-${id}`, size: 'S', stock: 5 });
        setLoading(false);
        return;
      }

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
        // Silently handle 404 errors so Next.js doesn't trigger the red error overlay
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
