<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <div class="flex flex-1 h-0">
      <Sidebar />
      <main class="flex-1 flex items-center justify-center overflow-auto">
        <div class="bg-white p-8 rounded shadow w-full max-w-lg text-center">
          <h2 class="text-3xl font-bold mb-4 text-blue-700">Users</h2>
          <button
            class="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            @click="onCreateUser"
          >
            Create User
          </button>
          <table class="w-full border mt-4">
            <thead>
              <tr class="bg-gray-100">
                <th class="py-2 px-4 border">#</th>
                <th class="py-2 px-4 border">Name</th>
                <th class="py-2 px-4 border">Email</th>
                <th class="py-2 px-4 border">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, idx) in users" :key="user.id">
                <td class="py-2 px-4 border">{{ idx + 1 }}</td>
                <td class="py-2 px-4 border">{{ user.name }}</td>
                <td class="py-2 px-4 border">{{ user.email }}</td>
                <td class="py-2 px-4 border">{{ user.role }}</td>
              </tr>
              <tr v-if="users.length === 0">
                <td colspan="4" class="py-2 px-4 border text-gray-400">No users found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue"
import Navbar from '@/components/Navbar.vue'
import { ref, onMounted } from 'vue'
import { fetchUsers } from '../../core/api'
import { useRouter } from 'vue-router'

const users = ref<{ id: number; name: string; email: string; role: string }[]>([])

const router = useRouter()

onMounted(async () => {
  users.value = await fetchUsers()
})

function onCreateUser() {
  router.push('/users/create')
}
</script>