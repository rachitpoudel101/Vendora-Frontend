const BASE_URL = import.meta.env.VITE_BASE_URL;
export const UnitConfigApi = {
  fetchUnitConfig: `${BASE_URL}unit-configurations/`,
  getUnitConfig: (id: number | string) => `${BASE_URL}unit-configurations/${id}/`,
  updateunitConfig: (unit_id: number | string) => `${BASE_URL}unit-configurations/${unit_id}/`,
};
