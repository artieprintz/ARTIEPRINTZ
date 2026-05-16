import { Routes, Route, useLocation } from 'react-router-dom';
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

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

      <Footer />
    </div>
  );
}
