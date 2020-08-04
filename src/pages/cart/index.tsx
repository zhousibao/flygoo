import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { SwipeAction } from 'antd-mobile';
import { Footer, Image } from "@/components";

import { cartList } from '@/server/cart'

import style from './index.module.less';
import chooseSelectedImg from '@/assets/cart/icon_choose_selected@2x.png'
import chooseNormalImg from '@/assets/cart/icon_choose_normal@2x.png'
import minNotImg from '@/assets/cart/icon_min_not@2x.png'
import minImg from '@/assets/cart/icon_min@2x.png'
import maxImg from '@/assets/cart/icon_max@2x.png'

interface IGoods {
  id:number;
  orderNumber:number;
  cnyPrice:number;
  pic:string;
  productName:string;
  choose?:boolean
}
interface IState{
  cartList:IGoods[];
}
type Iprops = RouteComponentProps & IStoreUser
class Cart extends Component<Iprops> {
  public state:Readonly<IState> = {
    cartList: [],
  }

  componentDidMount(){
    // 已登录
    if(this.props.token){
      this.getCartList()
    }
  }

  // 获取列表
  getCartList = async() => {
    const { token } = this.props
    const { code, data } = await cartList({ token })
    if(code === '0'){
      const list = data.list.map(item => {
        item.choose = false
        return item
      })

      this.setState({
        cartList: list,
      })
    }
  }


  //删除商品
  delete(id:number){
    const list = this.state.cartList.filter(item => item.id !== id)
    this.setState({
      cartList: list,
    })
  }

  //更新商品数量
  update = (id:number, type:number) => {
    const list = this.state.cartList.map(item => {
      if(item.id === id){
        if(type === 1){
          //减
          item.orderNumber = item.orderNumber - 1;
        } else {
          //加
          item.orderNumber = item.orderNumber + 1;
        }
      }
      return item
    })

    this.setState({
      cartList: list,
    })
  }

  //选择商品
  choose = (id:number) => {
    const list = this.state.cartList.map(item => {
      if(item.id === id){
        item.choose = !item.choose
      }
      return item
    })

    this.setState({
      cartList: list,
    })
  }

  //全选
  allChoose = () => {
    const list = this.state.cartList.map(item => {
      item.choose = true
      return item
    })

    this.setState({
      cartList: list,
    })
  }
  // 计算选中数量
  getChoosedNum = () => {
    const list = this.state.cartList.filter( item => item.choose)
    return list.length
  }
  // 计算选中的金额
  getChoosePrice = () => {
    let allPrice = 0
    this.state.cartList.map( item => {
      if(item.choose){
        allPrice = allPrice + item.cnyPrice
      }
      return item
    })

    return allPrice
  }

  //结算
  submit(){
    console.log('结算');
  }


  render() {
    const { token } = this.props;
    const { cartList } = this.state;

    return (
      <>
        <div className={style.container}>
          {
            token ? cartList.length ? 
              <div className={style.cartList}>
                <div className={style.cart_body}>
                  {cartList.map(cart => (
                    <div className={style.goods_con} key={cart.id}>
                      <SwipeAction
                        right={[
                          {
                            text: '删除',
                            onPress: () => this.delete(cart.id),
                            style: { backgroundColor: '#fd3c53', color: 'white' },
                          },
                        ]}
                      >
                        <div className={style.goods}>
                          <div className={style.goods_body}>
                            <div className="pr10" onClick={() => this.choose(cart.id)}>
                              {cart.choose ?
                                <Image src={chooseSelectedImg} width="22px" height="22px"/>
                                :
                                <Image src={chooseNormalImg} width="22px" height="22px"/>
                              }
                            </div>
                            <Link to={`/goods?id=${cart.id}`}>
                              <Image src={cart.pic} width="110px" height="110px"/>
                            </Link>
                            <div className={style.cart_goods}>
                              <p className="hang2">{cart.productName}</p>
                              <div className={style.goods_num}>
                                <div>
                                  {cart.orderNumber === 1 ?
                                    <Image src={minNotImg} width="20px" height="20px"/>
                                    :
                                    <div onClick={() => this.update(cart.id, 1)}>
                                      <Image src={minImg} width="20px" height="20px"/>
                                    </div>
                                  }
                                </div>
                                <p className={style.num}>{cart.orderNumber}</p>
                                <div onClick={() => this.update(cart.id, 2)}>
                                  <Image src={maxImg} width="20px" height="20px"/>
                                </div>
                              </div>
                              <p style={{ color: '#f00' }}>¥{cart.cnyPrice}</p>
                            </div>

                          </div>

                        </div>
                      </SwipeAction>
                    </div>
                  ))}
                </div>
                <footer className={style.cart_footer}>
                  <div className={style.left}>
                    <div className={style.con} onClick={() => this.allChoose()}>
                      {this.getChoosedNum() === cartList.length ?
                        <Image src={chooseSelectedImg} width="22px" height="22px"/>
                        :
                        <Image src={chooseNormalImg} width="22px" height="22px"/>
                      }
                      <p style={{ paddingLeft: 5 }}>全选</p>
                    </div>
                    <div className={style.con}>
                      <p style={{ paddingRight: 5 }}>合计:</p>
                      <p className={style.price}>¥{this.getChoosePrice()}</p>
                    </div>
                  </div>

                  {this.getChoosedNum() === 0 ?
                    <div className={style.right}>立刻结算</div>
                    :
                    <div className={[style.right, style.active].join(' ')} onClick={() => this.submit()}>立刻结算</div>
                  }
                </footer>
              </div>
              :
              <div className={style.kong}>
                <p className="mb20">您的购物车为空</p>
                <p className="mb20">快去选几件东西吧...</p>
                <Link to="/home" style={{ marginRight: 10 }}>去首页</Link>
              </div>
              :
              <div className={style.kong}>
                <p className="mb20">您还没有登录呢，快去登录看看吧...</p>
                <Link to="/login" style={{ marginRight: 10 }}>登 录</Link>
              </div>
          }
        </div>
    

        <Footer/>
      </>

    );
  }
}
export default connect(
  (state:IStore) => ({ 'token': state.user.token }),
  null)(Cart);