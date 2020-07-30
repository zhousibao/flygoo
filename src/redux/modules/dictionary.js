const defaultState = {
  platformVersionList: [], // 平台版本
  courseTypeList: [], // 课程类型
  workOrderTypeList: [], // 工单类型
}

const dictionary = function(state = defaultState, action){
  const { type, payload } = action

  switch (type) {
  case 'set_platformVersionList':
    return { ...state, platformVersionList: payload }

  case 'set_courseTypeList':
    return { ...state, courseTypeList: payload }

  case 'set_workOrderTypeList':
    return { ...state, workOrderTypeList: payload }
  default:
    return state
  }
}

export default dictionary