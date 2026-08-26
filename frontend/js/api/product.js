const baseUrl = "http://localhost:4000";

const getAllProduct = async () => {
  const res = await fetch(`${baseUrl}/Products`);
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

export { getAllProduct, getLowStockProducts, getMostSaleProducts };
