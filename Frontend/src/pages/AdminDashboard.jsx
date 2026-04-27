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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assets, setAssets] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:5000/api/assets-db")   // ✅ FIXED
    .then((res) => setAssets(res.data))
    .catch((err) => console.log(err));
}, []);

  // ✅ TOTAL = number of rows
const totalAssets = assets?.length || 0;
// console.log("Assets Data:", assets);

  const assignedAssets = 0;
  const availableAssets = totalAssets - assignedAssets;

  const stats = [
    { label: "Total Asset", value: totalAssets },
    { label: "Assets Assigned", value: assignedAssets },
    { label: "Assets Available", value: availableAssets },
    { label: "Assets Under Repair", value: 0 },
    { label: "Assets Due for Replacement", value: 0 },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">

      <Sidebar
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />

        {(activePage === "Assets" || activePage === "Assets Allocation") && (
          <Breadcrumb activePage={activePage} setActivePage={setActivePage} />
        )}

        {activePage === "Dashboard" && (
          <div className="dashboard-body">

            <div className="stats-column">
              {stats.map((item, index) => (
                <div className="stat-card" key={index}>
                  <span>{item.label}</span>
                  <h3>{item.value}</h3>
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
                  <h3>Tickets</h3>
                  <DonutChart />
                </div>

                <div className="repair-card">
                  <h3>Repair</h3>
                </div>
              </div>
            </div>

          </div>
        )}

        {activePage === "Assets" && <AssetsData />}
        {activePage === "Assets Allocation" && <AssetsAllocation />}
        {activePage === "Incident Log" && <IncidentList />}
      </div>
    </div>
  );
}