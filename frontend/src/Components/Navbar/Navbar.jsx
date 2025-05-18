import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import {
  FiHome,
  FiShoppingBag,
  FiImage,
  FiGrid,
  FiSettings,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import logo from "../Assets/logo.png";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Main navigation items
  const navItems = [
    { name: "Home", icon: <FiHome size={20} />, path: "/home" },
    {
      name: "Products",
      icon: <FiShoppingBag size={20} />,
      path: "/home/products",
    },
    { name: "Gallery", icon: <FiImage size={20} />, path: "/home/gallery" },
    { name: "Dashboard", icon: <FiGrid size={20} />, path: "/home/dashboard" },
  ];

  // Footer navigation items
  const footerItems = [
    {
      name: "Settings",
      icon: <FiSettings size={20} />,
      path: "/home/settings",
    },
    { name: "Profile", icon: <FiUser size={20} />, path: "/home/profile" },
    { name: "Logout", icon: <FiLogOut size={20} />, path: "/home/logout" },
  ];

  return (
    <div className="nav-container">
      <nav
        className={`nav-sidebar ${isExpanded ? "expanded" : ""}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="nav-sidebar-left">
          <div className="nav-logo">
            <img src={logo} alt="Logo" />
          </div>

          <div className="nav-main">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="nav-btn"
                activeClassName="active"
                exact
              >
                {item.icon}
                {isExpanded && (
                  <span className="nav-btn-text">{item.name}</span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="nav-footer">
            {footerItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="nav-btn"
                activeClassName="active"
              >
                {item.icon}
                {isExpanded && (
                  <span className="nav-btn-text">{item.name}</span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
