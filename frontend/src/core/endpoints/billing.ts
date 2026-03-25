const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BillingApi = {
  fetchBill: `${BASE_URL}bill/`,
  getBill: (id: number | string) => `${BASE_URL}bill/${id}/`,
  updateBill: (id: number | string) => `${BASE_URL}bill/${id}/`,
};
