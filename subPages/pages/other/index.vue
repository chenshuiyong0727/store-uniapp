<template>
  <view>
    <u-navbar title="其他收支">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <image class="back_icon" :src="fileUrl +'/static/img/back3.png'"></image>
      </view>
    </u-navbar>
    <view class="fenlei_top" style="display: flex;">
      <view style="width: 83vw" class="baisebeijing">
        <u--input
            class="searchInput"
            prefixIcon="search"
            placeholder="搜索商品名称"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            v-model="queryParam.name"
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

    <view @touchmove.stop.prevent="preventHandler">
      <u-popup :show="isShowDialog2" @close="isShowDialog2 = !isShowDialog2"  :duration="100" mode="right">
        <view  style="height: 90vh;">
          <scroll-view  scroll-y="true"  class="saixuanquyu">

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  品牌
                </text>
              </view>
              <view class="julishang10">
                <u--input
                    class="saixuanInput"
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
                  <image  class="hengtupian" :src="fileUrl +'/static/img/heng.png'"></image>
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
                  类型
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
                确定（{{totalCount}} 条记录）
              </text>
            </u-button>
          </view>
        </view>
      </u-popup>
    </view>
    <u-picker :show="show_sx_type" :columns="columns" @cancel="show_sx_type= false"
              @confirm="confirm_sx_type" keyName="fieldName"></u-picker>
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

    <view class="julibiaoti2">
      <view class="dingdans_item_other" v-for="(item,index) in tableData" :key="index">
        <view class="dingdans_top_other zuoyouduiqi">
          <view @click="goDetail(item.id , 1)">
            <strong class="dingdans_con_other_strong"> {{item.name}} </strong>
          </view>
          <view style="margin-bottom: 3px;">
            <rudon-rowMenuDotDotDot :localdata="optionsOp" @change="menuAction1($event,item.id)">
              <text class="dw-button-common">操作</text>
            </rudon-rowMenuDotDotDot>
          </view>
        </view>
        <view class="dingdans_con_other bt1">
          <view class="dingdans_top_common_other_left">
            <text>类型：</text>
          </view>
          <view class="dingdans_top_common_other">
            <text>{{ item.type | dictToDescTypeValue(39) }}</text>
          </view>
        </view>
        <view style="margin-top: 10px;" class="dingdans_con_other bt1">
          <view class="dingdans_top_common_other_left">
            <text>金额：</text>
          </view>
          <view class="dingdans_top_common_other">
            <text>{{ item.price }}</text>
          </view>
        </view>
        <view style="margin-top: 10px;" class="dingdans_con_other bt1">
          <view class="dingdans_top_common_other_left">
            <text>时间：</text>
          </view>
          <view class="dingdans_top_common_other">
            <text>{{item.createTime |formateTime }}</text>
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
    <view>
      <uni-fab ref="fab" :pattern="pattern"  horizontal="right" @fabClick="goDetail(null, 3)" />
    </view>
  </view>
</template>
<script>

  export default {

 data() {
      return {
        fileUrl: this.$fileUrl,
        pattern: {
          color: '#7A7E83',
          backgroundColor: '#fff',
          selectedColor: '#409eff',
          buttonColor: '#409eff',
          iconColor: '#fff'
        },
        orderData2: '',
        dateCurrent: parseInt(new Date().getTime()),
        showFrom: false,
        showTo: false,
        show_sx_type: false,
        isShowDialog2: false,
        emtityMsg: '',
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
        queryParam: {
          type: '',
          typeStr: '',
          actNo: '',
          name: '',
          brand: '',
          remark: '',
          priceFrom: '',
          priceTo: '',
          createTimeFrom: '',
          createTimeTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          pageSize: 10,
          pageNum: 1
        },
        typeList: [],
        columns: [],
        isLoading: false,
        isLoadMore: false,
        loadStatus: 'loadmore',
        tableData: [],
        totalCount: 1
      }
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
      getPage() {
        this.isLoading = true
        this.emtityMsg = ''
        this.$request({
          url: '/gw/op/v1/goodsOther',
          method: 'get',
          data: this.queryParam
        }).then(res => {
          this.isLoading = false
          if (res.subCode === 1000) {
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.emtityMsg = '暂无相关数据'
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
        this.typeList = sysDictList.filter(item => item.typeValue == 39)
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
          type: '',
          typeStr: '',
          actNo: '',
          name: '',
          brand: '',
          remark: '',
          priceFrom: '',
          priceTo: '',
          createTimeFrom: '',
          createTimeTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          pageSize: 10,
          pageNum: 1
        }
        this.search1()
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
    }
  };
</script>

<style>
  @import '@/assets/index/style.css';
</style>
