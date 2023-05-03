import request from '@/utils/request'

export function getPage(pageParam) {
    return request({
        url: '/blogmanager/artical/page',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: pageParam
    })
}

export function getBlogContent(blogParam) {
    return request({
        url: '/search/blogContent',
        method: 'get',
        params: blogParam
    })
}
