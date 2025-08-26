const BASE_URL = "http://127.0.0.1:8000/";
export const authAPI = {
    login: `${BASE_URL}api/token/`,
    logout: `${BASE_URL}logout/`, 
    self: `${BASE_URL}self/`,
    rolesConfig: `${BASE_URL}role-config/`,
};