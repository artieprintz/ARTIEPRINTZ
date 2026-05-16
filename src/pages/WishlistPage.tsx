import { motion } from 'motion/react';
import { useWishlistStore } from '../store/useWishlistStore';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const navigate = useNavigate();

  const handleMoveToCart = (item: any) => {
    addToCart({
      productId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    removeItem(item.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <span className="text-brand-accent font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block">Collection — Saved</span>
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter italic uppercase text-white">WISH<span className="text-brand-accent">LIST</span></h1>
      </motion.div>

      {items.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-40 border border-zinc-900 bg-zinc-950/30"
        >
          <Heart className="w-12 h-12 text-zinc-800 mx-auto mb-8 stroke-[1px]" />
          <p className="text-zinc-500 font-mono text-[11px] uppercase tracking-[0.2em] mb-12 italic">Your wishlist is currently empty.</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center space-x-4 bg-white text-black px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-brand-accent hover:text-white transition-all italic active:scale-95"
          >
            <span>Explore Shop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end mb-8">
            <button 
              onClick={clearWishlist}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors italic"
            >
              Clear All Items
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col md:flex-row items-center p-8 bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all duration-500 overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Heart className="w-32 h-32 text-white -rotate-12" />
                </div>

                <div className="w-40 aspect-[3/4] overflow-hidden bg-zinc-900 border border-zinc-800 mb-8 md:mb-0">
                  <Link to={`/product/${item.id}`}>
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                      alt={item.name} 
                    />
                  </Link>
                </div>

                <div className="md:ml-12 flex-1 text-center md:text-left z-10 w-full">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2 italic transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-brand-accent font-mono text-lg font-bold">{formatCurrency(item.price)}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="w-full sm:w-auto bg-white text-black px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center space-x-3 italic active:scale-95"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Move to Cart</span>
                      </button>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-full sm:w-auto bg-zinc-900 text-zinc-500 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-900 hover:text-white transition-all flex items-center justify-center space-x-3 italic active:scale-95 border border-zinc-800 hover:border-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-24 pt-12 border-t border-zinc-900 flex flex-col items-center">
          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.4em] mb-8 font-medium">Continue shopping or check your cart</p>
          <div className="flex space-x-8">
            <Link to="/shop" className="text-[11px] font-black uppercase tracking-[0.2em] text-white hover:text-brand-accent transition-colors italic">Shop All</Link>
            <Link to="/cart" className="text-[11px] font-black uppercase tracking-[0.2em] text-white hover:text-brand-accent transition-colors italic">View Cart</Link>
          </div>
        </div>
      )}
    </div>
  );
}
