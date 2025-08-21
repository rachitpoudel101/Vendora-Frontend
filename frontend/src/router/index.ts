import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'), // Create this file if it doesn't exist
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
