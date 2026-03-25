const BASE_URL = import.meta.env.VITE_BASE_URL;

export const suppliersAPI = {
  list: `${BASE_URL}supliers/`,
  detail: (id: number) => `${BASE_URL}supliers/${id}/`,
  create: `${BASE_URL}supliers/`,
  update: (id: number) => `${BASE_URL}supliers/${id}/`,
  delete: (id: number) => `${BASE_URL}supliers/${id}/`,
};
