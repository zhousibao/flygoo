import request from '@/utils/axios'
import { apiName } from '@/config'

// 工单统计
export function workOrderRate(params){
  return request({
    url: `/api/${apiName}/workOrderStatistics/workOrderRate`,
    method: 'GET',
    json: 'true',
    params,
  })
}

// 实时工单率
export function workOrderRateHistogramChart(params){
  return request({
    url: `/api/${apiName}/workOrderStatistics/workOrderRateHistogramChart`,
    method: 'GET',
    json: 'true',
    params,
  })
}

// 实时直播间工单分布
export function workOrderLevelPieChart(params){
  return request({
    url: `/api/${apiName}/workOrderStatistics/workOrderLevelPieChart`,
    method: 'GET',
    json: 'true',
    params,
  })
}


// 直播间
export function liveRoomStatistics(params){
  return request({
    url: `/api/${apiName}/workOrderStatistics/liveRoomStatistics`,
    method: 'GET',
    json: 'true',
    params,
  })
}

// 课堂
export function lessonRoomStatistics(params){
  return request({
    url: `/api/${apiName}/workOrderStatistics/lessonRoomStatistics`,
    method: 'GET',
    json: 'true',
    params,
  })
}

// 学生个人工单详情
export function studentWorkOrder(params){
  return request({
    url: `/api/${apiName}/workOrderStatistics/listMonitorDataByUserId`,
    method: 'GET',
    json: 'true',
    params,
  })
}