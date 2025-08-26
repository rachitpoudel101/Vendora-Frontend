<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <div class="flex flex-1 h-0">
      <Sidebar />
      <main class="flex-1 flex items-center justify-center px-6 py-10">
        <div class="bg-white p-8 rounded shadow w-full max-w-lg text-center">
          <h2 class="text-3xl font-bold mb-4 text-blue-700">Items</h2>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
</script>
