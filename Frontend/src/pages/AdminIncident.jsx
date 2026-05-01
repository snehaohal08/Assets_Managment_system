import React from "react";
import { useIncident } from "../../context/IncidentContext";

export default function AdminIncident() {

  const { incidents, deleteIncident } = useIncident();

  return (
    <div>
      <h2>Admin Incident Panel</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
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
            <tr>
              <td colSpan="6">No Data</td>
            </tr>
          ) : (
            incidents.map((inc) => (
              <tr key={inc.id}>
                <td>{inc.assetName}</td>
                <td>{inc.employeeName}</td>
                <td>{inc.issue}</td>
                <td>{inc.status}</td>
                <td>{inc.createdDate}</td>

                <td>
                  <button onClick={() => deleteIncident(inc.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}