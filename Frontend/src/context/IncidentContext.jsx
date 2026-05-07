import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const IncidentContext = createContext();

export const IncidentProvider = ({ children }) => {

  // ================= STATE =================
  const [incidents, setIncidents] = useState([]);

  // ================= FETCH INCIDENTS =================
  const fetchIncidents = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/incidents"
      );

      setIncidents(res.data);

    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchIncidents();
  }, []);

  // ================= ADD INCIDENT =================
  const addIncident = async (data) => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/incidents",
        data
      );

      // 🔥 refresh all dashboards
      await fetchIncidents();

      return {
        success: true,
        message: response.data.message || "Incident Created Successfully ✅"
      };

    } catch (err) {

      console.log("ADD ERROR:", err);

      return {
        success: false,
        message: "Incident Creation Failed ❌"
      };
    }
  };

  // ================= UPDATE INCIDENT =================
  const updateIncident = async (id, data) => {

    try {

      const response = await axios.put(
        `http://localhost:5000/api/incidents/${id}`,
        {
          status: data.status,
        }
      );

      // 🔥 refresh
      await fetchIncidents();

      return {
        success: true,
        message: response.data.message || "Incident Updated ✅"
      };

    } catch (err) {

      console.log("UPDATE ERROR:", err);

      return {
        success: false,
        message: "Incident Update Failed ❌"
      };
    }
  };

  // ================= DELETE INCIDENT =================
  const deleteIncident = async (id) => {

    try {

      const response = await axios.delete(
        `http://localhost:5000/api/incidents/${id}`
      );

      // 🔥 refresh
      await fetchIncidents();

      return {
        success: true,
        message: response.data.message || "Incident Deleted ✅"
      };

    } catch (err) {

      console.log("DELETE ERROR:", err);

      return {
        success: false,
        message: "Incident Delete Failed ❌"
      };
    }
  };

  // ================= PROVIDER =================
  return (
    <IncidentContext.Provider
      value={{
        incidents,
        fetchIncidents,
        addIncident,
        updateIncident,
        deleteIncident,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};

// ================= CUSTOM HOOK =================
export const useIncident = () => useContext(IncidentContext);