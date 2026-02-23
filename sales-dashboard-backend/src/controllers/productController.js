const pool = require("../config/db");
const csv = require("csv-parser");
const stream = require("stream");

const uploadProducts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);

    const results = [];

    bufferStream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        for (let row of results) {
          await pool.query(
            `INSERT INTO products 
            (product_id, product_name, category, discounted_price,
             actual_price, discount_percentage, rating, rating_count,
             about_product, user_name, review_title, review_content)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
            [
              row.product_id?.toString().trim(),
              row.product_name?.toString().trim(),
              row.category?.toString().trim(),           
              row.discounted_price ? parseFloat(row.discounted_price) : null,
              row.actual_price ? parseFloat(row.actual_price) : null,
              row.discount_percentage ? parseFloat(row.discount_percentage) : null,         
              row.rating ? parseFloat(row.rating) : null,
              row.rating_count ? parseInt(row.rating_count) : null,            
              row.about_product || null,
              row.user_name || null,
              row.review_title || null,
              row.review_content || null,
            ]
          );
        }
        res.json({ message: "Products uploaded successfully" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Upload failed"});
  }
};

const getProductsPerCategory = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT category, COUNT(*) AS total_products
      FROM products
      GROUP BY category
      ORDER BY total_products DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching category data" });
  }
};

const getTopReviewedProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT product_name, COUNT(review_content) AS total_reviews
      FROM products
      WHERE review_content IS NOT NULL
      GROUP BY product_name
      ORDER BY total_reviews DESC
      LIMIT 5
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching top reviewed products" });
  }
};


const getDiscountDistribution = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT discount_percentage
      FROM products
      WHERE discount_percentage IS NOT NULL
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error fetching data" });
  }
};


const getAvgRatingByCategory = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT category, ROUND(AVG(rating)::numeric, 2) AS avg_rating
      FROM products
      WHERE rating IS NOT NULL
      GROUP BY category
      ORDER BY avg_rating DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching ratings" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { category, search, minRating } = req.query;

    let query = `SELECT * FROM products WHERE 1=1`;
    const values = [];

    if (category) {
      values.push(category);
      query += ` AND category = $${values.length}`;
    }

    if (search) {
      values.push(`%${search}%`);
      query += ` AND product_name ILIKE $${values.length}`;
    }

    if (minRating) {
      values.push(minRating);
      query += ` AND rating >= $${values.length}`;
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

module.exports = { uploadProducts, getProductsPerCategory, getTopReviewedProducts, getDiscountDistribution, getAvgRatingByCategory};