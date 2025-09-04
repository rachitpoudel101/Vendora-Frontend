import axios from "axios";
import { InventoryApi } from "@/core/endpoints/inventory";
import { suppliersAPI } from "@/core/endpoints/suppliers";
import { fetchUnit } from "@/stores/UnitAPI";

const token = localStorage.getItem("token");

///////////////////////////////////////////////////////////////    FOR SUPPLIERS  //////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fetch All Suppliers
export async function fetchSuppliers() {
  try {
    const res = await axios.get(suppliersAPI.list, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error("Error fetching Suppliers:", e);
    return [];
  }
}
///////////////////////////////////////////////////////////////    FOR CATEGORY  //////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FetchAll Category

export async function fetchCategory() {
  try {
    const res = await axios.get(InventoryApi.fetchCategory, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error("Error fetching Category:", e);
    return [];
  }
}

// FetchAll Category BY ID
export async function fetchCategoryById(id: number | string) {
  try {
    const res = await axios.get(InventoryApi.getCatagory(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error fetching Category with id ${id}:`, e);
    throw new Error("Failed to fetch Category");
  }
}

// ✅ Create Category
export async function createCatyregory(
  category: {
    name: string;
    description?: string;
    is_expired_applicable?: boolean;
  },
  tokenOverride?: string,
) {
  try {
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

// ✅ Update Category by ID (partial update using PATCH)
export async function updateCategory(
  id: number | string,
  updates: {
    name?: string;
    description?: string;
    is_expired_applicable?: boolean;
  },
) {
  try {
    const res = await axios.patch(InventoryApi.getCatagory(id), updates, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error updating Category with id ${id}:`, e);
    throw new Error("Failed to update Category");
  }
}

// ✅ Delete Category by ID
export async function deleteCategory(id: number | string) {
  try {
    const res = await axios.delete(InventoryApi.getCatagory(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error deleting Category with id ${id}:`, e);
    throw new Error("Failed to delete Category");
  }
}

///////////////////////////////////////////////////////////////    FOR PRODUCT  ///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FetchAll Product

export async function fetchProduct() {
  try {
    const res = await axios.get(InventoryApi.fetchProduct, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error("Error fetching Product:", e);
    return [];
  }
}

// FetchAll Product BY ID

export async function getProduct(id: number | string) {
  try {
    const res = await axios.get(InventoryApi.getProduct(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error fetching Product with id ${id}:`, e);
    throw new Error("Failed to fetch Product");
  }
}

// ✅ Create Product
export async function createProduct(
  product: {
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
  },
  tokenOverride?: string,
) {
  try {
    const productData: any = {
      name: product.name,
      category: product.category,
      supliers: product.supliers,
      cost_price: product.cost_price,
      margin: product.margin,
      stock: product.stock,
      unit: product.unit,
    };

    // Only include serial_number if provided
    if (product.serial_number && product.serial_number.trim()) {
      productData.serial_number = product.serial_number;
    }

    // Only include expires_at if provided
    if (product.expires_at) {
      productData.expires_at = product.expires_at;
    }

    // Only include description if provided
    if (product.description && product.description.trim()) {
      productData.description = product.description;
    }

    const res = await axios.post(InventoryApi.fetchProduct, productData, {
      headers: {
        "Content-Type": "application/json",
        ...(tokenOverride || token
          ? { Authorization: `Bearer ${tokenOverride || token}` }
          : {}),
      },
    });
    return res.data;
  } catch (e) {
    console.error("Error creating Product:", e);
    throw new Error("Failed to create Product");
  }
}

// ✅ Update Product by ID (partial update using PATCH)
export async function updateProduct(
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
  try {
    const res = await axios.patch(InventoryApi.getProduct(id), updates, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error updating Product with id ${id}:`, e);
    throw new Error("Failed to update Product");
  }
}

// ✅ Delete Product by ID
export async function deleteProduct(id: number | string) {
  try {
    const res = await axios.delete(InventoryApi.getProduct(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error deleting Product with id ${id}:`, e);
    throw new Error("Failed to delete Product");
  }
}

// Fetch Available Units for dropdown
export async function fetchUnits() {
  try {
    return await fetchUnit();
  } catch (e) {
    console.error("Error fetching units:", e);
    throw new Error("Failed to fetch units");
  }
}
