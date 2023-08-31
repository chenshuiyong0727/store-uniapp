<template>
  <view>
    <u-navbar title="商品"  bgColor="#f3faff">
      <view @click="goBack" class="u-nav-slot" slot="left">
        <image class="back_icon_0" :src="fileUrl +'/static/img/back3.png'"></image>
      </view>
    </u-navbar>
    <view class="fenlei_top_tab"  style="display: flex;">
      <view style="width: 83vw" class="baisebeijing">
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
      <view class="fenlei_top_right" @click="isShowDialog2 = true">
        <image v-if="queryParam.brand || queryParam.remark || queryParam.type"  :src="fileUrl +'/static/img/search.png'"></image>
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
      <view class="dingdans_item_dw"
            v-for="(item,index) in tableData"
            :key="index"  @click="goodsDetail(item.id) "
      >
        <view class="dingdans_con_dw">
          <view  class="dingdans_con_left_dw">
            <image @click.stop="avatarShow(item.img)" mode="widthFix" :src="item.img" v-if="item.img" ></image>
            <image mode="widthFix" :src="fileUrl+item.imgUrl" @click.stop="avatarShow(fileUrl+item.imgUrl)" style="margin-top: 10px;" v-if="!item.img && item.imgUrl" ></image>
            <p class="mark_dw">
              <text class="text_dw">
                {{ item.type | dictToDescTypeValue(20221108) }}
              </text>
            </p>
          </view>
          <view class="diangdans_con_right_dw">
            <view class="dingdans_con_right_top_dw">
              <text>
                {{item.name}}
              </text>
            </view>
            <view class="dingdans_con_right_top_dw_1 xianglian">
              <text @click.stop="jumpactNo(item.actNo)">
              {{item.actNo}}
              </text>
              <image @click.stop="$copyUrl(item.actNo)" class="fuzhitupian"
                     :src="fileUrl +'/static/img/copy.png'"></image>
            </view>
            <view class="dingdans_con_right_top_dw_2" style="margin-bottom: -10px;">
              <view  v-if="item.brand">
                   <text  class="dingdans_con_dw_address">
                    {{item.brand}}
                  </text>
              </view>
              <view class="dingdans_top_right_dw">
                <view class="dingdans_con_right_down_2_1">
                  <text class="dw-button-common" @click.stop="storeAdd(item.id)">选择</text>
<!--                  <text class="dw-button-common" v-if="item.spuId" style="margin-left: 2vw" @click.stop="gotoDw(item.spuId)">得物</text>-->
                </view>
              </view>
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
        <image :src="imageZoom" mode="widthFix"  class="showImg"></image>
      </view>
    </view>
    <view>
      <uni-fab ref="fab" :pattern="pattern"  horizontal="right"  @fabClick="fabClick" />
    </view>
      <view  @touchmove.stop.prevent="preventHandler">
      <u-popup :show="isShowDialog2" @close="isShowDialog2 = false"  :duration="100" mode="right">
        <view  style="height: 90vh;">
          <scroll-view  enable-flex="true" class="saixuanquyu">
          <view class="saixuanquxiang" style="margin-top: 30px">
            <view>
              <text class="zitijiachu zihao14">
                品牌
              </text>
            </view>
            <view class="julishang10 saixuanInput">
              <u--input
                  placeholder="请输入品牌"
                  placeholderStyle="font-size: 14px;color:#c0c4cc"
                  v-model="queryParam.brand"
                  @change="search1"
                  clearable
              >
              </u--input>
            </view>
          </view>

          <view class="saixuanquxiang" >
            <view>
              <text class="zitijiachu zihao14">
                备注
              </text>
            </view>
            <view class="julishang10 saixuanInput">
              <u--input
                  placeholder="请输入备注"
                  placeholderStyle="font-size: 14px;color:#c0c4cc"
                  v-model="queryParam.remark"
                  @change="search1"
                  clearable
              >
              </u--input>
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
                <u-button color="#f4f3f8" size="small" @click="chooseType(item.fieldValue)">
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
        orderData: '',
        isShowDialog: false,
        orderData1: '',
        isShowDialog1: false,
        orderData2: '',
        isShowDialog2: false,
        list2: [{
          type: '',
          name: '全部'
        }, {
          type: '01',
          name: '男鞋',
        }, {
          type: '02',
          name: '女鞋'
        }, {
          type: '03',
          name: '男女'
        }, {
          type: '11',
          name: '服装'
        }, {
          type: '05',
          name: '大童'
        }, {
          type: '07',
          name: '中童'
        }, {
          type: '04',
          name: '幼童'
        }, {
          type: '06',
          name: '婴童'
        }, {
          type: '20',
          name: '包包'
        }, {
          type: '21',
          name: '帽子'
        }],
        queryParam: {
          id: '',
          type: '',
          typeStr: '',
          actNo: '',
          name: '',
          brand: '',
          remark: '',
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
        horizontal: 'right',
        pattern: {
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
      chooseType(type) {
        for (let i = 0; i < this.list2.length; i++) {
          if (this.list2[i].type == type ){
            this.current = i
          }
        }
        this.queryParam.type = type
        this.search1()
      },
      storeAdd(goodsId) {
        let url = '/subPages/pages/store/storeAdd?goodsId=' + goodsId
        this.$navigateTo(url)
      },
      jumpactNo(actNo) {
        let url = '/pages/store/index?backUrl=/pages/goodsBase/index&actNo=' + actNo
        this.$navigateTo(url)
      },
      getPage() {
        this.isLoading = true
        this.emtityMsg = ''
        // goodsOtherApi.page(this.queryParam)
        this.$request({
          url: '/gw/op/v1/goodsBase',
          method: 'get',
          data: this.queryParam
        }).then(res => {
          this.isLoading = false
          if (res.subCode === 1000) {
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
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
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)
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
          id: '',
          type: '',
          typeStr: '',
          actNo: '',
          name: '',
          brand: '',
          remark: '',
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
        this.queryParam.type = item.type
        this.search1()
      },
      tabX(item) {
        this.queryParam.type = item.type
        this.search1()
      },
      preventHandler() {
        return
      },
      fabClick() {
        this.$navigateTo('/subPages/pages/goodsBase/scanCode')
      },
    }
  };
</script>

<style>
  @import '@/assets/index/style.css';
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
