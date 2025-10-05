import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { debounce } from '../utils/helpers';
import { NAVBAR_SCROLL_THRESHOLD, DEBOUNCE_DELAYS, ROUTES } from '../utils/constants';
import SearchModal from '../components/SearchModal';
import './NavBar.css';

const Navbar = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Handle scroll effects with debouncing
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > NAVBAR_SCROLL_THRESHOLD);
  }, []);

  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, DEBOUNCE_DELAYS.NAVBAR_SCROLL),
    [handleScroll]
  );

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [debouncedHandleScroll]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchOpen(prev => !prev);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${!isHomePage ? 'navbar-other-pages' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-container">
          <div className="navbar-left">
            <ul className="navbar-menu-left">
              <li className="navbar-item">
                <Link to="/new-arrivals" className={`navbar-link ${location.pathname.includes('/new-arrivals') ? 'active' : ''}`}>
                  New Arrivals
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/best-sellers" className={`navbar-link ${location.pathname.includes('/best-sellers') ? 'active' : ''}`}>
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="navbar-center">
            <Link to={ROUTES.HOME} className="navbar-logo">
              <span className="logo-text">Shringaarika</span>
            </Link>
          </div>
          
          <div className="navbar-right">
            <ul className="navbar-menu-right">
              <li className="navbar-item">
                <Link to="/shop-all" className={`navbar-link ${location.pathname.includes('/shop-all') ? 'active' : ''}`}>
                  Shop All
                </Link>
              </li>
              <li className="navbar-item">
                <Link to={ROUTES.CONTACT} className={`navbar-link ${location.pathname === ROUTES.CONTACT ? 'active' : ''}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <button className="search-icon desktop-search-icon" onClick={toggleSearch} aria-label="Search products">
            <span className="material-icons">search</span>
          </button>
          
          <div className={`navbar-menu-icon ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
});

export default Navbar;