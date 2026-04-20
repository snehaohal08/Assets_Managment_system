import React, { useState } from "react";
import "./EmployeeList.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function EmployeeList({
  employees,
  setEmployees,
  setShowForm
}) {
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [showViewPopup, setShowViewPopup] = useState(false);
  const [viewData, setViewData] = useState(null);

  const normalize = (str) => (str || "").trim().toLowerCase();

  // DELETE
  const confirmDelete = () => {
    const updated = employees.filter((_, i) => i !== deleteIndex);
    setEmployees(updated);

    setShowDeletePopup(false);
    setDeleteIndex(null);
  };

  // EDIT
  const handleEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
  };

  // VIEW
  const handleView = (emp) => {
    setViewData(emp);
    setShowViewPopup(true);
  };

  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container">

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name & ID</th>
              <th>Category</th>
              <th>Department</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="7">No Data</td>
              </tr>
            ) : (
              filteredEmployees.map((emp, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    <b>{emp.firstName} {emp.lastName}</b>
                    <div>{emp.id}</div>
                  </td>

                  <td>{emp.assetsCategory}</td>
                  <td>{emp.department}</td>
                  <td>{emp.email}</td>
                  <td>{emp.contact}</td>

                  <td className="actions">
                    <FaEye onClick={() => handleView(emp)} />
                    <FaEdit onClick={() => handleEdit(index)} />
                    <FaTrash
                      onClick={() => {
                        setDeleteIndex(index);
                        setShowDeletePopup(true);
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= DELETE POPUP ================= */}
      {showDeletePopup && (
        <div className="overlay">
          <div className="popup">
            <h3>Delete Employee?</h3>
            <p>This action cannot be undone.</p>

            <div className="popup-actions">
              <button className="cancel" onClick={() => setShowDeletePopup(false)}>
                Cancel
              </button>
              <button className="delete" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW POPUP ================= */}
      {showViewPopup && viewData && (
        <div className="overlay">
          <div className="popup">
            <h3>Employee Details</h3>

            <p><b>Name:</b> {viewData.firstName} {viewData.lastName}</p>
            <p><b>ID:</b> {viewData.id}</p>
            <p><b>Email:</b> {viewData.email}</p>
            <p><b>Contact:</b> {viewData.contact}</p>
            <p><b>Department:</b> {viewData.department}</p>

            <button className="close" onClick={() => setShowViewPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}