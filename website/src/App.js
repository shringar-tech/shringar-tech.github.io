import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
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
            <Switch>
              <Route path="/wishlist" component={WishlistPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/:category/:id" component={ItemDetailPage} />
              <Route path="/new-arrivals">
                <CategoryPage category="new-arrivals" />
              </Route>
              <Route path="/best-sellers">
                <CategoryPage category="best-sellers" />
              </Route>
              <Route path="/shop-all">
                <CategoryPage category="shop-all" />
              </Route>
              <Route path="/sarees">
                <CategoryPage category="sarees" />
              </Route>
              <Route path="/lehengas">
                <CategoryPage category="lehengas" />
              </Route>
              <Route path="/kurtis">
                <CategoryPage category="kurtis" />
              </Route>
            <Route path="/">
              {isMobile ? (
                <MobileHomePage />
              ) : (
                <>
                  <HeroSection />
                  <ProductCarousel 
                    items={latestCollection} 
                    category="sarees" 
                    title="Our Latest Collections" 
                  />
                  <ProductCarousel 
                    items={sarees} 
                    category="sarees" 
                    title="Sarees" 
                  />
                  <ProductCarousel 
                    items={lehengas} 
                    category="lehengas" 
                    title="Lehengas" 
                  />
                  <ProductCarousel 
                    items={kurtis} 
                    category="kurtis" 
                    title="Kurtis" 
                  />
                </>
              )}
            </Route>
            </Switch>
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
        <Router basename={process.env.PUBLIC_URL}>
          <AppContent />
        </Router>
      </ProductProvider>
    </WishlistProvider>
  );
}

export default App;