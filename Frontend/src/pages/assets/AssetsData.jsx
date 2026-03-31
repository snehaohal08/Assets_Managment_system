import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AssetsData.css";
export default function AssetsData() {
  const [assets, setAssets] = useState([]);

useEffect(() => {
  const dummyData = [
    {
      id: 1,
      name: "Laptop",
      description: "Dell Latitude",
      status: "Available",
      assignedTo: "Rahul",
      image: "/images/laptop.png"
    },
    {
      id: 2,
      name: "Mouse",
      description: "Logitech Mouse",
      status: "Assigned",
      assignedTo: "Sneha",
      image: "/images/mouse.png"
    },
    {
      id: 3,
      name: "Keyboard",
      description: "Mechanical Keyboard",
      status: "Available",
      assignedTo: "Mosin",
      image: "/images/keyboard.png"
    }
  ];

  setAssets(dummyData);
}, []);

  return (
    <div className="assets-page">
      <h2 className="page-title">Assets</h2>
      <div className="assets-grid">
        {assets.map(asset => (
          <div key={asset.id} className="asset-card">
            <div className="asset-image">
              <img src={asset.image || "/default.png"} alt={asset.name} />
            </div>
            <h3>{asset.name}</h3>
            <p>{asset.description}</p>
            <p><strong>Status:</strong> {asset.status}</p>
            <p><strong>Assigned To:</strong> {asset.assignedTo || "-"}</p>
            <div className="asset-actions">
              <button>Edit</button>
              <button>Delete</button>
              <button>Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}