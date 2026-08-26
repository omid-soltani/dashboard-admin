import mongoose from "mongoose";
import express from "express";
import { productModel } from "../model/Product.js";
import { productSchema } from "../validation/Product.js";

const createProduct = async (req, res) => {
  try {
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
      sale,
    });
    return res
      .status(200)
      .json({ data: product, message: "Product created successfully :))" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await productModel.find().lean();
    return res
      .status(200)
      .json({ data: products, message: "get product successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMostSaleProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ sale: -1 }).limit(5);
    return res
      .status(200)
      .json({ data: products, message: "get product successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getLowStockProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ stock: 1 }).limit(5);
    return res
      .status(200)
      .json({ data: products, message: "get product successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createProduct,
  getAllProduct,
  getLowStockProducts,
  getMostSaleProducts,
};
