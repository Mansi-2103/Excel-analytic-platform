import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectAxis from "./SelectAxis.jsx";
import ChartRenderer from "./ChartRenderer.jsx"; // <-- updated import
import ThreeChart from "./ThreeChart.jsx";

function ChartDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [excelData, setExcelData] = useState([]);
  const [axes, setAxes] = useState({ x: "", y: "", z: "" });
  const [chartMode, setChartMode] = useState("2D"); // "2D" or "3D"
  const [chartType, setChartType] = useState("line"); // line | bar | scatter | pie

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

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">📊 Excel Chart Viewer</h2>

      {columns.length > 0 && (
        <div className="space-y-4">
          <SelectAxis columns={columns} onAxisChange={handleAxisChange} />

          <div className="flex flex-wrap items-center gap-4">
            {/* Chart Mode Buttons */}
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-md font-semibold ${
                  chartMode === "2D"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() => setChartMode("2D")}
              >
                Show 2D Chart
              </button>
              <button
                className={`px-4 py-2 rounded-md font-semibold ${
                  chartMode === "3D"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-green-100"
                }`}
                onClick={() => setChartMode("3D")}
              >
                Show 3D Chart
              </button>
            </div>

            {/* 2D Chart Type Selector */}
            {chartMode === "2D" && (
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              >
                <option value="line">📈 Line Chart</option>
                <option value="bar">📊 Bar Chart</option>
                <option value="scatter">🔵 Scatter Plot</option>
                <option value="pie">🥧 Pie Chart</option>
              </select>
            )}
          </div>
        </div>
      )}

      {/* Render 2D charts */}
      {chartMode === "2D" && axes.x && axes.y && (
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-700">
            {chartType === "line" && "📈 Line Chart"}
            {chartType === "bar" && "📊 Bar Chart"}
            {chartType === "scatter" && "🔵 Scatter Plot"}
            {chartType === "pie" && "🥧 Pie Chart"}
          </h3>
          <ChartRenderer
            data={excelData}
            xKey={axes.x}
            yKey={axes.y}
            type={chartType}
          />
        </div>
      )}

      {/* Render 3D chart */}
      {chartMode === "3D" && axes.x && axes.y && axes.z && (
        <div>
          <h3 className="text-xl font-semibold mb-2 text-green-700">🧊 3D Chart</h3>
          <ThreeChart data={excelData} xKey={axes.x} yKey={axes.y} zKey={axes.z} />
        </div>
      )}

      {/* Warning if 3D axes not selected */}
      {chartMode === "3D" && (!axes.x || !axes.y || !axes.z) && (
        <p className="text-sm text-red-500">Please select X, Y, and Z axes for 3D chart.</p>
      )}
    </div>
  );
}

export default ChartDashboard;
