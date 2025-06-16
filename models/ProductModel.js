const mongoose = require("mongoose");

const ProductModelSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    timeframe: {
      type: String,
      required: true,
    },
    rating: {
      type: mongoose.Schema.ObjectId,
      ref: 'Rating',
      default: null
    },
    subText: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", ProductModelSchema);

module.exports = ProductModel;