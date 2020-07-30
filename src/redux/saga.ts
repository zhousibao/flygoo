import { call, put, takeEvery } from 'redux-saga/effects'
import { permissionInfo } from '@/server/app'


/**
 * worker Saga : 将在 action 被 dispatch 时调用
 * */ 
// 权限
function* getPermission(action){
  try{
    const res = yield call(permissionInfo, action.payload)
    if(res.code === '0'){
      const { permission, me } = res.data
      yield put({ type: "set_permissionList", payload: permission });
      yield put({ type: "set_user", payload: me });
    }
  } catch(e) {
    console.log(e)
  }
}


/**
 * watch Saga :监听 action
 * */ 
export default function* appSaga() {
  yield takeEvery("saga_getPermission", getPermission);

}

