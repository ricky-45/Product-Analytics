import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";

const DiscountHistogram = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/discount-distribution")
      .then((res) => {

        const buckets = {
          "0-10%": 0,
          "11-20%": 0,
          "21-30%": 0,
          "31-40%": 0,
          "41%+": 0
        };

        res.data.forEach((item) => {
          const value =
            parseFloat(item.discount_percentage || item.discount || 0);

          if (value <= 10) buckets["0-10%"]++;
          else if (value <= 20) buckets["11-20%"]++;
          else if (value <= 30) buckets["21-30%"]++;
          else if (value <= 40) buckets["31-40%"]++;
          else buckets["41%+"]++;
        });

        const formatted = Object.keys(buckets).map((key) => ({
          range: key,
          count: buckets[key]
        }));

        setData(formatted);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        Discount Distribution
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
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#00c6ff"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
};

export default DiscountHistogram;