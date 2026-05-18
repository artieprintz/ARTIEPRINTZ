import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../lib/constants';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Box, Image as ImageIcon, Shirt, Layout, BookOpen, ShoppingBag, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useRef } from 'react';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const { items } = useCartStore();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#080808] relative overflow-hidden">
      {/* Texture Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <img 
           src="/product-placeholder.jpg" 
           className="absolute top-0 left-0 w-full h-[200vh] object-cover opacity-[0.03] mix-blend-overlay" 
           alt="texture"
         />
         <img 
           src="/product-placeholder.jpg" 
           className="absolute top-[200vh] left-0 w-full h-[200vh] object-cover opacity-[0.02] mix-blend-screen" 
           alt="texture"
         />
      </div>

      <div className="relative z-10">
        <Hero />

      {/* Featured Products */}
      <section className="py-32 px-10 max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
             <div>
                <h2 className="text-[#FF6B4A] text-xs font-bold uppercase tracking-[0.3em] mb-4">New Drops</h2>
                <h3 className="text-6xl md:text-8xl font-black tracking-tighter italic">OUR BEST <br className="hidden md:block"/>SELLERS</h3>
             </div>
             <Link to="/shop" className="text-[11px] uppercase tracking-[0.2em] font-medium flex items-center group border-b border-zinc-700 pb-2 text-zinc-300 hover:text-[#FF6B4A] hover:border-[#FF6B4A] transition-all">
                View All Items <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-32 relative overflow-hidden border-y border-zinc-800">
        <div className="absolute inset-0 z-0 opacity-[0.03]">
           <img 
             src="/product-placeholder.jpg" 
             className="w-full h-full object-cover"
             alt="art bg"
           />
        </div>
        <div className="max-w-7xl mx-auto px-10 mb-20 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
           <div>
              <h2 className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">Products</h2>
              <h3 className="text-6xl md:text-8xl font-black tracking-tighter italic">SHOP BY<br/>TYPE</h3>
           </div>
           
           {/* Slider Navigation Buttons */}
           <div className="flex space-x-4">
              <button 
                onClick={scrollPrev}
                className="w-14 h-14 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:border-brand-accent hover:bg-brand-accent/10 transition-all active:scale-95 cursor-pointer"
                aria-label="Previous Category"
              >
                 <ArrowLeft className="w-5 h-5 -translate-x-[1px]" />
              </button>
              <button 
                onClick={scrollNext}
                className="w-14 h-14 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:border-brand-accent hover:bg-brand-accent/10 transition-all active:scale-95 cursor-pointer"
                aria-label="Next Category"
              >
                 <ArrowRight className="w-5 h-5 translate-x-[1px]" />
              </button>
           </div>
        </div>
        
        <div 
          ref={sliderRef}
          className="flex space-x-12 overflow-x-auto pb-12 no-scrollbar px-10 md:px-[calc((100vw-80rem)/2)] items-start scroll-smooth"
        >
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: 80, skewX: -15 }}
              whileInView={{ opacity: 1, x: 0, skewX: -6 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 group relative w-[300px] md:w-[380px] aspect-[4/5] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl transition-all duration-500 hover:border-brand-accent hover:shadow-[0_0_40px_rgba(255,107,74,0.2)] hover:skew-x-0"
            >
              <Link 
                to={`/shop?category=${cat.id}`}
                className="block w-full h-full"
              >
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={cat.image} 
                    className="w-full h-full object-cover transition-all duration-1000 scale-125 skew-x-[6deg] group-hover:skew-x-0 group-hover:scale-110" 
                    alt={cat.label} 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-85 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end skew-x-[6deg] group-hover:skew-x-0 transition-all duration-500">
                  <span className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase text-white">{cat.label}</span>
                  <div className="mt-4 w-12 h-px bg-brand-accent transition-all duration-500 group-hover:w-24" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-300 mt-6 block group-hover:text-brand-accent transform group-hover:translate-x-2 transition-all">Shop now ↗</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How To Order Section */}
      <section id="how-to-order" className="py-40 px-10 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
             src="/product-placeholder.jpg" 
             className="w-full h-full object-cover opacity-[0.05] grayscale"
             alt="process bg"
           />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
           <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
           >
              <h2 className="text-[#FF6B4A] text-xs font-bold uppercase tracking-[0.3em] mb-8">Guide</h2>
              <h3 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] italic mb-12 uppercase">HOW TO<br /><span className="text-brand-accent">ORDER.</span></h3>
              <p className="text-zinc-300 text-lg font-light leading-relaxed mb-16 max-w-md italic font-medium">
                Follow these simple steps to bring your vision to life.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-16">
                {[
                  { icon: ShoppingBag, title: '1. ADD PRODUCT', desc: 'Browse our collection and pick your items.' },
                  { icon: Plus, title: '2. QUANTITY', desc: 'Select how many you want, and upload your photo.' },
                  { icon: Layout, title: '3. FORM', desc: 'Fill in your shipping details and apply promo codes.' },
                  { icon: Box, title: '4. WHATSAPP', desc: 'Confirm your order on WhatsApp to start printing.' }
                ].map((step, i) => (
                  <div key={i} className="group">
                    <div className="w-10 h-10 border border-zinc-700 flex items-center justify-center mb-6 group-hover:border-brand-accent transition-colors">
                      <step.icon className="w-4 h-4 text-zinc-300 group-hover:text-brand-accent transition-colors" />
                    </div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-white italic">{step.title}</h4>
                    <p className="text-zinc-400 text-[10px] uppercase tracking-tighter leading-tight font-medium">{step.desc}</p>
                  </div>
                ))}
              </div>
              
              <Link to="/how-to-order" className="px-10 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] inline-block hover:bg-brand-accent hover:text-white transition-all transform hover:-translate-y-1 italic">
                Read Full Guide
              </Link>
           </motion.div>
           
           <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square transition-all duration-1000 group shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-zinc-900 p-1 bg-zinc-950"
           >
              <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <img 
                src="/NEW LOGO.png" 
                className="w-full h-full object-cover transition-all duration-1000 hover:grayscale-0 opacity-60 hover:opacity-100"
                alt="Order Process"
              />
              <div className="absolute -bottom-8 -right-8 bg-white text-black p-8 shadow-2xl z-20 border border-zinc-200">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 text-zinc-400 font-bold">ESTIMATED</div>
                <div className="text-3xl font-black tracking-tighter italic">3 DAYS DELIVERY</div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-40 px-10 bg-gradient-to-b from-[#080808] to-zinc-900/20">
        <div className="max-w-4xl mx-auto text-center">
            {/* Commercial Callout */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mb-40 p-12 border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm"
            >
               <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-accent mb-6">Business Solutions</h4>
               <p className="text-2xl font-black italic uppercase tracking-tighter mb-10">Running a business? We handle <span className="text-white">Bulk Orders</span> & <span className="text-white">Commercial Printing</span>.</p>
               <Link to="/commercial" className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-brand-accent pb-2 text-zinc-300 hover:text-brand-accent hover:border-brand-accent transition-colors">Learn More ↗</Link>
            </motion.div>

            <div className="w-12 h-px bg-brand-accent mx-auto mb-16 opacity-40" />
            <div className="space-y-20">
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
               >
                 <p className="text-3xl md:text-5xl font-black tracking-tighter italic leading-[1.1] mb-12 uppercase text-white/90">
                   "Turning memories into <span className="text-brand-accent">something you can hold</span>. From moments in your gallery to memories on your wall. Made by students, printed with emotion — only at ARTiE PRINTz."
                 </p>
                 <div className="flex items-center justify-center space-x-4">
                    <div className="w-8 h-px bg-zinc-800" />
                    <span className="text-[11px] font-black tracking-[0.4em] text-zinc-400 uppercase">— OUR MISSION</span>
                    <div className="w-8 h-px bg-zinc-800" />
                 </div>
               </motion.div>
            </div>
        </div>
      </section>
      </div>
    </div>
  );
}
