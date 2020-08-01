import React, { FC } from 'react'
import style from './index.module.less';
import  { Image }  from '@/components'

interface ModuleProps {
  title:string;
  linkAddress:string;
  imgSrc:string;
}

const Index:FC<ModuleProps> = (props) => {
  const { linkAddress, imgSrc } = props
  return (
    <>
      <a className={style.module} href={linkAddress}>
        <Image src={imgSrc} width="100vw" height="150px"/>
      </a>
    </>
  )
}

export default Index
