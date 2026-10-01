import mongoose, { isValidObjectId } from "mongoose";
import express from "express";

import { commentModel } from "../model/Comment.js";
import { commentSchema } from "../validation/Comment.js";
import { productModel } from "../model/Product.js";
import { userModel } from "../model/User.js";

const createComment = async (req, res) => {
  try {
    const { id: productId } = req.params;
    console.log(req.body);
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        message: "invalid productId",
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
        message: " product not find",
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
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await commentModel
      .find()
      .populate("userId", "userName email")
      .populate("productId", "title")
      .lean();

    console.log(JSON.stringify(comments, null, 2));
    return res.status(200).json({
      data: comments,
      message: "Comment get successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getBanComment = async (req, res) => {
  try {
    const comments = await commentModel
      .find({ status: "Banned" })
      .lean()
      .populate("userId", "userName email")
      .populate("productId", "title");
    return res.status(200).json({
      data: comments,
      message: "Banned comments get successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getNewComment = async (req, res) => {
  try {
    const comments = await commentModel
      .find({ status: "Pending" })
      .lean()
      .populate("userId", "userName email")
      .populate("productId", "title");
    return res.status(200).json({
      data: comments,
      message: "New comments get successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getOneComment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid comment id" });
    }
    const comment = await commentModel.findById(id);
    return res.status(200).json({ data: comment, message: "Comment get" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const replyComment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid comment id" });
    }
    const replyText = req.body.replyText;
    const comment = await commentModel.findByIdAndUpdate(id, {
      $set: {
        replyText: replyText,

        replied: replyText.length > 0 ? 1 : 0,
      },
    });

    return res.status(200).json({ data: comment, message: "Comment updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const banComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { isBan } = req.body;

    console.log(req.body);
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid comment id" });
    }
    const comment = await commentModel.findByIdAndUpdate(id, {
      $set: { status: +isBan ? "Approved" : "Banned" },
      ban: +isBan,
    });
    return res.status(200).json({ data: comment, message: "Comment banned" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export {
  createComment,
  getComments,
  getBanComment,
  getNewComment,
  replyComment,
  getOneComment,
  banComment,
};
