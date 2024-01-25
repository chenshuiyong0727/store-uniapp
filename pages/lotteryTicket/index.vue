<template>
  <view>
    <u-navbar title="彩票" >
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view class="u-nav-slot" style="font-size: 15px;" slot="right" @click="updateAllStatus">
        <text>结账</text>
      </view>
    </u-navbar>
    <view class="fenlei_top zuoyouduiqi">
      <view class="fenlei_top_left">
        <view @click="showFrom= true">
          <u--input
              style="width: 43vw;"
              class="searchInput"
              readonly="readonly"
              prefixIcon="calendar"
              prefixIconStyle="font-size: 20px;color:#c0c4cc"
              placeholder="开始时间"
              placeholderStyle="font-size: 15px;color:#c0c4cc"
              v-model="queryParam.happenDateFrom"
              clearable
          >
          </u--input>
        </view>
      </view>
      <view>
        <image  class="hengtupianbaobiao1" src="../../static/img/heng.png"></image>
      </view>
      <view class="fenlei_top_left">
        <view @click="showTo= true">
          <u--input
              placeholderStyle="font-size: 15px;color:#c0c4cc"
              style="width: 43vw;margin-left: 4px;"
              class="searchInput"
              readonly="readonly"
              prefixIcon="calendar"
              placeholder="结束时间"
              v-model="queryParam.happenDateTo"
              prefixIconStyle="font-size: 20px;color:#c0c4cc"
              clearable
          >
          </u--input>
        </view>
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
        mode="date"
        :minDate="1646064000000"
        @confirm="confirmTo"
        @cancel="cancelTo"
    ></u-datetime-picker>
    <u-datetime-picker
        title="发生日期"
        :show="showDate"
        v-model="dateCurrent"
        mode="date"
        :minDate="1646064000000"
        @confirm="confirmDate"
        @cancel="cancelDate"
    ></u-datetime-picker>
    <view class="fenlei_top_1_1">
      <view class="store-list-1_1" >

        <view  class="store-list-1-li_123"  :key="index">
          <view class="overview1">
            <p style= "padding-top: 5px;"><strong>总盈亏 </strong></p>
            <p :class="headerData.amout > 0 ? 'color-danger' : 'color-dw'" style="padding-top: 8px"><strong>{{ headerData.amout > 0 ? '+'+ headerData.amout : headerData.amout}}</strong></p>
          </view>
        </view>
        <view  class="store-list-1-li_123"  :key="index">
          <view class="overview1">
            <p style= "padding-top: 5px;"><strong>未结算 </strong></p>
            <p :class="headerData.noSettledAmout > 0 ? 'color-danger' : 'color-dw'"  style="padding-top: 8px"><strong>{{ headerData.noSettledAmout >0 ? '+'+ headerData.noSettledAmout : headerData.noSettledAmout }}</strong></p>
          </view>
        </view>
        <view  class="store-list-1-li_123"  :key="index">
          <view class="overview1">
            <p style= "padding-top: 5px;"><strong>胜率 </strong></p>
            <p style="padding-top: 8px"><strong>{{ headerData.winRate}}</strong></p>
          </view>
        </view>

      </view>
    </view>

    <view>
<!--      <u-popup :show="isShowDialog" @close="isShowDialog != isShowDialog" :duration="100" mode="bottom">-->
        <u-popup :show="isShowDialog" @close="isShowDialog = false"  :duration="0" :closeable="true" mode="center">
          <view style="width: 80vw;margin-left: 5vw;margin-right: 5vw;">
          <u-navbar :title="tabName" :fixed="false" :border="true">
<!--            <view @click="isShowDialog = false" style="font-size: 15px;" class="u-nav-slot" slot="left">-->
<!--              <text>关闭</text>-->
<!--            </view>-->
<!--            <view @click="confirmHandle" class="u-nav-slot" style="font-size: 15px;" slot="right">-->
<!--              <text>确定</text>-->
<!--            </view>-->
<!--          </u-navbar>-->
            <view class="u-nav-slot" slot="left">
            </view>
          </u-navbar>
          <view>
            <u--form>
              <u-form-item label-width="25vw" label="日期" borderBottom>
<!--                <u&#45;&#45;input  disabledColor="#fff" inputAlign="right"-->
<!--                           v-model="requestParam.happenDate" border="none" color="#333333"></u&#45;&#45;input>-->
                <view @click="showDate= true;isShowDialog = false">
                  <u--input
                      style="width: 43vw;"
                      readonly="readonly"
                      prefixIcon="calendar"
                      prefixIconStyle="font-size: 20px;color:#c0c4cc"
                      placeholder="日期"
                      placeholderStyle="font-size: 15px;color:#c0c4cc"
                      v-model="requestParam.happenDate"
                      clearable
                  >
                  </u--input>
                </view>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label-width="25vw" label="金额" borderBottom>
                <u--input  disabledColor="#fff" inputAlign="right"
                           v-model="requestParam.price" border="none" type="digit" color="#333333"></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label="类型" borderBottom @click="show_sx_type = true; $hideKeyboard()">
                <u--input inputAlign="right" placeholder="请选择类型" disabledColor="#fff"
                          placeholderStyle="font-size: 14px;color:#c0c4cc"
                          v-model="requestParam.typeStr" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label-width="25vw"  label="状态" borderBottom @click="show_sx_status = true; $hideKeyboard()">
                <u--input inputAlign="right" placeholder="请选择状态" disabledColor="#fff"
                          placeholderStyle="font-size: 14px;color:#c0c4cc"
                          v-model="requestParam.statusStr" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <view class="shuipingjuzhong">
                <u-button style="width: 50vw; margin: 10px 15px;"  size="small"   type="primary" @click="confirmHandle">
                  <text class="dibuanniuwenzi">确认</text>
                </u-button>
              </view>
            </u--form>
          </view>
        </view>
      </u-popup>
    </view>
    <u-picker :show="show_sx_type" :columns="columns" @cancel="show_sx_type= false"
              @confirm="confirm_sx_type" keyName="fieldName"></u-picker>
    <u-picker :show="show_sx_status" :columns="columnsStatus" @cancel="show_sx_status= false"
              @confirm="confirm_sx_status" keyName="fieldName"></u-picker>

    <view  class="hongbaoquyu1">
      <view  class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <view class="dingdans_top_23">
          <view class="dingdans_top_left" style="     display: flex;
          font-size: 13px;
    justify-content: space-between;
    align-items: center;">
            <view style="width: 33vw;font-size: 14px; margin-left: 2vw">
              <strong> {{item.happenDate}} </strong>
            </view>
            <view  style="width: 15vw">
              <text style="margin-left: 10px"
                    :class="item.price > 0 ? 'color-danger' : 'color-dw'">
                {{item.price > 0 ? '+' + item.price : item.price}}</text>
            </view>
<!--            <view  style="width: 20vw">-->
<!--              <text style="margin-left: 10px"> {{item.type | dictToDescTypeValue(39)}} </text>-->
<!--            </view>-->
            <view  style="width: 15vw">
              <text style="margin-left: 10px"
                    :class="item.status == 2 ? 'color-dw' : ''"
              > {{item.status | dictToDescTypeValue(59)}} </text>
            </view>
            <view  style="width: 30vw; text-align: center">
              <text style="padding: 6px 10px;" class="dw-button-common"@click="tabName='修改';handleClick(item);">修改</text>
              <text style="padding: 6px 10px;margin-left: 5px;  border: 1px solid #F56C6C;
  color: #F56C6C !important;" class="dw-button-common"@click="goDel(item.id);">删除</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-show="tableData.length" style="    padding: 30px;" class="meiyougengduo">
      <u-loadmore fontSize="18"  color="#a6a6a6" nomoreText="最硬球鞋"  loadingText="最硬球鞋" status="nomore"/>
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
      <uni-fab ref="fab" :pattern="pattern"  horizontal="right" @fabClick="tabName='新增'; handleClick1();" />
    </view>
  </view>
</template>
<script>
  import { lotteryTicketApi } from '@/api/lotteryTicket'
  export default {
 data() {
      return {
        dateCurrent: parseInt(new Date().getTime()),
        showFrom: false,
        showDate: false,
        showTo: false,
        fileUrl: this.$fileUrl,
        tabName: '修改',
        isShowDialog: false,
        isShowDialog2: false,
        queryParam: {
          happenDateFrom: '',
          happenDateTo: '',
          type: '',
          status: '',
          pageSize: 100,
          pageNum: 1
        },
        columns: [],
        columnsStatus: [],
        show_sx_type: false,
        show_sx_status: false,
        requestParam: {
          happenDate: '',
          price: '',
          type: 1,
          typeStr: '收入',
          status: 1,
          statusStr: '',
        },
        typeList: [],
        statusList: [],
        tableData: [],
        isLoading: false,
        headerData: {},
        totalCount: 1,
        pattern: {
          color: '#7A7E83',
          backgroundColor: '#fff',
          selectedColor: '#409eff',
          buttonColor: '#409eff',
          iconColor: '#fff'
        },
      }
    },
    onPullDownRefresh() {
      this.resetHandle()
      uni.stopPullDownRefresh()
    },
    mounted() {
      this.getPage()
      this.listSysDict()
    },
    methods: {
      confirm_sx_type(e) {
        this.show_sx_type = false
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.requestParam.type = fieldValue
        this.requestParam.typeStr = fieldName
      },
      preventHandler() {
        return
      },
      confirm_sx_status(e) {
        this.show_sx_status = false
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.requestParam.status = fieldValue
        this.requestParam.statusStr = fieldName
      },
      goDel(id) {
        var _this = this;
        uni.showModal({
          title: '',
          confirmColor: '#409eff',
          content: '是否删除',
          success: function (res) {
            if (res.confirm) {
              lotteryTicketApi.delById(id).then(res => {
                _this.$toast(res.subMsg)
                if (res.subCode === 1000) {
                  _this.search1()
                }
              })
            } else if (res.cancel) {
            }
          }
        });
      },
      handleClick(orderData) {
        const now = new Date();
        // 格式化日期为字符串（例如：“YYYY-MM-DD”格式）
        const formattedDate = now.getFullYear() + '-' +
            (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
            now.getDate().toString().padStart(2, '0');
        this.requestParam.id = orderData.id
        this.requestParam.happenDate = orderData.happenDate ? orderData.happenDate : formattedDate
        this.requestParam.price = orderData.price
        this.requestParam.type = orderData.type
        this.requestParam.status = orderData.status
        for (let i = 0; i < this.statusList.length; i++) {
          if(orderData.status == this.statusList[i].fieldValue){
            this.requestParam.statusStr =  this.statusList[i].fieldName
            this.requestParam.statusIndex = [i]
          }
        }
        for (let i = 0; i < this.typeList.length; i++) {
          if(orderData.type == this.typeList[i].fieldValue){
            this.requestParam.typeStr =  this.typeList[i].fieldName
            this.requestParam.typeIndex = [i]
          }
        }
        this.isShowDialog = true
      },
      handleClick1() {
        const now = new Date();
        // 格式化日期为字符串（例如：“YYYY-MM-DD”格式）
        const formattedDate = now.getFullYear() + '-' +
            (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
            now.getDate().toString().padStart(2, '0');
        this.requestParam = {
          id: '',
          happenDate: formattedDate,
          price: '',
          typeIndex: [0],
          statusIndex: [0],
          type: 1,
          typeStr: '收入',
          status: 1,
          statusStr: '未结账',
        },
        this.isShowDialog = true
      },
      confirmHandle() {
        if(!this.requestParam.happenDate) {
          this.$toast('请选择日期')
          return
        }
        if(!this.requestParam.price) {
          this.$toast('请输入价格')
          return
        }
        if(!this.requestParam.type) {
          this.$toast('请选择类型')
          return
        }
        if(!this.requestParam.status) {
          this.$toast('请选择状态')
          return
        }
        if (this.requestParam.type == 2
            && this.requestParam.price > 0){
          this.requestParam.price = - this.requestParam.price
        }
        if (this.requestParam.id) {
          lotteryTicketApi.update(this.requestParam).then(res => {
            // this.$toast(res.subMsg)
            uni.showToast({title: res.msg, icon: 'none',})
            if (res.subCode === 1000) {
              this.resetHandle()
              this.isShowDialog = false
            }
          })
        } else {
          lotteryTicketApi.add(this.requestParam).then(res => {
            // this.$toast(res.subMsg)
            uni.showToast({title: res.msg, icon: 'none',})
            if (res.subCode === 1000) {
              this.resetHandle()
              this.isShowDialog = false
            }
          })
        }
      },
      getPage() {
        lotteryTicketApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
          } else {
            this.$toast(res.subMsg)
          }
        })
        lotteryTicketApi.data().then(res => {
          if (res.subCode === 1000) {
            this.headerData = res.data
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      updateAllStatus() {
        var _this = this;
        uni.showModal({
          title: '',
          confirmColor: '#409eff',
          content: '确认结账',
          success: function (res) {
            if (res.confirm) {
              _this.$request({
                url: '/gw/op/v1/lotteryTicket/updateAllStatus',
                method: 'get'
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
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.typeList = sysDictList.filter(item => item.typeValue == 39)
        this.columns.push(this.typeList)
        this.statusList = sysDictList.filter(item => item.typeValue == 59)
        this.columnsStatus.push(this.statusList)
      },
      search() {
        if (!this.queryParam.name ) {
          this.$toast('请输入姓名')
          return
        }
        this.queryParam.pageNum = 1
        this.getPage()
      },
      cancelDate() {
        this.showDate = false;
        this.requestParam.happenDate = '';
      },
      confirmDate(e) {
        this.showDate = false;
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.requestParam.happenDate = timeValue;
        this.isShowDialog = true
      },
      cancelFrom() {
        this.showFrom = false;
        this.queryParam.happenDateFrom = '';
        this.getPage()
      },
      cancelTo() {
        this.showTo = false;
        this.queryParam.happenDateTo = '';
        this.getPage()
      },
      confirmFrom(e) {
        this.showFrom = false;
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.queryParam.happenDateFrom = timeValue;
        this.getPage()
      },
      confirmTo(e) {
        this.showTo = false;
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.queryParam.happenDateTo = timeValue;
        this.getPage()
      },
      search1() {
        this.queryParam.pageNum = 1
        this.getPage()
      },
      search2() {
        this.queryParam.pageNum = 1
        this.isShowDialog2 = false
        this.getPage()
      },
      resetHandle() {
        this.queryParam = {
          happenDateFrom: '',
          happenDateTo: '',
          type: '',
          status: '',
          pageSize: 100,
          pageNum: 1
        }
        this.titleName = '彩票'
        this.search1()
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
  .hongbaoquyu1{
    /*#ifdef APP-PLUS*/
    margin-top: 180px;
    /*#endif*/
    /*#ifdef H5*/
    margin-top: 172px;
    /*#endif*/
  }
  .dingdans_item {
    padding: 2.4vw 1.2vw;
    background: #ffffff;
    border-bottom: 1vw solid #eee;
    padding-right: 3%;
    padding-left: 3%;
  }

  .dingdans_top_23 {
    font-size: 3.68vw;
    height: 7vw;
    line-height: 7vw;
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

  .hengtupianbaobiao1{
    vertical-align: middle;
    margin: 0 2px;
    width:18px;
    height: 18px;
    margin-bottom: 10px;
  }
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
  /* 给要上拉的容器设置 begin */
  .hello {
    background-color: #f3f2f8;
    padding-top: 12vw;
    font-size: 13px;
    height: 100vh;
    overflow-y: auto;
  }

  .fenlei_top_1_1 {
    border-bottom: 1vw solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    width: 100vw;
    background: #fff;
    position: fixed;
    /*#ifdef APP-PLUS*/
    top: 100px;
    /*#endif*/
    /*#ifdef H5*/
    top: 88px;
    /*#endif*/
    left: 0;
    z-index: 99;
  }
  .store-list-1_1 {
    margin-left: 2vw;
    display: flex;
    flex-wrap: wrap;
  }
  .store-list-1-li_123{
    border-radius: 10px;
    text-align: center;
    background-color: #EEF2F7;
    color: #333;
    font-size: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 2px;
    margin-right: 6px;
    margin-bottom: 5px;
    margin-left: 4px;
    width: 28vw;
    padding-bottom: 5px;
  }
  .overview1 {
    padding-top: 5px;
    padding-right: 3px;
    padding-bottom: 1px;
    padding-left: 3px;
  }
  .overview2 {
    padding: 3px;
  }
</style>
