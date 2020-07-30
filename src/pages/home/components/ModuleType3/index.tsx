import React, { FC } from 'react'
import style from './index.module.less';
import Image  from '@/components'

interface ImgObj {
  id:number;
  pic:string;
  linkAddress:string
}
interface ModuleProps {
  list:ImgObj[]
}

const Index:FC<ModuleProps> = (props) => {
  const { list } = props
  return (
    <>
      <div className={style.module}>
        {
          list.map(item => 
            <a className={style.module} href={item.linkAddress} key={item.id}>
              <Image src={item.pic} width="25vw" height="25vw"/>
            </a>,
          )
        }
      </div>
    </>
  )
}

export default Index
