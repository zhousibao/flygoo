import React, { Component } from 'react'
import { Result, Flex, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router-dom'

interface IProps {

}

interface IState {
  count:number
}

//使用泛型进行 Props、 State 的类型定义，定义后在使用 this.state 和 this.props 时可以在编辑器中获得更好的智能提示，并且会对类型进行检查。
export default class NoFound extends Component<IProps, IState> {
  /**
   * 挂载阶段
   */

  // Readonly是泛型的类型别名，将对应的所有属性设置为只读属性，不能对其直接赋值。
  public state: Readonly<IState> = {
    count: 0,
  }

  
  // 初始化阶段
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     count: 0,
  //   }

  //   console.log('constructor props', props)
  // }

  handleClick = () => {
    this.setState((state, props) => {
      return { count: state.count + 1 }
    })
  }
  
  static getDerivedStateFromProps(props, state){
    console.log('getDerivedStateFromProps')
    // 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
    // 主要目的：让组件在 props 变化时更新 state
    // 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
    return null
  } 
  render() {
    console.log('render')
    // 不要在render里面修改state,会触发死循环导致栈溢出。
    return (
      <div>
        <Result
          title="NoFound"
          message="抱歉，你访问的页面不存在。"
        />

        <WhiteSpace size="lg" />

        <Flex justify="center">
          <div onClick={this.handleClick} style={{ 'color': '#999' }}>点击更新state</div>
        </Flex>

        <WhiteSpace size="lg" />

        <Flex justify="center">
          <Link to="/home">返回首页</Link>
        </Flex>
        
      </div>
    )
  }
  // 挂载完成后
  componentDidMount(){
    console.log('componentDidMount')
    // 在组件挂载完成后调用，且全局只调用一次。
    // 可以在这里使用refs，获取真实dom元素、进行交互、添加订阅     
  }


  /**
   * 更新阶段
   */

  // static getDerivedStateFromProps(){}
  // 是否重新渲染
  shouldComponentUpdate(nextProps, nextState){
    console.log('shouldComponentUpdate')
    // 默认返回true，需要重新render。返回false则不触发渲染。
    // 使用 forceUpdate() 时不会调用该方法。
    // 使用PureComponent代替
    return true
  }
  // render() {}
  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('getSnapshotBeforeUpdate')
    // 在最近一次渲染输出（提交到 DOM 节点）之前调用
    // 它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）
    // 此生命周期的任何返回值将作为传递给componentDidUpdate()的第三参数。
    return null
  }
  // 组件更新完成
  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('componentDidUpdate')
    // 谨慎调用setState(),否则会导致死循环
  }


  /**
   * 卸载阶段
   */
  componentWillUnmount(){
    console.log('componentWillUnmount')
    // 一般在这删除之前订阅的事件 
  } 


  /**
   * 错误处理阶段
   */
  // 当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：
  static getDerivedStateFromError(error){
    console.log('getDerivedStateFromError')
    // 此生命周期会在后代组件抛出错误后被调用
    // 并返回一个值以更新 state
    return  null
  }
  componentDidCatch(error, info){
    console.log('componentDidCatch')
    // 此生命周期在后代组件抛出错误后被调用
  }


  /**
   * 过时的生命周期方法
   * 
   * componentWillMount() // 组件挂载前
   * componentWillReceiveProps(nextProps) // 会在已挂载的组件接收新的 props 之前被调用
   * componentWillUpdate(nextProps, nextState) // 更新渲染之前调用
   */

}