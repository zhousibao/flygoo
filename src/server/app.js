import request from '@/utils/axios'
import { apiName } from '@/config'

/**
 * 全局api
 */

/** *
 * ajax({url,method,content,params,data})
 *
 * @param {string}  url，(必填)
 * @param {string}  method,默认post
 * @param {boolean} json, content-type类型
 * @param {object}  params
 * @param {object}  data
 *
 */


// 权限 获取用户角色菜单
export function permissionInfo(appCode){
  return request({
    url: '/api/auth/sys/initInfo',
    method: 'GET',
    json: 'true',
    params: {
      appCode,
    },
  })
}

// 平台版本字典
export function platformVersion(){
  return request({
    url: `/api/${apiName}/common/versions`,
    method: 'GET',
    json: 'true',
  })
}

// 课程类型字典
export function courseTypes(){
  return request({
    url: `/api/${apiName}/workOrder/getLessonTypes`,
    method: 'GET',
    json: 'true',
  })
}

// 工单类型字典
export function workOrderTypes(){
  return request({
    url: `/api/${apiName}/workOrder/getWorkOrderTypes`,
    method: 'GET',
    json: 'true',
  })
}