import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";

import AssetsBarChart from "../components/AssetsBarChart";
import DonutChart from "../components/DonutChart";

import AssetsData from "./assets/AssetsData";
import AssetsAllocation from "./assets/AssetsAllocation";
import IncidentList from "./employee/IncidentList";

import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

const [stats, setStats] = useState({
  totalAssets: 0,
  assignedAssets: 0,
  availableAssets: 0,
  Incidents: 0,
  underRepair: 0
});

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assets-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  const cards = [
    { label: "Total Assets", value: stats.totalAssets },
    { label: "Assigned", value: stats.assignedAssets },
    { label: "Available", value: stats.availableAssets },
    { label: "Incidents", value: stats.Incidents },
  ];

  return (
    <div className="admin-dashboard-container">

      <Sidebar
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="admin-main-content">

        <Header toggleSidebar={toggleSidebar} />

        {activePage === "Dashboard" && (
          <>
            {/* STATS */}
            <div className="stats-grid">
              {cards.map((item, i) => (
                <div className="stat-card" key={i}>
                  <span>{item.label}</span>
                  <h2>{item.value}</h2>
                </div>
              ))}
            </div>

            {/* CHARTS */}
            <div className="dashboard-layout-grid">

              <div className="graph-box">
                <h3>Assets Overview</h3>
                <AssetsBarChart />
              </div>

              <div className="pie-box">
                <h3>Allocation Status</h3>
                <DonutChart />
              </div>

              <div className="summary-box">
                <h3>Quick Summary</h3>
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
                  </tbody>
                </table>
              </div>

            </div>
          </>
        )}

        {activePage === "Assets" && <AssetsData />}
        {activePage === "Assets Allocation" && <AssetsAllocation />}
        {activePage === "Incident Log" && <IncidentList role="admin" />}

      </div>
    </div>
  );
}