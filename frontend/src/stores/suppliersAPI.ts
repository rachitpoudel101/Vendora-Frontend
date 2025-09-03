import axios from "axios";
import { suppliersAPI } from "@/core/endpoints/suppliers";

// Get fresh token for each request
const getToken = () => localStorage.getItem("token");

// API Functions
export async function fetchSuppliers() {
  try {
    const token = getToken();
    console.log("🔗 API URL:", suppliersAPI.list);
    console.log("🔑 Token:", token ? "Present" : "Missing");

    const res = await axios.get(suppliersAPI.list, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("✅ Fetch suppliers response:", res.data);
    console.log("📊 Response status:", res.status);
    return res.data;
  } catch (e) {
    console.error("❌ Error fetching suppliers:", e);

    if (e.response) {
      console.error("📋 Error status:", e.response.status);
      console.error("📋 Error data:", e.response.data);
      console.error("📋 Error headers:", e.response.headers);
    } else if (e.request) {
      console.error("📡 No response received:", e.request);
    } else {
      console.error("⚙️ Error message:", e.message);
    }

    throw new Error(`Failed to fetch suppliers: ${e.message}`);
  }
}

export async function fetchSupplierById(id: number) {
  try {
    const token = getToken();
    const res = await axios.get(suppliersAPI.detail(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("Fetch supplier by ID response:", res.data);
    return res.data;
  } catch (e) {
    console.error(`Error fetching supplier with id ${id}:`, e);
    throw new Error("Failed to fetch supplier");
  }
}

export async function createSupplier(supplier: any) {
  try {
    const token = getToken();
    console.log("🔗 API URL:", suppliersAPI.create);
    console.log("📝 Creating supplier:", supplier);
    const res = await axios.post(suppliersAPI.create, supplier, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("✅ Create supplier response:", res.data);
    return res.data;
  } catch (e) {
    console.error("❌ Error creating supplier:", e);
    if (e.response) {
      console.error("📋 Error status:", e.response.status);
      console.error("📋 Error data:", e.response.data);
    }
    throw new Error(`Failed to create supplier: ${e.message}`);
  }
}

export async function updateSupplier(
  id: number,
  updates: {
    name: string;
    phone: string;
    address: string;
  },
) {
  try {
    const token = getToken();
    console.log("🔗 API URL:", suppliersAPI.update(id));
    console.log("📝 Updating supplier:", id, updates);
    const res = await axios.patch(suppliersAPI.update(id), updates, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("✅ Update supplier response:", res.data);
    return res.data;
  } catch (e) {
    console.error(`❌ Error updating supplier with id ${id}:`, e);
    if (e.response) {
      console.error("📋 Error status:", e.response.status);
      console.error("📋 Error data:", e.response.data);
    }
    throw new Error(`Failed to update supplier: ${e.message}`);
  }
}

export async function deleteSupplier(id: number) {
  try {
    const token = getToken();
    console.log("🔗 API URL:", suppliersAPI.delete(id));
    console.log("🗑️ Deleting supplier:", id);
    const res = await axios.delete(suppliersAPI.delete(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("✅ Delete supplier response:", res.data);
    return res.data;
  } catch (e) {
    console.error(`❌ Error deleting supplier with id ${id}:`, e);
    if (e.response) {
      console.error("📋 Error status:", e.response.status);
      console.error("📋 Error data:", e.response.data);
    }
    throw new Error(`Failed to delete supplier: ${e.message}`);
  }
}

export async function restoreSupplier(id: number) {
  try {
    const token = getToken();
    console.log("🔗 API URL:", suppliersAPI.update(id));
    console.log("♻️ Restoring supplier:", id);
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
    console.log("✅ Restore supplier response:", res.data);
    return res.data;
  } catch (e) {
    console.error(`❌ Error restoring supplier with id ${id}:`, e);
    if (e.response) {
      console.error("📋 Error status:", e.response.status);
      console.error("📋 Error data:", e.response.data);
    }
    throw new Error(`Failed to restore supplier: ${e.message}`);
  }
}
