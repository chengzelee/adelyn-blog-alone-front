import request from '@/utils/request.js'

export function searchBlog(pageParam) {
    return request({
        url: '/search/public/match',
        method: 'post',
        data: pageParam
    })
}

export function searchUserBlog(pageParam) {
    return request({
        url: '/search/match/user',
        method: 'post',
        data: pageParam
    })
}