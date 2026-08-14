const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");

    const products = result.rows.map((product) => ({
      ...product,
      image: product.image_url,
    }));

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        error: "Invalid product ID",
      });
    }

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    const product = result.rows[0];

    res.json({
      ...product,
      image: product.image_url,
    });
  } catch (error) {
    console.error("Error fetching product:", error);

    res.status(500).json({
      error: "Failed to fetch product",
    });
  }
});

module.exports = router;
