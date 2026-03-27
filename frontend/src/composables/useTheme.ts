import { computed } from "vue";
import { useThemeStore } from "@/stores/themeStore";

/**
 * Composable for easy theme access in components
 * Provides theme colors and utility functions
 */
export function useTheme() {
  const themeStore = useThemeStore();

  // Color getters
  const primaryColor = computed(() => themeStore.primaryColor);
  const sidebarColor = computed(() => themeStore.sidebarColor);
  const navbarColor = computed(() => themeStore.navbarColor);
  const buttonColor = computed(() => themeStore.buttonColor);
  // const logoUrl = computed(() => themeStore.logoUrl);
  const fontFamily = computed(() => themeStore.fontFamily);
  const darkModeEnabled = computed(() => themeStore.darkModeEnabled);

  /**
   * Calculate contrasting text color based on background color
   * Returns white for dark backgrounds, black for light backgrounds
   */
  function getTextColor(bgColor: string): string {
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }

  /**
   * Get contrasting text color for primary color
   */
  function getPrimaryTextColor(): string {
    return getTextColor(primaryColor.value);
  }

  /**
   * Get contrasting text color for sidebar color
   */
  function getSidebarTextColor(): string {
    return getTextColor(sidebarColor.value);
  }

  /**
   * Get contrasting text color for navbar color
   */
  function getNavbarTextColor(): string {
    return getTextColor(navbarColor.value);
  }

  /**
   * Get contrasting text color for button color
   */
  function getButtonTextColor(): string {
    return getTextColor(buttonColor.value);
  }

  /**
   * Apply theme to document
   */
  function applyTheme(): void {
    themeStore.applyTheme();
  }

  /**
   * Update theme with new values
   */
  async function updateTheme(themeData: Record<string, any>): Promise<void> {
    await themeStore.updateTheme(themeData);
  }

  /**
   * Fetch current theme from backend
   */
  async function fetchTheme(): Promise<void> {
    await themeStore.fetchCurrentTheme();
  }

  return {
    // Colors
    primaryColor,
    sidebarColor,
    navbarColor,
    buttonColor,
    // logoUrl,
    fontFamily,
    darkModeEnabled,

    // Utility functions
    getTextColor,
    getPrimaryTextColor,
    getSidebarTextColor,
    getNavbarTextColor,
    getButtonTextColor,
    applyTheme,
    updateTheme,
    fetchTheme,

    // Store access
    themeStore,
  };
}
