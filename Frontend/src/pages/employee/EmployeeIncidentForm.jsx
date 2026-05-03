import React, { useState } from "react";
import { useIncident } from "../../context/IncidentContext";
import "./Incident.css";

export default function EmployeeIncidentForm({ goBack }) {
  const { addIncident } = useIncident();

  const [form, setForm] = useState({
    assetId: "",
    employeeId: "",
    assetName: "",
    employeeName: "",
    issueType: "",
    priority: "",
    description: "",
    createdDate: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};

    if (!form.assetId) temp.assetId = "Asset ID is required";
    if (!form.employeeId) temp.employeeId = "Employee ID is required";
    if (!form.assetName) temp.assetName = "Asset Name is required";
    if (!form.employeeName) temp.employeeName = "Employee Name is required";
    if (!form.issueType) temp.issueType = "Select Issue Type";
    if (!form.priority) temp.priority = "Select Priority";
    if (!form.description) temp.description = "Description is required";
    if (!form.createdDate) temp.createdDate = "Date is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    addIncident(form);
    goBack();
  };

  return (
    <div className="incident-wrapper">
      <h2 className="title">Incident Report </h2>

      <form onSubmit={handleSubmit} className="incident-form">
        {/* ROW 1 */}
        <div className="row">
          <div className="field">
            <input
              placeholder="Asset ID"
              value={form.assetId}
              onChange={(e) => setForm({ ...form, assetId: e.target.value })}
            />
            {errors.assetId && <span className="error">{errors.assetId}</span>}
          </div>

          <div className="field">
            <input
              placeholder="Employee ID"
              value={form.employeeId}
              onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
            />
            {errors.employeeId && (
              <span className="error">{errors.employeeId}</span>
            )}
          </div>

          <div className="field">
            <input
              placeholder="Asset Name"
              value={form.assetName}
              onChange={(e) => setForm({ ...form, assetName: e.target.value })}
            />
            {errors.assetName && (
              <span className="error">{errors.assetName}</span>
            )}
          </div>
        </div>

        {/* ROW 2 */}
        <div className="row">
          <div className="field">
            <input
              placeholder="Employee Name"
              value={form.employeeName}
              onChange={(e) =>
                setForm({ ...form, employeeName: e.target.value })
              }
            />
            {errors.employeeName && (
              <span className="error">{errors.employeeName}</span>
            )}
          </div>

          <div className="field">
            <select
              value={form.issueType}
              onChange={(e) => setForm({ ...form, issueType: e.target.value })}
            >
              <option value="">Issue Type</option>
              <option>Hardware Issue</option>
              <option>Software Issue</option>
              <option>Network Issue</option>
              <option>Security Issue</option>
            </select>
            {errors.issueType && (
              <span className="error">{errors.issueType}</span>
            )}
          </div>

          <div className="field">
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option value="">Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
            {errors.priority && (
              <span className="error">{errors.priority}</span>
            )}
          </div>
        </div>

        {/* DATE */}
        <div className="row date-row">
          <div className="field">
            <input
              type="date"
              value={form.createdDate}
              onChange={(e) =>
                setForm({ ...form, createdDate: e.target.value })
              }
            />
            {errors.createdDate && (
              <span className="error">{errors.createdDate}</span>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="row single">
          <div className="field full">
            <textarea
              placeholder="Incident Description..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>
        </div>

        <button type="submit" className="btn">
          Submit Incident
        </button>
      </form>
    </div>
  );
}
