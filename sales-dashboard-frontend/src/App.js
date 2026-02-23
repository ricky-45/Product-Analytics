import TopReviewedChart from "./components/TopReviewedChart";
import DiscountHistogram from "./components/DiscountHistogram";
import AvgRatingChart from "./components/AvgRatingChart";
import ProductsPerCategoryChart from "./components/ProductsPerCategoryChart";
import FileUpload from "./components/FileUpload";
import DashboardHeader from "./components/DashBoardHeader";

import { useState, useEffect } from "react";
import axios from "axios";

import {
  TextField,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Box,
  Container,
} from "@mui/material";

function App() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState("");
  const [_products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:5000/api/products", {
        params: { category, search, minRating }
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category, search, minRating]);

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", py: 4 }}>
      <Container>
      <DashboardHeader />

 
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Search Product"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                fullWidth
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Furniture">Furniture</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Min Rating"
                type="number"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>

        {/* 🔹 Loading Spinner */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <ProductsPerCategoryChart />
            <TopReviewedChart />
            <DiscountHistogram />
            <AvgRatingChart />
          </>
        )}

        {/* 🔹 File Upload */}
        <Box sx={{ mt: 4 }}>
          <FileUpload />
        </Box>

      </Container>
    </Box>
  );
}

export default App;