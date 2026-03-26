<template>
  <div class="space-y-4">
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <h2 class="text-2xl sm:text-3xl font-bold text-slate-900">Tenants</h2>
      <button
        @click="showCreateModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base"
      >
        + Create Tenant
      </button>
    </div>

    <div
      v-if="tenantsStore.error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
    >
      {{ tenantsStore.error }}
    </div>

    <div v-if="tenantsStore.loading" class="text-center py-12">
      <p class="text-slate-600">Loading tenants...</p>
    </div>

    <div
      v-else
      class="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-700"
              >
                Name
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-700"
              >
                Slug
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-700"
              >
                Email
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-700"
              >
                Tier
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-700"
              >
                Status
              </th>
              <th
                class="px-4 sm:px-6 py-3 text-center text-xs sm:text-sm font-semibold text-slate-700"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr
              v-for="tenant in tenantsStore.tenants"
              :key="tenant.id"
              class="hover:bg-slate-50 transition-colors duration-150"
            >
              <td class="px-4 sm:px-6 py-4 text-sm text-slate-900 font-medium">
                {{ tenant.name }}
              </td>
              <td class="px-4 sm:px-6 py-4 text-sm text-slate-600">
                {{ tenant.slug }}
              </td>
              <td class="px-4 sm:px-6 py-4 text-sm text-slate-600">
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
                      ? 'text-emerald-600 font-medium'
                      : 'text-red-600 font-medium'
                  "
                >
                  {{ tenant.is_active ? "Active" : "Inactive" }}
                </span>
              </td>
              <td class="px-4 sm:px-6 py-4 text-center">
                <div class="flex justify-center gap-2">
                  <button
                    @click="editTenant(tenant)"
                    class="inline-flex items-center px-3 py-1.5 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors duration-150 text-xs sm:text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteTenant(tenant.id)"
                    class="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors duration-150 text-xs sm:text-sm font-medium"
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
        <p class="text-slate-500">
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
        class="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl"
      >
        <h3 class="text-xl sm:text-2xl font-bold mb-6 text-slate-900">
          {{ editingTenant ? "Edit Tenant" : "Create Tenant" }}
        </h3>

        <form @submit.prevent="saveTenant" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2"
              >Name *</label
            >
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter tenant name"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2"
              >Slug *</label
            >
            <input
              v-model="formData.slug"
              type="text"
              required
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter slug (e.g., my-tenant)"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2"
              >Email *</label
            >
            <input
              v-model="formData.email"
              type="email"
              required
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2"
              >Phone</label
            >
            <input
              v-model="formData.phone"
              type="text"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2"
              >Address</label
            >
            <textarea
              v-model="formData.address"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Enter address"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2"
              >Tier</label
            >
            <select
              v-model="formData.tier"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="basic">Basic</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="submit"
              class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Save
            </button>
            <button
              type="button"
              @click="closeModal"
              class="flex-1 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 transition-colors duration-200 font-medium"
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

const tenantsStore = useTenantsStore();
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
    basic: "bg-blue-100 text-blue-800",
    professional: "bg-purple-100 text-purple-800",
    enterprise: "bg-emerald-100 text-emerald-800",
  };
  return classes[tier] || "bg-slate-100 text-slate-800";
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
