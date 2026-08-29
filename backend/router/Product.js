import express from "express";
import {
  createProduct,
  getAllProduct,
  getLowStockProducts,
  getMostSaleProducts,
  editProduct,
  getOneProduct,
  removeProduct,
} from "../controller/Product.js";

const ProductRouter = express.Router();

ProductRouter.post("/create", createProduct);
ProductRouter.get("/", getAllProduct);
ProductRouter.get("/lowStock", getLowStockProducts);
ProductRouter.get("/mostSale", getMostSaleProducts);
ProductRouter.get("/one/:id", getOneProduct);
ProductRouter.patch("/edit/:id", editProduct);
ProductRouter.delete("/delete/:id", removeProduct);

export { ProductRouter };
