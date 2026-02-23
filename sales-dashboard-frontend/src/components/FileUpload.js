import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a CSV file!!!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      await axios.post(
        "http://localhost:5000/api/products/upload",
        formData
      );

      setMessage("File uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("File Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload Product Dataset
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadFileIcon />}
        >
          Choose CSV File
          <input
            type="file"
            hidden
            accept=".csv"
            onChange={handleFileChange}
          />
        </Button>

        {file && (
          <Typography variant="body2">
            Selected: {file.name}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </Box>

      {message && (
        <Typography sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Paper>
  );
};

export default FileUpload;