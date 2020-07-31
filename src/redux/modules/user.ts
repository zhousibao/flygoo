const defaultState:IStateUser= {
  token: '', 
  userInfo: {}, // 用户信息
}

const user = function(state = defaultState, action:IAction){
  const { type, payload } = action

  switch (type) {
  case 'set_token':
    return { ...state, token: payload }
  case 'set_userInfo':
    return { ...state, userInfo: payload }
  default:
    return state
  }
}

export default user