import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import { FALLBACK_PRICE } from '../../utils/constants';
import './MobileProductCard.css';

const MobileProductCard = React.memo(({ item, category }) => {
  const formattedPrice = formatPrice(item.price || FALLBACK_PRICE);

  return (
    <Link to={`/${category}/${item.id}`} className="mobile-product-card">
      <div className="mobile-product-image">
        <img src={item.img} alt={item.name} loading="lazy" />
        {item.discount > 0 && <span className="mobile-discount">{item.discount}% OFF</span>}
      </div>
      <div className="mobile-product-info">
        <h3 className="mobile-product-name">{item.name}</h3>
        <p className="mobile-product-price">{formattedPrice}</p>
      </div>
    </Link>
  );
});

export default MobileProductCard;