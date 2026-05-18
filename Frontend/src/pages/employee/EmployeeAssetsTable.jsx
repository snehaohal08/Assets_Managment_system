import React from "react";

export default function EmployeeAssetsTable({ myAssets }) {
  return (
    <div className="employee-assets-section">

      <h3>My Assigned Assets</h3>

      <table className="assets-table">
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Asset Name</th>
            <th>Status</th>
            <th>Condition</th>
            <th>Age</th>
            <th>Warranty</th>
          </tr>
        </thead>

        <tbody>
          {myAssets && myAssets.length > 0 ? (
            myAssets.map((item, index) => (
              <tr key={index}>
                <td>{item.asset_id}</td>
                <td>{item.assetName}</td>
                <td>{item.status}</td>
                <td>{item.condition_status}</td>
                <td>{item.age}</td>
                <td>{item.warranty}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Assets Assigned</td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}