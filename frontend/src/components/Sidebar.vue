<template>
  <!-- Overlay for mobile sidebar -->
  <div
    v-if="showSidebar"
    class="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 md:hidden transition-opacity duration-300"
    @click="showSidebar = false"
  ></div>

  <!-- Sidebar -->
  <div
    class="sidebar fixed left-0 w-64 text-white shadow-2xl z-30 transition-transform duration-300 ease-in-out"
    :style="{ backgroundColor: sidebarColor }"
    :class="[
      showSidebar ? 'translate-x-0' : '-translate-x-full',
      'top-0 h-screen md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0',
    ]"
  >
    <!-- Mobile close button -->
    <div
      class="md:hidden flex justify-between items-center p-4 border-b border-white/10"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0"
        >
          <img
            src="@/assets/Vendora-.png"
            alt="Vendora Logo"
            class="w-full h-full object-contain"
          />
        </div>
        <span class="text-white font-bold text-lg whitespace-nowrap"
          >Vendora</span
        >
      </div>
      <button
        @click="showSidebar = false"
        class="text-white/80 hover:text-white p-1 flex-shrink-0"
        aria-label="Close sidebar"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav
      class="flex flex-col gap-1 p-4 flex-1 overflow-y-auto"
      :class="{ 'pt-0': showSidebar }"
    >
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium"
        :class="{
          'bg-white/20 text-white shadow-lg': $route.path === item.path,
          'text-white/70 hover:text-white hover:bg-white/10':
            $route.path !== item.path,
        }"
        @click="showSidebar = false"
      >
        <span
          class="text-xl group-hover:scale-110 transition-transform duration-200"
        >
          {{ item.icon }}
        </span>
        <span class="truncate">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Footer Section -->
    <div class="p-4 border-t border-white/10 flex-shrink-0">
      <div class="text-xs text-white/50 text-center">© 2025 Vendora</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useThemeStore } from "@/stores/themeStore";
import { useSidebar } from "@/composables/useSidebar";

const $route = useRoute();
const auth = useAuthStore();
const theme = useThemeStore();
const { sidebarOpen: showSidebar } = useSidebar();
const sidebarColor = computed(() => theme.sidebarColor);

// Close sidebar when route changes
watch(
  () => $route.path,
  () => {
    showSidebar.value = false;
  },
);

const allNavItems = [
  { label: "Dashboard", path: "/dashboard", icon: "🏠" },
  { label: "Stocks", path: "/stocks", icon: "📦" },
  { label: "Billing", path: "/billing", icon: "📝" },
  { label: "Users", path: "/users", icon: "👤", adminOnly: true },
  { label: "Suppliers", path: "/suppliers", icon: "🏭", adminOnly: true },
  {
    label: "Unit Configurations",
    path: "/configurations",
    icon: "⚙️",
    adminOnly: true,
  },
  {
    label: "Theme Settings",
    path: "/theme-settings",
    icon: "🎨",
    adminOnly: true,
  },
  { label: "Tenants", path: "/tenants", icon: "🏢", superAdminOnly: true },
];

const navItems = computed(() => {
  const isSuperAdmin = auth.user?.role === "superadmin";
  const isStaff = auth.user?.role === "staff";

  return allNavItems.filter((item) => {
    // Hide staff-only items from staff users
    if (isStaff && item.adminOnly) {
      return false;
    }
    // Hide superadmin-only items from non-superadmins
    if (item.superAdminOnly && !isSuperAdmin) {
      return false;
    }
    return true;
  });
});

// Expose for direct access
defineExpose({
  showSidebar,
});
</script>

<style scoped>
.sidebar {
  backdrop-filter: blur(20px);
}

/* Custom scrollbar for navigation */
nav::-webkit-scrollbar {
  width: 6px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Mobile sidebar animations */
@media (max-width: 767px) {
  .sidebar {
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.3);
  }
}

/* Desktop sidebar - always visible */
@media (min-width: 768px) {
  .sidebar {
    transform: translateX(0) !important;
  }
}
</style>
