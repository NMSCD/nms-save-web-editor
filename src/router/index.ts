import { createRouter, createWebHistory } from 'vue-router';
import SaveLoader from '../pages/SaveLoader.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loader',
      component: SaveLoader,
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../pages/GeneralStats.vue'),
    },
  ],
});

export default router;
