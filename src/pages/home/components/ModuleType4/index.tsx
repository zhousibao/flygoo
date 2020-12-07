import React, { FC } from 'react'
import style from './index.module.less';
import { Image }  from '@/components'

interface ImgObj {
  id:number;
  pic:string;
  linkAddress:string
}
interface DetailObj {
  title:string;
  description:string;
  list:ImgObj[]
}

interface ModuleProps {
  detail:DetailObj;
}

const Index:FC<ModuleProps> = (props) => {
  const { title, description, list } = props.detail
  return (
    <>
      <div className={style.module4}>
        <div className={style.title}>{title}</div>
        <div className={style.description}>{description}</div>
        <div className={style.module}>
          {
            list.map(item => 
              <a className={style.module} href={item.linkAddress} key={item.linkAddress}>
                <Image src={item.pic} width="50vw" height="50vw"/>
              </a>,
            )
          }
        </div>
      </div>
    </>
  )
}

export default Index
