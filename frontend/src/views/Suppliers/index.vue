<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16 md:pt-16"
  >
    <Navbar />
    <div class="flex">
      <Sidebar />

      <!-- Main Content -->
      <main class="flex-1 ml-0 md:ml-64 h-[calc(100vh-4rem)] flex flex-col">
        <div class="p-2 sm:p-4 md:p-8 flex flex-col h-full">
          <!-- Header Section -->
          <div
            class="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 mb-4 md:mb-6 flex-shrink-0"
          >
            <div class="p-4 sm:p-6 lg:p-8">
              <div
                class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
              >
                <div>
                  <h1
                    class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                  >
                    Suppliers Management
                  </h1>
                  <p class="text-gray-600 text-sm sm:text-base lg:text-lg">
                    Manage supplier information and contacts
                  </p>
                </div>

                <button
                  v-show="canCreateSupplier"
                  class="w-full lg:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-white font-medium rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg hover:opacity-90 transition-all duration-200"
                  :style="{
                    backgroundColor: buttonColor,
                    color: getButtonTextColor(),
                  }"
                  @click="handleCreateSupplier"
                >
                  <span class="material-icons text-18 sm:text-20 mr-2"
                    >add_business</span
                  >
                  <span class="text-sm sm:text-base">Add Supplier</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Suppliers Table -->
          <div
            class="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden min-h-0"
          >
            <!-- Loading State -->
            <div v-if="loading" class="flex-1 flex items-center justify-center">
              <div class="text-center">
                <div
                  class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
                ></div>
                <p class="text-gray-600">Loading suppliers...</p>
              </div>
            </div>

            <!-- Error State -->
            <div
              v-else-if="error"
              class="flex-1 flex items-center justify-center"
            >
              <div class="text-center p-4">
                <span
                  class="material-icons text-red-500 text-4xl sm:text-6xl mb-4"
                  >error_outline</span
                >
                <h3
                  class="text-base sm:text-lg font-semibold text-gray-900 mb-2"
                >
                  Failed to load suppliers
                </h3>
                <p class="text-gray-600 mb-4 text-sm sm:text-base">
                  {{ error }}
                </p>
                <button
                  @click="loadSuppliers"
                  class="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors text-sm sm:text-base"
                  :style="{
                    backgroundColor: buttonColor,
                    color: getButtonTextColor(),
                  }"
                >
                  Try Again
                </button>
              </div>
            </div>

            <!-- Empty State -->
            <div
              v-else-if="suppliers.length === 0"
              class="flex-1 flex items-center justify-center"
            >
              <div class="text-center">
                <span class="material-icons text-gray-400 text-6xl mb-4"
                  >business</span
                >
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  No suppliers found
                </h3>
                <p class="text-gray-600 mb-4">
                  Start by adding your first supplier
                </p>
                <button
                  v-if="canCreateSupplier"
                  @click="handleCreateSupplier"
                  class="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                  :style="{
                    backgroundColor: buttonColor,
                    color: getButtonTextColor(),
                  }"
                >
                  Add Supplier
                </button>
              </div>
            </div>

            <!-- Content Area -->
            <div v-else class="flex-1 flex flex-col overflow-hidden">
              <!-- Mobile Cards View -->
              <div class="block md:hidden flex-1 overflow-y-auto p-4 space-y-4">
                <div
                  v-for="(supplier, idx) in displaySuppliers"
                  :key="supplier.id"
                  class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900 text-lg">
                        {{ supplier.name }}
                      </h3>
                      <div class="text-sm text-gray-500 mt-1">
                        #{{ (currentPage - 1) * pageSize + idx + 1 }}
                      </div>
                    </div>
                    <div class="relative" v-if="canEditSupplier">
                      <button
                        @click="toggleDropdown(supplier.id)"
                        class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <span class="material-icons text-gray-600"
                          >more_vert</span
                        >
                      </button>
                      <div
                        v-show="activeDropdown === supplier.id"
                        class="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20"
                      >
                        <button
                          @click="handleEditSupplier(supplier.id)"
                          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <span class="material-icons text-16 mr-2">edit</span>
                          Edit
                        </button>
                        <button
                          @click="handleDeleteSupplier(supplier.id)"
                          class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                        >
                          <span class="material-icons text-16 mr-2"
                            >delete</span
                          >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-center text-sm">
                      <span class="material-icons text-16 mr-2 text-gray-400"
                        >phone</span
                      >
                      <span class="text-gray-700">{{
                        supplier.phone || "N/A"
                      }}</span>
                    </div>
                    <div class="flex items-center text-sm">
                      <span class="material-icons text-16 mr-2 text-gray-400"
                        >location_on</span
                      >
                      <span class="text-gray-700">{{
                        supplier.address || "N/A"
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Desktop Table View -->
              <div class="hidden md:flex flex-1 overflow-hidden flex-col">
                <div class="flex-1 overflow-hidden">
                  <div class="overflow-x-auto overflow-y-auto h-full">
                    <div class="min-h-full">
                      <table class="w-full text-sm min-w-[800px]">
                        <thead
                          class="sticky top-0 z-10 bg-gradient-to-r from-gray-50 to-gray-100"
                        >
                          <tr class="border-b border-gray-200">
                            <th
                              class="py-4 px-6 text-left font-semibold text-gray-900 text-xs uppercase tracking-wider"
                            >
                              S.N.
                            </th>
                            <th
                              class="py-4 px-6 text-left font-semibold text-gray-900 text-xs uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              class="py-4 px-6 text-left font-semibold text-gray-900 text-xs uppercase tracking-wider"
                            >
                              Phone
                            </th>
                            <th
                              class="py-4 px-6 text-left font-semibold text-gray-900 text-xs uppercase tracking-wider"
                            >
                              Address
                            </th>
                            <th
                              class="py-4 px-6 text-center font-semibold text-gray-900 text-xs uppercase tracking-wider w-32"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-100">
                          <tr
                            v-for="(supplier, idx) in displaySuppliers"
                            :key="supplier.id"
                            class="hover:bg-gray-50 transition-colors duration-150"
                          >
                            <td
                              class="py-3 md:py-4 px-4 md:px-6 font-medium text-gray-900"
                            >
                              {{ (currentPage - 1) * pageSize + idx + 1 }}
                            </td>
                            <td
                              class="py-3 md:py-4 px-4 md:px-6 text-gray-900 font-medium"
                            >
                              {{ supplier.name }}
                            </td>
                            <td class="py-3 md:py-4 px-4 md:px-6 text-gray-700">
                              {{ supplier.phone || "N/A" }}
                            </td>
                            <td class="py-3 md:py-4 px-4 md:px-6 text-gray-700">
                              {{ supplier.address || "N/A" }}
                            </td>
                            <td
                              class="py-3 md:py-4 px-4 md:px-6 text-center relative"
                            >
                              <div
                                v-if="canEditSupplier"
                                class="relative inline-block"
                              >
                                <button
                                  @click="toggleDropdown(supplier.id)"
                                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <span class="material-icons text-gray-600"
                                    >more_vert</span
                                  >
                                </button>
                                <div
                                  v-show="activeDropdown === supplier.id"
                                  class="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20"
                                >
                                  <button
                                    @click="handleEditSupplier(supplier.id)"
                                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                  >
                                    <span class="material-icons text-16 mr-2"
                                      >edit</span
                                    >
                                    Edit
                                  </button>
                                  <button
                                    @click="handleDeleteSupplier(supplier.id)"
                                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                  >
                                    <span class="material-icons text-16 mr-2"
                                      >delete</span
                                    >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <!-- Pagination -->
                <div
                  v-if="totalPages > 1"
                  class="flex-shrink-0 px-6 py-4 border-t border-gray-200"
                >
                  <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-700">
                      Showing {{ (currentPage - 1) * pageSize + 1 }} to
                      {{ Math.min(currentPage * pageSize, totalSuppliers) }} of
                      {{ totalSuppliers }} suppliers
                    </div>
                    <div class="flex items-center space-x-2">
                      <button
                        @click="currentPage = Math.max(1, currentPage - 1)"
                        :disabled="currentPage === 1"
                        class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span
                        class="px-3 py-1 text-sm text-white rounded-md"
                        :style="{
                          backgroundColor: buttonColor,
                          color: getButtonTextColor(),
                        }"
                      >
                        {{ currentPage }} of {{ totalPages }}
                      </span>
                      <button
                        @click="
                          currentPage = Math.min(totalPages, currentPage + 1)
                        "
                        :disabled="currentPage === totalPages"
                        class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Edit Modal -->
      <EditModal
        :isOpen="showEditModal"
        :supplier="selectedSupplier"
        @close="handleEditModalClose"
        @updated="handleSupplierUpdated"
      />

      <!-- Create Modal -->
      <CreateModal
        :isOpen="showCreateModal"
        @close="handleCreateModalClose"
        @created="handleSupplierCreated"
      />

      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        @click.self="cancelDelete"
      >
        <div
          class="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-2"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="p-4 sm:p-6 text-center">
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"
            >
              <span class="material-icons text-red-600 text-24">warning</span>
            </div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              Delete Supplier
            </h3>
            <p class="text-sm sm:text-base text-gray-600">
              Are you sure you want to delete
              <span class="font-medium">"{{ supplierToDelete?.name }}"</span>?
              This action cannot be undone.
            </p>
          </div>

          <!-- Modal Footer -->
          <div
            class="flex items-center justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-200"
          >
            <button
              @click="cancelDelete"
              type="button"
              class="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              type="button"
              class="px-3 sm:px-4 py-2 text-sm sm:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { useAuthStore } from "@/stores/auth";
import { useSuppliersStore } from "@/stores/suppliersAPI";
import { useTheme } from "@/composables/useTheme";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import EditModal from "@/components/Supliers/EditSupliermodel.vue";
import CreateModal from "@/components/Supliers/CreateSuplierModel.vue";

const router = useRouter();
const toast = useToast();
const auth = useAuthStore();
const { buttonColor, getButtonTextColor } = useTheme();
const suppliersStore = useSuppliersStore();

// Dynamic supplier data
const currentPage = ref(1);
const pageSize = 8;
const activeDropdown = ref(null);
const showEditModal = ref(false);
const showCreateModal = ref(false);
const selectedSupplier = ref(null);
const showDeleteModal = ref(false);
const supplierToDelete = ref(null);

const canCreateSupplier = computed(() => {
  return auth.user?.role !== "staff";
});
const canEditSupplier = computed(() => {
  return auth.user?.role !== "staff";
});

// Get suppliers from store
const suppliers = computed(() => suppliersStore.suppliers || []);
const loading = computed(() => suppliersStore.loading);
const error = computed(() => suppliersStore.error);

const totalSuppliers = computed(() => suppliers.value.length);
const totalPages = computed(() => Math.ceil(totalSuppliers.value / pageSize));

const displaySuppliers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return suppliers.value.slice(start, end);
});

const handleCreateSupplier = () => {
  if (!canCreateSupplier.value) {
    toast.error("Staff users cannot create new suppliers.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
    return;
  }
  showCreateModal.value = true;
};

const toggleDropdown = (supplierId) => {
  activeDropdown.value =
    activeDropdown.value === supplierId ? null : supplierId;
};

const handleEditSupplier = (supplierId) => {
  activeDropdown.value = null;
  if (!canEditSupplier.value) {
    toast.error("Staff users cannot edit suppliers.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
    return;
  }

  // Find the supplier and open edit modal
  const supplier = suppliers.value.find((s) => s.id === supplierId);
  if (supplier) {
    selectedSupplier.value = supplier;
    showEditModal.value = true;
  }
};

const handleEditModalClose = () => {
  showEditModal.value = false;
  selectedSupplier.value = null;
};

const handleCreateModalClose = () => {
  showCreateModal.value = false;
};

const handleSupplierUpdated = async () => {
  // Reload suppliers after update
  await loadSuppliers();
};

const handleSupplierCreated = async () => {
  // Reload suppliers after creation
  await loadSuppliers();
};

const loadSuppliers = async () => {
  try {
    await suppliersStore.fetchSuppliers();
  } catch (error) {
    console.error("Failed to load suppliers:", error);
  }
};

const handleDeleteSupplier = (supplierId) => {
  activeDropdown.value = null;
  if (!canEditSupplier.value) {
    toast.error("Staff users cannot delete suppliers.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
    return;
  }

  // Find supplier and show delete confirmation
  const supplier = suppliers.value.find((s) => s.id === supplierId);
  if (supplier) {
    supplierToDelete.value = supplier;
    showDeleteModal.value = true;
  }
};

const confirmDelete = async () => {
  if (!supplierToDelete.value) return;

  try {
    await suppliersStore.deleteSupplier(supplierToDelete.value.id);

    // Close modal and reload suppliers
    showDeleteModal.value = false;
    supplierToDelete.value = null;
    await loadSuppliers();

    toast.success("Supplier deleted successfully.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } catch (error) {
    console.error("❌ Failed to delete supplier:", error);
    toast.error("Failed to delete supplier.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  supplierToDelete.value = null;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    activeDropdown.value = null;
  }
};

onMounted(async () => {
  // Initialize suppliers store if needed
  if (!suppliersStore.suppliers) {
    suppliersStore.suppliers = [];
  }

  await loadSuppliers();

  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
