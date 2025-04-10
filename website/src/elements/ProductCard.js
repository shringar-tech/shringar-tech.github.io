import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ item, category }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format price with rupee symbol
  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card-inner">
        <div className="product-image-container">
          <img 
            src={item.img} 
            alt={item.name} 
            className="product-image" 
          />
          
          {/* Quick actions overlay */}
          <div className={`product-actions ${isHovered ? 'visible' : ''}`}>
            <Link to={`/${category}/${item.id}`} className="view-details-btn">
              View Details
            </Link>
          </div>
          
          {/* Tags */}
          {item.isNew && <span className="product-tag new-tag">New</span>}
          {item.discount > 0 && 
            <span className="product-tag discount-tag">{item.discount}% OFF</span>
          }
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{item.name}</h3>
          
          <div className="product-price-container">
            {item.originalPrice && item.originalPrice > item.price ? (
              <>
                <span className="product-price">{formatPrice(item.price)}</span>
                <span className="product-original-price">{formatPrice(item.originalPrice)}</span>
              </>
            ) : (
              <span className="product-price">{formatPrice(item.price || 2999)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;