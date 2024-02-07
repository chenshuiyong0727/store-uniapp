<template>
  <view>
    <u-navbar title="瑕疵商品" bgColor="#f3faff">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
    </u-navbar>
    <view class="fenlei_top_tab" style="display: flex;">
      <view style="width: 83vw" class="baisebeijing">
        <u--input
            class="searchInputW"
            prefixIcon="search"
            placeholder="请输入货号/商品名"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            v-model="queryParam.keyword"
            prefixIconStyle="font-size: 24px;color:#c0c4cc"
            :show-action="false"
            @change="search1"
            clearable
        >
        </u--input>
      </view>
      <view class="fenlei_top_right" @click="isShowDialog2 = true">
        <image
            v-if="
            queryParam.status
            || queryParam.orderNo
            || queryParam.size
            || queryParam.createTimeFrom
            || queryParam.createTimeTo
            || queryParam.reason
            "
            src="../../static/img/search.png"></image>
        <image v-else  src="../../static/img/search_no.png"></image>
      </view>
    </view>
    <u-picker :show="show_sx_type" :columns="columns" @cancel="show_sx_type= false"
              @confirm="confirm_sx_type" keyName="fieldName"></u-picker>

    <view>
<!--      <u-popup :show="isShowDialog" @close="isShowDialog=!isShowDialog" :duration="100" mode="bottom">-->
<!--        <view style="width: 90vw;margin-left: 5vw;">-->
      <u-popup :show="isShowDialog" @close="isShowDialog = false"  :duration="0" :closeable="true" mode="center">
        <view style="width: 80vw;margin-left: 5vw;margin-right: 5vw;">
          <u-navbar title="修改" :fixed="false" :border="true">
            <view class="u-nav-slot" slot="left">
            </view>
          </u-navbar>
          <view>
            <u--form >
              <u-form-item label-width="25vw" label="货号" borderBottom>
                <u--input style="margin-right: 15px;"  :disabled="true" disabledColor="#fff" inputAlign="right"
                           v-model="orderData.actNo" border="none" color="#A1A1A1"></u--input>
              </u-form-item>
              <u-form-item label-width="25vw" label="尺码" borderBottom>
                <u--input style="margin-right: 15px;" :disabled="true" disabledColor="#fff" inputAlign="right"
                           v-model="orderData.size" border="none" color="#A1A1A1"></u--input>
              </u-form-item>
              <u-form-item label-width="30vw" label="创建时间" @click="createTimeShow" borderBottom>
                <u--input inputAlign="right" disabledColor="#fff" placeholder="请选择"
                          placeholderStyle="font-size: 14px;color:#808080"
                          v-model="requestParam.createTime" border="none" disabled></u--input>
                <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label="状态" borderBottom @click="show_sx_type = true; isShowDialog=!isShowDialog ;$hideKeyboard()">
                <u--input inputAlign="right" placeholder="请选择状态" disabledColor="#fff"
                          placeholderStyle="font-size: 14px;color:#c0c4cc"
                          v-model="requestParam.statusStr" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label-width="30vw" label="瑕疵原因">
                <u--textarea
                    v-model="requestParam.reason"
                    count
                ></u--textarea>
              </u-form-item>
            </u--form>
            <view class="shuipingjuzhong">
              <u-button style="width: 50vw; margin: 10px 15px;"  size="small"   type="primary" @click="confirmHandle">
                <text class="dibuanniuwenzi">确认</text>
              </u-button>
            </view>
          </view>
        </view>
      </u-popup>
    </view>

    <view  @touchmove.stop.prevent="preventHandler">
      <u-popup :show="isShowDialog2" @close="isShowDialog2 = !isShowDialog2"  :duration="100" mode="right">
        <view  style="height: 90vh;">
          <scroll-view  scroll-y="true"  class="saixuanquyu">

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  订单号
                </text>
              </view>
              <view class="julishang10">
                <u--input
                    class="saixuanInput"
                    placeholder="请输入订单号"
                    placeholderStyle="font-size: 14px;color:#c0c4cc"
                    v-model="queryParam.orderNo"
                    @change="search1"
                    clearable
                >
                </u--input>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  瑕疵原因
                </text>
              </view>
              <view class="julishang10">
                <u--input
                    class="saixuanInput"
                    placeholder="请输入瑕疵原因"
                    placeholderStyle="font-size: 14px;color:#c0c4cc"
                    v-model="queryParam.reason"
                    @change="search1"
                    clearable
                >
                </u--input>
              </view>
            </view>
            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                 时间
                </text>
              </view>
              <view class="julishang10 xianglian saixuanshijian">
                <view  @click="showFrom= true;showTo= false">
                  <u--input
                      readonly="readonly"
                      class="searchInputFilter"
                      placeholder="开始时间"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.createTimeFrom"
                      clearable
                  ></u--input>
                </view>
                <view>
                  <image  class="hengtupian" src="../../static/img/heng.png"></image>
                </view>
                <view  @click="showTo= true;showFrom= false">
                  <u--input
                      readonly="readonly"
                      class="searchInputFilter"
                      placeholder="结束时间"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.createTimeTo"
                      clearable
                  ></u--input>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  状态
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in statusList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.status = item.fieldValue;search1();">
                    <text :class="queryParam.status == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>
          </scroll-view >
          <view class="baisebeijing shuipingjuzhong" style="position:fixed;bottom:0;width: 80vw;">
            <u-button style="width: 20vw; margin: 5px" @click=" isShowDialog2 = false;resetHandle()">
              <text style=" font-size: 15px;">重置</text>
            </u-button>
            <u-button style="width: 50vw; margin: 5px" type="primary" @click="search2">
              <text style=" font-size: 15px;">
                确定（{{totalCount}} 个订单）
              </text>
            </u-button>
          </view>
        </view>
      </u-popup>
    </view>


    <u-datetime-picker
        title="开始时间"
        :show="showFrom"
        v-model="dateCurrent"
        mode="date"
        :minDate="1646064000000"
        @confirm="confirmFrom"
        @cancel="cancelFrom"
    ></u-datetime-picker>
    <u-datetime-picker
        title="结束时间"
        :show="showTo"
        v-model="dateCurrent"
        mode="date"
        :minDate="1646064000000"
        @confirm="confirmTo"
        @cancel="cancelTo"
    ></u-datetime-picker>
    <view
        style="height: 100vh"
        @touchstart.stop="onTouchStart" @touchend.stop="handleTouchend" >
      <view class="julibiaoti2" >
        <view class="dingdans_item_dw"
              v-for="(item,index) in tableData"
              :key="index"
        >
          <!--        头部-->
          <view class="dingdans_top_dw"  @click="goDetail(item.orderId) "
                :style="item.status == 3 && item.deliveryDeadlineTime ? 'border-bottom: 0;' : ''">
            <view class="dingdans_top_left_dw">
              <text>订单号：</text>
              <text>{{item.orderNo }}</text>
            </view>
            <view class="dingdans_top_right_dw">
              <text>{{ item.status |
                dictToDescTypeValue(45) }}
              </text>
            </view>
          </view>
          <view @click="goDetail(item.orderId) "
                style="background-color: #fbfbfd;font-size: 13px;">
            <text class="chaochu color-danger"  style="margin-left: 5px;padding: 6px;width: 95vw">
              {{item.reason }}
            </text>
          </view>
          <!--        中间-->
          <view class="dingdans_con_dw"  @click="goDetail(item.orderId) ">
            <view  class="dingdans_con_left_dw"
                  >
              <image mode="widthFix"  @click.stop="avatarShow(item.img)" :src="item.img" v-if="item.img"></image>
              <image mode="widthFix" @click.stop="avatarShow(fileUrl+item.imgUrl)" :src="fileUrl+item.imgUrl" v-if="!item.img && item.imgUrl" ></image>
            </view>
            <view class="diangdans_con_right_dw">
              <view class="dingdans_con_right_top_dw" @click.stop="goodsDetail(item.goodsId)" >
                <text class="chaochu"  style="width: 65vw">
                  {{item.goodsName }}
                </text>
              </view>

              <view class="dingdans_con_right_top_dw_3">
                <text v-if="item.status == 3 && item.deliveryDeadlineTime" style="margin-left: 2px">
                  <text>发货截止时间</text>
                </text>
                <text  v-if="item.status == 3 && item.deliveryDeadlineTime" style="margin-left: 4px" class="dingdans_con_dw_time">
                  {{item.deliveryDeadlineTime | formateTime }}
                </text>
              </view>

              <view class="dingdans_con_right_top_dw_1 xianglian">
                <text @click.stop="jumpactNo(item.actNo)">
                  {{item.actNo}}
                </text>
                <image @click.stop="$copyUrl(item.actNo)" class="fuzhitupian"
                       src="../../static/img/copy.png"></image>
              </view>
              <view v-if="item.addressId" style="margin-bottom: 5px;
    margin-top: 10px;">
                <text class="dingdans_con_dw_address">
                  {{item.addressId | dictToDescTypeValue(38)}}
                </text>
              </view>
              <view class="dingdans_con_right_top_dw_2">
                <view>
                  <text>
                    尺码：{{item.size}}
                  </text>
                </view>
                <view>
                  <strong v-if="item.theirPrice && ![2,11].includes(item.status)"
                          style="color: #333333">
                    ¥
                  </strong>
                  <strong  v-if="item.theirPrice && ![2,11].includes(item.status)"
                           style="font-size: 17px ;margin-left: 2px;color: #333333">
                    {{item.theirPrice}}
                  </strong>
                  <text v-if="![2,11].includes(item.status)"
                        style="margin-left: 3px;text-decoration:line-through;">
                    {{item.shelvesPrice}}
                  </text>
                  <text v-else style="margin-left: 3px;color: #333333;font-size: 15px">
                    <text style="font-size: 13px">¥</text>
                    {{item.shelvesPrice}}
                  </text>
                </view>
              </view>
            </view>
          </view>
          <!--底部-->
          <view class="dingdans_bottom_dw">
            <view class="dingdans_top_left_dw">
              {{item.createTime | formateTime }}
            </view>
            <view class="dingdans_top_right_dw">
              <view class="dingdans_con_right_down_2_1 xianglian">
                <text class="dw-button-common" @click="handleClick(item)">修改</text>
                <text class="dw-button-common" style="margin-left: 2vw" @click="goDel(item.id)">删除</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-show="tableData.length" class="meiyougengduo">
        <u-loadmore fontSize="18"  color="#a6a6a6" nomoreText="最硬球鞋" :status="loadStatus"/>
      </view>
      <buuug7-simple-datetime-picker
          v-if="dateCurrent1"
          ref="myPicker"
          @submit="handleSubmit"
          :start-year="2022"
          :end-year="2099"
          :time-init="dateCurrent1"
          :time-hide="[true, true, true, true, true, true]"
          :time-label="['年', '月', '日', '时', '分', '秒']"
      />
      <u-empty
          v-if="!tableData.length && !isLoading"
          mode="list"
          marginTop="50"
          textSize="16"
          textColor="#8a8a8a"
          :icon="fileUrl +'/static/operateSteps/empity_7.png'">
      </u-empty>
    </view>
    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <view class="imageShowChil">
          <image :src="imageZoom" mode="widthFix"  class="showImg" @longpress="$saveImage(imageZoom)"></image>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import { goodsDefectsApi } from '@/api/goodsDefects'

  export default {
 data() {
      return {
        fileUrl: this.$fileUrl,
        backUrl: '',
        dateCurrent: parseInt(new Date().getTime()),
        dateCurrent1:'',
        showFrom: false,
        showTo: false,
        show_sx_type: false,
        emtityMsg: '',
        current: 0,
        pictureZoomShow: false,
        imageZoom: '',
        localdata: [
          {
            value: 'add',
            text: '新增'
          },
          {
            value: 'resetHandle',
            text: '重置'
          }
        ],
        optionsOp: [
          {
            value: 'update',
            text: '修改'
          },
          {
            value: 'gotoDw',
            text: '得物'
          },
          {
            value: 'gotoWl',
            text: '物流'
          },
          {
            value: 'goDel',
            text: '删除'
          }
        ],
        list2: [
          {
            status: '',
            theExpire: '',
            name: '全部'
          },
          {
            status: 3,
            theExpire: '',
            name: '待发货',
            badge: {
              value: 0
            }
          },
          {
            status: 4,
            theExpire: '',
            name: '已发货',
            badge: {
              value: 0
            }
          },
          {
            status: 5,
            theExpire: '',
            name: '运输中',
            badge: {
              value: 0
            }
          },
          {
            status: 6,
            theExpire: '',
            name: '已收货',
            badge: {
              value: 0
            }
          },
          {
            status: 11,
            theExpire: '',
            name: '已入库'
          },
          {
            status: '',
            theExpire: 1,
            name: '即将到期'
          },
          {
            status: 2,
            theExpire: '',
            name: '已上架'
          },
          {
            status: 7,
            theExpire: '',
            name: '交易成功'
          },
          {
            status: 8,
            theExpire: '',
            name: '瑕疵'
          }
        ],
        startX: 0, // 触摸开始时的x坐标
        startY: 0, // 触摸开始时的Y坐标
        startTimeTouch : 0, // 触摸开始时的Y坐标
        queryParam: {
          reason: '',
          createTimeFrom: '',
          createTimeTo: '',
          keyword: '',
          priceFrom: '',
          priceTo: '',
          orderNo: '',
          shelvesPriceFrom: '',
          shelvesPriceTo: '',
          status: '',
          pageSize: 20,
          pageNum: 1
        },
        requestParam1: {
          id: '',
          waybillNo: '',
          freight: '',
          addressId: ''
        },
        requestParam3: {
          ids: '',
          status: '',
          saleType: 2,
          addressId: '',
          deliveryDeadlineTime: '',
          inStoreFreeDay: '',
          inStoreTime: '',
          waybillNo: '',
          freight: ''
        },
        requestParamWl: {
          receiverAddress: '',
          addressId: '',
          waybillNo: '',
          freight: '',
        },
        requestParam: {
          id: '',
          reason: '',
          status: '',
          statusStr: '',
          createTime: ''
        },
        typeList: [],
        columns: [],
        isLoadMore: false,
        isLoading: false,
        loadStatus: 'loadmore',
        tableData: [],
        totalCount: 1,
        showSd: false,
        checkAll: false,
        orderIofo: {},
        emtityMsg: '',
        orderData: '',
        isShowDialog: false,
        orderData1: '',
        isShowDialog1: false,
        orderData2: '',
        isShowDialog2: false,
        isShowDialog3: false,
        orderDataWl: '',
        isShowDialogWl: false,
        pictureZoomShow: false,
        saleType: '',
        typeList: [],
        successTimeFrom: '',
        topStatus: "",
        bottomStatus: "",
        allLoaded: false,
        mockArr: [],
        addressList: [],
        statusList: [],
        dataStatusList: [],
        saleTypeList: [],
        sellTime: '',
        successTime: '',
        startDate: new Date(),
        createTime: '',
        updateTime: '',
        months: '',
        status: '',
        selectedId: [],
        ids: [],
        tableData: [],
        wlData: [],
        wlDataSize: '',
        scrollNum: '',
        pickerValue: new Date(),
        pickerValueType: '',
        totalCount: 1
      }
    },
    onLoad() {
      this.listSysDict()
      this.getPage()
    },
    onPullDownRefresh() {
      this.resetHandle()
      uni.stopPullDownRefresh()
    },
    onReachBottom() {
      if (this.isLoadMore) {  //此处判断，上锁，防止重复请求
        this.loadStatus = 'loading';
        this.queryParam.pageNum++;
        this.getPage()
      }
    },
    methods: {
      handleClick(row) {
        this.orderData = row
        this.requestParam.status = row.status
        this.requestParam.statusStr = row.status == 1 ? '瑕疵' : '已处理'
        this.requestParam.reason = row.reason
        if (row.createTime){
          this.requestParam.createTime = this.$parseTime(row.createTime)
          this.dateCurrent1 = parseInt(new Date(this.requestParam.createTime).getTime())
        }else{
          this.dateCurrent1 = parseInt(new Date().getTime())
        }
        this.requestParam.id = row.id
        this.isShowDialog = true
      },
      resetData() {
        this.queryParam = {
          id: '',
          size: '',
          keyword: '',
          orderNo: '',
          inventoryId: '',
          status: '',
          theExpire: '',
          shelvesPriceFrom: '',
          shelvesPriceTo: '',
          freightFrom: '',
          freightTo: '',
          poundageFrom: '',
          poundageTo: '',
          theirPriceFrom: '',
          goodType: '',
          theirPriceTo: '',
          addressId: '',
          waybillNo: '',
          createTimeFrom: '',
          createTimeTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          sellTimeFrom: '',
          sellTimeTo: '',
          successTimeFrom: '',
          successTimeTo: '',
          pageSize: 10,
          pageNum: 1
        }
        this.allLoaded = false;
        this.isShowDialog2 = false
      },
      initBatch() {
        this.showSd = false
        this.checkAll = false
        this.ids = []
        this.tableData.forEach((obj) => (obj.checked = false));
      },
      goBack() {
        if (this.backUrl) {
          this.$navigateTo(this.backUrl)
        }else{
          this.$goBack
        }
      },
      menuAction(action, rowId) {
        // 忽略初始化时的传入的空操作
        if (action === '') {
          return
        }
        if ('add' == action) {
          this.goDetail(null, 3)
        }
        if ('resetHandle' == action) {
          this.resetHandle()
        }
      },
      menuActionList(action, item) {
        if (action === '') {
          return
        }
        if ('goodsDetail' == action) {
          this.goodsDetail(item.goodsId)
        }
        if ('update' == action) {
          this.update(item )
        }
        if ('gotoDw' == action) {
          this.gotoDw(item.spuId )
        }
        if ('gotoWl' == action) {
          this.gotoWl(item)
        }
        if ('goDel' == action) {
          this.goDel(item.id)
        }
      },

      cancelFrom() {
        this.showFrom = false
        this.queryParam.successTimeFrom = ''
        this.search1()
      },
      confirmHandle() {
        if(!this.requestParam.status) {
          this.$toast('请选择状态')
          return
        }
        if(!this.requestParam.createTime) {
          this.$toast('请输入创建时间')
          return
        }
        if(!this.requestParam.reason) {
          this.$toast('请输入瑕疵原因')
          return
        }
        this.requestParam.createTime = this.requestParam.createTime ? this.$parseTime(this.requestParam.createTime) : ''
        goodsDefectsApi.update(this.requestParam).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.search1()
            this.isShowDialog = false
          }
        })
      },
      cancelTo() {
        this.showTo = false
        this.queryParam.successTimeTo = ''
        this.search1()
      },
      confirmFrom(e) {
        this.showFrom = false;
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.queryParam.createTimeFrom = timeValue
        this.search1()
      },
      confirmTo(e) {
        this.showTo = false;
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.queryParam.createTimeTo = timeValue
        this.search1()
      },
      confirm_sx_type(e) {
        this.show_sx_type = false
        this.isShowDialog = !this.isShowDialog
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.requestParam.status = +fieldValue
        this.requestParam.statusStr = fieldName
      },
      goDetail(id) {
        let url = '/pages/order/detail?id=' + id
        this.$navigateTo(url)
      },
      toSell(id) {
        this.$navigateTo('/pages/order/toSell?id=' +id)
      },
      toDelivery(id) {
        this.$navigateTo('/pages/order/toDelivery?id=' +id)
      },
      update(row,titleName) {
        let url = '/pages/order/update?id=' + row.id
        if (titleName){
          url = url + '&titleName=' +titleName
        }
        this.$navigateTo(url)
      },
      changeStatusComfirm(id,status,msg) {
        var _this = this;
        uni.showModal({
          title: '',
          confirmColor: '#409eff',
          content: msg,
          success: function (res) {
            if (res.confirm) {
              _this.changeStatus(_this,id,status)
            } else if (res.cancel) {
            }
          }
        });
      },
      changeStatus(_this,id,status) {
        let data={}
        data.status = status
        data.id = id
        goodsOrderApi.update(data).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            _this.search1()
          }
        })
      },
      goodsDetail(id) {
        if (!id) {
          return
        }
        let url = '/pages/goodsBase/detail?id=' + id
        this.$navigateTo(url)
      },
      gotoDw(spuId) {
        if (!spuId){
          return
        }
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId="+ spuId;
        // #ifdef APP-PLUS
        plus.runtime.openURL(url) //这里默认使用外部浏览器打开而不是内部web-view组件打开
        // #endif
        // #ifdef H5
        window.open(url)
        // #endif
      },
      jumpactNo(actNo) {
        let url = '/pages/store/index?backUrl=/pages/order/index&actNo=' + actNo
        this.$navigateTo(url)
      },

      getPage() {
        this.isLoading = true
        this.emtityMsg = ''
        this.$request({
          url: '/gw/op/v1/goodsDefects',
          method: 'get',
          data: this.queryParam
        }).then(res => {
          this.isLoading = false
          if (res.subCode === 1000) {
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.tableData=[]
              this.emtityMsg = '暂无相关商品'
              this.loadStatus = 'nomore';
              this.isLoadMore = false
            } else {
              res.data.list.forEach(e => {
                this.tableData.push(e)
              })
              if (this.totalCount <= this.tableData.length) {
                this.loadStatus = 'nomore';
                this.isLoadMore = false
              } else {
                this.loadStatus = 'nomore';
                this.isLoadMore = true
              }
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.statusList = sysDictList.filter(item => item.typeValue == 45)
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
        this.saleTypeList = sysDictList.filter(item => item.typeValue == 46)
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)
        this.columns.push(this.statusList)
      },
      onTouchStart(e) {
        this.startTimeTouch = Date.now();
        this.startX = e.changedTouches[0].clientX;
        this.startY = e.changedTouches[0].clientY;
      },
      handleTouchend(e) {
        const endTime = Date.now();
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const differ = Math.abs(endY - this.startY);
        const dirvalX = endX - this.startX;
        // 纵轴偏移量不得超过 30，否则默认页面进行滚动操作
        if (differ <= 30) {
          // 按下时长不得超过 2秒，X轴滑动距离必须大于 40
          if (endTime - this.startTimeTouch > 2000 || Math.abs(dirvalX) <= 40) {
            return
          };
          // 判断滑动方向
          if (dirvalX > 0) {
            this.current > 0 ? this.current -- : ''
            let resdata = this.list2[this.current]
            this.tabClick(resdata)
          } else if (dirvalX < 0){
            this.current < this.list2.length -1 ? this.current ++ : ''
            let resdata = this.list2[this.current]
            this.tabClick(resdata)
          }
        }
      },
      preventHandler: function preventHandler() {
        return;
      },
      handleSubmit(e) {
        this.isShowDialog=!this.isShowDialog ;
        this.$refs.myPicker.hide();
        this.requestParam.createTime = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
      },
      createTimeShow() {
        this.$refs.myPicker.show();
        this.isShowDialog=!this.isShowDialog ;
        this.$hideKeyboard
      },
      search1() {
        this.tableData = []
        this.queryParam.pageNum = 1
        this.isLoadMore = false
        this.getPage()
      },
      search2() {
        this.tableData = []
        this.queryParam.pageNum = 1
        this.isLoadMore = false
        this.isShowDialog2 = false
        this.getPage()
      },
      resetHandle() {
        this.current = 0
        this.queryParam = {
          id: '',
          keyword: '',
          size: '',
          orderNo: '',
          inventoryId: '',
          status: '',
          theExpire: '',
          shelvesPriceFrom: '',
          shelvesPriceTo: '',
          freightFrom: '',
          freightTo: '',
          poundageFrom: '',
          poundageTo: '',
          theirPriceFrom: '',
          goodType: '',
          theirPriceTo: '',
          addressId: '',
          waybillNo: '',
          createTimeFrom: '',
          createTimeTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          sellTimeFrom: '',
          sellTimeTo: '',
          successTimeFrom: '',
          successTimeTo: '',
          pageSize: 10,
          pageNum: 1
        }
        this.search1()
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      tabClick(item) {
        this.queryParam.status = item.status
        this.queryParam.theExpire = item.theExpire
        this.search1()
      },
      goDel(id) {
        var _this = this;
        uni.showModal({
          title: '',
          confirmColor: '#409eff',
          content: '是否删除',
          success: function (res) {
            if (res.confirm) {
              goodsDefectsApi.delById(id).then(res => {
                _this.$toast(res.subMsg)
                if (res.subCode === 1000) {
                  _this.search1()
                }
              })
            } else if (res.cancel) {
            }
          }
        });
      },
      delItem(id) {
        for (let i = 0; i < this.ids.length; i++) {
          if (this.ids[i] === id) {
            this.ids.splice(i, 1)
          }
        }
      },
      checkedAll() {
        this.checkAll = !this.checkAll
        this.ids = []
        this.tableData.map(item => {
          if (this.checkAll) {
            this.ids.push(item.id)
          } else {
            this.delItem(item.id)
          }
        })
        this.tableData.forEach((obj) => (obj.checked = this.checkAll));
      },
      changeChecked(row) {
        row.checked = !row.checked
        this.tableData.map(item => {
          if (item.id === row.id) {
            if (item.checked) {
              this.ids.push(item.id)
            } else {
              this.delItem(item.id)
            }
          }
        })
        let idLength = this.ids.length
        if (idLength == this.totalCount) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      },
      showSdClick() {
        this.showSd = !this.showSd
      },
      sdzf() {
        if (!this.ids.length) {
          this.$toast('请选择订单')
          return
        }
        let url = '/pages/order/batchUpdate?ids=' + this.ids
        this.$navigateTo(url)
      },
      gotoWl(orderData) {
        if (!orderData.waybillNo) {
          this.$toast('没有物流单号')
          return
        }
        let url = '/pages/order/wlInfo?addressId=' + orderData.addressId + '&waybillNo=' +orderData.waybillNo+ '&id=' + orderData.id
        this.$navigateTo(url)
      },
    }
  };
</script>

<style>
  @import '@/assets/index/style.css';
</style>
