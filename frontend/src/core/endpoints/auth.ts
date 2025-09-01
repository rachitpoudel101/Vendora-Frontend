const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("Auth API Base URL:", BASE_URL);
export const authAPI = {
  login: `${BASE_URL}api/token/`,
  logout: `${BASE_URL}logout/`,
  self: `${BASE_URL}self/`,
  rolesConfig: `${BASE_URL}role-config/`,
};
console.log(authAPI.login);
