import express from "express";
import { createUser } from "../controller/User.js";
const userRouter = express.Router();

userRouter.post("/create", createUser);
// userRouter.get("/create", creteUser)
// userRouter.get("/create", creteUser)
// userRouter.get("/create", creteUser)

export { userRouter };
