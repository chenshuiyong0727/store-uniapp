<template>
  <view>
    <u-navbar title="待办消息"  bgColor="#f3faff">
      <view @click="goBack" class="u-nav-slot" slot="left">
        <image class="back_icon" :src="fileUrl +'/static/img/back3.png'"></image>
      </view>
    </u-navbar>
    <view class="fenlei_top_tab"  style="display: flex;">
      <view style="width: 83vw" class="baisebeijing">
        <u--input
            class="searchInputW"
            prefixIcon="search"
            placeholder="请输入标题"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            v-model="queryParam.title"
            prefixIconStyle="font-size: 24px;color:#c0c4cc"
            :show-action="false"
            @change="search1"
            clearable
        >
        </u--input>
      </view>
      <view class="fenlei_top_right" @click="isShowDialog2 = true">
        <image v-if="queryParam.type || queryParam.content || ( queryParam.waitType && queryParam.waitType != '1')"  :src="fileUrl +'/static/img/search.png'"></image>
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
            itemStyle="padding-left: 15px; padding-right: 15px; height:44px;"
        >
        </u-tabs>
      </view>
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
        mode="year-month"
        :minDate="1646064000000"
        @confirm="confirmTo"
        @cancel="cancelTo"
    ></u-datetime-picker>
    <view
        style="height: 100vh"
        @touchstart="onTouchStart" @touchend="handleTouchend" >
      <view class="julibiaoti3" >
      <view class="msg_table"
            v-for="(item,index) in tableData"
            :key="index"  @click="gotoDetail(item) "
      >
<!--        头部  beg-->
      <view class="zuoyouduiqi" style="padding: 2px 0 8px 0">
        <view>
          <text class="color-font chaochu" style="width: 72vw">{{item.title}}</text>
        </view>
        <view>
          <text class="color-font-strong" v-if="item.waitType == 1">待办</text>
          <text class="color-dw-strong" v-if="item.waitType == 2">已办</text>
        </view>
      </view>
<!--        头部  end-->
<!--        内容  beg-->
      <view v-if="!item.inventoryId && !item.orderId " style="border-top: 1px solid #eee; padding: 10px 0 10px 0">
        <view>
          <text>{{item.content}}</text>
        </view>
      </view>
      <view v-if="item.inventoryId" style="border-top: 1px solid #eee; padding: 10px 0 10px 0">
        <view  class="zuoyouduiqi">
          <view style="width: 25vw;height: 25vw;border: 1px solid #f1f1f1 ;border-radius: 5px;" @click.stop="avatarShow(item.img)">
            <image style=" width: 80%;margin-top: 30px;margin-left: 10%;" mode="widthFix" :src="item.img" v-if="item.img"></image>
          </view>
          <view style="width: 65vw">
            <view>
              <text>{{item.content}}</text>
            </view>
            <view class="dingdans_con_right_top_dw_1 xianglian" style="padding-top: 3px;">
              <text class="color-font">
                {{item.actNo}}
              </text>
              <image @click.stop="$copyUrl(item.actNo)" class="fuzhitupian"
                     :src="fileUrl +'/static/img/copy.png'"></image>
            </view>
          </view>
        </view>
      </view>
      <view v-if="item.orderId" style="border-top: 1px solid #eee; padding: 10px 0 10px 0">
        <view  class="zuoyouduiqi">
          <view style="width: 25vw;height: 25vw;border: 1px solid #f1f1f1 ;border-radius: 5px;" @click.stop="avatarShow(item.img)">
            <image style=" width: 80%;margin-top: 30px;margin-left: 10%;" mode="widthFix" :src="item.img" v-if="item.img"></image>
          </view>
          <view style="width: 65vw">
            <view>
              <text>{{item.content}}</text>
            </view>
            <view class="dingdans_con_right_top_dw_1 xianglian" style="padding-top: 3px;">
              <text class="color-font">
                {{item.orderNo}}
              </text>
              <image @click.stop="$copyUrl(item.orderNo)" class="fuzhitupian"
                     :src="fileUrl +'/static/img/copy.png'"></image>
            </view>
          </view>
        </view>
      </view>
<!--        内容  end-->
  <!--        尾部  beg-->
  <view class="zuoyouduiqi" style="border-top: 1px solid #eee; padding: 10px 0 0 0">
    <view>
      <text style="font-size: 12px;">{{item.createTime | formateTime }} </text>
      <text style="font-size: 12px; margin-left: 3px; color: #333333">{{item.type | dictToDescTypeValue(52)}}</text>
    </view>
    <view>
      <text class="dw-button-common" v-if="item.inventoryId || item.type== 3 || item.type== 10 || item.type == 12">详情</text>
      <text class="dw-button-common" v-if="item.waitType == 1" style="margin-left: 2vw"  @click.stop="updateOneStatus(item.id)">已办</text>
    </view>
  </view>
  <!--        尾部  end-->
      </view>

    </view>

      <view v-show="tableData.length" style="padding: 18px;" class="meiyougengduo">
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
        <image :src="imageZoom" mode="widthFix"  class="showImg"></image>
      </view>
    </view>
      <view>
      <u-popup :show="isShowDialog2" @close="isShowDialog2 = false"  :duration="100" mode="right">
        <view  style="height: 90vh;">
        <scroll-view  scroll-y="true"  class="saixuanquyu">
          <view class="saixuanquxiang" >
            <view>
              <text class="zitijiachu zihao14">
                内容
              </text>
            </view>
            <view class="julishang10 saixuanInput">
              <u--input
                  placeholder="请输入内容"
                  placeholderStyle="font-size: 14px;color:#c0c4cc"
                  v-model="queryParam.content"
                  @change="search1"
                  clearable
              >
              </u--input>
            </view>
          </view>

          <view class="saixuanquxiang" >
            <view>
              <text class="zitijiachu zihao14">
                事项状态
              </text>
            </view>
            <view class="julishang_10 saixuanxuanzhefuji">
              <view class="saixuanxuanzhe julishang_10">
                <u-button color="#f4f3f8" size="small" @click="chooseType('')">
                  <text :class="!queryParam.waitType? 'xuanzhongziti' : 'putongziti'">全部</text>
                </u-button>
              </view>
              <view v-for="(item,index) in waitTypeList"
                    :key="index"
                    class="saixuanxuanzhe julishang_10">
                <u-button color="#f4f3f8" size="small" @click="chooseType(item.fieldValue)">
                  <text :class="queryParam.waitType == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                </u-button>
              </view>
            </view>
          </view>

          <view class="saixuanquxiang" >
            <view>
              <text class="zitijiachu zihao14">
                消息类型
              </text>
            </view>
            <view class="julishang_10 saixuanxuanzhefuji">
             <view v-for="(item,index) in typeList"
                :key="index"
                 class="saixuanxuanzhezhong julishang_10">
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
              确定（{{totalCount}} 条消息）
            </text>
          </u-button>
        </view>
        </view>
      </u-popup>
    </view>
    <view v-if="showTab">
      <uni-fab ref="fab" :pattern="pattern"  horizontal="right"  @fabClick="updateAllStatus" />
    </view>
  </view>
</template>
<script>
  export default {
 data() {
      return {
        fileUrl: this.$fileUrl,
        dateCurrent: parseInt(new Date().getTime()),
        showFrom: false,
        showTo: false,
        show_sx_type: false,
        backUrl: '',
        baseMsgCount: 0,
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
        orderData: '',
        isShowDialog: false,
        orderData1: '',
        isShowDialog1: false,
        orderData2: '',
        isShowDialog2: false,
        showTab:false,
        list2: [{
          waitType: '1',
          name: '待办',
          badge: {
            value:0
          }
        }, {
          waitType: '',
          name: '全部',
        }],
        queryParam: {
          type: '',
          waitType: '1',
          userId: '',
          title: '',
          content: '',
          uniPushCid: '',
          requestId: '',
          pageSize: 10,
          pageNum: 1
        },
        typeList: [],
        startX: 0, // 触摸开始时的x坐标
        startY: 0, // 触摸开始时的Y坐标
        startTimeTouch : 0, // 触摸开始时的Y坐标
        dwhref: false,
        isLoadMore: false,
        isLoading: false,
        loadStatus: 'loadmore',
        tableData: [],
        totalCount: 1,
        waitTypeList: [],
        horizontal: 'right',
        pattern: {
          icon:'checkmarkempty',
          color: '#7A7E83',
          backgroundColor: '#fff',
          selectedColor: '#409eff',
          buttonColor: '#409eff',
          iconColor: '#fff'
        },
      }
    },
    onBackPress() {
      if (this.$refs.fab.isShow) {
        this.$refs.fab.close()
        return true
      }
      return false
    },
    onLoad(options) {
      this.listSysDict()
      if (options) {
        this.backUrl = options.backUrl ? options.backUrl : '';
        this.baseMsgCount = options.baseMsgCount ? options.baseMsgCount : '';
        if (this.baseMsgCount == '0'){
          this.queryParam.waitType =''
          this.current = 1
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
            this.tabX(resdata)
          } else if (dirvalX < 0){
            this.current < this.list2.length -1 ? this.current ++ : ''
            let resdata = this.list2[this.current]
            this.tabX(resdata)
          }
        }
      },
      openPopup(e) {
        this.$refs[e].open();
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
        let url = '/subPages/pages/other/otherAdd?type=' + type
        if (id) {
          url = url + '&id=' + id
        }
        this.$navigateTo(url)
      },
      gotoDetail(item) {
        let url = ''
        if (item.inventoryId && !item.orderId) {
          url = '/pages/store/index?backUrl=/pages/index/baseMsg&current=1&today=7&actNo=' + item.actNo
        }
        if (item.type== 12 || item.type== 3  || item.type== 10){
          url = '/pages/order/index?backUrl=/pages/index/baseMsg&current=1&status=3'
        }
        if (url) {
          this.$navigateTo(url)
        }
      },
      getData2() {
        this.$request({
          url: '/gw/op/v1/goodsOrder/getBaseMsgCount',
          method: 'get'
        }).then(res => {
          if (res.subCode === 1000) {
            // this.baseMsgCount = res.data
            this.list2[0].badge.value= res.data
            if (res.data) {
              this.showTab = true
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
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
      chooseType(waitType) {
        this.current = 1
        for (let i = 0; i < this.list2.length; i++) {
          if (this.list2[i].waitType == waitType ){
            this.current = i
          }
        }
        this.queryParam.waitType = waitType
        this.search1()
      },
      // storeAdd(goodsId) {
      //   let url = '/subPages/pages/store/storeAdd?goodsId=' + goodsId
      //   this.$navigateTo(url)
      // },
      // jumpactNo(actNo) {
      //   let url = '/pages/store/index?backUrl=/pages/goodsBase/index&actNo=' + actNo
      //   this.$navigateTo(url)
      // },
      updateAllStatus() {
        var _this = this;
        uni.showModal({
          title: '',
          confirmColor: '#409eff',
          content: '是否全部已办',
          success: function (res) {
            if (res.confirm) {
              _this.$request({
                url: '/gw/op/v1/baseMsg/updateAllStatus',
                method: 'get'
              }).then(res => {
                _this.$toast(res.subMsg)
                if (res.subCode === 1000) {
                  _this.search1()
                }
              })
              // let data ={}
              // data.id = id
              // _this.$request({
              //   url: '/gw/op/v1/baseMsg/status',
              //   method: 'put',
              //   data: data
              // }).then(res => {
              //   _this.$toast(res.subMsg)
              //   if (res.subCode === 1000) {
              //     _this.search1()
              //   }
              // })
            }
          }
        });
      },
       updateOneStatus(id) {
        var _this = this;
        uni.showModal({
          title: '',
          confirmColor: '#409eff',
          content: '是否已办',
          success: function (res) {
            if (res.confirm) {
              let data ={}
              data.id = id
              _this.$request({
                url: '/gw/op/v1/baseMsg/status',
                method: 'put',
                data: data
              }).then(res => {
                _this.$toast(res.subMsg)
                if (res.subCode === 1000) {
                  _this.search1()
                }
              })
            }
          }
        });
      },
      // updateStatus(id) {
      //   let data ={}
      //   data.id = id
      //   this.$request({
      //     url: '/gw/op/v1/baseMsg/status',
      //     method: 'put',
      //     data: data
      //   }).then(res => {
      //     this.$toast(res.subMsg)
      //     if (res.subCode === 1000) {
      //       this.search1()
      //     }
      //   })
      // },
      getPage() {
        this.isLoading = true
        this.$request({
          url: '/gw/op/v1/baseMsg',
          method: 'get',
          data: this.queryParam
        }).then(res => {
          this.isLoading = false
          if (res.subCode === 1000) {
            this.getData2()
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
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
        this.typeList = sysDictList.filter(item => item.typeValue == 52)
        this.waitTypeList = sysDictList.filter(item => item.typeValue == 53)
      },
      search() {
        if (!this.queryParam.name) {
          this.$toast('请输入名称')
          return
        }
        this.queryParam.pageNum = 1
        this.getPage()
      },
      search2() {
        this.tableData = []
        this.queryParam.pageNum = 1
        this.isLoadMore = false
        this.isShowDialog2 = false
        this.getPage()
      },
      search1() {
        this.tableData = []
        this.queryParam.pageNum = 1
        this.isLoadMore = false
        this.getPage()
      },
      resetHandle() {
        this.queryParam = {
          type: '',
          waitType: '1',
          userId: '',
          title: '',
          content: '',
          uniPushCid: '',
          requestId: '',
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
        this.current = item.index
        this.queryParam.waitType = item.waitType
        this.search1()
      },
      tabX(item) {
        this.queryParam.waitType = item.waitType
        this.search1()
      },
      preventHandler() {
        return
      },
      // fabClick() {
      //   this.$navigateTo('/pages/goodsBase/scanCode')
      // },
    }
  };
</script>

<style>
  @import '@/assets/index/style.css';

  /*列表*/
  .msg_table {
    padding: 2.4vw 1.2vw;
    background: #ffffff;
    border-bottom: 7px solid #f4f3f8;
    padding-right: 3%;
    padding-left: 3%;
    font-size: 13px;
    color: #8a8a8a;
  }
  .fab-circle-icon {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    font-weight: 200;
    margin-bottom: 10px;
  }
</style>
