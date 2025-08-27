import { authAPI } from "@/core/endpoints/auth";
import axios from "axios";
import { defineStore } from "pinia";

function getToken() {
  return localStorage.getItem("token");
}
function getRefresh() {
  return localStorage.getItem("refresh");
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: getToken(),
    refresh: getRefresh(),
    error: null as string | null,
    loading: false,
    user: null as any,
  }),
  actions: {
    async login(payload: { username: string; password: string }) {
      const { username, password } = payload;
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.post(authAPI.login, { username, password });
        this.token = res.data.access;
        this.refresh = res.data.refresh;
        localStorage.setItem("token", this.token);
        localStorage.setItem("refresh", this.refresh);
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        this.error = null;
      } catch (err: any) {
        this.token = null;
        this.refresh = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        this.error = err.response?.data?.detail || "Login failed";
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      this.error = null;
      let success = false;
      try {
        const res = await axios.post(
          authAPI.logout,
          {
            refresh: this.refresh,
          },
          {
            headers: {
              Authorization: this.token ? `Bearer ${this.token}` : undefined,
            },
          },
        );
        if (res.status === 205) {
          success = true;
        }
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Logout failed";
      }
      if (success) {
        this.token = null;
        this.refresh = null;
        this.user = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        delete axios.defaults.headers.common["Authorization"];
      }
      this.loading = false;
    },

    async self() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(authAPI.self, {
          headers: {
            Authorization: this.token ? `Bearer ${this.token}` : undefined,
          },
        });
        this.user = res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.message || "Failed to fetch user details";
      } finally {
        this.loading = false;
      }
    },
  },
});
