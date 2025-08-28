import axios from "axios";
import { BillingApi } from "@/core/endpoints/billing";
const token = localStorage.getItem("token");

// FetchAll Bills

export async function fetchBill() {
  try {
    const res = await axios.get(BillingApi.fetchBill, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error("Error fetching Bills:", e);
    return [];
  }
}

// FetchAll Bills BY ID

export async function fetchBillById(id: number | string) {
  try {
    const res = await axios.get(BillingApi.getBill(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error fetching Bills with id ${id}:`, e);
    throw new Error("Failed to fetch Bills");
  }
}

// ✅ Create Bills
export async function createBills(
  bill: {
    name: string;
    description: string;
  },
  tokenOverride?: string,
) {
  try {
    const res = await axios.post(
      BillingApi.fetchBill,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          ...(tokenOverride || token
            ? { Authorization: `Bearer ${tokenOverride || token}` }
            : {}),
        },
      },
    );
    return res.data;
  } catch (e) {
    console.error("Error creating Category:", e);
    throw new Error("Failed to create Category");
  }
}
