import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../context/AuthContext';

import logo from '../assets/logo.jpg';





function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

 

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
  <div className="logo-container">
    <img src={logo} alt="Valkyrrie Meds Logo" className="logo-image" />
    <span className="logo-text">Valkyrrie Meds</span>
   <div className="top-right-container">

    {/* Hamburger for mobile menu */}
    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>

    {/* ✅ Show Profile Circle OUTSIDE the UL */}
    {user && (
      <div className="profile-dropdown">
        <div 
          className="profile-circle"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          {user.email.charAt(0).toUpperCase()}
        </div>

        {profileOpen && (
          <ul className="profile-dropdown-menu">
            <li onClick={handleLogout}>Logout</li>
          </ul>
        )}
      </div>
    )}
  </div>
  </div>

  {/* Navigation links */}
  <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
    <li onClick={() => setMenuOpen(false)}><Link to="/">Home</Link></li>
    <li onClick={() => setMenuOpen(false)}><Link to="/about">About Us</Link></li>
    <li className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
      <span className="dropdown-toggle">Programs ▾</span>
      {dropdownOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => setMenuOpen(false)}><Link to="/entrepreneurship">Entrepreneurship</Link></li>
          <li onClick={() => setMenuOpen(false)}><Link to="/meditation">Meditation</Link></li>
          <li onClick={() => setMenuOpen(false)}><Link to="/soft-skills">Soft Skills</Link></li>
        </ul>
      )}
    </li>
    <li onClick={() => setMenuOpen(false)}><Link to="/gallery">Gallery</Link></li>
    <li onClick={() => setMenuOpen(false)}><Link to="/contact">Contact Us</Link></li>
    <li onClick={() => setMenuOpen(false)}><Link to="/join">Join Us</Link></li>
    {!user && (
  <>
    <li onClick={() => setMenuOpen(false)}><Link to="/register">Register</Link></li>
    <li onClick={() => setMenuOpen(false)}><Link to="/login">Login</Link></li>
  </>
)}

  </ul>
</nav>

  );
}

export default Navbar;
