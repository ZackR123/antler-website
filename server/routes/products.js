const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT p.*, pi.image_url AS primary_image FROM products p LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE ORDER BY p.id ASC",
    );

    const products = result.rows.map((product) => ({
      ...product,
      image: product.primary_image,
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

    const productResult = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [productId],
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    const imageResult = await pool.query(
      `
        SELECT
          id,
          image_url,
          display_order,
          is_primary
        FROM product_images
        WHERE product_id = $1
        ORDER BY display_order ASC, id ASC
      `,
      [productId],
    );

    const product = productResult.rows[0];

    res.json({
      ...product,
      image:
        imageResult.rows.find((image) => image.is_primary)?.image_url || null,
      images: imageResult.rows,
    });
  } catch (error) {
    console.error("Error fetching product:", error);

    res.status(500).json({
      error: "Failed to fetch product",
    });
  }
});
module.exports = router;
