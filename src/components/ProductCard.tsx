import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product } from '../lib/constants';
import { formatCurrency } from '../lib/utils';
import { Plus, Heart, Share2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useState } from 'react';
import ShareModal from './ShareModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl transition-all hover:border-zinc-700">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#080808]/80 to-transparent group-hover:opacity-40 transition-opacity" />
        
        {/* Category Label */}
        <div className="absolute top-6 right-6">
           <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-1 bg-[#080808]/60 backdrop-blur-md border border-white/10 opacity-60">
              {product.category === 'POSTER' ? 'WALL POSTER' : product.category}
           </span>
        </div>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-6 left-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex space-x-3">
           <button 
            onClick={(e) => {
              e.preventDefault();
              addItem({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: product.sizes?.[0],
                variant: product.variants?.[0],
                option: product.options?.[0],
              });
            }}
            className="bg-white text-black p-4 rounded-full hover:bg-brand-accent hover:text-white transition-colors"
           >
             <Plus className="w-5 h-5" />
           </button>
           <button 
            onClick={(e) => {
              e.preventDefault();
              toggleItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              });
            }}
            className={`p-4 rounded-full transition-all duration-300 ${inWishlist ? 'bg-brand-accent text-white' : 'bg-white text-black hover:bg-brand-accent hover:text-white'}`}
           >
             <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
           </button>
           <button 
            onClick={(e) => {
              e.preventDefault();
              setIsShareModalOpen(true);
            }}
            className="bg-white text-black p-4 rounded-full hover:bg-brand-accent hover:text-white transition-colors"
           >
             <Share2 className="w-5 h-5" />
           </button>
        </div>
      </Link>
      
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        productName={product.name} 
        productId={product.id} 
      />
      
      <div className="mt-6 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold tracking-tight italic group-hover:text-brand-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-zinc-400 text-[10px] uppercase tracking-widest mt-2 font-medium">
            Collection 0{Math.floor(Math.random() * 5) + 1}
          </p>
        </div>
        <p className="text-sm font-mono text-zinc-400">
          {formatCurrency(product.price)}
        </p>
      </div>
    </motion.div>
  );
}
