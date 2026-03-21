import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WeatherView from '@/views/WeatherView.vue'
import SearchHistoryView from '../views/SearchHistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/weather',
      name: 'wather',
      component: WeatherView,
    },
    {
      path: '/history',
      name: 'search history',
      component: SearchHistoryView,
    },
  ],
})

export default router
