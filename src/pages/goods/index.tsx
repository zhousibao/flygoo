import React, { Component } from 'react';
import { Carousel, List, Modal, Button, Flex, Toast } from 'antd-mobile';
import { Image } from '@/components';

import { goodsDetail } from '@/pages/goods/api'

import style from './index.module.less';
import collectImg from '@/assets/goods/icon_collect_normal@2x.png'
import customerImg from '@/assets/goods/icon_contact_customer_service@2x.png'

interface IGoods {
  productName:string;
  cnyPrice:number;
  pics:string[];
}
interface IState {
  goods:IGoods;
  num:number;
  modal1: boolean; 
  modal2: boolean, 
  type:string;
}
class Goods extends Component<any, IState> {
  public state:Readonly<IState> = {
    goods: {} as IGoods,
    num: 1,
    modal1: false, //包邮模态框
    modal2: false, //购物车、直接购买模态框
    type: 'cart', // cart or buy
  }


  componentDidMount(){
    // 使用 Web api URLSearchParams 解析query
    const query = new URLSearchParams(this.props.location.search)
    const id = query.get('id') as string
    this.getGoods(id)
  }

  //获取商品详情
  getGoods = async(id:string) => {
    const { code, data } = await goodsDetail({ id })
    if(code === 0){
      this.setState({
        goods: data,
      })
    }
  }

  // 打开模态框
  openModal = (type:string) => {
    this.setState({
      type,
      num: 1,
    })
    this.changeState('modal2', true)
  }

  // 切换模态框
  changeState = (key:keyof IState, value:boolean) => {  
    this.setState({
      [key]: value,
    } as Pick<IState, 'modal1' | 'modal2'> )
  }

  //改变num数量
  changeNum = (type:string) => {
    this.setState((state, props) => {
      if(type === 'add'){
        return { num: state.num + 1 }
      } else {
        return { num: state.num - 1 }
      }
    })
  }

  //加入购物车
  joinCart = () => {
    Toast.success('加入购物车成功', 2)
    this.changeState('modal2', false)
  }
  //立即购买
  buy = () => {
    Toast.success('购买成功', 2)
    this.changeState('modal2', false)
  }


  render() {
    const { goods, num, modal1, modal2, type } = this.state
    return(
      <>
        <div className={style.container}>
          { goods.pics &&
            <Carousel autoplay={true} infinite>
              { goods.pics.map((item, index) =>
                <Image src={item} key={index} width="100vw" height="70vw"/>,
              )}
            </Carousel>
          }

          <div className={style.top}>
            <p className={style.name}>{goods.productName}</p>
            <p className={style.price}>¥{goods.cnyPrice}</p>
          </div>

          <div>
            <List className="mb10">
              <List.Item 
                arrow="horizontal" 
                multipleLine 
                onClick={() => {this.changeState('modal1', true)}}
              >
                运费：包邮
              </List.Item>
            </List>
          </div>
        </div>


        <footer className={style.footer}>
          <div className={style.collect}>
            <img src={collectImg} alt="" className={style.collect_img}/>
            <p className={style.collect_text}>收藏</p>
          </div>
          <div className={style.collect}>
            <img src={customerImg} alt="" className={style.collect_img}/>
            <p className={style.collect_text}>联系客服</p>
          </div>
          <div className={style.cart} onClick={() => {this.openModal('cart')}}>加入购物车</div>
          <div className={style.buy} onClick={() => {this.openModal('buy')}}>立即购买</div>
        </footer>

        <Modal visible={modal1}
          transparent
          maskClosable={false}
          footer={[{ text: 'Ok', onPress: () => {this.changeState('modal1', false)} }]}
        >
          <div>预计到货时间：3-20天</div>
        </Modal>

        <Modal visible={modal2}
          popup
          animationType="slide-up"
          maskClosable={true}
          onClose={() => {this.changeState('modal2', false)}}
        >
          <List renderHeader={() => <div>{type === 'cart' ? '加入购物车':'立即购买'}</div>}>
            <List.Item>{goods.productName}</List.Item>
            <List.Item>¥{goods.cnyPrice}</List.Item>
            <List.Item>
              <Flex align="center" justify="start">
                <Button 
                  inline 
                  size="small" 
                  disabled={num === 1} 
                  onClick={() => {this.changeNum('cut')}}
                >
                  -
                </Button>
                <div className={style.cartNum}>{num}</div>
                <Button inline size="small" onClick={() => {this.changeNum('add')}}>+</Button>
              </Flex>
            </List.Item>
            <List.Item>
              {
                type === 'cart' ?
                  <Button type="primary" onClick={this.joinCart}>确定</Button>
                  :
                  <Button type="primary" onClick={this.buy}>确定</Button>
              }
            </List.Item>
          </List>
        </Modal>
      </>

    );
  }
}

export default Goods;
