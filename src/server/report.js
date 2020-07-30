import request from '@/utils/axios'
import { apiName } from '@/config'

// 工单报表
export function workOrderAggs(data){
  return request({
    url: `/api/${apiName}/workOrderAggs/timeIntervalAgg`,
    method: 'POST',
    json: 'true',
    data,
  })
}


// 平台版本对比
export function clientCompare(data){
  return request({
    url: `/api/${apiName}/workOrderAggs/clientCompare`,
    method: 'POST',
    json: 'true',
    data,
  })
}