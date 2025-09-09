import axios from "axios";
import { suppliersAPI } from "@/core/endpoints/suppliers";
import { defineStore } from "pinia";

function getToken() {
  return localStorage.getItem("token");
}

export const useSuppliersStore = defineStore("suppliers", {
  state: () => ({
    suppliers: [] as any[],
    currentSupplier: null as any,
    error: null as string | null,
    loading: false,
  }),
  actions: {
    async fetchSuppliers() {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(suppliersAPI.list, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.suppliers = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Error fetching suppliers";
        console.error("❌ Error fetching suppliers:", err);
        if (err.response) {
          console.error("📋 Error status:", err.response.status);
          console.error("📋 Error data:", err.response.data);
          console.error("📋 Error headers:", err.response.headers);
        } else if (err.request) {
          console.error("📡 No response received:", err.request);
        } else {
          console.error("⚙️ Error message:", err.message);
        }
        throw new Error(`Failed to fetch suppliers: ${err.message}`);
      } finally {
        this.loading = false;
      }
    },

    async fetchSupplierById(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(suppliersAPI.detail(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.currentSupplier = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || `Error fetching supplier with id ${id}`;
        console.error(`Error fetching supplier with id ${id}:`, err);
        throw new Error("Failed to fetch supplier");
      } finally {
        this.loading = false;
      }
    },

    async createSupplier(supplier: any) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.post(suppliersAPI.create, supplier, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.suppliers.push(res.data);
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to create supplier";
        console.error("❌ Error creating supplier:", err);
        if (err.response) {
          console.error("📋 Error status:", err.response.status);
          console.error("📋 Error data:", err.response.data);
        }
        throw new Error(`Failed to create supplier: ${err.message}`);
      } finally {
        this.loading = false;
      }
    },

    async updateSupplier(
      id: number,
      updates: {
        name: string;
        phone: string;
        address: string;
      },
    ) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.patch(suppliersAPI.update(id), updates, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const index = this.suppliers.findIndex((supplier) => supplier.id === id);
        if (index !== -1) {
          this.suppliers[index] = res.data;
        }
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || `Failed to update supplier with id ${id}`;
        if (err.response) {
          console.error("📋 Error status:", err.response.status);
          console.error("📋 Error data:", err.response.data);
        }
        throw new Error(`Failed to update supplier: ${err.message}`);
      } finally {
        this.loading = false;
      }
    },

    async deleteSupplier(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.delete(suppliersAPI.delete(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.suppliers = this.suppliers.filter((supplier) => supplier.id !== id);
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || `Failed to delete supplier with id ${id}`;
        console.error(`❌ Error deleting supplier with id ${id}:`, err);
        if (err.response) {
          console.error("📋 Error status:", err.response.status);
          console.error("📋 Error data:", err.response.data);
        }
        throw new Error(`Failed to delete supplier: ${err.message}`);
      } finally {
        this.loading = false;
      }
    },

    async restoreSupplier(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.patch(
          suppliersAPI.update(id),
          { is_deleted: false },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        );
        const index = this.suppliers.findIndex((supplier) => supplier.id === id);
        if (index !== -1) {
          this.suppliers[index] = res.data;
        }
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || `Failed to restore supplier with id ${id}`;
        console.error(`❌ Error restoring supplier with id ${id}:`, err);
        if (err.response) {
          console.error("📋 Error status:", err.response.status);
          console.error("📋 Error data:", err.response.data);
        }
        throw new Error(`Failed to restore supplier: ${err.message}`);
      } finally {
        this.loading = false;
      }
    },
  },
});
