import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { debounce } from '../utils/helpers';
import { CAROUSEL_SCROLL_MULTIPLIER, ARROW_VISIBILITY_THRESHOLD, DEBOUNCE_DELAYS } from '../utils/constants';
import './ProductCarousel.css';

const ProductCarousel = React.memo(({ items, category, title }) => {
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const isLatestCollection = title === "Our Latest Collections";
  
  const checkArrowVisibility = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > ARROW_VISIBILITY_THRESHOLD);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - ARROW_VISIBILITY_THRESHOLD);
    }
  }, []);

  const debouncedCheckArrows = useMemo(
    () => debounce(checkArrowVisibility, DEBOUNCE_DELAYS.CAROUSEL_ARROW_CHECK),
    [checkArrowVisibility]
  );

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

  const scroll = useCallback((direction) => {
    if (!carouselRef.current) return;
    
    try {
      const clientWidth = carouselRef.current.clientWidth;
      const scrollAmount = direction === 'left' ? -clientWidth * CAROUSEL_SCROLL_MULTIPLIER : clientWidth * CAROUSEL_SCROLL_MULTIPLIER;
      
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      setTimeout(checkArrowVisibility, 300);
    } catch (error) {
      console.error('Error during carousel scroll:', error);
    }
  }, [checkArrowVisibility]);

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
    <section 
      className={`category-section ${isLatestCollection ? 'latest-collection' : ''}`}
      aria-labelledby={`carousel-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <h2 id={`carousel-${title.replace(/\s+/g, '-').toLowerCase()}`}>{title}</h2>
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
          role="region"
          aria-label={`${title} product carousel`}
          tabIndex="0"
          onScroll={debouncedCheckArrows}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          {items.map((item, index) => (
            <div 
              className="carousel-item" 
              key={item.id}
              role="group"
              aria-label={`${index + 1} of ${items.length}`}
            >
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
});

export default ProductCarousel;
