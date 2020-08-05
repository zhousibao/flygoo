import React, { Component } from 'react'
// import { connect } from 'react-redux'

// import en_US from 'antd-mobile/lib/locale-provider/en_US'; // 国际化
// import { LocaleProvider } from 'antd-mobile';
// antd-mobile 默认是中文


import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


class App extends Component {
  componentDidMount(){
    // this.props.sagaGetPermission(appCode)
  }
  render() {
    return (
      <div className="app-app">
        {/* <LocaleProvider locale={en_US}> */}
        {this.props.children}
        {/* </LocaleProvider> */}
      </div>
    )
  }
}
export default App
