'use client';
import { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import CategoryBanner from '@/components/shop/CategoryBanner';
import Filters from '@/components/shop/Filters';
import ProductGrid from '@/components/shop/ProductGrid';
import { api } from '@/lib/api';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Convert filters to query string
      let query = '';
      if (filters.categories?.length > 0) query += `category=${filters.categories.join(',')}&`;
      if (filters.minPrice) query += `min_price=${filters.minPrice}&`;
      if (filters.maxPrice) query += `max_price=${filters.maxPrice}&`;
      
      const res = await api.getProducts(query);
      if (res.success) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]); // Refetch when filters change directly or on apply

  return (
    <div className="min-h-screen bg-black pt-20">
      <CategoryBanner title="Shop All" breadcrumb={false} />
      
      <div className="container-xl py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
          
          <Filters 
            filters={filters} 
            setFilters={setFilters} 
            onApply={() => { setIsMobileFiltersOpen(false); fetchProducts(); }}
            isMobileOpen={isMobileFiltersOpen}
            setIsMobileOpen={setIsMobileFiltersOpen}
          />

          <div className="flex-1">
            <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-5">
              <span className="font-poppins text-xs text-grey tracking-wider">Showing {products.length} creations</span>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 border-b border-white/10 hover:border-gold/50 transition-colors pb-1">
                  <span className="font-montserrat text-[10px] uppercase tracking-wider text-grey">Sort:</span>
                  <select className="bg-transparent text-[10px] font-montserrat uppercase tracking-wider text-ivory border-none focus:ring-0 cursor-pointer p-0 pr-6">
                    <option value="featured" className="bg-black">Featured</option>
                    <option value="new" className="bg-black">New Arrivals</option>
                    <option value="price_asc" className="bg-black">Price: Low to High</option>
                    <option value="price_desc" className="bg-black">Price: High to Low</option>
                  </select>
                </div>

                <button 
                  className="lg:hidden flex items-center gap-2 text-gold font-montserrat text-[10px] uppercase tracking-widest border border-gold/30 px-3.5 py-1.5 hover:bg-gold hover:text-black transition-colors"
                  onClick={() => setIsMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
                </button>
              </div>
            </div>

            <ProductGrid products={products} loading={loading} />
          </div>

        </div>
      </div>
    </div>
  );
}
