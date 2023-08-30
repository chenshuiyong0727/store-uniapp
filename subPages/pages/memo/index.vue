<template>
  <view>
    <u-navbar title="备忘录">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <image class="back_icon_0" :src="fileUrl +'/static/img/back3.png'"></image>
      </view>
    </u-navbar>
    <view class="fenlei_top" style="display: flex;">
      <view style="width: 83vw" class="baisebeijing">
        <u--input
            class="searchInput"
            prefixIcon="search"
            placeholder="搜索名称"
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
        <image v-if="queryParam.dateType || queryParam.type"  :src="fileUrl +'/static/img/search.png'"></image>
        <image v-else  :src="fileUrl +'/static/img/search_no.png'"></image>
      </view>
    </view>

    <view @touchmove.stop.prevent="preventHandler">
      <u-popup :show="isShowDialog2" @close="isShowDialog2 = !isShowDialog2"  :duration="100" mode="right">
        <view  style="height: 90vh;">
          <scroll-view  scroll-y="true"  class="saixuanquyu">
            <view class="saixuanquxiang" style="margin-top: 30px">
              <view>
                <text class="zitijiachu zihao14">
                  类型
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
            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  日历类型
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in dateTypeList"
                      :key="index"
                      class="saixuanxuanzhezhong julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.dateType = item.fieldValue;search1();">
                    <text :class="queryParam.dateType == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
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
        <view style="margin-top: 10px;" class="dingdans_con_other bt1" @click="goDetail(item.id , 1)">
          <view class="dingdans_top_common_other_left">
            <text>时间：</text>
          </view>
          <view class="dingdans_top_common_other">
            <text>{{item.happenTime }}</text>
          </view>
        </view>
        <view class="dingdans_con_other bt1" @click="goDetail(item.id , 1)">
          <view class="dingdans_top_common_other_left">
            <text>类型：</text>
          </view>
          <view class="dingdans_top_common_other">
            <text>{{ item.type | dictToDescTypeValue(49) }}</text>
          </view>
        </view>
        <view class="dingdans_con_other bt1" @click="goDetail(item.id , 1)">
          <view class="dingdans_top_common_other_left">
            <text>日历类型：</text>
          </view>
          <view class="dingdans_top_common_other">
            <text>{{ item.dateType | dictToDescTypeValue(50) }}</text>
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
        isShowDialog2: false,
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
          dateType: '',
          name: '',
          pageSize: 10,
          pageNum: 1
        },
        typeList: [],
        dateTypeList: [],
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
      goDetail(id, type) {
        let url = '/subPages/pages/memo/memoAdd?type=' + type
        if (id) {
          url = url + '&id=' + id
        }
        this.$navigateTo(url)
      },
      getPage() {
        this.isLoading = true
        this.$request({
          url: '/gw/op/v1/memo',
          method: 'get',
          data: this.queryParam
        }).then(res => {
          this.isLoading = false
          if (res.subCode === 1000) {
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
        this.typeList = sysDictList.filter(item => item.typeValue == 49)
        this.dateTypeList = sysDictList.filter(item => item.typeValue == 50)
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
          dateType: '',
          name: '',
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
  .fab-circle-icon {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    font-weight: 200;
    margin-bottom: 12px;
  }
</style>
