const express = require("express");
const router = express.Router();

const {
  uploadProducts, getProductsPerCategory, getTopReviewedProducts, getDiscountDistribution, getAvgRatingByCategory} = require("../controllers/productController");
const upload = require("../services/uploadService");
router.post("/upload", upload.single("file"), uploadProducts);
router.get("/categories", getProductsPerCategory);
router.get("/top-reviewed", getTopReviewedProducts);
router.get("/discount-distribution", getDiscountDistribution);
router.get("/avg-rating", getAvgRatingByCategory);

module.exports = router;