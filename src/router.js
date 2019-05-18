import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * 固定路由
 * @type {*[]}
 */
export const constantRouterMap = [{
  path: '/login',
  component: () => import('./views/login/index.vue'),
  hidden: true
},
{
  path: '/404',
  component: () => import('./views/error/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('./views/error/401'),
  hidden: true
}
]

export default new Router({
  // mode: 'history', // 后端支持可开
  routes: constantRouterMap
})

export const asyncRouterMap = []
