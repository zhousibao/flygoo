import React  from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Flex, InputItem, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import style from './index.module.less';
import { getCode, login } from '@/pages/login/api'
import Storage from '@/utils/storage'

interface IState {
  phone:string;
  msgCode:string;
  tip:string;
  canTip:boolean;
}
interface dispatchProps{
  setToken:(token:string) => void;
  setUserInfo:(userInfo:IAnyObj) => void
}
// 交叉类型关联 RouteComponentProps 和 IStoreUser 和 dispatchProps
type IProps = RouteComponentProps &  IStoreUser & dispatchProps

class Login extends React.Component<IProps, IState>{
  private interval:number|undefined = undefined;

  public state: Readonly<IState> = {
    phone: '15555115232',
    msgCode: '',
    tip: '获取验证码', //获取验证码按钮文本
    canTip: false, //是否禁用验证码按钮
  }

  componentWillUnmount(){
    if(this.interval){
      window.clearInterval(this.interval);
    }
  }
  

  // 表单获取value
  // keyof 获取某种类型的所有键
  // Pick<T,K> 通过从T中选择属性集K来构造新类型 //从复合类型中获取几个想要的类型组合
  onChange = (key:keyof IState, val:string) => {
    this.setState({
      [key]: val,
    } as Pick<IState, 'phone' | 'msgCode'>)
  }

  //获取验证码
  getCode = async () => {
    const { phone } = this.state

    if(!phone){
      Toast.fail('请输入手机号码', 2);
      return false;
    }

    if(phone.length !== 11){
      Toast.fail('请输入正确的手机号码', 2);
      return false;
    }

    const where = {
      phone,
    }
    const { code, data } = await getCode(where)
    if(code === 0){
      const msgCode = String(data.msgCode || '')
      this.onChange('msgCode', msgCode)

      let t:number = 60;
      this.interval = window.setInterval(() => {
        if (t > 0) {
          t--;
          this.setState({
            tip: `重新发送${t}s`,
            canTip: true,
          })
        } else {
          this.setState({
            tip: `获取验证码`,
            canTip: false,
          })
          window.clearInterval(this.interval);
        }
      }, 1000);
    }
  }

  //登录
  login = async () => {
    const { phone, msgCode } = this.state
    if(!phone){
      Toast.fail('请输入手机号码', 2);
      return false;
    }
    if(phone.length !== 11){
      Toast.fail('请输入正确的手机号码', 2);
      return false;
    }
    if(!msgCode){
      Toast.fail('请输入验证码', 2);
      return false;
    }
    if(msgCode.length !== 6){
      Toast.fail('请输入6位验证码', 2);
      return false;
    }
 
    try{
      const where = {
        phone: this.state.phone,
        code: this.state.msgCode,
      }
      const { code, data } = await login(where)
      if(code === 0){
        const { token, userInfo } = data
  
        Storage.setItem('token', token)
        Storage.setItem('userInfo', userInfo)
        this.props.setToken(token)
        this.props.setUserInfo(userInfo)
        
  
        Toast.success('登录成功', 1);
        setTimeout(() => {
          this.props.history.goBack();
        }, 1000);
      }
    } catch(e){}
  }


  render(){
    const { phone, msgCode, tip, canTip } = this.state
    return (
      <div>
        <h1 className={style.title}>登录</h1>
        <WingBlank>
          <InputItem 
            type="number" 
            maxLength={11} 
            placeholder="请输入手机号"
            value={phone}
            onChange={ v =>this.onChange('phone', v) }
          > 手机号</InputItem>
          <InputItem 
            type="number" 
            maxLength={6} 
            placeholder="请输入验证码"
            value={msgCode}
            onChange={v => this.onChange('msgCode', v) }
          >验证码</InputItem>
          <WhiteSpace/>
          <WhiteSpace/>
          <Flex>
            <Flex.Item>
              <Button type="primary" disabled={canTip} onClick={this.getCode}>{tip}</Button>
            </Flex.Item>
            <Flex.Item>
              <Button type="primary" onClick={this.login}>登录</Button>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
};


/**
 * @description 官方写法
 */
// const mapStateToProps = (state:IStore) => state.user
// const mapDispatchToProps = dispatch => ({
//   setToken: (token:string) => dispatch({ type: 'set_token', payload: token }),
//   setUserInfo: (userInfo:IAnyObj) => dispatch({ type: 'set_userInfo', payload: userInfo }),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(Login)

/**
 * @description 完整写法
 */
// export default connect(
//   (state:IStore) => state.user,
//   dispatch => ({
//     // 同步返回对象
//     setToken: (token:string) => dispatch({ type: 'set_token', payload: token }),
//     setUserInfo: (userInfo:IAnyObj) => dispatch({ type: 'set_userInfo', payload: userInfo }),

//     // 异步返回函数
//     AsyncSetToken: (token:string) => dispatch => {
//       setTimeout(() => {
//         dispatch({ type: 'set_token', payload: token })
//       }, 1000)
//     },
//     // 因为异步返回的是一个函数，而不是action对象，所以出现了saga,实现将异步也返回一个action对象。
//   }),
// )(Login)


/**
 * @description 简洁写法
 */
export default connect(
  (state:IStore) => state.user,
  {
    setToken: (token:string) => ({ type: 'set_token', payload: token }),
    setUserInfo: (userInfo:IAnyObj) => ({ type: 'set_userInfo', payload: userInfo }),
  },
)(Login)


