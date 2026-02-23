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

const colors = ["#667eea", "#764ba2", "#6a11cb", "#2575fc"];

const AvgRatingChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/avg-rating")
      .then(res => {
        const formatted = res.data.map(item => ({
          category: item.category || "Unknown",
          avg_rating: parseFloat(item.avg_rating)
        }));
        setData(formatted);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        Category-wise Average Rating
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="avg_rating" radius={[10, 10, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
};

export default AvgRatingChart;