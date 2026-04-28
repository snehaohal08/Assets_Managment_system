import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetsAllocationForm from "./AssetsForm";
import "./AssetsData.css";

export default function AssetsData() {
  const [assets, setAssets] = useState([]);
  const [activeTab, setActiveTab] = useState("Assets");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assets")
      .then((res) => {
        // console.log("DATA:", res.data);
        setAssets(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="assets-page">

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

      {activeTab === "Assets" && (
        <div className="assets-grid">
          {assets.length === 0 ? (
            <p>No Data Found</p>
          ) : (
            assets.map((asset) => (
              <div key={asset.id} className="asset-card">

                <div className="asset-image">
                  <img src={asset.image} alt={asset.name} />
                </div>

                <h3>{asset.name}</h3>
                {/* <p>Total: {asset.quantity}</p> */}

              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "Form" && <AssetsAllocationForm />}
    </div>
  );
}