import request from '../utils/axios.js'

//登录
export function upload(data) {
    return request({
        url: '/users/api/upload/avatar',
        method: 'post',
        data: data
    });
}