import React from 'react';
import MobileProductCard from './MobileProductCard';
import './MobileCarousel.css';

const MobileCarousel = React.memo(({ items, category, title }) => {
  return (
    <section className="mobile-carousel-section">
      <h2 className="mobile-carousel-title">{title}</h2>
      <div className="mobile-carousel-container">
        <div className="mobile-carousel-items">
          {items.map((item) => (
            <MobileProductCard key={item.id} item={item} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default MobileCarousel;