import axios from "axios";
import { UnitConfigApi } from "@/core/endpoints/unit-config";
const token = localStorage.getItem("token");

// FetchAll UnitType Config
export async function fetchUnitConfig() {
  try {
    const res = await axios.get(UnitConfigApi.fetchUnitConfig, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error("Error fetching UnitType Config:", e);
    return [];
  }
}

// FetchAll UnitType Config BY ID
export async function fetchUnitConfigById(id: number | string) {
  try {
    const res = await axios.get(UnitConfigApi.getUnitConfig(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error fetching unit config with id ${id}:`, e);
    throw new Error("Failed to fetch UnitType Config");
  }
}

// ✅ Create UnitType Config
export async function createUnitConfig(
  unitConfig: {
    product: number;
    unit_type: number;
    conversion_per_unit: number;
    conversion_unit_name: number;
  },
  tokenOverride?: string,
) {
  try {
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
          ...(tokenOverride || token
            ? { Authorization: `Bearer ${tokenOverride || token}` }
            : {}),
        },
      },
    );
    return res.data;
  } catch (e) {
    console.error("Error creating UnitType Config:", e);
    throw new Error("Failed to create UnitType Config");
  }
}

// ✅ Update UnitType Config by ID (partial update using PATCH)
export async function updateUnitConfig(
  id: number | string,
  updates: {
    product?: number;
    unit_type?: number;
    conversion_per_unit?: number;
    conversion_unit_name?: number;
  },
) {
  try {
    const res = await axios.patch(UnitConfigApi.getUnitConfig(id), updates, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error updating UnitType Config with id ${id}:`, e);
    throw new Error("Failed to update UnitType Config");
  }
}

// ✅ Delete UnitType Config by ID
export async function deleteUnitConfig(id: number | string) {
  try {
    const res = await axios.delete(UnitConfigApi.getUnitConfig(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error deleting UnitType Config with id ${id}:`, e);
    throw new Error("Failed to delete UnitType Config");
  }
}
