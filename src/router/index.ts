import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import { currentUser } from '@/firebase/auth'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/import',
    name: 'import',
    component: () =>
      import(/* webpackChunkName: "import" */ '../views/Import.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, _from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (await currentUser()) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
  next()
})

export default router
