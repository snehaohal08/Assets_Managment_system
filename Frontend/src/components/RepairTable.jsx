import React from "react";
import "../pages/AdminDashboard.css"; 

const RepairTable = () => {
  const repairs = [
    { id: "AS4568", vendor: "TechFix Solutions", sent: "02/01/2026", complete: "16/01/2026" },
    { id: "AS02696", vendor: "TechFix Solutions", sent: "02/01/2026", complete: "16/01/2026" },
    { id: "AS28053", vendor: "TechFix Solutions", sent: "02/01/2026", complete: "16/01/2026" },
    { id: "AS80628", vendor: "TechFix Solutions", sent: "02/01/2026", complete: "16/01/2026" },
  ];

  return (
    <div className="repair-table">
      <h4>Repair Due Dates</h4>
      <table>
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Vendor Name</th>
            <th>Sent Date</th>
            <th>Expected Completion</th>
          </tr>
        </thead>
        <tbody>
          {repairs.map((r, i) => (
            <tr key={i}>
              <td>{r.id}</td>
              <td>{r.vendor}</td>
              <td>{r.sent}</td>
              <td>{r.complete}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RepairTable;