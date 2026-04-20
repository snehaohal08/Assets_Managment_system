import React, { useState, useEffect } from "react";
import "./Incident.css";

export default function IncidentForm({ addIncident, goBack, editData }) {
const [formData, setFormData] = useState({
  assetName: "",
  assetId: "",
  employeeName: "",
  issue: "",
  status: "Pending",
  createdDate: "",
});

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncident(formData);
  };

  return (
    <div className="incident-container">
      <h2>Incident Form</h2>

      <form onSubmit={handleSubmit} className="incident-form-grid">
        <div className="form-group">
          <label>Incident ID</label>
          <input
            name="incidentId"
            value={formData.incidentId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Asset Name</label>
          <input
            name="assetName"
            value={formData.assetName}
            onChange={handleChange}
          />
        </div>
               <div className="form-group">
          <label>Asset Categary</label>
          <input
            name="assetCategory"
            value={formData.assetCategory}
            onChange={handleChange}
          />
        </div>
<div className="form-group">
          <label>Asset ID</label>
          <input
            name="assetId"
            value={formData.assetId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Employee Name</label>
          <input
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Issue</label>
          <input name="issue" value={formData.issue} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>

        <div className="form-group">
          <label>Created Date</label>
          <input
            type="date"
            name="createdDate"
            value={formData.createdDate}
            onChange={handleChange}
          />
        </div>

        <div className="incident-btns">
          <button type="submit">Submit</button>
          <button type="button" onClick={goBack}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
