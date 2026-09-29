import express from "express";
import {
  createComment,
  getComments,
  getBanComment,
  getNewComment,
  replyComment,
  getOneComment,
} from "../controller/Comment.js";

const commentRouter = express.Router();

commentRouter.get("/", getComments);
commentRouter.get("/one/:id", getOneComment);
commentRouter.get("/banned", getBanComment);
commentRouter.get("/new", getNewComment);
commentRouter.post("/create/:id", createComment);
commentRouter.put("/reply/:id", replyComment);

export { commentRouter };
