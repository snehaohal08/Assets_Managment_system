import React from "react";
import { FaBars, FaSearch, FaBell } from "react-icons/fa";
import "./header.css";

export default function Header({ toggleSidebar }) {
  return (
    <div className="header-wrapper">

      {/* HAMBURGER */}
      <button className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* SEARCH BAR */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search here..."
          className="main-input"
        />
      </div>

      {/* REMINDER */}
      <div className="reminder-card">
        <div className="bell-box">
          <FaBell className="bell-icon" />
        </div>

        <div className="reminder-content">
          <h4>Reminder</h4>
          <p>You have 3 pending tasks today</p>
        </div>
      </div>

    </div>
  );
}