import axios from "axios";
import { UnitConfigApi } from "@/core/endpoints/unit-config";
import { defineStore } from "pinia";

function getToken() {
  return localStorage.getItem("token");
}

export const useUnitConfigStore = defineStore("unitConfig", {
  state: () => ({
    unitConfigs: [] as any[],
    currentUnitConfig: null as any,
    error: null as string | null,
    loading: false,
  }),
  actions: {
    async fetchUnitConfigs() {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(UnitConfigApi.fetchUnitConfig, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.unitConfigs = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Error fetching UnitType Config";
        console.error("Error fetching UnitType Config:", err);
        return [];
      } finally {
        this.loading = false;
      }
    },

    async fetchUnitConfigById(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(UnitConfigApi.getUnitConfig(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.currentUnitConfig = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || `Error fetching unit config with id ${id}`;
        console.error(`Error fetching unit config with id ${id}:`, err);
        throw new Error("Failed to fetch UnitType Config");
      } finally {
        this.loading = false;
      }
    },

    async createUnitConfig(unitConfig: {
      product: number;
      unit_type: number;
      conversion_per_unit: number;
      conversion_unit_name: number;
    }) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.post(
          UnitConfigApi.fetchUnitConfig,
          {
            product: unitConfig.product,
            unit_type: unitConfig.unit_type,
            conversion_per_unit: unitConfig.conversion_per_unit,
            conversion_unit_name: unitConfig.conversion_unit_name,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        );
        this.unitConfigs.push(res.data);
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to create UnitType Config";
        console.error("Error creating UnitType Config:", err);
        throw new Error("Failed to create UnitType Config");
      } finally {
        this.loading = false;
      }
    },

    async updateUnitConfig(
      id: number | string,
      updates: {
        product?: number;
        unit_type?: number;
        conversion_per_unit?: number;
        conversion_unit_name?: number;
      },
    ) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.patch(UnitConfigApi.getUnitConfig(id), updates, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const index = this.unitConfigs.findIndex((config) => config.id === id);
        if (index !== -1) {
          this.unitConfigs[index] = res.data;
        }
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || `Failed to update UnitType Config with id ${id}`;
        console.error(`Error updating UnitType Config with id ${id}:`, err);
        throw new Error("Failed to update UnitType Config");
      } finally {
        this.loading = false;
      }
    },

    async deleteUnitConfig(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.delete(UnitConfigApi.getUnitConfig(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.unitConfigs = this.unitConfigs.filter((config) => config.id !== id);
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || `Failed to delete UnitType Config with id ${id}`;
        console.error(`Error deleting UnitType Config with id ${id}:`, err);
        throw new Error("Failed to delete UnitType Config");
      } finally {
        this.loading = false;
      }
    },
  },
});
