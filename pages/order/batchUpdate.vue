<template lang="html">
  <view class="login">
    <u-navbar title="批量操作" bgColor="#F3F4F5">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
    </u-navbar>
    <u--form
        style="margin-top: 43px;background-color: white"
        class="julibiaoti"
        labelPosition="left"
        ref="uForm"
    >
      <view style="width: 90vw;margin-left: 5vw;">
        <u-form-item label-width="25vw" label="选中数" borderBottom>
          <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                     v-model="ids.length" border="none" color="#F56C6C"></u--input>
        </u-form-item>
        <u-form-item label-width="25vw" label="运费" borderBottom>
          <u--input  disabledColor="#fff" inputAlign="right" placeholder="请输入"  placeholderStyle="font-size: 14px;color:grey"
                     v-model="requestParam.freight" type="digit" border="none"></u--input>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw"  label="运单号" borderBottom>
          <u--input  disabledColor="#fff" inputAlign="right" placeholder="请输入"  placeholderStyle="font-size: 14px;color:grey"
                     v-model="requestParam.waybillNo" border="none"></u--input>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw"  label="地址"  borderBottom>
          <hpy-form-select
              v-if="addressList"
              :dataList="addressList"
              :hideBorder="true"
              :hideArrow="true"
              text="fieldName"
              name="fieldValue"
              v-model="requestParam.addressId"/>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw"  label="状态"  borderBottom>
          <hpy-form-select
              v-if="statusList"
              :dataList="statusList"
              :hideBorder="true"
              :hideArrow="true"
              text="fieldName"
              name="fieldValue"
              v-model="requestParam.status"/>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw"  label="销售类型"  borderBottom>
          <hpy-form-select
              v-if="saleTypeList"
              :dataList="saleTypeList"
              :hideBorder="true"
              :hideArrow="true"
              text="fieldName"
              name="fieldValue"
              v-model="requestParam.saleType"/>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="30vw" label="免仓储费天数" borderBottom>
          <u--input  disabledColor="#fff" inputAlign="right" placeholder="请输入" placeholderStyle="font-size: 14px;color:grey"
                     v-model="requestParam.inStoreFreeDay" type="number" border="none"></u--input>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
<!--        <u-form-item label-width="30vw" label="寄售入仓时间" borderBottom >-->
<!--          <uni-datetime-picker placeholder="请选择" style="color: #303133 !important; text-align: right;font-size: 14px;" type="datetime" v-model="requestParam.inStoreTime"   :border="false"/>-->
<!--          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>-->
<!--        </u-form-item>-->
<!--        <u-form-item label-width="30vw" label="发货截止时间" >-->
<!--          <uni-datetime-picker  placeholder="请选择"  style="color: #303133 !important; text-align: right;font-size: 14px;" type="datetime" v-model="requestParam.deliveryDeadlineTime"   :border="false"/>-->
<!--          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>-->
<!--        </u-form-item>-->
        <u-form-item label-width="30vw" label="寄售入仓时间" @click="$refs.myPickertime.show();$hideKeyboard" borderBottom>
          <u--input inputAlign="right" disabledColor="#fff" placeholder="请选择"
                    placeholderStyle="font-size: 14px;color:#808080"
                    v-model="requestParam.inStoreTime" border="none" disabled></u--input>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="30vw" label="发货截止时间" @click="$refs.myPicker.show();$hideKeyboard" borderBottom>
          <u--input inputAlign="right" disabledColor="#fff" placeholder="请选择"
                    placeholderStyle="font-size: 14px;color:#808080"
                    v-model="requestParam.deliveryDeadlineTime" border="none" disabled></u--input>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </view>
    </u--form>
    <buuug7-simple-datetime-picker
        v-if="dateCurrent1"
        ref="myPicker"
        @submit="handleSubmit"
        :start-year="2022"
        :end-year="2099"
        :time-init="dateCurrent1"
        :time-hide="[true, true, true, true, true, true]"
        :time-label="['年', '月', '日', '时', '分', '秒']"
    />
    <buuug7-simple-datetime-picker
        v-if="dateCurrent2"
        ref="myPickertime"
        @submit="handleSubmit1"
        :start-year="2022"
        :end-year="2099"
        :time-init="dateCurrent2"
        :time-hide="[true, true, true, true, true, true]"
        :time-label="['年', '月', '日', '时', '分', '秒']"
    />
    <view style="height: 70px"></view>
    <view class="baisebeijing shuipingjuzhong" style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <u-button style="width: 50vw; margin: 10px 15px;" type="primary" @click="confirmHandle3">
        <text style=" font-size: 17px;font-weight: 600">确认提交</text>
      </u-button>
    </view>
  </view>
</template>

<script>
  import {goodsOrderApi} from '@/api/goodsOrder'
  export default {
 data() {
      return {
        fileUrl: this.$fileUrl,
        dateCurrent: parseInt(new Date().getTime()),
        addressList: [],
        statusList: [],
        saleTypeList: [],
        typeList: [],
        id: '',
        dateCurrent1:'',
        dateCurrent2:'',
        requestParam: {
          ids: '',
          status: 3,
          saleType: 2,
          addressId: '',
          deliveryDeadlineTime: '',
          inStoreFreeDay: '',
          inStoreTime: '',
          waybillNo: '',
          freight: ''
        },
        ids: [],
      }
    },
    onLoad(options) {
      this.listSysDict()
      if (options) {
        this.ids = options.ids ? options.ids : '';
        if (this.ids) {
          this.ids = this.ids.split(',')
          this.requestParam.ids = this.ids
          this.getDetailById()
        }
      }
    },
    methods: {
      handleSubmit(e) {
        this.requestParam.deliveryDeadlineTime = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
      },
      handleSubmit1(e) {
        this.requestParam.inStoreTime = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
      },
      getDetailById() {
        let id = this.ids[0]
        if (id) {
          this.$request({
            url: '/gw/op/v1/goodsOrder/' + id,
            method: 'get'
          }).then(res => {
            if (res.subCode === 1000) {
              this.requestParam.deliveryDeadlineTime = res.data ? this.$parseTime(
                  res.data.deliveryDeadlineTime) : ''
              // this.requestParam.inStoreTime = res.data ? this.$parseTime(res.data.inStoreTime) : ''
              if (res.data.deliveryDeadlineTime){
                this.requestParam.deliveryDeadlineTime = uni.$u.timeFormat(res.data.deliveryDeadlineTime, 'yyyy-mm-dd hh:MM:ss');
                this.dateCurrent1 = parseInt(new Date(this.requestParam.deliveryDeadlineTime).getTime())
              }else{
                this.dateCurrent1 = parseInt(new Date().getTime())
              }
              if (res.data.inStoreTime){
                this.requestParam.inStoreTime  = uni.$u.timeFormat(res.data.inStoreTime, 'yyyy-mm-dd hh:MM:ss');
                this.dateCurrent2 = parseInt(new Date(this.requestParam.inStoreTime).getTime())
              }else{
                this.dateCurrent2 = parseInt(new Date().getTime())
              }
              // if (this.orderData.deliveryDeadlineTime){
              //   this.requestParam.deliveryDeadlineTime  = uni.$u.timeFormat(this.orderData.deliveryDeadlineTime, 'yyyy-mm-dd hh:MM:ss');
              //   this.dateCurrent1 = parseInt(new Date( this.orderData.deliveryDeadlineTime).getTime())
              // }
              this.requestParam.addressId = res.data ? res.data.addressId : ''
              this.requestParam.inStoreFreeDay = res.data ? res.data.inStoreFreeDay : ''
              this.requestParam.freight = res.data ? res.data.freight : ''
              this.requestParam.waybillNo = res.data ? res.data.waybillNo : ''
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : [];
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.statusList = sysDictList.filter(item => item.typeValue == 37)
        this.saleTypeList = sysDictList.filter(item => item.typeValue == 46)
      },
      confirmHandle3() {
        if (this.requestParam.status == 3 && !this.requestParam.deliveryDeadlineTime) {
          this.$toast('发货截止时间为空')
          return
        }
        if (this.requestParam.status == 3 && !this.requestParam.addressId) {
          this.$toast('发货地址为空')
          return
        }
        if (this.requestParam.status == 11 && !this.requestParam.inStoreTime) {
          this.$toast('闪电直发入仓 ，入仓时间不能为空')
          return
        }
        if (this.requestParam.status == 11 && !this.requestParam.inStoreFreeDay) {
          this.$toast('闪电直发入仓 ，免仓储费天数不能为空')
          return
        }
        // this.requestParam.deliveryDeadlineTime = this.requestParam.deliveryDeadlineTime ? this.$parseTime(this.requestParam.deliveryDeadlineTime) : ''
        // this.requestParam.inStoreTime = this.requestParam.inStoreTime ? this.$parseTime(this.requestParam.inStoreTime) : ''
        // 闪电直发
        goodsOrderApi.updateSaleType(this.requestParam).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/order/index',
              });
            }, 1000)
          }
        })
      },
    }
  }

</script>

<style lang="less" scoped>
  @import '@/assets/index/style.css';

  .login {
    > section {
      .tip {
        padding: 6vw 3vw;
        color: rgb(224, 145, 71);
        letter-spacing: 2px;
        font-size: 16px;
      }
    }
  }

</style>
