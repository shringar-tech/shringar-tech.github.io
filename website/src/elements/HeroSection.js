import React, { useState, useEffect } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [offset, setOffset] = useState(0);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section 
      className="hero-section-full"
      style={{ backgroundPositionY: `${offset * 0.5}px` }}
    >
      {/* Pure image hero section - no text */}
    </section>
  );
};

export default HeroSection;