import { isValidObjectId, mongoose } from "mongoose";
import express from "express";

import { userSchema } from "../validation/User.js";
import { userModel } from "../model/User.js";

const createUser = async (req, res) => {
  try {
    const { value, error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await userModel.create(value);
    if (user) {
      return res.status(201).json({ message: "User created successfully" });
    }

    res.status(400).json({ message: "User creation failed" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "This email already exists.",
      });
    }

    return res.status(500).json({ message: "server error" });
  }
};
const getAllUser = async (req, res) => {
  try {
    const allUsers = await userModel.find().lean();
    return res.status(200).json({ message: "successful", data: allUsers });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const getAllNewUser = async (req, res) => {
  try {
    const allNewUsers = await userModel.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({ message: "successful", data: allNewUsers });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const user = await userModel.findByIdAndDelete(id);
    if (user) {
      return res.status(200).json({ message: "User removed successfully :))" });
    }
    return res.status(400).json({ message: "User not found with this id :((" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const { error, value } = userSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }

    const { userName, email, password, role } = value;

    const user = await userModel.findByIdAndUpdate(
      id,
      {
        userName,
        email,
        password,
        role,
      },
      { returnDocument: "after" },
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res
      .status(200)
      .json({ data: user, message: "User updated successfully :))" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const user = await userModel.findById(id).lean().select("-_id");
    if (user) {
      return res
        .status(200)
        .json({ data: user, message: "User retrieved successfully :))" });
    }
    return res.status(400).json({ message: "User not found with this id :((" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const banUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isBan === 1) {
      user.isBan = 0;
    } else {
      user.isBan = 1;
    }
    await user.save();

    return res.status(200).json({
      message: user.isBan
        ? "User banned successfully"
        : "User unbanned successfully",
      banned: user.isBan,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

export {
  createUser,
  getAllUser,
  getAllNewUser,
  removeUser,
  editUser,
  getOneUser,
  banUser,
};
