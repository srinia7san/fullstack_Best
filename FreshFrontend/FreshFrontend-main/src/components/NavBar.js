import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="contract-icon"
          >
            <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="9" y1="12" x2="15" y2="12" />
            <line x1="9" y1="16" x2="13" y2="16" />
          </svg>
          <span className="prName">CRAACC</span>
        </Link>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/about-us" className="nav-link">About Us</Link>
        <Link to="/privacy-policy" className="nav-link">Privacy Policy</Link>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <button className="logout-btn btn" onClick={onLogout}>Log Out</button>
        ) : (
          <Link to="/signin" className="sign-in-btn btn">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;