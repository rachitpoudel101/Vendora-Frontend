import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
  },
  {
    path: "/stocks",
    name: "Stocks",
    component: () => import("@/views/Stocks/Index.vue"),
  },
  {
    path: "/billing",
    name: "Billing",
    component: () => import("@/views/Billing/Index.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/Users/index.vue"),
  },
  {
    path: "/users/create",
    name: "Create",
    component: () => import("@/components/Users/CreateUserModel.vue"),
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    component: () => import("@/views/Suppliers/index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/configurations",
    name: "Configurations",
    component: () => import("@/views/Configurations/Index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tenants",
    name: "Tenants",
    component: () => import("@/views/Tenants/index.vue"),
    meta: { requiresAuth: true, requiresSuperAdmin: true },
  },
  {
    path: "/theme-settings",
    name: "ThemeSettings",
    component: () => import("@/views/ThemeSettings.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard to check permissions
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  // Check if route requires admin
  if (to.meta.requiresAdmin) {
    const isAdmin =
      authStore.user?.role === "admin" || authStore.user?.role === "superadmin";

    if (!isAdmin) {
      // Redirect to dashboard if not admin
      next({ name: "Dashboard" });
      return;
    }
  }

  // Check if route requires superadmin
  if (to.meta.requiresSuperAdmin) {
    const isSuperAdmin = authStore.user?.role === "superadmin";

    if (!isSuperAdmin) {
      // Redirect to dashboard if not superadmin
      next({ name: "Dashboard" });
      return;
    }
  }

  next();
});

export default router;
