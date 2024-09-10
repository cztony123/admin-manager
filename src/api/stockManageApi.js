import request from '../utils/axios.js'

//库存管理-库存查询-列表数据
export function getStockData(query) {
    return request({
        url: '/api/stock/data',
        method: 'get',
        params: query
    });
}


//库存管理-库存查询-新增
export function getStockAdd(data) {
    return request({
        url: '/api/stock/add',
        method: 'post',
        data: data
    });
}

//库存管理-库存查询-编辑
export function getStockEdit(data) {
    return request({
        url: '/api/stock/edit',
        method: 'post',
        data: data
    });
}


//库存管理-库存查询-编辑
export function getStockDel(data) {
    return request({
        url: '/api/stock/del',
        method: 'post',
        data: data
    });
}