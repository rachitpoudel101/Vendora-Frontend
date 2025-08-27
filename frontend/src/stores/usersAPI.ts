import axios from "axios";
import { UserApi } from "@/core/endpoints/users";
import { authAPI } from "@/core/endpoints/auth";

const token = localStorage.getItem("token");

// ✅ Fetch all users
export async function fetchUsers() {
  try {
    const res = await axios.get(UserApi.fetchUsers, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error("Error fetching users:", e);
    return [];
  }
}

// ✅ Fetch single user by ID
export async function getUser(id: number | string) {
  try {
    const res = await axios.get(UserApi.getUser(id), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error fetching user with id ${id}:`, e);
    throw new Error("Failed to fetch user");
  }
}

// ✅ Create user
export async function createUser(
  user: {
    username: string;
    role: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    password: string;
  },
  token?: string,
) {
  try {
    const res = await axios.post(
      UserApi.fetchUsers,
      {
        username: user.username,
        role: user.role,
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        password: user.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );
    return res.data;
  } catch (e) {
    console.error("Error creating user:", e);
    throw new Error("Failed to create user");
  }
}

// ✅ Update user by ID (partial update using PATCH)
export async function updateUser(
  id: number | string,
  updates: {
    username?: string;
    role?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
  },
) {
  try {
    const res = await axios.patch(UserApi.getUser(id), updates, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (e) {
    console.error(`Error updating user with id ${id}:`, e);
    throw new Error("Failed to update user");
  }
}

export async function fetchROles() {
  try {
    const res = await axios.get(authAPI.rolesConfig, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data.roles;
  } catch (e) {
    console.error(`Error updating user with id:`, e);
    throw new Error("Failed to update user");
  }
}

export async function UpdateRoles(user_id, payload) {
  try {
    const res = await axios.post(UserApi.updateUserRole(user_id), payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data.roles;
  } catch (e) {
    console.error(`Error updating user with id:`, e);
    throw new Error("Failed to update user");
  }
}
