const baseUrl = "http://localhost:4000";

const getAllProductApi = async () => {
  const res = await fetch(`${baseUrl}/Products`);
  return res;
};

const createProductApi = (data) => {
  const res = fetch(`${baseUrl}/Products/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
};
const getLowStockProductsApi = async () => {
  const res = await fetch(`${baseUrl}/Products/lowStock`);
  return res;
};
const getMostSaleProductsApi = async () => {
  const res = await fetch(`${baseUrl}/Products/mostSale`);
  return res;
};

const getOneProductApi = async (id) => {
  const res = await fetch(`${baseUrl}/Products/one/${id}`);
  return res;
};

const editProductApi = (id, product) => {
  const res = fetch(`${baseUrl}/Products/edit/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return res;
};

const deleteProductApi = async (id) => {
  const res = await fetch(`${baseUrl}/Products/delete/${id}`, {
    method: "DELETE",
  });
  return res;
};

export {
  createProductApi,
  editProductApi,
  getAllProductApi,
  getLowStockProductsApi,
  getMostSaleProductsApi,
  getOneProductApi,
  deleteProductApi,
};
