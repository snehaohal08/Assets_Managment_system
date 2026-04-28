import React from "react";
import "./AssetsAllocation.css";

export default function AsstesAllocationTable({ data }) {
  return (
    <div className="table-container">
      <table className="assets-table">
        <thead>
          <tr>
            <th>E_id</th>
            <th>Asset Name</th>
            <th>Asset ID</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Condition</th>
            <th>Age</th>
            <th>Warranty</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="8">No Data</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.empCode}</td>
                <td>{item.assetName}</td>
                <td>{item.assetId}</td>

                {/* ✅ FIXED */}
                <td>{item.firstName} {item.lastName}</td>

                <td>{item.status}</td>
                <td>{item.condition_status}</td>
                <td>{item.age}</td>
                <td>{item.warranty}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}