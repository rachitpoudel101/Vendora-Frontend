<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col max-h-screen"
  >
    <Navbar />
    <div class="flex flex-1 h-0 overflow-hidden max-h-screen">
      <Sidebar />
      <main class="w-[calc(100vw-256px)] p-5">
        <div class="flex items-center justify-between">
          <h2
            class="text-4xl font-extrabold mb-8 text-blue-700 tracking-wide drop-shadow-lg max-h-screen text-left"
          >
            👥 Users
          </h2>
          <button
            class="max-h-screen mb-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-full shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
            @click="onCreateUser"
          >
            <span class="material-icons text-lg">person_add</span>
            <span>Create User</span>
          </button>
        </div>
        <div class="overflow-x-auto w-full max-w-10xl">
          <div class="p-0">
            <div class="table-scroll-area">
              <table
                class="w-full rounded-2xl overflow-hidden shadow-xl border border-blue-200 bg-white"
              >
                <thead class="sticky top-0 z-10">
                  <tr
                    class="bg-gradient-to-r from-blue-200 via-purple-100 to-blue-100 text-blue-800"
                  >
                    <th class="py-4 px-4 text-left font-bold">S.N.</th>
                    <th class="py-4 px-4 text-left font-bold">Name</th>
                    <th class="py-4 px-4 text-left font-bold">Username</th>
                    <th class="py-4 px-4 text-left font-bold">Email</th>
                    <th class="py-4 px-4 text-left font-bold">Role</th>
                    <th class="py-4 px-4 text-center font-bold w-40">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(user, idx) in paginatedUsers"
                    :key="user.id"
                    class="even:bg-blue-50 odd:bg-white hover:bg-purple-50 transition-colors border-b border-blue-100"
                  >
                    <td class="py-3 px-4 font-bold text-blue-600">
                      {{ (currentPage - 1) * pageSize + idx + 1 }}
                    </td>
                    <td class="py-3 px-4 text-gray-700">
                      {{ user.first_name }} {{ user.last_name }}
                    </td>
                    <td class="py-3 px-4 text-gray-700">{{ user.username }}</td>
                    <td class="py-3 px-4 text-gray-700">{{ user.email }}</td>
                    <td class="py-3 px-4 text-purple-700 font-semibold">
                      {{ user.role }}
                    </td>
                    <td class="py-3 px-4 flex justify-center relative">
                      <!-- Three-dot button -->
                      <div class="dropdown-container">
                        <button
                          @click.stop="
                            dropdownOpen === user.id
                              ? (dropdownOpen = null)
                              : (dropdownOpen = user.id)
                          "
                          class="text-gray-700 hover:text-gray-900 focus:outline-none text-xl font-bold px-2 py-1"
                          title="Options"
                        >
                          ⋮
                        </button>

                        <!-- Dropdown menu -->
                        <div
                          v-if="dropdownOpen === user.id"
                          class="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg z-50 flex flex-col gap-2 p-2"
                        >
                          <button
                            class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2 shadow w-full text-left text-sm font-semibold"
                            @click="
                              openEditModal(user.id);
                              dropdownOpen = null;
                            "
                          >
                            <span class="material-icons text-base">edit</span>
                            Edit
                          </button>
                          <button
                            class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow w-full text-left text-sm font-semibold"
                            @click="
                              openEditRoleModal(user.id);
                              dropdownOpen = null;
                            "
                          >
                            <span class="material-icons text-base"
                              >manage_accounts</span
                            >
                            Change Role
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="paginatedUsers.length === 0">
                    <td
                      colspan="5"
                      class="py-3 px-4 text-gray-400 bg-gray-50 rounded-lg text-center"
                    >
                      No users found.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex justify-center items-center gap-2 mt-4">
              <button
                class="px-3 py-1 rounded bg-blue-200 text-blue-700 hover:bg-blue-300 transition"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                Prev
              </button>
              <span class="font-semibold text-blue-700"
                >Page {{ currentPage }} of {{ totalPages }}</span
              >
              <button
                class="px-3 py-1 rounded bg-blue-200 text-blue-700 hover:bg-blue-300 transition"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                Next
              </button>
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
<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import UserEditModal from "@/components/UserEditModal.vue";
import UserEditRole from "@/components/UserEditRole.vue";
import { fetchUsers } from "@/stores/usersAPI";
import { useRouter } from "vue-router";
// import { useAuthStore } from '@/stores/auth'
// const auth = useAuthStore()
const users = ref([]);
const showModal = ref(false);
const selectedUserId = ref(null);
const showRoleEditModal = ref(false);
const dropdownOpen = ref(null);

const router = useRouter();

onMounted(async () => {
  users.value = await fetchUsers();
  // if (!auth.user) {
  //   await auth.self()
  //}
});

function onCreateUser() {
  router.push("/users/create");
}

function openEditModal(id) {
  selectedUserId.value = id;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function closeRoleEditModal() {
  showRoleEditModal.value = false;
}
function openEditRoleModal(id) {
  selectedUserId.value = id;
  showRoleEditModal.value = true;
}

const pageSize = 10;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(users.value.length / pageSize));
const paginatedUsers = computed(() =>
  users.value.slice(
    (currentPage.value - 1) * pageSize,
    currentPage.value * pageSize,
  ),
);

watch(users, () => {
  if (currentPage.value > totalPages.value)
    currentPage.value = totalPages.value || 1;
});

const handleClickOutside = (event) => {
  if (!event.target.closest(".dropdown-container")) {
    dropdownOpen.value = null;
  }
};

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.animate-fade-in {
  animation: fadeIn 0.7s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(60, 60, 120, 0.15);
  backdrop-filter: blur(2px);
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

/* Table UI enhancements */
table {
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1rem;
}
th,
td {
  transition: background 0.2s;
}
th {
  letter-spacing: 0.03em;
}
tbody tr {
  transition: box-shadow 0.2s;
}
tbody tr:hover {
  box-shadow: 0 2px 8px 0 rgba(80, 80, 180, 0.08);
  background: #f3e8ff !important;
}

.table-scroll-area {
  /* max-height: px; */
  overflow-y: auto;
  border-radius: 1rem;
}
</style>
