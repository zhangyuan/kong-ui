import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicesView from '../views/services/ServicesView.vue'
import PluginsView from '../views/plugins/PluginsView.vue'
import RoutesView from '../views/routes/RoutesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView
    },
    {
      path: '/services/:service_id/routes',
      name: 'routes',
      component: RoutesView
    },
    {
      path: '/plugins',
      name: 'plugins',
      component: PluginsView
    },
  ]
})

export default router
