<template>
  <nav
    class="shadow flex items-center justify-between px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 fixed top-0 left-0 right-0 z-20 gap-2 sm:gap-3"
    :style="{ backgroundColor: navbarColor }"
  >
    <!-- Logo Section - Always visible -->
    <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
      <div
        class="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0"
      >
        <img
          src="@/assets/Vendora-.png"
          alt="Vendora Logo"
          class="w-full h-full object-contain"
        />
      </div>
      <span
        class="font-bold text-base sm:text-lg md:text-2xl tracking-wide whitespace-nowrap"
        :style="{ color: getTextColor(navbarColor) }"
        >Vendora</span
      >
    </div>

    <!-- Spacer for mobile -->
    <div class="flex-1 md:hidden"></div>

    <!-- Hamburger Menu Button (Mobile) -->
    <button
      @click="toggleSidebar"
      class="md:hidden hover:opacity-80 transition focus:outline-none flex-shrink-0 p-1"
      :style="{ color: getTextColor(navbarColor) }"
      aria-label="Toggle sidebar"
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

    <!-- Desktop Profile Menu -->
    <div
      class="hidden md:flex items-center gap-3 sm:gap-4 relative flex-shrink-0"
    >
      <!-- Dark Mode Toggle -->
      <button
        @click="toggleDarkMode"
        class="p-2 rounded-lg hover:opacity-80 transition focus:outline-none"
        :style="{ color: getTextColor(navbarColor) }"
        :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      >
        <svg
          v-if="!isDarkMode"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          />
        </svg>
        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414l-.707-.707zM5 8a1 1 0 100-2H4a1 1 0 100 2h1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <div class="relative" ref="dropdownRef">
        <button
          class="mx-1 sm:mx-2 font-medium transition flex items-center gap-1 sm:gap-2 focus:outline-none text-sm sm:text-base hover:opacity-80"
          :style="{ color: getTextColor(navbarColor) }"
          @click="toggleDropdown"
        >
          Profile
          <svg
            class="w-3 h-3 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <transition name="dropdown-fade">
          <div
            v-if="dropdownOpen && user"
            class="absolute right-0 mt-2 w-40 sm:w-48 bg-white border rounded shadow-lg py-2 z-20 dropdown-menu"
          >
            <div
              class="px-3 sm:px-4 py-2 text-blue-700 font-semibold border-b text-sm sm:text-base"
            >
              {{ user.username }}
            </div>
            <button
              @click="handleChangePassword"
              class="w-full text-left px-3 sm:px-4 py-2 text-gray-700 hover:bg-blue-50 font-medium text-sm sm:text-base"
            >
              Change Password
            </button>
            <button
              @click="handleLogout"
              class="w-full text-left px-3 sm:px-4 py-2 text-red-600 hover:bg-blue-50 font-medium text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </transition>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <transition name="mobile-menu-fade">
    <div
      v-if="mobileMenuOpen"
      class="fixed top-14 left-0 right-0 md:hidden z-10 shadow-lg"
      :style="{ backgroundColor: navbarColor }"
    >
      <div class="px-3 py-3 border-t border-blue-700">
        <div
          class="px-3 py-2 text-blue-200 font-semibold border-b border-blue-700 mb-2"
        >
          {{ user?.username || "User" }}
        </div>
        <button
          @click="handleChangePassword"
          class="w-full text-left px-3 py-2 text-blue-200 hover:bg-blue-900 font-medium rounded transition mb-2"
        >
          Change Password
        </button>
        <button
          @click="handleLogout"
          class="w-full text-left px-3 py-2 text-red-400 hover:bg-blue-900 font-medium rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  </transition>

  <div
    v-if="logoutMsg"
    class="w-full text-center py-2 mt-14 sm:mt-16"
    :class="logoutMsgType"
  >
    {{ logoutMsg }}
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@//stores/auth";
import { useThemeStore } from "@/stores/themeStore";
import { useRouter } from "vue-router";
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import { useSidebar } from "@/composables/useSidebar";

const router = useRouter();
const auth = useAuthStore();
const theme = useThemeStore();
const { toggleSidebar: toggleSidebarState } = useSidebar();
const user = computed(() => auth.user);
const navbarColor = computed(() => theme.navbarColor);
const isDarkMode = computed(() => theme.darkModeEnabled);
const dropdownOpen = ref(false);
const mobileMenuOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const logoutMsg = ref("");
const logoutMsgType = ref("text-green-600");
const showPasswordModal = ref(false);

function getTextColor(bgColor: string): string {
  // Convert hex to RGB and calculate luminance
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function toggleSidebar() {
  toggleSidebarState();
}

function toggleDarkMode() {
  if (theme.theme) {
    theme.updateTheme({
      dark_mode_enabled: !theme.darkModeEnabled,
    });
  }
}

function handleClickOutside(event: MouseEvent) {
  if (
    dropdownOpen.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    dropdownOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});

function handleChangePassword() {
  showPasswordModal.value = true;
  dropdownOpen.value = false;
  mobileMenuOpen.value = false;
}

async function handleLogout() {
  try {
    await auth.logout();
    logoutMsg.value = "Logged out successfully.";
    logoutMsgType.value = "text-green-600";
    mobileMenuOpen.value = false;
    router.push({ name: "Login" });
  } catch (err: any) {
    logoutMsg.value = "Logout failed.";
    logoutMsgType.value = "text-red-600";
  }
}
</script>

<style scoped>
/* Responsive adjustments for navbar */
nav {
  min-width: 0;
  width: 100vw;
  box-sizing: border-box;
}

/* Dropdown transition */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Mobile menu transition */
.mobile-menu-fade-enter-active,
.mobile-menu-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.mobile-menu-fade-enter-from,
.mobile-menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.mobile-menu-fade-enter-to,
.mobile-menu-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Dropdown menu styling */
.dropdown-menu {
  min-width: 10rem;
  max-width: 16rem;
  border-radius: 0.75rem;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.08),
    0 1.5px 4px rgba(0, 0, 0, 0.04);
  background: #fff;
  border: 1px solid #e5e7eb;
  padding: 0.5rem 0;
}
</style>
