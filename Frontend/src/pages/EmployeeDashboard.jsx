import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaBars } from "react-icons/fa";
import axios from "axios";

import AssetsBarChart from "../components/AssetsBarChart";
import DonutChart from "../components/DonutChart";
import AssetsData from "./assets/AssetsData";
import AssetsAllocation from "./assets/AssetsAllocation";
import SideBar_emp from "../components/SideBar_emp";
import EmployeeList from "./employee/EmployeeList";
import IncidentList from "./employee/IncidentList";
import EmployeeForm from "./employee/EmployeeForm";

import "./AdminDashboard.css";
import "../components/sidebar.css";

export default function EmployeeDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const showHeaderActions =
    activePage === "Dashboard" || activePage === "Employee List";

  // ================= EMPLOYEE NOTIFICATION =================
  const addEmployee = (data) => {
    setEmployees((prev) => [...prev, data]);
    setShowForm(false);

    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Employee Added",
        problem: data?.name || "New Employee",
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  };

  // ================= INCIDENT NOTIFICATION =================
  const addIncidentNotification = (data) => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: `Incident: ${data.assetName}`,
        problem: data.issue,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

useEffect(() => {
  axios
    .get("http://localhost:5000/api/assets-db")   // ✅ FIXED
    .then((res) => setAssets(res.data))
    .catch((err) => console.log(err));
}, []);
  const totalAssets = assets?.length || 0;
// console.log("Assets Data:", assets);
  const stats = [
    { label: "Total Asset", value: totalAssets },
    { label: "Assets Assigned", value: 0 },
    { label: "Assets Available", value: totalAssets },
    { label: "Assets Under Repair", value: 0 },
    { label: "Assets Due for Replacement", value: 0 },
  ];

  if (showForm) {
    return (
      <EmployeeForm
        addEmployee={addEmployee}
        goBack={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="dashboard-container">

      {/* ================= SIDEBAR ================= */}
      <SideBar_emp
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-content">

        {/* ================= HEADER ================= */}
        <div className="header">

          {/* LEFT SIDE */}
          <div className="left-header">
            <FaBars className="toggle-icon" onClick={toggleSidebar} />

            <h2>
              {activePage === "Dashboard"
                ? "Employee Dashboard"
                : activePage}
            </h2>
          </div>

          {/* RIGHT SIDE */}
          <div className="header-right">

            <div className="search-box">
              <FaSearch />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
            </div>

            {showHeaderActions && (
              <>
                <button
                  className="add-btn"
                  onClick={() => setShowForm(true)}
                >
                  Add Employee
                </button>

                <div
                  className="bell-container"
                  onClick={() => setShowNotifications(true)}
                >
                  <FaBell />
                  {notifications.length > 0 && (
                    <span className="bell-badge">
                      {notifications.length}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ================= NOTIFICATION PANEL ================= */}
        {showNotifications && (
          <>
            <div
              className="notification-overlay"
              onClick={() => setShowNotifications(false)}
            ></div>

            <div className="notification-panel">
              <div className="panel-header">
                <h3>Notifications</h3>
                <span onClick={() => setShowNotifications(false)}>✖</span>
              </div>

              <div className="panel-body">
                {notifications.length === 0 ? (
                  <p>No Notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="notification-card"
                      onClick={() => removeNotification(n.id)}
                    >
                      <div className="left-line"></div>

                      <div className="notification-content">
                        <h4>{n.title}</h4>
                        <p>{n.problem}</p>
                      </div>

                      <span className="time">{n.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {/* ================= DASHBOARD ================= */}
        {activePage === "Dashboard" && (
          <div className="dashboard-body">

            <div className="stats-column">
              {stats.map((s, i) => (
                <div className="stat-card" key={i}>
                  <span className="stat-label">{s.label}</span>
                  <span className="stat-value">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="right-section">
              <div className="chart-wrapper">
                <AssetsBarChart />
              </div>

              <div className="bottom-grid">
                <div className="pie-card">
                  <DonutChart />
                </div>

                <div className="repair-card">
                  <table>
                    <tbody>
                      <tr>
                        <td>AS4568</td>
                        <td>Techfix</td>
                        <td>In Progress</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}

        {activePage === "Assets" && (
          <AssetsData setActivePage={setActivePage} />
        )}

        {activePage === "Assets Allocation" && (
          <AssetsAllocation />
        )}

        {activePage === "Employee List" && (
          <EmployeeList
            employees={employees}
            setEmployees={setEmployees}
            setShowForm={setShowForm}
          />
        )}

        {activePage === "Incident Log" && (
          <IncidentList addNotification={addIncidentNotification} />
        )}

      </div>
    </div>
  );
}