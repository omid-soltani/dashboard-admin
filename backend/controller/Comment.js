import mongoose from "mongoose";
import express from "express";
import { commentModel } from "../model/Comment.js";
import { commentSchema } from "../validation/Comment.js";
import { productModel } from "../model/Product.js";

const createComment = async (req, res) => {
  const { id: productId } = req.params;
  console.log(req.body);
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json({
      message: "ایدی محصول نامعتبر است",
    });
  }

  const { error, value } = commentSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((err) => err.message),
    });
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(404).json({
      message: "محصول مورد نظر یافت نشد",
    });
  }

  const { text, userId } = value;

  const newComment = await commentModel.create({
    text,
    productId,
    userId,
  });

  return res.status(201).json({
    data: newComment,
    message: "Comment created successfully",
  });
};

export { createComment };
