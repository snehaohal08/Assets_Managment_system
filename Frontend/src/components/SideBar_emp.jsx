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

export default function SideBar_emp({ setActivePage, isOpen, toggleSidebar }) {
  const [active, setActive] = useState("Dashboard");

  console.log('Sidebar rendered, isOpen:', isOpen);

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

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

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
              onClick={() => {
                setActive(item.name);
                setActivePage(item.name);
                toggleSidebar();
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
                setActivePage(item.name);
                toggleSidebar();
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
    </>
  );
}