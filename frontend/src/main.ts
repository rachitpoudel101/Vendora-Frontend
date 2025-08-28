import { createApp } from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "@/style.css";
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VueToast, {
  position: "top-right",
  duration: 3000,
  dismissible: true,
});
app.mount("#app");
