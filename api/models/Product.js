const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // name: String,
  // description: String,
  // price: Number,
  // other fields like category, image URLs, etc.
  title: String,
  quantity: Number,
  offer: String,
  oldPrice: Number,
  price: Number,
  image: String,
  color: String,
  size: String,
  // other fields like category, image URLs, etc.
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
