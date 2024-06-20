import request from '@/utils/request.js'

export function getPage(pageParam) {
    return request({
        url: '/tag/page',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: pageParam
    })
}

export function deleteTag(tagData) {
    return request({
        url: '/tag',
        method: 'delete',
        data: tagData
    })
}

export function saveTag(tagData) {
    return request({
        url: '/tag',
        method: 'post',
        data: tagData
    })
}

export function updateTag(tagData) {
    return request({
        url: '/tag',
        method: 'put',
        data: tagData
    })
}