import React, { useState } from 'react';
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
      </div>
      {/* {menuOpen && <BurgerMenu />} */}
    </nav>
  );
}

// function BurgerMenu() {
//   const handleNavLinkClick = () => {
//     closeMenu(); // Close the menu when a NavLink is clicked
//   };

//   return (
//     <div className="burger-dropdown">
//       <ul className="burger-nav-links">
//           <li><NavLink to="/" activeclassname="active-link" onClick={handleNavLinkClick}>HOME</NavLink></li>
//           <li><NavLink to="/explore" activeclassname="active-link" onClick={handleNavLinkClick}>EXPLORE</NavLink></li>
//           <li><NavLink to="/share" activeclassname="active-link" onClick={handleNavLinkClick}>SHARE</NavLink></li>
//         <li className='login-link'>LOGIN</li>
//       </ul>
//     </div>
//   );
// }
