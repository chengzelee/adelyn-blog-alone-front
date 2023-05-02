import request from '@/utils/request.js'

export function login(userInfo) {
    return request({
        url: '/auth/login',
        method: 'post',
        data: userInfo
    })
}
