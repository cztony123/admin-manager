import request from '../utils/axios.js'

//财务管理-会员订单-充值类型
export function getOrderList(query) {
    return request({
        url: '/api/depositOrder/list',
        method: 'get',
        params: query
    });
}

//财务管理-会员订单-列表数据
export function getOrderData(query) {
    return request({
        url: '/api/depositOrder/data',
        method: 'get',
        params: query
    });
}


