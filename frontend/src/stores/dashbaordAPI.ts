import { dashboardAPI } from "@/core/endpoints/dashboard";
import axios from "axios";


export type DashboardStats = {
  total_sales: number;
  total_profit: number;
  total_stocks: number;
  products: { product_name: string; stock: number }[];
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await axios.get(dashboardAPI.status, {
    headers: {
      "Accept": "application/json",

    },
  });
  if (!res.data) throw new Error("Failed to fetch dashboard stats");
  return res.data as DashboardStats;
}
