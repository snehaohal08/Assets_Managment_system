import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import "../pages/AdminDashboard.css";  // We'll import the CSS for colors

const data = [
  { name: "Laptops", available: 70, inUse: 88 },
  { name: "Desktops", available: 66, inUse: 84 },
  { name: "Servers", available: 66, inUse: 83 },
  { name: "Networking Devices", available: 66, inUse: 84 },
  { name: "Software Assets", available: 66, inUse: 84 },
];

export default function AssetsBarChart() {
  return (
    <div className="assets-chart-container">
      {/* 1. Header with Title */}


      {/* 2. Recharts Bar Chart */}
      <ResponsiveContainer width="90%" height={290}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          barGap={0} /* Creates the side-by-side look */
        >
          {/* Axis styling: remove lines, customize fonts */}
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#333", fontSize: 13, fontWeight: "500" }} 
            interval={0} // Shows all labels
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#333", fontSize: 13, fontWeight: "500" }} 
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />

          {/* 3. The Custom Legend to match the image */}
<Legend 
  wrapperStyle={{ top: -45, right: 10 }}
  iconType="square"
  iconSize={15}
  payload={[
    { value: 'Asset Available', type: 'square', id: 'available', color: '#ffc1c1' },
    { value: 'Asset In Use', type: 'square', id: 'inUse', color: '#646cff' } // ✅ changed
  ]}
  formatter={(value) => (
    <span style={{ color: '#666', fontSize: '12px' }}>{value}</span>
  )}
/>

          {/* 4. The Bars with Specific Radius & Colors */}
          {/* radius={[top-left, top-right, bottom-right, bottom-left]} */}
          <Bar 
            dataKey="available" 
            fill="#c1c4ff" /* Matching light pink */
            radius={[10, 10, 10, 10]} // Perfectly rounded corners like the image
            barSize={30} 
          />
          <Bar 
            dataKey="inUse" 
            fill="#646cff" /* Matching brand orange */
            radius={[10, 10, 10, 10]} // Perfectly rounded corners like the image
            barSize={30} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}