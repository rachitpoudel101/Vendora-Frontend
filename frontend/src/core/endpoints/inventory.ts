const BASE_URL = import.meta.env.VITE_BASE_URL;
export const InventoryApi = {
  fetchCategory: `${BASE_URL}category/`,
  getCatagory: (id: number | string) => `${BASE_URL}category/${id}/`,
  updateCategory: (category_id: number | string) =>
    `${BASE_URL}category/${category_id}/`,

  fetchProduct: `${BASE_URL}product/`,
  getProduct: (id: number | string) => `${BASE_URL}product/${id}/`,
  updateProduct: (product_id: number | string) =>
    `${BASE_URL}product/${product_id}/`,
};
