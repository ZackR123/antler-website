const pool = require("./db");
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const requireAdmin = require("./middleware/auth");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Antler API is running");
});


pool.query("SELECT NOW()")
  .then((result) => {
    console.log("Database connected:", result.rows[0]);
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

  app.get("/api/admin/test", requireAdmin, (req, res) => {
  res.json({
    message: "Admin authentication works",
    admin: req.admin,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});