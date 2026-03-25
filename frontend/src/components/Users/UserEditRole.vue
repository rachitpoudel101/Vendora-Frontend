<template>
  <Modal :show="show" @close="$emit('close')">
    <h2 class="text-xl font-bold mb-4">Edit User Role</h2>
    <div>
      <form @submit.prevent="handleUpdateRole">
        <label class="block mb-2">
          Role:
          <select v-model="userRole" class="border p-1 w-full rounded">
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
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
import { computed, onMounted, ref, watch } from "vue";
import Modal from "@/components/Modal.vue";
import { useUsersStore } from "@/stores/usersAPI";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

// Props
const props = defineProps({
  show: { type: Boolean, required: true },
  userId: { type: Number, required: true },
});
const emit = defineEmits(["close"]);

const usersStore = useUsersStore();

const userRole = ref();

// Update reactive data to use store state
const loading = computed(() => usersStore.loading);
const error = computed(() => usersStore.error);
const roles = computed(() => usersStore.roles);

async function handleUpdateRole() {
  try {
    await usersStore.updateUserRoles(props.userId, { role: userRole.value });

    // SUCCESS TOAST
    $toast.success("User role updated successfully!", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });

    emit("close");
  } catch (err) {
    console.error("Failed to update user role:", err);

    // ERROR TOAST
    $toast.error("Failed to update user role. Try again.", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });

    emit("close");
  }
}

// Watch for userId when modal opens
watch(
  () => props.userId,
  async (newId) => {
    if (props.show && newId) {
      try {
        const response = await usersStore.getUser(newId);
        userRole.value = response.role;
      } finally {
      }
    }
  },
  { immediate: true },
);

onMounted(async () => {
  await usersStore.fetchRoles();
});
</script>
