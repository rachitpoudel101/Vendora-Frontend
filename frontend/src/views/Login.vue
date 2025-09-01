<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100"
  >
    <div
      class="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-blue-200 flex flex-col items-center"
    >
      <!-- <img src="/logo.svg" alt="Stationary Logo" class="w-16 h-16 mb-4" /> -->
      <h2
        class="text-3xl font-extrabold mb-2 text-center text-blue-700 tracking-tight"
      >
        Stationary App
      </h2>
      <p class="text-gray-500 mb-6 text-center text-base">
        Sign in to your account
      </p>
      <form @submit.prevent="handleLogin" class="space-y-5 w-full">
        <div>
          <label
            for="username"
            class="block text-sm font-semibold text-blue-700 mb-1"
            >Username</label
          >
          <div class="relative">
            <input
              id="username"
              type="text"
              v-model="username"
              required
              placeholder="Username"
              class="w-full px-4 py-2 pl-10 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
            <span
              class="absolute left-3 top-2.5 text-blue-400 text-lg pointer-events-none"
            >
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>
        <div>
          <label
            for="password"
            class="block text-sm font-semibold text-blue-700 mb-1"
            >Password</label
          >
          <div class="relative">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              required
              placeholder="Password"
              class="w-full px-4 py-2 pl-10 pr-10 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
            <span
              class="absolute left-3 top-2.5 text-blue-400 text-lg pointer-events-none"
            >
              <i class="fas fa-lock"></i>
            </span>
            <button
              type="button"
              class="absolute right-10 top-2.5 text-lg focus:outline-none bg-transparent border-none p-0 cursor-pointer"
              @mousedown.prevent
              @click="showPassword = !showPassword"
              aria-label="Toggle password visibility"
              style="z-index: 2"
            >
              <span v-if="showPassword">
                <i class="fas fa-eye-slash text-blue-600"></i>
              </span>
              <span v-else>
                <i class="fas fa-eye text-blue-400"></i>
              </span>
            </button>
            <span
              class="absolute right-3 top-2.5 text-blue-400 text-lg pointer-events-none"
            >
              <i class="fas fa-key"></i>
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
      </form>
      <div class="mt-6 text-xs text-gray-400 text-center">
        &copy; {{ new Date().getFullYear() }} Stationary App
      </div>
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
const showPassword = ref(false);

async function handleLogin() {
  await auth.login({ username: username.value, password: password.value });
  if (!auth.error && auth.token) {
    router.push({ name: "Dashboard" });
  }
}
</script>
