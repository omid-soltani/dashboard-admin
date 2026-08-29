import mongoose, { isValidObjectId } from "mongoose";
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
    const { title, shortID, price, category, stock } = value;

    const product = await productModel.create({
      title,
      shortID,
      price,
      category,
      stock,
      sale: 0,
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

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }

    const { title, shortID, price, category, stock } = value;

    const product = await productModel.findByIdAndUpdate(
      id,
      {
        title,
        shortID,
        price,
        category,
        stock,
      },
      { returnDocument: "after" },
    );
    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }
    return res
      .status(200)
      .json({ data: product, message: "product updated successfully :))" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getOneProduct = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }
  try {
    const product = await productModel.findById(id).lean().select("-_id");
    if (product) {
      return res
        .status(200)
        .json({ data: product, message: "Product retrieved successfully :))" });
    }
    return res
      .status(400)
      .json({ message: "Product not found with this id :((" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }
    const product = await productModel.findByIdAndDelete(id);
    if (product) {
      return res
        .status(200)
        .json({ message: "Product removed successfully :))" });
    }
    return res
      .status(400)
      .json({ message: "Product not found with this id :((" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

export {
  createProduct,
  getAllProduct,
  getLowStockProducts,
  getMostSaleProducts,
  editProduct,
  getOneProduct,
  removeProduct,
};
