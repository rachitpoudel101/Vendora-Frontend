import { defineStore } from "pinia";
import axios from "axios";
import { themesAPI } from "@/core/endpoints/themes";

export interface ThemeConfiguration {
  id: number;
  tenant: number;
  tenant_name: string;
  primary_color: string;
  sidebar_color: string;
  navbar_color: string;
  button_color: string;
  logo: string | null;
  logo_url: string | null;
  font_family: string;
  dark_mode_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: null as ThemeConfiguration | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    primaryColor: (state) => state.theme?.primary_color || "#3B82F6",
    sidebarColor: (state) => state.theme?.sidebar_color || "#1F2937",
    navbarColor: (state) => state.theme?.navbar_color || "#1F2937",
    buttonColor: (state) => state.theme?.button_color || "#3B82F6",
    fontFamily: (state) => state.theme?.font_family || "Inter",
    darkModeEnabled: (state) => state.theme?.dark_mode_enabled || false,
  },

  actions: {
    async fetchCurrentTheme() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(themesAPI.current);
        this.theme = response.data;
        this.applyTheme();
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.detail || err.message || "Failed to fetch theme";
        this.error = errorMsg;
        console.error("Theme fetch error:", err);

        // Set default theme if fetch fails
        this.theme = {
          id: 0,
          tenant: 0,
          tenant_name: "Default",
          primary_color: "#3B82F6",
          sidebar_color: "#1F2937",
          navbar_color: "#1F2937",
          button_color: "#3B82F6",
          logo: null,
          logo_url: null,
          font_family: "Inter",
          dark_mode_enabled: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        this.applyTheme();
      } finally {
        this.loading = false;
      }
    },

    async updateTheme(themeData: Partial<ThemeConfiguration>) {
      this.loading = true;
      this.error = null;
      try {
        if (!this.theme?.id) {
          throw new Error("No theme ID available");
        }
        const response = await axios.patch(
          themesAPI.partialUpdate(this.theme.id),
          themeData,
        );
        this.theme = response.data;
        this.applyTheme();
        return response.data;
      } catch (err: any) {
        this.error = err.response?.data?.detail || "Failed to update theme";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    applyTheme() {
      if (!this.theme) return;

      const root = document.documentElement;

      // Apply CSS variables
      root.style.setProperty("--color-primary", this.theme.primary_color);
      root.style.setProperty("--color-sidebar", this.theme.sidebar_color);
      root.style.setProperty("--color-navbar", this.theme.navbar_color);
      root.style.setProperty("--color-button", this.theme.button_color);

      // Apply font family with proper formatting
      const fontFamily = this.theme.font_family || "Inter";
      root.style.setProperty("--font-family", `"${fontFamily}", sans-serif`);

      // Apply dark mode if enabled
      if (this.theme.dark_mode_enabled) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },

    resetTheme() {
      this.theme = null;
      this.error = null;
      this.loading = false;
    },
  },
});
