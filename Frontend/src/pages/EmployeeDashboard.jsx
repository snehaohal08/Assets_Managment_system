import React, { useState, useEffect } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import axios from "axios";

import AssetsBarChart from "../components/AssetsBarChart";
import DonutChart from "../components/DonutChart";
import AssetsData from "./assets/AssetsData";
import "./AdminDashboard.css";
import AssetsAllocation from "./assets/AssetsAllocation";
import Breadcrumb from "./assets/Breadcrumb";
import SideBar_emp from "../components/SideBar_emp";
import EmployeeList from "./employee/EmployeeList";
import IncidentList from "./employee/IncidentList";
import EmployeeForm from "./employee/EmployeeForm";

export default function EmployeeDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assets, setAssets] = useState([]);

  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // ✅ ADD EMPLOYEE + NOTIFICATION
  const addEmployee = (data) => {
    setEmployees((prev) => [...prev, data]);
    setShowForm(false);

    const newNotification = {
      id: Date.now(),
      message: `Employee ${data?.name || "New Employee"} added`,
      time: new Date().toLocaleTimeString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  // ✅ REMOVE NOTIFICATION ON CLICK
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // FETCH DATA
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assets")
      .then((res) => setAssets(res.data))
      .catch((err) => console.log(err));
  }, []);

  const totalAssets = assets.reduce((sum, a) => sum + a.quantity, 0);
  const assignedAssets = 0;
  const availableAssets = totalAssets - assignedAssets;

  const stats = [
    { label: "Total Asset", value: totalAssets },
    { label: "Assets Assigned", value: assignedAssets },
    { label: "Assets Available", value: availableAssets },
    { label: "Assets Under Repair", value: 0 },
    { label: "Assets Due for Replacement", value: 0 },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // FORM VIEW
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
      {/* SIDEBAR */}
      <SideBar_emp
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* HEADER */}
        <div className="header">
          <h2>Employee Dashboard</h2>

          <div className="header-right">
            {/* SEARCH */}
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* ADD BUTTON */}
            <button className="add-btn" onClick={() => setShowForm(true)}>
              Add Employee
            </button>

            {/* 🔔 NOTIFICATION */}
            <div
              className="bell-container"
              onClick={() => setShowNotifications(true)}
            >
              <FaBell className="bell" />
              {notifications.length > 0 && (
                <span className="bell-badge">
                  {notifications.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 🔥 NOTIFICATION SIDE PANEL */}
        {showNotifications && (
          <div className="notification-panel">
            <div className="notification-header">
              <h3>Notifications</h3>
              <span onClick={() => setShowNotifications(false)}>✖</span>
            </div>

            {/* LIST */}
            <div className="notification-list">
              {notifications.length === 0 ? (
                <p>No Notifications</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="notification-card"
                    onClick={() => removeNotification(n.id)} // 🔥 click remove
                    style={{ cursor: "pointer" }}
                  >
                    <div className="left-line"></div>

                    <div className="notification-content">
                      <h4>{n.message}</h4>
                      <p>New activity in system</p>
                    </div>

                    <span className="time">{n.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* BREADCRUMB */}
        {(activePage === "Assets" ||
          activePage === "Assets Allocation") && (
          <Breadcrumb
            activePage={activePage}
            setActivePage={setActivePage}
          />
        )}

        {/* DASHBOARD */}
        {activePage === "Dashboard" && (
          <div className="dashboard-body">
            <div className="stats-column">
              {stats.map((item, index) => (
                <div className="stat-card" key={index}>
                  <span className="stat-label">{item.label}</span>
                  <span className="stat-value">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="right-section">
              <div className="chart-wrapper">
                <h3>Assets</h3>
                <AssetsBarChart />
              </div>

              <div className="bottom-grid">
                <div className="pie-card">
                  <h3>Tickets Issued</h3>
                  <DonutChart />
                </div>

                <div className="repair-card">
                  <h3>Repair Due Dates</h3>
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

        {/* PAGES */}
        {activePage === "Assets" && (
          <AssetsData setActivePage={setActivePage} />
        )}

        {activePage === "Assets Allocation" && <AssetsAllocation />}

        {activePage === "Employee List" && (
          <EmployeeList
            employees={employees}
            setEmployees={setEmployees}
            setShowForm={setShowForm}
          />
        )}

        {activePage === "Incident Log" && <IncidentList />}
      </div>
    </div>
  );
}