const baseUrl = "http://localhost:4000";

const getAllProduct = async () => {
  const res = await fetch(`${baseUrl}/Products`);
  return res;
};

const createProduct = (data) => {
  const res = fetch(`${baseUrl}/Products/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
};
const getLowStockProducts = async () => {
  const res = await fetch(`${baseUrl}/Products/lowStock`);
  return res;
};
const getMostSaleProducts = async () => {
  const res = await fetch(`${baseUrl}/Products/mostSale`);
  return res;
};

const getOneProduct = async (id) => {
  const res = await fetch(`${baseUrl}/Products/one/${id}`);
  return res;
};

const editProduct = (id, product) => {
  const res = fetch(`${baseUrl}/Products/edit/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return res;
};

const deleteProduct = async (id) => {
  const res = await fetch(`${baseUrl}/Products/delete/${id}`, {
    method: "DELETE",
  });
  return res;
};

export {
  createProduct,
  editProduct,
  getAllProduct,
  getLowStockProducts,
  getMostSaleProducts,
  getOneProduct,
  deleteProduct,
};
