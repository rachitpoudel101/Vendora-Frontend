<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Live Preview of Navbar -->
    <Navbar />

    <!-- Main Content with Sidebar -->
    <div class="flex pt-16">
      <!-- Live Preview of Sidebar -->
      <Sidebar />

      <!-- Settings Content -->
      <div class="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Theme Settings</h1>
          <p class="mt-2 text-gray-600">
            Customize the appearance of your Vendora application. Changes are
            applied in real-time to the navbar and sidebar above.
          </p>
        </div>

        <!-- Theme Settings Component -->
        <ThemeSettings />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeSettings from "@/components/ThemeSettings.vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const auth = useAuthStore();
const router = useRouter();

onMounted(() => {
  // Check if user is admin
  if (auth.user?.role !== "admin" && auth.user?.role !== "superadmin") {
    router.push({ name: "Dashboard" });
  }
});
</script>
