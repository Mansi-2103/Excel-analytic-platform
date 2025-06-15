import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/upload-history");
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching history", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file history?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/upload-history/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          📜 Upload History
        </h2>
        <button
          onClick={fetchHistory}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <ArrowPathIcon className="h-5 w-5" />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading history...</div>
      ) : history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-lg rounded-md overflow-hidden">
            <thead>
              <tr className="bg-blue-100 text-gray-800">
                <th className="p-3 border">#</th>
                <th className="p-3 border">📄 File Name</th>
                <th className="p-3 border">👤 Uploaded By</th>
                <th className="p-3 border">📅 Upload Date</th>
                <th className="p-3 border">🗑️ Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, idx) => (
                <tr key={item._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 border text-center">{idx + 1}</td>
                  <td className="p-3 border">{item.filename}</td>
                  <td className="p-3 border text-center">{item.uploadedBy}</td>
                  <td className="p-3 border text-center">
                    {new Date(item.uploadDate).toLocaleString()}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          No upload history found.
        </div>
      )}
    </div>
  );
}

export default History;
