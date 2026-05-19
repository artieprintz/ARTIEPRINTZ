import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency, cn } from '../lib/utils';
import { dbService } from '../services/db';
import { motion } from 'motion/react';
import { ArrowLeft, Loader2, ShieldCheck, QrCode, Smartphone, Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    zip: '',
    notes: '',
    promoCode: ''
  });

  const [shippingMethod, setShippingMethod] = useState<'DELIVERY' | 'PICKUP'>('DELIVERY');
  const [paymentMethod, setPaymentMethod] = useState<'QR' | 'UPI'>('QR');
  const [copied, setCopied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  const subtotal = total();
  const shippingFee = shippingMethod === 'DELIVERY' ? 50 : 0;
  const totalAmount = Math.max(0, subtotal + shippingFee - discount);

  const applyPromoCode = () => {
    if (formData.promoCode.toUpperCase() === 'FOLLOW50') {
      if (subtotal >= 250) {
        setDiscount(50);
        setPromoError('');
      } else {
        setPromoError('Promo code applies only for orders over ₹250.');
        setDiscount(0);
      }
    } else {
      setPromoError('INVALID PROMO CODE');
      setDiscount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    if (formData.state.toLowerCase() !== 'tamil nadu') {
      alert('Currently, we only ship inside Tamil Nadu.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save order to DB
      const order = await dbService.createOrder({
        customer_name: formData.fullName,
        phone: formData.whatsapp,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zip} | ${shippingMethod} | Payment: ${paymentMethod === 'QR' ? 'QR Code' : 'UPI'}${formData.notes ? ' | Notes: ' + formData.notes : ''}${discount > 0 ? ` | Promo: ${formData.promoCode} (-${discount})` : ''}`,
        total: totalAmount,
      }, items.map(item => ({
        product_id: item.productId,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        variant: item.variant,
        option: item.option,
        custom_size: item.customSize,
        upload_url: null
      })));

      if (!order) throw new Error("Failed to place order.");

      // 3. Send Discord Webhook (best-effort — never blocks the order)
      try {
        const discordPayload = {
          embeds: [{
            title: "🚨 NEW ORDER PLACED",
            color: 0x000000,
            fields: [
              { name: "Order ID", value: order.id.toString(), inline: true },
              { name: "Customer", value: formData.fullName, inline: true },
              { name: "Phone", value: formData.whatsapp, inline: true },
              { name: "Address", value: `${formData.address}, ${formData.city}`, inline: false },
              { name: "Total", value: formatCurrency(totalAmount), inline: true },
              { name: "Payment Option", value: paymentMethod === 'QR' ? "QR Code" : "UPI Direct", inline: true },
              { name: "Items", value: items.map(i => `• ${i.name} x${i.quantity}`).join('\n') }
            ],
            timestamp: new Date().toISOString()
          }]
        };

        await fetch('/api/order-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordPayload)
        });
      } catch (discordErr) {
        console.warn('[Discord] Notification failed (order still saved):', discordErr);
      }

      // 4. Success!
      const orderSummary = {
        orderId: order.id,
        items: items,
        total: totalAmount,
        customerName: formData.fullName,
        shippingMethod,
        shippingFee,
        paymentMethod
      };
      
      clearCart();
      navigate('/success', { state: orderSummary });

    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-40 pb-40 px-10 bg-[#080808]">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/cart')} className="mb-16 text-[10px] font-black uppercase tracking-[0.3em] flex items-center text-zinc-300 hover:text-white transition-colors border border-zinc-700 px-6 py-3">
           <ArrowLeft className="w-3 h-3 mr-2" /> Back to Cart
        </button>
        
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter italic mb-20 uppercase text-white">CHECK<span className="text-brand-accent">OUT</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
           <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-8">
                 <div className="flex items-center space-x-4 mb-8">
                    <div className="w-8 h-8 rounded-full border border-brand-accent flex items-center justify-center text-brand-accent font-mono text-xs">1</div>
                    <h2 className="text-[12px] uppercase tracking-[0.4em] font-black text-white italic">Shipping Information</h2>
                 </div>
                 
                 <div className="space-y-4">
                    <input 
                      required
                      name="fullName"
                      placeholder="FULL NAME"
                      className="w-full bg-zinc-900/50 border border-zinc-700 px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-bold focus:outline-none focus:border-brand-accent focus:bg-zinc-900 transition-all text-white placeholder:text-zinc-400"
                      onChange={handleInputChange}
                    />
                    <div className="grid grid-cols-1 gap-4">
                       <input 
                         required
                         name="whatsapp"
                         placeholder="WHATSAPP NUMBER"
                         className="w-full bg-zinc-900/50 border border-zinc-700 px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-bold focus:outline-none focus:border-brand-accent focus:bg-zinc-900 transition-all text-white placeholder:text-zinc-400"
                         onChange={handleInputChange}
                       />
                    </div>
                    <textarea 
                      required
                      name="address"
                      placeholder="FULL ADDRESS (STREET, NO, LANDMARK)"
                      rows={3}
                      className="w-full bg-zinc-900/50 border border-zinc-700 px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-bold focus:outline-none focus:border-brand-accent focus:bg-zinc-900 transition-all text-white placeholder:text-zinc-400 resize-none"
                      onChange={handleInputChange}
                    />
                    <div className="grid grid-cols-3 gap-4">
                       <input 
                         required
                         name="city"
                         placeholder="CITY"
                         className="w-full bg-zinc-900/50 border border-zinc-700 px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-bold focus:outline-none focus:border-brand-accent focus:bg-zinc-900 transition-all text-white placeholder:text-zinc-400"
                         onChange={handleInputChange}
                       />
                       <div className="relative">
                          <select 
                            required
                            name="state"
                            value={formData.state}
                            className="w-full h-full bg-zinc-900/50 border border-zinc-700 px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-bold focus:outline-none focus:border-brand-accent focus:bg-zinc-900 transition-all text-white appearance-none"
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          >
                            <option value="Tamil Nadu">Tamil Nadu</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-accent text-[8px] font-black uppercase">Only TN</div>
                       </div>
                       <input 
                         required
                         name="zip"
                         placeholder="PIN CODE"
                         className="w-full bg-zinc-900/50 border border-zinc-700 px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-bold focus:outline-none focus:border-brand-accent focus:bg-zinc-900 transition-all text-white placeholder:text-zinc-400"
                         onChange={handleInputChange}
                       />
                    </div>

                    {/* Shipping Method Selection */}
                    <div className="pt-8 border-t border-zinc-900">
                       <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-zinc-300 italic">Shipping Method</h3>
                       <div className="grid grid-cols-2 gap-4">
                          <button 
                            type="button"
                            onClick={() => setShippingMethod('PICKUP')}
                            className={cn(
                              "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic border transition-all flex flex-col items-center",
                              shippingMethod === 'PICKUP' ? "bg-white text-black border-white" : "bg-zinc-950 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white"
                            )}
                          >
                            <span>Pick up</span>
                            <span className="text-[8px] mt-1 opacity-60 font-bold">FREE</span>
                          </button>
                          <button 
                            type="button"
                            onClick={() => setShippingMethod('DELIVERY')}
                            className={cn(
                              "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic border transition-all flex flex-col items-center",
                              shippingMethod === 'DELIVERY' ? "bg-white text-black border-white" : "bg-zinc-950 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white"
                            )}
                          >
                            <span>Delivery</span>
                            <span className="text-[8px] mt-1 opacity-60 font-bold">₹50 CHARGE</span>
                          </button>
                       </div>
                    </div>

                    {/* Payment Option Selection */}
                    <div className="pt-8 border-t border-zinc-900">
                       <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-zinc-300 italic">Payment Option</h3>
                       <div className="grid grid-cols-2 gap-4">
                          <button 
                            type="button"
                            onClick={() => setPaymentMethod('QR')}
                            className={cn(
                              "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic border transition-all flex flex-col items-center justify-center space-y-2",
                              paymentMethod === 'QR' ? "bg-white text-black border-white" : "bg-zinc-950 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white"
                            )}
                          >
                            <QrCode className="w-4 h-4" />
                            <span>Pay by QR</span>
                            <span className="text-[8px] mt-1 opacity-60 font-bold">Scan QR Code</span>
                          </button>
                          <button 
                            type="button"
                            onClick={() => setPaymentMethod('UPI')}
                            className={cn(
                              "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic border transition-all flex flex-col items-center justify-center space-y-2",
                              paymentMethod === 'UPI' ? "bg-white text-black border-white" : "bg-zinc-950 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white"
                            )}
                          >
                            <Smartphone className="w-4 h-4" />
                            <span>Pay by UPI</span>
                            <span className="text-[8px] mt-1 opacity-60 font-bold">UPI ID / App</span>
                          </button>
                       </div>
                    </div>

                    <textarea 
                      name="notes"
                      placeholder="ORDER NOTES (OPTIONAL)"
                      rows={2}
                      className="w-full bg-zinc-900/50 border border-zinc-700 px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-bold focus:outline-none focus:border-brand-accent focus:bg-zinc-900 transition-all text-white placeholder:text-zinc-400 resize-none"
                      onChange={handleInputChange}
                    />

                    {/* Dynamic Payment details box directly in checkout page */}
                    <div className="pt-8 border-t border-zinc-900">
                       {paymentMethod === 'QR' ? (
                          <div className="bg-zinc-950 border border-zinc-900 p-8 flex flex-col items-center">
                             <div className="flex items-center space-x-3 mb-6 text-brand-accent">
                                <QrCode className="w-5 h-5" />
                                <h4 className="text-[10px] font-black tracking-[0.3em] uppercase italic">Scan to Pay Now</h4>
                             </div>
                             <div className="p-4 bg-white rounded-xl mb-6">
                                <QRCodeSVG 
                                  value={`upi://pay?pa=9962200444@pthdfc&pn=ARTiE_PRINTz&am=${totalAmount}&cu=INR`}
                                  size={160}
                                  level="H"
                                />
                             </div>
                             <div className="text-center">
                                <p className="text-white font-mono text-lg font-black mb-1 italic">{formatCurrency(totalAmount)}</p>
                                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest italic">UPI ID: 9962200444@pthdfc</p>
                             </div>
                          </div>
                       ) : (
                          <div className="bg-zinc-950 border border-zinc-900 p-8 flex flex-col items-center">
                             <div className="flex items-center space-x-3 mb-6 text-brand-accent">
                                <Smartphone className="w-5 h-5" />
                                <h4 className="text-[10px] font-black tracking-[0.3em] uppercase italic">Pay via UPI App / ID</h4>
                             </div>
                             
                             <div className="w-full space-y-4">
                                <a 
                                  href={`upi://pay?pa=9962200444@pthdfc&pn=ARTiE_PRINTz&am=${totalAmount}&cu=INR`}
                                  className="w-full bg-white text-black hover:bg-brand-accent hover:text-white py-5 px-6 text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center space-x-3 transition-all italic shadow-lg"
                                >
                                  <Smartphone className="w-4 h-4" />
                                  <span>Pay Instantly via UPI App</span>
                                </a>

                                <div className="text-zinc-650 text-[9px] uppercase tracking-widest font-black italic text-center">
                                  — OR COPY UPI ID —
                                </div>

                                <div className="flex items-center bg-[#080808] border border-zinc-805 p-4">
                                   <span className="flex-grow text-[10px] font-mono text-zinc-400 font-bold text-left select-all">9962200444@pthdfc</span>
                                   <button 
                                     type="button"
                                     onClick={() => {
                                       navigator.clipboard.writeText('9962200444@pthdfc');
                                       setCopied(true);
                                       setTimeout(() => setCopied(false), 2000);
                                     }}
                                     className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-brand-accent text-[9px] font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all italic flex items-center space-x-2"
                                   >
                                     {copied ? (
                                       <>
                                         <Check className="w-3 h-3 text-green-500" />
                                         <span>Copied</span>
                                       </>
                                     ) : (
                                       <>
                                         <Copy className="w-3 h-3" />
                                         <span>Copy</span>
                                       </>
                                     )}
                                   </button>
                                </div>
                             </div>

                             <div className="text-center mt-6">
                                <p className="text-white font-mono text-lg font-black mb-2 italic">{formatCurrency(totalAmount)}</p>
                                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest italic">Payable to: ARTiE PRINTz</p>
                             </div>
                          </div>
                       )}
                    </div>
                 </div>
              </div>

              <div className="pt-12 border-t border-zinc-800">
                 <button 
                   disabled={isSubmitting || items.length === 0}
                   type="submit"
                   className="w-full bg-white text-black py-8 text-[14px] font-black uppercase tracking-[0.4em] hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center disabled:opacity-50 shadow-2xl transform active:scale-95 italic"
                 >
                   {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Place Order"}
                 </button>

                 {/* Mobile Sticky Order Button */}
                 <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-[#080808]/80 backdrop-blur-xl border-t border-zinc-800 z-50">
                    <button 
                      disabled={isSubmitting || items.length === 0}
                      type="submit"
                      form="checkout-form"
                      className="w-full bg-brand-accent text-white py-6 text-[12px] font-black uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center space-x-3 italic active:scale-95 transition-transform disabled:opacity-50"
                    >
                       {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>
                          <span>Pay {formatCurrency(totalAmount)}</span>
                          <ShieldCheck className="w-4 h-4 ml-2" />
                       </>}
                    </button>
                 </div>

                 <div className="flex items-center justify-center space-x-4 mt-8 opacity-40 text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold italic">
                    <ShieldCheck className="w-4 h-4 text-brand-accent" />
                    <span>Secure Checkout</span>
                 </div>
              </div>
           </form>

           {/* Order Review */}
           <div className="lg:sticky lg:top-40 h-fit">
              <div className="bg-zinc-900 border border-zinc-800 p-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-6xl font-black italic opacity-[0.03] rotate-12 pointer-events-none">REVIEW</div>
                  
                  <h3 className="text- brand-accent text-[12px] uppercase tracking-[0.4em] font-black mb-10 italic border-b border-zinc-800 pb-6">Your Order</h3>
                  <div className="space-y-8 mb-12 max-h-[400px] overflow-y-auto pr-6 custom-scrollbar">
                     {items.map(item => (
                       <div key={item.id} className="flex space-x-6 group">
                          <div className="w-20 h-24 bg-black border border-zinc-800 overflow-hidden flex-shrink-0">
                             <img src={item.image} className="w-full h-full object-cover transition-all duration-700" alt={item.name} />
                          </div>
                          <div className="flex-1 py-1">
                             <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-white italic group-hover:text-brand-accent transition-colors">{item.name}</h4>
                             <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest italic">QTY {item.quantity} × {item.size}</p>
                             <p className="text-[12px] font-mono mt-3 text-zinc-400 font-bold">{formatCurrency(item.price * item.quantity)}</p>
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="space-y-5 pt-8 border-t border-zinc-800 text-[11px] uppercase tracking-[0.2em] font-black">
                     <div className="flex justify-between text-zinc-500 italic">
                        <span>Subtotal</span>
                        <span className="font-mono text-zinc-300">{formatCurrency(subtotal)}</span>
                     </div>
                     <div className="flex justify-between text-zinc-500 italic">
                        <span>Shipping ({shippingMethod})</span>
                        <span className="font-mono text-brand-accent italic">{shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}</span>
                     </div>
                     {discount > 0 && (
                       <div className="flex justify-between text-brand-accent italic">
                          <span>Discount</span>
                          <span className="font-mono">-{formatCurrency(discount)}</span>
                       </div>
                     )}
                     
                     <div className="pt-6">
                        <div className="flex space-x-2">
                           <input 
                              name="promoCode"
                              placeholder="PROMO CODE"
                              className="flex-1 bg-black border border-zinc-800 px-4 py-3 text-[10px] uppercase tracking-[0.2em] font-bold focus:outline-none focus:border-brand-accent transition-all text-white placeholder:text-zinc-800"
                              onChange={handleInputChange}
                           />
                           <button 
                              type="button"
                              onClick={applyPromoCode}
                              className="bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-accent hover:text-white transition-all italic"
                           >
                              Apply
                           </button>
                        </div>
                        {promoError && <p className="text-[9px] text-red-500 mt-2 font-black tracking-widest italic">{promoError}</p>}
                     </div>

                     <div className="flex justify-between items-end pt-8 mt-2 border-t border-zinc-800">
                        <span className="text-zinc-400 text-sm italic">Total</span>
                        <span className="font-mono text-5xl text-brand-accent font-black tracking-tighter italic">{formatCurrency(totalAmount)}</span>
                     </div>
                  </div>
              </div>
              
              <div className="mt-10 p-8 border border-zinc-800 bg-zinc-900/30 text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest font-medium italic">
                Notice: All orders are final. Custom prints cannot be returned. Shipping currently restricted to Tamil Nadu only.
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
