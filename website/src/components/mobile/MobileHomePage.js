import React from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../elements/ProductCard';
import './MobileHomePage.css';

const MobileHomePage = () => {
  const { state } = useProducts();
  const { latestCollection, loading } = state;

  if (loading) {
    return <div className="mobile-loading">Loading...</div>;
  }

  return (
    <div className="mobile-home">
      <div className="mobile-hero">
        <img src="/images/hero_image.png" alt="Shringaarika Collection" className="mobile-hero-image" />
        <div className="mobile-hero-overlay">
          <h1>Shringaarika</h1>
          <p>Premium Indian Ethnic Wear</p>
        </div>
      </div>
      
      <div className="mobile-products">
        <h2>Our Collection</h2>
        <div className="mobile-grid">
          {latestCollection.map((item) => (
            <ProductCard 
              key={`${item.category}-${item.id}`} 
              item={item} 
              category={item.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileHomePage;