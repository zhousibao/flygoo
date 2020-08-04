import React, { useEffect, FC } from 'react'
import { connect } from 'react-redux'
import { Picker, List } from 'antd-mobile'

type IAreaName = [string, string, string];
interface AddressSelectProps {
  title?:string;
  pleceholder?:string;
  value?:IAreaName;
  onChange:(value:IAreaName) => void;
}
interface dispatchProps{
  sagaGetAddressSelect:() => void;
}

type Iprops = IStoreApp & dispatchProps & AddressSelectProps
const AddressSelect:FC<Iprops> = (props) => {
  const { 
    areaList, 
    sagaGetAddressSelect, 
    value, 
    title = '所在地区', 
    pleceholder = '请选择', 
    onChange, 
  } = props
  

  useEffect(() => {
    !areaList.length && sagaGetAddressSelect()
  }, [areaList.length, sagaGetAddressSelect])

  // 格式化
  const formatFun = (labels:React.ReactNode[])=> {
    return labels.toString().replace(/,/g, ' ')
  }
  // 确认
  const ok = (value:IAreaName) => {
    onChange(value)
  }

  return (
    <>
      <Picker 
        data={areaList}
        title={title}
        extra={pleceholder}
        cols={3}
        value={value}
        format={formatFun}
        onOk={val => ok(val)}
      >
        <List.Item arrow="horizontal">所在地区</List.Item>
      </Picker>
    </>
  )
}

export default connect(
  (state:IStore) => ({ areaList: state.app.areaList }),
  {
    sagaGetAddressSelect: () => ({ type: 'saga_getAddressSelect' }),
  },
)(AddressSelect)
 