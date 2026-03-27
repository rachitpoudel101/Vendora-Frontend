<template>
  <div class="space-y-4">
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <h2
        class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100"
      >
        Tenants
      </h2>
      <button
        @click="showCreateModal = true"
        class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors duration-200 font-medium text-sm sm:text-base"
        :style="{
          backgroundColor: buttonColor,
          color: getButtonTextColor(),
        }"
      >
        + Create Tenant
      </button>
    </div>

    <div
      v-if="tenantsStore.error"
      class="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg"
    >
      {{ tenantsStore.error }}
    </div>

    <div v-if="tenantsStore.loading" class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400">Loading tenants...</p>
    </div>

    <div
      v-else
      class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead
            class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
          >
            <tr>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Name
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Slug
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Email
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Tier
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Status
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr
              v-for="tenant in tenantsStore.tenants"
              :key="tenant.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <td
                class="px-4 sm:px-6 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium"
              >
                {{ tenant.name }}
              </td>
              <td
                class="px-4 sm:px-6 py-4 text-sm text-gray-600 dark:text-gray-400"
              >
                {{ tenant.slug }}
              </td>
              <td
                class="px-4 sm:px-6 py-4 text-sm text-gray-600 dark:text-gray-400"
              >
                {{ tenant.email }}
              </td>
              <td class="px-4 sm:px-6 py-4 text-sm">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getTierClass(tenant.tier)"
                >
                  {{ tenant.tier }}
                </span>
              </td>
              <td class="px-4 sm:px-6 py-4 text-sm">
                <span
                  :class="
                    tenant.is_active
                      ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                      : 'text-red-600 dark:text-red-400 font-medium'
                  "
                >
                  {{ tenant.is_active ? "Active" : "Inactive" }}
                </span>
              </td>
              <td class="px-4 sm:px-6 py-4 text-center">
                <div class="flex justify-center gap-2">
                  <button
                    @click="editTenant(tenant)"
                    class="inline-flex items-center px-3 py-1.5 rounded-lg bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors duration-150 text-xs sm:text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteTenant(tenant.id)"
                    class="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800 transition-colors duration-150 text-xs sm:text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="tenantsStore.tenants.length === 0" class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">
          No tenants found. Create one to get started.
        </p>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl"
      >
        <h3
          class="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100"
        >
          {{ editingTenant ? "Edit Tenant" : "Create Tenant" }}
        </h3>

        <form @submit.prevent="saveTenant" class="space-y-4">
          <div>
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >Name *</label
            >
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter tenant name"
            />
          </div>

          <div>
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >Slug *</label
            >
            <input
              v-model="formData.slug"
              type="text"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter slug (e.g., my-tenant)"
            />
          </div>

          <div>
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >Email *</label
            >
            <input
              v-model="formData.email"
              type="email"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >Phone</label
            >
            <input
              v-model="formData.phone"
              type="text"
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >Address</label
            >
            <textarea
              v-model="formData.address"
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Enter address"
            ></textarea>
          </div>

          <div>
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >Tier</label
            >
            <select
              v-model="formData.tier"
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="basic">Basic</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="submit"
              class="flex-1 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors duration-200 font-medium"
              :style="{
                backgroundColor: buttonColor,
                color: getButtonTextColor(),
              }"
            >
              Save
            </button>
            <button
              type="button"
              @click="closeModal"
              class="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTenantsStore, type Tenant } from "@/stores/tenantsAPI";
import { useTheme } from "@/composables/useTheme";

const tenantsStore = useTenantsStore();
const { buttonColor, getButtonTextColor } = useTheme();
const showCreateModal = ref(false);
const editingTenant = ref<Tenant | null>(null);
const formData = ref<{
  name: string;
  slug: string;
  email: string;
  phone: string;
  address: string;
  tier: "basic" | "professional" | "enterprise";
}>({
  name: "",
  slug: "",
  email: "",
  phone: "",
  address: "",
  tier: "basic",
});

onMounted(() => {
  tenantsStore.fetchTenants();
});

const getTierClass = (tier: string) => {
  const classes: Record<string, string> = {
    basic: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
    professional:
      "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
    enterprise:
      "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200",
  };
  return (
    classes[tier] ||
    "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
  );
};

const editTenant = (tenant: Tenant) => {
  editingTenant.value = tenant;
  formData.value = {
    name: tenant.name,
    slug: tenant.slug,
    email: tenant.email,
    phone: tenant.phone || "",
    address: tenant.address || "",
    tier: tenant.tier,
  };
  showCreateModal.value = true;
};

const saveTenant = async () => {
  try {
    if (editingTenant.value) {
      await tenantsStore.updateTenant(editingTenant.value.id, formData.value);
    } else {
      await tenantsStore.createTenant(formData.value);
    }
    closeModal();
  } catch (err) {
    console.error("Error saving tenant:", err);
  }
};

const deleteTenant = async (id: number) => {
  if (confirm("Are you sure you want to delete this tenant?")) {
    try {
      await tenantsStore.deleteTenant(id);
    } catch (err) {
      console.error("Error deleting tenant:", err);
    }
  }
};

const closeModal = () => {
  showCreateModal.value = false;
  editingTenant.value = null;
  formData.value = {
    name: "",
    slug: "",
    email: "",
    phone: "",
    address: "",
    tier: "basic",
  };
};
</script>
