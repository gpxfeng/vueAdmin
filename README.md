# vue-Admin
## 准备工作
- node.js环境（npm包管理器）
- vue-cli3.0 脚手架构建工具

## 开发运行
```bash
   
    # 安装依赖
    npm install

    # 本地开发 开启服务
    npm run serve
    
    # 打开网页项目管理
    vue ui
```
浏览器访问 http://localhost:9527

## 发布
```bash
    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview

    # 构建生成环境
    npm run build:prod
```
### 部署nginx配置参考
```
  location / {
        # 指向我们打包后上传的前端文件
        root /opt/nginx/dist;
        index index.html;
    }
    location /jwt/ {
        # 转发请求到后端服务网关
        proxy_pass http://127.0.0.1:8765/jwt/;
    }
    location /api/ {
        proxy_pass http://127.0.0.1:8765/api/;
     }
```

## 目录结构
```
├── dist                       # 构建相关
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── plugins                # 新element.js
│   ├── styles                 # 全局css文件
│   ├── utils                  # 全局请求发送
│   └── views                  # views 所有页面
│         ├── admin            # 用户
│         ├── auth             # 鉴权
│         ├── dashboard        # 主页
│         ├── error            # 404页面
│         ├── filters          # 全局 filter
│         ├── layout           # 项目框架布局
│         ├── lang             # 国际化 language
│         ├── layout           # 全局 layout
│         ├── login            # 登录页面
│         ├── monitor          # 后端服务页面
│         ├── purview          # 树形结构
│         ├── store            # 全局 store管理
│         └──tables            # vue的table功能展示
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   ├── router.js              # 路由配置
│   ├── store.js               # vuex状态设置 后台只有user和app配置相关状态使用vuex存在全局，其它数据都由每个业务页面自己管理。
│   └── permission.js          # 权限管理
│   
│   
├── .editorconfig              # eslint 配置项
├── babel.config.js            # babel 配置
├── vue.config.js              # vue-cli 配置
└── package.json               # package.json
```

## vue项目构建
- 新建vue 项目 cmd  命令vue ui  创建 手动选择中勾选Router，Vuex
开启router，commit 创建，添加插件vue-cli-plugin-element,
src文件夹main.js引入element，html引入样式和组件

- 在根目录下建vue.config.js，cli3.0没有了build和config文件夹
3.0的代理写在vue.config.js下的devServer

- 安装依赖errLog(日志),permission(前端权限控制),scrollBehavior(滚动),validator(校检),
axios(ajax封装),echarts(主题),js-cookie(cookie存储插件),
Promise(异步对象),NProgress(前端轻量级web进度条)
screenfull(全屏),vue-count-to(数字滚动查件),vue-Sticky(布局),
vue-multiselect(下拉框插件)

- 不是主要的插件 ↓
normalize.css(样式),vuedraggable(拖拽依赖),dropzone(文件上传插件),codemirror(在线代码编辑器)
simplemde(富文本编辑器)


- 项目登录，先进src/main getToken,从cookie中查看，没有就进入登录
登录提交admin  方法为loginByEmail，在login.js中定义路径，
访问后台auth模块AuthController/token,调用admin模块rpc下的userRest/的validate,加密前端的密码比对后端,返回生成的token。
在user.js中定义了loginByEmail,登录完token存在cookies
loginByEmail登录完毕push到首页,中间先进main.js判断token,有了再判断列表
触发user.js中的getInfo,getMenus,获取用户信息和功能列表
项目中的axios拦截器,发送请求 名字为axios.js
- 除了单点登录外流程都可以这么走  作者掘金文章 https://juejin.im/post/591aa14f570c35006961acac


## 构建vue碰到的问题
- component: () => import 导致栈溢出
RangeError: Maximum call stack size exceeded
- 有可能问题解决的地址:https://github.com/vuejs/vue-cli/issues/2463
目前注释了vue.config.js下面的 pages 选项

- exlint规则:package.json文件下eslintConfig选项，rules配置规则

## 相关vue学习
- created方法，实例化后立马调用，跟之前的init差不多
- methods方法，点击，实例化，提交等方法的共同位置
- $options: 用于当前 Vue 实例的初始化选项, 可以用此选项获得组件的name。
- $refs： 一个对象，持有注册过 ref 特性 的所有 DOM 元素和组件实例。
- $el: Vue 实例使用的根 DOM 元素。
- provide & inject ：这对选项需要一起使用，允许一个祖先组件向其所有子孙后代注入一个依赖,注意不是响应式的。
- 注入的对象可以是个vue实例的eventBus。
- $on： 组件监听自定义事件。
- $emit： 组件触发自定义事件。


## 其他
前后端接口文档生成器 swagger 可以了解一下


## 目标：加入新功能
- 1:代码生成器功能
- 2:第三方登录 增加用户注册或者是管理员新增用户
- 3:爬虫项目引入
- 4:增加百度地图
- 5:增加系统搜索，把原生Lucene换成Elasticsearch

## 感谢
感谢作者：[PanJiaChen](https://github.com/PanJiaChen/vue-element-admin)

