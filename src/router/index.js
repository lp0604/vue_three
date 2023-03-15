import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/demo2',
    name: 'demo2',
    component: () => import(/* webpackChunkName: "about" */ '../views/demo2.vue')
  },
  {
    path: '/demo3',
    name: 'demo3',
    component: () => import(/* webpackChunkName: "about" */ '../views/demo3.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
