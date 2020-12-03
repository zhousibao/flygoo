import React, { Component }from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Toast, Flex } from 'antd-mobile';
import { Image } from '@/components';

import { addresslist, addressDelete } from '@/pages/address/api'

import style from './list.module.less'
import editImg from '@/assets/address/icon_edit@2x.png'
import deleteImg from '@/assets/address/icon_delete_address@2x.png'
import setDefaultImg from '@/assets/address/icon_isnt_default_address@2x.png'
import defaultImg from '@/assets/address/icon_default_address@2x.png'

interface IAddress {
  id:number;
  name:string;
  tel:string;
  isDefault:boolean;
  areaName:string;
  address:string;
}

interface IState{
  addressList:IAddress[];
}

type Iprops = IStoreUser
class AddressList extends Component<Iprops>{
  public state: Readonly<IState> = {
    addressList: [],
  }

  componentDidMount(){
    this.getAddresslist()
  }
  // 
  getAddresslist = async() => {
    const where = {
      token: this.props.token,
    }
    const { code, data } = await addresslist(where)
    if(code === 0){
      this.setState({
        addressList: data.list,
      })
    }
  }

  //设置默认地址
  setDefault = (id:number) => {
    const list = this.state.addressList.map(item => {
      if(item.id === id){
        item.isDefault = true
      } else {
        item.isDefault = false
      }
      return item
    })

    this.setState({
      addressList: list,
    })
  }

  //删除地址提醒
  addressDelete = (id:number) => {
    if(this.state.addressList.length === 1){
      Toast.info('最后一条了，不能再删除了！', 2);
    } else {
      Modal.alert('确定删除这条地址信息', '删除后无法找回', 
        [
          { text: '取消', onPress: () => console.log('取消') },
          { text: '确定', onPress: () => this.delete(id) },
        ],
      );
    }
  }
  // 删除地址
  delete = async(id:number) => {
    const { code, message } =await addressDelete({ id })
    if(code === 0){
      Toast.success(message, 1)
      const list = this.state.addressList.filter(item => item.id !== id)
      this.setState({
        addressList: list,
      })
    }
  }

    
  render(){
    console.log(this.props);
    const { addressList } = this.state
    // const addressList = this.props.addressList;
    return(
      <div>
        <div className={style.container}>
          {addressList.length ?
            <div className={style.ul}>
              { addressList.map((address, index) => (
                <div className={style.li} key={address.id}>
                  <Flex justify="between" className="pt20">
                    <span>{address.name}</span>
                    <span>{address.tel}</span>
                  </Flex>
                  <div className={style.detail}>{address.areaName} {address.address}</div>

                  <div className={style.set}>
                    { address.isDefault ?
                      <div className={style.default}>
                        <Image src={defaultImg} width="15px" height="15px"/>
                        <span style={{ color: 'rgb(255,39,65)', paddingLeft: 5 }}>默认地址</span>
                      </div>
                      :
                      <div className={style.default} onClick={() => this.setDefault(address.id)}>
                        <Image src={setDefaultImg} width="15px" height="15px"/>
                        <span style={{ color: 'rgb(142,145,147)', paddingLeft: 5 }}>设为默认地址</span>
                      </div>
                    }

                    <div className={style.btn_group}>
                      <Link to={`/address/create?id=${address.id}`} className={style.btn} style={{ marginRight: 15 }}>
                        <Image src={editImg} width="10px" height="10px"/>
                        <span style={{ paddingLeft: 5 }}>编辑</span>
                      </Link>
                      <div className={style.btn} onClick={() => this.addressDelete(address.id) }>
                        <Image src={deleteImg} width="8px" height="10px"/>
                        <span style={{ paddingLeft: 5 }}>删除</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            :
            <div className={style.kong_div}>
              不添加收货地址快递会迷路哒～
            </div>
          }
        </div>

        <Link to="/address/create" className={style.addressCreate}>新建收货地址</Link>
      </div>
    )
  }
}
export default connect(
  (state:IStore) => ({ 'token': state.user.token }), 
  null)
(AddressList);