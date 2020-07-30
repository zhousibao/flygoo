import React, { Component } from 'react';
import style from './index.module.less';

import { Tabs } from 'antd-mobile';
import { commonTags, menuContent } from '@/server/home'
import ModuleType1 from './components/ModuleType1'

class Home extends Component<any, any> {
  constructor(props){
    super(props);
    // this.getTabs = this.getTabs.bind(this);
    // this.changeTab = this.changeTab.bind(this);

    this.state = {
      tabs: [],
      contentList: [],
    }


  }
  componentDidMount(){
    this.getCommonTags();
    this.getMenuContent(1)
  }

  getCommonTags = async () => {
    const { code, data } = await commonTags()
    if(code === '0'){
      this.setState({
        tabs: data?.list,
      })
    }
  }

  getMenuContent = async (id:number) => {
    const { code, data } = await menuContent({ id })
    if(code === '0'){
      console.log(data)
      this.setState({
        contentList: data?.list,
      })
    }
  }


  render(){
    // console.log('state', this.state);
    const { tabs, contentList } = this.state;
    // tabs.map(tab => {tab.title = tab.homeMenuName});

    // const modules = this.props.modules;
    return(
      <div>
        <div className={style.tabCon}>
          <Tabs tabs={tabs} renderTab={tab => <span>{tab.name}</span>}/>
        </div>

        <div className={style.homeCon} id="homeCon">
          { contentList.map(item => 
            item.type === 1 && <div key={item.id}><ModuleType1 list={item.carouselList}/></div>,
          )}
        </div>
      </div>
    )
  }
}

export default Home