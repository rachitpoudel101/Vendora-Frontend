<template>
  <Modal :show="show" @close="$emit('close')" width="700px" height="600px">
    <div class="w-full">
      <div class="flex items-center gap-3 mb-6">
        <div
          class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center"
        >
          <svg
            class="w-6 h-6 text-white"
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
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Edit User</h2>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="text-center">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"
          ></div>
          <p class="text-gray-600 text-sm">Loading user details...</p>
        </div>
      </div>
      <div v-else class="h-full overflow-y-auto pr-2">
        <form
          @submit.prevent="handleUpdateUser"
          class="space-y-6 h-full flex flex-col"
        >
          <div class="flex-1 space-y-6">
            <!-- User Details Section -->
            <div>
              <div class="grid grid-cols-2 gap-4">
                <label class="block">
                  <span class="text-sm font-medium text-gray-700 mb-2 block">
                    First Name
                  </span>
                  <input
                    v-model="userData.first_name"
                    type="text"
                    class="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 hover:border-gray-400"
                  />
                </label>
                <label class="block">
                  <span class="text-sm font-medium text-gray-700 mb-2 block">
                    Last Name
                  </span>
                  <input
                    v-model="userData.last_name"
                    type="text"
                    class="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 hover:border-gray-400"
                  />
                </label>

                <label class="block">
                  <span class="text-sm font-medium text-gray-700 mb-2 block">
                    Username
                  </span>
                  <input
                    v-model="userData.username"
                    type="text"
                    class="w-full px- py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 hover:border-gray-400"
                  />
                </label>

                <label class="block">
                  <span class="text-sm font-medium text-gray-700 mb-2 block">
                    Email
                  </span>
                  <input
                    v-model="userData.email"
                    type="email"
                    class="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                  />
                </label>
              </div>
            </div>

            <!-- Password Section -->
            <div class="border-t border-gray-200">
              <div class="grid grid-cols-2 gap-4">
                <label class="block">
                  <span class="text-xs font-medium text-gray-700 mb-2 block">
                    New Password
                  </span>
                  <input
                    v-model="newPassword"
                    type="password"
                    class="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 hover:border-gray-400"
                    placeholder="Leave empty to keep current"
                  />
                </label>

                <label class="block">
                  <span class="text-xs font-medium text-gray-700 mb-2 block">
                    Confirm Password
                  </span>
                  <input
                    v-model="confirmPassword"
                    type="password"
                    class="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 hover:border-gray-400"
                    placeholder="Confirm new password"
                  />
                </label>
              </div>
              <div
                v-if="passwordError"
                class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium flex items-start gap-2 mt-3"
              >
                <svg
                  class="w-4 h-4 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ passwordError }}
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 border-t border-gray-200">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 font-medium transition-all duration-200 text-sm flex items-center justify-center gap-2"
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Changes
            </button>
            <button
              type="button"
              @click="$emit('close')"
              class="flex-1 bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-200 font-medium transition-all duration-200 text-sm flex items-center justify-center gap-2"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useToast } from "vue-toast-notification";
import Modal from "@/components/Modal.vue";
import { useUsersStore } from "@/stores/usersAPI";

const $toast = useToast();
// Props
const props = defineProps({
  show: { type: Boolean, required: true },
  userId: { type: Number, required: true },
});
const emit = defineEmits(["close"]);

// State
const usersStore = useUsersStore();
const userData = ref({
  first_name: "",
  last_name: "",
  username: "",
  email: "",
});
const originalUserData = ref({
  first_name: "",
  last_name: "",
  username: "",
  email: "",
});
const newPassword = ref("");
const confirmPassword = ref("");
const passwordError = ref("");
const loading = computed(() => usersStore.loading);
const error = computed(() => usersStore.error);
const roles = computed(() => usersStore.roles);

// Watch for userId when modal opens
watch(
  () => props.userId,
  async (newId) => {
    if (props.show && newId) {
      usersStore.loading = true;
      try {
        const fetchedUser = await usersStore.fetchUserById(newId);
        userData.value = { ...fetchedUser };
        originalUserData.value = { ...fetchedUser };
        newPassword.value = "";
        confirmPassword.value = "";
        passwordError.value = "";
      } finally {
        usersStore.loading = false;
      }
    }
  },
  { immediate: true },
);

function validatePasswords() {
  passwordError.value = "";

  // If both password fields are empty, skip password validation
  if (!newPassword.value && !confirmPassword.value) {
    return true;
  }

  if (newPassword.value.length < 8) {
    passwordError.value = "Password must be at least 8 characters long";
    return false;
  }

  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = "Passwords do not match";
    return false;
  }

  return true;
}

// Update user
async function handleUpdateUser() {
  if (!validatePasswords()) {
    return;
  }

  try {
    // Only include fields that have changed
    const updateData: any = {};

    if (userData.value.username !== originalUserData.value.username) {
      updateData.username = userData.value.username;
    }
    if (userData.value.email !== originalUserData.value.email) {
      updateData.email = userData.value.email;
    }
    if (userData.value.first_name !== originalUserData.value.first_name) {
      updateData.first_name = userData.value.first_name;
    }
    if (userData.value.last_name !== originalUserData.value.last_name) {
      updateData.last_name = userData.value.last_name;
    }

    // Only include password if it's provided
    if (newPassword.value) {
      updateData.password = newPassword.value;
    }

    console.log("Sending update data:", updateData);
    console.log("User ID:", props.userId);

    await usersStore.updateUser(props.userId, updateData);

    // SUCCESS TOAST
    $toast.success("User updated successfully!", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });

    emit("close");
  } catch (err) {
    console.error("Failed to update user:", err);

    // Extract error message - prioritize store error which now has detailed validation messages
    const errorMessage =
      usersStore.error || err.message || "Failed to update user. Try again.";

    // ERROR TOAST with response error
    $toast.error(errorMessage, {
      position: "top-right",
      duration: 5000,
      dismissible: true,
    });

    // Don't close modal on error so user can fix and retry
  }
}
</script>
