import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import axios from "axios";

import AssetsBarChart from "../../components/AssetsBarChart";
import DonutChart from "../../components/DonutChart";

import "../AdminDashboard.css";
import "../../components/sidebar.css";

import Sidebar_super from "../../components/Sidebar_super";
import AssetsAllocation from "../assets/AssetsAllocation";
import EmployeeList from "../employee/EmployeeList";
import AssetsTable from "./AssetsTable";
import Header from "../../components/Header";
import IncidentList from "../employee/IncidentList";

// import IncidentList from "../employee/IncidentList";

function SuperAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  // ❌ REMOVE showForm (not needed here)

  // ✅ STATS
  const [stats, setStats] = useState({
    totalAssets: 0,
    assignedAssets: 0,
    availableAssets: 0,
    underRepair: 0,
    Incidents: 0,
  });

  // ✅ FIX: notifications state (IF YOU WANT LATER)
  const [notifications, setNotifications] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assets-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ OPTIONAL: if you want notifications (FIXED)
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

  const statsCards = [
    { label: "Total Asset", value: stats.totalAssets || 0 },
    { label: "Assets Assigned", value: stats.assignedAssets || 0 },
    { label: "Assets Available", value: stats.availableAssets || 0 },
    { label: "Assets Under Repair", value: stats.underRepair || 0 },
    { label: "Incidents", value: stats.Incidents || 0 },
  ];

  return (
    <div className="dashboard-container">

      <Sidebar_super
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}

      <div className="main-content">

        <Header toggleSidebar={toggleSidebar} />

        <div className="header">
          <div className="left-header">
            <FaBars className="toggle-icon" onClick={toggleSidebar} />
            <h2>{activePage}</h2>
          </div>
        </div>

        {/* DASHBOARD */}
        {activePage === "Dashboard" && (
          <div className="dashboard-body">

            <div className="stats-column">
              {statsCards.map((s, i) => (
                <div className="stat-card" key={i}>
                  <span>{s.label}</span>
                  <h3>{s.value}</h3>
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
        {activePage === "Assets" && <AssetsTable />}

        {activePage === "Assets Allocation" && <AssetsAllocation />}

        {activePage === "Employee List" && (
          <EmployeeList setShowForm={() => {}} />
        )}

        {/* ✅ INCIDENT PAGE (ONLY VIEW DATA) */}
{activePage === "Incident Log" && (
  <IncidentList role="superadmin" />
)}

      </div>
    </div>
  );
}

export default SuperAdmin;