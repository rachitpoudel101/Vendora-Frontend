<template>
  <!-- Hamburger for mobile -->
  <button
    class="md:hidden fixed top-20 left-4 z-30 bg-[#6A89A7] text-white rounded-lg p-2.5 shadow-lg hover:bg-[#5a7a94] transition-colors duration-200"
    @click="showSidebar = true"
    aria-label="Open sidebar"
  >
    <svg
      class="w-5 h-5"
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
    class="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 md:hidden transition-opacity duration-300"
    @click="showSidebar = false"
  ></div>

  <!-- Sidebar -->
  <div
    class="sidebar fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-[#6A89A7] to-[#5a7a94] text-white shadow-2xl z-30 transition-transform duration-300 ease-in-out"
    :class="[
      showSidebar ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0'
    ]"
  >

    <!-- Navigation -->
    <nav class="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium"
        :class="{
          'bg-white/20 text-white shadow-lg backdrop-blur-sm': $route.path === item.path,
          'text-white/80 hover:text-white hover:bg-white/10': $route.path !== item.path,
        }"
        @click="showSidebar = false"
      >
        <span class="text-lg group-hover:scale-110 transition-transform duration-200">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Footer Section -->
    <div class="p-4 border-t border-white/10">
      <div class="text-xs text-white/60 text-center">
        © 2024 StationaryApp
      </div>
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
.sidebar {
  backdrop-filter: blur(20px);
}

/* Custom scrollbar for navigation */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 767px) {
  .sidebar {
    transform: translateX(-100%);
    top: 0;
    height: 100vh;
    z-index: 25;
  }
  
  .sidebar.translate-x-0 {
    transform: translateX(0);
  }
}
</style>
