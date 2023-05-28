import request from '@/utils/request.js'

export function getPicUploadUrl() {
    return request({
        url: '/oss/pic/uploadUrl',
        method: 'get'
    })
}

export function uploadPic(picParam) {
    return request({
        url: '/oss/pic',
        method: 'post',
        data: picParam
    })
}

export function downloadPic(picId) {
    return request({
        url: '/oss/pic/' + picId,
        method: 'get'
    })
}