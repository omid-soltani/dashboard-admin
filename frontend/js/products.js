import {
  getAllProductApi,
  getLowStockProductsApi,
  getMostSaleProductsApi,
  getOneProductApi,
  editProductApi,
  createProductApi,
  deleteProductApi,
} from "./api/product.js";
import {
  patternAllProduct,
  patternLowStockProducts,
  patternTopSellerProducts,
} from "./funcs/product.js";
import {
  openModal,
  closeModal,
  addItemsInfoToDom,
  setUrlSearchParam,
  changePagination,
  searchHand,
  debounce,
  getUrlSearchParam,
  perPage,
  paginationNextAndPrevHandler,
  hideModal,
} from "./utile/utile.js";
import { SweetAlert } from "./sweetAlert/sweetAlert.js";
import { d } from "./constant/constant.js";

let productEditId = null;
let allProduct = [];
let searchValue = "";

const allProductNum = d.querySelectorAll(".all-product-num");

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

// wrappers
const allProductsWrapper = d.getElementById("products-tbody");
const lowStockProductsWrapper = d.getElementById("low-stock-wrapper");
const topSaleProductsWrapper = d.getElementById("top-Sale-products-wrapper");

// close Btn
const modalCloseBtn = d.querySelectorAll(".modal-close-btn");

// page buttons
const paginationWrapper = d.getElementById("pagination-wrapper");
const pageBtns = d.querySelectorAll(".page-btn");

// search input
const productSearchInput = d.getElementById("product-search");

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
    const res = await getOneProductApi(id);
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

const removeProductsHandler = async (id) => {
  try {
    const result = await deleteProductApi(id);
    const data = await result.json();
    if (!result.ok) {
      throw new Error(data.message);
    }
    SweetAlert("Product deletion was successful.", "success", false);
    renderProducts();
  } catch (err) {
    SweetAlert(err.message, "error");
  }
};
const removeProduct = (id) => {
  SweetAlert(
    "Are you sure you want to delete the product?",
    "warning",
    true,
    true,
    "yes",
    "no",
    async (res) => {
      if (res.isConfirmed) {
        removeProductsHandler(id);
        searchValue = "";
        productSearchInput.value = "";
      }
    },
  );
};
window.removeProduct = removeProduct;

const showDetailProductHandler = async (id) => {
  try {
    const res = await getOneProductApi(id);
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
const showDetailProduct = async (id) => {
  showDetailProductHandler(id);
};
window.showDetailProduct = showDetailProduct;

const editProductsHandler = async (object) => {
  try {
    const res = await editProductApi(productEditId, object);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    SweetAlert("Product edit was successful.", "success");
    hideModal(editProductModal);
    renderProducts();
    searchValue = "";
    productSearchInput.value = "";
  } catch (err) {
    SweetAlert(err.message, "error");
  }
};

const renderProducts = async () => {
  try {
    const [resAllProduct, resLowStockProducts, resMostSaleProducts] =
      await Promise.all([
        getAllProductApi(),
        getLowStockProductsApi(),
        getMostSaleProductsApi(),
      ]);
    allProduct = await resAllProduct.json();
    const lowStockProducts = await resLowStockProducts.json();
    const mostSaleProducts = await resMostSaleProducts.json();

    if (
      !resAllProduct.ok ||
      !resLowStockProducts.ok ||
      !resMostSaleProducts.ok
    ) {
      throw new Error("Failed to fetch Products");
    }
    setUrlSearchParam("page", 1);

    allProductNum.forEach((productNum) => {
      productNum.textContent = allProduct.data.length;
    });
    addItemsInfoToDom(
      allProduct.data,
      allProductsWrapper,
      patternAllProduct,
      true,
    );
    addItemsInfoToDom(
      lowStockProducts.data,
      lowStockProductsWrapper,
      patternLowStockProducts,
    );
    addItemsInfoToDom(
      mostSaleProducts.data,
      topSaleProductsWrapper,
      patternTopSellerProducts,
    );
  } catch (err) {
    SweetAlert(err.message, "error");
  }
};

window.addEventListener("load", async () => {
  renderProducts();
});

modalCloseBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    closeModal(event);
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
  editProductsHandler(productInfo);
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
    const res = await createProductApi(newUser);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    SweetAlert("Product create was successful.", "success");
    hideModal(newProductModal);
    renderProducts();
    searchValue = "";
    productSearchInput.value = "";
  } catch (err) {
    SweetAlert(err.message, "error");
  }
});

openNewProductModalBtn.addEventListener("click", () => {
  openModal(newProductModal);
});

paginationWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-link-btn")) {
    const page = e.target.dataset.page;
    changePagination(
      page,
      allProduct.data.slice(),
      "title",
      searchValue,
      allProductsWrapper,
      patternAllProduct,
    );
  }
});

productSearchInput.addEventListener("keyup", (e) => {
  searchValue = e.currentTarget.value;
  setUrlSearchParam("page", 1);

  debounce(async () => {
    const searchProducts = searchHand(
      allProduct.data.slice(),
      "title",
      searchValue,
    );

    addItemsInfoToDom(
      searchProducts,
      allProductsWrapper,
      patternAllProduct,
      true,
    );
  })();
});

pageBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const type = e.currentTarget.dataset.type;
    paginationNextAndPrevHandler(
      type,
      allProduct.data,
      "title",
      searchValue,
      allProductsWrapper,
      patternAllProduct,
    );
  });
});
