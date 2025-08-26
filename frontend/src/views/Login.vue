<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50"
  >
    <div
      class="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200"
    >
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome Back 👋
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label
            for="username"
            class="block text-sm font-semibold text-gray-700 mb-1"
            >Username</label
          >
          <div class="relative">
            <input
              id="username"
              type="text"
              v-model="username"
              required
              placeholder="Enter your username"
              class="w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <span
              class="absolute left-3 top-2.5 text-gray-400 text-lg pointer-events-none"
            >
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-semibold text-gray-700 mb-1"
            >Password</label
          >
          <div class="relative">
            <input
              id="password"
              type="password"
              v-model="password"
              required
              placeholder="Enter your password"
              class="w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <span
              class="absolute left-3 top-2.5 text-gray-400 text-lg pointer-events-none"
            >
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>

        <button
          type="submit"
          :disabled="auth.loading"
          class="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-50"
        >
          <span v-if="auth.loading" class="animate-pulse">Logging in...</span>
          <span v-else>Login</span>
        </button>
        <div
          v-if="auth.error"
          class="text-red-500 text-sm mt-2 text-center font-medium"
        >
          {{ auth.error }}
        </div>
        <!-- 
        <div class="flex justify-between text-sm text-gray-600 mt-4">
          <a href="#" class="hover:underline">Forgot Password?</a>
          <a href="#" class="hover:underline">Create Account</a>
        </div> -->
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();
const username = ref("");
const password = ref("");

async function handleLogin() {
  await auth.login({ username: username.value, password: password.value });
  if (!auth.error && auth.token) {
    router.push({ name: "Dashboard" });
  }
}
</script>
