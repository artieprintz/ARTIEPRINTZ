import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-zinc-900 py-32 px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-accent/5 blur-[150px] rounded-full -z-10 translate-y-1/2"></div>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-5xl font-black tracking-tighter mb-10 block text-white italic transition-all hover:text-brand-accent">
            ARTiE <span className="text-brand-accent">PRINTz</span>
          </Link>
          <p className="text-zinc-300 text-sm max-w-sm mb-12 font-bold leading-relaxed italic">
            High-quality prints and custom streetwear. Made for you, delivered worldwide.
          </p>
          <div className="space-y-6 mb-12">
            <div className="flex items-center space-x-4 text-zinc-300 hover:text-white transition-colors group">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black italic text-zinc-400 group-hover:text-brand-accent transition-colors">MAIL —</span>
              <a href="mailto:artieprintz@gmail.com" className="text-sm font-black italic lowercase tracking-wider text-white">artieprintz@gmail.com</a>
            </div>
            <div className="flex items-center space-x-4 text-zinc-300 hover:text-white transition-colors group">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black italic text-zinc-400 group-hover:text-brand-accent transition-colors">WHATSAPP —</span>
              <a href="https://wa.me/+919962200444" target="_blank" rel="noreferrer" className="text-sm font-black italic tracking-wider text-white">+91 99622 00444</a>
            </div>
          </div>
          <div className="flex space-x-6">
            <a href="https://instagram.com/artieprintz.shop" target="_blank" rel="noreferrer" className="w-12 h-12 border border-zinc-700 rounded-none flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all shadow-xl">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://wa.me/+919962200444" target="_blank" rel="noreferrer" className="w-12 h-12 border border-zinc-700 rounded-none flex items-center justify-center hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all shadow-xl">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.5em] mb-10 font-black text-zinc-300 italic border-b border-zinc-700 pb-4 inline-block">MENU</h4>
          <ul className="space-y-6 text-sm font-black italic">
            <li><Link to="/shop" className="text-zinc-400 hover:text-brand-accent transition-colors">SHOP</Link></li>
            <li><Link to="/commercial" className="text-zinc-400 hover:text-brand-accent transition-colors">BULK & COMMERCIAL</Link></li>
            <li><Link to="/how-to-order" className="text-zinc-400 hover:text-brand-accent transition-colors">HOW TO ORDER</Link></li>
            <li><Link to="/faq" className="text-zinc-400 hover:text-brand-accent transition-colors">FAQ</Link></li>
            <li><Link to="/admin" className="text-zinc-700 opacity-30 hover:text-zinc-400 transition-colors">ADMIN</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto pt-32 mt-32 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-[11px] tracking-[0.4em] font-black uppercase text-zinc-500 italic text-center space-y-6 md:space-y-0">
        <p>© 2025 ARTiE_PRINTz / ALL RIGHTS RESERVED</p>
        <div className="flex space-x-10 text-zinc-400">
          <Link to="/" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
          <Link to="/" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
          <Link to="/" className="hover:text-white transition-colors">SHIPPING POLICY</Link>
        </div>
      </div>
    </footer>
  );
}
