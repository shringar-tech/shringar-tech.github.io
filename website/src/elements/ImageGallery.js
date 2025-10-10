import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images, alt, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!images || images.length === 0) return null;
  
  const isSingleImage = images.length === 1;
  
  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };
  
  const goToNext = () => {
    setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };
  
  return (
    <div className={`image-gallery ${className}`}>
      <div className="gallery-main-image">
        <img src={images[currentIndex]} alt={alt} />
        {!isSingleImage && (
          <>
            <button className="gallery-nav prev" onClick={goToPrevious}>‹</button>
            <button className="gallery-nav next" onClick={goToNext}>›</button>
          </>
        )}
      </div>
      {!isSingleImage && (
        <div className="gallery-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`gallery-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;