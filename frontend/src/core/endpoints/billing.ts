const BASE_URL = "http://127.0.0.1:8000/";
export const BillingApi = {
  fetchBill: `${BASE_URL}bill/`,
  getBill: (id: number | string) => `${BASE_URL}bill/${id}/`,
  updateBill: (id: number | string) => `${BASE_URL}bill/${id}/`,
};
