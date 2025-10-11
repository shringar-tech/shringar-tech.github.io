import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, handleImageError } from '../utils/helpers';
import { FALLBACK_PRICE } from '../utils/constants';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

const ProductCard = React.memo(({ item, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(item.id, category);

  // Memoize price formatting
  const formattedPrice = useMemo(() => formatPrice(item.price || FALLBACK_PRICE), [item.price]);
  const formattedOriginalPrice = useMemo(() => 
    item.originalPrice ? formatPrice(item.originalPrice) : null, 
    [item.originalPrice]
  );

  const onImageError = useCallback(handleImageError(), []);

  const handleWishlistClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(item.id, category);
    } else {
      addToWishlist({ ...item, category });
    }
  }, [isWishlisted, item, category, addToWishlist, removeFromWishlist]);

  return (
    <article 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="group"
      aria-label={`Product: ${item.name}, Price: ${formattedPrice}`}
    >
      <div className="product-card-inner">
        <div className="product-image-container">
          <img 
            src={item.img} 
            alt={item.name} 
            className="product-image"
            loading="lazy"
            onError={onImageError}
          />
          
          {/* Quick actions overlay */}
          <div className={`product-actions ${isHovered ? 'visible' : ''}`}>
            <Link 
              to={`/${item.category || category}/${item.id}`} 
              className="view-details-btn"
              aria-label={`View details for ${item.name}`}
            >
              View Details
            </Link>
          </div>
          
          {/* Wishlist Heart */}
          <button 
            className={`wishlist-heart ${isWishlisted ? 'wishlisted' : ''}`}
            onClick={handleWishlistClick}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <span className="material-icons">
              {isWishlisted ? 'favorite' : 'favorite_border'}
            </span>
          </button>
          
          {/* Tags */}
          {item.isNew && <span className="product-tag new-tag">New</span>}
          {item.discount > 0 && 
            <span className="product-tag discount-tag">{item.discount}% OFF</span>
          }
        </div>
        
        <div className="product-info">
          <h3 className="product-name" id={`product-${item.id}-name`}>{item.name}</h3>
          
          <div className="product-price-container">
            {formattedOriginalPrice && item.originalPrice > item.price ? (
              <>
                <span className="product-price">{formattedPrice}</span>
                <span className="product-original-price">{formattedOriginalPrice}</span>
              </>
            ) : (
              <span className="product-price">{formattedPrice}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
});

export default ProductCard;