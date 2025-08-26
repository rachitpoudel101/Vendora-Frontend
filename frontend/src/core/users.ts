const BASE_URL = "http://127.0.0.1:8000/";
export const UserApi = {
  fetchUsers: `${BASE_URL}users/`,
  getUser: (id: number | string) => `${BASE_URL}users/${id}/`,
  updateUserRole: (user_id: number | string) =>
    `${BASE_URL}role-update/${user_id}/`,
};
