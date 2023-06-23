import request from '@/utils/request.js'

export function login(userInfo) {
    return request({
        url: '/auth/login',
        method: 'post',
        data: userInfo
    })
}

export function refreshAccessToken(refreshToken) {
    return request({
        url: '/auth/token/refresh',
        method: 'post',
        data: refreshToken
    })
}