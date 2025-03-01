import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; // Подключение компонента главной страницы
import Register from '@/components/Register.vue'; // Подключение компонента регистрации
import Login from '@/components/Login.vue'; // Подключение компонента логина

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView, // Главная страница
  },
  {
    path: '/login',
    name: 'login',
    component: Login, // Страница входа
  },
  {
    path: '/register',
    name: 'register',
    component: Register, // Страница регистрации
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
