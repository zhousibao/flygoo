import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom'
import { InputItem, List } from 'antd-mobile';

import { AddressSelect } from '@/components'

import style from './create.module.less'

type Iprops = RouteComponentProps & IStoreUser
class Index extends Component<Iprops>{
  // constructor(props){
  //   super(props);

  //   this.state = {
  //     customerId: localStorage.getItem('customerId'),
  //     token: localStorage.getItem('token'),
  //     addressId: this.props.match.params.id, //路由参数，地址id
  //     address: null, //编辑的地址


  //     name: '',
  //     phone: '',
  //   }

  //   if(this.state.addressId){
  //     if(this.props.addressList.length > 0){
  //       for(let address of this.props.addressList){
  //         if(address.customerAddressId === this.state.addressId){
  //           this.state.address = address;
  //         }
  //       }
  //     }
  //   }
  // }

  componentDidMount(){
    // 使用 Web api URLSearchParams 解析query
    const query = new URLSearchParams(this.props.location.search)
    if(query.get('id')){
      console.log('编辑')
      // 编辑

    }
  }

  //表单获取value
  onChange(key, val){
    this.setState({
      [key]: val,
    })
  }


  render(){
    console.log(this.props);
    // console.log(this.state.address);

    
    return(
      <div>
        <div className={style.container}>
          <List>
            <InputItem placeholder="请输入收货人姓名"
              onChange={v=>this.onChange('name', v)}>收货人</InputItem>
            <InputItem type="number" maxLength={11} placeholder="请输入手机号"
              onChange={v=>this.onChange('phone', v)}> 联系电话</InputItem>

            <AddressSelect/>
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