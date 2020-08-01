import http from '../../utils/axios';
import {api} from '../../utils/server';
import {Toast} from 'antd-mobile';

/**initState*/
const initState = {
  addressList:[]//地址列表
};


/** actionType */
const ADDRESSLIST_SUCCESS = 'ADDRESSLIST_SUCCESS';
const ADDRESSDEFAULT_SUCCESS = 'ADDRESSDEFAULT_SUCCESS';
const ADDRESSDELETE_SUCCESS = 'ADDRESSDELETE_SUCCESS';

/** reducer */
export function addressReducer(state = initState,action){
  switch(action.type){
  case ADDRESSLIST_SUCCESS:
    return {...state,addressList:action.addressList};

  case ADDRESSDEFAULT_SUCCESS:
    let addressListDefault = state.addressList.slice(0,state.addressList.length);
    for(let address of addressListDefault){
      if(address.customerAddressId === action.customerAddressId){
        address.isDefault = 1;
      }else {
        address.isDefault = 0;
      }
    }

    return {...state,addressList:addressListDefault};

  case ADDRESSDELETE_SUCCESS:
    let addressListDelete = state.addressList.slice(0,state.addressList.length);
    for(let i=0; i<addressListDelete.length ; i++){
      if(addressListDelete[i].customerAddressId === action.customerAddressId){
        addressListDelete.splice(i,1);
      }
    }

    return {...state,addressList:addressListDelete};


  default:
    return state;
  }
}


/** actionCreate */
function addressListSuccess(addressList){
  return {type:'ADDRESSLIST_SUCCESS', addressList:addressList}
}
function addressDefaultSuccess(customerAddressId){
  return {type:'ADDRESSDEFAULT_SUCCESS', customerAddressId:customerAddressId}
}
function addressDeleteSuccess(customerAddressId){
  return {type:'ADDRESSDELETE_SUCCESS', customerAddressId:customerAddressId}
}


/**
 * function
 * view层需要用到的函数
 * */
//获取地址列表
export function addressList({customerId,token}){
  return (dispatch) => {
    http({
      url:api.addressList,
      data:{
        id:customerId,
        customerId:customerId
      },
      token:token,
      version:'1.7.0',
      emulateJSON:true
    }).then( res => {
      //console.log(res);
      if(res.respcode === '0'){
        dispatch(addressListSuccess(res.datas.addressList));
      }else{
        Toast.fail(res.respmsg,2);
      }
    })
  }
}

//新建地址
export function addressCreate(){
  return (dispatch) => {
    http({
      url:api.addressCreate,
      version:'1.7.0',
      emulateJSON:true
    }).then(res => {
      //console.log(res);
      if(res.respcode === '0'){


      }else{
        Toast.fail(res.respmsg,2);
      }
    })
  }
}


//更新地址
export function addressUpdate(){
  return (dispatch) => {
    http({
      url:api.addressUpdate,
      version:'1.7.0',
      emulateJSON:true
    }).then(res => {
      //console.log(res);
      if(res.respcode === '0'){


      }else{
        Toast.fail(res.respmsg,2);
      }
    })
  }
}

//删除地址
export function addressDelete({customerId,token,customerAddressId}){
  return (dispatch) => {
    http({
      url:api.addressDelete,
      data:{
        customerId:customerId,
        id:customerAddressId
      },
      version:'1.7.0',
      token:token,
      emulateJSON:true
    }).then(res => {
      //console.log(res);
      if(res.respcode === '0'){
        dispatch(addressDeleteSuccess(customerAddressId));
      }else{
        Toast.fail(res.respmsg,2);
      }
    })
  }
}


//修改默认地址
export function addressDefault({customerId,token,customerAddressId}){
  return (dispatch) => {
    http({
      url:api.addressDefault,
      data:{
        id:customerId,
        customerId:customerId,
        customerAddressId:customerAddressId
      },
      version:'1.7.0',
      token:token,
      emulateJSON:true
    }).then(res => {
      //console.log(res);
      if(res.respcode === '0'){
        dispatch(addressDefaultSuccess(customerAddressId));
      }else{
        Toast.fail(res.respmsg,2);
      }
    })
  }
}