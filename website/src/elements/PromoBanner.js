import React, { useState, useEffect } from 'react';
import './PromoBanner.css';

const PromoBanner = () => {
  const messages = [
    "🚚 Free Shipping All Over India on Orders Above ₹999",
    "🎉 Diwali Sale - Up to 50% Off! Ends 30th November",
    "✨ New Collection Launch - Exclusive Designs Available Now"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="promo-banner" role="banner" aria-live="polite">
      <div className="promo-content">
        <span className="promo-text">{messages[currentIndex]}</span>
      </div>
    </div>
  );
};

export default PromoBanner;