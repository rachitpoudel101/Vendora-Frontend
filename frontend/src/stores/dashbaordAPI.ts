import { dashboardAPI } from "@/core/endpoints/dashboard";
import axios from "axios";
import { defineStore } from "pinia";

function getToken() {
  return localStorage.getItem("token");
}

export type WeeklyProfitDay = {
  date: string;
  weekday: string;
  profit: string;
};

export type MonthlyProfitDate = {
  date: string;
  profit: string;
};

export type YearlyProfitMonth = {
  month: string;
  profit: string;
};

export type WeeklySalesDay = {
  date: string;
  weekday: string;
  sales: string;
};

export type MonthlySalesDate = {
  date: string;
  sales: string;
};

export type YearlySalesMonth = {
  month: string;
  sales: string;
};

export type DashboardStats = {
  total_sales: number;
  total_profit: number;
  total_stocks: number;
  products: { product_name: string; stock: number; sold: number }[];
  profit_daily: number;
  profit_weekly: number;
  profit_monthly: number;
  profit_yearly: number;
  weekly_profit_by_day: WeeklyProfitDay[];
  monthly_profit_by_date: MonthlyProfitDate[];
  yearly_profit_by_month: YearlyProfitMonth[];
  sales_daily: number;
  sales_weekly: number;
  sales_monthly: number;
  sales_yearly: number;
  weekly_sales_by_day: WeeklySalesDay[];
  monthly_sales_by_date: MonthlySalesDate[];
  yearly_sales_by_month: YearlySalesMonth[];
};

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    stats: null as DashboardStats | null,
    error: null as string | null,
    loading: false,
  }),
  actions: {
    async fetchDashboardStats() {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        const res = await axios.get(dashboardAPI.status, {
          headers: {
            Accept: "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        this.stats = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to fetch dashboard stats";
        console.error("Error fetching dashboard stats:", err);
        throw new Error("Failed to fetch dashboard stats");
      } finally {
        this.loading = false;
      }
    },
  },
});
