import React, { useState } from "react";
import "./Incident.css";
import { FaTrash, FaEdit, FaEye,  FaSearch, FaBell } from "react-icons/fa";
import IncidentForm from "./IncidentForm";

export default function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [searchTerm, setSearchTerm] = useState(""); // ✅ NEW

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [showViewAlert, setShowViewAlert] = useState(false);
  const [viewData, setViewData] = useState(null);

  // ADD / UPDATE
  const addIncident = (data) => {
    if (editIndex !== null) {
      const updated = [...incidents];
      updated[editIndex] = data;
      setIncidents(updated);
      setEditIndex(null);

      setShowUpdateSuccess(true);
      setTimeout(() => setShowUpdateSuccess(false), 3000);
    } else {
      setIncidents([...incidents, data]);
    }
    setShowForm(false);
  };

  // DELETE
  const confirmDelete = () => {
    const updated = incidents.filter((_, i) => i !== deleteIndex);
    setIncidents(updated);
    setShowDeletePopup(false);

    setShowDeleteSuccess(true);
    setTimeout(() => setShowDeleteSuccess(false), 3000);
  };

  // ✅ SEARCH FILTER
  const filteredIncidents = incidents.filter((inc) =>
    inc.assetName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.issue?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // COUNTS
  const activeCount = incidents.filter(
    (i) => i.status === "Pending" || i.status === "In Progress"
  ).length;

  const resolvedCount = incidents.filter(
    (i) => i.status === "Resolved"
  ).length;

  const dueCount = incidents.filter((i) => {
    if (i.status !== "Resolved") {
      return new Date(i.createdDate) < new Date();
    }
    return false;
  }).length;

  if (showForm) {
    return (
      <IncidentForm
        addIncident={addIncident}
        goBack={() => {
          setShowForm(false);
          setEditIndex(null);
        }}
        editData={editIndex !== null ? incidents[editIndex] : null}
      />
    );
  }

  return (
    <div className="incident-container">

      {/* HEADER */}
      <div className="incident-header">
        <h2>Incident List</h2>

        <div className="header-right">
          
          {/* 🔍 SEARCH */}
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 🔔 NOTIFICATION */}
          <div className="bell-container">
           <FaBell className="bell" />
            {dueCount > 0 && <span className="bell-badge">{dueCount}</span>}
          </div>

          {/* ADD BUTTON */}
          <button className="incident-add-btn" onClick={() => setShowForm(true)}>
            Add Incedent
          </button>

        </div>
      </div>

      {/* SUMMARY */}
      <div className="incident-summary">
        <div className="incident-card active">
          <h3>{activeCount}</h3>
          <p>Active</p>
        </div>

        <div className="incident-card resolved">
          <h3>{resolvedCount}</h3>
          <p>Resolved</p>
        </div>

        <div className="incident-card due">
          <h3>{dueCount}</h3>
          <p>Due</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="incident-table">
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Asset Name & ID</th>
              <th>Employee Name</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan="7">No Data</td>
              </tr>
            ) : (
              filteredIncidents.map((inc, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    <b>{inc.assetName}</b>
                    <div className="sub">{inc.assetId}</div>
                  </td>

                  <td>{inc.employeeName}</td>
                  <td>{inc.issue}</td>

                  <td>
                    <span className={`status ${inc.status.toLowerCase().replace(" ", "-")}`}>
                      {inc.status}
                    </span>
                  </td>

                  <td>{inc.createdDate}</td>

                  <td className="incident-actions">
                    <FaEye />
                    <FaEdit />
                    <FaTrash />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}