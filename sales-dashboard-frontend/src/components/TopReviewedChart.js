import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,Bar,  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell} from "recharts";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";

const colors = ["#ff6a00", "#ee0979", "#36d1dc", "#5f2c82", "#11998e"];

const TopReviewedChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/top-reviewed")
      .then(res => {
        const formatted = res.data.map(item => ({
          product_name: item.product_name,
          total_reviews: parseInt(item.total_reviews)
        }));
        setData(formatted);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        Top Reviewed Products
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
              <XAxis
                dataKey="product_name"
                angle={-25}
                textAnchor="end"
                interval={0}
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total_reviews" radius={[10, 10, 0, 0]}>
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

export default TopReviewedChart;