import React, { useState, useEffect, FC } from 'react'
import { connect } from 'react-redux'
import { Picker, List } from 'antd-mobile'

interface AddressSelectProps {
  defaultValue?:[];
  pleceholder?:string;
  // onChange:(value) => void
}
interface dispatchProps{
  sagaGetAddressSelect:() => void;
}

type Iprops = IStoreApp & dispatchProps & AddressSelectProps
const AddressSelect:FC<Iprops> = (props) => {
  const { areaList, sagaGetAddressSelect, defaultValue, pleceholder = '请选择' } = props

  const [value, setValue] = useState(defaultValue)
  useEffect(() => {
    !areaList.length && sagaGetAddressSelect()
  }, [areaList.length, sagaGetAddressSelect])

  // 格式化
  const formatFun = (labels:React.ReactNode[])=> {
    return labels.toString().replace(/,/g, ' ')
  }
  // 确认
  const ok = (value) => {
    console.log(value)
    // onChange(value)
    setValue(value)
  }

  return (
    <>
      <Picker 
        data={areaList}
        title="所在地区"
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
 