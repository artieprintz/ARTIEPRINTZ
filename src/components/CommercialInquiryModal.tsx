import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageCircle, User, Mail, Phone, Hash, Package } from 'lucide-react';

interface CommercialInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommercialInquiryModal({ isOpen, onClose }: CommercialInquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productType: 'Visiting Cards',
    quantity: '',
    message: ''
  });

  const products = [
    'Letterhead Printing',
    'Visiting Cards',
    'Certificates',
    'Pamphlets & Flyers',
    'Brochures',
    'Custom Envelopes',
    'Other Bulk Request'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format message for Discord
    const discordPayload = {
      embeds: [{
        title: "New Bulk/Commercial Inquiry",
        color: 0xFF6B4A,
        fields: [
          { name: "Name", value: formData.name, inline: true },
          { name: "Phone", value: formData.phone, inline: true },
          { name: "Email", value: formData.email, inline: true },
          { name: "Product", value: formData.productType, inline: true },
          { name: "Quantity", value: formData.quantity, inline: true },
          { name: "Message", value: formData.message || "No message provided" }
        ],
        timestamp: new Date().toISOString()
      }]
    };

    // Send to Discord via proxy
    fetch('/api/order-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload)
    }).catch(err => console.error('Discord notification failed:', err));

    // Format message for WhatsApp
    const whatsappMessage = `*New Bulk Inquiry*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Product: ${formData.productType}
Quantity: ${formData.quantity}
Message: ${formData.message}`;

    window.open(`https://wa.me/919962200444?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-4"
          >
            <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 p-8 sm:p-12 pointer-events-auto relative overflow-hidden">
               <button 
                 onClick={onClose}
                 className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
               >
                 <X className="w-6 h-6" />
               </button>

               <div className="mb-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent italic mb-4 block">Request a Quote</span>
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter">Bulk Inquiry</h2>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Name</label>
                        <div className="relative">
                           <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                           <input 
                             required
                             type="text"
                             value={formData.name}
                             onChange={(e) => setFormData({...formData, name: e.target.value})}
                             className="w-full bg-zinc-900 border border-zinc-800 py-4 pl-12 pr-4 text-sm font-bold focus:border-brand-accent outline-none transition-colors italic"
                             placeholder="YOUR NAME"
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Phone</label>
                        <div className="relative">
                           <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                           <input 
                             required
                             type="tel"
                             value={formData.phone}
                             onChange={(e) => setFormData({...formData, phone: e.target.value})}
                             className="w-full bg-zinc-900 border border-zinc-800 py-4 pl-12 pr-4 text-sm font-bold focus:border-brand-accent outline-none transition-colors italic"
                             placeholder="WHATSAPP NUMBER"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Email</label>
                        <div className="relative">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                           <input 
                             required
                             type="email"
                             value={formData.email}
                             onChange={(e) => setFormData({...formData, email: e.target.value})}
                             className="w-full bg-zinc-900 border border-zinc-800 py-4 pl-12 pr-4 text-sm font-bold focus:border-brand-accent outline-none transition-colors italic"
                             placeholder="BUSINESS EMAIL"
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Product Type</label>
                        <div className="relative">
                           <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 pointer-events-none" />
                           <select 
                             value={formData.productType}
                             onChange={(e) => setFormData({...formData, productType: e.target.value})}
                             className="w-full bg-zinc-900 border border-zinc-800 py-4 pl-12 pr-4 text-sm font-bold focus:border-brand-accent outline-none transition-colors italic appearance-none cursor-pointer uppercase"
                           >
                              {products.map(p => <option key={p} value={p}>{p}</option>)}
                           </select>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Estimated Quantity</label>
                     <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                        <input 
                          required
                          type="text"
                          value={formData.quantity}
                          onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                          className="w-full bg-zinc-900 border border-zinc-800 py-4 pl-12 pr-4 text-sm font-bold focus:border-brand-accent outline-none transition-colors italic"
                          placeholder="E.G., 500 UNITS"
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Requirements / Message</label>
                     <textarea 
                       value={formData.message}
                       onChange={(e) => setFormData({...formData, message: e.target.value})}
                       className="w-full bg-zinc-900 border border-zinc-800 py-4 px-4 text-sm font-bold focus:border-brand-accent outline-none transition-colors italic h-32 resize-none"
                       placeholder="TELL US ABOUT YOUR PROJECT..."
                     />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand-accent py-5 flex items-center justify-center space-x-4 group overflow-hidden relative transition-transform hover:scale-[0.98]"
                  >
                     <span className="text-sm font-black uppercase tracking-[0.4em] italic relative z-10 transition-transform group-hover:-translate-x-2">Send Inquiry</span>
                     <Send className="w-4 h-4 italic relative z-10 transition-transform group-hover:translate-x-2" />
                  </button>
               </form>

               <div className="mt-8 flex items-center justify-center space-x-4 opacity-30">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] italic">Submitting will open ARTiE WhatsApp</span>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
