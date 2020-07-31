/**
 * @description 定义redux action 必须包含type
 */
interface IAction {
  type:string;
  payload?:any
}

/**
 * @description 根Store
 * 每次添加新模块，需要修改
 */
interface IStore {
  user:IStoreUser
}

// 模块store
interface IStoreUser {
  token:string;
  userInfo:IAnyObj;
}