import React, { useState } from "react";
import axios from "axios"; // Add axios for HTTP requests
import { useNavigate } from "react-router-dom";

function UploadExcel() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select an Excel file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      // Optional: add user info, e.g., formData.append("user", "guest");

      // Send file to backend
      const response = await axios.post("http://localhost:5000/api/upload-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data.data;

      if (data && data.length > 0) {
        // Navigate to dashboard and pass parsed data
        navigate("/dashboard/chart", { state: { data } });
      } else {
        setMessage("⚠️ Uploaded Excel file is empty.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Failed to upload file.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Upload Excel File
        </h2>

        <p className="text-sm text-gray-600 text-center">
          Select an Excel file (.xls or .xlsx) to upload and analyze.
        </p>

        <label
          htmlFor="file-upload"
          className="block w-full cursor-pointer rounded-md border-2 border-dashed border-gray-300 py-10 text-center text-gray-400 hover:border-blue-500 hover:text-blue-600 transition"
        >
          {file ? (
            <span className="text-gray-700">{file.name}</span>
          ) : (
            <span>Click to select a file or drag and drop here</span>
          )}
          <input
            id="file-upload"
            type="file"
            accept=".xlsx, .xls"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {message && (
          <p className="text-center text-red-600 font-medium">{message}</p>
        )}

        <button
          onClick={handleUpload}
          className="w-full py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition"
        >
          Upload & Analyze
        </button>
      </div>
    </div>
  );
}

export default UploadExcel;
