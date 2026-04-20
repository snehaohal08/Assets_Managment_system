import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AssetsBarChart from "../components/AssetsBarChart";
import DonutChart from "../components/DonutChart";
import AssetsData from "./assets/AssetsData";
import "./AdminDashboard.css";
import axios from "axios";
import AssetsAllocation from "./assets/AssetsAllocation";
import Breadcrumb from "./assets/Breadcrumb";
import IncidentList from "./employee/IncidentList";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈 add state
  const [assets, setAssets] = useState([]);

  // 🔥 FETCH DATA FROM API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assets")
      .then((res) => setAssets(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ TOTAL ASSETS (QUANTITY COUNT)
  const totalAssets = assets.reduce((sum, asset) => sum + asset.quantity, 0);

  // ✅ (OPTIONAL FUTURE LOGIC)
  const assignedAssets = 0; // later from allocation
  const availableAssets = totalAssets - assignedAssets;

  // ✅ STATS (DYNAMIC)
  const stats = [
    { label: "Total Asset", value: totalAssets },
    { label: "Assets Assigned", value: assignedAssets },
    { label: "Assets Available", value: availableAssets },
    { label: "Assets Under Repair", value: 0 },
    { label: "Assets Due for Replacement", value: 0 },
  ];

  const toggleSidebar = () => {
    console.log('Toggling sidebar', !sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  }; // 👈 add function

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <Sidebar setActivePage={setActivePage} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* BACKDROP FOR MOBILE */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={toggleSidebar}></div>}

      {/* MAIN CONTENT */}
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />
        {/* 🔹 Breadcrumb */}
        {activePage === "Assets" || activePage === "Assets Allocation" ? (
          <Breadcrumb activePage={activePage} setActivePage={setActivePage} />
        ) : null}

        {/* DASHBOARD PAGE */}
        {activePage === "Dashboard" && (
          <div className="dashboard-body">
            {/* LEFT STATS */}
            <div className="stats-column">
              {stats.map((item, index) => (
                <div className="stat-card" key={index}>
                  <span className="stat-label">{item.label}</span>
                  <span className="stat-value">{item.value}</span>
                </div>
              ))}
            </div>

            {/* RIGHT SECTION */}
            <div className="right-section">
              <div className="chart-wrapper">
                <h3 className="card-title">Assets</h3>
                <div className="chart-box">
                  <AssetsBarChart />
                </div>
              </div>

              <div className="bottom-grid">
                <div className="pie-card">
                  <h3 className="card-title">Tickets Issued</h3>
                  <DonutChart />
                </div>

                <div className="repair-card">
                  <h3 className="card-title">Repair Due Dates</h3>

                  <table className="repair-table">
                    <tbody>
                      <tr>
                        <td>AS4568</td>
                        <td>Techfix Solutions</td>
                        <td className="progress">In Progress</td>
                      </tr>
                      <tr>
                        <td>AS0296</td>
                        <td>Techfix Solutions</td>
                        <td className="pending">Pending</td>
                      </tr>
                      <tr>
                        <td>AS2803</td>
                        <td>Techfix Solutions</td>
                        <td className="done">Completed</td>
                      </tr>
                      <tr>
                        <td>AS0628</td>
                        <td>Techfix Solutions</td>
                        <td className="progress">In Progress</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ASSETS PAGE */}
        {activePage === "Assets" && <AssetsData setActivePage={setActivePage} />}
        {activePage === "Assets Allocation" && <AssetsAllocation />}
        {activePage === "Incident Log" && <IncidentList />}
      </div>
    </div>
  );
}
