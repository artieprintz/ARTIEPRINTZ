import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Instagram, Copy, Check } from 'lucide-react';

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const hasSeenPromo = sessionStorage.getItem('hasSeenPromo');
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenPromo', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText('FOLLOW50');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-zinc-950 border border-zinc-800 p-12 z-[101] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-8 text-8xl font-black italic text-white/[0.02] rotate-12 pointer-events-none select-none">OFFER</div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-10 text-center">
              <span className="text-brand-accent font-mono text-[10px] tracking-[0.5em] uppercase mb-8 block font-black">INSTAGRAM SPECIAL</span>
              <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white mb-8 leading-none">
                GET RS. 50 <span className="text-brand-accent">OFF</span>
              </h2>
              <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest leading-relaxed mb-12 italic">
                FOLLOW US ON INSTAGRAM TO FIND THE PROMO CODE IN OUR BIO.
              </p>

              <div className="flex flex-col space-y-6">
                <a 
                  href="https://instagram.com/artieprintz.shop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-black py-6 text-[12px] font-black uppercase tracking-[0.4em] flex items-center justify-center space-x-4 hover:bg-brand-accent hover:text-white transition-all italic shadow-2xl group"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Follow @artieprintz.shop</span>
                </a>
              </div>

              <p className="mt-16 text-[9px] text-zinc-700 uppercase tracking-[0.3em] font-black italic italic">
                Terms apply. Limited time offer.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
