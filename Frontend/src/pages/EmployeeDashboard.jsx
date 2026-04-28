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

  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // 🔥 SAFE STATS
  const [stats, setStats] = useState({
    totalAssets: 0,
    assignedAssets: 0,
    availableAssets: 0,
    underRepair: 0,
    Incidents: 0,
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const showHeaderActions =
    activePage === "Dashboard" || activePage === "Employee List";

  // ================= API =================
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assets-stats")
      .then((res) => {
        console.log("STATS:", res.data);
        setStats(res.data);
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);

  // ================= EMPLOYEE =================
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

  if (showForm) {
    return (
      <EmployeeForm
        addEmployee={addEmployee}
        goBack={() => setShowForm(false)}
      />
    );
  }

  // ================= SAFE CARDS =================
  const statsCards = [
    { label: "Total Asset", value: stats.totalAssets || 0 },
    { label: "Assets Assigned", value: stats.assignedAssets || 0 },
    { label: "Assets Available", value: stats.availableAssets || 0 },
    { label: "Assets Under Repair", value: stats.underRepair || 0 },
    { label: "Incidents", value: stats.Incidents || 0 }

  ];

  return (
    <div className="dashboard-container">

      <SideBar_emp
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}

      <div className="main-content">

        {/* HEADER */}
        <div className="header">
          <div className="left-header">
            <FaBars className="toggle-icon" onClick={toggleSidebar} />
            <h2>{activePage}</h2>
          </div>
        </div>

        {/* DASHBOARD */}
        {activePage === "Dashboard" && (
          <div className="dashboard-body">

            {/* LEFT STATS */}
            <div className="stats-column">
              {statsCards.map((s, i) => (
                <div className="stat-card" key={i}>
                  <span>{s.label}</span>
                  <h3>{s.value}</h3>
                </div>
              ))}
            </div>

            {/* RIGHT */}
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
                        <td>Assigned</td>
                        <td>{stats.assignedAssets}</td>
                      </tr>
                      <tr>
                        <td>Available</td>
                        <td>{stats.availableAssets}</td>
                      </tr>
                      <tr>
                        <td>Repair</td>
                        <td>{stats.underRepair}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* OTHER PAGES */}
        {activePage === "Assets" && <AssetsData />}
        {activePage === "Assets Allocation" && <AssetsAllocation />}
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