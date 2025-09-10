import axios from "axios";
import { InventoryApi } from "@/core/endpoints/inventory";
import { suppliersAPI } from "@/core/endpoints/suppliers";
import { UnitApi } from "@/core/endpoints/unit";
import { defineStore } from "pinia";

function getToken() {
  return localStorage.getItem("token");
}

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    suppliers: [] as any[],
    categories: [] as any[],
    products: [] as any[],
    units: [] as any[],
    currentCategory: null as any,
    currentProduct: null as any,
    error: null as string | null,
    loading: false,
  }),
  actions: {
    // Suppliers actions
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
        this.error = err.response?.data?.detail || "Error fetching Suppliers";
        console.error("Error fetching Suppliers:", err);
        return [];
      } finally {
        this.loading = false;
      }
    },

    // Category actions
    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(InventoryApi.fetchCategory, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.categories = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Error fetching Categories";
        console.error("Error fetching Category:", err);
        return [];
      } finally {
        this.loading = false;
      }
    },

    async fetchCategoryById(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(InventoryApi.getCatagory(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.currentCategory = res.data;
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail || `Error fetching Category with id ${id}`;
        console.error(`Error fetching Category with id ${id}:`, err);
        throw new Error("Failed to fetch Category");
      } finally {
        this.loading = false;
      }
    },

    async createCategory(category: {
      name: string;
      description?: string;
      is_expired_applicable?: boolean;
    }) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.post(
          InventoryApi.fetchCategory,
          {
            name: category.name,
            description: category.description,
            is_expired_applicable: category.is_expired_applicable || false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        );
        this.categories.push(res.data);
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to create Category";
        console.error("Error creating Category:", err);
        throw new Error("Failed to create Category");
      } finally {
        this.loading = false;
      }
    },

    async updateCategory(
      id: number | string,
      updates: {
        name?: string;
        description?: string;
        is_expired_applicable?: boolean;
      },
    ) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.patch(InventoryApi.getCatagory(id), updates, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const index = this.categories.findIndex((cat) => cat.id === id);
        if (index !== -1) {
          this.categories[index] = res.data;
        }
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail ||
          `Failed to update Category with id ${id}`;
        console.error(`Error updating Category with id ${id}:`, err);
        throw new Error("Failed to update Category");
      } finally {
        this.loading = false;
      }
    },

    async deleteCategory(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.delete(InventoryApi.getCatagory(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.categories = this.categories.filter((cat) => cat.id !== id);
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail ||
          `Failed to delete Category with id ${id}`;
        console.error(`Error deleting Category with id ${id}:`, err);
        throw new Error("Failed to delete Category");
      } finally {
        this.loading = false;
      }
    },

    // Product actions
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(InventoryApi.fetchProduct, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.products = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Error fetching Products";
        console.error("Error fetching Product:", err);
        return [];
      } finally {
        this.loading = false;
      }
    },

    async fetchProductById(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(InventoryApi.getProduct(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.currentProduct = res.data;
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail || `Error fetching Product with id ${id}`;
        console.error(`Error fetching Product with id ${id}:`, err);
        throw new Error("Failed to fetch Product");
      } finally {
        this.loading = false;
      }
    },

    async createProduct(product: {
      name: string;
      category: string;
      supliers: number;
      serial_number?: string;
      cost_price: number;
      margin: number;
      stock: number;
      unit: string;
      expires_at?: string;
      description?: string;
    }) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const productData: any = {
          name: product.name,
          category: product.category,
          supliers: product.supliers,
          cost_price: product.cost_price,
          margin: product.margin,
          stock: product.stock,
          unit: product.unit,
        };

        if (product.serial_number && product.serial_number.trim()) {
          productData.serial_number = product.serial_number;
        }
        if (product.expires_at) {
          productData.expires_at = product.expires_at;
        }
        if (product.description && product.description.trim()) {
          productData.description = product.description;
        }

        const res = await axios.post(InventoryApi.fetchProduct, productData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.products.push(res.data);
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to create Product";
        console.error("Error creating Product:", err);
        throw new Error("Failed to create Product");
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(
      id: number | string,
      updates: {
        name?: string;
        category?: string;
        supliers?: number;
        batch_number?: string;
        serial_number?: string;
        cost_price?: number;
        margin?: number;
        stock?: number;
        unit?: string;
        expires_at?: string;
        description?: string;
      },
    ) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.patch(InventoryApi.getProduct(id), updates, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const index = this.products.findIndex((prod) => prod.id === id);
        if (index !== -1) {
          this.products[index] = res.data;
        }
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail ||
          `Failed to update Product with id ${id}`;
        console.error(`Error updating Product with id ${id}:`, err);
        throw new Error("Failed to update Product");
      } finally {
        this.loading = false;
      }
    },

    async deleteProduct(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.delete(InventoryApi.getProduct(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.products = this.products.filter((prod) => prod.id !== id);
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail ||
          `Failed to delete Product with id ${id}`;
        console.error(`Error deleting Product with id ${id}:`, err);
        throw new Error("Failed to delete Product");
      } finally {
        this.loading = false;
      }
    },

    // Units actions
    async fetchUnits() {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(UnitApi.fetchUnit, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.units = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Error fetching units";
        console.error("Error fetching units:", err);
        return [];
      } finally {
        this.loading = false;
      }
    },
  },
});
