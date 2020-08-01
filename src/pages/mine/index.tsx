import React, { Component }  from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar, Flex, List } from 'antd-mobile';
import { Footer, Image } from "@/components";

import style from './index.module.less';
import conponImg from '@/assets/mine/icon_my_coupon@2x.png'
import scoreImg from '@/assets/mine/icon_score_selected@2x.png'
import manImg from '@/assets/mine/icon_man@2x.png'
import womanImg from '@/assets/mine/icon_woman@2x.png'

// 交叉类型关联 IStoreUser 和 RouteComponentProps
type IProps =  RouteComponentProps & IStoreUser
class Mine extends Component<IProps, any> {
  componentDidMount(){
    if(!this.props.token){
      this.props.history.push('/login');
    }
  }
  //跳转
  go = (path:string) => {
    this.props.history.push(path);
  }

  render() {
    const { token, userInfo } = this.props
    return (
      <div>
        {token?
          <div className={style.mine}>
            <div className={style.top}>
              <NavBar mode="light">{userInfo.name}</NavBar>
              <Flex justify="center">
                <div className={style.avatar_con}>
                  <Image 
                    src={userInfo.image}
                    width="60px"
                    height="60px"
                    className={style.avatar}
                  />
                  <div className="gender">
                    {userInfo.sex === 1 &&
                      <Image 
                        src={manImg} 
                        width="20px" 
                        height="20px"
                      />
                    }
                    {userInfo.sex === 2 &&
                      <Image 
                        src={womanImg} 
                        width="20px" 
                        height="20px"
                      />
                    }
                  </div>
                </div>
              </Flex>
              <Flex justify="around" style={{ paddingTop: 20 }}>
                <Flex.Item className={style.li}>
                  <Image src={scoreImg} width="20px" height="23px"/>
                  <span style={{ paddingLeft: 10 }}>收藏夹</span>
                </Flex.Item>
                <Flex.Item className={style.li}>
                  <Image src={conponImg} width="22px" height="23px"/>
                  <span style={{ paddingLeft: 10 }}>优惠券</span>
                </Flex.Item>
              </Flex>
            </div>

            <List>
              <List.Item arrow="horizontal" onClick={() => this.go('/orderList')}>我的订单</List.Item>
              <List.Item arrow="horizontal" onClick={() => this.go('/address/list')}>地址管理</List.Item>
            </List>


          </div>
          :null}

        <Footer/>
      </div>

    );
  }
}
export default connect(
  (state:IStore) => ({ token: state.user.token, userInfo: state.user.userInfo }),
  null,
)(Mine);