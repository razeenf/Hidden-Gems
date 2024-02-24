import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://www.linkedin.com/in/razeenf/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="icon" />
        </a>
        <a href="https://github.com/razeenf" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} className="icon" />
        </a>
      </div>
      <p className="copyright">© 2024 Razeen Faruque</p>
    </footer>
  );
}