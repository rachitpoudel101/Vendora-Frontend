<template>
  <Modal :show="show" @close="$emit('close')">
    <h2 class="text-xl font-bold mb-4">Edit User</h2>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <form @submit.prevent="handleUpdateUser">
        <label class="block mb-2">
          First Name:
          <input
            v-model="userData.first_name"
            type="text"
            class="border p-1 w-full rounded"
          />
        </label>
        <label class="block mb-2">
          Last Name:
          <input
            v-model="userData.last_name"
            type="text"
            class="border p-1 w-full rounded"
          />
        </label>
        <label class="block mb-2">
          Username:
          <input
            v-model="userData.username"
            type="text"
            class="border p-1 w-full rounded"
          />
        </label>
        <label class="block mb-2">
          Email:
          <input
            v-model="userData.email"
            type="email"
            class="border p-1 w-full rounded"
          />
        </label>

        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded mt-3"
        >
          Save
        </button>
      </form>
    </div>
  </Modal>
</template>

<script setup>
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
        userData.value = await usersStore.getUser(newId);
      } finally {
        usersStore.loading = false;
      }
    }
  },
  { immediate: true },
);

// Update user
async function handleUpdateUser() {
  try {
    await usersStore.updateUser(props.userId, {
      username: userData.value.username,
      email: userData.value.email,
      first_name: userData.value.first_name,
      last_name: userData.value.last_name,
    });

    // SUCCESS TOAST
    $toast.success("User updated successfully!", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });

    emit("close");
  } catch (err) {
    console.error("Failed to update user:", err);

    // ERROR TOAST
    $toast.error("Failed to update user. Try again.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });

    emit("close");
  }
}
</script>
