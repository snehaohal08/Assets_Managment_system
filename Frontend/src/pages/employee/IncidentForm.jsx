import React, { useState } from "react";
import "./Incident.css";

export default function IncidentForm({ addIncident, goBack }) {
  const [formData, setFormData] = useState({
    incidentId: "",
    assetName: "",
    assetCategory: "",
    assetId: "",
    employeeName: "",
    issue: "",
    status: "Pending",
    createdDate: "",
  });

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
          <input name="incidentId" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Asset Name</label>
          <input name="assetName" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Asset Category</label>
          <input name="assetCategory" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Asset ID</label>
          <input name="assetId" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Employee Name</label>
          <input name="employeeName" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Issue</label>
          <input name="issue" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" onChange={handleChange}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>

        <div className="form-group">
          <label>Created Date</label>
          <input type="date" name="createdDate" onChange={handleChange} />
        </div>

        <div className="incident-btns">
          <button type="submit">Submit</button>
          <button type="button" onClick={goBack}>Cancel</button>
        </div>
      </form>
    </div>
  );
}