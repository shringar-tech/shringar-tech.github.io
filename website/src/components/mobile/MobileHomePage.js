import React from 'react';
import { useProducts } from '../../context/ProductContext';
import MobileCarousel from '../../elements/mobile/MobileCarousel';
import './MobileHomePage.css';

const MobileHomePage = () => {
  const { state } = useProducts();
  const { sarees, lehengas, kurtis, latestCollection } = state;

  return (
    <div className="mobile-home">
      <div className="mobile-hero">
        <img src="/images/hero_image.png" alt="Shringaarika Collection" className="mobile-hero-image" />
        <div className="mobile-hero-overlay">
          <h1>Shringaarika</h1>
          <p>Premium Indian Ethnic Wear</p>
        </div>
      </div>
      
      <MobileCarousel items={latestCollection} category="lehengas" title="New Collection" />
      <MobileCarousel items={sarees} category="sarees" title="Sarees" />
      <MobileCarousel items={lehengas} category="lehengas" title="Lehengas" />
      <MobileCarousel items={kurtis} category="kurtis" title="Kurtis" />
    </div>
  );
};

export default MobileHomePage;