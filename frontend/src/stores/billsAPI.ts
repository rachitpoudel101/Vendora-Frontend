import axios from "axios";
import { BillingApi } from "@/core/endpoints/billing";
import { defineStore } from "pinia";

function getToken() {
  return localStorage.getItem("token");
}

export const useBillsStore = defineStore("bills", {
  state: () => ({
    bills: [] as any[],
    currentBill: null as any,
    error: null as string | null,
    loading: false,
  }),
  actions: {
    async fetchBills() {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(BillingApi.fetchBill, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.bills = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Error fetching Bills";
        console.error("Error fetching Bills:", err);
        return [];
      } finally {
        this.loading = false;
      }
    },

    async fetchBillById(id: number | string) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(BillingApi.getBill(id), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.currentBill = res.data;
        return res.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.detail || `Failed to fetch Bills with id ${id}`;
        console.error(`Error fetching Bills with id ${id}:`, err);
        throw new Error("Failed to fetch Bills");
      } finally {
        this.loading = false;
      }
    },

    async createBill(bill: any) {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.post(BillingApi.fetchBill, bill, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.bills.push(res.data);
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to create Bill";
        console.error("Error creating Bill:", err);
        throw new Error("Failed to create Bill");
      } finally {
        this.loading = false;
      }
    },
  },
});
