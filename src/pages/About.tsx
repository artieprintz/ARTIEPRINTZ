import { motion } from 'motion/react';
import { Package, Truck, PenTool, Globe } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  const features = [
    {
      icon: <PenTool className="w-8 h-8 text-brand-accent" />,
      title: "CUSTOM PRINTING",
      desc: "Every order is customized to your exact specifications. From polaroids to oversized T-shirts."
    },
    {
      icon: <Package className="w-8 h-8 text-brand-accent" />,
      title: "PREMIUM QUALITY",
      desc: "We use only high-resolution printers and premium materials. No compromises."
    },
    {
      icon: <Truck className="w-8 h-8 text-brand-accent" />,
      title: "FAST DELIVERY",
      desc: "Orders are processed within 24-48 hours and shipped globally with trusted partners."
    },
    {
      icon: <Globe className="w-8 h-8 text-brand-accent" />,
      title: "BASED IN CHENNAI",
      desc: "Proudly printing and curating aesthetics from our headquarters in Chennai, India."
    }
  ];

  return (
    <div className="min-h-screen pt-40 pb-40 bg-[#080808]">
      <SEO
        title="About ARTiE PRINTz | Custom Printing in Chennai"
        description="Learn about ARTiE PRINTz, your premium destination for custom anime posters, photo frames, polaroids, and personalized gifts in Chennai, India."
        keywords="about artie printz, custom printing company india, premium poster printing, anime posters chennai"
      />
      
      <div className="max-w-6xl mx-auto px-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-32"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic mb-8 uppercase text-white">WHO WE <span className="text-brand-accent">ARE</span></h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed italic">
            ARTiE PRINTz is a premium custom printing studio dedicated to transforming your digital memories and favorite aesthetics into high-quality physical art.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">THE CUSTOMIZATION <span className="text-brand-accent">PROCESS</span></h2>
            <div className="space-y-6 text-zinc-400 font-light text-lg leading-relaxed">
              <p>
                We believe that every piece of art should be as unique as the person buying it. That's why we don't just sell off-the-shelf products. We collaborate with you.
              </p>
              <p>
                When you place an order for a custom product, you will connect with us directly via WhatsApp. This ensures that every detail, every color, and every crop is exactly how you envisioned it before it goes to print.
              </p>
              <p>
                From premium anime posters to personalized Spotify frames and luxury magazine prints, our meticulous attention to detail ensures museum-quality results.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square bg-zinc-900 border border-zinc-800 shadow-2xl flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand-accent/5 blur-3xl rounded-full"></div>
            {/* Using a placeholder for aesthetics since we don't have an exact about image */}
            <div className="text-center p-10 z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4 block">Est. 2024</span>
              <h3 className="text-5xl font-black italic tracking-tighter text-white uppercase">CRAFTED WITH<br/>PRECISION</h3>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 p-10 hover:border-zinc-700 transition-colors"
            >
              <div className="mb-6 bg-black/50 p-4 inline-block rounded-lg">{feature.icon}</div>
              <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-4">{feature.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
