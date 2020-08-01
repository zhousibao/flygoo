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


## 温馨提示
- react life cycle 请查看src/pages/NoFound.tsx
- redux关联组件 请查看src/pages/login/index.tsx

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
