import request from '@/utils/request.js'

export function searchBlog(matchStr) {
    return request({
        url: '/',
        method: 'get',
        params: pageParam
    })
}