import express from "express";
import { createUser, getAllUser, getAllNewUser } from "../controller/User.js";
const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.get("/", getAllUser);
userRouter.get("/new", getAllNewUser);
// userRouter.get("/create", creteUser)

export { userRouter };
