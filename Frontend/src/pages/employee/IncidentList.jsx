import React, { useState, useMemo } from "react";
import { useIncident } from "../../context/IncidentContext";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./Incident.css";

export default function IncidentList({ employeeId }) {
  const { incidents, deleteIncident, updateIncident } = useIncident();

  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);

  // ✅ FILTER EMPLOYEE INCIDENTS
  const filteredIncidents = employeeId
    ? incidents.filter(
        (i) =>
          i.employeeId?.trim().toLowerCase() ===
          employeeId?.trim().toLowerCase(),
      )
    : incidents;

  // ✅ INCIDENT STATS
  const stats = useMemo(() => {
    return {
      total: filteredIncidents.length,

      open: filteredIncidents.filter((i) => i.status?.toLowerCase() === "open")
        .length,

      inProgress: filteredIncidents.filter(
        (i) => i.status?.toLowerCase() === "in progress",
      ).length,

      closed: filteredIncidents.filter(
        (i) =>
          i.status?.toLowerCase() === "closed" ||
          i.status?.toLowerCase() === "resolved",
      ).length,
    };
  }, [filteredIncidents]);

  return (
    <div className="incident-list-wrapper">
      <h2>Incident List</h2>

      {/* ✅ TOP CARDS */}
      <div className="employee-cards">
        <div className="employee-card blue">
          <h3>Total Incidents</h3>
          <h2>{stats.total}</h2>
        </div>

        <div className="employee-card green">
          <h3>Completed</h3>
          <h2>{stats.closed}</h2>
        </div>

        <div className="employee-card orange">
          <h3>Pending</h3>
          <h2>{stats.open}</h2>
        </div>

        <div className="employee-card purple">
          <h3>In Progress</h3>
          <h2>{stats.inProgress}</h2>
        </div>
      </div>

      {filteredIncidents.length === 0 ? (
        <p>No Incidents Found</p>
      ) : (
        <div className="table-container">
        <div className="table-scroll">
          <table className="incident-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Employee</th>
                <th>Issue</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredIncidents.map((i) => (
                <tr key={i.id}>
                  {/* ASSET */}
                  <td>
                    {i.assetId}
                    <br />
                    <small>{i.assetName}</small>
                  </td>

                  {/* EMPLOYEE */}
                  <td>
                    {i.employeeId}
                    <br />
                    <small>{i.employeeName}</small>
                  </td>

                  {/* ISSUE */}
                  <td>{i.issueType}</td>

                  {/* DATE */}
                  <td>{i.createdDate}</td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`status-badge ${i.status
                        ?.toLowerCase()
                        .replace(" ", "")}`}
                    >
                      {i.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="actions">
                    <FaEye
                      onClick={() => setViewData(i)}
                      style={{ cursor: "pointer" }}
                    />

                    <FaEdit
                      onClick={() => setEditData(i)}
                      style={{ cursor: "pointer" }}
                    />

                    <FaTrash
                      onClick={() => deleteIncident(i.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}
      {viewData && (
        <div className="modal">
          <div className="modal-box view-box">
            <h3>Incident Details</h3>

            <div className="view-row">
              <span>Asset:</span>
              <p>
                {viewData.assetName} ({viewData.assetId})
              </p>
            </div>

            <div className="view-row">
              <span>Employee:</span>
              <p>
                {viewData.employeeName} ({viewData.employeeId})
              </p>
            </div>

            <div className="view-row">
              <span>Issue:</span>
              <p>{viewData.issueType}</p>
            </div>

            <div className="view-row">
              <span>Date:</span>
              <p>{viewData.createdDate}</p>
            </div>

            <div className="view-row">
              <span>Status:</span>

              <p
                className={`status-badge ${viewData.status
                  ?.toLowerCase()
                  .replace(" ", "")}`}
              >
                {viewData.status}
              </p>
            </div>

            <div className="modal-actions">
              <button onClick={() => setViewData(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editData && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit Incident</h3>

            <select
              value={editData.status}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  status: e.target.value,
                })
              }
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>

            <div className="modal-actions">
              <button
                onClick={async () => {
                  await updateIncident(editData.id, editData);

                  setEditData(null);
                }}
              >
                Save
              </button>

              <button onClick={() => setEditData(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
