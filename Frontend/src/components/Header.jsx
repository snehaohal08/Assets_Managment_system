import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaSearch, FaBell } from "react-icons/fa";
import "./header.css";

export default function Header({
  toggleSidebar,
  search,
  setSearch,
  notifications = []
}) {
  const [show, setShow] = useState(false);
  const boxRef = useRef();

  // 🔥 CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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

      {/* 🔔 NOTIFICATION */}
      <div className="notification-wrapper" ref={boxRef}>

        <FaBell
          className="bell-icon"
          onClick={() => setShow(!show)}
        />

        {/* 🔴 Badge */}
        {notifications.length > 0 && (
          <span className="badge">{notifications.length}</span>
        )}

        {/* Dropdown */}
        {show && (
          <div className="notification-box">

            <h4>Notifications</h4>

            {notifications.length === 0 ? (
              <p className="empty">No notifications</p>
            ) : (
              notifications.slice(0, 5).map((n, i) => (
                <div key={i} className="notification-item">
                  <strong>{n?.title || "New Incident"}</strong>

                  <p>
                    {n?.issueType || "Issue"} (ID: {n?.assetId || "-"}) 
                    {" "}by {n?.employeeName || "User"}
                  </p>

                  <small>{n?.time || ""}</small>
                </div>
              ))
            )}

          </div>
        )}
      </div>

    </div>
  );
}