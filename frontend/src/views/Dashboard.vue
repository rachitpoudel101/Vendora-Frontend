<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white p-8 rounded shadow w-full max-w-lg text-center">
      <h2 class="text-3xl font-bold mb-4 text-blue-700">Dashboard</h2>
      <template v-if="auth.user">
        <p class="text-gray-700 text-lg">
          Welcome, <span class="font-semibold">{{ auth.user.username }}</span>!
        </p>

        <button
          @click="handleLogout"
          class="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-semibold"
        >
          Logout
        </button>

        <div v-if="logoutMsg" class="mt-4 text-sm font-medium" :class="logoutMsgType">
          {{ logoutMsg }}
        </div>
      </template>
      <template v-else>
        <p class="text-gray-700 text-lg">Loading user info...</p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/Auth'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logoutMsg = ref('')
const logoutMsgType = ref('text-green-600')

onMounted(async () => {
  if (!auth.token) {
    router.push({ name: 'Login' })
    return
  }
  // If token exists, try to fetch user info but do not redirect
  if (!auth.user) {
    await auth.self()
  }
})

async function handleLogout() {
  try {
    await auth.logout()
    logoutMsg.value = 'Logged out successfully.'
    logoutMsgType.value = 'text-green-600'
    router.push({ name: 'Login' }) 
  } catch (err: any) {
    logoutMsg.value = 'Logout failed.'
    logoutMsgType.value = 'text-red-600'
  }
}
</script>
