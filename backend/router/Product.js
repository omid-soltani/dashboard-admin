import express from "express";
import {
  createProduct,
  getAllProduct,
  getLowStockProducts,
  getMostSaleProducts,
} from "../controller/Product.js";

const ProductRouter = express.Router();

ProductRouter.post("/create", createProduct);
ProductRouter.get("/", getAllProduct);
ProductRouter.get("/lowStock", getLowStockProducts);
ProductRouter.get("/mostSale", getMostSaleProducts);

export { ProductRouter };
