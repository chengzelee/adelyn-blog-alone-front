import request from '@/utils/request.js'

export function getPage(pageData) {
    return request({
        url: '/article/user/page',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: pageData
    })
}

export function getInfo(blogParam) {
    return request({
        url: '/article',
        method: 'get',
        params: blogParam
    })
}

export function publish(blogData) {
    return request({
        url: '/article',
        method: 'post',
        data: blogData
    })
}

export function update(blogData) {
    return request({
        url: '/article',
        method: 'put',
        data: blogData
    })
}

export function deleteBlog(blogParam) {
    return request({
        url: '/article',
        method: "delete",
        params: blogParam
    })
}