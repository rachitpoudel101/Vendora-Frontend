<template>
  <Modal :show="show" @close="$emit('close')">
    <h2 class="text-xl font-bold mb-4">Edit User Role</h2>
    <div>
      <form @submit.prevent="handleUpdateRole">
        <label class="block mb-2">
          Role:
          <select v-model="userRole" class="border p-1 w-full rounded">
            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
          </select>
        </label>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded mt-3">
          Save
        </button>
      </form>
    </div>
  </Modal>
</template>

<script setup>

import { onMounted, ref, watch } from "vue"
import Modal from "@/components/Modal.vue"
import axios from "axios"
import {UserApi} from "@/core/Users"
import {authAPI} from "@/core/auth"
import {fetchROles} from "@/core/api"
import { getUser, UpdateRoles } from "@/core/api"

// Props
const props = defineProps({
  show: { type: Boolean, required: true },
  userId: { type: Number, required: true }
})
const emit = defineEmits(["close"])

const roles = ref()
const userRole = ref()

async function handleUpdateRole(){
    try {
    await UpdateRoles(props.userId, {role: userRole.value})
    emit("close")
  } catch (err) {
    console.error("Failed to update user:", err)
  }
  emit("close")
}

// Watch for userId when modal opens
watch(
  () => props.userId,
  async (newId) => {
    console.log(newId)
   if (props.show && newId) {
      try {
        const response = await getUser(newId)
        userRole.value = response.role
      } finally {
      }
    }
  },
  { immediate: true }
)

onMounted (async ()=>{
    roles.value = await fetchROles()
}
) 
</script>
