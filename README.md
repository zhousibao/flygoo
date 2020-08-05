# Flygoo

一个基于 [Create React App](https://github.com/facebook/create-react-app) 的项目。

## 技术栈
typescript、react、redux、redux-saga、react-router-dom、axios、less、sass、antd-mobile

##
`既然选择了typescript，就不要到用any`
##

## Available Scripts

### `yarn start`

开发环境 [http://localhost:2000](http://localhost:3000)

### `yarn pro`

生产环境打包

## 项目依赖介绍

- 路由: react-router-dom、@types/react-router-dom
- 数据管理react-redux、@types/react-redux、redux、redux-saga 
- 组件库按需加载: antd-mobile、babel-plugin-import 
- 配置lessModule: less、less-loader 
- 从文件读取配置变量: env-cmd
- 日期时间: moment
- 加载进度: nprogress
- 本地代理: http-proxy-middleware
- EventEmitter事件总栈: events
- 移动端响应式解决方案：lib-flexible。


## 温馨提示
- react life cycle 请查看src/pages/NoFound.tsx
- redux关联组件 请查看src/pages/login/index.tsx

## 项目目录
```
├── README.md
├── config // webpack配置
│   ├── env.js
│   ├── getHttpsConfig.js
│   ├── jest
│   │   ├── cssTransform.js
│   │   └── fileTransform.js
│   ├── modules.js
│   ├── paths.js
│   ├── pnpTs.js
│   ├── webpack.config.js
│   └── webpackDevServer.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── scripts // 打包配置
│   ├── build.js
│   ├── start.js
│   └── test.js
├── src // 项目代码
│   ├── App.tsx
│   ├── assets // 静态资源
│   ├── components // 全局组件
│   ├── config.ts // 全局配置
│   ├── index.tsx // 入口文件
│   ├── pages // pages
│   │   ├── home
│   │   │   ├── components // 页面组件
│   │   │   ├── index.module.less // module.less
│   │   │   └── index.tsx
│   │   └── noFound.tsx // 404
│   ├── react-app-env.d.ts
│   ├── redux // redux
│   │   ├── index.ts
│   │   ├── modules
│   │   │   ├── app.ts
│   │   │   └── user.ts
│   │   └── saga.ts // saga
│   ├── router // 路由
│   │   └── index.tsx
│   ├── server // server地址
│   │   ├── index.ts
│   ├── serviceWorker.ts
│   ├── setupProxy.js // dev proxy配置
│   ├── style // 全局样式
│   │   ├── antd.module.less
│   │   ├── app.less
│   │   ├── index.less
│   │   ├── mixin.less
│   │   ├── reset.less
│   │   └── variables.less
│   ├── types // 全局type
│   │   ├── globle.d.ts
│   │   └── redux.d.ts
│   └── utils // 工具
│       ├── axios.js
│       ├── eventBus.ts
│       ├── index.ts
│       └── storage.ts
├── tsconfig.json
└── yarn.lock
```
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
