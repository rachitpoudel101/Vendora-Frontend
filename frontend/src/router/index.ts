import { createRouter, createWebHistory } from "vue-router";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
