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
              <td colSpan="8">No Data Found</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.srNo}</td>
                <td>{item.assetName}</td>
                <td>{item.assetId}</td>
                <td>{item.assignTo}</td>
                <td>
                  <span
                    className={`status ${item.status === "Available" ? "available" : "assigned"}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.condition}</td>
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
