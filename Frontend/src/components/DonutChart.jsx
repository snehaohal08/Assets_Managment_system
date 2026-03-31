import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Open", value: 65 },
  { name: "Closed", value: 35 },
];

const COLORS = ["#c1c4ff", "#646cff"]; // light + dark purple

export default function DonutChart() {
  return (
    <div className="donut-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={50} // 🔽 reduce
            outerRadius={70} // 🔽 reduce
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* CENTER TEXT */}
      <div className="donut-center">
        <h2>65%</h2>
        <p>Open</p>
      </div>
    </div>
  );
}
