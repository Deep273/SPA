import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; // Подключение компонента главной страницы

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView, // Убедитесь, что этот компонент существует
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
