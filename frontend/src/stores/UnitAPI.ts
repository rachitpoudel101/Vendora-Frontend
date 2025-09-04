import axios from "axios";
import { UnitApi } from "@/core/endpoints/unit";
const token = localStorage.getItem("token");

// FetchAll Unit
export async function fetchUnit() {
  try {
    const res = await axios.get(UnitApi.fetchUnit, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error("Error fetching  unit:", e);
    return [];
  }
}

// FetchAll  unit BY ID
export async function fetchUnitById(id: number | string) {
  try {
    const res = await axios.get(UnitApi.getUnit(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error fetching  unit with id ${id}:`, e);
    throw new Error("Failed to fetch  unit");
  }
}

// ✅ Create unit
export async function createUnit(
  Unit: {
    unit: string;
  },
  tokenOverride?: string,
) {
  try {
    const res = await axios.post(
      UnitApi.fetchUnit,
      {
        unit: Unit.unit,
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
    console.error("Error creating Unit:", e);
    throw new Error("Failed to create Unit");
  }
}

// ✅ Update  unit by ID (partial update using PATCH)
export async function updateunit(
  id: number | string,
  updates: {
    unit?: string;
  },
) {
  try {
    const res = await axios.patch(UnitApi.getUnit(id), updates, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error updating  unit with id ${id}:`, e);
    throw new Error("Failed to update  Unit");
  }
}

// ✅ Delete  unit by ID
export async function deleteUnit(id: number | string) {
  try {
    const res = await axios.delete(UnitApi.getUnit(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error deleting  Unit with id ${id}:`, e);
    throw new Error("Failed to delete  Unit");
  }
}