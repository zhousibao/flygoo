import { call, put, takeEvery } from 'redux-saga/effects'
import { permissionInfo, platformVersion, courseTypes, workOrderTypes } from '@/server/app'


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

// 平台版本
function* getPlatformVersion(){
  try{
    const { code, data } = yield call(platformVersion)
    if(code === '0'){
      yield put({ type: "set_platformVersionList", payload: data });
    }
  } catch(e) {
    console.log(e)
  }
}

// 课程类型
function* getCourseTypes(){
  try{
    const { code, data } = yield call(courseTypes)
    if(code === '0'){
      yield put({ type: "set_courseTypeList", payload: data });
    }
  } catch(e) {
    console.log(e)
  }
}

// 工单类型
function* getWorkOrderTypeList(){
  try{
    const { code, data } = yield call(workOrderTypes)
    if(code === '0'){
      yield put({ type: "set_workOrderTypeList", payload: data });
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
  yield takeEvery("saga_platformVersion", getPlatformVersion);
  yield takeEvery("saga_courseTypes", getCourseTypes);
  yield takeEvery("saga_workOrderTypeList", getWorkOrderTypeList);
}

