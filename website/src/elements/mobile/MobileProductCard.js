import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import { FALLBACK_PRICE } from '../../utils/constants';
import { useWishlist } from '../../context/WishlistContext';
import './MobileProductCard.css';

const MobileProductCard = React.memo(({ item, category }) => {
  const formattedPrice = formatPrice(item.price || FALLBACK_PRICE);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(item.id, category);

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
    <div className="mobile-product-card">
      <Link to={`/${category}/${item.id}`} className="mobile-product-link">
        <div className="mobile-product-image">
          <img src={item.img} alt={item.name} loading="lazy" />
          {item.discount > 0 && <span className="mobile-discount">{item.discount}% OFF</span>}
        </div>
        <div className="mobile-product-info">
          <h3 className="mobile-product-name">{item.name}</h3>
          <p className="mobile-product-price">{formattedPrice}</p>
        </div>
      </Link>
      <button 
        className={`mobile-wishlist-heart ${isWishlisted ? 'wishlisted' : ''}`}
        onClick={handleWishlistClick}
      >
        <span className="material-icons">
          {isWishlisted ? 'favorite' : 'favorite_border'}
        </span>
      </button>
    </div>
  );
});

export default MobileProductCard;