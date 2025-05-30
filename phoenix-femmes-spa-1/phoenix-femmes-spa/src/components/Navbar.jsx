import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2 className="logo">Phoenix Femmes</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>

        <li
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span className="dropdown-toggle">Programs ▾</span>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/entrepreneurship">Entrepreneurship</Link></li>
              <li><Link to="/meditation">Meditation</Link></li>
              <li><Link to="/soft-skills">Soft Skills</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/join">Join Us</Link></li>

      </ul>
    </nav>
  );
}

export default Navbar;
