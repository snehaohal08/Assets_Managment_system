import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const IncidentContext = createContext();

export const IncidentProvider = ({ children }) => {
  const [incidents, setIncidents] = useState([]);

  // 🔥 FETCH FROM BACKEND
  const fetchIncidents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/incidents");
      setIncidents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  // 🔥 ADD INCIDENT
const addIncident = async (data) => {
  try {
    await axios.post("http://localhost:5000/api/incidents", data);
    await fetchIncidents();
  } catch (err) {
    console.log(err);
  }
};
const updateIncident = async (id, data) => {
  try {
    await axios.put(`http://localhost:5000/api/incidents/${id}`, {
      status: data.status,
    });

    fetchIncidents();
  } catch (err) {
    console.log(err);
  }
};
  // 🔥 DELETE INCIDENT
  const deleteIncident = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/incidents/${id}`);
      fetchIncidents();
    } catch (err) {
      console.log(err);
    }
  };
    return (
  <IncidentContext.Provider value={{ incidents, addIncident, deleteIncident, fetchIncidents,updateIncident  }}>
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncident = () => useContext(IncidentContext);