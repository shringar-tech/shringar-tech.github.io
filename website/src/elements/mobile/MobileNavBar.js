import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchModal from '../../components/SearchModal';
import './MobileNavBar.css';

const MobileNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="mobile-navbar">
      <div className="mobile-nav-header">
        <Link to="/" className="mobile-logo">
          <img 
            src="/images/header-website.png" 
            alt="Shringaarika" 
            className="mobile-logo-image"
          />
        </Link>
        <div className="mobile-nav-actions">
          <button className="mobile-search-btn" onClick={() => setSearchOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <Link to="/wishlist" className="mobile-wishlist-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </Link>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/new-arrivals" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
          <Link to="/best-sellers" onClick={() => setIsMenuOpen(false)}>Best Sellers</Link>
          <Link to="/shop-all" onClick={() => setIsMenuOpen(false)}>Shop All</Link>
          <Link to="/sarees" onClick={() => setIsMenuOpen(false)}>Sarees</Link>
          <Link to="/lehengas" onClick={() => setIsMenuOpen(false)}>Lehengas</Link>
          <Link to="/kurtis" onClick={() => setIsMenuOpen(false)}>Kurtis</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
      )}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
};

export default MobileNavBar;