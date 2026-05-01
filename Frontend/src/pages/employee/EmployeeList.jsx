import React, { useState, useEffect } from "react";
import "./EmployeeList.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showViewPopup, setShowViewPopup] = useState(false);
  const [viewData, setViewData] = useState(null);

  // ================= FETCH =================
  useEffect(() => {
    fetchEmployees();
    fetchAssets();

    const interval = setInterval(() => {
      fetchAssets();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAssets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/allocations");
      setAssignedAssets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= ASSET COUNT =================
  const getAssetCount = (empCode) => {
    return assignedAssets.filter(
      (a) => String(a.employee_id).trim() === String(empCode).trim()
    ).length;
  };

  const getAssetNames = (empCode) => {
    return assignedAssets
      .filter((a) => String(a.employee_id) === String(empCode))
      .map((a) => a.assetName)
      .join(", ");
  };

  // ================= DELETE =================
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${deleteId}`);
      fetchEmployees();
      setShowDeletePopup(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = (emp) => {
    setViewData(emp);
    setShowViewPopup(true);
  };

  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.empCode}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= MAIN UI =================
  return (
    <div className="container">

      {/* 🔥 ADD EMPLOYEE BUTTON */}
      {!showForm && (
        <div style={{ marginBottom: "15px" }}>
          <button
            className="add-employee-btn"
            onClick={() => setShowForm(true)}
          >
            + Add Employee
          </button>
        </div>
      )}

      {/* 🔥 FORM OPEN */}
      {showForm ? (
        <EmployeeForm goBack={() => setShowForm(false)} />
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name & ID</th>
                <th>Department</th>
                <th>Email</th>
                <th>Assets</th>
                <th>Contact</th>
                <th>Assets Assigned</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="8">No Data</td>
                </tr>
              ) : (
                filteredEmployees.map((emp, index) => (
                  <tr key={emp.id}>
                    <td>{index + 1}</td>

                    <td>
                      <b>{emp.firstName} {emp.lastName}</b>
                      <div>{emp.empCode}</div>
                    </td>

                    <td>{emp.department}</td>
                    <td>{emp.email}</td>

                    <td style={{ fontSize: "12px", color: "gray" }}>
                      {getAssetNames(emp.empCode)}
                    </td>

                    <td>{emp.contact}</td>

                    <td>{getAssetCount(emp.empCode)}</td>

                    <td className="actions">
                      <FaEye onClick={() => handleView(emp)} />
                      <FaEdit onClick={() => setShowForm(true)} />
                      <FaTrash
                        onClick={() => {
                          setDeleteId(emp.id);
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
      )}

      {/* ================= DELETE POPUP ================= */}
      {showDeletePopup && (
        <div className="overlay">
          <div className="popup">
            <h3>Delete Employee?</h3>
            <button onClick={() => setShowDeletePopup(false)}>Cancel</button>
            <button onClick={confirmDelete}>Delete</button>
          </div>
        </div>
      )}

      {/* ================= VIEW POPUP ================= */}
      {showViewPopup && viewData && (
        <div className="overlay">
          <div className="popup">
            <h3>Employee Details</h3>
            <p>{viewData.firstName} {viewData.lastName}</p>
            <p>{viewData.empCode}</p>
            <button onClick={() => setShowViewPopup(false)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}