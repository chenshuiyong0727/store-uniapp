<template>
  <view>
    <u-navbar title="Nike" bgColor="#f3faff">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <image class="back_icon_0" :src="fileUrl +'/static/img/back3.png'"></image>
      </view>
    </u-navbar>
    <view class="fenlei_top_tab" style="display: flex;">
      <view style="width: 94vw">
        <u--input
            class="searchInputW"
            prefixIcon="search"
            placeholder="请输入货号/商品名/价格"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            v-model="queryParam.keyword"
            prefixIconStyle="font-size: 24px;color:#c0c4cc"
            :show-action="false"
            @change="search1"
            clearable
        >
        </u--input>
      </view>
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
            itemStyle="padding-left: 15px; padding-right: 15px; height:44px;"
        >
        </u-tabs>
      </view>
    </view>
    <view class="filterquyu">
      <view class="width80 zuoyouduiqi">
        <view @click="isShowSort = !isShowSort ;isShowDialog2 =false ;">
          <text :class="sortName != '排序' ? 'color-url': ''">{{ sortName}}</text>
          <image v-if="!isShowSort && sortName == '排序'" class="paixutupian" :src="fileUrl +'/static/img/tab_down.png'"></image>
          <image v-if="!isShowSort && sortName != '排序'" class="paixutupian" :src="fileUrl +'/static/img/tab_down_url.png'"></image>
          <image v-if="isShowSort && sortName != '排序'" class="paixutupian" :src="fileUrl +'/static/img/tab_up_url.png'"></image>
          <image v-if="isShowSort && sortName == '排序'" class="paixutupian" :src="fileUrl +'/static/img/tab_up.png'"></image>
        </view>
        <view
            v-if="queryParam.priceFrom
                   || queryParam.priceTo
                   || queryParam.profitsFrom
                   || queryParam.profitsTo
                   || queryParam.numFrom
                   || queryParam.numTo
                   || queryParam.sevenSaleCountFrom
                   || queryParam.sevenSaleCountTo
                    "
            @click="isShowDialog2 = !isShowDialog2; isShowSort= false;">
          <text class="color-url">筛选</text>
          <image  class="shaixuantupian" :src="fileUrl +'/static/img/search.png'"></image>
        </view>
        <view v-else @click="isShowDialog2 = !isShowDialog2; isShowSort= false;">
          <text>筛选</text>
          <image  class="shaixuantupian"  :src="fileUrl +'/static/img/search_no.png'"></image>
        </view>
      </view>
    </view>
    <view></view>
    <view  @touchmove.stop.prevent="moveHandle" @click="isShowSort = !isShowSort"  v-if="isShowSort" class="mask">
    </view>
    <view class="paixudiv" v-if="isShowSort" style="height: 43vh;">
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
    <view @touchmove.stop.prevent="preventHandler">
      <u-popup :show="isShowDialog2" @close="isShowDialog2 = !isShowDialog2"  :duration="100" mode="right">
        <view style="height: 90vh;">
          <scroll-view scroll-y="true" class="saixuanquyu">
            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  价格
                </text>
              </view>
              <view class="julishang10 xianglian saixuanshijian">
                <view >
                  <u--input
                      class="searchInputFilter"
                      placeholder="最低价"
                      @change="search1"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.priceFrom"
                      type="digit"
                      clearable
                  ></u--input>
                </view>
                <view>
                  <image  class="hengtupian" :src="fileUrl +'/static/img/heng.png'"></image>
                </view>
                <view  >
                  <u--input
                      class="searchInputFilter"
                      placeholder="最高价"
                      @change="search1"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.priceTo"
                      type="digit"
                      clearable
                  ></u--input>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  利润
                </text>
              </view>
              <view class="julishang10 xianglian saixuanshijian">
                <view >
                  <u--input
                      class="searchInputFilter"
                      placeholder="最低利润"
                      @change="search1"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.profitsFrom"
                      type="digit"
                      clearable
                  ></u--input>
                </view>
                <view>
                  <image  class="hengtupian" :src="fileUrl +'/static/img/heng.png'"></image>
                </view>
                <view  >
                  <u--input
                      class="searchInputFilter"
                      placeholder="最高利润"
                      @change="search1"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.profitsTo"
                      type="digit"
                      clearable
                  ></u--input>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  库存
                </text>
              </view>
              <view class="julishang10 xianglian saixuanshijian">
                <view >
                  <u--input
                      class="searchInputFilter"
                      placeholder="最低库存"
                      @change="search1"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.numFrom"
                      type="number"
                      clearable
                  ></u--input>
                </view>
                <view>
                  <image  class="hengtupian" :src="fileUrl +'/static/img/heng.png'"></image>
                </view>
                <view  >
                  <u--input
                      class="searchInputFilter"
                      placeholder="最高库存"
                      @change="search1"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.numTo"
                      type="number"
                      clearable
                  ></u--input>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  销量
                </text>
              </view>
              <view class="julishang10 xianglian saixuanshijian">
                <view >
                  <u--input
                      class="searchInputFilter"
                      placeholder="最低销量"
                      @change="search1"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.sevenSaleCountFrom"
                      type="number"
                      clearable
                  ></u--input>
                </view>
                <view>
                  <image  class="hengtupian" :src="fileUrl +'/static/img/heng.png'"></image>
                </view>
                <view  >
                  <u--input
                      class="searchInputFilter"
                      placeholder="最高销量"
                      @change="search1"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.sevenSaleCountTo"
                      type="number"
                      clearable
                  ></u--input>
                </view>
              </view>
            </view>
            <view class="saixuanquxiang">
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
                    <text
                        :class="queryParam.type == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">
                      {{item.fieldName}}
                    </text>
                  </u-button>
                </view>
              </view>
            </view>
          </scroll-view>
          <view class="baisebeijing shuipingjuzhong" style="position:fixed;bottom:0;width: 80vw;">
            <u-button style="width: 20vw; margin: 5px"
                      @click=" isShowDialog2 = false;resetSort();resetHandle()">
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

    <view
        style="height: 100vh"
        @touchstart="onTouchStart" @touchend="handleTouchend">
      <view class="julibiaoti3">
        <view class="dingdans_item_dw"
              v-for="(item,index) in tableData"
              :key="index"
        >
          <view class="dingdans_con_dw">
            <view  class="dingdans_con_left_dw"
                 @click="avatarShow(item.img)">
              <image mode="widthFix" :src="item.img" ></image>
              <p class="mark_dw">
              <text class="text_dw">
                {{ item.type | dictToDescTypeValue(20221108) }}
              </text>
              </p>
            </view>
            <view class="diangdans_con_right_dw">
              <view class="dingdans_con_right_top_dw" @click="goodsDetail(item.goodsId, 1,item.spuId)">
                <text class="chaochu"  style="width: 65vw">
                  {{item.goodsName }}
                </text>
              </view>
              <view class="dingdans_con_right_top_dw_1 zuoyouduiqi">
                <view class="xianglian">
                   <text @click="jumpactNo(item.actNo)">
              {{item.actNo}}
              </text>
                  <image @click="$copyUrl(item.actNo)" class="fuzhitupian"
                         :src="fileUrl +'/static/img/copy.png'"></image>
                </view>
                <view class="jiagejiage">
                  <text style="font-weight: 400;">库存</text>
                  <text :class="item.num > 50 ? 'color-danger' : ''" >{{item.num}} </text>
                </view>
              </view>
              <view class="dingdans_con_right_top_dw_1 zuoyouduiqi" style="font-weight: 400;">
                <view class="jiagejiage">
                  价格
                  <text  class="color-danger" >{{item.price}} </text>
                  <text style="text-decoration:line-through;color: #7a7a7a;" >{{item.price/0.65  | numFilter0 }} </text>
                </view>
                <view class="jiagejiage">
                  周均价
                  <text class="color-danger" >{{item.thisTimeThePrice}} </text>
                  <text style="text-decoration:line-through;color: #7a7a7a;" >{{item.sevenAveragePrice }} </text>
                </view>
              </view>
            </view>
          </view>

          <!--底部-->
          <view class="dingdans_bottom_dw">
            <view class="dingdans_top_left_dw jiagejiage">
              <text v-if="item.thisTimeProfits"> 利润</text>
              <text :class="item.thisTimeProfits > 50 ? 'color-danger' : ''">{{item.thisTimeProfits }} </text>
              <text v-if="item.sevenSaleCount">, 周销量</text>
              <text :class="item.sevenSaleCount > 10 ? 'color-danger' : ''">{{item.sevenSaleCount }} </text>
              <text v-if="item.thisTimeProfits <= 0" style="margin-left: 20px;">垃圾</text>
              <strong v-if="item.thisTimeProfits >= 50 && item.sevenSaleCount >= 10 && item.num >= 10"
                      class="color-danger" style="margin-left: 5px;font-size: 20px;">冲冲冲</strong>
            </view>
            <!--          操作栏-->
            <view class="dingdans_top_right_dw">
              <view class="dingdans_con_right_down_2_1">
                <text @click="gotoDw(item.spuId)"
                        class="dw-button-common">得物
                </text>
              </view>
            </view>
          </view>
          <!--底部-->
        </view>
      </view>

      <view v-show="tableData.length" class="meiyougengduo">
        <u-loadmore fontSize="18" color="#a6a6a6" nomoreText="最硬球鞋" :status="loadStatus"/>
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
    <view>
      <uni-fab ref="fab" :pattern="pattern" horizontal="right" @fabClick="fabClick"/>
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
        showSd: false,
        isShowSort: false,
        sortName:'排序',
        queryParam: {
          type: '',
          sort: 1,
          keyword: '',
          priceFrom: '',
          priceTo: '',
          profitsFrom: '',
          profitsTo: '',
          numFrom: '',
          numTo: '',
          sevenSaleCountFrom: '',
          sevenSaleCountTo: '',
          pageSize: 10,
          pageNum: 1
        },
        typeList: [],
        startX: 0, // 触摸开始时的x坐标
        startY: 0, // 触摸开始时的Y坐标
        startTimeTouch: 0, // 触摸开始时的Y坐标
        dwhref: false,
        isLoadMore: false,
        isLoading: false,
        loadStatus: 'loadmore',
        tableData: [],
        totalCount: 1,
        horizontal: 'right',
        pattern: {
          icon:'fire-filled',
          color: '#7A7E83',
          backgroundColor: '#fff',
          selectedColor: '#409eff',
          buttonColor: '#409eff',
          iconColor: '#fff'
        },
        sortList: [
          { fieldValue: '', fieldName: '请选择排序' },
          { fieldValue: 1, fieldName: '利润降序' },
          { fieldValue: 2, fieldName: '利润升序' },
          { fieldValue: 3, fieldName: '销量降序' },
          { fieldValue: 4, fieldName: '销量升序' },
          { fieldValue: 5, fieldName: '库存降序' },
          { fieldValue: 6, fieldName: '库存升序' },
          { fieldValue: 7, fieldName: '价格降序' },
          { fieldValue: 8, fieldName: '价格升序' }
        ],
      }
    },
    onBackPress() {
      if (this.$refs.fab.isShow) {
        this.$refs.fab.close()
        return true
      }
      return false
    },
    mounted() {
      this.getPage()
      this.listSysDict()

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
          }
          ;
          // 判断滑动方向
          if (dirvalX > 0) {
            this.current > 0 ? this.current-- : ''
            let resdata = this.list2[this.current]
            this.tabX(resdata)
          } else if (dirvalX < 0) {
            this.current < this.list2.length - 1 ? this.current++ : ''
            let resdata = this.list2[this.current]
            this.tabX(resdata)
          }
        }
      },
      openPopup(e) {
        this.$refs[e].open();
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
        if (!spuId) {
          return
        }
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId=" + spuId;
        // #ifdef APP-PLUS
        plus.runtime.openURL(url) //这里默认使用外部浏览器打开而不是内部web-view组件打开
        // #endif
        // #ifdef H5
        window.open(url)
        // #endif
      },
      chooseType(type) {
        for (let i = 0; i < this.list2.length; i++) {
          if (this.list2[i].type == type) {
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
        let url = '/pages/store/index?backUrl=/subPages/pages/goodsBase/act&actNo=' + actNo
        this.$navigateTo(url)
      },
      getPage() {
        this.isLoading = true
        this.emtityMsg = ''
        this.$request({
          url: '/gw/op/v1/goodsAct',
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
          type: '',
          sort: 1,
          keyword: '',
          priceFrom: '',
          priceTo: '',
          profitsFrom: '',
          profitsTo: '',
          numFrom: '',
          numTo: '',
          sevenSaleCountFrom: '',
          sevenSaleCountTo: '',
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
      chooseSort(item) {
        this.isShowSort = false
        this.queryParam.sort = item.fieldValue
        this.sortName = item.fieldName
        this.search1()
      },
      resetSort() {
        this.isShowSort = false
        this.queryParam.sort = ''
        this.sortName ='排序'
      },
      fabClick() {
        this.showSd =  !this.showSd
        if (this.showSd){
          this.queryParam.profitsFrom = 50
          this.queryParam.sevenSaleCountFrom = 10
          this.queryParam.numFrom = 10
          this.queryParam.pageNum = 1
          this.pattern = {
            icon:'fire',
            color: '#7A7E83',
            backgroundColor: '#fff',
            selectedColor: '#b8bbbf',
            buttonColor: '#b8bbbf',
            iconColor: '#fff'
          }
        } else{
          this.queryParam.profitsFrom = ''
          this.queryParam.sevenSaleCountFrom = ''
          this.queryParam.numFrom = ''
          this.queryParam.pageNum = 1
          this.pattern = {
            icon:'fire-filled',
            color: '#7A7E83',
            backgroundColor: '#fff',
            selectedColor: '#409eff',
            buttonColor: '#409eff',
            iconColor: '#fff'
          }
        }
        this.search2()
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
