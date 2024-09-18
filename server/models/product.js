const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  short_desc: { type: String, required: true },
  long_desc: { type: String, required: true },
  count: { type: Number, required: true },
  img1: { type: String, required: true },
  img2: { type: String },
  img3: { type: String },
  img4: { type: String },
});
module.exports = mongoose.model("Product", productSchema);
