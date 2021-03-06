import React, { Component, Suspense, lazy } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'


import App from '@/App';
import NoFound from '@/pages/noFound'

/***
 * 路由懒加载  
 */
const Login = lazy(() => import('@/pages/login'))
const Home = lazy(() => import('@/pages/home'))
const Cart = lazy(() => import('@/pages/cart'))
const Mine = lazy(() => import('@/pages/mine'))
const AddressList = lazy(() => import('@/pages/address/list'))
const AddressCreate = lazy(() => import('@/pages/address/create'))
const Goods = lazy(() => import('@/pages/goods'))


export default class Router extends Component {
  render() {
    return (
      <App>
        <HashRouter>
          <Suspense fallback={<div>加载中...</div>}>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/login" component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/cart" component={Cart} />
              <Route path="/mine" component={Mine} />
              <Route path="/address/list" component={AddressList} />
              <Route path="/address/create" component={AddressCreate} />
              <Route path="/goods" component={Goods} />
              
              <Route component={NoFound} />
            </Switch>
          </Suspense>
        </HashRouter>
      </App>
    ) 
  }
}
