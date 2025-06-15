import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectAxis from "./SelectAxis.jsx";
import ChartRenderer from "./ChartRenderer.jsx";
import ThreeChart from "./ThreeChart.jsx";
import * as htmlToImage from 'html-to-image';
import axios from 'axios';

function ChartDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [excelData, setExcelData] = useState([]);
  const [axes, setAxes] = useState({ x: "", y: "", z: "" });
  const [chartMode, setChartMode] = useState("2D");
  const [chartType, setChartType] = useState("line");
  const chartRef = useRef(null);

  useEffect(() => {
    if (location.state?.data?.length) {
      setExcelData(location.state.data);
    } else {
      navigate("/dashboard/upload");
    }
  }, [location.state, navigate]);

  const handleAxisChange = (axis, value) => {
    setAxes((prev) => ({ ...prev, [axis]: value }));
  };

  const columns = excelData.length > 0 ? Object.keys(excelData[0]) : [];

  const handleDownloadImage = async (format) => {
    if (chartRef.current) {
      try {
        const canvas = await htmlToImage.toCanvas(chartRef.current);
        const link = document.createElement('a');
        link.download = `chart.${format}`;
        link.href = canvas.toDataURL(`image/${format}`);
        link.click();

        // Dynamically fetch user from localStorage or auth context
        const user = localStorage.getItem("username") || "unknown_user";
        const fileName = `chart_${chartType}_${chartMode}`;

        // Save download history
        await axios.post("/api/download-history", {
          user,
          fileName,
          format
        }, {
          headers: {
            Authorization: "secret-token", // Replace with real token if using JWT
          },
        });
      } catch (err) {
        console.error("Failed to save download history:", err);
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-xl space-y-8 border border-green-300">
      <div className="text-right">
        <button
          className="text-xs px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800"
          onClick={() => document.documentElement.classList.toggle("dark")}
        >
          🌙 Toggle Dark Mode
        </button>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-4xl font-bold text-green-700">Excel Analytics Dashboard 📊</h2>
        <p className="text-gray-600">Visualize and explore your Excel data in 2D and 3D formats.</p>
      </div>

      {excelData.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm text-green-900">
          <p><strong>Rows:</strong> {excelData.length}</p>
          <p><strong>Columns:</strong> {columns.join(", ")}</p>
        </div>
      )}

      {columns.length > 0 && (
        <div className="space-y-6">
          <SelectAxis columns={columns} onAxisChange={handleAxisChange} chartMode={chartMode} />

          <div className="bg-gray-100 border rounded p-3 text-sm text-gray-800">
            <strong>Selected Axes:</strong><br />
            X: {axes.x || "Not selected"} | Y: {axes.y || "Not selected"}
            {chartMode === "3D" && ` | Z: ${axes.z || "Not selected"}`}
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-3">
              <button
                className={`px-4 py-2 rounded-md font-semibold transition ${
                  chartMode === "2D"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
                onClick={() => setChartMode("2D")}
              >
                2D Chart
              </button>
              <button
                className={`px-4 py-2 rounded-md font-semibold transition ${
                  chartMode === "3D"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
                onClick={() => setChartMode("3D")}
              >
                3D Chart
              </button>
            </div>

            {chartMode === "2D" && (
              <div className="flex flex-col">
                <select
                  className="border border-green-300 rounded-md px-3 py-2 text-sm text-green-800"
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                >
                  <option value="line">📈 Line Chart</option>
                  <option value="bar">📊 Bar Chart</option>
                  <option value="scatter">🔵 Scatter Plot</option>
                  <option value="pie">🥧 Pie Chart</option>
                  <option value="doughnut">🍩 Doughnut Chart</option>
                  <option value="polarArea">📍 Polar Area Chart</option>
                  <option value="radar">📡 Radar Chart</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="border-2 border-dashed border-green-400 rounded-md p-6 bg-green-50 min-h-[320px] flex justify-center items-center">
        <div ref={chartRef} className="w-full bg-white p-4 rounded-md">
          {chartMode === "2D" && axes.x && axes.y ? (
            <>
              <h3 className="text-xl font-semibold mb-3 text-green-700">
                {chartType === "line" && "📈 Line Chart"}
                {chartType === "bar" && "📊 Bar Chart"}
                {chartType === "scatter" && "🔵 Scatter Plot"}
                {chartType === "pie" && "🥧 Pie Chart"}
                {chartType === "doughnut" && "🍩 Doughnut Chart"}
                {chartType === "polarArea" && "📍 Polar Area Chart"}
                {chartType === "radar" && "📡 Radar Chart"}
              </h3>
              <ChartRenderer
                data={excelData}
                xKey={axes.x}
                yKey={axes.y}
                type={chartType}
              />
            </>
          ) : chartMode === "3D" && axes.x && axes.y && axes.z ? (
            <>
              <h3 className="text-xl font-semibold mb-3 text-green-700">🧊 3D Chart</h3>
              <ThreeChart
                data={excelData}
                xKey={axes.x}
                yKey={axes.y}
                zKey={axes.z}
              />
            </>
          ) : (
            <p className="text-sm text-green-600">
              Please select the necessary axes to view the chart.
            </p>
          )}
        </div>
      </div>

      {(chartMode === "2D" && axes.x && axes.y) || (chartMode === "3D" && axes.x && axes.y && axes.z) ? (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => handleDownloadImage("png")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            ⬇️ Download PNG
          </button>
          <button
            onClick={() => handleDownloadImage("jpeg")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            ⬇️ Download JPG
          </button>
        </div>
      ) : null}

      {chartMode === "3D" && (!axes.x || !axes.y || !axes.z) && (
        <p className="text-sm text-red-500 text-center">
          Please select all 3 axes (X, Y, Z) for 3D chart visualization.
        </p>
      )}
    </div>
  );
}

export default ChartDashboard;
