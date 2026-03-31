import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AssetsBarChart from "../components/AssetsBarChart";
import DonutChart from "../components/DonutChart";
import AssetsData from "./assets/AssetsData";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const stats = [
    { label: "Total Asset", value: "2800" },
    { label: "Assets Assigned", value: "1800" },
    { label: "Assets Available", value: "700" },
    { label: "Assets Under Repair", value: "400" },
    { label: "Assets Due for Replacement", value: "50" },
  ];

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <Sidebar setActivePage={setActivePage} />

      {/* MAIN CONTENT */}
      <div className="main-content">

        <Header />

        {/* PAGE SWITCHING */}
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
        {activePage === "Assets" && <AssetsData/>}

      </div>
    </div>
  );
}