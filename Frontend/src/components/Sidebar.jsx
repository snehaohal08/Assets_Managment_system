import React, { useState } from "react";
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

export default function Sidebar({ setActivePage }) {  // 👈 receive prop
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Assets", icon: <FaLaptop /> },
    { name: "Assets Allocation", icon: <FaUsers /> },
    { name: "Assignees", icon: <FaUsers /> },
    { name: "Incident Log", icon: <FaTools /> },
  ];

  const generalItems = [
    { name: "Reports", icon: <FaChartBar /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="sidebar">

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
            onClick={() => {
              setActive(item.name);
              setActivePage(item.name); // 👈 MAIN LINE
            }}
          >
            {item.icon} <span>{item.name}</span>
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
            onClick={() => {
              setActive(item.name);
              setActivePage(item.name); // 👈 optional
            }}
          >
            {item.icon} <span>{item.name}</span>
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
  );
}