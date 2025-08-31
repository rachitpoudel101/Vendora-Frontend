<template>
  <!-- Hamburger for mobile -->
  <button
    class="md:hidden fixed top-4 left-4 z-40 bg-[#6A89A7] text-white rounded-full p-2 shadow-lg"
    @click="showSidebar = true"
    aria-label="Open sidebar"
  >
    <svg
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>

  <!-- Overlay for mobile sidebar -->
  <div
    v-if="showSidebar"
    class="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
    @click="showSidebar = false"
  ></div>

  <!-- Sidebar -->
  <div
    :class="[
      'bg-[#6A89A7] text-white w-64 flex flex-col py-4 px-4 shadow-lg z-40',
      'fixed top-0 left-0 h-full transition-transform duration-300',
      showSidebar ? 'translate-x-0' : '-translate-x-full',
      'md:static md:translate-x-0 md:h-auto md:w-64 md:flex',
    ]"
  >
    <nav class="flex flex-col gap-2 mt-12 md:mt-0">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="px-3 py-2 rounded transition-colors duration-200 flex items-center gap-2 text-base"
        :class="{
          'bg-blue-900 font-semibold shadow': $route.path === item.path,
          'hover:bg-blue-800': $route.path !== item.path,
        }"
        @click="showSidebar = false"
      >
        <span v-if="item.icon" class="text-lg">{{ item.icon }}</span>
        {{ item.label }}
      </router-link>
    </nav>
    <div class="mt-auto pt-8 text-xs text-blue-200 text-center">
      &copy; {{ new Date().getFullYear() }} Stationary App
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
const $route = useRoute();

const showSidebar = ref(false);

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "🏠" },
  { label: "Stocks", path: "/stocks", icon: "📦" },
  { label: "Billing", path: "/billing", icon: "📝" },
  { label: "Users", path: "/users", icon: "👤" },
];
</script>

<style scoped>
/* Hide sidebar on mobile by default, show with slide-in */
@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 16rem;
    z-index: 40;
    background: #6a89a7;
    transition: transform 0.3s;
  }
}
</style>
