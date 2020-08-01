import React, { FC } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import style from './index.module.less';

import home from '@/assets/menu/icon_home.png';
import homeSelected from '@/assets/menu/icon_home_selected.png';
import cart from '@/assets/menu/icon_shop_cart.png';
import cartSelected from '@/assets/menu/icon_shop_cart_selected.png';
import mine from '@/assets/menu/icon_mine.png';
import mineSelected from '@/assets/menu/icon_mine_selected.png';


const  Menu:FC<RouteComponentProps> = (props) => {
  const path = props.location.pathname;
  return (
    <div className={style.menu}>
      <Link to="/home"  className={style.menu_con}>
        <img src={ path === '/home' ? homeSelected : home} alt="home" className={style.img}/>
        <p className={ path === '/home' ? style.text : style.text1}>首页</p>
      </Link>

      <Link to="/cart"  className={style.menu_con}>
        <img src={ path === '/cart' ? cartSelected : cart} alt="cart" className={style.img}/>
        <p className={ path === '/cart' ? style.text : style.text1}>购物车</p>
      </Link>

      <Link to="/mine"  className={style.menu_con}>
        <img src={ path === '/mine' ? mineSelected : mine} alt="mine" className={style.img}/>
        <p className={ path === '/mine' ? style.text : style.text1}>我的</p>
      </Link>
    </div>
  );
}

export default withRouter(Menu);
//withRouter 在不是路由的组件中添加路由信息
