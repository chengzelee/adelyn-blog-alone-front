import request from '@/utils/request.js'

export function getPage(pageParam) {
    return request({
        url: '/',
        method: 'get',
        params: pageParam
    })
}

export function publish(blogParam) {
    return request({
        url: '/blogmanager/artical',
        method: 'post',
        params: blogParam
    })
}

export function searchBlog(matchStr) {
    return request({
        url: '/',
        method: 'get',
        params: pageParam
    })
}

export function login(userInfo) {
    return request({
        url: '/auth/login',
        method: 'post',
        data: userInfo
    })
}
