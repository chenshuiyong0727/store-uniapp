<template>
  <view class="hello" ref="hello">
    <u-navbar title="其他收支">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view  class="u-nav-slot" style="font-size: 15px;" slot="right">
        <rudon-rowMenuDotDotDot :localdata="options" @change="menuAction($event, '10086')">
          <image style="height: 25px;width: 25px" src="../../static/img/slh.png"></image>
        </rudon-rowMenuDotDotDot>
      </view>
    </u-navbar>
    <view class="fenlei_top zuoyouduiqi">
      <view style="width: 83vw">
        <u--input
            class="searchInput"
            prefixIcon="search"
            placeholder="搜索商品名称"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            v-model = "queryParam.name"
            prefixIconStyle="font-size: 24px;color:#c0c4cc"
            :show-action="false"
            @change="search1"
            clearable
        >
        </u--input>
      </view>
      <view class="fenlei_top_right" @click="isShowDialog2 = true">
        <image src="../../static/img/search.png" style="height:30px; width:30px;" ></image>
      </view>
    </view>
    <view>
      <u-popup :show="isShowDialog2" @close="close" mode="bottom">
        <view style="width: 90vw;margin-left: 5vw;">
          <u-navbar title="筛选" :fixed="false" :border="true">
            <view  @click="resetHandle" style="font-size: 15px;" class="u-nav-slot" slot="left">
              <text>关闭</text>
            </view>
            <view  @click="search1" class="u-nav-slot" style="font-size: 15px;" slot="right">
              <text>确定</text>
            </view>
          </u-navbar>
          <view>
            <u--form>
              <u-form-item  label="类型" borderBottom @click="show_sx_type = true; hideKeyboard()">
                <u--input inputAlign="right" placeholder="请选择类型" disabledColor="#fff" placeholderStyle="font-size: 14px;color:#c0c4cc" v-model="queryParam.typeStr" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label="品牌" borderBottom>
                <u--input inputAlign="right" placeholder="请输入品牌" placeholderStyle="font-size: 14px;color:#c0c4cc" v-model="queryParam.brand" border="none"></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item  label="开始时间" label-width="50vw" borderBottom @click="showFrom = true; hideKeyboard()">
                <u--input inputAlign="right" prefixIcon="calendar" prefixIconStyle="font-size: 20px;color:#c0c4cc" placeholder="请选择开始时间" disabledColor="#fff" placeholderStyle="font-size: 14px;color:#c0c4cc" v-model="queryParam.createTimeFrom" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item  label="结束时间" label-width="50vw" borderBottom @click="showTo = true; hideKeyboard()">
                <u--input  inputAlign="right" prefixIcon="calendar" prefixIconStyle="font-size: 20px;color:#c0c4cc" placeholder="请选择结束时间" disabledColor="#fff" placeholderStyle="font-size: 14px;color:#c0c4cc" v-model="queryParam.createTimeTo" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
            </u--form>
          </view>
        </view>
      </u-popup>
    </view>
    <u-picker :show="show_sx_type" :columns="columns" @cancel="show_sx_type= false" @confirm="confirm_sx_type" keyName="fieldName"></u-picker>
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
          <view @click="goDetail(item.id , 1)" >
            <strong class="dingdans_con_other_strong"> {{item.name}} </strong>
          </view>
          <view>
            <rudon-rowMenuDotDotDot :localdata="optionsOp" @change="menuAction1($event,item.id)">
              <text class="dw-button-common">操作</text>
            </rudon-rowMenuDotDotDot>
          </view>
        </view>
        <view class="dingdans_con_other bt1">
          <view  class="dingdans_top_common_other_left">
            <text>类型：</text>
          </view>
          <view   class="dingdans_top_common_other">
            <text >{{ item.type | dictToDescTypeValue(39) }}</text>
          </view>
        </view>
        <view style="margin-top: 10px;" class="dingdans_con_other bt1">
          <view class="dingdans_top_common_other_left">
            <text>金额：</text>
          </view>
          <view class="dingdans_top_common_other">
            <text >{{ item.price }}</text>
          </view>
        </view>
        <view style="margin-top: 10px;" class="dingdans_con_other bt1">
          <view class="dingdans_top_common_other_left">
            <text>时间：</text>
          </view>
          <view class="dingdans_top_common_other">
            <text >{{item.createTime |formateTime }}</text>
          </view>
        </view>
      </view>
    </view>
    <view slot="top" class="mint-loadmore-top">
      <text v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">松手释放↓</text>
      <text v-show="topStatus === 'loading'">加载中</text>
    </view>
    <view slot="bottom" class="mint-loadmore-bottom">
      <text
          v-if="bottomStatus !== 'loading'"
          :class="{ 'rotate': bottomStatus === 'drop' }"
      >松手释放↑</text>
      <text v-if="bottomStatus === 'loading'">加载中</text>
    </view>
    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <img :src="$fileUrl + imageZoom" alt="" width="100%" height="100%">
      </view>
    </view>
    <view v-if="!tableData.length" class="to-the-bottom-1" >
      <p v-if="emtityMsg">
        <img src="../../static/img/new/empity_7.png" style="width: 60vw;">
      </p>
      <p>
        <text>{{emtityMsg}}</text>
      </p>
    </view>
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
        columns: [
          // [{
          //   label: '雪月夜',
          //   // 其他属性值
          //   id: 2021
          //   // ...
          // }, {
          //   label: '冷夜雨',
          //   id: 804
          // }]
        ],
        topStatus: "",
        bottomStatus: "",
        allLoaded: false,
        tableData: [],
        totalCount: 1
      }
    },
    mounted() {
      this.getPage()
      this.listSysDict()
      // this.keyupSubmit()

    },
    methods: {
      /**
       * 不同行的不同菜单点击事件
       *
       * @param {Object} action 第一个参数必须传入“$event” | 点击了哪个按钮 | 传入options的value
       * @param {Number} rowId 第二个参数随意，可以是行ID等
       */
      menuAction (action, rowId) {
        // 忽略初始化时的传入的空操作
        if (action === '') {
          return
        }
        if ('add' == action){
          this.goDetail(null,3)
        }
        if ('resetHandle' == action){
          this.resetHandle()
        }
      },
      // <el-dropdown-item type="text" @click.native="goDetail(item.id , 1)">查看</el-dropdown-item>-->
      // <!--                  <el-dropdown-item type="text" @click.native="goDetail(item.id ,2)">修改</el-dropdown-item>-->
      menuAction1 (action, rowId) {
        // 忽略初始化时的传入的空操作

        if (action === '') {
          return
        }
        if ('view' == action){
          this.goDetail(rowId,1)
        }
        if ('update' == action){
          this.goDetail(rowId,2)
        }
      },

      cancelFrom() {
        this.showFrom=false
        this.queryParam.createTimeFrom = ''
        this.search1()
      },
      cancelTo() {
        this.showTo=false
        this.queryParam.createTimeTo = ''
        this.search1()
      },
      confirmFrom(e) {
        this.showFrom = false;
        let timeValue =  uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.queryParam.createTimeFrom = timeValue
        this.search1()
      },
      confirmTo(e) {
        this.showTo = false;
        let timeValue =  uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.queryParam.createTimeTo = timeValue
        this.search1()
      },
      confirm_sx_type(e) {
        this.show_sx_type= false
        console.info(e)
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.queryParam.type = fieldValue
        this.queryParam.typeStr = fieldName
        this.search1()
      },
      hideKeyboard() {
        uni.hideKeyboard()
      },
      goDetail(id, type) {
        this.$router.push({ path: '/otherAdd', query: { id, type } })
      },
      getPage() {
        this.emtityMsg = ''
        // goodsOtherApi.page(this.queryParam)
        this.$request({
          url: '/gw/op/v1/goodsOther',
          method: 'get',
          data: this.queryParam
        }).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.allLoaded = true;
              this.emtityMsg = '暂无相关数据'
            } else if (this.totalCount <= this.queryParam.pageSize) {
              this.allLoaded = true;
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
        console.info(this.typeList)
        this.columns.push(this.typeList)
      },
      loadData(p_status) {
        // 第一次加载或者下拉刷新最新数据
        if (p_status === "refresh") {
          this.tableData = [];
        }
        goodsOtherApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            let list =  res.data ? res.data.list : []
            if (list && list.length) {
              for (let i = 0; i < list.length; i++) {
                this.tableData.push(list[i])
              }
              setTimeout(()=>{
                let ht2 = (this.$refs.hello.scrollTop)*1 +475
                this.$refs.hello.scrollTop = ht2
              },100)
            } else {
              this.allLoaded = true;
              this.$toast('没有更多了')
            }
          } else {
            this.$toast(res.subMsg)
            return false
          }
        })
      },
      search() {
        if (!this.queryParam.name ) {
          this.$toast('请输入名称')
          return
        }
        this.queryParam.pageNum = 1
        this.allLoaded = false;
        this.getPage()
      },
      // 日期
      open() {
        console.log('open');
      },
      close() {
        this.isShowDialog2 = false
        console.log('close');
      },
      search1() {
        this.queryParam.pageNum = 1
        this.allLoaded = false;
        this.isShowDialog2 = false
        this.$refs.hello.scrollTop = 0
        this.getPage()
      },
      resetHandle() {
        this.queryParam = {
          type: '',
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
      handleTopChange(p_status) {
        this.topStatus = p_status;
      },
      handleBottomChange(p_status) {
        this.bottomStatus = p_status;
      },
      loadBottom() {
        // 一次下拉加载5条更多数据，使用定时器默认ajax加载
        this.loadData()
        this.queryParam.pageNum++;
        this.$refs.loadmore.onBottomLoaded();
      },
      loadTop() {
        // 默认下拉刷新最新数据
        this.loadData("refresh");
        this.queryParam.pageNum = 0
        this.allLoaded = false;
        this.$refs.loadmore.onTopLoaded();
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

  strong{
    font-weight: 600;
  }
  .mint-button--small {
    display: inline-block;
    font-size: 4vw;
    height: 6vw;
  }
  .dingdans_item {
    padding: 2.4vw 1.2vw;
    background: #ffffff;
    border-bottom: 1vw solid #eee;
    padding-right: 3%;
    padding-left: 3%;
  }

  .dingdans_top {
    font-size: 3.68vw;
    height: 3.88vw;
    line-height: 3.88vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dingdans_con {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1.3vw 0;
  }

  .dingdans_con_left {
    width: 35vw;
    height: 20vw;
    display: flex;
  }

  .dingdans_con_left img {
    width: 100%;
    margin: auto;
    border-radius: 10px;
  }

  .diangdans_con_right {
    width: 130vw;
    padding-left: 10px;
  }

  .dingdans_con_right_down {
    margin-top: 1.4vw;
    font-size: 13px;
    margin-bottom: 2vw;
  }
  /*.dingdans_con_right_down_1 {*/
  /*  !*margin-left: 55vw;*!*/
  /*  margin-bottom: -7vw;*/
  /*  font-size: 3.5vw;*/
  /*  margin-top: -1vw;*/
  /*}*/
  /*
   -----分割线---
  */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  /* 这里直接设置 1rem = 50px begin */
  html {
    font-size: 50px;
  }
  /* 这里直接设置 1rem = 50px end */
  html,
  body {
    /*font-family: "微软雅黑";*/
    /*color: #333;*/
    /*background: #fff;*/
  }
  /*ul,*/
  /*li {*/
  /*  list-style: none;*/
  /*}*/
  /* 给要上拉的容器设置 begin */
  .hello {
    background-color: #f3f2f8;
    padding-top: 12vw;
    font-size: 13px;
    height: 100vh;
    overflow-y: auto;
  }
  /* 给要上拉的容器设置 end */
  /*.fl {*/
  /*  float: left;*/
  /*}*/
  /*.fr {*/
  /*  float: right;*/
  /*}*/
  /*.clearfix::before,*/
  /*.clearfix::after {*/
  /*  content: "";*/
  /*  display: block;*/
  /*  overflow: hidden;*/
  /*  clear: both;*/
  /*  visibility: hidden;*/
  /*}*/
  /*li {*/
  /*  background: #fff;*/
  /*}*/
  /*.order-intr {*/
  /*  position: relative;*/
  /*  padding: 0.3rem 0.4rem;*/
  /*  width: calc(100% - 0.6rem);*/
  /*  margin: 0.4rem auto;*/
  /*  border: 0.02rem solid #666;*/
  /*  border-radius: 0.16rem;*/
  /*}*/
  /*.order-intr img {*/
  /*  width: 3rem;*/
  /*  height: 2.4rem;*/
  /*}*/
  /*.title {*/
  /*  margin-left: 0.24rem;*/
  /*  text-align: left;*/
  /*}*/
  /*.title h3 {*/
  /*  font-size: 0.4rem;*/
  /*}*/
  /*.title p {*/
  /*  font-size: 0.3rem;*/
  /*}*/
  /*.price {*/
  /*  position: absolute;*/
  /*  right: 0.3rem;*/
  /*  bottom: 0.3rem;*/
  /*  font-size: 0.5rem;*/
  /*  color: #fe696b;*/
  /*}*/
  .mint-loadmore-top,
  .mint-loadmore-bottom {
    font-size: 0.28rem;
  }





</style>
