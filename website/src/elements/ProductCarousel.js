import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import './ProductCarousel.css';

const ProductCarousel = ({ items, category, title }) => {
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const isLatestCollection = title === "Our Latest Collections";
  
  const checkArrowVisibility = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 5); // Small threshold to account for browser differences
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // Small threshold for end detection
    }
  };

  useEffect(() => {
    // Initial check after items are loaded and rendered
    setTimeout(checkArrowVisibility, 100);
    
    // Show right arrow by default if items are likely to overflow
    if (items && items.length > 3) {
      setShowRightArrow(true);
    }
    
    window.addEventListener('resize', checkArrowVisibility);
    return () => window.removeEventListener('resize', checkArrowVisibility);
  }, [items]);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    
    try {
      const clientWidth = carouselRef.current.clientWidth;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      // Check arrow visibility after scrolling
      setTimeout(checkArrowVisibility, 100);
      setTimeout(checkArrowVisibility, 400);
      setTimeout(checkArrowVisibility, 700);
    } catch (error) {
      console.error('Error during carousel scroll:', error);
    }
  };

  // Touch/Mouse drag handling
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    try {
      setIsDragging(true);
      setStartX(e.pageX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
    } catch (error) {
      console.error('Error in mouse down handler:', error);
    }
  };

  const handleTouchStart = (e) => {
    if (!carouselRef.current || !e.touches[0]) return;
    try {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
    } catch (error) {
      console.error('Error in touch start handler:', error);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    try {
      e.preventDefault();
      const x = e.pageX - carouselRef.current.offsetLeft;
      const distance = x - startX;
      carouselRef.current.scrollLeft = scrollLeft - distance;
    } catch (error) {
      console.error('Error in mouse move handler:', error);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !carouselRef.current || !e.touches[0]) return;
    try {
      const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
      const distance = x - startX;
      carouselRef.current.scrollLeft = scrollLeft - distance;
    } catch (error) {
      console.error('Error in touch move handler:', error);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setTimeout(checkArrowVisibility, 100);
  };

  return (
    <section className={`category-section ${isLatestCollection ? 'latest-collection' : ''}`}>
      <h2>{title}</h2>
      <div className="carousel-container">
        {showLeftArrow && (
          <button 
            className="carousel-arrow arrow-left" 
            onClick={() => scroll('left')}
            aria-label="Previous items"
          >
            <span>&#10094;</span>
          </button>
        )}
        <div 
          className="carousel-items" 
          ref={carouselRef}
          onScroll={checkArrowVisibility}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          {items.map(item => (
            <div className="carousel-item" key={item.id}>
              <Link to={`/${category}/${item.id}`} className="category-link">
                <ProductCard item={item} category={category} />
              </Link>
            </div>
          ))}
        </div>
        {showRightArrow && (
          <button 
            className="carousel-arrow arrow-right" 
            onClick={() => scroll('right')}
            aria-label="Next items"
          >
            <span>&#10095;</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductCarousel;
