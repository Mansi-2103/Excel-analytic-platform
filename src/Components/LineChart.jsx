import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function LineChart({ data, xKey, yKey }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!data.length || !xKey || !yKey) return;

    const ctx = chartRef.current.getContext("2d");

    // Destroy previous chart instance to prevent duplicates
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels: data.map((row) => row[xKey]),
        datasets: [
          {
            label: `${yKey} vs ${xKey}`,
            data: data.map((row) => row[yKey]),
            borderColor: "blue",
            backgroundColor: "rgba(0,0,255,0.1)",
            tension: 0.3,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          x: { title: { display: true, text: xKey } },
          y: { title: { display: true, text: yKey } },
        },
      },
    });
  }, [data, xKey, yKey]);

  return <canvas ref={chartRef} width={600} height={400} />;
}

export default LineChart;
