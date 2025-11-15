import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import WhatsAppOrder from './WhatsAppOrder';
import SizeChartModal from './SizeChartModal';
import './ItemDetailPage.css';

const ModernImageGallery = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  if (!images || images.length === 0) return null;
  
  return (
    <div className="modern-gallery">
      <div className="main-image-container">
        <img 
          src={images[currentIndex]} 
          alt={alt}
          className={`main-image ${isZoomed ? 'zoomed' : ''}`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        {images.length > 1 && (
          <div className="image-nav">
            <button 
              className="nav-btn prev" 
              onClick={() => setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
            >
              ‹
            </button>
            <button 
              className="nav-btn next" 
              onClick={() => setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
            >
              ›
            </button>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="thumbnail-strip">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${alt} ${index + 1}`}
              className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SizeSelector = ({ selectedSize, onSizeChange }) => {
  const [showModal, setShowModal] = useState(false);
  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

  return (
    <>
      <div className="size-selector">
        <div className="size-header">
          <span className="size-label">Size</span>
          <button className="size-guide" onClick={() => setShowModal(true)}>
            Size Guide
          </button>
        </div>
        <div className="size-grid">
          {sizes.map(size => (
            <button
              key={size}
              className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
              onClick={() => onSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <SizeChartModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

function ItemDetailPage() {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/data/${category}.json`)
      .then(response => response.json())
      .then(data => {
        const selectedItem = data.find(item => item.id === parseInt(id));
        setItem(selectedItem);
      });
  }, [category, id]);

  if (!item) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const itemInWishlist = isInWishlist(item.id, category);

  const handleWishlistToggle = () => {
    if (itemInWishlist) {
      removeFromWishlist(item.id, category);
    } else {
      addToWishlist({ ...item, category });
    }
  };

  return (
    <div className="modern-item-page">
      <div className="item-container">
        <div className="image-section">
          <ModernImageGallery 
            images={item.images || [item.img]} 
            alt={item.name}
          />
        </div>
        
        <div className="details-section">
          <div className="product-header">
            <span className="category-tag">{category}</span>
            <button 
              className={`wishlist-btn ${itemInWishlist ? 'active' : ''}`}
              onClick={handleWishlistToggle}
            >
              <svg viewBox="0 0 24 24" fill={itemInWishlist ? 'currentColor' : 'none'} stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
          
          <h1 className="product-title">{item.name}</h1>
          <div className="price-display">${item.price}</div>
          


          <SizeSelector 
            selectedSize={selectedSize} 
            onSizeChange={setSelectedSize} 
          />

          <div className="action-buttons">
            <WhatsAppOrder 
              productName={item.name}
              selectedSize={selectedSize}
            />
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>

          <div className="product-details">
            <h3>Product Details</h3>
            <div className="details-list">
              {item.specifications && item.specifications.map((spec, index) => {
                const [label, value] = spec.split(' - ');
                return (
                  <div key={index} className="detail-row">
                    <span className="detail-label">{label}</span>
                    <span className="detail-value">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="size-info">
            <h3>Size Information</h3>
            <div className="size-note">
              <p>Our sizes run true to fit. For the perfect fit, we recommend checking our size guide. All measurements are in inches.</p>
              <p><strong>Available sizes:</strong> XXS to 5XL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;