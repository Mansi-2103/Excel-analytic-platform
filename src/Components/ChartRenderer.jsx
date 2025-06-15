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
  DoughnutController,
  PolarAreaController,
  RadarController,
} from "chart.js";

import { Line, Bar, Scatter, Pie, Radar, Doughnut, PolarArea } from "react-chartjs-2";

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
  RadialLinearScale,
  DoughnutController,
  PolarAreaController,
  RadarController
);

function ChartRenderer({ data, xKey, yKey, type }) {
  if (!data.length || !xKey || !yKey) return null;

  // Prepare labels and values
  const labels = data.map((row) => row[xKey]);
  const values = data.map((row) => Number(row[yKey]) || 0);

  // Common dataset config
  const commonDataset = {
    label: `${yKey} vs ${xKey}`,
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
    borderColor: "rgba(75,192,192,1)",
    fill: false,
  };

  switch (type) {
    case "pie": {
      const pieData = {
        labels,
        datasets: [{ ...commonDataset, hoverOffset: 30 }],
      };
      return <Pie data={pieData} />;
    }

    case "doughnut": {
      const doughnutData = {
        labels,
        datasets: [{ ...commonDataset, hoverOffset: 30 }],
      };
      return <Doughnut data={doughnutData} />;
    }

    case "polarArea": {
      const polarData = {
        labels,
        datasets: [{ ...commonDataset }],
      };
      return <PolarArea data={polarData} />;
    }

    case "radar": {
      const radarData = {
        labels,
        datasets: [
          {
            label: `${yKey} vs ${xKey}`,
            data: values,
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
          },
        ],
      };
      return <Radar data={radarData} />;
    }

    case "scatter": {
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
    }

    case "bar": {
      const barData = {
        labels,
        datasets: [{ ...commonDataset, fill: true }],
      };
      return <Bar data={barData} />;
    }

    case "line":
    default: {
      const lineData = {
        labels,
        datasets: [{ ...commonDataset }],
      };
      return <Line data={lineData} />;
    }
  }
}

export default ChartRenderer;
