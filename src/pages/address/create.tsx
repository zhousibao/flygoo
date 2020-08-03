import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom'
import { InputItem, TextareaItem, Switch, List } from 'antd-mobile';

import { AddressSelect } from '@/components'

import style from './create.module.less'


interface IState {
  name:string;
  tel:string;
  address:string|undefined;
  isDefault:boolean;
}

type Iprops = RouteComponentProps & IStoreUser
class Index extends Component<Iprops, IState>{
  public state: Readonly<IState> = {
    name: '',
    tel: '',
    address: '',
    isDefault: false,
  }


  componentDidMount(){
    // 使用 Web api URLSearchParams 解析query
    const query = new URLSearchParams(this.props.location.search)
    if(query.get('id')){
      console.log('编辑')
      // 编辑

    }
  }

  //表单获取value
  onChange(key: keyof IState, val: string| boolean| undefined){
    console.log(val)
    this.setState({
      [key]: val,
    }as Pick<IState, 'name' | 'tel'| 'address' | 'isDefault'>)
  }


  render(){
    const { name, tel, address, isDefault } = this.state
    console.log(this.props);
    // console.log(this.state.address);

    
    return(
      <div>
        <div className={style.container}>
          <List>
            <InputItem 
              defaultValue={name}
              placeholder="请输入收货人姓名"
              onChange={v=>this.onChange('name', v)}
            > 收货人 </InputItem>
            <InputItem 
              defaultValue={tel}
              type="number" 
              maxLength={11} 
              placeholder="请输入手机号"
              onChange={v=>this.onChange('tel', v)}
            > 联系电话</InputItem>

            <AddressSelect/>
            <TextareaItem
              defaultValue={address}
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

        <div className={style.create}>保存</div>
      </div>
    )
  }
}
export default connect(
  (state:IStore) => state.user,
  null)(Index);