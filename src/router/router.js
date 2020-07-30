import React, { Component, Suspense, lazy } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { } from '@/components'


import App from '../App';
import NoFound from '../pages/404'

/***
 * 路由懒加载  
 */
const Home = lazy(() => import('../pages/home'))


export default class Router extends Component {
  render() {
    return (
      <App>
        <HashRouter>
          <Suspense fallback={<div>加载中...</div>}>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={Home}/>
              <Route component={NoFound} />
            </Switch>
          </Suspense>
        </HashRouter>
      </App>
      
    ) 
  }
}
