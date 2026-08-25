import express from "express";
import {
  createUser,
  getAllUser,
  getAllNewUser,
  removeUser,
  editUser,
  getOneUser,
  banUser,
} from "../controller/User.js";
const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.get("/", getAllUser);
userRouter.get("/new", getAllNewUser);
userRouter.delete("/delete/:id", removeUser);
userRouter.patch("/edit/:id", editUser);
userRouter.patch("/ban/:id", banUser);
userRouter.get("/one/:id", getOneUser);

export { userRouter };
