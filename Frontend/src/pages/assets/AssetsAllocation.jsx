import React, { useState, useEffect } from "react";
import "./AssetsAllocation.css";
import AsstesAllocationTable from "./AsstesAllocationTable";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function AssetsAllocation() {
  // Tabs
  const [activeTab, setActiveTab] = useState("AssetsAllocationTable");

  // Search
  const [search, setSearch] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    employeeId: "", // 👈 ADD THIS
    assetId: "",
    assignTo: "",
    status: "",
    condition: "",
    age: "",
    warranty: "",
  });

  // Table data (from DB)
  const [assetsList, setAssetsList] = useState([]);

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 FETCH DATA FROM DB
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/allocations");
      setAssetsList(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 🔥 LOAD DATA ON PAGE LOAD
  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 SUBMIT (SAVE TO DB)
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:5000/api/allocations/assign", {
      employeeId: formData.employeeId,
      assetId: formData.assetId,
      status: formData.status,
      condition: formData.condition,
      age: formData.age,
      warranty: formData.warranty,
    });

    alert("Asset Assigned Successfully ✅");

    await fetchData(); // 🔥 IMPORTANT (wait for refresh)

    setActiveTab("AssetsAllocationTable");

    setFormData({
      employeeId: "",
      assetId: "",
      assignTo: "",
      status: "",
      condition: "",
      age: "",
      warranty: "",
    });

  } catch (err) {
    console.error(err);
    alert("Error assigning asset ❌");
  }
};

  // 🔥 SAFE FILTER
  const filteredData = assetsList.filter(
    (item) =>
      (item.assetName || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.assetId || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.assignTo || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* 🔹 TOP BAR */}
      <div className="top-bar">
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

        {/* 🔍 SEARCH */}
        {activeTab === "AssetsAllocationTable" && (
          <div className="search-sort">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* 🔹 MAIN */}
      <div className="allocation-container">
        {/* ✅ FORM */}
        {activeTab === "AssetsAllocation" && (
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Employee ID *</label>
              <input
                name="employeeId"
                value={formData.employeeId || ""}
                onChange={handleChange}
                placeholder="Enter Employee ID"
                required
              />
            </div>
            <div className="form-group">
              <label>Asset ID *</label>
              <input
                name="assetId"
                value={formData.assetId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Assigned To (Full Name) *</label>
              <input
                name="assignTo"
                value={formData.assignTo}
                onChange={handleChange}
                placeholder="Sneha Ohal"
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
              <input name="age" value={formData.age} onChange={handleChange} />
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