<template>
  <view>
    <u-navbar title="商品">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view class="u-nav-slot" style="font-size: 15px;" slot="right">
        <rudon-rowMenuDotDotDot :localdata="options" @change="menuAction($event)">
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
            v-model="queryParam.actNo"
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
            itemStyle="padding-left: 15px; padding-right: 15px; height:44px;"
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
      <view class="dingdans_item_dw"
            v-for="(item,index) in tableData"
            :key="index"
      >
        <view class="dingdans_con_dw">
          <view :src="item.img" class="dingdans_con_left_dw"
               @click="avatarShow(item.img)">
            <image mode="widthFix" :src="item.img" ></image>
            <p class="mark_dw">
              <text class="text_dw">
                {{ item.type | dictToDescTypeValue(20221108) }}
              </text>
            </p>
          </view>
          <view class="diangdans_con_right_dw">
            <view class="dingdans_con_right_top_dw" @click="goodsDetail(item.id, 1) ">
              <text>
                {{item.name | sizeFilterNum(38) }}
              </text>
            </view>
            <view class="dingdans_con_right_top_dw_1 xianglian">
              <text @click="jumpactNo(item.actNo)">
              {{item.actNo}}
              </text>
              <image @click="$copyUrl(item.actNo)" class="fuzhitupian"
                     src="../../static/img/copy.png"></image>
            </view>
            <view class="dingdans_con_right_top_dw_2" style="margin-bottom: -10px;">
              <view  v-if="item.brand">
                   <text  class="dingdans_con_dw_address">
                    {{item.brand}}
                  </text>
              </view>
              <view class="dingdans_top_right_dw">
                <view class="dingdans_con_right_down_2_1">
                  <rudon-rowMenuDotDotDot :localdata="optionsOp" @change="menuAction1($event,item.id)">
                    <text class="dw-button-common">操作</text>
                  </rudon-rowMenuDotDotDot>

<!--                  <el-dropdown trigger="click" style="margin-left: 1px;">-->
<!--                    <button-->
<!--                        class="dw-button-common">操作-->
<!--                    </button>-->
<!--                    <el-dropdown-menu slot="dropdown" >-->
<!--                      <el-dropdown-item type="text" @click.native="storeAdd(item.id)">选择</el-dropdown-item>-->
<!--                      <el-dropdown-item type="text" @click.native="gotoDw(item.spuId)">得物</el-dropdown-item>-->
<!--                      <el-dropdown-item type="text" @click.native="goodsDetail(item.id,1)">详情</el-dropdown-item>-->
<!--                    </el-dropdown-menu>-->
<!--                  </el-dropdown>-->
                </view>
              </view>
            </view>
          </view>
        </view>
        <!--底部-->
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
        <image :src="imageZoom" mode="widthFix"  class="showImg"></image>
      </view>
    </view>
    <view>
      <uni-fab ref="fab" :pattern="pattern"  :horizontal="horizontal" @fabClick="fabClick" />
    </view>
  </view>
</template>
<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        showFrom: false,
        showTo: false,
        show_sx_type: false,
        emtityMsg: '',
        current: 0,
        pictureZoomShow: false,
        imageZoom: '',
        options: [
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
        columns: [],
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
    mounted() {
      this.getPage()
      this.listSysDict()
      // this.keyupSubmit()

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
        console.info(e)
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
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({ path: '/scanCode', query: { id, type } })
      },
      goodsDetail(id, type) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({ path: '/goodsDetail', query: { id, type } })
      },
      gotoDw(spuId) {
        if (!spuId){
          return
        }
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId=";
        window.location.href = url + spuId;
      },
      storeAdd(goodsId) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({ path: '/storeAdd', query: { goodsId } })
      },
      jumpactNo(actNo) {
        this.isBack = true
        this.curScrollTop = this.$refs.hello.scrollTop
        this.$router.push({ path: '/store', query: { actNo } })
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
        this.columns.push(this.typeList)
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
          type: '',
          typeStr: '',
          actNo: '',
          name: '',
          brand: '',
          remark: '',
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
        console.info(item)
        this.queryParam.type = item.type
        this.search1()
      },
      fabClick() {
        uni.showToast({
          title: '点击了悬浮按钮',
          icon: 'none'
        })
      },
    }
  };
</script>

<style>
  @import '@/assets/index/style.css';
</style>
