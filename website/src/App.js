import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProductProvider, useProducts } from './context/ProductContext';
import './main.css';
import Navbar from './elements/NavBar';
import HeroSection from './elements/HeroSection';
import ProductCarousel from './elements/ProductCarousel';
import ScrollToTop from './elements/ScrollToTop';
import Footer from './components/layout/Footer';

// Lazy load components
const ItemDetailPage = lazy(() => import('./components/ItemDetailPage'));
const CategoryPage = lazy(() => import('./components/CategoryPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));

const AppContent = () => {
  const { state } = useProducts();
  const { sarees, lehengas, kurtis, latestCollection, loading, error } = state;

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
        <Navbar />
        <main id="main-content">
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>}>
            <Switch>
              <Route path="/contact" component={ContactPage} />
              <Route path="/:category/:id" component={ItemDetailPage} />
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
            </Route>
            </Switch>
          </Suspense>
        </main>
        <ScrollToTop />
        <Footer />
      </div>
  );
};

function App() {
  return (
    <ProductProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <AppContent />
      </Router>
    </ProductProvider>
  );
}

export default App;