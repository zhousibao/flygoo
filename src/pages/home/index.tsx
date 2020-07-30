import React, { Component } from 'react';
import style from './index.module.less';

import { Tabs } from 'antd-mobile';
import { commonTags } from '@/server/home'

class Home extends Component<any, any> {
  constructor(props){
    super(props);
    // this.getTabs = this.getTabs.bind(this);
    // this.changeTab = this.changeTab.bind(this);

    this.state = {
      tabs: [],
    }


  }
  componentDidMount(){
    this.getCommonTags();
  }

  getCommonTags = async () => {
    const { code, data } = await commonTags()
    if(code === '0'){
      console.log(data)
      this.setState({
        tabs: data?.list,
      })
    }
  }


  render(){
    // console.log('state', this.state);
    const { tabs } = this.state;
    // tabs.map(tab => {tab.title = tab.homeMenuName});

    // const modules = this.props.modules;
    return(
      <div>
        <div className={style.tab_container}>
          <Tabs tabs={tabs} renderTab={tab => <span>{tab.name}</span>}/>
        </div>
      </div>
    )
  }
}

export default Home