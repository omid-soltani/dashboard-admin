import mongoose from "mongoose";
import express from "express";

import { userSchema } from "../validation/User.js";
import { userModel } from "../model/User.js";

const createUser = async (req, res) => {
  const { value, error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ massage: error.details[0].message });
  }

  const user = await userModel.create(value);
  if (user) {
    return res.status(201).json({ message: "User created successfully" });
  }

  res.status(400).json({ message: "User creation failed" });
};
const getAllUser = async (req, res) => {
  try {
    const allUsers = await userModel.find().lean();
    return res.status(200).json({ message: "successful", data: allUsers });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const editUser = async (req, res) => {};

const getAllNewUser = async (req, res) => {
  try {
    const allNewUsers = await userModel.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({ message: "successful", data: allNewUsers });
  } catch (e) {
    return res.status(500).json(e);
  }
};

export { createUser, getAllUser, getAllNewUser };
