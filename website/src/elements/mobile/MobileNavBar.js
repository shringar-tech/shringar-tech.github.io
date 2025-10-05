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
        <Link to="/" className="mobile-logo">Shringaarika</Link>
        <div className="mobile-nav-actions">
          <button className="mobile-search-btn" onClick={() => setSearchOpen(true)}>
            <span className="material-icons">search</span>
          </button>
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