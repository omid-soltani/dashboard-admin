import mongoose from "mongoose";
import express from "express";
import { productModel } from "../model/Product.js";
import { productSchema } from "../validation/Product.js";

const createProduct = async (req, res) => {
  console.log(req.body);
  const { error, value } = productSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errors });
  }
  const { title, shortID, price, category, sizes, stock } = value;

  const product = await productModel.create({
    title,
    shortID,
    price,
    category,
    sizes,
    stock,
  });
  return res
    .status(200)
    .json({ data: product, message: "Product created successfully :))" });
};

export { createProduct };
