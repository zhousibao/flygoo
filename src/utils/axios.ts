import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Toast } from 'antd-mobile'
import { NODE_ENV } from '@/config'

type IMethod = "POST" | "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "put" | "PUT" | "patch" | "PATCH" | "link" | "LINK" | "unlink" | "UNLINK" | undefined

interface IRequest {
  url:string;
  method?:IMethod;
  json?:boolean;
  params?:IAnyObj;
  data?:IAnyObj;
  timeout?:number;
}

interface IData {
  code?:string;
  data?:any;
  message?:string;
}

// 配置baseURl,不配置则相对于根目录
// baseURL: ' http://mock.studyinghome.com/mock/5f213d64e525ff20854f7d96/flygoo-api',
let baseURL = ''
if(NODE_ENV !== 'development'){
  baseURL = 'http://mock.studyinghome.com/mock/5f213d64e525ff20854f7d96/flygoo-api'
}

/* 创建axios实例 */
const service = axios.create({
  baseURL: baseURL, //** 基础地址 要请求的url前缀  
  timeout: 10000, // 请求超时时间
});


// axios 拦截请求
service.interceptors.request.use((config:AxiosRequestConfig) => {
  NProgress.start()
  return config
}, () => {
  return Promise.reject({ message: 'request error' });
})

// axios 拦截响应
service.interceptors.response.use((response:AxiosResponse) => {
  NProgress.done()
  return response
}, (error:AxiosError) => {
  NProgress.done()
  if (error.response) {
    return Promise.reject({ message: error.response.statusText });
  }
  return Promise.reject({ message: '网络不给力, 请稍候重试' });
})


// http request
export default (config:IRequest):Promise<IData> => {
  const { url, method = 'POST', json = true, params = {}, data= {}} = config
  return new Promise((resolve, reject) => {
    service({
      url,
      method,
      params,
      data,
      headers: {
        'content-type': json ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }).then(res => {
      /**
         * response格式
         * {
            data:{},
            status:200,
            statusText:'OK',//从服务器返回的http状态文本
            headers: {},//响应头信息
            config: {} //`config`是在请求的时候的一些配置信息
          }
        */
       
      if (res.status === 200) {
        if(res.data.code === '403'){
          // 在此进行业务需求改造 例如 重定向至登录
          Toast.fail(res.data.message)
          return reject(res.data)
        }

        if(res.data.code === '1'){
          Toast.fail(res.data.message)
          return reject(res.data)
        }

        // resolve
        return resolve(res.data)
      }

      Toast.fail(res.statusText)
      return reject(res.data)

    }).catch(error => {
      Toast.fail(error.message)
      return reject(error)
    })
  })
}
