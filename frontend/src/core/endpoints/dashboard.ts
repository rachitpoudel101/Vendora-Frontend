const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("Auth API Base URL:", BASE_URL);
export const dashboardAPI = {
  status: `${BASE_URL}stats/`,
};
