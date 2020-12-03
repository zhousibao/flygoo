import React, { FC } from 'react'
import style from './index.module.less';
import  { Image }  from '@/components'

interface ModuleProps {
  title:string;
  linkAddress:string;
  pic:string;
}

const Index:FC<ModuleProps> = (props) => {
  const { title, linkAddress, pic } = props
  return (
    <>
      <div className={style.module2}>
        <a className={style.module} href={linkAddress}>
          <Image src={pic} width="100vw" height="150px"/>
        </a>
        <div className={style.ceng}>{title}</div>
      </div>
    </>
  )
}

export default Index
