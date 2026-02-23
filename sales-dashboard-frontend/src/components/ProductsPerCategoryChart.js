import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";

const colors = ["#667eea", "#764ba2", "#43cea2", "#185a9d", "#ff9966"];

const ProductsPerCategoryChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:5000/api/products/categories")
      .then((res) => {
        const formatted = res.data.map((item) => ({
          category: item.category || "Unknown",
          total_products: parseInt(item.total_products || 0),
        }));

        setData(formatted);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load data");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        Products per Category
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : data.length === 0 ? (
        <Typography>No category data available</Typography>
      ) : (
        <Box sx={{ width: "100%", height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total_products" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
};

export default ProductsPerCategoryChart;