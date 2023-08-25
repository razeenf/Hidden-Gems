import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

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
          <li>
            <NavLink to="/" activeClassName="active-link">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" activeClassName="active-link">
              EXPLORE
            </NavLink>
          </li>
          <li>
            <NavLink to="/share" activeClassName="active-link">
              SHARE
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="button">Login</button>
        <div className={`burger-menu ${menuOpen ? 'active' : ''}`} onClick={handleMenuClick}>
          <FontAwesomeIcon icon={faBars} className="burger-icon" />
        </div>
      </div>
      {menuOpen && <BurgerMenu />}
    </nav>
  );
}

function BurgerMenu() {
  return (
    <div className="burger-dropdown">
      <ul className="burger-nav-links">
        <li>
          <NavLink to="/" activeClassName="active-link">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore" activeClassName="active-link">
            EXPLORE
          </NavLink>
        </li>
        <li>
          <NavLink to="/share" activeClassName="active-link">
            SHARE
          </NavLink>
        </li>
        <li className='login-link'>LOGIN</li>
      </ul>
    </div>
  );
}
