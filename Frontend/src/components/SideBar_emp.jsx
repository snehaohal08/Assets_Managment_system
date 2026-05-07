import React, { useState, useEffect } from "react";
import logo from "../assets/Images/icons/logo.png";

import {
  FaTachometerAlt,
  FaLaptop,
  FaTools,
  FaPlusCircle,
  FaClipboardList,
  FaBell,
  FaSignOutAlt
} from "react-icons/fa";

import "./sidebar.css";

export default function SideBar_emp({
  setActivePage,
  isOpen,
  toggleSidebar
}) {

  const [active, setActive] = useState("Dashboard");

  // ✅ GET LOGIN USER
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ EMPLOYEE NAME
  const employeeName = user?.name || "Employee";

  // ✅ EMPLOYEE MENU
  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "My Assets", icon: <FaLaptop /> },
    { name: "My Incidents", icon: <FaTools /> },
    { name: "Raise Incident", icon: <FaPlusCircle /> },
    { name: "Requests", icon: <FaClipboardList /> },
    { name: "Notifications", icon: <FaBell /> },
    { name: "Logout", icon: <FaSignOutAlt /> },
  ];

  // ✅ LOCK BODY SCROLL
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [isOpen]);

  // ✅ HANDLE MENU
  const handleClick = (name) => {

    // ✅ LOGOUT
    if (name === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/";
      return;
    }

    setActive(name);
    setActivePage(name);

    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="overlay"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* SIDEBAR */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>

        {/* LOGO */}
        <div className="sidebar-logo">

          <div className="logo-circle">
            <img src={logo} alt="Logo" />
          </div>

          <h3 className="logo-text">
            AssetGuard
          </h3>

        </div>

        {/* MENU */}
        <div className="sidebar-section">

          {menuItems.map((item) => (

            <div
              key={item.name}
              className={`menu-item ${
                active === item.name ? "active" : ""
              }`}
              onClick={() => handleClick(item.name)}
            >

              {item.icon}

              <span>{item.name}</span>

            </div>
          ))}

        </div>

        {/* PROFILE */}
        <div className="sidebar-profile">

          <div className="profile-avatar">
            {employeeName.charAt(0).toUpperCase()}
          </div>

          <div className="profile-text">
            <span>Hello 👋</span>

            <strong>
              {employeeName}
            </strong>
          </div>

        </div>

      </div>
    </>
  );
}