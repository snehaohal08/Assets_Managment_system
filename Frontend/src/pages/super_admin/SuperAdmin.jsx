import React, { useState, useEffect } from "react";
import axios from "axios";

import Sidebar_super from "../../components/Sidebar_super";
import Header from "../../components/Header";

import AssetsBarChart from "../../components/AssetsBarChart";
import DonutChart from "../../components/DonutChart";

import AssetsAllocation from "../assets/AssetsAllocation";
import EmployeeList from "../employee/EmployeeList";
import AssetsTable from "./AssetsTable";
import IncidentList from "../employee/IncidentList";

import "./superadmin_d.css";

export default function SuperAdmin() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalAssets: 0,
    assignedAssets: 0,
    remainingAssets: 0,
    underRepair: 0,
    Incidents: 0,
  });

  const toggleSidebar = () =>
    setSidebarOpen(!sidebarOpen);

  // FETCH DASHBOARD STATS
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assets-stats")
      .then((res) => {
        console.log(res.data);
        setStats(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // DASHBOARD CARDS
  const statsCards = [
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
    <div className="superadmin-dashboard-container">

      <Sidebar_super
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="superadmin-main-content">

        <Header toggleSidebar={toggleSidebar} />

        {activePage === "Dashboard" && (
          <>
            {/* STATS CARDS */}
            <div className="stats-grid">
              {statsCards.map((s, i) => (
                <div className="stat-card" key={i}>
                  <span>{s.label}</span>
                  <h2>{s.value}</h2>
                </div>
              ))}
            </div>

            {/* DASHBOARD GRID */}
            <div className="dashboard-layout-grid">

              {/* BAR CHART */}
              <div className="graph-box">
                <h3>Assets Overview</h3>
                <AssetsBarChart />
              </div>

              {/* DONUT CHART */}
              <div className="pie-box">
                <h3>Allocation Status</h3>
                <DonutChart />
              </div>

              {/* SUMMARY */}
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

        {/* OTHER PAGES */}
        {activePage === "Assets" && (
          <AssetsTable />
        )}

        {activePage === "Assets Allocation" && (
          <AssetsAllocation />
        )}

        {activePage === "Employee List" && (
          <EmployeeList />
        )}

        {activePage === "Incident Log" && (
          <IncidentList role="superadmin" />
        )}

      </div>
    </div>
  );
}