import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

function UploadExcel() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(""); // Clear message on new file select
  };

  const handleUpload = () => {
    if (!file) {
      setMessage("⚠️ Please select an Excel file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet);

      if (parsedData.length > 0) {
        navigate("/dashboard/chart", { state: { data: parsedData } });
      } else {
        setMessage("⚠️ Parsed Excel file is empty.");
      }
    };

    reader.readAsArrayBuffer(file);
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
