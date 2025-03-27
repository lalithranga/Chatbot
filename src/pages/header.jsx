import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-group-left">
          <ul className="nav-links">
            <li><span>Home</span></li>
            <li><span>Services</span></li>
            <li><span>Contact Us</span></li>
          </ul>
        </div>
        <div className="login-container">
          <span className="login-btn">Login</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;