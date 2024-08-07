import request from '../utils/axios.js'

//登录
export function loginApi(data) {
    return request({
        url: '/users/api/login',
        method: 'post',
        data: data
    });
}