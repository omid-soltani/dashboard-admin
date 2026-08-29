import {
  getAllProduct,
  getLowStockProducts,
  getMostSaleProducts,
  getOneProduct,
  editProduct,
  createProduct,
  deleteProduct,
} from "./api/product.js";
import {
  patternAllProduct,
  patternLowStockProducts,
  patternTopSellerProducts,
} from "./funcs/product.js";
import { openModal, closeModal } from "./utile/utile.js";
import { SweetAlert } from "./sweetAlert/sweetAlert.js";

const d = document;
let productEditId = null;

// modal edit products
const editProductModal = d.getElementById("edit-product-modal");
const editCategoryInput = d.getElementById("edit-category-input");
const editStockInput = d.getElementById("edit-stock-input");
const editPriceInputInput = d.getElementById("edit-price-input");
const editIdInput = d.getElementById("edit-sku-input");
const editNameInput = d.getElementById("edit-productName-input");
const editProductFormBtn = d.getElementById("edit-product-form");

// modal new products
const nameInputEdit = d.getElementById("np-name");
const IdInputEdit = d.getElementById("np-sku");
const PriceInputEdit = d.getElementById("np-price");
const CategoryInputEdit = d.getElementById("np-category");
const stockInputEdit = d.getElementById("np-stock");
const openNewProductModalBtn = d.getElementById("open-new-product-modal");
const newProductModal = d.getElementById("new-product-modal");
const newProductFormBtn = d.getElementById("new-product-form");

// show detail product => mobile only
const productDetailsModal = d.getElementById("product-details-modal");
const priceDetailProduct = d.getElementById("pd-price");
const stockDetailProduct = d.getElementById("pd-stock");
const catDetailProduct = d.getElementById("pd-category");
const statusDetailProduct = d.getElementById("pd-status");

// close Btn
const modalCloseBtn = d.querySelectorAll(".modal-close-btn");

const fillEditProductInputs = (product) => {
  editCategoryInput.value = product.category;
  editStockInput.value = product.stock;
  editPriceInputInput.value = product.price;
  editIdInput.value = product.shortID;
  editNameInput.value = product.title;
};
const fillProductDetail = (product) => {
  priceDetailProduct.textContent = product.price;
  stockDetailProduct.textContent = product.stock;
  catDetailProduct.textContent = product.category;
  statusDetailProduct.textContent = "in stock";
};
const editModalOpen = async (id) => {
  try {
    openModal(editProductModal);
    productEditId = id;
    const res = await getOneProduct(id);
    const product = await res.json();
    console.log(product);
    if (!res.ok) {
      throw new Error(product.message);
    }
    fillEditProductInputs(product.data);
  } catch (err) {
    SweetAlert(err.message, "error");
  }
};
window.editModalOpen = editModalOpen;

const removeProductHandler = (id) => {
  SweetAlert(
    "Are you sure you want to delete the product?",
    "warning",
    true,
    true,
    "yes",
    "no",
    async (res) => {
      if (res.isConfirmed) {
        try {
          const result = await deleteProduct(id);
          const data = await result.json();
          if (!result.ok) {
            throw new Error(data.message);
          }
          SweetAlert("Product deletion was successful.", "success", false);
          renderProducts();
        } catch (err) {
          SweetAlert(err.message, "error");
        }
      }
    },
  );
};
window.removeProductHandler = removeProductHandler;

const showDetailProduct = async (id) => {
  try {
    const res = await getOneProduct(id);
    const product = await res.json();
    if (!res.ok) {
      throw new Error(product.message);
    }
    fillProductDetail(product.data);
    openModal(productDetailsModal);
    fillEditProductInputs(product.data);
  } catch (err) {
    SweetAlert(err.message, "error");
  }
};
window.showDetailProduct = showDetailProduct;

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

modalCloseBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal(editProductModal);
    closeModal(newProductModal);
    closeModal(productDetailsModal);
  });
});

editProductFormBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const productInfo = {
    category: editCategoryInput.value.trim(),
    stock: editStockInput.value.trim(),
    price: editPriceInputInput.value.trim(),
    shortID: editIdInput.value.trim(),
    title: editNameInput.value.trim(),
  };
  try {
    const res = await editProduct(productEditId, productInfo);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    SweetAlert("Product edit was successful.", "success");
    closeModal(editProductModal);
    renderProducts();
  } catch (err) {
    SweetAlert(err.message, "error");
  }
});

newProductFormBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const newUser = {
    category: CategoryInputEdit.value.trim(),
    stock: stockInputEdit.value.trim(),
    price: PriceInputEdit.value.trim(),
    shortID: IdInputEdit.value.trim(),
    title: nameInputEdit.value.trim(),
  };
  try {
    const res = await createProduct(newUser);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    SweetAlert("Product create was successful.", "success");
    closeModal(newProductModal);
    renderProducts();
  } catch (err) {
    SweetAlert(err.message, "error");
  }
});

openNewProductModalBtn.addEventListener("click", () => {
  openModal(newProductModal);
});
