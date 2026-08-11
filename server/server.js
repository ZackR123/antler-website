const express = require("express");

const app = express();
const PORT = 5001;

app.get("/", (req, res) => {
  res.send("Antler API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});