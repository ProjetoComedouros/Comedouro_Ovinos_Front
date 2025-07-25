import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  /*{
    path: '/HomePage',
    name: 'HomePage',
    // route level code-splitting
    // this generates a separate chunk (HomePage.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/HomePage.vue')
  }*/
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
