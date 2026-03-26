<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

onMounted(async () => {
  // Fetch user data if token exists
  if (auth.token && !auth.user) {
    await auth.self();
  }
});
</script>

<template>
  <router-view />
</template>
