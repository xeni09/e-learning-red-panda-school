import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/logo.svg";
import userIcon from "../assets/user-icon.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Contact", href: "/contact" },
];

const NavBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [navbarFixed, setNavbarFixed] = useState(false);
  const [navbarTransparent, setNavbarTransparent] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbarFixed(true);
        setNavbarTransparent(true); // add transparency on scroll
      } else {
        setNavbarFixed(false);
        setNavbarTransparent(false); // remove transparency at the top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLinkClick = () => {
    setDropdownVisible(false);
  };

  return (
    <nav className={`navbar ${navbarFixed ? "navbar-fixed" : ""} ${navbarTransparent ? "navbar-transparent" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand-link">
          <div className="navbar-brand-container">
            <img src={logo} alt="logo" className="navbar-logo" />
            <div className="navbar-brand">
              Red
              <br />
              Panda
              <br />
              School
            </div>
          </div>
        </Link>
        
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.name} className="navbar-link">
              <Link
                to={item.href}
                className={location.pathname === item.href ? "active" : ""}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-login-container" ref={dropdownRef}>
          <button className="navbar-login-icon" onClick={toggleDropdown}>
            <img src={userIcon} alt="User Icon" className="user-icon" />
          </button>
          {dropdownVisible && (
            <div className="navbar-login-dropdown">
              <Link to="/login" onClick={handleLinkClick}>Log In</Link>
              <Link to="/signup" onClick={handleLinkClick}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;