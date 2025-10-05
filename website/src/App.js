import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './main.css';
import Navbar from './elements/NavBar';
import HeroSection from './elements/HeroSection';
import ItemDetailPage from './components/ItemDetailPage';
import CategoryPage from './components/CategoryPage';
import ContactPage from './components/ContactPage';
import ProductCard from './elements/ProductCard';
import ProductCarousel from './elements/ProductCarousel';
import ScrollToTop from './elements/ScrollToTop';
import Footer from './components/layout/Footer';

function App() {
  const [sarees, setSarees] = useState([]);
  const [lehengas, setLehengas] = useState([]);
  const [kurtis, setKurtis] = useState([]);
  const [latestCollection, setLatestCollection] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sareesRes, lehengasRes, kurtisRes, latestRes] = await Promise.all([
          fetch('/data/sarees.json'),
          fetch('/data/lehengas.json'),
          fetch('/data/kurtis.json'),
          fetch('/data/latestcollection.json')
        ]);

        if (!sareesRes.ok || !lehengasRes.ok || !kurtisRes.ok || !latestRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [sarees, lehengas, kurtis, latest] = await Promise.all([
          sareesRes.json(),
          lehengasRes.json(),
          kurtisRes.json(),
          latestRes.json()
        ]);

        setSarees(sarees || []);
        setLehengas(lehengas || []);
        setKurtis(kurtis || []);
        setLatestCollection(latest || []);
      } catch (error) {
        console.error('Error loading product data:', error);
        // Set empty arrays as fallback
        setSarees([]);
        setLehengas([]);
        setKurtis([]);
        setLatestCollection([]);
      }
    };

    fetchData();
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Navbar />
        <main>
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
        </main>
        <ScrollToTop />
        <Footer />
      </div>
    </Router>
  );
}

export default App;