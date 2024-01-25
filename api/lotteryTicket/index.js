import { request } from '@/utils/request.js'
export const lotteryTicketApi = {
  // 获取数据列表
  // 获取数据列表
  page: (body) => request({
    url: '/gw/op/v1/lotteryTicket',
    method: 'get',
    loading: false,
    data: body
  }),
  data: () => request({
    url: '/gw/op/v1/lotteryTicket/getData',
    loading: false,
    method: 'get'
  }),
  // 批量删除
  batchdelete: (body) => request({
    url: '/gw/op/v1/lotteryTicket/batch/remove',
    method: 'put',
    data: body
  }),

  // 删除(某项)
  delById: (id) => request({
    url: '/gw/op/v1/lotteryTicket/' + id,
    method: 'delete'
  }),
  // 更新状态
  changeStatus: (body) => request({
    url: '/gw/op/v1/lotteryTicket/status',
    method: 'put',
    data: body
  }),

  // 获取详情
  getDetailById: (id) => request({
    url: '/gw/op/v1/lotteryTicket/' + id,
    method: 'get'
  }),
  // 新增
  add: (body) => request({
    url: '/gw/op/v1/lotteryTicket',
    method: 'post',
    data: body
  }),
  // 更新
  update: (body) => request({
    url: '/gw/op/v1/lotteryTicket',
    method: 'put',
    data: body
  })

}
