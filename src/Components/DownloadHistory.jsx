import React, { useEffect, useState } from "react";
import axios from "axios";

function DownloadHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/downloads/user@example.com")
      .then(res => {
        console.log("Fetched history:", res.data);
        setHistory(Array.isArray(res.data) ? res.data : res.data.history || []);
      })
      .catch(err => console.error("Error fetching download history:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <p className="text-gray-600">Loading download history…</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">📁 Download History</h2>
      {history.length === 0 ? (
        <p className="text-gray-600">No downloads yet.</p>
      ) : (
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-3 py-2 border">Downloaded At</th>
              <th className="px-3 py-2 border">Chart Type</th>
              <th className="px-3 py-2 border">Mode</th>
              <th className="px-3 py-2 border">X Axis</th>
              <th className="px-3 py-2 border">Y Axis</th>
              <th className="px-3 py-2 border">Z Axis</th>
              <th className="px-3 py-2 border">Format</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="text-center border-t border-gray-300 hover:bg-gray-50">
                <td className="px-3 py-2">{new Date(item.downloadedAt).toLocaleString()}</td>
                <td className="px-3 py-2">{item.chartType}</td>
                <td className="px-3 py-2">{item.chartMode}</td>
                <td className="px-3 py-2">{item.xAxis}</td>
                <td className="px-3 py-2">{item.yAxis}</td>
                <td className="px-3 py-2">{item.zAxis || "-"}</td>
                <td className="px-3 py-2">{item.format?.toUpperCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DownloadHistory;
