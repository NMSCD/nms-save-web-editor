import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/SaveLoader.vue';

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
      component: () => import('../pages/GeneralStats.vue'),
    },
    {
      path: '/exosuit',
      name: 'exosuit',
      meta: {
        label: 'Exosuit',
      },
      component: () => import('../pages/Exosuit.vue'),
    },
    {
      path: '/json',
      name: 'json',
      meta: {
        label: 'JSON Editor',
      },
      component: () => import('../pages/RawJsonEditor.vue'),
    },
  ],
});

export default router;
