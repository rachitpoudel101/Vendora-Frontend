<template>
  <div class="min-h-screen bg-gray-50 flex flex-col max-h-screen">
    <Navbar />
    <div
      class="flex flex-1 h-0 overflow-hidden max-h-screen flex-col md:flex-row"
    >
      <Sidebar class="w-full md:w-64" />
      <main class="flex-1 p-4 md:p-6 w-full bg-white">
        <div
          class="flex flex-row items-center justify-between gap-4 mb-6 md:mb-8 pb-4 border-b border-gray-200"
        >
          <div>
            <h1
              class="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight"
            >
              Users Management
            </h1>
            <p class="text-sm text-gray-600 mt-1">
              Manage user accounts and permissions
            </p>
          </div>
          <button
            v-show="canCreateUser"
            class="px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base font-medium"
            @click="handleCreateUser"
          >
            <span class="material-icons text-lg">person_add</span>
            <span>Add User</span>
          </button>
        </div>

        <div class="w-full max-w-full">
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div
              class="table-scroll-area max-h-[70vh] overflow-y-auto"
              :class="{ 'min-h-[400px]': displayUsers.length <= 1 }"
            >
              <table class="w-full text-sm md:text-base">
                <thead class="sticky top-0 z-10">
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th
                      class="py-3 md:py-4 px-4 md:px-6 text-left font-semibold text-gray-900 text-xs md:text-sm uppercase tracking-wider"
                    >
                      #
                    </th>
                    <th
                      class="py-3 md:py-4 px-4 md:px-6 text-left font-semibold text-gray-900 text-xs md:text-sm uppercase tracking-wider"
                    >
                      Full Name
                    </th>
                    <th
                      class="py-3 md:py-4 px-4 md:px-6 text-left font-semibold text-gray-900 text-xs md:text-sm uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      class="py-3 md:py-4 px-4 md:px-6 text-left font-semibold text-gray-900 text-xs md:text-sm uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      class="py-3 md:py-4 px-4 md:px-6 text-left font-semibold text-gray-900 text-xs md:text-sm uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      class="py-3 md:py-4 px-4 md:px-6 text-center font-semibold text-gray-900 text-xs md:text-sm uppercase tracking-wider w-32 md:w-40"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="(user, idx) in displayUsers"
                    :key="user.id"
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
                      {{ user.first_name }} {{ user.last_name }}
                    </td>
                    <td class="py-3 md:py-4 px-4 md:px-6 text-gray-700">
                      {{ user.username }}
                    </td>
                    <td class="py-3 md:py-4 px-4 md:px-6 text-gray-700">
                      {{ user.email }}
                    </td>
                    <td class="py-3 md:py-4 px-4 md:px-6">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getRoleBadgeClass(user.role)"
                      >
                        {{ user.role }}
                      </span>
                    </td>
                    <td class="py-3 md:py-4 px-4 md:px-6 text-center relative">
                      <div class="dropdown-container">
                        <button
                          @click.stop="toggleDropdown(user.id)"
                          class="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                          title="More options"
                        >
                          <span class="sr-only">Open options</span>
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                            />
                          </svg>
                        </button>

                        <div
                          v-if="dropdownOpen === user.id"
                          class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                        >
                          <div class="py-1">
                            <button
                              v-if="!user.is_deleted"
                              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-2"
                              @click="handleEditUser(user.id)"
                            >
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit User
                            </button>
                            <button
                              v-if="!user.is_deleted"
                              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-2"
                              @click="handleEditRole(user.id)"
                            >
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                              </svg>
                              Change Role
                            </button>
                            <hr
                              v-if="!user.is_deleted"
                              class="my-1 border-gray-200"
                            />
                            <button
                              v-if="!user.is_deleted"
                              class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
                              @click="handleDeleteUser(user.id)"
                            >
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete User
                            </button>
                            <button
                              v-if="user.is_deleted"
                              class="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 hover:text-green-700 flex items-center gap-2"
                              @click="handleRestoreUser(user.id)"
                            >
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11.356-2A8.001 8.001 0 0019.418 15M15 11v6m4-6v6m-4-3h.01M19 8h.01"
                                />
                              </svg>
                              Restore User
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="displayUsers.length === 0">
                    <td colspan="6" class="py-12 px-4 md:px-6 text-center">
                      <div class="flex flex-col items-center justify-center">
                        <svg
                          class="w-12 h-12 text-gray-300 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <h3 class="text-lg font-medium text-gray-900 mb-1">
                          No users found
                        </h3>
                        <p class="text-gray-500">
                          Get started by creating your first user.
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="flex-1 flex justify-between sm:hidden">
                  <button
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="currentPage === 1"
                    @click="previousPage"
                  >
                    Previous
                  </button>
                  <button
                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="currentPage === totalPages"
                    @click="nextPage"
                  >
                    Next
                  </button>
                </div>
                <div
                  class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
                >
                  <div>
                    <p class="text-sm text-gray-700">
                      Showing
                      <span class="font-medium">{{ startIndex }}</span>
                      to
                      <span class="font-medium">{{ endIndex }}</span>
                      of
                      <span class="font-medium">{{ totalUsers }}</span>
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    >
                      <button
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="currentPage === 1"
                        @click="previousPage"
                      >
                        <span class="sr-only">Previous</span>
                        <svg
                          class="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <span
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                      >
                        Page {{ currentPage }} of {{ totalPages }}
                      </span>
                      <button
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="currentPage === totalPages"
                        @click="nextPage"
                      >
                        <span class="sr-only">Next</span>
                        <svg
                          class="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <transition name="modal-fade">
            <UserEditModal
              v-if="showModal"
              :show="showModal"
              :userId="selectedUserId"
              width="700px"
              height="400px"
              @close="closeModal"
              class="modal-overlay"
            />
          </transition>
          <transition name="modal-fade">
            <UserEditRole
              v-if="showRoleEditModal"
              :show="showRoleEditModal"
              :userId="selectedUserId"
              width="700px"
              height="400px"
              @close="closeRoleEditModal"
              class="modal-overlay"
            />
          </transition>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { useAuthStore } from "@/stores/auth";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import UserEditModal from "@/components/UserEditModal.vue";
import UserEditRole from "@/components/UserEditRole.vue";
import { fetchUsers, deleteUser, restoreUser } from "@/stores/usersAPI";

const router = useRouter();
const toast = useToast();
const auth = useAuthStore();

const users = ref([]);
const showModal = ref(false);
const selectedUserId = ref(null);
const showRoleEditModal = ref(false);
const dropdownOpen = ref(null);
const currentPage = ref(1);
const pageSize = 10;

const canCreateUser = computed(() => {
  return auth.user?.role !== "staff";
});

const totalUsers = computed(() => users.value.length);
const totalPages = computed(() => Math.ceil(totalUsers.value / pageSize));
const startIndex = computed(() => (currentPage.value - 1) * pageSize + 1);
const endIndex = computed(() =>
  Math.min(currentPage.value * pageSize, totalUsers.value),
);

const displayUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return users.value.slice(start, end);
});

const getRoleBadgeClass = (role) => {
  const classes = {
    admin: "bg-blue-100 text-blue-800",
    user: "bg-green-100 text-green-800",
    staff: "bg-yellow-100 text-yellow-800",
  };
  return classes[role] || "bg-gray-100 text-gray-800";
};

const handleClickOutside = (event) => {
  if (!event.target?.closest(".dropdown-container")) {
    dropdownOpen.value = null;
  }
};

const toggleDropdown = (userId) => {
  dropdownOpen.value = dropdownOpen.value === userId ? null : userId;
};

const handleCreateUser = () => {
  if (!canCreateUser.value) {
    toast.error("Staff users cannot create new users.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
    return;
  }
  router.push("/users/create");
};

const handleEditUser = (userId) => {
  selectedUserId.value = userId;
  showModal.value = true;
  dropdownOpen.value = null;
};

const handleEditRole = (userId) => {
  selectedUserId.value = userId;
  showRoleEditModal.value = true;
  dropdownOpen.value = null;
};

const closeModal = () => {
  showModal.value = false;
};

const closeRoleEditModal = () => {
  showRoleEditModal.value = false;
};

const handleDeleteUser = async (userId) => {
  const confirmed = confirm("Are you sure you want to delete this user?");
  if (!confirmed) return;

  try {
    await deleteUser(userId);
    users.value = users.value.filter((user) => user.id !== userId);

    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value || 1;
    }

    toast.success("User deleted successfully!", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } catch (error) {
    console.error("Failed to delete user:", error);
    toast.error("Failed to delete user. Try again.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
  dropdownOpen.value = null;
};

const handleRestoreUser = async (userId) => {
  try {
    await restoreUser(userId);
    users.value = await fetchUsers();
    toast.success("User restored successfully!", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } catch (error) {
    toast.error("Failed to restore user.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
  dropdownOpen.value = null;
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

onMounted(async () => {
  try {
    users.value = await fetchUsers();
  } catch (error) {
    console.error("Failed to fetch users:", error);
    toast.error("Failed to load users.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }

  if (auth.user?.role === "staff") {
    toast.error("Staff users cannot view the users list.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
    router.replace("/dashboard");
  }
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});

watch(users, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1;
  }
});

window.addEventListener("click", handleClickOutside);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

table {
  border-collapse: separate;
  border-spacing: 0;
}

.table-scroll-area {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 0;
}

@media (max-width: 768px) {
  .table-scroll-area table {
    font-size: 0.875rem;
    min-width: 640px;
  }

  .modal-overlay {
    width: 100vw !important;
    height: 100vh !important;
    min-width: 0 !important;
    min-height: 0 !important;
  }
}
</style>
