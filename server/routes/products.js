const express = require("express");

const router = express.Router();

const products = [
  {
    id: 1,
    title: "Mule Deer Antler",
    description: "Naturally shed mule deer antler.",
    price: 85,
    image: "/products/AntlerImgTest.png",
    status: "Available",
    category: "kitchen-knobs",
  },
  {
    id: 2,
    title: "Elk Shed",
    description: "Large naturally shed elk antler.",
    price: 140,
    image: "/products/AntlerImgTest.png",
    status: "Available",
    category: "cabinet-pulls",
  },
  {
    id: 3,
    title: "Whitetail Antler",
    description: "Clean whitetail shed antler.",
    price: 65,
    image: "/products/AntlerImgTest.png",
    status: "Available",
    category: "furniture-pulls",
  },
  {
    id: 4,
    title: "Large Elk Antler",
    description: "Heavy naturally shed elk antler with good color.",
    price: 175,
    image: "/products/AntlerImgTest.png",
    status: "Available",
    category: "drawer-pulls",
  },
];

router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;