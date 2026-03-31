import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import "./header.css";

export default function Header() {
  return (
    <div className="header-wrapper">

      {/* SEARCH BAR */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          className="main-input"
        />
      </div>

      {/* REMINDER CARD */}
      <div className="reminder-card">
        <div className="bell-box">
          <FaBell className="bell-icon" />
        </div>

        <div className="reminder-content">
          <h4>Incident Handling Reminder</h4>
          <p>
            Incident requests are received via email. Please ensure every
            vendor handover is logged here for tracking and follow-up.
          </p>
        </div>
      </div>

    </div>
  );
}