import React, { FC, HTMLAttributes } from 'react';

interface ImagePorps {
  src:string;
  width:string;
  height:string;
  className?:string
}

// <HTMLAttributes<HTMLElement>:原生元素的属性
// Partial : 构造给定类型的说有子集，即所有参数可选
type IProps = Partial<HTMLAttributes<HTMLElement>> & ImagePorps
const Image:FC<IProps> = (props) => {
  const { src, height, width, className, ...restProps } = props
  const style = {
    backgroundImage: `url(${src})`,
    height,
    width,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    
  };

  return (
    // restProps // 注意把props传给元素
    <div {...restProps} style={style}  className={className}/>
  )
}

export default Image