import { createRouter, createWebHistory } from 'vue-router'
import DevicesListView from '../views/DevicesListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'device-list-view',
      component: DevicesListView
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('../views/RoomsListView.vue')
    },
    {
      path: '/routines',
      name: 'routines',
      component: () => import('../views/RoutinesListView.vue')
    },
    {
      path: '/houses',
      name: 'houses',
      component: () => import('../views/HousesListView.vue')
    }
  ]
})

export default router
