import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1290) { // Adjust the threshold as needed
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <a className="site-name" href="/">
          Hidden Gems
        </a>
      </div>
      <div className="navbar-middle">
        <ul className="nav-links">
          <li><NavLink to="/" activeclassname="active-link">HOME</NavLink></li>
          <li><NavLink to="/explore" activeclassname="active-link">EXPLORE</NavLink></li>
          <li><NavLink to="/share" activeclassname="active-link">SHARE</NavLink></li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="button">Login</button>
        <div className={`burger-menu ${menuOpen ? 'active' : ''}`} onClick={handleMenuClick}>
          <FontAwesomeIcon icon={faBars} className="burger-icon" />
        </div>
        {menuOpen && <BurgerMenu />}
      </div>
    </nav>
  );
}

function BurgerMenu() {
  const handleNavLinkClick = () => {
    closeMenu();
  };

  return (
    <div className="burger-dropdown">
      <ul className="burger-nav-links">
          <li><NavLink to="/" activeclassname="active-link" onClick={handleNavLinkClick}>HOME</NavLink></li>
          <li><NavLink to="/explore" activeclassname="active-link" onClick={handleNavLinkClick}>EXPLORE</NavLink></li>
          <li><NavLink to="/share" activeclassname="active-link" onClick={handleNavLinkClick}>SHARE</NavLink></li>
        <li className='login-link'>LOGIN</li>
      </ul>
    </div>
  );
}
