import axios from 'axios'
import { ElMessage } from 'element-plus'
import * as authUtil from '@/utils/auth.js'
import router from '@/router'
import JSONBIG from 'json-bigint'

// create an axios instance
const service = axios.create({
  baseURL: '/blog', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
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

    if (res.success) {
        return Promise.resolve(res.data)
    } else if (res.code === '8004-0') {
        router.push({ path: '/login' })
    } else {
        ElMessage.error(res.msg)
    }
    return Promise.reject(res)
  }
)

export default service
