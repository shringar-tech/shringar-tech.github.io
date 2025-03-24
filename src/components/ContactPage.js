import React from 'react';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <h2>Contact Information</h2>
      <p>Feel free to reach out to us through the following contact details:</p>
      <div className="contact-details">
        <p><strong>Email:</strong> contact@shringar-tech.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Address:</strong> 123 Tech Street, Innovation City, CA 94016</p>
        <p><strong>Terms & Conditions:</strong> All communications are subject to our terms and conditions. Please review them carefully before reaching out.</p>
      </div>
    </div>
  );
}

export default ContactPage;