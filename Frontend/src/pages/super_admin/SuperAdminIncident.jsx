import React from "react";
import { useIncident } from "../../context/IncidentContext";

export default function SuperAdminIncident() {

  const { incidents } = useIncident();

  return (
    <div>
      <h2>Super Admin Incident Dashboard</h2>

      {incidents.length === 0 ? (
        <p>No Incidents Found</p>
      ) : (
        incidents.map((inc) => (
          <div key={inc.id} style={{ border: "1px solid #ccc", margin: 10 }}>
            <p><b>Asset:</b> {inc.assetName}</p>
            <p><b>Employee:</b> {inc.employeeName}</p>
            <p><b>Issue:</b> {inc.issue}</p>
            <p><b>Status:</b> {inc.status}</p>
            <p><b>Date:</b> {inc.createdDate}</p>
          </div>
        ))
      )}

    </div>
  );
}