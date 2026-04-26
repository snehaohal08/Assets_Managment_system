import React, { useState } from "react";
import "./Incident.css";
import { FaTrash, FaEdit, FaEye, FaBell } from "react-icons/fa";
import IncidentForm from "./IncidentForm";

export default function IncidentList({ addNotification }) {

  const [incidents, setIncidents] = useState([]);
  const [notifications, setNotifications] = useState([]); // ✅ LOCAL
  const [showPanel, setShowPanel] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const total = incidents.length;
  const pending = incidents.filter(i => i.status === "Pending").length;
  const inProgress = incidents.filter(i => i.status === "In Progress").length;
  const resolved = incidents.filter(i => i.status === "Resolved").length;

  // ✅ ADD INCIDENT (BOTH SIDE)
  const addIncident = (data) => {
    setIncidents(prev => [...prev, data]);

    const time = new Date().toLocaleTimeString();

    // 🔥 LOCAL NOTIFICATION (Incident Page)
    setNotifications(prev => [
      {
        title: `Incident added for ${data.assetName}`,
        subtitle: data.issue,
        time: time,
      },
      ...prev
    ]);

    // 🔥 GLOBAL NOTIFICATION (Dashboard)
    addNotification(data);

    setShowForm(false);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    setIncidents(prev => prev.filter((_, i) => i !== deleteIndex));
    setShowPopup(false);
  };

  if (showForm) {
    return (
      <IncidentForm
        addIncident={addIncident}
        goBack={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="incident-container">

      {/* HEADER */}
      <div className="incident-header">
        <div className="incident-actions-header">

          {/* 🔔 LOCAL BELL */}
          <div className="bell-container" onClick={() => setShowPanel(true)}>
            <FaBell className="bell" />
            {notifications.length > 0 && (
              <span className="bell-badge">{notifications.length}</span>
            )}
          </div>

          <button
            className="incident-add-btn"
            onClick={() => setShowForm(true)}
          >
            Add Incident
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="incident-summary">
        <div className="incident-card"><h3>{total}</h3><p>Total</p></div>
        <div className="incident-card pending"><h3>{pending}</h3><p>Pending</p></div>
        <div className="incident-card progress"><h3>{inProgress}</h3><p>In Progress</p></div>
        <div className="incident-card resolved"><h3>{resolved}</h3><p>Resolved</p></div>
      </div>

      {/* TABLE */}
      <div className="incident-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Asset</th>
              <th>Employee</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {incidents.length === 0 ? (
              <tr><td colSpan="7">No Data</td></tr>
            ) : (
              incidents.map((inc, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{inc.assetName}</td>
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
                    <FaTrash onClick={() => handleDeleteClick(index)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 LOCAL NOTIFICATION PANEL */}
      {showPanel && (
        <>
          <div
            className="notification-overlay"
            onClick={() => setShowPanel(false)}
          ></div>

          <div className="notification-panel">
            <div className="panel-header">
              <h3>Incident Notifications</h3>
              <span className="close-btn" onClick={() => setShowPanel(false)}>
                ✕
              </span>
            </div>

            <div className="panel-body">
              {notifications.length === 0 ? (
                <p>No Notifications</p>
              ) : (
                notifications.map((note, i) => (
                  <div key={i} className="notification-card">

                    <div className="left-line"></div>

                    <div className="notification-content">
                      <h4>{note.title}</h4>
                      <p>{note.subtitle}</p>
                    </div>

                    <div className="time">{note.time}</div>

                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* DELETE POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Delete?</h3>
            <p>Are you sure?</p>

            <div className="popup-buttons">
              <button onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}