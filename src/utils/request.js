import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getToken } from './auth.js'
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
    config.headers['Authorization'] = getToken()
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

    // if the custom code is not 000
      // , it is judged as an error.
    if (res.success) {
        // ElMessage.success("操作成功")
        return res.data
    } else if (res.code === '8004-1') {
        router.push({ path: '/login' })
    } else {
        ElMessageBox.alert(res.msg, '操作失败', {
            confirmButtonText: '确认'
        })
    }
    return Promise.reject(res)
  },
  error => {
    console.log('err' + error) // for debug
/*      ElMessageBox.alert(error.msg, '请求失败', {
          confirmButtonText: '确认'
      })*/
      ElMessage.error("请求失败")
    return Promise.reject(error)
  }
)

export default service
