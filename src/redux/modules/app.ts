const defaultState:IStoreApp = {
  areaList: [], // 省市区地址
}

const app = (state = defaultState, action:IAction) => {
  const { type, payload } = action

  switch (type) {
  case 'set_areaList':
    return { ...state, areaList: payload }  
  default:
    return state;
  }
}

export default app