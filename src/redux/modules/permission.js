const defaultState = {
  user: {
    personName: '超级管理员',
  },
  permissionList: [], //  用户包含的权限集合
}

const permission = function(state = defaultState, action){
  const { type, payload } = action

  switch (type) {
  case 'set_permissionList':
    return { ...state, permissionList: payload }
  case 'set_user':
    return { ...state, user: payload }
  default:
    return state
  }
}

export default permission
 
