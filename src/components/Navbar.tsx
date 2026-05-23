import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Shop', path: '/shop' },
    { title: 'Bulk Orders', path: '/commercial' },
    { title: 'How to Order', path: '/how-to-order' },
    { title: 'About', path: '/about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex justify-between items-center text-white">
        <Link 
          to="/" 
          className="text-2xl font-black tracking-tighter italic hover:opacity-70 transition-opacity"
        >
          ARTiE PRINTz
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-lg uppercase tracking-[0.2em] font-medium hover:text-zinc-200 transition-colors ${
                location.pathname === link.path ? 'text-white' : 'text-zinc-400'
              }`}
            >
              {link.title}
            </Link>
          ))}
          <Link 
            to="/cart" 
            className="text-lg uppercase tracking-[0.2em] font-medium transition-opacity relative group"
          >
            <span className={location.pathname === '/cart' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}>
              Cart <span className="ml-1 text-brand-accent italic font-bold">({items.length})</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-accent transition-all group-hover:w-full"></span>
          </Link>
          <Link 
            to="/wishlist" 
            className="text-lg uppercase tracking-[0.2em] font-medium transition-opacity relative group"
          >
            <span className={location.pathname === '/wishlist' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}>
              <Heart className={`w-3.5 h-3.5 inline-block mr-1 -mt-0.5 ${wishlistItems.length > 0 ? 'fill-brand-accent text-brand-accent' : ''}`} />
              Wishlist
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-accent transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* mobile controls */}
        <div className="flex md:hidden items-center space-x-5">
          <Link to="/wishlist" className="text-lg font-bold">
            <Heart className={`w-4 h-4 ${wishlistItems.length > 0 ? 'fill-brand-accent text-brand-accent' : 'text-zinc-500'}`} />
          </Link>
          <Link to="/cart" className="text-lg font-bold">
            CART <span className="text-brand-accent italic">({items.length})</span>
          </Link>
          <button onClick={() => setIsOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center space-y-8"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-heading text-4xl hover:opacity-50 transition-opacity italic"
              >
                {link.title}
              </Link>
            ))}
            <div className="flex space-x-6 pt-12">
               <a href="https://instagram.com/artieprintz.shop" target="_blank" rel="noreferrer">
                <Instagram className="w-6 h-6" />
               </a>
            </div>
            <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 absolute bottom-12">
              Print what you love.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
