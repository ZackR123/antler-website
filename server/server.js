const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Antler API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});