import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { Line, Bar, Scatter, Pie } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  RadialLinearScale
);

function ChartRenderer({ data, xKey, yKey, type }) {
  // Prepare chart data depending on the type

  if (!data.length || !xKey || !yKey) return null;

  if (type === "pie") {
    // Pie chart uses labels and data differently: labels are categories, data is numeric values per category
    // For pie, use xKey as label, yKey as values

    const labels = data.map((row) => row[xKey]);
    const values = data.map((row) => Number(row[yKey]) || 0);

    const pieData = {
      labels,
      datasets: [
        {
          label: yKey,
          data: values,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#E7E9ED",
          ],
          hoverOffset: 30,
        },
      ],
    };

    return <Pie data={pieData} />;
  }

  // For line, bar, scatter charts:

  const commonData = {
    labels: data.map((row) => row[xKey]),
    datasets: [
      {
        label: `${yKey} vs ${xKey}`,
        data: data.map((row) => Number(row[yKey]) || 0),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  switch (type) {
    case "line":
      return <Line data={commonData} />;
    case "bar":
      return <Bar data={commonData} />;
    case "scatter":
      // Scatter needs {x, y} pairs instead of labels, so map differently
      const scatterData = {
        datasets: [
          {
            label: `${yKey} vs ${xKey}`,
            data: data.map((row) => ({
              x: Number(row[xKey]) || 0,
              y: Number(row[yKey]) || 0,
            })),
            backgroundColor: "rgba(75,192,192,1)",
          },
        ],
      };
      return <Scatter data={scatterData} />;
    default:
      return <Line data={commonData} />;
  }
}

export default ChartRenderer;
