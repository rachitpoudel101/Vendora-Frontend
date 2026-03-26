const BASE_URL = import.meta.env.VITE_BASE_URL;
export const UserApi = {
  fetchUsers: `${BASE_URL}users/`,
  getUser: (id: number | string) => `${BASE_URL}users/${id}/`,
  updateUserRole: (user_id: number | string) =>
    `${BASE_URL}role-update/${user_id}/`,
  restoreUser: (user_id: number | string) => `${BASE_URL}restore/${user_id}/`,
  changePassword: `${BASE_URL}change-password/`,
  changePasswordUser: (user_id: number | string) =>
    `${BASE_URL}change-password/${user_id}/`,
};
