import {
  getAllProduct,
  getLowStockProducts,
  getMostSaleProducts,
} from "./api/product.js";
import {
  patternAllProduct,
  patternLowStockProducts,
  patternTopSellerProducts,
} from "./funcs/product.js";
import { SweetAlert } from "./sweetAlert/sweetAlert.js";

const d = document;

const renderProducts = async () => {
  const allProductsWrapper = d.getElementById("products-tbody");
  const lowStockProductsWrapper = d.getElementById("low-stock-wrapper");
  const topSaleProductsWrapper = d.getElementById("top-Sale-products-wrapper");

  try {
    const [resAllProduct, resLowStockProducts, resMostSaleProducts] =
      await Promise.all([
        getAllProduct(),
        getLowStockProducts(),
        getMostSaleProducts(),
      ]);
    const allProduct = await resAllProduct.json();
    const lowStockProducts = await resLowStockProducts.json();
    const mostSaleProducts = await resMostSaleProducts.json();

    if (
      !resAllProduct.ok ||
      !resLowStockProducts.ok ||
      !resMostSaleProducts.ok
    ) {
      throw new Error("Failed to fetch Products");
    }
    allProductsWrapper.innerHTML = "";
    allProduct.data.forEach((product) => {
      allProductsWrapper.insertAdjacentHTML(
        "beforeend",
        patternAllProduct(product),
      );
    });

    lowStockProductsWrapper.innerHTML = "";
    console.log(lowStockProducts);
    lowStockProducts.data.forEach((product) => {
      lowStockProductsWrapper.insertAdjacentHTML(
        "beforeend",
        patternLowStockProducts(product),
      );
    });

    topSaleProductsWrapper.innerHTML = "";
    mostSaleProducts.data.forEach((product) => {
      topSaleProductsWrapper.insertAdjacentHTML(
        "beforeend",
        patternTopSellerProducts(product),
      );
    });
  } catch (err) {
    console.log(err.message);
    // SweetAlert(err.message, "error");
  }
};

window.addEventListener("load", async () => {
  renderProducts();
});
