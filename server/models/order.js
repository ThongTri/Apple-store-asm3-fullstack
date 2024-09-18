const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String, required: [true, "Please provide your Address!"] },
    cart: [
      { product: { type: Schema.Types.ObjectId, ref: "Product" }, qty: Number },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
