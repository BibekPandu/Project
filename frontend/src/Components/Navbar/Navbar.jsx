import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import {
  FiHome,
  FiGrid,
  FiSettings,
  FiUser,
  FiLogOut,
  FiTruck,
  FiUsers,
  FiClipboard,
} from "react-icons/fi";
import logo from "../Assets/logo.png";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Role-based navigation items
  const getNavItems = () => {
    const commonItems = [
      {
        name: "Dashboard",
        icon: <FiGrid size={20} />,
        path: `/${userRole}-dashboard`,
      },
    ];

    const roleSpecificItems = {
      admin: [
        {
          name: "Vehicle Register",
          icon: <FiTruck size={20} />,
          path: "/vehicleregister",
        },
        {
          name: "User Management",
          icon: <FiUsers size={20} />,
          path: "/user-management",
        },
        { name: "Reports", icon: <FiClipboard size={20} />, path: "/reports" },
      ],
      manager: [
        {
          name: "Vehicle Register",
          icon: <FiTruck size={20} />,
          path: "/vehicleregister",
        },
        { name: "Reports", icon: <FiClipboard size={20} />, path: "/reports" },
      ],
      driver: [
        {
          name: "My Vehicles",
          icon: <FiTruck size={20} />,
          path: "/my-vehicles",
        },
        {
          name: "My Schedule",
          icon: <FiClipboard size={20} />,
          path: "/my-schedule",
        },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[userRole] || [])];
  };

  // Footer navigation items
  const footerItems = [
    {
      name: "Settings",
      icon: <FiSettings size={20} />,
      path: "/settings",
    },
    { name: "Profile", icon: <FiUser size={20} />, path: "/profile" },
    {
      name: "Logout",
      icon: <FiLogOut size={20} />,
      path: "/logout",
      onClick: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");
        navigate("/login");
      },
    },
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
            {isExpanded && <span className="role-badge">{userRole}</span>}
          </div>

          <div className="nav-main">
            {getNavItems().map((item, index) => (
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
                onClick={item.onClick}
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
