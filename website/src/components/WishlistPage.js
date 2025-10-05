import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../elements/ProductCard';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <section className="wishlist-section">
        <div className="wishlist-header">
          <h2>My Wishlist</h2>
          <p>Your wishlist is empty</p>
        </div>
        <div className="empty-wishlist">
          <div className="empty-wishlist-content">
            <span className="material-icons empty-heart">favorite_border</span>
            <h3>No items in your wishlist yet</h3>
            <p>Start adding items you love to see them here</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wishlist-section">
      <div className="wishlist-header">
        <h2>My Wishlist</h2>
        <p>{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
        {wishlist.length > 0 && (
          <button onClick={clearWishlist} className="clear-wishlist-btn">
            Clear All
          </button>
        )}
      </div>
      
      <div className="wishlist-container">
        {wishlist.map(item => (
          <Link 
            to={`/${item.category}/${item.id}`} 
            className="wishlist-item-link" 
            key={`${item.category}-${item.id}`}
          >
            <ProductCard item={item} category={item.category} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default WishlistPage;