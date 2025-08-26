import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: () => import('@/views/Stocks/Index.vue'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/Orders.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/Users/index.vue'),
  },
    {
    path: '/users/create',
    name: 'Create',
    component: () => import('@/views/Users/Create.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
