import moment from 'moment'

// 时间格式化
export function formatDate(val:any, formate = 'YYYY-MM-DD HH:mm:ss'){
  return val ? moment(val).format(formate) : ''
}