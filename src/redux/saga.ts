import { call, put, takeEvery } from 'redux-saga/effects'
import { addressSelect } from '@/server'


/**
 * worker Saga : 将在 action 被 dispatch 时调用
 * */ 
// 权限
function* getAddressSelect(){
  try{
    const { code, data } = yield call(addressSelect)
    if(code === '0'){
      yield put({ type: 'set_areaList', payload: data.list });
    }
  } catch(e) {
    console.log(e)
  }
}


/**
 * watch Saga :监听 action
 * */ 
export default function* appSaga() {
  yield takeEvery("saga_getAddressSelect", getAddressSelect);

}

