import mongoose from "mongoose";

const Model = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      maxLength: 50,
      minLength: 3,
    },
    price: {
      type: Number,
      required: true,
    },
    shortID: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    sale: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const productModel = mongoose.model("Product", Model);

export { productModel };
