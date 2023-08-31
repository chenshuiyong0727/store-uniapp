<template>
  <view>
    <u-navbar title="订单" bgColor="#f3faff">
      <view @click="goBack" class="u-nav-slot" slot="left">
        <image class="back_icon_0" :src="fileUrl +'/static/img/back3.png'"></image>
      </view>
      <view @click="showSd = !showSd"  class="u-nav-slot" slot="right" style="font-size: 15px;margin-right: 23vw">
        <text>
          {{!showSd ? '批量' : '退出' }}
        </text>
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
            || queryParam.goodType
            || queryParam.addressId
            || queryParam.saleType
            || queryParam.waybillNo
            || queryParam.orderNo
            || queryParam.size
            || queryParam.successTimeFrom
            || queryParam.successTimeTo
            "
            :src="fileUrl +'/static/img/search.png'"></image>
        <image v-else  :src="fileUrl +'/static/img/search_no.png'"></image>
      </view>
    </view>
    <view class="searchListnew">
      <view class="u-demo-block__content">
        <u-tabs
            @change="tabClick"
            :duration="200"
            :lineWidth="30"
            :current="current"
            lineColor="#409eff"
            :activeStyle="{
              color: '#333333',
              fontSize: '17px',
              fontWeight: 'bold'
					  }"
            :inactiveStyle="{
              color: '#333333',
              fontSize: '16px'
					}"
            :list="list2"
        >
        </u-tabs>
      </view>
    </view>
    <view  @touchmove.stop.prevent="preventHandler">
      <u-popup :show="isShowDialog2" @close="isShowDialog2 = !isShowDialog2"  :duration="100" mode="right">
        <view  style="height: 90vh;">
          <scroll-view  scroll-y="true"  class="saixuanquyu">

            <view class="saixuanquxiang" style="margin-top: 30px">
              <view>
                <text class="zitijiachu zihao14">
                  订单号
                </text>
              </view>
              <view class="julishang10 saixuanInput">
                <u--input
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
                  物流单号
                </text>
              </view>
              <view class="julishang10 saixuanInput">
                <u--input
                    placeholder="请输入物流单号"
                    placeholderStyle="font-size: 14px;color:#c0c4cc"
                    v-model="queryParam.waybillNo"
                    @change="search1"
                    clearable
                >
                </u--input>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  尺码
                </text>
              </view>
              <view class="julishang10 saixuanInput">
                <u--input
                    placeholder="请输入尺码"
                    placeholderStyle="font-size: 14px;color:#c0c4cc"
                    v-model="queryParam.size"
                    @change="search1"
                    clearable
                >
                </u--input>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  交易成功时间
                </text>
              </view>
              <view class="julishang10 xianglian saixuanshijian">
                <view class="searchInputFilter" @click="showFrom= true;showTo= false">
                  <u--input
                      readonly="readonly"

                      placeholder="开始时间"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.successTimeFrom"
                      clearable
                  ></u--input>
                </view>
                <view>
                  <image  class="hengtupian" :src="fileUrl +'/static/img/heng.png'"></image>
                </view>
                <view class="searchInputFilter" @click="showTo= true;showFrom= false">
                  <u--input
                      readonly="readonly"
                      placeholder="结束时间"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.successTimeTo"
                      clearable
                  ></u--input>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  销售类型
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in saleTypeList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.saleType = item.fieldValue;search1();">
                    <text :class="queryParam.saleType == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>


            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  地址
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in addressList"
                      :key="index"
                      class="saixuanxuanzhechang julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.addressId = item.fieldValue;search1();">
                    <text :class="queryParam.addressId == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
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
                      class="saixuanxuanzhezhong julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="chooseType(item.fieldValue)">
                    <text :class="queryParam.status == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>
            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  商品类型
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in typeList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.goodType = item.fieldValue;search1();">
                    <text :class="queryParam.goodType == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
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
        @touchstart="onTouchStart" @touchend="handleTouchend" >
    <view class="julibiaoti3" >
      <view class="dingdans_item_dw"
            v-for="(item,index) in tableData"
            :key="index"
      >
        <!--        头部-->
        <view class="dingdans_top_dw"  @click="goDetail(item.id) "
              :style="item.status == 3 && item.deliveryDeadlineTime ? 'border-bottom: 0;' : ''">
          <view class="dingdans_top_left_dw">
            <text>订单号：</text>
            <text>{{item.orderNo }}</text>
          </view>
          <view class="dingdans_top_right_dw">
            <text v-if="item.status == 7" class="color-success">{{ item.status |
              dictToDescTypeValue(37) }}
            </text>
            <text v-else-if="[3,4,5,6,8].includes(item.status)" class="color-danger">{{
              item.status | dictToDescTypeValue(37) }}
            </text>
            <text v-else>{{ item.status | dictToDescTypeValue(37) }}</text>
          </view>
        </view>
        <view v-if="item.status == 3 && item.deliveryDeadlineTime"  @click="goDetail(item.id) "
              style="background-color: #fbfbfd;color: #333333;font-weight: 600;font-size: 13px;">
          <view class="xianglian" style="padding: 6px;
    margin-left: 5px;">
            <image style=" margin-bottom: 1px; width: 18px;height: 18px;"
                   :src="fileUrl +'/static/img/djs.png'"></image>
            <text style="font-size: 14px;margin-left: 5px;">发货仅剩：</text>
            <strong v-if=" item.days" style="font-size: 15px;">
              {{ item.days}}
            </strong>
            <text v-if=" item.days">天</text>
            <strong v-if=" item.hours" style="font-size: 15px;">
              {{ item.hours}}
            </strong>
            <text v-if=" item.hours">时</text>
            <strong style="font-size: 15px;">
              {{ item.minutes}}
            </strong>
            <text>分</text>
            <strong style="font-size: 15px;">
              {{ item.seconds}}
            </strong>
            <text>秒</text>
          </view>
        </view>
        <!--        中间-->
        <view class="dingdans_con_dw"  @click="goDetail(item.id) ">
          <view v-if="showSd" style="width: 50px;
    margin-left: -2px;
    margin-right: 2px;">
            <u-checkbox-group>
              <u-checkbox  size="18"
                           :checked="item.checked"
                           @change="changeChecked(item)"
                           activeColor="#409eff"
                           shape="circle">

              </u-checkbox>
            </u-checkbox-group>
          </view>
          <view  class="dingdans_con_left_dw">
            <image
                @click.stop="avatarShow(item.img)" mode="widthFix" :src="item.img" v-if="item.img"></image>
            <image mode="widthFix" :src="fileUrl+item.imgUrl" @click.stop="avatarShow(fileUrl+item.imgUrl)"style="margin-top: 10px;" v-if="!item.img && item.imgUrl" ></image>
            <p class="mark_dw">
              <text class="text_dw">
                {{ item.saleType | dictToDescTypeValue(46) }}
              </text>
            </p>
          </view>
          <view class="diangdans_con_right_dw">
            <view class="dingdans_con_right_top_dw" >
              <text class="chaochu"  style="width: 65vw">
                {{item.goodsName }}
              </text>
            </view>

            <view class="dingdans_con_right_top_dw_3">
              <text v-if="item.status == 3 && item.deliveryDeadlineTime" style="margin-left: 2px">
                <text>发货截止时间</text>
              </text>
              <text  v-if="item.status == 3 && item.deliveryDeadlineTime" style="margin-left: 4px" class="color-danger">
                {{item.deliveryDeadlineTime | formateTime }}
              </text>
            </view>

            <view class="dingdans_con_right_top_dw_1 xianglian">
              <text @click.stop="jumpactNo(item.actNo)">
                {{item.actNo}}
              </text>
              <image @click.stop="$copyUrl(item.actNo)" class="fuzhitupian"
                     :src="fileUrl +'/static/img/copy.png'"></image>
            </view>
            <view v-if="item.addressId" style="margin-bottom: 5px;
    margin-top: 10px;">
              <text class="dingdans_con_dw_address">
                {{item.addressId | dictToDescTypeValue(38)}}
              </text>
            </view>
            <view v-if="item.surplusDay && item.saleType ==2  && item.status !=7"
                  style="    margin-top: 12px;margin-bottom: 5px;">
              <text v-if="item.surplusDay >12">剩余天数</text>
              <text v-if="item.surplusDay >=0 && item.surplusDay <=12" class="color-danger">剩余天数
              </text>
              <text v-if="item.surplusDay < 0" class="color-danger">到期天数</text>
              <text v-if="item.surplusDay >12" style="margin-left: 2px">
                {{item.surplusDay}}
              </text>
              <strong style="margin-left: 2px" v-if="item.surplusDay >=0 && item.surplusDay <=12" class="color-danger">
                {{item.surplusDay}}
              </strong>
              <strong style="margin-left: 2px" v-if="item.surplusDay < 0" class="color-danger">
                {{ 0 - item.surplusDay}}
              </strong>
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
          <view v-if="[2,11].includes(item.status)" class="dingdans_top_left_dw">
            <text v-if="item.thisTimePrice">最低售价</text>
            <text style="margin-left: 2px;"  v-if="item.thisTimePrice">{{item.thisTimePrice }} ,</text>
            <text v-if="item.thisTimeProfits" style="margin-left: 2px">预估利润</text>
            <text style="margin-left: 2px;"  v-if="item.thisTimeProfits">{{item.thisTimeProfits }}</text>
          </view>
          <view v-else class="dingdans_top_left_dw">
            <text>利润</text>
            <text style="margin-left: 2px;"  class="color-danger">{{item.profits }}</text>
          </view>
          <!--          操作栏-->
          <view class="dingdans_top_right_dw">
            <view class="dingdans_con_right_down_2_1 xianglian">
              <text v-if="item.status==2" class="dw-button-common" @click="toSell(item.id)">出售</text>
              <text v-else-if="item.status==3" class="dw-button-common" @click="toDelivery(item.id)">发货</text>
              <text v-else-if="item.status==4" class="dw-button-common" @click="changeStatusComfirm(item.id,5,'确认揽件')">揽件</text>
              <text v-else-if="item.status==5" class="dw-button-common" @click="changeStatusComfirm(item.id,6,'确认收货')">收货</text>
              <text v-else-if="[6,11].includes(item.status)"  class="dw-button-common" @click="update(item,'交易成功')">成功</text>
              <rudon-rowMenuDotDotDot :localdata="optionsOp" @change="menuActionList($event,item)">
                <text v-if="[2,3,4,5,6,11].includes(item.status)"  class="dw-button-common">更多</text>
                <text v-else class="dw-button-common">操作</text>
              </rudon-rowMenuDotDotDot>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-show="tableData.length" class="meiyougengduo">
      <u-loadmore fontSize="18"  color="#a6a6a6" nomoreText="最硬球鞋" :status="loadStatus"/>
    </view>
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
        <image :src="imageZoom" mode="widthFix" class="showImg"></image>
      </view>
    </view>

    <view v-if="showSd" class="zuoyouduiqi sdzf">
      <view style="margin-left: 20px;">
        <u-checkbox-group>
          <u-checkbox  size="20" :checked="checkAll"  @change="checkedAll" activeColor="#409eff"  shape="circle" label="全选"></u-checkbox>
        </u-checkbox-group>
    </view>
      <view class="xianglian">
        <text style="font-size: 14px;">已选</text>
        <text class="color-url" style=" font-size: 17px;margin-left: 8px;font-weight: bolder">{{ids.length}}</text>
        <u-button  type="primary" shape="circle" size="small" style="
        width: 20vw;
        margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
        margin-right: 20px" @click="sdzf">批量操作
        </u-button>
      </view>
    </view>
  </view>
</template>
<script>
  import {goodsOrderApi} from '@/api/goodsOrder'
  import { parseTime } from '@/utils/index'

  export default {

 data() {
      return {
        fileUrl: this.$fileUrl,
        backUrl: '',
        dateCurrent: parseInt(new Date().getTime()),
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
            value: 'goodsDetail',
            text: '商品详情'
          },
          {
            value: 'update',
            text: '修改'
          },
          // {
          //   value: 'gotoDw',
          //   text: '得物'
          // },
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
          id: '',
          size: '',
          saleType: '',
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
          theirPriceTo: '',
          addressId: '',
          goodType: '',
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
          status: '',
          saleType: '',
          price: '',
          shelvesPrice: '',
          deliveryDeadlineTime: '',
          subsidiesPrice: '',
          freight: '',
          poundage: '',
          theirPrice: '',
          profits: '',
          waybillNo: '',
          reason: '色差',
          addressId: ''
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
    onLoad(options) {
      this.initBatch()
      this.listSysDict()
      this.resetData()
      if (options) {
        this.queryParam.keyword = options.actNo ? options.actNo : '';
        this.saleType = options.saleType ? options.saleType : '';
        this.queryParam.saleType = options.saleType ? options.saleType : '';
        this.queryParam.orderNo = options.orderNo ? options.orderNo : '';
        this.status = options.status ? +options.status : '';
        this.current = options.current ? +options.current : 0 ;
        this.queryParam.status = options.status ? +options.status : '';
        this.queryParam.theExpire = options.theExpire ? +options.theExpire : '';
        this.months = options.months ? options.months : '';
        this.backUrl = options.backUrl ? options.backUrl : '';
        if (this.months) {
          this.queryParam.successTimeFrom = this.months
          this.queryParam.successTimeTo = this.months
        }
      }
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
      getDetailById() {
        let id = this.ids[0]
        if (id) {
          this.$request({
            url: '/gw/op/v1/goodsOrder/' + id,
            method: 'get'
          }).then(res => {
            if (res.subCode === 1000) {
              this.requestParam3.deliveryDeadlineTime = res.data ? this.$parseTime(
                  res.data.deliveryDeadlineTime) : ''
              this.requestParam3.inStoreTime = res.data ? this.$parseTime(res.data.inStoreTime) : ''
              this.requestParam3.addressId = res.data ? res.data.addressId : ''
              this.requestParam3.inStoreFreeDay = res.data ? res.data.inStoreFreeDay : ''
              this.requestParam3.freight = res.data ? res.data.freight : ''
              this.requestParam3.waybillNo = res.data ? res.data.waybillNo : ''

            } else {
              this.$toast(res.subMsg)
            }
          })
        }
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
      cancelTo() {
        this.showTo = false
        this.queryParam.successTimeTo = ''
        this.search1()
      },
      confirmFrom(e) {
        this.showFrom = false;
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.queryParam.successTimeFrom = timeValue
        this.search1()
      },
      confirmTo(e) {
        this.showTo = false;
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.queryParam.successTimeTo = timeValue
        this.search1()
      },
      confirm_sx_type(e) {
        this.show_sx_type = false
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.queryParam.type = fieldValue
        this.queryParam.typeStr = fieldName
        this.search1()
      },
      goDetail(id) {
        let url = '/subPages/pages/order/detail?id=' + id
        this.$navigateTo(url)
      },
      toSell(id) {
        this.$navigateTo('/subPages/pages/order/toSell?id=' +id)
      },
      toDelivery(id) {
        this.$navigateTo('/subPages/pages/order/toDelivery?id=' +id)
      },
      update(row,titleName) {
        let url = '/subPages/pages/order/update?id=' + row.id
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
        let url = '/subPages/pages/goodsBase/detail?id=' + id
        this.$navigateTo(url)
      },
      gotoDw(spuId) {
        if (!spuId){
          return
        }
        this.$navigateTo('/pages/webview/webview?spuId=' + spuId)
      },
      jumpactNo(actNo) {
        let url = '/pages/store/index?backUrl=/pages/order/index&actNo=' + actNo
        this.$navigateTo(url)
      },

      getPage() {
        this.isLoading = true
        this.getData()
        this.emtityMsg = ''
        this.$request({
          url: '/gw/op/v1/goodsOrder',
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
                this.countdown(e)
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
      countdown(orderData) {
        if (orderData.status != 3) {
          return
        }
        orderData.days = 0
        orderData.hours = 0
        orderData.minutes = 0
        let deliveryDeadlineTime = orderData.deliveryDeadlineTime
        let endTime = new Date(deliveryDeadlineTime).getTime();
        let startTime = new Date().getTime();
        let totalSeconds = endTime - startTime;
        let interval = setInterval(() => {
          if (totalSeconds > 0) {
            orderData.days = Math.floor(totalSeconds / (24 * 60 * 60 * 1000));
            orderData.hours = Math.floor(
                (totalSeconds - orderData.days * 24 * 60 * 60 * 1000) / (60 * 60 * 1000)
            );
            orderData.minutes = Math.floor(
                (totalSeconds -
                    orderData.days * 24 * 60 * 60 * 1000 -
                    orderData.hours * 60 * 60 * 1000) /
                (60 * 1000)
            );
            orderData.seconds = Math.floor(
                (totalSeconds -
                    orderData.days * 24 * 60 * 60 * 1000 -
                    orderData.hours * 60 * 60 * 1000 -
                    orderData.minutes * 60 * 1000) /
                1000
            );
            totalSeconds -= 1000;
            this.$forceUpdate()
          } else {
            clearInterval(interval);
          }
        }, 1000);
      },
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.statusList = sysDictList.filter(item => item.typeValue == 37)
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
        this.saleTypeList = sysDictList.filter(item => item.typeValue == 46)
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)
        this.columns.push(this.typeList)
      },
      getData() {
        this.$request({
          url: '/gw/op/v1/goodsOrder/orderData',
          method: 'get'
        }).then(res => {
          if (res.subCode === 1000) {
            this.orderIofo = res.data ? res.data.countDto : {}
            this.list2[1].badge.value=this.orderIofo.count3
            this.list2[2].badge.value=this.orderIofo.count4
            this.list2[3].badge.value=this.orderIofo.count5
            this.list2[4].badge.value=this.orderIofo.count6
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      search() {
        if (!this.queryParam.name) {
          this.$toast('请输入名称')
          return
        }
        this.queryParam.pageNum = 1
        this.getPage()
      },
      close() {
        this.isShowDialog2 = false
      },
      chooseType(status) {
        let current = 0
        for (let i = 0; i < this.list2.length; i++) {
          if (this.list2[i].status == status ){
            current = i
          }
        }
        this.current = current
        this.queryParam.status = status
        this.search1()
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
        this.current = 0
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
              goodsOrderApi.delById(id).then(res => {
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
        let url = '/subPages/pages/order/batchUpdate?ids=' + this.ids
        this.$navigateTo(url)
      },
      gotoWl(orderData) {
        if (!orderData.waybillNo) {
          this.$toast('没有物流单号')
          return
        }
        let url = '/subPages/pages/order/wlInfo?addressId=' + orderData.addressId + '&waybillNo=' +orderData.waybillNo+ '&id=' + orderData.id
        this.$navigateTo(url)
      },
    }
  };
</script>

<style>
  @import '@/assets/index/style.css';
</style>
