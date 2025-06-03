import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SelectAxis from "./SelectAxis.jsx";
import LineChart from "./LineChart";
import ThreeChart from "./ThreeChart";

function ChartDashboard() {
  const location = useLocation();
  const [excelData, setExcelData] = useState([]);
  const [axes, setAxes] = useState({ x: "", y: "", z: "" });

  // Get parsed data from navigation state on mount
  useEffect(() => {
    if (location.state?.data) {
      setExcelData(location.state.data);
    }
  }, [location.state]);

  const handleAxisChange = (axis, value) => {
    setAxes((prev) => ({ ...prev, [axis]: value }));
  };

  const columns = excelData.length ? Object.keys(excelData[0]) : [];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Excel Chart Viewer</h2>

      {/* Axis Selector */}
      {columns.length > 0 && (
        <SelectAxis columns={columns} onAxisChange={handleAxisChange} />
      )}

      {/* 2D Chart */}
      {axes.x && axes.y && (
        <div>
          <h3 className="text-lg font-semibold">2D Line Chart</h3>
          <LineChart data={excelData} xKey={axes.x} yKey={axes.y} />
        </div>
      )}

      {/* 3D Chart */}
      {axes.x && axes.y && axes.z && (
        <div>
          <h3 className="text-lg font-semibold">3D Chart</h3>
          <ThreeChart data={excelData} xKey={axes.x} yKey={axes.y} zKey={axes.z} />
        </div>
      )}
    </div>
  );
}

export default ChartDashboard;
