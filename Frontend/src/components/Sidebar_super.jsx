import React, { useState, useEffect } from "react";
import logo from "../assets/Images/icons/logo.png";
import {
  FaTachometerAlt,
  FaLaptop,
  FaUsers,
  FaTools,
  FaChartBar,
  FaCog
} from "react-icons/fa";

import "./sidebar.css";

export default function Sidebar_super({ setActivePage, isOpen, toggleSidebar }) {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Assets", icon: <FaLaptop /> },
    { name: "Employee List", icon: <FaUsers /> },
    { name: "Incident Log", icon: <FaTools /> },
  ];

  const generalItems = [
    { name: "Reports", icon: <FaChartBar /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  // 🔥 lock scroll when sidebar open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [isOpen]);

  const handleClick = (name) => {
    setActive(name);
    setActivePage(name);

    // close only on mobile
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* OVERLAY */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* SIDEBAR */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>

        {/* LOGO */}
        <div className="sidebar-logo">
          <div className="logo-circle">
            <img src={logo} alt="Logo" />
          </div>
        </div>

        {/* MENU */}
        <div className="sidebar-section">
          <p className="section-title">Menu</p>

          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`menu-item ${active === item.name ? "active" : ""}`}
              onClick={() => handleClick(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* GENERAL */}
        <div className="sidebar-section">
          <p className="section-title">General</p>

          {generalItems.map((item) => (
            <div
              key={item.name}
              className={`menu-item ${active === item.name ? "active" : ""}`}
              onClick={() => handleClick(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* PROFILE */}
        <div className="sidebar-profile">
          <div className="profile-avatar">S</div>
          <div className="profile-text">
            <span>Hello 👋</span>
            <strong>Sneha</strong>
          </div>
        </div>

      </div>
    </>
  );
}