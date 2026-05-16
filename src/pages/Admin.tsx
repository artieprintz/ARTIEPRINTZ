import { useState, useEffect } from 'react';
import { dbService } from '../services/db';
import { formatCurrency } from '../lib/utils';
import { Loader2, ExternalLink, PackageCheck, Truck, Clock } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    if (password === adminPassword) {
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    const data = await dbService.getOrders();
    setOrders(data);
    setLoading(false);
  };

  const updateStatus = async (orderId: string, status: string) => {
    const success = await dbService.updateOrderStatus(orderId, status);
    if (success) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080808] px-10">
        <div className="max-w-md w-full text-center p-16 border border-zinc-800 bg-zinc-900 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-4xl font-black italic opacity-[0.03] pointer-events-none uppercase">SECURE LOGIN</div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter italic mb-12 uppercase text-white">ADMIN <span className="text-brand-accent">LOGIN</span></h1>
          <form onSubmit={handleLogin} className="space-y-6">
             <input 
               type="password" 
               placeholder="ENTER ADMIN PASSWORD" 
               className="w-full bg-[#080808] border border-zinc-800 px-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] focus:outline-none focus:border-brand-accent transition-all text-center text-white placeholder:text-zinc-700"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
             />
             <button type="submit" className="w-full bg-white text-black py-5 font-black text-[11px] uppercase tracking-[0.4em] hover:bg-brand-accent hover:text-white transition-all italic shadow-xl transform active:scale-95">
               LOGIN
             </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-40 px-10 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
           <div>
              <h1 className="text-8xl md:text-9xl font-black tracking-tighter italic uppercase text-white leading-none">ORDER <span className="text-brand-accent">MANAGEMENT</span></h1>
              <p className="text-zinc-600 text-[12px] uppercase tracking-[0.5em] font-black mt-4 italic">{orders.length} Orders in progress</p>
           </div>
           <button onClick={fetchOrders} className="p-6 border border-zinc-800 bg-zinc-900 hover:border-brand-accent hover:bg-zinc-800 transition-all shadow-xl group">
              {loading ? <Loader2 className="w-6 h-6 animate-spin text-brand-accent" /> : <Clock className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors" />}
           </button>
        </div>

        <div className="space-y-8">
           {orders.map((order) => (
             <div key={order.id} className="bg-zinc-900/30 border border-zinc-800 p-12 transition-all hover:bg-zinc-900/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-8xl font-black italic opacity-[0.02] pointer-events-none uppercase">ORDER ID</div>
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
                   <div className="flex-1">
                      <div className="flex items-center space-x-6 mb-8 border-b border-zinc-800 pb-8">
                         <span className="text-[11px] font-mono text-zinc-500 font-bold uppercase tracking-widest italic">Order #{order.id}</span>
                         <span className={`text-[10px] uppercase tracking-[0.4em] px-5 py-2 font-black italic rounded-full border ${
                           order.status === 'PENDING' ? 'border-yellow-500/20 text-yellow-500 bg-yellow-500/5' :
                           order.status === 'SHIPPED' ? 'border-blue-500/20 text-blue-500 bg-blue-500/5' :
                           'border-brand-accent/20 text-brand-accent bg-brand-accent/5'
                         }`}>
                           {order.status}
                         </span>
                         <span className="text-[10px] text-zinc-700 uppercase tracking-widest font-black italic">
                            RECEIVED: {new Date(order.created_at).toLocaleString()}
                         </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                         <div className="space-y-6">
                            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-zinc-600 italic">Customer Details</h4>
                            <div className="p-8 border border-zinc-800 bg-[#080808]">
                              <p className="text-3xl font-black italic text-white uppercase tracking-tighter mb-4">{order.customer_name}</p>
                              <p className="text-sm text-zinc-400 font-mono font-bold tracking-widest mb-4 hover:text-brand-accent transition-colors underline decoration-zinc-800">{order.phone}</p>
                              <p className="text-[11px] text-zinc-500 font-mono italic uppercase leading-relaxed tracking-wider">{order.address}</p>
                            </div>
                         </div>
                         
                         <div className="space-y-6">
                            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-zinc-600 italic">Order Items</h4>
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                               {order.order_items.map((item: any) => (
                                 <div key={item.id} className="flex justify-between items-center text-sm border-b border-zinc-800 pb-4 group/item">
                                    <div className="flex flex-col">
                                      <span className="font-black text-xs uppercase tracking-widest italic text-zinc-300 group-hover/item:text-brand-accent transition-colors">{item.product_name}</span>
                                      <span className="text-[10px] text-zinc-600 font-black italic mt-1">{item.size}</span>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                       {item.upload_url && (
                                         <a href={item.upload_url} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center border border-zinc-800 bg-[#080808] text-zinc-500 hover:text-brand-accent hover:border-brand-accent transition-all">
                                            <ExternalLink className="w-4 h-4" />
                                         </a>
                                       )}
                                       <span className="font-mono text-zinc-400 font-black italic border-l border-zinc-800 pl-6 h-10 flex items-center">UNIT_{item.quantity}</span>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="w-full md:w-auto flex flex-col md:items-end justify-between self-stretch pt-2 md:pt-0">
                      <div className="md:text-right p-8 border border-zinc-800 bg-[#080808]">
                         <p className="text-[11px] uppercase tracking-[0.5em] text-zinc-700 mb-4 font-black italic">Total Amount</p>
                         <p className="text-[11px] text-zinc-800 mb-2 font-black italic italic">TOTAL VALUE</p>
                         <p className="text-5xl font-black italic text-brand-accent tracking-tighter">{formatCurrency(order.total)}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 mt-12">
                         <button 
                           onClick={() => updateStatus(order.id, 'SHIPPED')}
                           className="flex items-center justify-center space-x-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-8 py-5 text-[11px] uppercase tracking-[0.3em] font-black italic transition-all shadow-xl group/btn"
                         >
                            <Truck className="w-4 h-4 text-zinc-400 group-hover/btn:text-white" />
                            <span>Mark as Shipped</span>
                         </button>
                         <button 
                           onClick={() => updateStatus(order.id, 'DELIVERED')}
                           className="flex items-center justify-center space-x-3 bg-white text-black hover:bg-brand-accent hover:text-white px-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] italic transition-all shadow-xl"
                         >
                            <PackageCheck className="w-4 h-4" />
                            <span>Confirm Delivery</span>
                         </button>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
