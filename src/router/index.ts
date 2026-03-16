import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/SaveLoader.vue';

declare module 'vue-router' {
  interface RouteMeta {
    label: string;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      meta: {
        label: 'Main',
      },
      component: Main,
    },
    {
      path: '/stats',
      name: 'stats',
      meta: {
        label: 'Overview',
      },
      component: async () => import('../pages/GeneralStats.vue'),
    },
    {
      path: '/exosuit',
      name: 'exosuit',
      meta: {
        label: 'Exosuit',
      },
      component: async () => import('../pages/Exosuit.vue'),
    },
    {
      path: '/json',
      name: 'json',
      meta: {
        label: 'JSON Editor',
      },
      component: async () => import('../pages/RawJsonEditor.vue'),
    },
  ],
});

export default router;
