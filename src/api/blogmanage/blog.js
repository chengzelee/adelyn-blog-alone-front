import request from '@/utils/request.js'

export function getPage(pageParam) {
    return request({
        url: '/blogmanager/artical/userPage',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: pageParam
    })
}

export function publish(blogParam) {
    return request({
        url: '/blogmanager/artical',
        method: 'post',
        data: blogParam
    })
}
