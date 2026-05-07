import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import axios from "axios";

import SideBar_emp from "../components/SideBar_emp";
import { useIncident } from "../context/IncidentContext";

import EmployeeIncidentForm from "./employee/EmployeeIncidentForm";
import IncidentList from "./employee/IncidentList";

import "./EmployeeDashbord.css";

export default function EmployeeDashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  // ✅ SAFE USER FETCH
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ✅ REDIRECT IF NOT LOGGED IN
  useEffect(() => {
    if (!user?.empCode) {
      window.location.href = "/"; // login page
    }
  }, []);

  // ✅ backend stats
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0
  });

  const { incidents } = useIncident();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ✅ API CALL (employee specific)
  useEffect(() => {
    if (!user?.empCode) return;

    axios
      .get(`http://localhost:5000/api/employee-stats/${user.empCode}`)
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  // ✅ FILTER INCIDENTS
  const myIncidents = incidents.filter(
    (i) => i.employeeId === user?.empCode
  );

  return (
    <div className="employee-dashboard-container">

      <SideBar_emp
        toggleSidebar={toggleSidebar}
        isOpen={sidebarOpen}
        setActivePage={setActivePage}
      />

      <div className="employee-main-content">

        {/* HEADER */}
        {activePage === "Dashboard" && (
          <div className="employee-header">
            <div className="header-left">
              <FaBars className="toggle-icon" onClick={toggleSidebar} />

              <div className="header-text">
                <h2>Employee Dashboard</h2>
                <p>Track your incidents & manage requests</p>
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD CARDS */}
        {activePage === "Dashboard" && (
          <>
            <div className="employee-cards">

              <div className="employee-card blue">
                <h3>Total Incidents</h3>
                <h2>{stats.total}</h2>
              </div>

              <div className="employee-card green">
                <h3>Completed</h3>
                <h2>{stats.closed}</h2>
              </div>

              <div className="employee-card orange">
                <h3>Pending</h3>
                <h2>{stats.open}</h2>
              </div>

              <div className="employee-card purple">
                <h3>In Progress</h3>
                <h2>{stats.inProgress}</h2>
              </div>

            </div>

            {/* ✅ ONLY THIS EMPLOYEE DATA */}
            {/* <div className="employee-table-section">
              <IncidentList
                role="employee"
                employeeId={user?.empCode}  // 🔥 IMPORTANT
              />
            </div> */}
          </>
        )}

        {/* RAISE INCIDENT */}

        {activePage === "Raise Incident" && (
          <EmployeeIncidentForm employeeId={user?.empCode} />
        )}
        {activePage === "My Incidents" && <IncidentList role="employee" employeeId={user?.empCode} />}

      </div>
    </div>
  );
}