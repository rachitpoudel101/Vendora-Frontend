import { createApp } from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";
import "@/style.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VueToast, {
  position: "top-right",
  duration: 3000,
  dismissible: true,
});

// Initialize axios with token from localStorage
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Add axios interceptor to include token in all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 403 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.warn(
        "Access forbidden - user may not have permission for this resource",
      );
    }
    return Promise.reject(error);
  },
);

app.mount("#app");
