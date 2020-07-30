import request from '@/utils/axios'

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
    json: true,
    params: {
      appCode,
    },
  })
}

