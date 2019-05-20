import Vue from 'vue'
import Router from 'vue-router'

/* layout布局 */
import Layout from './views/layout/Layout'

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
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: '首页',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: () => import('./views/dashboard/index')
  }]
}
]

export default new Router({
  // mode: 'history', // 后端支持可开
  routes: constantRouterMap
})

export const asyncRouterMap = []
