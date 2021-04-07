import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)
let routes = [
  //首页
  {path: '/', name: 'home', component: () => import('@/views/Home')},
  {path: "*", redirect: "/"}
]
const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    next()
  }
})
export default router
