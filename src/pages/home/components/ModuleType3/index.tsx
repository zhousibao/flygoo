import React, { FC } from 'react'
import style from './index.module.less';
import { Image } from '@/components'

interface ImgObj {
  id:number;
  pic:string;
  linkAddress:string
}
interface ModuleProps {
  title:string;
  list:ImgObj[]
}

const Index:FC<ModuleProps> = (props) => {
  const { title, list } = props
  return (
    <>
      <div className={style.module3}>
        <div className={style.title_con}>
          <div className={style.line}/>
          <div className={style.title}>{title}</div>
          <div className={style.line}/>
        </div>
        <div className={style.module}>
          {
            list.map(item => 
              <a className={style.module} href={item.linkAddress} key={item.linkAddress}>
                <Image src={item.pic} width="25vw" height="25vw"/>
              </a>,
            )
          }
        </div>
      </div>
      
    </>
  )
}

export default Index
