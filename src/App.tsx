import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import HowToOrder from './pages/HowToOrder';
import FAQ from './pages/FAQ';
import Admin from './pages/Admin';
import WishlistPage from './pages/WishlistPage';
import CommercialPrinting from './pages/CommercialPrinting';
import PromoModal from './components/PromoModal';
import { useEffect } from 'react';
import { useCartStore } from './store/useCartStore';
import { ShoppingBag } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const { items } = useCartStore();
  const showFloatingCart = location.pathname !== '/cart' && location.pathname !== '/checkout';

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <div className="grain-overlay" />
      <Navbar />
      <ScrollToTop />
      <PromoModal />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pt-20"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/how-to-order" element={<HowToOrder />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/commercial" element={<CommercialPrinting />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      {/* Persistent Floating Orange Cart Button */}
      <AnimatePresence>
        {showFloatingCart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-8 right-8 z-[50]"
          >
            <Link 
              to="/cart" 
              className="flex items-center gap-3 bg-[#FF6B4A] hover:bg-[#e05636] text-white px-6 py-4 rounded-full shadow-[0_10px_35px_rgba(255,107,74,0.4)] hover:shadow-[0_15px_45px_rgba(255,107,74,0.6)] transition-all font-black uppercase tracking-[0.15em] hover:scale-105 active:scale-95 italic border border-white/20"
            >
              <ShoppingBag className="w-5 h-5 animate-pulse" />
              <span className="text-sm">Cart ({items.length})</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
