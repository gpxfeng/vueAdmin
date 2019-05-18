import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import errLog from './views/store/errLog'// error log组件
import { getToken } from './utils/auth'

Vue.use(ElementUI)

// register global progress.
const whiteList = ['/login', '/authredirect']// 不重定向白名单
router.beforeEach((to, from, next) => {
  /* NProgress.start(); // 开启Progress */
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.menus === undefined) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(info => { // 拉取user_info
          const menus = {}
          for (let i = 0; i < info.menus.length; i++) {
            menus[info.menus[i].code] = true
          }
          store.dispatch('GenerateRoutes', menus).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to }) // hack方法 确保addRoutes已完成
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        //  else {
        //   // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        //   if (hasPermission(store.getters.roles, to.meta.role)) {
        //     next();//
        //   } else {
        next()
        //   }
        //   // 可删 ↑
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      /* NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！ */
    }
  }
})

router.afterEach(() => {
  /* NProgress.done(); // 结束Progress */
})

Vue.config.productionTip = false

// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (err, vm) {
    console.log(err, window.location.href)
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
