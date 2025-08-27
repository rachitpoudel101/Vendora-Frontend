const BASE_URL = "http://127.0.0.1:8000/";
export const InventoryApi = {
  fetchCategory: `${BASE_URL}category/`,
  getCatagory: (id: number | string) => `${BASE_URL}category/${id}/`,
  updateCategory: (category_id: number | string) => `${BASE_URL}category/${category_id}/`,

  fetchProduct: `${BASE_URL}product/`,
  getProduct: (id: number | string) => `${BASE_URL}product/${id}/`,
  updateProduct: (product_id: number | string) => `${BASE_URL}product/${product_id}/`,
};
