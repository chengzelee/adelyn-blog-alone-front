import request from '@/utils/request.js'

export function generateTransCode() {
    return request({
        url: '/transFile/transCode',
        method: 'get'
    })
}

export function uploadFile(formData, onUploadProgress) {
    return request({
        url: '/transFile/public/upload',
        method: 'post',
        data: formData,
        // 监听上传进度
        onUploadProgress: onUploadProgress,
        timeout: 0  // 这里覆盖默认的timeout，不设置超时时间
    })
}

export function getTransFileList(param) {
    return request({
        url: '/transFile/public/list',
        method: 'get',
        params: param
    })
}

export function deleteFile(param) {
    return request({
        url: '/transFile/public/delete',
        method: 'post',
        params: param
    })
}