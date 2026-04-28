import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AssetsBarChart from "../components/AssetsBarChart";
import DonutChart from "../components/DonutChart";
import axios from "axios";
import "./AdminDashboard.css";

export default function AdminDashboard() {

  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalAssets: 0,
    assignedAssets: 0,
    availableAssets: 0,
    underRepair: 0,
    Incidents: 0,
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assets-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  /* ================= CARDS ================= */
  const cards = [
    { label: "Total Assets", value: stats.totalAssets },
    { label: "Assets Assigned", value: stats.assignedAssets },
    { label: "Assets Available", value: stats.availableAssets },
    { label: "Assets Under Repair", value: stats.underRepair },
    { label: "Incidents", value: stats.Incidents || 0 }
  ];

  return (
    <div className="dashboard-container">

      <Sidebar
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />

        {/* ================= DASHBOARD ================= */}
        {activePage === "Dashboard" && (
          <div className="dashboard-body">

            {/* LEFT CARDS */}
            <div className="stats-column">
              {cards.map((item, i) => (
                <div className="stat-card" key={i}>
                  <span>{item.label}</span>
                  <h3>{item.value}</h3>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="right-section">

              {/* BAR CHART */}
              <div className="chart-wrapper">
                <h3>Assets Overview</h3>
                <AssetsBarChart />
              </div>

              {/* PIE CHART */}
              <div className="bottom-grid">
                <div className="pie-card">
                  <h3>Allocation Status</h3>
                  <DonutChart />
                </div>

                <div className="repair-card">
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
      </div>
    </div>
  );
}