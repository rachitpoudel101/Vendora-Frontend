<template>
  <nav class="bg-blue-700 shadow flex items-center justify-between px-8 py-4 sticky top-0 z-10">
    <div class="flex items-center gap-2">
      <span class="text-white font-bold text-2xl tracking-wide">Stationary App</span>
    </div>
    <div class="flex items-center gap-4 relative">
      <!-- Profile dropdown -->
      <div class="relative" @mouseenter="dropdownOpen = true" @mouseleave="dropdownOpen = false">
        <button
          class="mx-2 text-white hover:text-blue-200 font-medium transition flex items-center gap-2 focus:outline-none"
        >
          Profile
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          v-if="dropdownOpen && user"
          class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 z-20"
        >
          <div class="px-4 py-2 text-blue-700 font-semibold border-b">{{ user.username }}</div>
          <button
            @click="handleLogout"
            class="w-full text-left px-4 py-2 text-red-600 hover:bg-blue-50 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/Auth'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
const $route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const user = computed(() => auth.user)
const dropdownOpen = ref(false)

async function handleLogout() {
  try {
    await auth.logout()
    router.push({ name: 'Login' }) 
  } catch (err: any) {
    // Optionally handle error
  }
}
</script>