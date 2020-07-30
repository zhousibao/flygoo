import axios from 'axios'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Toast } from 'antd-mobile'

// axios 拦截请求
axios.interceptors.request.use(function(config) {
  NProgress.start()
  return config
}, function(err) {
  return Promise.reject(err);
})

// axios 拦截响应
axios.interceptors.response.use(function(response) {
  NProgress.done()
  return response
}, function(error) {
  NProgress.done()
  const { response } = error
  if (response) {
    return Promise.reject({ message: response.statusText });
  }

  return Promise.reject({ message: '网络不给力, 请稍候重试' });
})


// http request
export default function request({ url, method = 'POST', json = true, params = '', data= '' }){
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      json,
      params,
      data,
      timeout: 10000, // 请求超时时间
      headers: {
        'content-type': json ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }).then(res => {
      /**
         * response格式
         *
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

      Toast.fail(res.message)
      return reject(res.data)
    }).catch(err => {
      Toast.fail(err.message)
      return reject(err)
    })
  })
}
