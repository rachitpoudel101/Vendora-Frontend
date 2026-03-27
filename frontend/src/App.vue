<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useThemeStore } from "@/stores/themeStore";

const auth = useAuthStore();
const theme = useThemeStore();

onMounted(async () => {
  // Fetch user data if token exists
  if (auth.token && !auth.user) {
    await auth.self();
  }

  // Load theme for authenticated users
  if (auth.token) {
    try {
      await theme.fetchCurrentTheme();
    } catch (err) {
      console.error("Failed to load theme, using defaults:", err);
      // Theme store will apply default theme on error
    }
  }
});

// Watch for dark mode changes and apply immediately
watch(
  () => theme.darkModeEnabled,
  (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
);
</script>

<template>
  <router-view />
</template>
