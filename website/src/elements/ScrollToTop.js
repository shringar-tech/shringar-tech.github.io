import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from '../utils/helpers';
import { SCROLL_THRESHOLD, DEBOUNCE_DELAYS } from '../utils/constants';
import './ScrollToTop.css';

const ScrollToTop = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled down enough
  const toggleVisibility = useCallback(() => {
    setIsVisible(window.pageYOffset > SCROLL_THRESHOLD);
  }, []);

  const debouncedToggleVisibility = useMemo(
    () => debounce(toggleVisibility, DEBOUNCE_DELAYS.SCROLL),
    [toggleVisibility]
  );

  useEffect(() => {
    window.addEventListener('scroll', debouncedToggleVisibility);
    return () => window.removeEventListener('scroll', debouncedToggleVisibility);
  }, [debouncedToggleVisibility]);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <>
      {isVisible && (
        <button 
          onClick={scrollToTop} 
          className="scroll-to-top"
          aria-label="Scroll to top"
        >
          <span className="arrow-up">↑</span>
        </button>
      )}
    </>
  );
});

export default ScrollToTop;