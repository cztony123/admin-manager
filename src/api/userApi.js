import request from '../utils/axios.js'

//头像上传
export function upload(data) {
    return request({
        url: '/users/api/upload/avatar',
        method: 'post',
        data: data
    });
}

//修改基本资料
export function userEdit(data) {
    return request({
        url: '/users/api/user/edit',
        method: 'post',
        data: data
    });
}


//修改基本资料
export function pwdEdit(data) {
    return request({
        url: '/users/api/password/edit',
        method: 'post',
        data: data
    });
}