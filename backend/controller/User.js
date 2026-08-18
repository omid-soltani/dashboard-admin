import mongoose from "mongoose";
import express from "express";

import { userSchema } from "../validation/User.js";
import { userModel } from "../model/User.js";

const createUser = async (req, res) => {
  const { value, error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await userModel.create(value);
  if (user) {
    return res.status(201).json({ message: "User created successfully" });
  }

  res.status(400).json({ message: "User creation failed" });
};

export { createUser };
