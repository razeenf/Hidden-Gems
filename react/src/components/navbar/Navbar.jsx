import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/user/login');
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 45) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Function to handle window resize event
  const handleResize = () => {
    if (window.innerWidth > 1290) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    // Add a scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Add a resize event listener when the component mounts
    window.addEventListener('resize', handleResize);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
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
        <button className="button" onClick={handleButtonClick}>
          Login
        </button>
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
