import { useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state;

  useEffect(() => {
    if (order) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#000000', '#737373']
      });
    }
  }, [order]);

  if (!order) {
    return <Navigate to="/shop" />;
  }

  const handleWhatsAppRedirect = () => {
    const productsText = order.items.map((i: any) => 
      `- ${i.name} x ${i.quantity}${i.uploadUrl ? `\n  (Print Photo: ${i.uploadUrl})` : ''}`
    ).join('\n');
    
    const message = `Hi ARTiE PRINTz,\nI placed an order.\n\nOrder ID: ${order.orderId}\nProducts:\n${productsText}\nShipping: ${order.shippingMethod} (${formatCurrency(order.shippingFee)})\nTotal: ${formatCurrency(order.total)}\nCustomer: ${order.customerName}\n\nI am attaching my high-quality photos here for printing. Please confirm my order.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919962200444?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-40 px-10 text-center bg-[#080808]">
       <motion.div
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ type: 'spring', damping: 20 }}
       >
          <div className="relative inline-block mb-10">
            <CheckCircle2 className="w-24 h-24 mx-auto text-brand-accent mb-0" />
            <div className="absolute inset-0 bg-brand-accent/20 blur-3xl rounded-full -z-10"></div>
          </div>
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter italic mb-6 leading-none uppercase text-white">ORDER <span className="text-brand-accent">CONFIRMED</span></h1>
          <p className="text-zinc-600 text-sm uppercase tracking-[0.4em] font-black mb-16 italic">
            Order received: #{order.orderId}
          </p>
          
          <div className="max-w-xl mx-auto space-y-10 pt-16 border-t border-zinc-800 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#080808] px-8 text-zinc-500 text-[10px] font-black tracking-[0.5em] italic">THANK YOU</div>
             
             <p className="text-base font-bold leading-relaxed text-zinc-400 italic">
               Your order is being processed. We are preparing your custom prints and will ship them soon.
             </p>

             <div className="p-10 border border-brand-accent/20 bg-brand-accent/5 flex flex-col items-center">
                <h4 className="text-[11px] font-black tracking-[0.4em] uppercase mb-4 text-brand-accent italic">IMPORTANT STEP</h4>
                <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest italic leading-relaxed">
                   PLEASE ATTACH YOUR <span className="text-white">HIGH-QUALITY PHOTOS</span> IN THE WHATSAPP CHAT TO COMPLETE YOUR ORDER.
                </p>
             </div>

             {/* UPI Payment Section */}
             <div className="bg-zinc-950 border border-zinc-900 p-8 flex flex-col items-center">
                <h4 className="text-[10px] font-black tracking-[0.3em] uppercase mb-8 text-brand-accent italic">Scan to Pay via UPI</h4>
                <div className="p-4 bg-white rounded-xl mb-8">
                   <QRCodeSVG 
                     value={`upi://pay?pa=9962200444@pthdfc&pn=ARTiE_PRINTz&am=${order.total}&cu=INR`}
                     size={200}
                     level="H"
                   />
                </div>
                <div className="text-center">
                   <p className="text-white font-mono text-lg font-black mb-2 italic">{formatCurrency(order.total)}</p>
                   <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest italic">UPI ID: 9962200444@pthdfc</p>
                </div>
             </div>
             
             <div className="pt-10 flex flex-col md:flex-row gap-6">
                <button 
                  onClick={handleWhatsAppRedirect}
                  className="flex-1 bg-[#25D366] text-white py-6 px-10 text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center space-x-3 hover:brightness-110 transition-all italic shadow-2xl transform hover:-translate-y-1"
                >
                   <MessageCircle className="w-5 h-5" />
                   <span>Confirm on WhatsApp</span>
                </button>
                
                <Link 
                  to="/shop"
                  className="flex-1 bg-white text-black py-6 px-10 text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center space-x-3 group hover:bg-brand-accent hover:text-white transition-all italic shadow-2xl transform hover:-translate-y-1"
                >
                   <span>Back to Shop</span>
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>
             
             <div className="pt-16 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-[10px] font-black text-white/20 mb-2 italic">STATUS</div>
                  <div className="text-[10px] font-black text-brand-accent uppercase italic">Preparing</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-black text-white/20 mb-2 italic">SECTOR</div>
                  <div className="text-[10px] font-black text-zinc-300 uppercase italic">TAMIL NADU</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-black text-white/20 mb-2 italic">PRIORITY</div>
                  <div className="text-[10px] font-black text-zinc-300 uppercase italic">High</div>
                </div>
             </div>
          </div>
       </motion.div>
    </div>
  );
}
