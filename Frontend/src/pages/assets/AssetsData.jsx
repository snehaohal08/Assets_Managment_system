import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetsAllocationForm from "./AssetsForm";
import "./AssetsData.css";

export default function AssetsData() {
  const [assets, setAssets] = useState([]);
  const [activeTab, setActiveTab] = useState("Assets"); // ✅ Local tab state

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assets")
      .then((res) => setAssets(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔥 GROUP + COUNT LOGIC
  const groupedAssets = {};
  assets.forEach((asset) => {
    if (!groupedAssets[asset.name]) {
      groupedAssets[asset.name] = { ...asset, count: 1 };
    } else {
      groupedAssets[asset.name].count += 1;
    }
  });
  const uniqueAssets = Object.values(groupedAssets);

  return (
    <div className="assets-page">
      {/* 🔹 Mini Tabs */}
      <div className="assets-tabs">
        <button
          className={activeTab === "Assets" ? "active-tab" : ""}
          onClick={() => setActiveTab("Assets")}
        >
          Assets
        </button>
        <button
          className={activeTab === "Form" ? "active-tab" : ""}
          onClick={() => setActiveTab("Form")}
        >
          Form
        </button>
      </div>

      {/* 🔹 Tab Content */}
      {activeTab === "Assets" && (
        <div className="assets-grid">
          {uniqueAssets.map((asset) => (
            <div key={asset.name} className="asset-card">
              <div className="asset-image">
                <img src={asset.image} alt={asset.name} />
              </div>
              <h3>{asset.name}</h3>
              <p className="count">Total: {asset.quantity}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Form" && <AssetsAllocationForm />}
    </div>
  );
}