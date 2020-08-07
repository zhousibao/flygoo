import moment from 'moment'

/**
 * @description 时间格式化
 * @param val 
 * @param formate 
 */
const formatDate = (val:any, formate = 'YYYY-MM-DD HH:mm:ss') => {
  return val ? moment(val).format(formate) : ''
}

/**
 * @description 深拷贝
 * @param obj 
 */
const deepCopy = (obj:any):any => {
  if(typeof obj !== 'object' || obj === null){
    return obj
  }

  const result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCopy(obj[key]);  // 递归复制
    }
  }
  return result;
}

export { formatDate, deepCopy }