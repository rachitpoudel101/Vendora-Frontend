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
                    Users Management
                  </h1>
                  <p class="text-gray-600 text-sm sm:text-base lg:text-lg">
                    Manage user accounts and permissions efficiently
                  </p>
                </div>

                <button
                  v-show="canCreateUser"
                  class="w-full lg:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  @click="handleCreateUser"
                >
                  <span class="material-icons text-18 sm:text-20 mr-2"
                    >person_add</span
                  >
                  <span class="text-sm sm:text-base">Add User</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Users Table -->
          <div
            class="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden min-h-0"
          >
            <!-- Mobile Cards View -->
            <div class="block md:hidden flex-1 overflow-y-auto p-4 space-y-4">
              <div
                v-for="(user, idx) in displayUsers"
                :key="user.id"
                class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div class="flex justify-between items-start mb-3">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 text-lg">
                      {{ user.first_name }} {{ user.last_name }}
                    </h3>
                    <p class="text-gray-600 text-sm">@{{ user.username }}</p>
                  </div>
                  <div class="relative dropdown-container">
                    <!-- Mobile dropdown button -->
                    <button
                      @click.stop="toggleDropdown(user.id)"
                      class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                    >
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
                    <!-- Mobile dropdown menu -->
                    <div
                      v-if="dropdownOpen === user.id"
                      class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
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
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 002.944 12c0 4.993 3.684 9.128 8.618 10.128A12.02 12.02 0 0021.056 12a11.955 11.955 0 01-8.618-9.056z"
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
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-500">Email:</span>
                    <span class="text-gray-900 font-medium">{{
                      user.email
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Role:</span>
                    <span
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                      :class="getRoleBadgeClass(user.role)"
                    >
                      {{ user.role }}
                    </span>
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
                            #
                          </th>
                          <th
                            class="py-4 px-6 text-left font-semibold text-gray-900 text-xs uppercase tracking-wider"
                          >
                            Full Name
                          </th>
                          <th
                            class="py-4 px-6 text-left font-semibold text-gray-900 text-xs uppercase tracking-wider"
                          >
                            Username
                          </th>
                          <th
                            class="py-4 px-6 text-left font-semibold text-gray-900 text-xs uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            class="py-4 px-6 text-left font-semibold text-gray-900 text-xs uppercase tracking-wider"
                          >
                            Role
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
                          <td
                            class="py-3 md:py-4 px-4 md:px-6 text-center relative"
                          >
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
                                class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
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
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 002.944 12c0 4.993 3.684 9.128 8.618 10.128A12.02 12.02 0 0021.056 12a11.955 11.955 0 01-8.618-9.056z"
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
                          <td
                            colspan="6"
                            class="py-12 px-4 md:px-6 text-center"
                          >
                            <div
                              class="flex flex-col items-center justify-center"
                            >
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
                              <h3
                                class="text-lg font-medium text-gray-900 mb-1"
                              >
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
                </div>
              </div>

              <!-- Desktop Pagination -->
              <div
                class="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200 flex-shrink-0"
              >
                <div class="flex items-center justify-between">
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

            <!-- Mobile Pagination -->
            <div
              class="block md:hidden bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-t border-gray-200"
            >
              <div class="flex justify-between items-center">
                <button
                  class="px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  :disabled="currentPage === 1"
                  @click="previousPage"
                >
                  Previous
                </button>
                <span class="text-sm text-gray-700">
                  Page {{ currentPage }} of {{ totalPages }}
                </span>
                <button
                  class="px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  :disabled="currentPage === totalPages"
                  @click="nextPage"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <!-- Modals -->
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
import { useUsersStore } from "@/stores/usersAPI";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import UserEditModal from "@/components/Users/UserEditModal.vue";
import UserEditRole from "@/components/Users/UserEditRole.vue";

const router = useRouter();
const toast = useToast();
const auth = useAuthStore();
const usersStore = useUsersStore();

const showModal = ref(false);
const selectedUserId = ref(null);
const showRoleEditModal = ref(false);
const dropdownOpen = ref(null);
const currentPage = ref(1);
const pageSize = 8;

const canCreateUser = computed(() => {
  return auth.user?.role !== "staff";
});

const totalUsers = computed(() => usersStore.users.length);
const totalPages = computed(() => Math.ceil(totalUsers.value / pageSize));
const startIndex = computed(() => (currentPage.value - 1) * pageSize + 1);
const endIndex = computed(() =>
  Math.min(currentPage.value * pageSize, totalUsers.value),
);

const displayUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return usersStore.users.slice(start, end);
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
    await usersStore.deleteUser(userId);
    // users.value = users.value.filter((user) => user.id !== userId);

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
    await usersStore.restoreUser(userId);
    // users.value = await fetchUsers();
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
    await usersStore.fetchUsers();
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

watch(usersStore.users, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1;
  }
});

window.addEventListener("click", handleClickOutside);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.text-20 {
  font-size: 20px;
}

/* Enhanced scrollbar for table only */
.overflow-x-auto::-webkit-scrollbar,
.overflow-y-auto::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track,
.overflow-y-auto::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb,
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 4px;
  border: 1px solid #f1f5f9;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover,
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
}

.overflow-x-auto::-webkit-scrollbar-corner,
.overflow-y-auto::-webkit-scrollbar-corner {
  background: #f8fafc;
}

/* Enhanced mobile responsiveness */
@media (max-width: 767px) {
  main {
    margin-left: 0;
    padding-top: 0;
  }

  .material-icons.text-18 {
    font-size: 18px;
  }

  .material-icons.text-20 {
    font-size: 20px;
  }
}

@media (max-width: 640px) {
  .min-h-screen {
    padding-top: 70px;
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .overflow-x-auto table {
    min-width: 800px;
  }

  main {
    margin-left: 0;
  }
}
</style>
