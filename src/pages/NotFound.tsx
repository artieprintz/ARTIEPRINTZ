import { Link } from 'react-router-dom';
import { Home, ShoppingBag, HelpCircle, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="bg-[#080808] min-h-[80vh] flex items-center justify-center px-10 relative overflow-hidden">
      <SEO 
        title="404 - Page Not Found | ARTiE PRINTz" 
        description="The page you are looking for does not exist. Navigate back to custom print shop to customize your premium polaroids, poster frames, and tees."
      />
      
      {/* Background Neon Glow Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-2xl text-center border border-zinc-800 bg-zinc-950/40 backdrop-blur-md p-16 md:p-24 shadow-2xl">
        <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter italic text-brand-accent select-none">
          404
        </h1>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mt-4 mb-8 text-white">
          Page Lost in Print.
        </h2>
        <p className="text-zinc-400 text-sm tracking-wide leading-relaxed mb-16 max-w-md mx-auto">
          The page you are looking for has been moved, archived, or printed on a different canvas. Let's get you back to the gallery.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/"
            className="flex items-center justify-center gap-3 border border-zinc-800 hover:border-brand-accent hover:bg-brand-accent/10 px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic text-zinc-300 hover:text-white transition-all transform hover:-translate-y-1"
          >
            <Home className="w-4 h-4 text-brand-accent" />
            <span>Home</span>
          </Link>
          <Link
            to="/shop"
            className="flex items-center justify-center gap-3 bg-white hover:bg-brand-accent hover:text-white text-black px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic transition-all transform hover:-translate-y-1"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Go Shop</span>
          </Link>
          <Link
            to="/faq"
            className="flex items-center justify-center gap-3 border border-zinc-800 hover:border-brand-accent hover:bg-brand-accent/10 px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic text-zinc-300 hover:text-white transition-all transform hover:-translate-y-1"
          >
            <HelpCircle className="w-4 h-4 text-brand-accent" />
            <span>Get Help</span>
          </Link>
        </div>

        <div className="mt-16 pt-12 border-t border-zinc-900">
          <Link
            to={undefined as any || -1 as any}
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            className="inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Go Back Previous Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
