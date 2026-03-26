<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16">
    <Navbar />
    <div class="flex">
      <Sidebar />

      <!-- Main Content -->
      <main class="flex-1 ml-0 md:ml-64 h-[calc(100vh-4rem)] flex flex-col">
        <div class="p-2 sm:p-4 md:p-8 flex flex-col h-full overflow-hidden">
          <div
            class="space-y-4 sm:space-y-6 md:space-y-8 flex-1 overflow-y-auto"
          >
            <TenantsList />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import TenantsList from "@/components/Tenants/TenantsList.vue";

const auth = useAuthStore();
const router = useRouter();

onMounted(async () => {
  if (!auth.token) {
    router.push({ name: "Login" });
    return;
  }
  if (!auth.user) {
    await auth.self();
  }
});
</script>

<style scoped>
/* Unified scrollbar for tenants page */
.overflow-y-auto::-webkit-scrollbar,
.overflow-auto::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track,
.overflow-auto::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb,
.overflow-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 4px;
  border: 1px solid #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover,
.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
}

/* Enhanced mobile responsiveness */
@media (max-width: 767px) {
  main {
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .h-\[calc\(100vh-4rem\)\] {
    height: calc(100vh - 5rem);
  }
}
</style>
