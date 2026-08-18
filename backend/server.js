import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import { userRouter } from "./router/user.js";
import { commentRouter } from "./router/Comment.js";
import { ProductRouter } from "./router/Product.js";

const server = express();

await connectDB();

server.use(cors());
server.use(express.json());

server.use("/users", userRouter);
server.use("/Comments", commentRouter);
server.use("/Products", ProductRouter);

server.use((req, res) => {
  res.status(404).json({ message: "path not found" });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
