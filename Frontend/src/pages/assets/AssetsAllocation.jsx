import React, { useState } from "react";
import "./AssetsAllocation.css";
import AsstesAllocationTable from "./AsstesAllocationTable";
import { FaSearch } from "react-icons/fa";
export default function AssetsAllocation() {
  // ✅ Default → Table open
  const [activeTab, setActiveTab] = useState("AssetsAllocationTable");

  // ✅ Search + Sort state
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [formData, setFormData] = useState({
    srNo: "",
    assetName: "",
    assetId: "",
    assignTo: "",
    status: "",
    condition: "",
    age: "",
    warranty: "",
  });

  const [assetsList, setAssetsList] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setAssetsList([...assetsList, formData]);

    alert("Asset Assigned Successfully!");

    setActiveTab("AssetsAllocationTable");

    setFormData({
      srNo: "",
      assetName: "",
      assetId: "",
      assignTo: "",
      status: "",
      condition: "",
      age: "",
      warranty: "",
    });
  };

  // ✅ Filter + Sort logic
  const filteredData = assetsList
    .filter(
      (item) =>
        item.assetName.toLowerCase().includes(search.toLowerCase()) ||
        item.assetId.toLowerCase().includes(search.toLowerCase()) ||
        item.assignTo.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "name") {
        return a.assetName.localeCompare(b.assetName);
      }
      if (sort === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

  return (
    <div>
      {/* 🔹 TOP BAR */}
      <div className="top-bar">
        {/* LEFT → Tabs */}
        <div className="assets-tabs">
          <button
            className={
              activeTab === "AssetsAllocationTable" ? "active-tab" : ""
            }
            onClick={() => setActiveTab("AssetsAllocationTable")}
          >
            Allocation Data
          </button>

          <button
            className={activeTab === "AssetsAllocation" ? "active-tab" : ""}
            onClick={() => setActiveTab("AssetsAllocation")}
          >
            Assets Allocation
          </button>
        </div>

        {/* RIGHT → Search + Sort */}
        {activeTab === "AssetsAllocationTable" && (
          <div className="search-sort">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search "
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* 🔹 MAIN CONTAINER */}
      <div className="allocation-container">
        {/* ✅ FORM */}
        {activeTab === "AssetsAllocation" && (
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>SR No *</label>
              <input
                type="number"
                name="srNo"
                value={formData.srNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Asset Name *</label>
              <input
                type="text"
                name="assetName"
                value={formData.assetName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Asset ID *</label>
              <input
                type="text"
                name="assetId"
                value={formData.assetId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Assigned To *</label>
              <input
                type="text"
                name="assignTo"
                value={formData.assignTo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Available">Available</option>
                <option value="Assigned">Assigned</option>
              </select>
            </div>

            <div className="form-group">
              <label>Condition *</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Need Repair">Need Repair</option>
                <option value="Good">Good</option>
              </select>
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Warranty</label>
              <input
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
              />
            </div>

            <div className="form-button">
              <button type="submit">Assign</button>
            </div>
          </form>
        )}

        {/* ✅ TABLE */}
        {activeTab === "AssetsAllocationTable" && (
          <AsstesAllocationTable data={filteredData} />
        )}
      </div>
    </div>
  );
}
