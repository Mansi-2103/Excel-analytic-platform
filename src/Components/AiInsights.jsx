import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const generateInsights = async () => {
    if (!file) {
      return alert("Please select an Excel file.");
    }

    setLoading(true);
    setError(null);
    setInsights([]);

    try {
      // File to arrayBuffer
      const data = await file.arrayBuffer();

      // Parse Excel
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Send to backend for processing
      const res = await axios.post("http://localhost:5000/api/ai-insights", { data: jsonData }, {
        headers: { "Content-Type": "application/json" },
      });

      setInsights(res.data.insights);
    } catch (err) {
      console.error(err);
      setError("Failed to generate insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md ml-auto mr-auto border rounded-md shadow-md space-y-4">
      <h2 className="text-2xl font-semibold">AI Insights</h2>

      <div className="bg-gray-50 p-4 rounded-md">
        <input
          id="file"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={loading}
          onClick={generateInsights}
          className={`w-full mt-4 py-2 font-semibold rounded-md ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          } text-gray-50 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? "Generating…" : "Analyze and Generate Insights"}
        </button>
      </div>

      {error && <p className="text-red-500 font-semibold">{error}</p>}

      {loading && <p>Generating insights, please wait...</p>}

      {!loading && !error && insights.length === 0 && (
        <p className="text-gray-500">No insights yet</p>
      )}

      {insights.length > 0 && (
        <ul className="bg-gray-100 p-4 rounded-md space-y-2">
          {insights.map((insight, idx) => (
            <li
              key={idx}
              className="p-2 bg-gray-50 rounded-md shadow-md"
            >
              {insight}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default AIInsights;
