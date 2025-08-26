<template>
  <nav class="bg-[#6A89A7] shadow flex items-center justify-between px-8 py-4 sticky top-0 z-10">
    <div class="flex items-center gap-2">
      <span class="text-white font-bold text-2xl tracking-wide">Stationary App</span>
    </div>
    <div class="flex items-center gap-4 relative">
      <!-- Profile dropdown -->
      <div class="relative" ref="dropdownRef">
        <button
          class="mx-2 text-white hover:text-blue-200 font-medium transition flex items-center gap-2 focus:outline-none"
          @click="toggleDropdown"
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
  <div v-if="logoutMsg" class="w-full text-center py-2" :class="logoutMsgType">
    {{ logoutMsg }}
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/Auth'
import {  useRouter } from 'vue-router'
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
const router = useRouter()
const auth = useAuthStore()
const user = computed(() => auth.user)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const logoutMsg = ref('')
const logoutMsgType = ref('text-green-600')

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function handleClickOutside(event: MouseEvent) {
  if (
    dropdownOpen.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
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