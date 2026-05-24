'use client';
import { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import CategoryBanner from '@/components/shop/CategoryBanner';
import Filters from '@/components/shop/Filters';
import ProductGrid from '@/components/shop/ProductGrid';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';

export default function CategoryShopPage() {
  const params = useParams();
  const categorySlug = params.category;
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const formatTitle = (slug) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = `category=${categorySlug}&`;
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
  }, [categorySlug, filters]);

  return (
    <div className="min-h-screen bg-black pt-20">
      <CategoryBanner title={formatTitle(categorySlug)} breadcrumb={true} />
      
      <div className="container mx-auto px-4 md:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
          
          <Filters 
            filters={filters} 
            setFilters={setFilters} 
            onApply={() => { setIsMobileFiltersOpen(false); fetchProducts(); }}
            isMobileOpen={isMobileFiltersOpen}
            setIsMobileOpen={setIsMobileFiltersOpen}
          />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4">
              <span className="font-poppins text-xs uppercase text-grey tracking-widest whitespace-nowrap">Showing {products.length} creations</span>
              
              <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-3">
                  <span className="font-montserrat text-[10px] uppercase tracking-widest text-grey">Sort By</span>
                  <div className="relative">
                    <select className="appearance-none bg-transparent text-[11px] font-montserrat uppercase tracking-widest text-ivory border border-white/20 hover:border-gold/50 transition-colors focus:border-gold focus:outline-none focus:ring-0 cursor-pointer py-2 pl-4 pr-8 rounded-none">
                      <option value="featured" className="bg-black">Featured</option>
                      <option value="new" className="bg-black">New Arrivals</option>
                      <option value="price_asc" className="bg-black">Price: Low - High</option>
                      <option value="price_desc" className="bg-black">Price: High - Low</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gold">
                      <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <button 
                  className="lg:hidden flex items-center gap-2 text-gold font-montserrat text-[10px] uppercase tracking-widest border border-gold/30 px-3.5 py-2 hover:bg-gold hover:text-black transition-colors shrink-0"
                  onClick={() => setIsMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" /> Filters
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
