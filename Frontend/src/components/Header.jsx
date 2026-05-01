import React from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import "./header.css";

export default function Header({ toggleSidebar, search, setSearch }) {
  return (
    <div className="header-wrapper">

      {/* HAMBURGER */}
      <button className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* SEARCH */}
      <div className="search-container">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search assets..."
          className="main-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

    </div>
  );
}