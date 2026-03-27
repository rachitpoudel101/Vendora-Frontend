<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold mb-6">Theme Settings</h2>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Loading theme settings...</p>
    </div>

    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded p-4 mb-4"
    >
      <p class="text-red-700">{{ error }}</p>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Primary Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Primary Color
        </label>
        <div class="flex items-center gap-4">
          <input
            v-model="formData.primary_color"
            type="color"
            class="w-16 h-16 rounded cursor-pointer border border-gray-300"
          />
          <input
            v-model="formData.primary_color"
            type="text"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#3B82F6"
          />
        </div>
      </div>

      <!-- Sidebar Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Sidebar Color
        </label>
        <div class="flex items-center gap-4">
          <input
            v-model="formData.sidebar_color"
            type="color"
            class="w-16 h-16 rounded cursor-pointer border border-gray-300"
          />
          <input
            v-model="formData.sidebar_color"
            type="text"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#1F2937"
          />
        </div>
      </div>

      <!-- Navbar Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Navbar Color
        </label>
        <div class="flex items-center gap-4">
          <input
            v-model="formData.navbar_color"
            type="color"
            class="w-16 h-16 rounded cursor-pointer border border-gray-300"
          />
          <input
            v-model="formData.navbar_color"
            type="text"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#FFFFFF"
          />
        </div>
      </div>

      <!-- Button Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Button Color
        </label>
        <div class="flex items-center gap-4">
          <input
            v-model="formData.button_color"
            type="color"
            class="w-16 h-16 rounded cursor-pointer border border-gray-300"
          />
          <input
            v-model="formData.button_color"
            type="text"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#3B82F6"
          />
        </div>
      </div>

      <!-- Font Family -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Font Family
        </label>
        <select
          v-model="formData.font_family"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
        >
          <option value="Inter" class="text-gray-900">Inter</option>
          <option value="Roboto" class="text-gray-900">Roboto</option>
          <option value="Open Sans" class="text-gray-900">Open Sans</option>
          <option value="Poppins" class="text-gray-900">Poppins</option>
          <option value="Lato" class="text-gray-900">Lato</option>
        </select>
        <p class="mt-2 text-sm text-gray-500">
          Preview:
          <span :style="{ fontFamily: `'${formData.font_family}', sans-serif` }"
            >The quick brown fox jumps over the lazy dog</span
          >
        </p>
      </div>

      <!-- Dark Mode -->
      <div>
        <label class="flex items-center gap-3">
          <input
            v-model="formData.dark_mode_enabled"
            type="checkbox"
            class="w-4 h-4 rounded border-gray-300 cursor-pointer"
          />
          <span class="text-sm font-medium text-gray-700"
            >Enable Dark Mode</span
          >
        </label>
      </div>

      <!-- Preview -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-semibold mb-4">Preview</h3>
        <div class="space-y-3">
          <div
            class="p-4 rounded text-white font-semibold"
            :style="{
              backgroundColor: formData.navbar_color,
              color: getTextColor(formData.navbar_color),
            }"
          >
            Navbar Preview
          </div>
          <div
            class="p-4 rounded text-white font-semibold"
            :style="{
              backgroundColor: formData.sidebar_color,
              color: getTextColor(formData.sidebar_color),
            }"
          >
            Sidebar Preview
          </div>
          <button
            type="button"
            class="px-4 py-2 rounded text-white font-semibold"
            :style="{
              backgroundColor: formData.button_color,
              color: getTextColor(formData.button_color),
            }"
          >
            Button Preview
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex gap-3 pt-4">
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 rounded text-white font-semibold disabled:opacity-50"
          :style="{ backgroundColor: formData.button_color }"
        >
          {{ loading ? "Saving..." : "Save Changes" }}
        </button>
        <button
          type="button"
          @click="resetForm"
          class="px-6 py-2 rounded border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
        >
          Discard Changes
        </button>
        <button
          type="button"
          @click="resetToDefault"
          class="px-6 py-2 rounded border border-red-300 text-red-700 font-semibold hover:bg-red-50"
        >
          Reset to Default
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useThemeStore } from "@/stores/themeStore";
import { useToast } from "vue-toast-notification";
import axios from "axios";

const theme = useThemeStore();
const toast = useToast();

const formData = ref({
  primary_color: "#3B82F6",
  sidebar_color: "#1F2937",
  navbar_color: "#1F2937",
  button_color: "#3B82F6",
  font_family: "Inter",
  dark_mode_enabled: false,
});

const logoFile = ref<File | null>(null);

const loading = computed(() => theme.loading);
const error = computed(() => theme.error);

function getTextColor(bgColor: string): string {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

async function handleSubmit() {
  try {
    // First, update theme colors and settings
    const updateData = { ...formData.value };
    delete (updateData as any).logo; // Remove logo from regular update
    await theme.updateTheme(updateData);

    // Then, upload logo separately if changed
    if (logoFile.value && theme.theme?.id) {
      await uploadLogo();
    }

    toast.success("Theme updated successfully!");
  } catch (err: any) {
    toast.error(err.message || "Failed to update theme");
  }
}

async function uploadLogo() {
  try {
    if (!logoFile.value || !theme.theme?.id) return;

    const formData = new FormData();
    formData.append("logo", logoFile.value);

    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}themes/${theme.theme.id}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    theme.theme = response.data;
    theme.applyTheme();
    logoFile.value = null;
  } catch (err: any) {
    console.error("Logo upload error:", err);
    throw err;
  }
}

function resetForm() {
  if (theme.theme) {
    formData.value = {
      primary_color: theme.theme.primary_color,
      sidebar_color: theme.theme.sidebar_color,
      navbar_color: theme.theme.navbar_color,
      button_color: theme.theme.button_color,
      font_family: theme.theme.font_family,
      dark_mode_enabled: theme.theme.dark_mode_enabled,
    };
    logoFile.value = null;
  }
}

async function resetToDefault() {
  // Confirm before resetting
  if (
    !confirm(
      "Are you sure you want to reset the theme to default values? This cannot be undone.",
    )
  ) {
    return;
  }

  try {
    const defaultTheme = {
      primary_color: "#3B82F6",
      sidebar_color: "#1F2937",
      navbar_color: "#1F2937",
      button_color: "#3B82F6",
      font_family: "Inter",
      dark_mode_enabled: false,
    };

    await theme.updateTheme(defaultTheme);
    formData.value = defaultTheme;
    logoFile.value = null;

    // Remove logo if exists
    if (theme.theme?.id) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_BASE_URL}themes/${theme.theme.id}/`,
          { logo: null },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      } catch (err) {
        console.error("Error removing logo:", err);
      }
    }

    toast.success("Theme reset to default values!");
  } catch (err: any) {
    toast.error(err.message || "Failed to reset theme");
  }
}

onMounted(async () => {
  if (!theme.theme) {
    await theme.fetchCurrentTheme();
  }
  resetForm();
});
</script>

<style scoped>
input[type="color"] {
  cursor: pointer;
}

select {
  color: #111827;
  background-color: #ffffff;
}

select option {
  color: #111827;
  background-color: #ffffff;
  padding: 8px;
}

select option:checked {
  background-color: #3b82f6;
  color: #ffffff;
}
</style>
