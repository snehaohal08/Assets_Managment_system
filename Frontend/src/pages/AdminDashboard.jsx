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
import EmployeeList from "./employee/EmployeeList";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalAssets: 0,
    assignedAssets: 0,
    remainingAssets: 0,
    underRepair: 0,
    Incidents: 0,
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // FETCH DASHBOARD STATS
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assets-stats")
      .then((res) => {
        console.log("API DATA:", res.data);
        setStats(res.data);
      })
      .catch((err) => console.log("API Error:", err));
  }, []);

  // DASHBOARD CARDS
  const cards = [
    {
      label: "Total Assets",
      value: stats.totalAssets,
    },
    {
      label: "Assigned Assets",
      value: stats.assignedAssets,
    },
    {
      label: "Remaining Assets",
      value: stats.remainingAssets,
    },
    {
      label: "Need Repair",
      value: stats.underRepair,
    },
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
            {/* STATS CARDS */}
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
                      <td>Total Assets</td>
                      <td>{stats.totalAssets}</td>
                    </tr>

                    <tr>
                      <td>Assigned</td>
                      <td>{stats.assignedAssets}</td>
                    </tr>

                    <tr>
                      <td>Remaining</td>
                      <td>{stats.remainingAssets}</td>
                    </tr>

                    <tr>
                      <td>Need Repair</td>
                      <td>{stats.underRepair}</td>
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
        {activePage === "Employee List" && <EmployeeList />}
      </div>
    </div>
  );
}
