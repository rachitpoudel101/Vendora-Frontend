const BASE_URL = import.meta.env.VITE_BASE_URL;
export const UnitApi = {
  fetchUnit: `${BASE_URL}unit/`,
  getUnit: (id: number | string) => `${BASE_URL}unit/${id}/`,
  updateunit: (unit_id: number | string) => `${BASE_URL}unit/${unit_id}/`,
};
