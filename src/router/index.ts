import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicesView from '../views/services/ServicesView.vue'
import ServiceView from '../views/services/ServiceView.vue'
import ServiceRoutesView from '../views/routes/ServiceRoutesView.vue'
import PluginsView from '../views/plugins/PluginsView.vue'
import NodeView from '../views/information/NodeView.vue'
import EndpointsView from '../views/information/EndpointsView.vue'
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
      path: '/services',
      name: 'services',
      component: ServicesView
    },
    {
      path: '/services/:service_id',
      name: 'service',
      component: ServiceView
    },
    {
      path: '/services/:service_id/routes',
      name: 'service_routes',
      component: ServiceRoutesView
    },
    {
      path: '/plugins',
      name: 'plugins',
      component: PluginsView
    },
    {
      path: '/information/node',
      name: 'node',
      component: NodeView
    },
    {
      path: '/information/endpoints',
      name: 'endpoints',
      component: EndpointsView
    },
    {
      path: '/routes',
      name: 'routes',
      component: RoutesView
    },
  ]
})

export default router
