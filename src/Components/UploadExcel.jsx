import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadExcel = ({ onDataParsed }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

  }

  return (
    <div className="p-8 bg-white rounded shadow-md max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Upload Excel File</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="block w-full"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default UploadExcel;
