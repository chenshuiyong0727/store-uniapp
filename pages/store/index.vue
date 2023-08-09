<template>
  <view>
    <u-navbar title="仓库" bgColor="#f3faff">
      <view @click="goBack"  class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view class="u-nav-slot" style="font-size: 15px;" slot="right">
        <rudon-rowMenuDotDotDot :localdata="localdata" @change="menuAction($event)">
          <image style="height: 25px;width: 25px" src="../../static/img/slh.png"></image>
        </rudon-rowMenuDotDotDot>
      </view>
    </u-navbar>
    <view class="fenlei_top_tab" style="display: flex;">
      <view style="width: 94vw">
        <u--input
            class="searchInputW"
            prefixIcon="search"
            placeholder="请输入货号/商品名"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            v-model="queryParam.actNo"
            prefixIconStyle="font-size: 24px;color:#c0c4cc"
            :show-action="false"
            @change="search1"
            clearable
        >
        </u--input>
      </view>
<!--      <view class="fenlei_top_right" @click="isShowDialog2 = true">-->
<!--        <image src="../../static/img/search.png"></image>-->
<!--      </view>-->
    </view>
    <view class="searchListSort">
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
            itemStyle="padding-left: 13px; padding-right: 13px; height:44px;"
          >
        </u-tabs>
      </view>
    </view>
    <view class="filterquyu">
      <view class="width80 zuoyouduiqi">
        <view @click="isShowSort = !isShowSort ;isShowDialog2 =false ;">
          <text :class="sortName != '排序' ? 'color-url': ''">{{ sortName}}</text>
          <image v-if="!isShowSort && sortName == '排序'" class="paixutupian" src="../../static/img/tab_down.png"></image>
          <image v-if="!isShowSort && sortName != '排序'" class="paixutupian" src="../../static/img/tab_down_url.png"></image>
          <image v-if="isShowSort && sortName != '排序'" class="paixutupian" src="../../static/img/tab_up_url.png"></image>
          <image v-if="isShowSort && sortName == '排序'" class="paixutupian" src="../../static/img/tab_up.png"></image>
        </view>
        <view @click="isShowDialog2 = true; isShowSort= false;">
          <text>筛选</text>
          <image class="shaixuantupian" src="../../static/img/search_no.png"></image>
        </view>
      </view>
    </view>
    <view></view>
    <view  @touchmove.stop.prevent="moveHandle" @click="isShowSort = !isShowSort"  v-if="isShowSort" class="mask">
    </view>
    <view class="paixudiv" v-if="isShowSort" style="height: 41vh;">
      <scroll-view   scroll-y="true"  class="width92" style="height: 100%">
        <view v-for="(item,index) in sortList"
              :key="index"
              class="paixuliebiao"
              :style="sortList.length==(index+1) ? 'border-bottom: 0px' : ''"
              @click="chooseSort(item)"
        >
            <text :class="sortName == item.fieldName ? 'color-url': ''">{{item.fieldName}}</text>
        </view>
      </scroll-view>
    </view>

    <view  @touchmove.stop.prevent="preventHandler">
      <u-popup :show="!isShowDialog2" @close="isShowDialog2 = !isShowDialog2"  :duration="100" mode="right">
        <view  style="height: 90vh;">
          <scroll-view  scroll-y="true"  class="saixuanquyu">
            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  尺码
                </text>
              </view>
              <view class="julishang10">
                <u--input
                    class="saixuanInput"
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
                  状态
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in inventoryToList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.inventory = item.fieldValue;search1();">
                    <text :class="queryParam.inventory == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  仓库
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in warehouseList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.warehouseId = item.fieldValue;search1();">
                    <text :class="queryParam.warehouseId == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  渠道
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in channelIdList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.channelId = item.fieldValue;search1();">
                    <text :class="queryParam.channelId == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  特殊条件
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in todayList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.today = item.fieldValue;search1();">
                    <text :class="queryParam.today == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
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
                  <u-button color="#f4f3f8" size="small" @click="queryParam.type = item.fieldValue;search1();">
                    <text :class="queryParam.type == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
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
                确定（{{totalCount}} 件商品）
              </text>
            </u-button>
          </view>
        </view>
      </u-popup>
    </view>
<!--    -->
<!--    <view1>-->
<!--      <u-popup :show="isShowDialog2" @close="close" :duration="100" mode="center">-->
<!--        <view style="width: 90vw;margin-left: 5vw;">-->
<!--          <u-navbar title="筛选" :fixed="false" :border="true">-->
<!--            <view @click="resetHandle" style="font-size: 15px;" class="u-nav-slot" slot="left">-->
<!--              <text>关闭</text>-->
<!--            </view>-->
<!--            <view @click="search1" class="u-nav-slot" style="font-size: 15px;" slot="right">-->
<!--              <text>确定</text>-->
<!--            </view>-->
<!--          </u-navbar>-->
<!--          <view>-->
<!--            <u&#45;&#45;form>-->
<!--              <u-form-item label="类型" borderBottom @click="show_sx_type = true; $hideKeyboard()">-->
<!--                <u&#45;&#45;input inputAlign="right" placeholder="请选择类型" disabledColor="#fff"-->
<!--                          placeholderStyle="font-size: 14px;color:#c0c4cc"-->
<!--                          v-model="queryParam.typeStr" border="none" disabled></u&#45;&#45;input>-->
<!--                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>-->
<!--              </u-form-item>-->
<!--              <u-form-item label="品牌" borderBottom>-->
<!--                <u&#45;&#45;input inputAlign="right" placeholder="请输入品牌"-->
<!--                          placeholderStyle="font-size: 14px;color:#c0c4cc"-->
<!--                          v-model="queryParam.brand" border="none"></u&#45;&#45;input>-->
<!--                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>-->
<!--              </u-form-item>-->
<!--              <u-form-item label="开始时间" label-width="50vw" borderBottom-->
<!--                           @click="showFrom = true; $hideKeyboard()">-->
<!--                <u&#45;&#45;input inputAlign="right" prefixIcon="calendar"-->
<!--                          prefixIconStyle="font-size: 20px;color:#c0c4cc" placeholder="请选择开始时间"-->
<!--                          disabledColor="#fff" placeholderStyle="font-size: 14px;color:#c0c4cc"-->
<!--                          v-model="queryParam.createTimeFrom" border="none" disabled></u&#45;&#45;input>-->
<!--                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>-->
<!--              </u-form-item>-->
<!--              <u-form-item label="结束时间" label-width="50vw" borderBottom-->
<!--                           @click="showTo = true; $hideKeyboard()">-->
<!--                <u&#45;&#45;input inputAlign="right" prefixIcon="calendar"-->
<!--                          prefixIconStyle="font-size: 20px;color:#c0c4cc" placeholder="请选择结束时间"-->
<!--                          disabledColor="#fff" placeholderStyle="font-size: 14px;color:#c0c4cc"-->
<!--                          v-model="queryParam.createTimeTo" border="none" disabled></u&#45;&#45;input>-->
<!--                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>-->
<!--              </u-form-item>-->
<!--            </u&#45;&#45;form>-->
<!--          </view>-->
<!--        </view>-->
<!--      </u-popup>-->
<!--    </view1>-->
<!--    <u-picker :show="show_sx_type" :columns="columns" @cancel="show_sx_type= false"-->
<!--              @confirm="confirm_sx_type" keyName="fieldName"></u-picker>-->
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

    <view class="julibiaoti4">
      <view class="dingdans_item_dw"
            v-for="(item,index) in tableData"
            :key="index"
      >
        <!--        头部-->
        <view class="dingdans_top_dw" @click="goDetail(item.id) ">
          <view class="dingdans_top_left_dw">
            <text>入库时间:</text>
            <text>{{item.createTime |formateTime}}</text>
          </view>
          <view class="dingdans_top_right_dw" v-if="item.difference && item.thisTimePrice">
            变更
            <strong style="font-size: 13px;margin-left: 1vw;" v-if="item.difference > 0" class="color-danger"> +{{item.difference }}</strong>
            <strong style="font-size: 13px;margin-left: 1vw;" v-else class="color-success">{{item.difference }}</strong>
          </view>
        </view>
        <!--        中间-->
        <view class="dingdans_con_dw" @click="goDetail(item.id) ">
          <view :src="item.img" class="dingdans_con_left_dw"
               @click.stop="avatarShow(item.img)">
            <image mode="widthFix" :src="item.img" ></image>
            <p class="mark_dw">
              <text class="text_dw">
                {{ item.channelId | dictToDescTypeValue(47) }}
              </text>
            </p>
          </view>
          <view class="diangdans_con_right_dw">
            <view class="dingdans_con_right_top_dw" >
              <text class="chaochu"  style="width: 65vw">
                {{item.goodsName }}
              </text>
            </view>
            <view class="dingdans_con_right_top_dw_1 xianglian">
              <text @click.stop="jumpOrder(item.actNo)">
              {{item.actNo}}
              </text>
              <image @click.stop="$copyUrl(item.actNo)" class="fuzhitupian"
                     src="../../static/img/copy.png"></image>
            </view>
            <view v-if="item.warehouseId" style="margin-bottom: 5px;
    margin-top: 10px;">
              <text  class="dingdans_con_dw_address">
                {{item.warehouseId | dictToDescTypeValue(40)}}
              </text>
            </view>
            <view class="dingdans_con_right_top_dw_2">
              <view>
                 <text>
                {{item.size}} × {{item.inventory}}
              </text>
              </view>
              <view>
                <strong style="color: #333333">
                  ¥
                </strong>
                <strong  v-if="item.thisTimeThePrice" style="font-size: 17px ;color: #333333">
                  {{item.thisTimeThePrice}}
                </strong>
                <strong v-if="!item.thisTimeThePrice && item.theirPrice" style="font-size: 17px ;color: #333333">
                  {{item.theirPrice}}
                </strong>
                <text v-if="item.thisTimePrice" style="margin-left: 5px;text-decoration:line-through;">
                  {{item.thisTimePrice}}
                </text>
                <text v-else style="margin-left: 5px;text-decoration:line-through;">
                  {{item.dwPrice}}
                </text>
              </view>
            </view>
          </view>
        </view>
        <!--底部-->
        <view class="dingdans_bottom_dw">
          <view class="dingdans_top_left_dw">
            <text >入库价</text>
            <text style="margin-left: 2px;" class="color-danger">{{item.price}}</text>
            <text >, 预估利润</text>
            <text style="margin-left: 3px;"  :class="item.thisTimeProfits>= 0 ? 'color-danger': 'color-success'"  v-if="item.thisTimePrice" >{{item.thisTimeProfits }}</text>
            <text style="margin-left: 3px;"  class="color-danger"  v-else  :class="(item.dwPrice - (item.dwPrice * 0.075 + 38 + 8.5) - item.price - 10)>= 0 ? 'color-danger': 'color-success'">
              {{(item.dwPrice - (item.dwPrice * 0.075 + 38 + 8.5) - item.price - 10) | numFilter}}
            </text>
          </view>
          <!--          操作栏-->
<!--          <view class="dingdans_top_right_dw">-->
<!--            <view class="dingdans_con_right_down_2_1">-->
<!--              <view style="margin-bottom: 3px;">-->
<!--                <rudon-rowMenuDotDotDot :localdata="item.optionsOp" @change="menuActionList($event,item)">-->
<!--                  <text class="dw-button-common">操作</text>-->
<!--                </rudon-rowMenuDotDotDot>-->
<!--              </view>-->
<!--            </view>-->
<!--          </view>-->

          <view class="dingdans_top_right_dw">
            <view class="dingdans_con_right_down_2_1 xianglian">
              <text v-if="item.inventory > item.galleryCount"  class="dw-button-common" @click="gallery(item)">上架</text>
<!--              <text v-else-if="item.status==3" class="dw-button-common" @click="toDelivery(item.id)">发货</text>-->
<!--              <text v-else-if="item.status==4" class="dw-button-common" @click="changeStatusComfirm(item.id,5,'确认揽件')">揽件</text>-->
<!--              <text v-else-if="item.status==5" class="dw-button-common" @click="changeStatusComfirm(item.id,6,'确认收货')">收货</text>-->
<!--              <text v-else-if="[6,11].includes(item.status)"  class="dw-button-common" @click="update(item,'交易成功')">成功</text>-->
              <rudon-rowMenuDotDotDot :localdata="optionsOp" @change="menuActionList($event,item)">
                <text v-if="item.inventory > item.galleryCount"  class="dw-button-common">更多</text>
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
        :icon="$fileUrl +'/static/operateSteps/empity_7.png'">
    </u-empty>
    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="imageZoom" mode="widthFix"  class="showImg"></image>
      </view>
    </view>
    <view v-if="storeData.upCout">
      <uni-fab ref="fab" :pattern="pattern"  horizontal="right" @fabClick="syncOldPriceToNew1" />
    </view>
  </view>
</template>
<script>
  import {goodsInventoryApi} from '@/api/goodsInventory'
  import { parseTime } from '@/utils/index'

  export default {
    name: "HelloWorld",
    data() {
      return {
        pattern: {
          icon:'checkmarkempty',
          color: '#7A7E83',
          backgroundColor: '#fff',
          selectedColor: '#409eff',
          buttonColor: '#409eff',
          iconColor: '#fff'
        },
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
            text: '商品入库'
          },
          {
            value: 'resetHandle',
            text: '重置'
          }
        ],
        optionsOp: [
          // {
          //   value: 'goodsDetail',
          //   text: '商品详情'
          // },
          // {
          //   value: 'warehouseDetail',
          //   text: '库存信息'
          // },
          {
            value: 'update',
            text: '修改'
          },
          {
            value: 'gotoDw',
            text: '得物'
          },
          {
            value: 'jumpOrder',
            text: '订单'
          },
          {
            value: 'goDel',
            text: '删除'
          }
        ],
        backUrl: '',
        storeData: {},
        list2: [{
          inventory: 1,
          today: '',
          name: '现货'
        },{
          inventory: 1,
          today: 7,
          name: '变更',
          badge: {
            value:0
          }
        }, {
          inventory: 1,
          today: 2,
          name: '待上架',
          badge: {
            value:0
          }
        },  {
          inventory: 1,
          today: 3,
          name: '待移库',
          badge: {
            value:0
          }
        }, {
          inventory: 0,
          today: '',
          name: '售空'
        }],
        typeList: [],
        columns: [],
        isLoadMore: false,
        isLoading: false,
        loadStatus: 'loadmore',
        requestParam1: {
          poundage: '',
          theirPrice: '',
          profits: '',
          inventoryId: '',
          type: 1,
          num: '',
          shelvesPrice: ''
        },
        sizeList:'',
        requestParam: {
          id: '',
          createTime: '',
          sizeId: '',
          oldInventory: '',
          inventory: '',
          price: '',
          dwPrice: '',
          poundage: '',
          theirPrice: '',
          profits: '',
          waybillNo: '',
          addressId: ''
        },
        emtityMsg: '',
        orderData: '',
        isShowDialog: false,
        orderData1: '',
        isShowDialog1: false,
        orderData2: '',
        isShowDialog2: false,
        isShowSort: false,
        today: '',
        queryParam: {
          today: '',
          syncTimeFrom: '',
          syncTimeTo: '',
          createTimeFrom: '',
          createTimeTo: '',
          id: '',
          warehouseId: '',
          goodType: '',
          channelId: '',
          inventory: 1,
          sort:'',
          inventoryFrom: '',
          inventoryTo: '',
          size: '',
          actNo: '',
          goodsId: '',
          pageSize: 10,
          pageNum: 1
        },
        sortName:'排序',
        warehouseList: [],
        channelIdList: [],
        addressList: [],
        todayList: [],
        inventoryToList: [
          { fieldValue: 1, fieldName: '现货' }, { fieldValue: 0, fieldName: '售空' },
          { fieldValue: 2, fieldName: '未上架' }
        ],
        sortList: [
          { fieldValue: ' TRUNCATE(g.price - (g.price * 0.075 + 38 + 8.5) - a.price - 10 , 2 ) asc ,', fieldName: '利润升序' },
          { fieldValue: ' TRUNCATE(g.price - (g.price * 0.075 + 38 + 8.5) - a.price - 10 , 2 ) desc ,', fieldName: '利润降序' },
          { fieldValue: '(g.price - a.dw_price ) desc  ,', fieldName: '涨价降序' },
          { fieldValue: '(g.price - a.dw_price ) asc  ,', fieldName: '降价降序' },
          { fieldValue: 'c.size asc ,', fieldName: '尺码升序' },
          { fieldValue: 'c.size desc ,', fieldName: '尺码降序' },
          { fieldValue: 'a.price asc ,', fieldName: '入库价升序' },
          { fieldValue: 'a.price desc ,', fieldName: '入库价降序' },
          { fieldValue: 'g.price asc ,', fieldName: '市场价升序' },
          { fieldValue: 'g.price desc ,', fieldName: '市场价降序' },
          { fieldValue: 'a.inventory asc ,', fieldName: '库存升序' },
          { fieldValue: 'a.inventory desc ,', fieldName: '库存降序' },
          { fieldValue: ' TRUNCATE(g.price - (g.price * 0.075 + 38 + 8.5),2 ) desc ,', fieldName: '到手降序' },
          { fieldValue: ' TRUNCATE(g.price - (g.price * 0.075 + 38 + 8.5),2 ) asc ,', fieldName: '到手升序' },
          { fieldValue: 'a.create_time asc ,', fieldName: '入库时间升序' },
          { fieldValue: 'a.create_time desc ,', fieldName: '入库时间降序' },
        ],
        startDate: new Date(),
        createTime: '',
        updateTime: '',
        status: '',
        selectedId: [],
        ids: [],
        tableData: [],
        totalCount: 1
      }
    },
    mounted() {
      // this.getPage()
      // this.listSysDict()
      // this.handleChange()
      // this.keyupSubmit()

    },
    onLoad(options) {
      this.listSysDict()
      this.resetData()
      if (options) {
        this.queryParam.actNo = options.actNo ? options.actNo : '';
        if (this.months) {
          this.queryParam.successTimeFrom = this.months
          this.queryParam.successTimeTo = this.months
        }
        this.current = options.current ? +options.current : 0 ;
        this.queryParam.size = options.size ? options.size : '';
        this.queryParam.warehouseId = options.warehouseId ? options.warehouseId : '';
        this.queryParam.channelId = options.channelId ? options.channelId : '';
        this.queryParam.today = options.today ? options.today : '';
        this.backUrl = options.backUrl ? options.backUrl : '';
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
      handleChange() {
        // goodsBaseApi.listDropDownSizes({ type: '' }, false).
        this.$request({
          url: '/gw/op/v1/goodsBase/listDropDownSizes',
          method: 'post',
          data: { type: '' }
        }).then(res => {
          if (res.subCode === 1000) {
            this.sizeList = res.data
          }
        })
      },
      close1() {
        this.isShowDialog1 = false
        console.log('close');
      },
      syncOldPriceToNew1() {
        this.$request({
          url: '/gw/op/v2/goodsBase/syncOldPriceToNew',
          method: 'get'
        }).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog1 = false
          }
        })
      },
      getData2() {
        this.$request({
          url: '/gw/op/v1/goodsOrder/todaySync',
          method: 'get'
        }).then(res => {
          if (res.subCode === 1000) {
            this.storeData = res.data
            this.list2[1].badge.value=this.storeData.upCout
            this.list2[2].badge.value=this.storeData.successNumLast
            this.list2[3].badge.value=this.storeData.waitMoveCout
          } else {
            this.$toast(res.subMsg)
          }
        })
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
          this.add()
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
        if ('warehouseDetail' == action) {
          this.warehouseDetail(item.goodsId ,item.actNo ,item.img )
        }
        if ('update' == action) {
          this.update(item )
        }
        if ('gotoDw' == action) {
          this.gotoDw(item.spuId )
        }
        if ('jumpOrder' == action) {
          this.jumpOrder(item.actNo)
        }
        if ('gallery' == action) {
          this.gallery(item)
        }
        if ('goDel' == action) {
          this.goDel(item.id)
        }
      },
      preventHandler() {
        return
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
      moveHandle() {},
      confirm_sx_type(e) {
        this.show_sx_type = false
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.queryParam.type = fieldValue
        this.queryParam.typeStr = fieldName
        this.search1()
      },
      // goDetail(id, type) {
      //   let url = '/pages/other/otherAdd?type=' + type
      //   if (id) {
      //     url = url + '&id=' + id
      //     // this.$navigateTo('/pages/other/otherAdd?type='+type+'&id='+id)
      //   }
      //   this.$navigateTo(url)
      //   // this.$router.push({ path: '/otherAdd', query: { id, type } })
      // },

      scanCode(id, type) {

        this.$router.push({ path: '/scanCode', query: { id, type } })
      },
      // goodsDetail(id, type) {
      //
      //   this.$router.push({ path: '/goodsDetail', query: { id, type } })
      // },
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
      // storeAdd(goodsId) {
      //
      //   this.$router.push({ path: '/storeAdd', query: { goodsId } })
      // },
      jumpOrder(actNo) {
        let url= this.getLocalPath()
        uni.reLaunch({
          url: '/pages/order/index?backUrl=/pages/store/index&actNo=' + actNo
        });
      },
      getLocalPath(){
        let curPage = getCurrentPages();
        let route = curPage[curPage.length - 1].route; //获取当前页面的路由
        let params = curPage[curPage.length - 1].options; //获取当前页面参数，如果有则返回参数的对象，没有参数返回空对象{}
        let param = ''
        for (let key in params) {
          param += '&' + key + '=' + params[key]
        }
        let res =route + param
        return  res
      },
      converData(item) {
        // let  optionsOp= [
        //         {
        //           value: 'goodsDetail',
        //           text: '商品详情'
        //         },
        //         {
        //           value: 'warehouseDetail',
        //           text: '库存信息'
        //         },
        //         {
        //           value: 'update',
        //           text: '修改'
        //         },
        //         {
        //           value: 'gotoDw',
        //           text: '得物'
        //         },
        //         {
        //           value: 'jumpOrder',
        //           text: '订单'
        //         },
        //         {
        //           value: 'goDel',
        //           text: '删除'
        //         }
        // ]
        let list = []
        if (item.inventory > item.galleryCount) {
          list.push({
            value: 'gallery',
            text: '上架'
          })
        }
        if (list.length){
            this.optionsOp.forEach(e => {
            list.push(e)
          })
        } else{
          list = this.optionsOp
        }
        // let newArr = list.map((num, index) => ({...optionsOp[index], value: num}));
        item.optionsOp=list
      },
      getPage() {
        this.isLoading = true
        if (this.queryParam.inventory == 1) {
          this.queryParam.inventoryFrom = 1
          this.queryParam.inventoryTo = ''
        } else if (this.queryParam.inventory == 0) {
          this.queryParam.inventoryFrom = ''
          this.queryParam.inventoryTo = 0
        } else {
          this.queryParam.inventoryFrom = ''
          this.queryParam.inventoryTo = ''
        }
        this.getData2()
        // this.$request({
        //   url: '/gw/op/v1/goodsInventory/pageGoods',
        //   method: 'get',
        //   data: this.queryParam
        // })
        this.emtityMsg = ''
        goodsInventoryApi.pageGoods(this.queryParam).then(res => {
          this.isLoading = false
          if (res.subCode === 1000) {
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.emtityMsg = '暂无相关数据'
              this.loadStatus = 'nomore';
              this.isLoadMore = false
            } else {
              res.data.list.forEach(e => {
                this.converData(e)
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
      resetData() {
        this.queryParam = {
          warehouseId: '',
          channelId: '',
          createTimeFrom: '',
          createTimeTo: '',
          syncTimeFrom: '',
          syncTimeTo: '',
          goodType: '',
          id: '',
          sort:'',
          inventory: 1,
          inventoryFrom: '',
          inventoryTo: '',
          size: '',
          actNo: '',
          goodsId: '',
          pageSize: 10,
          pageNum: 1
        }
        this.isShowDialog2 = false
      },
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.statusList = sysDictList.filter(item => item.typeValue == 37)
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
        this.warehouseList = sysDictList.filter(item => item.typeValue == 40)
        this.channelIdList = sysDictList.filter(item => item.typeValue == 47)
        this.todayList = sysDictList.filter(item => item.typeValue == 44)
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)
        this.columns.push(this.typeList)
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
        console.log('close');
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
      chooseSort(item) {
        this.isShowSort = false
        this.queryParam.sort = item.fieldValue
        this.sortName = item.fieldName
        this.search1()
      },
      resetHandle() {
        this.queryParam = {
          warehouseId: '',
          channelId: '',
          syncTimeFrom: '',
          goodType: '',
          syncTimeTo: '',
          createTimeFrom: '',
          createTimeTo: '',
          id: '',
          sort:'',
          inventory: 1,
          inventoryFrom: '',
          inventoryTo: '',
          size: '',
          actNo: '',
          goodsId: '',
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
        this.queryParam.inventory = item.inventory
        this.queryParam.today = item.today
        this.search1()
      },
      keyup1() {
        // let theirPrice =
        //   +  this.requestParam.dwPrice - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
        // // let theirPrice = this.requestParam.theirPrice - 10
        // //   - this.theirPrice.price
        // this.requestParam.profits = parseFloat(theirPrice).toFixed(2)
        //
        // let profits = this.requestParam.theirPrice - 10
        //   - this.requestParam.price
        // this.requestParam.profits = parseFloat(profits).toFixed(2)

        let poundage = this.requestParam.dwPrice * 0.075 + 38 + 8.5
        this.requestParam.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice =  this.requestParam.dwPrice
            - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
        this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam.theirPrice - 10
            - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
      },
      keyup2() {
        // let theirPrice =
        //   +  this.requestParam.dwPrice - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
        // // let theirPrice = this.requestParam.theirPrice - 10
        // //   - this.theirPrice.price
        // this.requestParam.profits = parseFloat(theirPrice).toFixed(2)
        //
        // let profits = this.requestParam.theirPrice - 10
        //   - this.requestParam.price
        // this.requestParam.profits = parseFloat(profits).toFixed(2)

        let poundage = this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5
        this.requestParam1.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice =  this.requestParam1.shelvesPrice
            - (this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5)
        this.requestParam1.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam1.theirPrice - 10
            - this.orderData1.price
        this.requestParam1.profits = parseFloat(profits).toFixed(2)

        if (this.requestParam1.num > this.orderData1.inventory - this.orderData1.galleryCount) {
          this.requestParam1.num = this.orderData1.inventory - this.orderData1.galleryCount
        }
      },
      confirmHandle1() {
        if (!this.requestParam1.num) {
          this.$toast("上架数量错误");
          // this.$toast('上架数量错误')
          return
        }
        if (this.requestParam1.num > this.orderData1.inventory) {
          this.$toast('上架数量大于当前库存')
          return
        }
        let data = {}
        data.inventoryId = this.requestParam1.inventoryId
        data.type = this.requestParam1.type
        data.num = this.requestParam1.num
        data.shelvesPrice = this.requestParam1.shelvesPrice
        goodsInventoryApi.shelvesGoods(data).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.getPage()
            this.isShowDialog1 = false
          }
        })
      },
      confirmHandle() {
        if (this.requestParam.oldInventory < this.requestParam.inventory) {
          // this.$toast('原始库存小于剩余库存')
          this.$toast('原始库存小于剩余库存')
          return
        }
        this.requestParam.createTime = this.requestParam.createTime ? parseTime(this.requestParam.createTime) : ''
        goodsInventoryApi.update(this.requestParam).then(res => {
          if (res.subCode === 1000) {
            this.$toast(res.subMsg)
            this.getPage()
            this.isShowDialog = false
          }else {
            this.$toast(res.subMsg);
          }
        })
      },
      jumpactNo(actNo) {

        this.$router.push({ path: '/order', query: { actNo } })
      },
      goDetail(id) {
        this.$navigateTo('/pages/store/detail?id=' + id)
      },
      add() {
        uni.reLaunch({
          url: '/pages/goodsBase/index'
        });
      },
      // goodsDetail(id, type) {
      //
      //   this.$router.push({ path: '/goodsDetail', query: { id, type } })
      // },
      // 复制链接
      // copyUrl(url) {
      //   const input = document.createElement('input')
      //   document.body.appendChild(input)
      //   input.setAttribute('value', url)
      //   input.select()
      //   if (document.execCommand('copy')) {
      //     document.execCommand('copy')
      //   }
      //   document.body.removeChild(input)
      //   this.$toast('已复制至剪切板')
      // },
      warehouseDetail(goodsId , actNo,img) {

        this.$router.push({ path: '/WarehouseDetail', query: {goodsId, actNo ,img} })
      },
      gallery(row) {
        // let url = '/pages/store/storeUp?id=' + row.id
        this.$navigateTo('/pages/store/storeUp?id=' + row.id)
        // this.orderData1 = row
        // this.requestParam1.inventoryId = this.orderData1.id
        // this.requestParam1.num = this.orderData1.inventory - this.orderData1.galleryCount
        // this.requestParam1.shelvesPrice = this.orderData1.dwPrice
        //
        // let poundage = this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5
        // this.requestParam1.poundage = parseFloat(poundage).toFixed(2)
        //
        // let theirPrice =  this.requestParam1.shelvesPrice
        //     - (this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5)
        // this.requestParam1.theirPrice = parseFloat(theirPrice).toFixed(2)
        //
        // let profits = this.requestParam1.theirPrice - 10
        //     - this.orderData1.price
        // this.requestParam1.profits = parseFloat(profits).toFixed(2)
        // this.isShowDialog1 = true
      },

      goDel(id) {
        var _this = this;
        uni.showModal({
          title: '',
          confirmColor: '#409eff',
          content: '是否删除',
          success: function (res) {
            if (res.confirm) {
              goodsInventoryApi.delById(id).then(res => {
                _this.$toast(res.subMsg)
                if (res.subCode === 1000) {
                  _this.search1()
                }
              })
            } else if (res.cancel) {
            }
          }
        });

        // this.$confirm('是否删除',"提示",{
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type:"warning",
        // }).then(() => {
        //   goodsInventoryApi.delById(id).then(res => {
        //     this.$toast(res.subMsg)
        //     if (res.subCode === 1000) {
        //       this.getPage()
        //     }
        //   })
        // }).catch(() => {
        //   // alert(" b" + id)
        //   // this.goBack()
        // })
        // this.$confirm('是否删除', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   alert(id)
        //   // goodsInventoryApi.delById(id).then(res => {
        //   //   if (res.subCode === 1000) {
        //   //     this.$message.success(res.subMsg)
        //   //     this.pageGoods()
        //   //   } else {
        //   //     this.$message.error(res.subMsg)
        //   //   }
        //   // })
        // })
      },
      update(row) {
        this.$navigateTo('/pages/store/update?id=' + row.id)
        // this.orderData = orderData
        // this.requestParam.id = this.orderData.id
        // this.requestParam.sizeId = this.orderData.sizeId
        // this.requestParam.createTime = parseTime(this.orderData.createTime)
        // this.requestParam.oldInventory = this.orderData.oldInventory
        // this.requestParam.inventory = this.orderData.inventory
        // this.requestParam.price = this.orderData.price
        // this.requestParam.dwPrice = this.orderData.dwPrice
        // this.requestParam.waybillNo = this.orderData.waybillNo
        // this.requestParam.addressId = this.orderData.addressId
        // // let poundage = this.requestParam.dwPrice * 0.075 + 38 + 8.5
        // // this.requestParam.poundage = parseFloat(poundage).toFixed(2)
        // if (!this.orderData.poundage) {
        //   let poundage = this.requestParam.dwPrice * 0.075 + 38 + 8.5
        //   this.requestParam.poundage = parseFloat(poundage).toFixed(2)
        // } else {
        //   this.requestParam.poundage = this.orderData.poundage
        // }
        // if (!this.orderData.theirPrice) {
        //   let theirPrice =  this.requestParam.dwPrice
        //       - (this.requestParam.dwPrice * 0.075 + 38 + 8.5)
        //   this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)
        // } else {
        //   this.requestParam.theirPrice = this.orderData.theirPrice
        // }
        // if (!this.orderData.profits) {
        //   let profits = this.requestParam.theirPrice - 10
        //       - this.requestParam.price
        //   this.requestParam.profits = parseFloat(profits).toFixed(2)
        // } else {
        //   this.requestParam.profits = this.orderData.profits
        // }
        // this.isShowDialog = true
      }
    }
  };
</script>

<style>
  @import '@/assets/index/style.css';
</style>
