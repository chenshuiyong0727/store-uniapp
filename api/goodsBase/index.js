import { request } from '@/utils/request.js'

export const goodsBaseApi = {
  // 获取数据列表
  page: (body) => request({
    url: '/gw/op/v1/goodsBase',
    loading: false,
    method: 'get',
    data: body
  }),
  // 获取数据列表
  syncOldPriceToNew: () => request({
    url: '/gw/op/v2/goodsBase/syncOldPriceToNew',
    loading: false,
    method: 'get'
  }),
  // 批量删除
  batchdelete: (body) => request({
    url: '/gw/op/v1/goodsBase/batch/remove',
    method: 'put',
    data: body
  }),

  // 删除(某项)
  delById: (id) => request({
    url: '/gw/op/v1/goodsBase/' + id,
    method: 'delete'
  }),
  // 更新状态
  changeStatus: (body) => request({
    url: '/gw/op/v1/goodsBase/status',
    method: 'put',
    data: body
  }),

  // 获取详情
  getDetailById: (id) => request({
    url: '/gw/op/v1/goodsBase/h5/' + id,
    method: 'get'
  }),

  // 获取详情
  getImgUrl: (actNo) => request({
    url: '/gw/op/v1/file/getImgUrl/' + actNo,
    method: 'get'
  }),
  // getImgUrl: (body) => request({
  //   url: '/gw/op/v1/file/getImgUrl',
  //   method: 'get',
  //   params: body
  // }),
  // 新增
  add: (body) => request({
    url: '/gw/op/v1/goodsBase',
    method: 'post',
    data: body
  }),
  addOrUpdateSize: (body) => request({
    url: '/gw/op/v1/goodsBase/addOrUpdateSize',
    method: 'post',
    data: body
  }),
  // 更新
  update: (body) => request({
    url: '/gw/op/v1/goodsBase',
    method: 'put',
    data: body
  }),
  // 尺寸（下拉）列表
  listDropDownSizes: (body) => request({
    url: '/gw/op/v1/goodsBase/listDropDownSizes',
    method: 'post',
    data: body
  }),
  getGoodsByActNoAndSize: (body) => request({
    url: '/gw/op/v1/goodsBase/getGoodsByActNoAndSize',
    method: 'get',
    loading: false,
    data: body

  }),
  getGoodsByActNoAndSizeH5: (body) => request({
    url: '/gw/op/v2/goodsBase/getGoodsByActNoAndSizeH5',
    method: 'get',
    data: body

  }),
  getGoodsByActNoAndSizeH5V3: (body) => request({
    url: '/gw/op/v2/goodsBase/v3/getGoodsByActNoAndSizeH5',
    method: 'get',
    data: body

  }),
  getGoodsByActNoAndSizeH5V4: (body) => request({
    url: '/gw/op/v1/dwGoods/getGoodsByActNo',
    method: 'get',
    data: body

  })

}
