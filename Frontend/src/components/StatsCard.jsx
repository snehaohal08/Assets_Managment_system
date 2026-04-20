import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="stat-card">
      <span className="stat-label">{title}</span>
      <h2 className="stat-value" style={{ color: '#6366f1' }}>
        {value.toLocaleString()}
      </h2>
    </div>
  );
};

export default StatsCard;