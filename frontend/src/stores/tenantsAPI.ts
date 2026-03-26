import { tenantsAPI } from "@/core/endpoints/tenants";
import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export interface Tenant {
  id: number;
  name: string;
  slug: string;
  email: string;
  phone?: string;
  address?: string;
  subscription_start: string;
  subscription_end?: string;
  is_active: boolean;
  tier: "basic" | "professional" | "enterprise";
  created_at: string;
  updated_at: string;
}

export const useTenantsStore = defineStore("tenants", {
  state: () => ({
    tenants: [] as Tenant[],
    currentTenant: null as Tenant | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchTenants() {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const res = await axios.get(tenantsAPI.list, {
          headers: {
            Authorization: authStore.token
              ? `Bearer ${authStore.token}`
              : undefined,
          },
        });
        this.tenants = res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to fetch tenants";
      } finally {
        this.loading = false;
      }
    },

    async createTenant(payload: {
      name: string;
      slug: string;
      email: string;
      phone?: string;
      address?: string;
      tier?: string;
    }) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const res = await axios.post(tenantsAPI.create, payload, {
          headers: {
            Authorization: authStore.token
              ? `Bearer ${authStore.token}`
              : undefined,
          },
        });
        this.tenants.push(res.data);
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to create tenant";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async updateTenant(id: number | string, payload: Partial<Tenant>) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const res = await axios.patch(tenantsAPI.update(id), payload, {
          headers: {
            Authorization: authStore.token
              ? `Bearer ${authStore.token}`
              : undefined,
          },
        });
        const index = this.tenants.findIndex((t) => t.id === id);
        if (index !== -1) {
          this.tenants[index] = res.data;
        }
        if (this.currentTenant?.id === id) {
          this.currentTenant = res.data;
        }
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to update tenant";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async deleteTenant(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        await axios.delete(tenantsAPI.delete(id), {
          headers: {
            Authorization: authStore.token
              ? `Bearer ${authStore.token}`
              : undefined,
          },
        });
        this.tenants = this.tenants.filter((t) => t.id !== id && t.slug !== id);
        if (this.currentTenant?.id === id || this.currentTenant?.slug === id) {
          this.currentTenant = null;
        }
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to delete tenant";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    setCurrentTenant(tenant: Tenant | null) {
      this.currentTenant = tenant;
      if (tenant) {
        localStorage.setItem("currentTenant", JSON.stringify(tenant));
      } else {
        localStorage.removeItem("currentTenant");
      }
    },

    loadCurrentTenant() {
      const stored = localStorage.getItem("currentTenant");
      if (stored) {
        this.currentTenant = JSON.parse(stored);
      }
    },
  },
});
