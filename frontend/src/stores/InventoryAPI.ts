import axios from 'axios'
import { InventoryApi } from '@/core/endpoints/inventory'

const token = localStorage.getItem("token");
///////////////////////////////////////////////////////////////    FOR CATEGORY  //////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// FetchAll Category

export async function  fetchCategory(){
    try {
        const res =await axios.get(InventoryApi.fetchCategory,{
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
    });
    return res.data;
} catch (e) {
    console.error("Error fetching Category:", e);
    return [];
}}


// FetchAll Category BY ID

export async function  fetchCategoryById(id: number | string){
    try {
        const res =await axios.get(InventoryApi.getProduct(id),{
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
    });
    return res.data;
} catch (e) {
    console.error(`Error fetching Category with id ${id}:`, e);
    throw new Error("Failed to fetch Category");
}}

// ✅ Create Category
export async function createCatyregory(
  category: {
    name: string;
    description: string;
  },
  tokenOverride?: string,
) {
  try {
    const res = await axios.post(
      InventoryApi.fetchCategory,
      {
        name: category.name,
        description: category.description,
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...(tokenOverride || token ? { Authorization: `Bearer ${tokenOverride || token}` } : {}),
        },
      },
    );
    return res.data;
  } catch (e) {
    console.error("Error creating Category:", e);
    throw new Error("Failed to create Category");
  }
}


// ✅ Update CAtegory by ID (partial update using PATCH)
export async function updateCategory(
  id: number | string,
  updates: {
    name: string;
    description: string;
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

///////////////////////////////////////////////////////////////    FOR PRODUCT  ///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FetchAll Product

export async function  fetchProduct(){
    try {
        const res =await axios.get(InventoryApi.fetchProduct,{
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
    });
    return res.data;
} catch (e) {
    console.error("Error fetching Product:", e);
    return [];
}}


// FetchAll Product BY ID

export async function  getProduct(id: number | string){
    try {
        const res =await axios.get(InventoryApi.getProduct(id),{
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
    });
    return res.data;
} catch (e) {
    console.error(`Error fetching Category with id ${id}:`, e);
    throw new Error("Failed to fetch Category");
}}


// ✅ Create Product
export async function createProduct(
  product: {
    name: string;
    category: string;
    cost_price: number;
    margin: number;
    stock: number;
  },
  tokenOverride?: string,
) {
  try {
    const res = await axios.post(
      InventoryApi.fetchProduct,
      {
        name: product.name,
        category: product.category,
        cost_price: product.cost_price,
        margin: product.margin,
        stock: product.stock,
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...(tokenOverride || token ? { Authorization: `Bearer ${tokenOverride || token}` } : {}),
        },
      },
    );
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
    name: string;
    category: string;
    cost_price: number;
    margin: number;
    stock: number;
  },
) 
{
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
