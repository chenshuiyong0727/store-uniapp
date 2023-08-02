<template>
  <view>
    <u-navbar title="其他收支">
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
        <image src="../../static/img/search.png"></image>
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
    <view v-show="tableData.length" style="padding: 10px;">
      <u-loadmore :status="loadStatus"/>
    </view>
    <!--    <view slot="top" class="mint-loadmore-top">-->
    <!--      <text v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">松手释放↓</text>-->
    <!--      <text v-show="topStatus === 'loading'">加载中</text>-->
    <!--    </view>-->
    <!--    <view slot="bottom" class="mint-loadmore-bottom">-->
    <!--      <text-->
    <!--          v-if="bottomStatus !== 'loading'"-->
    <!--          :class="{ 'rotate': bottomStatus === 'drop' }"-->
    <!--      >松手释放↑</text>-->
    <!--      <text v-if="bottomStatus === 'loading'">加载中</text>-->
    <!--    </view>-->
    <!--    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">-->
    <!--      <view class="imageShow">-->
    <!--        <img :src="$fileUrl + imageZoom" alt="" width="100%" height="100%">-->
    <!--      </view>-->
    <!--    </view>-->
    <u-empty
        v-if="!tableData.length && !isLoading"
        mode="list"
        marginTop="50"
        textSize="16"
        textColor="#8a8a8a"
        :icon="$fileUrl +'/static/operateSteps/empity_7.png'">
    </u-empty>
  </view>
</template>
<script>
  // import Baseline from '@/common/_baseline.vue'
  // import Footer from '@/common/_footer.vue'
  // import { goodsOtherApi } from '@/api/goodsOther'

  export default {
    components: {
      // 'v-baseline': Baseline,
      // 'v-footer': Footer
    },
    name: "HelloWorld",
    data() {
      return {
        orderData2: '',
        showFrom: false,
        showTo: false,
        show_sx_type: false,
        isShowDialog2: false,
        emtityMsg: '',
        pictureZoomShow: false,
        imageZoom: '',
        // fileUrl: fileUrl,
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
      // this.keyupSubmit()

    },
    onPullDownRefresh() {
      this.resetHandle()
      uni.stopPullDownRefresh()

      //停止下拉刷新效果的api，如果发现进入刷新状态无法停止，可以用这个
    },
    onReachBottom() {
      // console.info(1)
      // alert(1)
      // if(this.totalCount <= this.queryParam.pageSize) {
      //   return ;
      // }
      if (this.isLoadMore) {  //此处判断，上锁，防止重复请求
        this.loadStatus = 'loading';
        this.queryParam.pageNum++;
        this.getPage()
      }
    },
    methods: {
      /**
       * 不同行的不同菜单点击事件
       *
       * @param {Object} action 第一个参数必须传入“$event” | 点击了哪个按钮 | 传入options的value
       * @param {Number} rowId 第二个参数随意，可以是行ID等
       */
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
              console.info(this.totalCount)
              console.info(this.tableData.length)
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
          console.info(this.isLoadMore)
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
