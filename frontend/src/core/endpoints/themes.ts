const BASE_URL = import.meta.env.VITE_BASE_URL;

export const themesAPI = {
  list: `${BASE_URL}themes/`,
  current: `${BASE_URL}themes/current/`,
  detail: (id: string | number) => `${BASE_URL}themes/${id}/`,
  update: (id: string | number) => `${BASE_URL}themes/${id}/`,
  partialUpdate: (id: string | number) => `${BASE_URL}themes/${id}/`,
};
