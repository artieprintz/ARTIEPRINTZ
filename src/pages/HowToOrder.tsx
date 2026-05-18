import { motion } from 'motion/react';
import { ShoppingBag, FormInput, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HowToOrder() {
  const navigate = useNavigate();
  const steps = [
    {
      number: '01',
      title: 'ADD TO CART',
      description: 'Explore our catalog and find the custom wall posters or prints you love. Every single item is custom-printed just for you.',
      icon: ShoppingBag
    },
    {
      number: '02',
      title: 'CHOOSE QUANTITY',
      description: 'Select the number of prints. Check out our Poster Packs for smart savings when ordering multiple custom wall posters.',
      icon: CheckCircle2
    },
    {
      number: '03',
      title: 'FILL THE FORM',
      description: 'Provide your delivery details and WhatsApp number. Currently serving only within Tamil Nadu.',
      icon: FormInput
    },
    {
      number: '04',
      title: 'PHOTO & CONFIRM',
      description: 'After checkout, click the WhatsApp button to send your order details and the HIGH-QUALITY photo you want printed directly to us.',
      icon: MessageCircle
    }
  ];

  return (
    <div className="min-h-screen pt-40 pb-40 px-6 max-w-7xl mx-auto bg-[#080808]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-32"
      >
        <span className="text-brand-accent font-mono text-[10px] tracking-[0.4em] uppercase mb-10 block italic font-black">PROCESS — SYSTEM</span>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter italic leading-none uppercase text-white">HOW TO <span className="text-brand-accent">ORDER</span></h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-10 bg-zinc-950 border border-zinc-800 overflow-hidden hover:border-brand-accent transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-8 text-7xl font-black italic text-white/[0.03] group-hover:text-brand-accent/[0.05] transition-colors">
              {step.number}
            </div>
            
            <step.icon className="w-10 h-10 text-brand-accent mb-10 group-hover:scale-110 transition-transform duration-500" />
            
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-6 group-hover:text-brand-accent transition-colors">
              {step.title}
            </h3>
            
            <p className="text-zinc-350 text-sm font-bold leading-relaxed uppercase tracking-wider italic">
              {step.description}
            </p>

            <motion.div 
              className="mt-10 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5 text-brand-accent" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="mt-40 p-16 border border-zinc-800 bg-zinc-950/50 rounded-lg text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-accent/5 blur-[120px] rounded-full -z-10"></div>
        <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter mb-10">READY TO GET STARTED?</h2>
        <p className="text-zinc-350 text-[12px] uppercase tracking-[0.5em] mb-12 font-bold italic">Start exploring our collection today.</p>
        <button 
           onClick={() => navigate('/shop')}
           className="bg-white text-black px-16 py-7 text-[12px] font-black uppercase tracking-[0.4em] inline-block hover:bg-brand-accent hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl italic cursor-pointer"
        >
          Explore Shop
        </button>
      </div>

      <div className="mt-32 text-center">
        <p className="text-zinc-500 text-[10px] tracking-[1em] uppercase font-black italic">ARTiE PRINTz_SYSTEM_V.1.0</p>
      </div>
    </div>
  );
}
