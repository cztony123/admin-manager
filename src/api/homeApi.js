import request from '../utils/axios.js'

//首页
export function getHomeData(query) {
    return request({
        url: '/api/home',
        method: 'get',
        params: query
    });
}