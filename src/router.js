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
}, {
  path: '/authredirect',
  component: () => import('./views/login/authredirect.vue'),
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
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '/baseManager',
    component: Layout,
    name: '基础配置管理',
    icon: 'setting',
    authority: 'baseManager',
    children: [{
      path: 'userManager',
      icon: 'fa-user',
      component: () => import('./views/admin/user/index'),
      name: 'user',
      authority: 'userManager'
    }, {
      path: 'menuManager',
      icon: 'category',
      component: () => import('./views/admin/menu/index'),
      name: 'menu',
      authority: 'menuManager'
    }, {
      path: 'gateLogManager',
      icon: 'viewlist',
      component: () => import('./views/admin/gateLog/index'),
      name: '操作日志管理',
      authority: 'gateLogManager'
    }]
  },
  {
    path: '/authManager',
    component: Layout,
    name: '服务权限管理',
    icon: 'setting',
    authority: 'authManager',
    children: [{
      path: 'serviceManager',
      components: () => import('./views/auth/service/index'),
      name: '服务管理',
      authority: 'serviceManager'
    }]
  },
  {
    path: '/monitorManager',
    component: Layout,
    name: '监控模块管理',
    icon: 'setting',
    authority: 'monitorManager',
    children: [{
      path: 'serviceEurekaManager',
      component: () => import('./views/monitor/eureka/index'),
      name: 'Eureka注册中心',
      authority: 'serviceEurekaManager'
    }, {
      path: 'serviceMonitorManager',
      component: () => import('./views/monitor/service/index'),
      name: '服务状态监控',
      authority: 'serviceMonitorManager'
    }, {
      path: 'serviceZipkinManager',
      component: () => import('./views/monitor/zipkin/index'),
      name: '服务状态监控',
      authority: 'serviceZipkinManager'
    }]
  },
  {
    path: '/purviewManager',
    component: Layout,
    name: '用户权限管理',
    icon: 'setting',
    authority: 'purviewManager',
    children: [{
      path: 'groupTypeManager',
      icon: 'fa-users',
      component: () => import('./views/purview/groupType/index'),
      name: 'groupType',
      authority: 'groupTypeManager'
    }, {
      path: 'groupManager',
      icon: 'group_fill',
      component: () => import('./views/purview/group/index'),
      name: 'group',
      authority: 'groupManager'
    }]
  }
]
