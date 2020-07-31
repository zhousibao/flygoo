import React, { Component } from 'react';
import style from './index.module.less';

import { Tabs } from 'antd-mobile';
import { commonTags, menuContent } from '@/server/home'
import ModuleType1 from './components/ModuleType1'
import ModuleType2 from './components/ModuleType2'
import ModuleType3 from './components/ModuleType3'
import ModuleType4 from './components/ModuleType4'

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
    const { tabs, contentList } = this.state;
    return(
      <div>
        <div className={style.tabCon}>
          <Tabs tabs={tabs} renderTab={tab => <span>{tab.name}</span>}/>
        </div>

        <div className={style.homeCon} id="homeCon">
          { contentList.map(item => 
            item.type === 1 && 
            <div key={item.id}>
              <ModuleType1 list={item.moduleOne}/>
            </div> 
            ||
            item.type === 2 && 
            <div key={item.id}>
              <ModuleType2 
                title={item.moduleTwo.title}
                linkAddress={item.moduleTwo.linkAddress}
                imgSrc={item.moduleTwo.imgSrc}
              />
            </div>
            ||
            item.type === 3 && 
            <div key={item.id}>
              <ModuleType3 list={item.moduleThree}/>
            </div>
            ||
            item.type === 4 && 
            <div key={item.id}>
              <ModuleType4 detail={item.moduleFour} />
            </div>, 
          )}
        </div>
      </div>
    )
  }
}

export default Home