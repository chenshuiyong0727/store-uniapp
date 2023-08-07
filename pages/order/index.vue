<template>
  <view>
    <u-navbar title="订单">
      <view @click="goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view class="u-nav-slot" style="font-size: 15px;" slot="right">
        <rudon-rowMenuDotDotDot :localdata="localdata" @change="menuAction($event)">
          <image style="height: 25px;width: 25px" src="../../static/img/slh.png"></image>
        </rudon-rowMenuDotDotDot>
      </view>
    </u-navbar>
    <view class="fenlei_top" style="display: flex;">
      <view style="width: 83vw">
        <u--input
            class="searchInput"
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
        <image src="../../static/img/search.png"></image>
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
              color: '#606266',
              fontSize: '16px'
					}"
            :list="list2"
        >
        </u-tabs>
      </view>
    </view>

    <view>
      <u-popup :show="isShowDialog2" @close="close" :duration="100" mode="bottom">
        <view style="width: 90vw;margin-left: 5vw;">
          <u-navbar title="筛选" :fixed="false" :border="true">
            <view @click="resetHandle" style="font-size: 15px;" class="u-nav-slot" slot="left">
              <text>关闭</text>
            </view>
            <view @click="search1" class="u-nav-slot" style="font-size: 15px;" slot="right">
              <text>确定</text>
            </view>
          </u-navbar>
          <view>
            <u--form>
              <u-form-item label="类型" borderBottom @click="show_sx_type = true; $hideKeyboard()">
                <u--input inputAlign="right" placeholder="请选择类型" disabledColor="#fff"
                          placeholderStyle="font-size: 14px;color:#c0c4cc"
                          v-model="queryParam.typeStr" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label="品牌" borderBottom>
                <u--input inputAlign="right" placeholder="请输入品牌"
                          placeholderStyle="font-size: 14px;color:#c0c4cc"
                          v-model="queryParam.brand" border="none"></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label="开始时间" label-width="50vw" borderBottom
                           @click="showFrom = true; $hideKeyboard()">
                <u--input inputAlign="right" prefixIcon="calendar"
                          prefixIconStyle="font-size: 20px;color:#c0c4cc" placeholder="请选择开始时间"
                          disabledColor="#fff" placeholderStyle="font-size: 14px;color:#c0c4cc"
                          v-model="queryParam.createTimeFrom" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label="结束时间" label-width="50vw" borderBottom
                           @click="showTo = true; $hideKeyboard()">
                <u--input inputAlign="right" prefixIcon="calendar"
                          prefixIconStyle="font-size: 20px;color:#c0c4cc" placeholder="请选择结束时间"
                          disabledColor="#fff" placeholderStyle="font-size: 14px;color:#c0c4cc"
                          v-model="queryParam.createTimeTo" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
            </u--form>
          </view>
        </view>
      </u-popup>
    </view>
    <u-picker :show="show_sx_type" :columns="columns" @cancel="show_sx_type= false"
              @confirm="confirm_sx_type" keyName="fieldName"></u-picker>
    <u-datetime-picker
        :show="showFrom"
        mode="date"
        :minDate="1646064000000"
        @confirm="confirmFrom"
        @cancel="cancelFrom"
    ></u-datetime-picker>
    <u-datetime-picker
        :show="showTo"
        mode="year-month"
        :minDate="1646064000000"
        @confirm="confirmTo"
        @cancel="cancelTo"
    ></u-datetime-picker>

    <view class="julibiaoti3">
      <!--      <view1 class="dingdans_item_dw"-->
      <!--            v-for="(item,index) in tableData"-->
      <!--            :key="index"-->
      <!--      >-->
      <!--        <view class="dingdans_con_dw">-->
      <!--          <view :src="item.img" class="dingdans_con_left_dw"-->
      <!--               @click="avatarShow(item.img)">-->
      <!--            <image mode="widthFix" :src="item.img" ></image>-->
      <!--            <p class="mark_dw">-->
      <!--              <text class="text_dw">-->
      <!--                {{ item.type | dictToDescTypeValue(20221108) }}-->
      <!--              </text>-->
      <!--            </p>-->
      <!--          </view>-->
      <!--          <view class="diangdans_con_right_dw">-->
      <!--            <view class="dingdans_con_right_top_dw" @click="goodsDetail(item.id, 1) ">-->
      <!--              <text>-->
      <!--                {{item.name | sizeFilterNum(38) }}-->
      <!--              </text>-->
      <!--            </view>-->
      <!--            <view class="dingdans_con_right_top_dw_1 xianglian">-->
      <!--              <text @click="jumpactNo(item.actNo)">-->
      <!--              {{item.actNo}}-->
      <!--              </text>-->
      <!--              <image @click="$copyUrl(item.actNo)" class="fuzhitupian"-->
      <!--                     src="../../static/img/copy.png"></image>-->
      <!--            </view>-->
      <!--            <view class="dingdans_con_right_top_dw_2" style="margin-bottom: -10px;">-->
      <!--              <view  v-if="item.brand">-->
      <!--                   <text  class="dingdans_con_dw_address">-->
      <!--                    {{item.brand}}-->
      <!--                  </text>-->
      <!--              </view>-->
      <!--              <view class="dingdans_top_right_dw">-->
      <!--                <view class="dingdans_con_right_down_2_1">-->
      <!--                  <rudon-rowMenuDotDotDot :localdata="optionsOp" @change="menuAction1($event,item.id)">-->
      <!--                    <text class="dw-button-common">操作</text>-->
      <!--                  </rudon-rowMenuDotDotDot>-->

      <!--&lt;!&ndash;                  <el-dropdown trigger="click" style="margin-left: 1px;">&ndash;&gt;-->
      <!--&lt;!&ndash;                    <button&ndash;&gt;-->
      <!--&lt;!&ndash;                        class="dw-button-common">操作&ndash;&gt;-->
      <!--&lt;!&ndash;                    </button>&ndash;&gt;-->
      <!--&lt;!&ndash;                    <el-dropdown-menu slot="dropdown" >&ndash;&gt;-->
      <!--&lt;!&ndash;                      <el-dropdown-item type="text" @click.native="storeAdd(item.id)">选择</el-dropdown-item>&ndash;&gt;-->
      <!--&lt;!&ndash;                      <el-dropdown-item type="text" @click.native="gotoDw(item.spuId)">得物</el-dropdown-item>&ndash;&gt;-->
      <!--&lt;!&ndash;                      <el-dropdown-item type="text" @click.native="goodsDetail(item.id,1)">详情</el-dropdown-item>&ndash;&gt;-->
      <!--&lt;!&ndash;                    </el-dropdown-menu>&ndash;&gt;-->
      <!--&lt;!&ndash;                  </el-dropdown>&ndash;&gt;-->
      <!--                </view>-->
      <!--              </view>-->
      <!--            </view>-->
      <!--          </view>-->
      <!--        </view>-->
      <!--        &lt;!&ndash;底部&ndash;&gt;-->
      <!--      </view1>-->

      <view class="dingdans_item_dw"
            v-for="(item,index) in tableData"
            :key="index"
      >
        <!--        头部-->
        <view class="dingdans_top_dw"
              :style="item.status == 3 && item.deliveryDeadlineTime ? 'border-bottom: 0;' : ''">
          <view class="dingdans_top_left_dw">
            <text>订单号:</text>
            <text>{{item.orderNo }}</text>
          </view>
          <view class="dingdans_top_right_dw">
            <!--            <text>{{ item.status | dictToDescTypeValue(37) }} </text>-->
            <text v-if="item.status == 7" class="color-success">{{ item.status |
              dictToDescTypeValue(37) }}
            </text>
            <text v-else-if="[3,4,5,6,8].includes(item.status)" class="color-danger">{{
              item.status | dictToDescTypeValue(37) }}
            </text>
            <text v-else>{{ item.status | dictToDescTypeValue(37) }}</text>
          </view>
        </view>
        <view v-if="item.status == 3 && item.deliveryDeadlineTime"
              style="background-color: #fbfbfd;color: #333333;font-weight: 600;font-size: 13px;">
          <view class="xianglian" style="padding: 6px;
    margin-left: 5px;">
            <image style=" margin-bottom: 1px; width: 18px;height: 18px;"
                   src="../../static/img/djs.png"></image>
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
        <view class="dingdans_con_dw">
          <view v-if="showSd" style="width: 50px;
    margin-left: -2px;
    margin-right: 2px;">
            <el-checkbox v-model="item.checked" :checked="item.checked"
                         @change="changeChecked(item.id)"></el-checkbox>
          </view>
          <view :src="item.img" class="dingdans_con_left_dw"
                @click="avatarShow(item.img)">
            <image mode="widthFix" :src="item.img"></image>
            <p class="mark_dw">
              <text class="text_dw">
                {{ item.saleType | dictToDescTypeValue(46) }}
              </text>
            </p>
          </view>
          <view class="diangdans_con_right_dw">
            <view class="dingdans_con_right_top_dw" @click="goDetail(item.id) ">
              <text class="chaochu"  style="width: 65vw">
                {{item.goodsName }}
              </text>
            </view>
            <view class="dingdans_con_right_top_dw_1 xianglian">
              <text @click="jumpactNo(item.actNo)">
                {{item.actNo}}
              </text>
              <image @click="$copyUrl(item.actNo)" class="fuzhitupian"
                     src="../../static/img/copy.png"></image>
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
              <text v-if="item.surplusDay >12">
                {{item.surplusDay}}
              </text>
              <strong v-if="item.surplusDay >=0 && item.surplusDay <=12" class="color-danger">
                {{item.surplusDay}}
              </strong>
              <strong v-if="item.surplusDay < 0" class="color-danger">
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
                <strong v-if="item.theirPrice && ![2,11].includes(item.status)"
                        style="font-size: 17px ;margin-left: -2px;color: #333333">
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
            <text v-if="item.thisTimeProfits" style="margin-left: 3px">预估利润</text>
            <text style="margin-left: 2px;"  v-if="item.thisTimeProfits">{{item.thisTimeProfits }}</text>
          </view>
          <view v-else class="dingdans_top_left_dw">
            <text>利润</text>
            <text style="margin-left: 2px;"  class="color-danger">{{item.profits }}</text>
            <text v-if="item.status == 3 && item.deliveryDeadlineTime" style="margin-left: 3px">
              <text>，发货截止时间</text>
            </text>
            <text  v-if="item.status == 3 && item.deliveryDeadlineTime" class="dingdans_con_dw_time">
              {{item.deliveryDeadlineTime | formateTime('{y}-{m}-{d} {h}:{i}') }}
            </text>
          </view>
          <!--          操作栏-->
          <view class="dingdans_top_right_dw">
            <view class="dingdans_con_right_down_2_1">
              <!--              <el-dropdown trigger="click" style="margin-left: 1px;">-->
              <!--                <button-->
              <!--                    class="dw-button-common">操作-->
              <!--                </button>-->
              <!--                <el-dropdown-menu slot="dropdown" >-->
              <!--                  <el-dropdown-item type="text" @click.native="handleClick(item)">修改</el-dropdown-item>-->
              <!--                  <el-dropdown-item type="text" @click.native="gotoDw(item.spuId)">得物</el-dropdown-item>-->
              <!--                  <el-dropdown-item type="text" @click.native="gotoWl(item)">查看物流</el-dropdown-item>-->
              <!--                  <el-dropdown-item type="text" @click.native="goodsDetail(item.goodsId, 1)">商品详情</el-dropdown-item>-->
              <!--                  &lt;!&ndash;                  <el-dropdown-item type="text" @click.native="orderDetailnew(item.id, 1)">订单详情</el-dropdown-item>&ndash;&gt;-->
              <!--                  <el-dropdown-item type="text" class="color-danger" @click.native="goDel(item.id)">删除</el-dropdown-item>-->
              <!--                </el-dropdown-menu>-->
              <!--              </el-dropdown>-->
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-show="tableData.length" style="padding: 10px;">
      <u-loadmore :status="loadStatus"/>
    </view>
    <u-empty
        v-if="!tableData.length && !isLoading"
        mode="list"
        marginTop="50"
        textSize="16"
        textColor="#8a8a8a"
        :icon="$fileUrl +'/static/operateSteps/empity_7.png'">
    </u-empty>
    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="imageZoom" mode="widthFix" class="showImg"></image>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        backUrl: '',
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
            value: 'view',
            text: '查看'
          },
          {
            value: 'update',
            text: '修改'
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
    mounted() {
      // this.getPage()
      // this.listSysDict()
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
      menuAction1(action, rowId) {
        if (action === '') {
          return
        }
        if ('view' == action) {
          this.goDetail(rowId, 1)
        }
        if ('update' == action) {
          this.goDetail(rowId, 2)
        }
      },

      cancelFrom() {
        this.showFrom = false
        this.queryParam.createTimeFrom = ''
        this.search1()
      },
      cancelTo() {
        this.showTo = false
        this.queryParam.createTimeTo = ''
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
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.queryParam.type = fieldValue
        this.queryParam.typeStr = fieldName
        this.search1()
      },
      goDetail(id, type) {
        let url = '/pages/other/otherAdd?type=' + type
        if (id) {
          url = url + '&id=' + id
          // this.$navigateTo('/pages/other/otherAdd?type='+type+'&id='+id)
        }
        this.$navigateTo(url)
        // this.$router.push({ path: '/otherAdd', query: { id, type } })
      },

      scanCode(id, type) {

        this.$router.push({path: '/scanCode', query: {id, type}})
      },
      goodsDetail(id, type) {

        this.$router.push({path: '/goodsDetail', query: {id, type}})
      },
      gotoDw(spuId) {
        if (!spuId) {
          return
        }
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId=";
        window.location.href = url + spuId;
      },
      storeAdd(goodsId) {

        this.$router.push({path: '/storeAdd', query: {goodsId}})
      },
      jumpactNo(actNo) {

        this.$router.push({path: '/store', query: {actNo}})
      },
      getPage() {
        this.isLoading = true
        this.getData()
        this.initBatch()
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
              this.initBatch()
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
      confirmHandle3() {
        if (!this.requestParam3.deliveryDeadlineTime) {
          this.$toast('发货截止时间为空')
          return
        }
        if (!this.requestParam3.addressId) {
          this.$toast('发货地址为空')
          return
        }
        if (this.requestParam3.status == 11 && !this.requestParam3.inStoreTime) {
          this.$toast('闪电直发入仓 ，入仓时间不能为空')
          return
        }
        if (this.requestParam3.status == 11 && !this.requestParam3.inStoreFreeDay) {
          this.$toast('闪电直发入仓 ，免仓储费天数不能为空')
          return
        }

        this.requestParam3.deliveryDeadlineTime = this.requestParam3.deliveryDeadlineTime
            ? this.$parseTime(this.requestParam3.deliveryDeadlineTime) : ''
        this.requestParam3.inStoreTime = this.requestParam3.inStoreTime ? this.$parseTime(
            this.requestParam3.inStoreTime) : ''

        // 闪电直发
        // goodsOrderApi.updateSaleType(this.requestParam3)
        this.$request({
          url: '/gw/op/v1/goodsOrder/updateSaleType',
          method: 'put',
          data: this.requestParam3
        }).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog3 = false
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
        // goodsOrderApi.orderData()
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
        // this.allLoaded = false;
        this.getPage()
      },
      close() {
        this.isShowDialog2 = false
        console.log('close');
      },
      search1() {
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
        this.search1()
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      tabClick(item) {
        // this.queryParam.type = item.type
        // this.search1()
        this.queryParam.status = item.status
        this.queryParam.theExpire = item.theExpire
        this.search1()
      },
      keyup1() {
        let poundage = this.requestParam.shelvesPrice * 0.075 + 38 + 8.5
        this.requestParam.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice = this.requestParam.subsidiesPrice * 1 + this.requestParam.shelvesPrice
            - (this.requestParam.shelvesPrice * 0.075 + 38 + 8.5)
        this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam.theirPrice - this.requestParam.freight
            - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
      },
      keyup2() {
        let poundage = this.requestParam.shelvesPrice * 0.075 + 38 + 8.5
        this.requestParam.poundage = parseFloat(poundage).toFixed(2)

        let profits = this.requestParam.theirPrice - this.requestParam.freight
            - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
      },
      confirmHandle() {
        if (this.requestParam.status == 7 && !this.requestParam.freight) {
          this.$toast('请输入运费')
          return
        }
        if (this.requestParam.status == 3 && !this.requestParam.addressId) {
          this.$toast('请选择地址')
          return
        }
        if (this.requestParam.status == 8 && !this.requestParam.reason) {
          this.$toast('请输入瑕疵原因')
          return
        }
        if (this.requestParam.status == 3 && !this.requestParam.deliveryDeadlineTime) {
          this.$toast('发货截止时间为空')
          return
        }
        // 利润= 到手价-运费-原价
        let profits = this.requestParam.theirPrice - this.requestParam.freight
            - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
        this.requestParam.deliveryDeadlineTime = this.requestParam.deliveryDeadlineTime
            ? this.$parseTime(this.requestParam.deliveryDeadlineTime) : ''
        goodsOrderApi.sellGoods(this.requestParam).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog = false
          }
        })
      },
      updateAddress() {
        goodsOrderApi.update(this.requestParam1).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog1 = false
          }
        })
      },
      changeStatusDialog1(row) {
        this.orderData1 = row
        this.requestParam1.id = this.orderData1.id
        this.requestParam1.freight = this.orderData1.freight
        this.requestParam1.waybillNo = this.orderData1.waybillNo
        this.requestParam1.addressId = this.orderData1.addressId

        this.isShowDialog1 = true
      },
      goodsDetail(id, type) {

        this.$router.push({path: '/goodsDetail', query: {id, type}})
      },
      jumpactNo(actNo) {

        this.$router.push({path: '/store', query: {actNo}})
      },
      goDetail(id) {

        this.$router.push({path: '/orderDetail', query: {id}})
      },
      orderDetailnew(id) {

        this.$router.push({path: '/orderDetailnew', query: {id}})
      },
      gotoDw(spuId) {
        if (!spuId) {
          return
        }
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId=";
        window.location.href = url + spuId;
      },
      goDel(id) {
        this.$confirm('是否删除', "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning",
        }).then(() => {
          goodsOrderApi.delById(id).then(res => {
            this.$toast(res.subMsg)
            if (res.subCode === 1000) {
              this.getPage()
            }
          })
        }).catch(() => {
        })
      },
      delItem(id) {
        for (let i = 0; i < this.ids.length; i++) {
          if (this.ids[i] === id) {
            this.ids.splice(i, 1)
          }
        }
      },
      checkedAll() {
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
      changeChecked(id) {
        this.tableData.map(item => {
          if (item.id === id) {
            if (item.checked) {
              this.ids.push(item.id)
            } else {
              this.delItem(item.id)
            }
          }
        })
        let idLength = this.ids.length
        let totalLength = this.queryParam.pageNum * this.queryParam.pageSize
        if (idLength == totalLength) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      },
      showSdClick() {
        this.showSd = !this.showSd
      },
      sdzf() {
        this.requestParam3.ids = this.ids
        this.requestParam3.status = 3
        if (!this.ids.length) {
          this.$toast('请选择订单')
          return
        }
        this.getDetailById()
        this.isShowDialog3 = true
      },
      gotoWl(orderData) {
        this.requestParamWl.addressId = orderData.addressId
        this.requestParamWl.waybillNo = orderData.waybillNo
        if (!this.requestParamWl.waybillNo) {
          this.$toast('没有物流单号')
          return
        }
        goodsOrderApi.waybillNoList(this.requestParamWl).then(res => {
          if (res.subCode === 1000) {
            if (res.data.list.length) {
              this.wlDataSize = res.data.list.length
              this.requestParamWl.receiverAddress = res.data.receiverAddress
              this.requestParamWl.freight = res.data.realAmount
              this.wlData = []
              for (let i = 0; i < res.data.list.length; i++) {
                let dataInfo = res.data.list[i]
                let status = '运输中'
                if (dataInfo.message.indexOf("已收取快件") >= 0) {
                  status = '已揽件'
                } else if (dataInfo.message.indexOf("可查看签收人信息") >= 0) {
                  status = '已签收'
                }
                dataInfo.status = status
                this.wlData.push(dataInfo)
              }
              this.isShowDialogWl = true
            } else {
              this.$toast("暂无物流信息，请核对物流单号")
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      handleClick(orderData) {
        this.orderData = orderData
        this.requestParam.id = this.orderData.id
        this.requestParam.saleType = this.orderData.saleType
        this.requestParam.price = this.orderData.price
        this.requestParam.shelvesPrice = this.orderData.shelvesPrice

        this.requestParam.subsidiesPrice = this.orderData.subsidiesPrice
        this.requestParam.deliveryDeadlineTime = this.$parseTime(
            this.orderData.deliveryDeadlineTime)
        this.requestParam.freight = this.orderData.freight
        this.requestParam.waybillNo = this.orderData.waybillNo
        this.requestParam.addressId = this.orderData.addressId ? this.orderData.addressId : ''
        if (this.orderData.status != 11) {
          this.requestParam.status = this.orderData.status + 1
        } else {
          this.requestParam.status = 6
        }
        if (this.orderData.status == 7) {
          this.requestParam.status = 7
        }
        if (!this.orderData.poundage) {
          let poundage = this.requestParam.shelvesPrice * 0.075 + 38 + 8.5
          this.requestParam.poundage = parseFloat(poundage).toFixed(2)
        } else {
          this.requestParam.poundage = this.orderData.poundage
        }
        if (!this.orderData.theirPrice) {
          let theirPrice = this.requestParam.subsidiesPrice * 1 + this.requestParam.shelvesPrice
              - (this.requestParam.shelvesPrice * 0.075 + 38 + 8.5)
          this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)
        } else {
          this.requestParam.theirPrice = this.orderData.theirPrice
        }
        if (!this.orderData.profits) {
          let profits = this.requestParam.theirPrice - this.requestParam.freight
              - this.requestParam.price
          this.requestParam.profits = parseFloat(profits).toFixed(2)
        } else {
          this.requestParam.profits = this.orderData.profits
        }
        this.isShowDialog = true
      }
    }
  };
</script>

<style>
  @import '@/assets/index/style.css';
</style>
