import request from '@/utils/request.js'

export function uploadPic(picParam) {
    return request({
        url: '/pic',
        method: 'post',
        data: picParam
    })
}