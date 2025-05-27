import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/excel/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Upload successful!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload file.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Excel File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xlsx,.xls" onChange={handleChange} />
        <button type="submit" style={{ marginLeft: "10px" }}>Upload</button>
      </form>
    </div>
  );
};

export default Upload;
