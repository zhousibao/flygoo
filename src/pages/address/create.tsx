import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom'
import { InputItem, TextareaItem, Switch, List, Toast } from 'antd-mobile';

import { AddressSelect } from '@/components'
import { addressDetail, addressCreate, addressEdit } from '@/server/address'

import style from './create.module.less'

/***
 * @description 受控组件使用
 */
type IAreaName = [string, string, string];
interface IState {
  id:string;
  name:string;
  tel:string;
  areaName:IAreaName;
  address:string|undefined;
  isDefault:boolean;
}
type Iprops = RouteComponentProps & IStoreUser
class Index extends Component<Iprops, IState>{
  public state: Readonly<IState> = {
    id: '',
    name: '',
    tel: '',
    areaName: ['', '', ''],
    address: '',
    isDefault: false,
  }


  componentDidMount(){
    // 使用 Web api URLSearchParams 解析query
    const query = new URLSearchParams(this.props.location.search)
    if(query.get('id')){ // 获取不到返回null
      // 编辑
      this.setState(
        ()=> {
          return { id: query.get('id') as string }
        }, 
        () => {
          this.getDetail()
        },
      )
    }
  }

  // 获取地址详情
  getDetail = async () => {
    const where ={
      token: this.props.token,
      id: this.state.id,
    }
    const { code, data } = await addressDetail(where)
    if(code === 0){
      const { addressDetail: { name, tel, areaName, address, isDefault  }} = data
      this.setState({
        name,
        tel,
        areaName,
        address,
        isDefault,
      })
    }
  }

  // 受控组件
  onChange = (key: keyof IState, val: string| boolean| undefined) => {
    console.log(val)
    this.setState({
      [key]: val,
    }as Pick<IState, 'name' | 'tel'| 'address' | 'isDefault'>)
  }
  // 地区选择回调
  changeArea = (area:IAreaName) => {
    this.setState({
      areaName: area,
    })
  }
  // submit
  submit = async() => {
    if(this.state.id){
      const { code, message } = await addressEdit(this.state)
      if(code === 0){
        Toast.success(message, 1)
        this.props.history.goBack()
      }
    } else {
      const { code, message } = await addressCreate(this.state)
      if(code === 0){
        Toast.success(message, 1)
        this.props.history.goBack()
      }
    }
  }


  render(){
    const { name, tel, areaName, address, isDefault } = this.state
    console.log(this.state)
    return(
      <div>
        <div className={style.container}>
          <List>
            <InputItem 
              value={name}
              placeholder="请输入收货人姓名"
              onChange={v=>this.onChange('name', v)}
            > 收货人 </InputItem>
            <InputItem 
              value={tel}
              type="number" 
              maxLength={11} 
              placeholder="请输入手机号"
              onChange={v=>this.onChange('tel', v)}
            > 联系电话</InputItem>

            <AddressSelect value={areaName} onChange={this.changeArea}/>
            <TextareaItem
              value={address}
              title="详细地址"
              rows={3}
              count={50}
              placeholder="请输入详细地址"
              onChange={v =>this.onChange('address', v)}
            > 详细地址</TextareaItem>

            <List.Item
              extra={<Switch
                checked={isDefault}
                onChange={v=>this.onChange('isDefault', v)}
              />}
            >默认地址</List.Item>
          </List>
        </div>

        <div className={style.create} onClick={this.submit}>保存</div>
      </div>
    )
  }
}
export default connect(
  (state:IStore) =>  ({ 'token': state.user.token }),
  null)(Index);