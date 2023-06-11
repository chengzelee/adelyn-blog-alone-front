import request from '@/utils/request.js'

export function getPage(pageData) {
    return request({
        url: '/blogmanager/artical/userPage',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: pageData
    })
}

export function getInfo(blogParam) {
    return request({
        url: '/blogmanager/artical',
        method: 'get',
        params: blogParam
    })
}

export function publish(blogData) {
    return request({
        url: '/blogmanager/artical',
        method: 'post',
        data: blogData
    })
}

export function update(blogData) {
    return request({
        url: '/blogmanager/artical',
        method: 'put',
        data: blogData
    })
}

export function deleteBlog(blogParam) {
    return request({
        url: '/blogmanager/artical',
        method: "delete",
        params: blogParam
    })
}