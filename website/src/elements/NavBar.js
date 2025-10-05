import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { debounce } from '../utils/helpers';
import { NAVBAR_SCROLL_THRESHOLD, DEBOUNCE_DELAYS, ROUTES } from '../utils/constants';
import './NavBar.css';

const Navbar = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
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

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-container">
        <Link to={ROUTES.HOME} className="navbar-logo">
          <span className="logo-text">Shringaarika</span>
        </Link>
        
        <div className={`navbar-menu-icon ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to={ROUTES.HOME} className={`navbar-link ${location.pathname === ROUTES.HOME ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to={ROUTES.SAREES} className={`navbar-link ${location.pathname.includes(ROUTES.SAREES) ? 'active' : ''}`}>
              Sarees
            </Link>
          </li>
          <li className="navbar-item">
            <Link to={ROUTES.LEHENGAS} className={`navbar-link ${location.pathname.includes(ROUTES.LEHENGAS) ? 'active' : ''}`}>
              Lehengas
            </Link>
          </li>
          <li className="navbar-item">
            <Link to={ROUTES.KURTIS} className={`navbar-link ${location.pathname.includes(ROUTES.KURTIS) ? 'active' : ''}`}>
              Kurtis
            </Link>
          </li>
          <li className="navbar-item">
            <Link to={ROUTES.CONTACT} className={`navbar-link ${location.pathname === ROUTES.CONTACT ? 'active' : ''}`}>
              Contact
            </Link>
          </li>
        </ul>
        </div>
      </nav>
    </>
  );
});

export default Navbar;