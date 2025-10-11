import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ProductProvider, useProducts } from './context/ProductContext';
import { WishlistProvider } from './context/WishlistContext';
import { useMobile } from './utils/useMobile';
import './main.css';
import PromoBanner from './elements/PromoBanner';
import Navbar from './elements/NavBar';
import HeroSection from './elements/HeroSection';
import ProductCarousel from './elements/ProductCarousel';
import ScrollToTop from './elements/ScrollToTop';
import Footer from './components/layout/Footer';
import WhatsAppButton from './elements/WhatsAppButton';
import MobileHomePage from './components/mobile/MobileHomePage';
import MobileNavBar from './elements/mobile/MobileNavBar';

// Lazy load components
const ItemDetailPage = lazy(() => import('./components/ItemDetailPage'));
const CategoryPage = lazy(() => import('./components/CategoryPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const WishlistPage = lazy(() => import('./components/WishlistPage'));

const AppContent = () => {
  const { state } = useProducts();
  const { sarees, lehengas, kurtis, latestCollection, loading, error } = state;
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMobile = useMobile();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
      <div>
        <PromoBanner />
        {isMobile ? <MobileNavBar /> : <Navbar />}
        <main id="main-content" className={isHomePage ? '' : 'main-content'}>
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>}>
            <Routes>
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/:category/:id" element={<ItemDetailPage />} />
              <Route path="/new-arrivals" element={<CategoryPage category="new-arrivals" />} />
              <Route path="/best-sellers" element={<CategoryPage category="best-sellers" />} />
              <Route path="/shop-all" element={<CategoryPage category="shop-all" />} />
              <Route path="/sarees" element={<CategoryPage category="sarees" />} />
              <Route path="/lehengas" element={<CategoryPage category="lehengas" />} />
              <Route path="/kurtis" element={<CategoryPage category="kurtis" />} />
              <Route path="/anarkalis" element={<CategoryPage category="anarkalis" />} />
              <Route path="/shararas" element={<CategoryPage category="shararas" />} />
              <Route path="/" element={
                isMobile ? (
                  <MobileHomePage />
                ) : (
                  <>
                    <HeroSection />
                    <ProductCarousel 
                      items={latestCollection} 
                      category="latest" 
                      title="Our Latest Collections" 
                    />
                  </>
                )
              } />
            </Routes>
          </Suspense>
        </main>
        <ScrollToTop />
        <WhatsAppButton />
        <Footer />
      </div>
  );
};

function App() {
  return (
    <WishlistProvider>
      <ProductProvider>
        <Router basename={process.env.NODE_ENV === 'production' ? '/shringar-tech.github.io' : ''}>
          <AppContent />
        </Router>
      </ProductProvider>
    </WishlistProvider>
  );
}

export default App;