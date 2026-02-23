import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper } from "@mui/material";

const StatCard = ({ title, value }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      borderRadius: 3,
      textAlign: "center",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      color: "white"
    }}
  >
    <Typography variant="h5" fontWeight="bold">
      {value}
    </Typography>
    <Typography variant="body2">{title}</Typography>
  </Paper>
);

const DashboardHeader = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    avgRating: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const categoryRes = await axios.get(
          "http://localhost:5000/api/products/categories"
        );

        const avgRatingRes = await axios.get(
          "http://localhost:5000/api/products/avg-rating"
        );

        const totalProducts = categoryRes.data.reduce(
          (sum, item) => sum + parseInt(item.total_products || 0),
          0
        );

        const totalCategories = categoryRes.data.length;

        const avgRating =
          avgRatingRes.data.length > 0
            ? (
                avgRatingRes.data.reduce(
                  (sum, item) => sum + parseFloat(item.avg_rating || 0),
                  0
                ) / avgRatingRes.data.length
              ).toFixed(1)
            : 0;

        setStats({
          products: totalProducts,
          categories: totalCategories,
          avgRating: avgRating,
        });
      } catch (error) {
        console.error("Stats load error:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box
      sx={{
        mb: 5,
        p: 4,
        borderRadius: 4,
        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
        color: "white"
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Product Analytics Dashboard
      </Typography>

      <Typography sx={{ mb: 4 }}>
        Track product performance & insights in real-time
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard title="Total Products" value={stats.products} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Categories" value={stats.categories} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Average Rating" value={stats.avgRating} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHeader;