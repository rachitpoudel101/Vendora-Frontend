import axios from "axios";
import { UnitApi } from "@/core/endpoints/unit";
import { defineStore } from "pinia";

function getToken() {
  return localStorage.getItem("token");
}

export const useUnitStore = defineStore("unit", {
  state: () => ({
    units: [] as any[],
    currentUnit: null as any,
    error: null as string | null,
    loading: false,
  }),
  actions: {
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
        console.error("Error fetching unit:", err);
        return [];
      } finally {
        this.loading = false;
      }
    },

    async fetchUnitById(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(UnitApi.getUnit(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.currentUnit = res.data;
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail || `Error fetching unit with id ${id}`;
        console.error(`Error fetching unit with id ${id}:`, err);
        throw new Error("Failed to fetch unit");
      } finally {
        this.loading = false;
      }
    },

    async createUnit(unit: { unit: string }) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.post(
          UnitApi.fetchUnit,
          {
            unit: unit.unit,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        );
        this.units.push(res.data);
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to create Unit";
        console.error("Error creating Unit:", err);
        throw new Error("Failed to create Unit");
      } finally {
        this.loading = false;
      }
    },

    async updateUnit(
      id: number | string,
      updates: {
        unit?: string;
      },
    ) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.patch(UnitApi.getUnit(id), updates, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const index = this.units.findIndex((unit) => unit.id === id);
        if (index !== -1) {
          this.units[index] = res.data;
        }
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail || `Failed to update unit with id ${id}`;
        console.error(`Error updating unit with id ${id}:`, err);
        throw new Error("Failed to update Unit");
      } finally {
        this.loading = false;
      }
    },

    async deleteUnit(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.delete(UnitApi.getUnit(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.units = this.units.filter((unit) => unit.id !== id);
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail || `Failed to delete Unit with id ${id}`;
        console.error(`Error deleting Unit with id ${id}:`, err);
        throw new Error("Failed to delete Unit");
      } finally {
        this.loading = false;
      }
    },
  },
});
