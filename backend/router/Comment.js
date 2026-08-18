import express from "express";
import { createComment } from "../controller/Comment.js";

const commentRouter = express.Router();

commentRouter.post("/create/:id", createComment);

export { commentRouter };
