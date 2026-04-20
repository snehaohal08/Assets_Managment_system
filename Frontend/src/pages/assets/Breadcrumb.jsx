// src/components/Breadcrumb.jsx
import React from "react";
import "./AssetsData.css"; // Reuse the same CSS for simplicity

export default function Breadcrumb({ activePage, setActivePage }) {
  return (
    <div className="breadcrumb">
      <span
        className={activePage === "Assets" ? "active" : ""}
        onClick={() => setActivePage("Assets")}
      >
        {/* Assets */}
      </span>

      {activePage === "Assets Allocation" && "  "}

      {activePage === "Assets Allocation" && (
        <span
          className={activePage === "Assets Allocation" ? "active" : ""}
          onClick={() => setActivePage("Assets Allocation")}
        >
        </span>
      )}
    </div>
  );
}