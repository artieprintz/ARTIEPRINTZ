import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, Category } from '../lib/constants';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, Search, X } from 'lucide-react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'ALL';
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const setCategory = (cat: string) => {
    if (cat === 'ALL') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-[#080808] min-h-screen">
      {/* Shop Header */}
      <section className="pt-40 pb-20 px-10 max-w-7xl mx-auto border-b border-zinc-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
           <div>
              <h1 className="text-8xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-6 italic uppercase">THE <span className="text-brand-accent">SHOP</span></h1>
              <p className="text-zinc-600 text-[11px] uppercase tracking-[0.4em] font-medium">High-quality prints and custom streetwear</p>
           </div>
           
           <div className="flex items-center space-x-4">
              <div className="relative group flex-1 md:flex-initial">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-brand-accent transition-colors" />
                <input 
                  type="text" 
                  placeholder="SEARCH PRODUCTS" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-zinc-900/50 border border-zinc-800 pl-12 pr-6 py-4 text-[10px] uppercase tracking-[0.2em] focus:outline-none focus:border-brand-accent transition-all w-full md:w-72 font-medium"
                />
              </div>
              <button 
                disabled
                title="Filters always open"
                className="p-4 border border-zinc-800 bg-brand-accent border-brand-accent text-white"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
           </div>
        </div>
      </section>

      {/* Filter Bar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-zinc-900 bg-zinc-900/20"
          >
            <div className="max-w-7xl mx-auto px-10 py-10 flex flex-wrap gap-4">
              <button 
                onClick={() => setCategory('ALL')}
                className={`px-8 py-3 text-[10px] uppercase font-black tracking-[0.2em] border transition-all ${
                  selectedCategory === 'ALL' ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-white'
                }`}
              >
                All Products
              </button>
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-8 py-3 text-[10px] uppercase font-black tracking-[0.2em] border transition-all ${
                    selectedCategory === cat.id ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Content */}
      <section className="py-24 px-10 max-w-7xl mx-auto">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center">
             <h3 className="text-5xl font-black tracking-tighter mb-8 italic opacity-20 uppercase">No products found</h3>
             <button onClick={() => {setSearchQuery(''); setCategory('ALL')}} className="text-[11px] uppercase font-black tracking-[0.3em] py-4 px-10 border border-zinc-800 hover:border-white transition-all text-zinc-500 hover:text-white">Clear filters</button>
          </div>
        )}
      </section>
    </div>
    
  );
}
