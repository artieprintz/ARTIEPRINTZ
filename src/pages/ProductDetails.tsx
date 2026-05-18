import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../lib/constants';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Info, ShoppingBag, ArrowLeft, CheckCircle2, Heart, Plus, Minus } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = product ? isInWishlist(product.id) : false;

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || '');
  const [selectedOption, setSelectedOption] = useState(product?.options?.[0] || '');
  const [customSize, setCustomSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [addedPopup, setAddedPopup] = useState(false);
  const [wishlistPopup, setWishlistPopup] = useState(false);

  if (!product) {
    return <div className="pt-40 text-center font-heading text-4xl">PRODUCT NOT FOUND</div>;
  }

  const currentPrice = (() => {
    if (!product.priceMap) return product.price;
    // Map selection to price. Options take highest priority, then Variant, then Size.
    const key = selectedOption || selectedVariant || selectedSize;
    return product.priceMap[key] || product.price;
  })();

  const handleAddToCart = () => {
    addItem({
      productId: product!.id,
      name: product!.name,
      price: currentPrice,
      image: product!.image,
      size: selectedSize,
      variant: selectedVariant,
      option: selectedOption,
      customSize: customSize,
    }, quantity);
    
    setAddedPopup(true);
    setTimeout(() => setAddedPopup(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggleItem({
      id: product!.id,
      name: product!.name,
      price: product!.price,
      image: product!.image,
    });
    if (!inWishlist) {
      setWishlistPopup(true);
      setTimeout(() => setWishlistPopup(false), 2000);
    }
  };

  return (
    <div className="bg-[#080808] min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-10">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-[9px] uppercase tracking-[0.3em] font-medium text-zinc-350 mb-16">
          <button onClick={() => navigate('/shop')} className="hover:text-brand-accent flex items-center transition-colors">
             <ArrowLeft className="w-3 h-3 mr-2" /> Back to Shop
          </button>
          <span className="mx-2 opacity-20">/</span>
          <span>{product.category}</span>
          <span className="mx-2 opacity-20">/</span>
          <span className="text-white italic">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Gallery */}
          <div className="lg:col-span-7">
             <div className="space-y-6">
                <motion.div 
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="aspect-[4/5] bg-zinc-900 border border-zinc-800 shadow-2xl relative overflow-hidden group"
                >
                   <img 
                     src={product.images?.[activeImageIndex] || product.image} 
                     alt={product.name}
                     className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-tr from-[#080808]/40 to-transparent pointer-events-none" />
                </motion.div>

                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-4">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={cn(
                          "aspect-square border-2 transition-all overflow-hidden bg-zinc-900",
                          activeImageIndex === idx ? "border-brand-accent scale-105" : "border-zinc-800 opacity-50 hover:opacity-100"
                        )}
                      >
                         <img src={img} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                      </button>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 bg-zinc-900/30 border border-zinc-700/50 flex flex-col items-center justify-center text-center">
                      <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-2">Feature 01</span>
                      <p className="text-[10px] font-black uppercase tracking-widest italic text-white/80 leading-tight">CUSTOM WALL POSTER</p>
                   </div>
                   <div className="p-6 bg-zinc-900/30 border border-zinc-700/50 flex flex-col items-center justify-center text-center">
                      <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-2">Feature 02</span>
                      <p className="text-[10px] font-black uppercase tracking-widest italic text-white/80 leading-tight">PREMIUM FINISH</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic leading-[0.85] mb-8 uppercase">{product.name}</h1>
              
              <div className="flex items-center justify-between mb-12 pb-8 border-b border-zinc-900">
                 <p className="text-2xl font-mono text-white/90">{formatCurrency(currentPrice)}</p>
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent italic">Original Design</span>
              </div>

              <div className="space-y-12">
                {/* Variant Selector */}
                {product.variants && (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-zinc-300">Select Style</h4>
                    <div className="flex flex-wrap gap-4">
                      {product.variants.map((v) => (
                        <button
                          key={v}
                          onClick={() => setSelectedVariant(v)}
                          className={cn(
                            "px-8 py-3 text-[10px] uppercase font-black tracking-[0.2em] border transition-all",
                            selectedVariant === v ? "bg-white text-black border-white" : "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                          )}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes && (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-zinc-300">Select Size</h4>
                    <div className="flex flex-wrap gap-4">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={cn(
                            "px-8 py-3 text-[10px] uppercase font-black tracking-[0.2em] border transition-all",
                            selectedSize === s ? "bg-white text-black border-white" : "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {selectedSize === 'Custom Size' && (
                      <input 
                        type="text"
                        placeholder="ENTER YOUR SIZE"
                        className="mt-6 w-full bg-zinc-900/50 border border-zinc-700 px-6 py-4 text-[10px] uppercase tracking-[0.2em] focus:outline-none focus:border-brand-accent transition-all font-medium text-white placeholder:text-zinc-500"
                        value={customSize}
                        onChange={(e) => setCustomSize(e.target.value)}
                      />
                    )}
                  </div>
                )}

                {/* Magazine Options */}
                {product.options && (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-zinc-300">Options</h4>
                    <div className="flex flex-wrap gap-4">
                      {product.options.map((o) => (
                        <button
                          key={o}
                          onClick={() => setSelectedOption(o)}
                          className={cn(
                            "px-8 py-3 text-[10px] uppercase font-black tracking-[0.2em] border transition-all",
                            selectedOption === o ? "bg-white text-black border-white" : "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                          )}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="pt-8 border-t border-zinc-900">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-zinc-300">Quantity</h4>
                  <div className="flex items-center space-x-6 bg-zinc-950 border border-zinc-700 w-fit p-2">
                     <button 
                       onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                       className="w-10 h-10 flex items-center justify-center hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white"
                     >
                       <Minus className="w-4 h-4" />
                     </button>
                     <span className="text-sm font-mono font-bold w-4 text-center">{quantity}</span>
                     <button 
                       onClick={() => setQuantity(prev => prev + 1)}
                       className="w-10 h-10 flex items-center justify-center hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white"
                     >
                       <Plus className="w-4 h-4" />
                     </button>
                  </div>
                </div>

                 <div className="pt-12 space-y-8">
                   {/* Actions Group */}
                   <div className="flex flex-col space-y-4">
                     <div className="flex gap-4">
                       <button 
                         onClick={handleAddToCart}
                         className="flex-1 bg-white text-black py-8 text-[14px] font-black uppercase tracking-[0.3em] hover:bg-brand-accent hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl flex items-center justify-center space-x-4 italic"
                       >
                         <ShoppingBag className="w-5 h-5" />
                         <span>Add to Cart — {formatCurrency(currentPrice)}</span>
                       </button>
                       <button 
                         onClick={handleToggleWishlist}
                         className={cn(
                          "p-8 border border-zinc-900 transition-all transform hover:-translate-y-1 shadow-2xl flex items-center justify-center italic",
                          inWishlist ? "bg-brand-accent border-brand-accent text-white" : "bg-black text-white hover:border-zinc-700"
                         )}
                         title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                       >
                         <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
                       </button>
                     </div>
                   </div>
                   
                   {/* Mobile Sticky Button */}
                   <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-[#080808]/80 backdrop-blur-xl border-t border-zinc-800 z-50 flex gap-3">
                      <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-brand-accent text-white py-6 text-[12px] font-black uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center space-x-4 italic active:scale-95 transition-transform"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>Add to Cart — {formatCurrency(currentPrice)}</span>
                      </button>
                      <button 
                        onClick={handleToggleWishlist}
                        className={cn(
                          "px-6 py-6 border border-zinc-800 shadow-2xl flex items-center justify-center italic active:scale-95 transition-transform",
                          inWishlist ? "bg-brand-accent border-brand-accent text-white" : "bg-black/60 text-white"
                        )}
                      >
                        <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
                      </button>
                   </div>
                   
                   <p className="text-[10px] text-zinc-300 tracking-[0.05em] flex items-start leading-relaxed uppercase font-medium">
                     <Info className="w-3 h-3 mr-3 mt-1 flex-shrink-0 text-brand-accent" />
                     Ready in 48 hours. Fast global shipping. Custom items cannot be returned.
                   </p>
                </div>

                <div className="pt-24 space-y-2">
                   <details className="cursor-pointer group">
                      <summary className="list-none flex justify-between items-center py-6 border-t border-zinc-900 group-hover:text-brand-accent transition-colors">
                         <span className="text-[10px] font-black uppercase tracking-[0.3em]">Product Description</span>
                         <ChevronRight className="w-4 h-4 text-zinc-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="py-8 text-zinc-300 font-light text-sm leading-relaxed whitespace-pre-line border-t border-zinc-900/50">
                         {product.description}
                         {"\n\n"}
                         <span className="text-white font-bold opacity-60">DETAILS:</span>{"\n"}
                         • Material: High-quality paper / Heavyweight Cotton.{"\n"}
                         • Finish: Matte finish.{"\n"}
                         • Quality: High-quality colors.
                      </div>
                   </details>
                   <details className="cursor-pointer group">
                      <summary className="list-none flex justify-between items-center py-6 border-t border-zinc-900 group-hover:text-brand-accent transition-colors">
                         <span className="text-[10px] font-black uppercase tracking-[0.3em]">Shipping & Returns</span>
                         <ChevronRight className="w-4 h-4 text-zinc-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="py-8 text-zinc-300 font-light text-sm space-y-6 leading-relaxed border-t border-zinc-900/50">
                         <p>Fast worldwide shipping. 3-7 days delivery.</p>
                         <p>All custom orders are final. Please check details before ordering.</p>
                      </div>
                   </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {addedPopup && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-12 right-12 bg-white text-black px-12 py-6 z-[100] flex items-center space-x-6 shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-zinc-100"
          >
             <div className="bg-brand-accent p-2">
                <CheckCircle2 className="w-5 h-5 text-white" />
             </div>
             <div className="text-3xl font-black tracking-tighter italic uppercase">Custom Item Added</div>
          </motion.div>
        )}
        {wishlistPopup && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-12 right-12 bg-white text-black px-12 py-6 z-[100] flex items-center space-x-6 shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-zinc-100"
          >
             <div className="bg-brand-accent p-2">
                <Heart className="w-5 h-5 text-white fill-current" />
             </div>
             <div className="text-3xl font-black tracking-tighter italic uppercase">Item Saved to Wishlist</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
