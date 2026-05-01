import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AssetsChart({ data = [] }) {
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: "Assets Count",
        data: data.map((item) => item.count),
        backgroundColor: ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}