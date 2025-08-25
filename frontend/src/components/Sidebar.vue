<template>
  <aside class="bg-[#6A89A7] text-white w-64 min-h-screen flex flex-col py-6 px-4 shadow-lg">
    <nav class="flex flex-col gap-2">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="px-3 py-2 rounded transition-colors duration-200 flex items-center gap-2"
        :class="{
          'bg-blue-900 font-semibold shadow': $route.path === item.path,
          'hover:bg-blue-800': $route.path !== item.path
        }"
      >
        <span v-if="item.icon" class="text-lg">{{ item.icon }}</span>
        {{ item.label }}
      </router-link>
    </nav>
    <div class="mt-auto pt-8 text-xs text-blue-200 text-center">
      &copy; {{ new Date().getFullYear() }} Stationary App
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const $route = useRoute()

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
  { label: 'Items', path: '/items', icon: '📦' },
  { label: 'Orders', path: '/orders', icon: '📝' },
  { label: 'Users', path: '/users', icon: '👤' }
]
</script>