import request from '@/utils/request.js'

export function getPage(pageParam) {
    return request({
        url: '/blogmanager/tag/page',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: pageParam
    })
}

export function deleteTag(tagParam) {
    return request({
        url: '/blogmanager/tag',
        method: 'delete',
        params: tagParam
    })
}

export function saveTag(tagData) {
    console.log(tagData)
    return request({
        url: 'blogmanager/tag',
        method: 'post',
        data: tagData
    })
}

export function updateTag(tagData) {
    console.log(tagData)
    return request({
        url: 'blogmanager/tag',
        method: 'put',
        data: tagData
    })
}