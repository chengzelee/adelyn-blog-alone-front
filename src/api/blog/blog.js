import request from '@/utils/request'

export function getPage(pageParam) {
    return request({
        url: '/article/public/page',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: pageParam
    })
}

export function getBlogContent(blogParam) {
    return request({
        url: '/search/public/blogContent',
        method: 'get',
        params: blogParam
    })
}

export function getUserBlogContent(blogParam) {
    return request({
        url: '/search/blogContent/user',
        method: 'get',
        params: blogParam
    })
}
