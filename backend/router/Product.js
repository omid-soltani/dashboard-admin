import express from "express";
import { createProduct } from "../controller/Product.js";

const ProductRouter = express.Router();

ProductRouter.post("/create", createProduct);

export { ProductRouter };
