import React, { Component, Suspense, lazy } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'


import App from '@/App';
import NoFound from '@/pages/noFound'

/***
 * 路由懒加载  
 */
const Home = lazy(() => import('@/pages/home'))
const Login = lazy(() => import('@/pages/login'))
const Mine = lazy(() => import('@/pages/mine'))


export default class Router extends Component {
  render() {
    return (
      <App>
        <HashRouter>
          <Suspense fallback={<div>加载中...</div>}>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={Home} />
              <Route path="/mine" component={Mine} />
              <Route path="/login" component={Login} />
              <Route component={NoFound} />
            </Switch>
          </Suspense>
        </HashRouter>
      </App>
    ) 
  }
}
