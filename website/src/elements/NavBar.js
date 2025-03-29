import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Shringaarika</span>
        </Link>
        
        <div className={`navbar-menu-icon ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/sarees" className={`navbar-link ${location.pathname.includes('/sarees') ? 'active' : ''}`}>
              Sarees
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/lehengas" className={`navbar-link ${location.pathname.includes('/lehengas') ? 'active' : ''}`}>
              Lehengas
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/kurtis" className={`navbar-link ${location.pathname.includes('/kurtis') ? 'active' : ''}`}>
              Kurtis
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;