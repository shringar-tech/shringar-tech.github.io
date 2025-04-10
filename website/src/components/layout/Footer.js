import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a href="https://instagram.com/shringaarika" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="material-icons">photo_camera</i>
            <span>Instagram</span>
          </a>
          <a href="https://facebook.com/shringaarika" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="material-icons">facebook</i>
            <span>Facebook</span>
          </a>
          <a href="https://twitter.com/shringaarika" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="material-icons">share</i>
            <span>Twitter</span>
          </a>
          <a href="https://pinterest.com/shringaarika" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="material-icons">push_pin</i>
            <span>Pinterest</span>
          </a>
        </div>
        <p className="copyright">&copy; 2025 Shringarika by Shalini Jha. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
