const express = require("express");
const pool = require("../db");
const requireAdmin = require("../middleware/auth");

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

router.post("/", requireAdmin, async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      status = "Available",
      category,
    } = req.body;

    if (!title || price === undefined || price === null) {
      return res.status(400).json({
        error: "Title and price are required",
      });
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        error: "Price must be a valid non-negative number",
      });
    }

    const allowedStatuses = ["Available", "Sold"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: "Invalid product status",
      });
    }

    const result = await pool.query(
      `
        INSERT INTO products
          (title, description, price, status, category)
        VALUES
          ($1, $2, $3, $4, $5)
        RETURNING *
      `,
      [
        title.trim(),
        description?.trim() || null,
        numericPrice,
        status,
        category?.trim() || null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating product:", error);

    res.status(500).json({
      error: "Failed to create product",
    });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        error: "Invalid product ID",
      });
    }

    const {
      title,
      description,
      price,
      status,
      category,
    } = req.body;

    if (!title || price === undefined || price === null) {
      return res.status(400).json({
        error: "Title and price are required",
      });
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        error: "Price must be a valid non-negative number",
      });
    }

    const allowedStatuses = ["Available", "Sold"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: "Invalid product status",
      });
    }

    const result = await pool.query(
      `
        UPDATE products
        SET
          title = $1,
          description = $2,
          price = $3,
          status = $4,
          category = $5,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING *
      `,
      [
        title.trim(),
        description?.trim() || null,
        numericPrice,
        status,
        category?.trim() || null,
        productId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating product:", error);

    res.status(500).json({
      error: "Failed to update product",
    });
  }
});


router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        error: "Invalid product ID",
      });
    }

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting product:", error);

    res.status(500).json({
      error: "Failed to delete product",
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
