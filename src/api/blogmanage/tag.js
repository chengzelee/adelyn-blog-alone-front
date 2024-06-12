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

export function deleteTag(tagParam) {
    return request({
        url: '/tag',
        method: 'delete',
        params: tagParam
    })
}

export function saveTag(tagData) {
    console.log(tagData)
    return request({
        url: '/tag',
        method: 'post',
        data: tagData
    })
}

export function updateTag(tagData) {
    console.log(tagData)
    return request({
        url: '/tag',
        method: 'put',
        data: tagData
    })
}