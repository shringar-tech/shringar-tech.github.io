import React from 'react';
import { handleImageError } from '../utils/helpers';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <div className="header-content">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Let's create something beautiful together.</p>
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-card info-section">
          <h2>Contact Information</h2>
          <div className="contact-details">
            <div className="contact-item">
              <i className="material-icons">email</i>
              <div>
                <h3>Email</h3>
                <p>contact@shringar-tech.com</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="material-icons">phone</i>
              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="material-icons">location_on</i>
              <div>
                <h3>Address</h3>
                <p>123 Tech Street, Innovation City, CA 94016</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-card image-section">
          <div className="contact-image">
            <img 
              src="/images/saree/img_6.png" 
              alt="Shringar Office" 
              loading="lazy"
              onError={handleImageError()}
            />
          </div>
        </div>
      </div>

      <div className="terms-content">
        <div>
          <h3>1. Response Time</h3>
          <p>We aim to respond to all inquiries within 24 business hours. For urgent matters, please contact us by phone.</p>
        </div>
        
        <div>
          <h3>2. Privacy Policy</h3>
          <p>Your personal information is protected under our strict privacy policy. We never share or sell your data to third parties.</p>
        </div>
        
        <div>
          <h3>3. Business Hours</h3>
          <p>Our customer service team is available Monday through Friday, 9:00 AM to 6:00 PM EST. Weekend responses may be delayed.</p>
        </div>
        
        <div>
          <h3>4. Communication Guidelines</h3>
          <p>All communications should be professional and respectful. We reserve the right to cease communication in cases of harassment or abuse.</p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;