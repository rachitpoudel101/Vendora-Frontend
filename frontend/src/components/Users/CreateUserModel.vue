<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <div class="flex flex-1 h-0">
      <Sidebar />
      <main class="flex-1 flex items-center justify-center overflow-auto">
        <div class="bg-white p-8 rounded shadow w-full max-w-lg text-center">
          <h2 class="text-3xl font-bold mb-4 text-blue-700">Create User</h2>
          <form @submit.prevent="onSubmit" class="space-y-4">
            <input
              v-model="username"
              type="text"
              placeholder="Username"
              class="w-full px-4 py-2 border rounded"
              required
            />
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full px-4 py-2 border rounded"
              required
            />
            <input
              v-model="first_name"
              type="text"
              placeholder="First Name"
              class="w-full px-4 py-2 border rounded"
            />
            <input
              v-model="last_name"
              type="text"
              placeholder="Last Name"
              class="w-full px-4 py-2 border rounded"
            />
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-2 border rounded"
              required
            />
            <select
              v-model="role"
              class="w-full px-4 py-2 border rounded"
              required
            >
              <option value="" disabled>Select Role</option>
              <option v-for="r in availableRoles" :key="r" :value="r">
                {{ r.charAt(0).toUpperCase() + r.slice(1) }}
              </option>
            </select>
            <select
              v-model="tenant"
              class="w-full px-4 py-2 border rounded"
              required
            >
              <option value="" disabled>Select Tenant</option>
              <option v-for="t in availableTenants" :key="t.id" :value="t.id">
                {{ t.name }}
              </option>
            </select>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "@/stores/usersAPI";
import { useAuthStore } from "@/stores/auth";
import { useTenantsStore } from "@/stores/tenantsAPI";

const username = ref("");
const email = ref("");
const first_name = ref("");
const last_name = ref("");
const password = ref("");
const role = ref("");
const tenant = ref("");
const router = useRouter();
const authStore = useAuthStore();
const usersStore = useUsersStore();
const tenantsStore = useTenantsStore();

const availableRoles = computed(() => {
  if (authStore.user?.role === "admin") {
    return ["staff"];
  }
  return ["admin", "staff"];
});

const availableTenants = computed(() => {
  return tenantsStore.tenants;
});

async function onSubmit() {
  await usersStore.createUser(
    {
      username: username.value,
      role: role.value,
      email: email.value,
      first_name: first_name.value,
      last_name: last_name.value,
      password: password.value,
      tenant: tenant.value ? parseInt(tenant.value) : null,
    },
    authStore.token,
  );
  router.push("/users");
}

onMounted(async () => {
  await authStore.self();
  await tenantsStore.fetchTenants();
});
</script>
