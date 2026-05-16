import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with cinematic imagery */}
      <div className="absolute inset-0 z-0 text-center">
        <img 
          src="/hero-bg.jpg" 
          alt="Art background"
          className="w-full h-full object-cover opacity-60 scale-105 brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4"
        >
          Premium Custom Prints
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[15vw] md:text-[8vw] leading-[0.85] font-black tracking-tighter mb-8 italic"
        >
          PRINT WHAT <br /> YOU LOVE.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 text-sm md:text-lg text-zinc-400 max-w-xl mx-auto font-light leading-relaxed mb-12"
        >
          Custom posters, tees, frames and polaroids made for your vibe. Minimal aesthetics for maximal self-expression.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Link 
            to="/shop"
            className="px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-brand-accent hover:text-white transition-colors"
          >
            Shop Collection
          </Link>
          <Link 
            to="/commercial"
            className="px-8 py-4 bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-bold uppercase text-xs tracking-widest hover:bg-brand-accent hover:text-white transition-colors"
          >
            Bulk Orders
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
