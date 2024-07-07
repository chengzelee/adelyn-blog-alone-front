import axios from 'axios'
import { ElMessage } from 'element-plus'
import * as authUtil from '@/utils/auth.js'
import router from '@/router'
import JSONBIG from 'json-bigint'

// create an axios instance
const service = axios.create({
  baseURL: '/blog-backend', // url = base url + request url
  withCredentials: false, // 发跨域请求时不带cookie
  timeout: 10000 // request timeout
})

// 解决vue处理16位以上数字丢失精度问题
service.defaults.transformResponse = [
    function (data) {
        const json = JSONBIG({
            storeAsString: true
        })
        const res = json.parse(data)
        return res
    }
]

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // let each request carry token
    // ['Authorization'] is a custom headers key
    config.headers['Authorization'] = authUtil.getAccessToken()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code === '200') {
        return Promise.resolve(res.data)
    } else if (res.code === '401') {
        // 防止死循环
        authUtil.removeAllToken()
        window.location.href = res.data
    } else {
        ElMessage.error(res.msg)
    }
    return Promise.reject(res)
  }
)

export default service
