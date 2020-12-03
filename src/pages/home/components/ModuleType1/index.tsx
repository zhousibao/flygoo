import React, { FC } from 'react'
import { Carousel } from 'antd-mobile'
import style from './index.module.less';
import  { Image }  from '@/components'

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
      <Carousel autoplay={true} infinite dots={false}>
        { list.map(item => (
          <a className={style.module} href={item.linkAddress} key={item.id}>
            <Image src={item.pic} width="100vw" height="160px"/>
          </a>
        ),
        )}
      </Carousel>
    </>
  )
}

export default Index
