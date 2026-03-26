import axios from "axios";
import { UserApi } from "@/core/endpoints/users";
import { authAPI } from "@/core/endpoints/auth";
import { defineStore } from "pinia";

function getToken() {
  return localStorage.getItem("token");
}

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [] as any[],
    currentUser: null as any,
    roles: [] as any[],
    error: null as string | null,
    loading: false,
  }),
  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(UserApi.fetchUsers, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.users = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Error fetching users";
        console.error("Error fetching users:", err);
        return [];
      } finally {
        this.loading = false;
      }
    },

    async fetchUserById(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(UserApi.getUser(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.currentUser = res.data;
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail || `Error fetching user with id ${id}`;
        console.error(`Error fetching user with id ${id}:`, err);
        throw new Error("Failed to fetch user");
      } finally {
        this.loading = false;
      }
    },

    async createUser(
      user: {
        username: string;
        role: string;
        email?: string;
        first_name?: string;
        last_name?: string;
        password: string;
        tenant?: number | null;
      },
      tokenOverride?: string,
    ) {
      this.loading = true;
      this.error = null;
      try {
        const token = tokenOverride || getToken();
        const res = await axios.post(
          UserApi.fetchUsers,
          {
            username: user.username,
            role: user.role,
            email: user.email || "",
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            password: user.password,
            tenant: user.tenant || null,
          },
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          },
        );
        this.users.push(res.data);
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to create user";
        console.error("Error creating user:", err);
        throw new Error("Failed to create user");
      } finally {
        this.loading = false;
      }
    },

    async updateUser(
      id: number | string,
      updates: {
        username?: string;
        role?: string;
        email?: string;
        first_name?: string;
        last_name?: string;
        password?: string;
      },
    ) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.patch(UserApi.getUser(id), updates, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const index = this.users.findIndex((user) => user.id === id);
        if (index !== -1) {
          this.users[index] = res.data;
        }
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail || `Failed to update user with id ${id}`;
        console.error(`Error updating user with id ${id}:`, err);
        throw new Error("Failed to update user");
      } finally {
        this.loading = false;
      }
    },

    async fetchRoles() {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(authAPI.rolesConfig, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.roles = res.data.roles;
        return res.data.roles;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to fetch roles";
        console.error("Error fetching roles:", err);
        throw new Error("Failed to fetch roles");
      } finally {
        this.loading = false;
      }
    },

    async updateUserRoles(userId: number | string, payload: any) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.post(UserApi.updateUserRole(userId), payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        return res.data.roles;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail ||
          `Failed to update user roles for user ${userId}`;
        console.error(`Error updating user roles for user ${userId}:`, err);
        throw new Error("Failed to update user roles");
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.delete(UserApi.getUser(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.users = this.users.filter((user) => user.id !== id);
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail || `Failed to delete user with id ${id}`;
        console.error(`Error deleting user with id ${id}:`, err);
        throw new Error("Failed to delete user");
      } finally {
        this.loading = false;
      }
    },

    async restoreUser(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.post(
          UserApi.restoreUser(id),
          {},
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        );
        const index = this.users.findIndex((user) => user.id === id);
        if (index !== -1) {
          this.users[index] = res.data;
        }
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail || `Failed to restore user with id ${id}`;
        console.error(`Error restoring user with id ${id}:`, err);
        throw new Error("Failed to restore user");
      } finally {
        this.loading = false;
      }
    },

    async changePassword(password: string, userId?: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const url = userId
          ? UserApi.changePasswordUser(userId)
          : UserApi.changePassword;
        const res = await axios.post(
          url,
          { password },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        );
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.error || "Failed to change password";
        console.error("Error changing password:", err);
        throw new Error("Failed to change password");
      } finally {
        this.loading = false;
      }
    },
  },
});
