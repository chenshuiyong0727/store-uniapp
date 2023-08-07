import { request } from '@/utils/request.js'

export function pageWait(body) {
  return request({
    url: '/gw/op/v1/goodsOrder',
    method: 'get',
    data: body
  });
}
export const goodsOrderApi = {
  // 获取数据列表
  page: (body) => request({
    url: '/gw/op/v1/goodsOrder',
    method: 'get',
    data: body,
    loading: false
  }),
  waybillNoList: (body) => request({
    url: '/gw/op/v1/goodsOrder/waybillNoList',
    method: 'get',
    loading: false,
    data: body
  }),
  // 批量删除
  batchdelete: (body) => request({
    url: '/gw/op/v1/goodsOrder/batch/remove',
    method: 'put',
    data: body
  }),

  // 删除(某项)
  delById: (id) => request({
    url: '/gw/op/v1/goodsOrder/' + id,
    method: 'delete'
  }),
  // 更新状态
  changeStatus: (body) => request({
    url: '/gw/op/v1/goodsOrder/status',
    method: 'put',
    data: body
  }),
  // 更新
  updateSaleType: (body) => request({
    url: '/gw/op/v1/goodsOrder/updateSaleType',
    method: 'put',
    data: body
  }),
  // 获取详情
  getDetailById: (id) => request({
    url: '/gw/op/v1/goodsOrder/' + id,
    loading: false,
    method: 'get'
  }),
  // 新增
  add: (body) => request({
    url: '/gw/op/v1/goodsOrder',
    method: 'post',
    data: body
  }),
  // 出售
  sellGoods: (body) => request({
    url: '/gw/op/v1/goodsOrder/sellGoods',
    method: 'post',
    data: body
  }),
  // 更新
  update: (body) => request({
    url: '/gw/op/v1/goodsOrder',
    method: 'put',
    data: body
  }),
  indexData: () => request({
    url: '/gw/op/v1/goodsOrder/indexData',
    loading: false,
    method: 'get'
  }),
  orderData: () => request({
    url: '/gw/op/v1/goodsOrder/orderData',
    loading: false,
    method: 'get'
  }),
  indexOrderData: (body) => request({
    url: 'gw/op/v1/goodsOrder/indexOrderData',
    loading: false,
    method: 'get',
    data: body
  }),
  todaySync: (body) => request({
    url: 'gw/op/v1/goodsOrder/todaySync',
    loading: false,
    method: 'get',
    data: body
  })
}
