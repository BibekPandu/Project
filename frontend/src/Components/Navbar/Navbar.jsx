// Navbar.jsx
import React, { useState } from "react";
import "./Navbar.css";
import { FiChevronDown } from "react-icons/fi";
import logo from "../Assets/logo.png";
import { sidebarNavigation } from "../../Data/Data"; // <-- Update the path based on your folder structure

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { primary, secondary, footer } = sidebarNavigation;

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
            {primary.map((item, index) => (
              <button key={index} className="nav-btn">
                {item.icon}
                {isExpanded && (
                  <span className="nav-btn-text">{item.name}</span>
                )}
              </button>
            ))}
          </div>

          <div className="nav-footer">
            {footer.map((item, index) => (
              <button key={index} className="nav-btn">
                {item.icon}
                {isExpanded && (
                  <span className="nav-btn-text">{item.name}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="nav-sidebar-right">
          <div className="nav-content">
            <header className="nav-header">
              <div>
                <h2 className="nav-title">Untitled UI</h2>
                <h3 className="nav-subtitle">store.untitledui.com</h3>
              </div>
              <FiChevronDown className="nav-chevron" />
            </header>
            <div className="nav-menu">
              {secondary.map((item, index) => (
                <button key={index} className="nav-menu-btn">
                  {item.icon}
                  <span className="nav-menu-text">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
