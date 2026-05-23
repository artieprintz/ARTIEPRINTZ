import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, FileText, CreditCard, Award, Layout, Mail, Layers, Phone } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import CommercialInquiryModal from '../components/CommercialInquiryModal';
import SEO from '../components/SEO';

export default function CommercialPrinting() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    { name: 'Letterhead Printing', icon: FileText, desc: 'Professional letterheads on high-quality paper.' },
    { name: 'Visiting Cards', icon: CreditCard, desc: 'Premium business cards with various finish options.' },
    { name: 'Certificates', icon: Award, desc: 'High-end certificates for corporate or academic use.' },
    { name: 'Pamphlets & Flyers', icon: Layout, desc: 'Mass output pamphlets for marketing and events.' },
    { name: 'Brochures', icon: Layers, desc: 'Bi-fold and tri-fold brochures for business deep-dives.' },
    { name: 'Custom Envelopes', icon: Mail, desc: 'Branded envelopes in various sizes (A4, A5, Wedding).' },
  ];

  const handleWhatsAppContact = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] pt-32 pb-20 px-6 sm:px-10">
      <SEO
        title="Bulk &amp; Commercial Printing Solutions | ARTiE PRINTz"
        description="High-quality custom commercial print solutions at scale. Get wholesale pricing for custom business visiting cards, letterheads, brand envelopes, pamphlets, academic certificates, and multi-fold brochures."
        keywords="commercial printing bulk quote, custom business cards, letterhead printing wholesale, certificates printing corporate, brochure and flyer printing india"
      />
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center max-w-4xl mx-auto">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center space-x-3 px-4 py-2 bg-zinc-950 border border-zinc-800 text-[10px] font-black uppercase tracking-[0.4em] italic mb-8"
           >
             <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
             <span>Business Solutions</span>
           </motion.div>
           <h1 className="text-6xl sm:text-9xl font-black italic tracking-tighter uppercase mb-10 leading-[0.8]">
             Bulk & <span className="text-brand-accent">Commercial</span>
           </h1>
           <p className="text-zinc-400 text-xl leading-relaxed italic font-medium max-w-2xl mx-auto">
             Scale your brand with premium commercial printing. From visiting cards to corporate brochures, we deliver at scale with ARTiE quality.
           </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {products.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 bg-zinc-950 border border-zinc-900 group hover:border-brand-accent/50 transition-all cursor-default"
            >
               <item.icon className="w-10 h-10 text-zinc-700 group-hover:text-brand-accent mb-8 transition-colors" />
               <h3 className="text-xl font-black italic uppercase tracking-tight mb-4">{item.name}</h3>
               <p className="text-zinc-500 font-medium italic text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
           <div className="p-16 bg-white text-black flex flex-col justify-center">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-8 leading-none">Need a Custom Quote?</h2>
              <p className="text-lg font-medium italic mb-12 opacity-70">
                Bulk orders come with discounted pricing and dedicated support. Let's discuss your requirements on WhatsApp.
              </p>
              <button 
                onClick={handleWhatsAppContact}
                className="flex items-center justify-center space-x-6 py-8 px-10 bg-black text-white hover:bg-brand-accent transition-all group"
              >
                 <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                 <span className="text-sm font-black uppercase tracking-[0.3em] italic">Chat with Bulk Desk</span>
              </button>
           </div>
           
           <div className="p-16 bg-zinc-900 border border-zinc-800 flex flex-col justify-center">
              <div className="flex items-center space-x-4 mb-8">
                 <div className="w-12 h-1 bg-brand-accent" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">Why Choose Us</h3>
              </div>
              <ul className="space-y-6">
                 {[
                  'Wholesale pricing for bulk quantities',
                  'Dedicated account manager for corporate clients',
                  'Free design review and consultation',
                  'Express delivery options within Tamil Nadu',
                  'Quality consistency across large volumes'
                 ].map((text, i) => (
                   <li key={i} className="flex items-start space-x-4">
                      <Award className="w-5 h-5 text-brand-accent mt-1 flex-shrink-0" />
                      <span className="text-sm font-bold uppercase tracking-widest italic text-zinc-400">{text}</span>
                   </li>
                 ))}
              </ul>
           </div>
        </section>

        <div className="mt-24 py-12 border-y border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="flex flex-col md:flex-row gap-10 md:gap-20">
              <div className="flex items-center space-x-8">
                 <Phone className="w-8 h-8 text-zinc-800" />
                 <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">Direct Line</p>
                    <p className="text-xl font-black italic uppercase">+91 99622 00444</p>
                 </div>
              </div>
              <div className="flex items-center space-x-8">
                 <Mail className="w-8 h-8 text-zinc-800" />
                 <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">Email Desk</p>
                    <p className="text-xl font-black italic uppercase lowercase">artieprintz@gmail.com</p>
                 </div>
              </div>
           </div>
           <div className="text-center md:text-right">
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">Operational Hours</p>
              <p className="text-sm font-bold italic uppercase">Mon - Sat: 10:00 AM - 7:00 PM</p>
           </div>
        </div>

        <CommercialInquiryModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </div>
  );
}
