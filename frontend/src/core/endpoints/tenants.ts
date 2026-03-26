const BASE_URL = import.meta.env.VITE_BASE_URL;

export const tenantsAPI = {
  list: `${BASE_URL}tenants/`,
  create: `${BASE_URL}tenants/`,
  detail: (id: number | string) => `${BASE_URL}tenants/${id}/`,
  update: (id: number | string) => `${BASE_URL}tenants/${id}/`,
  delete: (id: number | string) => `${BASE_URL}tenants/${id}/`,
};
