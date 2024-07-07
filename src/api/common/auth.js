import request from '@/utils/request.js'

export function getTokenByAuthCode(param) {
    return request({
        url: '/auth/token/getToken/public',
        method: 'get',
        params: param
    })
}

export function passwordLogin(userInfo) {
    return request({
        url: '/auth/login/password/public',
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