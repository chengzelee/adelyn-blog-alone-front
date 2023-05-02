import request from '@/utils/request'

export function getPage(pageParam) {
    return request({
        url: '/blogmanager/artical/page',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: pageParam
    })
}
