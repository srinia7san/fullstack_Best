import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>CRAACC</h3>
          <p>Advanced contract analysis and compliance checking for your business needs.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/AboutUs">About Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@craacc.com</p>
          <p>Address: 123 Analysis Avenue, Dubai Main Road</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} CRAACC. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;