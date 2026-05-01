import React, { useState } from "react";
import { useIncident } from "../../context/IncidentContext";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./Incident.css";

export default function IncidentList() {
  const { incidents, deleteIncident, updateIncident } = useIncident();

  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);

  return (
    <div className="incident-list-wrapper">
      <h2>Incident List</h2>

      {incidents.length === 0 ? (
        <p>No Incidents Found</p>
      ) : (
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
            {incidents.map((i) => (
              <tr key={i.id}>
                <td>
                  {i.assetId}
                  <br />
                  <small>{i.assetName}</small>
                </td>

                <td>
                  {i.employeeId}
                  <br />
                  <small>{i.employeeName}</small>
                </td>

                <td>{i.issueType}</td>
                <td>{i.createdDate}</td>

                <td>
                  <span
                    className={`status-badge ${i.status
                      ?.toLowerCase()
                      .replace(" ", "")}`}
                  >
                    {i.status}
                  </span>
                </td>

                <td className="actions">
                  <FaEye onClick={() => setViewData(i)} />
                  <FaEdit onClick={() => setEditData(i)} />
                  <FaTrash onClick={() => deleteIncident(i.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 👁️ VIEW MODAL */}
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

      {/* ✏️ EDIT MODAL */}
      {editData && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit Incident</h3>

            <select
              value={editData.status}
              onChange={(e) =>
                setEditData({ ...editData, status: e.target.value })
              }
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>

            <div className="modal-actions">
              <button
                onClick={() => {
                  updateIncident(editData.id, editData);
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