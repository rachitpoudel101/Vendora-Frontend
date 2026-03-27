<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#102b46] via-[#1a3a52] to-[#0f1f2e] flex items-center justify-center p-4 relative overflow-hidden"
  >
    <!-- Animated background elements -->
    <div
      class="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
    ></div>

    <div class="w-full max-w-md relative z-10">
      <!-- Header -->
      <div class="text-center mb-10">
        <div class="flex items-center justify-center gap-3 mb-6">
          <div
            class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg"
          >
            <img
              src="@/assets/Vendora-.png"
              alt="Vendora Logo"
              class="w-full h-full object-contain"
            />
          </div>
          <h1 class="text-3xl font-bold text-white tracking-wide">Vendora</h1>
        </div>
        <p class="text-blue-200 text-sm font-medium">
          Inventory Management System
        </p>
        <p class="text-slate-400 text-sm mt-2">
          Sign in to your account to continue
        </p>
      </div>

      <!-- Login Card -->
      <div
        class="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 mb-6"
      >
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Username Field -->
          <div class="space-y-2">
            <label
              for="username"
              class="block text-sm font-semibold text-white"
            >
              Username
            </label>
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <input
                id="username"
                type="text"
                v-model="username"
                required
                placeholder="Enter your username"
                class="block w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/15"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label
              for="password"
              class="block text-sm font-semibold text-white"
            >
              Password
            </label>
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                required
                placeholder="Enter your password"
                class="block w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/15"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-300 transition-colors"
              >
                <svg
                  v-if="showPassword"
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between pt-2">
            <label
              for="remember-me"
              class="flex items-center gap-3 cursor-pointer group"
            >
              <div class="relative">
                <input
                  id="remember-me"
                  type="checkbox"
                  v-model="rememberMe"
                  class="sr-only"
                />
                <div
                  class="w-5 h-5 border-2 border-blue-300 rounded-md bg-white/10 group-hover:bg-white/20 transition-all duration-200 flex items-center justify-center"
                  :class="{ 'bg-blue-500 border-blue-500': rememberMe }"
                >
                  <svg
                    v-if="rememberMe"
                    class="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              </div>
              <span
                class="text-sm text-slate-300 group-hover:text-slate-200 transition-colors"
              >
                Remember me
              </span>
            </label>
            <a
              href="#"
              class="text-sm text-blue-300 hover:text-blue-200 font-medium transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <!-- Error Message -->
          <transition name="slide-down">
            <div
              v-if="auth.error"
              class="bg-red-500/20 border border-red-400/50 rounded-lg p-4 backdrop-blur-sm"
            >
              <div class="flex gap-3">
                <svg
                  class="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p class="text-sm text-red-200">{{ auth.error }}</p>
              </div>
            </div>
          </transition>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="auth.loading"
            class="w-full flex justify-center items-center py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <svg
              v-if="auth.loading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ auth.loading ? "Signing in..." : "Sign in" }}
          </button>
        </form>
      </div>

      <!-- Footer -->
      <div class="text-center">
        <p class="text-xs text-slate-400">
          © {{ new Date().getFullYear() }} Vendora. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useThemeStore } from "@/stores/themeStore";

const router = useRouter();
const auth = useAuthStore();
const theme = useThemeStore();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);

// Load saved credentials on mount
onMounted(() => {
  const savedUsername = localStorage.getItem("vendora_username");
  const savedRememberMe = localStorage.getItem("vendora_remember_me");

  if (savedUsername && savedRememberMe === "true") {
    username.value = savedUsername;
    rememberMe.value = true;
  }
});

async function handleLogin() {
  // Save or clear credentials based on remember me
  if (rememberMe.value) {
    localStorage.setItem("vendora_username", username.value);
    localStorage.setItem("vendora_remember_me", "true");
  } else {
    localStorage.removeItem("vendora_username");
    localStorage.removeItem("vendora_remember_me");
  }

  await auth.login({
    username: username.value,
    password: password.value,
  });

  if (!auth.error && auth.token) {
    // Fetch theme immediately after successful login
    try {
      await theme.fetchCurrentTheme();
    } catch (err) {
      console.error("Failed to load theme:", err);
    }
    router.push({ name: "Dashboard" });
  }
}
</script>

<style scoped>
/* Smooth transitions */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Input focus effects */
input:focus {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

/* Button hover scale */
button:not(:disabled):hover {
  transform: scale(1.02);
}

button:not(:disabled):active {
  transform: scale(0.98);
}
</style>
