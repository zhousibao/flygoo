import React, { FC } from 'react';

interface ImagePorps {
  src:string;
  width:string;
  height:string;
  className?:string
}

const Image:FC<ImagePorps> = (props) => {
  const { src, height, width, className } = props
  const style = {
    backgroundImage: `url(${src})`,
    height,
    width,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    
  };


  return (
    <div style={style} className={className}/>
  )
}

export default Image