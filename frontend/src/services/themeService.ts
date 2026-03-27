import axios from "axios";
import { themesAPI } from "@/core/endpoints/themes";
import type { ThemeConfiguration } from "@/stores/themeStore";

export const themeService = {
  async getCurrentTheme(): Promise<ThemeConfiguration> {
    const response = await axios.get(themesAPI.current);
    return response.data;
  },

  async updateTheme(
    id: number,
    data: Partial<ThemeConfiguration>,
  ): Promise<ThemeConfiguration> {
    const response = await axios.patch(themesAPI.partialUpdate(id), data);
    return response.data;
  },

  async uploadLogo(id: number, file: File): Promise<ThemeConfiguration> {
    const formData = new FormData();
    formData.append("logo", file);
    const response = await axios.patch(themesAPI.partialUpdate(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
