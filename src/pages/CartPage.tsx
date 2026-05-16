import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Minus, Plus } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const navigate = useNavigate();

  // Suggestion Logic: Group single posters by size
  const singlePostersBySize = items.reduce((acc: Record<string, number>, item) => {
    if (item.productId === 'single-poster') {
      acc[item.size || 'default'] = (acc[item.size || 'default'] || 0) + item.quantity;
    }
    return acc;
  }, {});

  const suggestions = Object.entries(singlePostersBySize)
    .filter(([_, qty]) => qty >= 3)
    .map(([size, qty]) => ({
      size,
      qty,
      target: qty >= 15 ? '15 WALL POSTER PACK' : qty >= 10 ? '10 WALL POSTER PACK' : qty >= 5 ? '5 WALL POSTER PACK' : '3 WALL POSTER PACK'
    }));

  if (items.length === 0) {
    return (
    <div className="min-h-screen pt-40 px-10 max-w-7xl mx-auto text-center bg-[#080808]">
         <ShoppingBag className="w-20 h-20 mx-auto mb-10 text-brand-accent opacity-20" />
         <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic mb-8 uppercase">YOUR CART IS EMPTY</h1>
         <p className="text-zinc-500 text-base mb-16 max-w-sm mx-auto font-medium tracking-tight">You haven't added anything to your cart yet. Browse our shop to find something you like.</p>
         <Link to="/shop" className="bg-white text-black px-12 py-6 text-[11px] font-black uppercase tracking-[0.3em] inline-block hover:bg-brand-accent hover:text-white transition-all transform hover:-translate-y-1 italic">
            Start Shopping
         </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-32 px-10 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
           <div>
              <h1 className="text-8xl md:text-9xl font-black tracking-tighter italic uppercase text-white">YOUR <span className="text-brand-accent">CART</span></h1>
              <p className="text-zinc-600 text-[11px] uppercase tracking-[0.4em] font-medium">{items.length} items in your cart</p>
           </div>
           <Link to="/shop" className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center text-zinc-500 hover:text-white transition-colors border border-zinc-800 px-6 py-3">
              <ArrowLeft className="w-3 h-3 mr-2" /> Continue Shopping
           </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-6">
             {/* Dynamic Suggestions */}
             {suggestions.length > 0 && (
               <motion.div 
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="p-8 border border-brand-accent/30 bg-brand-accent/5 mb-8"
               >
                 <div className="flex items-center space-x-4 mb-4">
                    <div className="px-3 py-1 bg-brand-accent text-white text-[8px] font-black uppercase tracking-widest italic">Deal Alert</div>
                    <p className="text-[10px] text-brand-accent uppercase font-black tracking-widest italic">Smart Saving Recommended</p>
                 </div>
                 {suggestions.map((s, i) => (
                   <p key={i} className="text-zinc-400 text-sm font-medium italic leading-relaxed">
                     You have {s.qty} single {s.size} posters. Save more by switching to the <span className="text-white font-bold">{s.target}</span>. 
                     Every poster in the pack is a <span className="text-brand-accent">custom wall poster</span>.
                   </p>
                 ))}
               </motion.div>
             )}

             <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col md:flex-row items-center md:items-start p-8 border border-zinc-800 bg-zinc-900/30 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                      <span className="text-6xl font-black italic">0{items.indexOf(item) + 1}</span>
                    </div>

                     <div className="w-32 aspect-[3/4] overflow-hidden bg-zinc-900 border border-zinc-800 mb-6 md:mb-0">
                        <img src={item.image} className="w-full h-full object-cover transition-all duration-1000" alt={item.name} />
                     </div>
                     
                     <div className="md:ml-10 flex-1 text-center md:text-left z-10">
                        <h3 className="text-4xl font-bold tracking-tighter italic uppercase group-hover:text-brand-accent transition-colors">{item.name}</h3>
                        <div className="mt-4 space-y-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                           {item.size && <div>Size: <span className="text-white italic">{item.size}{item.customSize ? ` (${item.customSize})` : ''}</span></div>}
                           {item.variant && <div>Style: <span className="text-white italic">{item.variant}</span></div>}
                           {item.option && <div>Options: <span className="text-white italic">{item.option}</span></div>}
                        </div>
                        
                        <div className="mt-10 flex items-center justify-center md:justify-start space-x-8">
                           <div className="flex items-center border border-zinc-800 px-6 py-3 space-x-6 bg-[#080808]">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-zinc-600 hover:text-white transition-colors"><Minus className="w-3 h-3" /></button>
                              <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-zinc-600 hover:text-white transition-colors"><Plus className="w-3 h-3" /></button>
                           </div>
                           <button 
                             onClick={() => removeItem(item.id)}
                             className="text-zinc-600 hover:text-brand-accent transition-colors flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest"
                           >
                              <Trash2 className="w-4 h-4" />
                              <span className="hidden sm:inline">Remove</span>
                           </button>
                        </div>
                     </div>
                     
                     <div className="mt-8 md:mt-0 font-mono text-xl text-zinc-400 font-bold">
                        {formatCurrency(item.price * item.quantity)}
                     </div>
                  </motion.div>
                ))}
             </AnimatePresence>
          </div>

          <div className="lg:col-span-4">
             <div className="bg-zinc-900 border border-zinc-800 p-12 sticky top-32 shadow-2xl">
                <div className="text-brand-accent text-xs font-black uppercase tracking-[0.4em] mb-4">Order Summary</div>
                <h3 className="text-4xl font-black italic uppercase mb-12 border-b border-zinc-800 pb-8">Order Total</h3>
                
                <div className="space-y-8 text-[11px] uppercase tracking-[0.2em] font-bold">
                   <div className="flex justify-between text-zinc-500">
                      <span>Subtotal</span>
                      <span className="font-mono text-white">{formatCurrency(total())}</span>
                   </div>
                   <div className="flex justify-between text-zinc-500">
                      <span>Shipping Fee</span>
                      <span className="font-mono italic text-brand-accent">FREE</span>
                   </div>
                   
                   <div className="pt-10 border-t border-zinc-800 flex flex-col gap-4">
                      <div className="flex justify-between items-end">
                        <span className="text-zinc-400">Order Total</span>
                        <span className="font-mono text-4xl text-brand-accent italic">{formatCurrency(total())}</span>
                      </div>
                   </div>
                </div>
                
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-white text-black py-8 mt-16 text-[14px] font-black uppercase tracking-[0.3em] hover:bg-brand-accent hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl flex items-center justify-center space-x-3 italic"
                >
                   <span>Proceed to Checkout</span>
                   <ArrowRight className="w-5 h-5" />
                </button>

                {/* Mobile Sticky Checkout Button */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-[#080808]/80 backdrop-blur-xl border-t border-zinc-800 z-50">
                   <button 
                     onClick={() => navigate('/checkout')}
                     className="w-full bg-brand-accent text-white py-6 text-[12px] font-black uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center space-x-3 italic active:scale-95 transition-transform"
                   >
                      <span>Checkout — {formatCurrency(total())}</span>
                      <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
                
                <p className="mt-10 text-[9px] text-center uppercase tracking-[0.2em] text-zinc-600 leading-relaxed italic font-medium">
                   All items are custom printed. Changes cannot be made after the order is placed.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
