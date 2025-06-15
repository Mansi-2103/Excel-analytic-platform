import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartRenderer from "./ChartRenderer";
import SelectAxis from "./SelectAxis";
import ThreeChart from "./ThreeChart";

function AnalyzeData() {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);

  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [zAxis, setZAxis] = useState("");
  const [chartType, setChartType] = useState("line");

  // ✅ Load uploaded Excel file list from correct endpoint
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/upload-history")
      .then((res) => setFiles(res.data))
      .catch((err) => console.error("History fetch error:", err));
  }, []);

  // ✅ Load selected file content
  useEffect(() => {
    if (!selectedFileId) return;
    axios
      .get(`http://localhost:5000/api/excel/${selectedFileId}`)
      .then((res) => {
        setExcelData(res.data);
        setColumns(Object.keys(res.data[0] || {}));
        setXAxis("");
        setYAxis("");
        setZAxis("");
      })
      .catch((err) => console.error("Excel data fetch error:", err));
  }, [selectedFileId]);

  const prepareChartData = () => {
    if (!xAxis || !yAxis || excelData.length === 0) return null;
    const labels = excelData.map((row) => row[xAxis]);
    const dataPoints = excelData.map((row) => Number(row[yAxis]));
    return {
      labels,
      datasets: [
        {
          label: `${yAxis} vs ${xAxis}`,
          data: dataPoints,
          fill: false,
          backgroundColor: "rgba(34,197,94,0.6)",
          borderColor: "rgba(34,197,94,1)",
        },
      ],
    };
  };

  const chartData = prepareChartData();

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-green-800 mb-6">📊 Analyze Data</h2>

        {/* File Selector */}
        <div className="mb-6">
          <label className="block font-semibold text-green-700 mb-2">Select Uploaded Excel File</label>
          <select
            className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={selectedFileId}
            onChange={(e) => setSelectedFileId(e.target.value)}
          >
            <option value="">-- Select a file --</option>
            {files.length === 0 ? (
              <option disabled>⚠️ No uploaded files found</option>
            ) : (
              files.map((file) => (
                <option key={file._id} value={file._id}>
                  {file.filename}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Axis and Chart Type Selectors */}
        {excelData.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-6">
            <SelectAxis label="X-Axis" options={columns} value={xAxis} onChange={setXAxis} />
            <SelectAxis label="Y-Axis" options={columns} value={yAxis} onChange={setYAxis} />
            <SelectAxis label="Z-Axis (3D only)" options={columns} value={zAxis} onChange={setZAxis} />
            <div>
              <label className="block font-semibold text-green-700 mb-2">Chart Type</label>
              <select
                className="border border-green-300 rounded px-2 py-1 w-full"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              >
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="scatter">Scatter Plot</option>
                <option value="3d">3D Chart</option>
              </select>
            </div>
          </div>
        )}

        {/* Chart Display */}
        <div className="border-2 border-green-200 rounded-lg min-h-[300px] flex items-center justify-center p-4 bg-green-100">
          {!xAxis || !yAxis ? (
            <p className="text-green-700">🎯 Select X and Y axes to display the chart.</p>
          ) : chartType === "3d" ? (
            <ThreeChart data={excelData} xKey={xAxis} yKey={yAxis} zKey={zAxis} />
          ) : (
            <ChartRenderer type={chartType} data={chartData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyzeData;
