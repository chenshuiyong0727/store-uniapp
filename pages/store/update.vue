<template lang="html">
  <view class="login">
    <u-navbar title="修改" bgColor="#F3F4F5">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
    </u-navbar>
    <u--form
        style="background-color: white"
        class="julibiaoti"
        labelPosition="left"
        :model="form"
        ref="uForm"
    >
      <view style="width: 90vw;margin-left: 5vw;">
        <u-form-item label="货号" label-width="25vw" borderBottom>
          <u--input :disabled="true" disabledColor="#fff" inputAlign="right" color="#d1d1d1"
                    v-model="orderData.actNo" border="none"></u--input>
        </u-form-item>
        <u-form-item label-width="25vw"  label="尺码"  borderBottom>
          <hpy-form-select v-if="sizeList"  :dataList="sizeList" :hideBorder="true" :hideArrow="true" text="size" name="id" v-model="requestParam.sizeId"/>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw"  label="渠道"  borderBottom>
          <hpy-form-select v-if="channelIdList"  :dataList="channelIdList" :hideBorder="true" :hideArrow="true" text="fieldName" name="fieldValue" v-model="requestParam.channelId"/>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label-width="25vw"  label="原始库存" borderBottom>
          <u--input  disabledColor="#fff" inputAlign="right"
                    v-model="requestParam.oldInventory" type="number " border="none"></u--input>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label-width="25vw"  label="剩余库存" borderBottom>
          <u--input  disabledColor="#fff" inputAlign="right"
                    v-model="requestParam.inventory" type="number " border="none"></u--input>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label-width="25vw" label="入库价" borderBottom>
          <u--input  disabledColor="#fff" inputAlign="right" @change="keyup1"
                    v-model="requestParam.price" type="digit" border="none"></u--input>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label-width="25vw" label="出售价格" borderBottom>
          <u--input  disabledColor="#fff" inputAlign="right" @change="keyup1"
                    v-model="requestParam.dwPrice" type="digit" border="none"></u--input>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="30vw" label="入库时间" @click="$refs.myPicker.show();$hideKeyboard" borderBottom>
          <u--input inputAlign="right" disabledColor="#fff" placeholder="请选择"
                    placeholderStyle="font-size: 14px;color:#808080"
                    v-model="requestParam.createTime" border="none" disabled></u--input>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw" label="手续费" borderBottom>
          <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                    v-model="requestParam.poundage" type="digit" border="none" color="#d1d1d1"></u--input>
        </u-form-item>

        <u-form-item label-width="25vw" label="到手价" borderBottom>
          <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                    v-model="requestParam.theirPrice" type="digit" border="none" color="#d1d1d1"></u--input>
        </u-form-item>

        <u-form-item label-width="25vw" label="利润" borderBottom>
          <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                    v-model="requestParam.profits" type="digit" border="none" color="#d1d1d1"></u--input>
        </u-form-item>
      </view>
    </u--form>
    <buuug7-simple-datetime-picker
        v-if="dateCurrent"
        ref="myPicker"
        @submit="handleSubmit"
        :start-year="2022"
        :end-year="2099"
        :time-init="dateCurrent"
        :time-hide="[true, true, true, true, true, true]"
        :time-label="['年', '月', '日', '时', '分', '秒']"
    />
    <view class="baisebeijing shuipingjuzhong" style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <u-button style="width: 50vw; margin: 10px 15px;" type="primary" @click="confirmHandle">
        <text style=" font-size: 17px;font-weight: 600">确认修改</text>
      </u-button>
    </view>
  </view>
</template>

<script>
  import {goodsInventoryApi} from '@/api/goodsInventory'
  import { goodsBaseApi } from '@/api/goodsBase'

  export default {
    components: {
    },
 data() {
      return {
        fileUrl: this.$fileUrl,
        // datetimesingle:  Date.now() - 2*24*3600*1000,
        dateCurrent:'',
        // showFrom: false,
        fileList1: [],
        show_sx_type: false,
        defaultIndex: [1],
        form: {
          type: 2,
          typeStr: '支出',
          actNo: '',
          name: '',
          imgUrl: '',
          brand: '',
          remark: '',
          price: ''
        },
        typeList: [],
        // columns: [],
        id: '',
        orderData: '',
        sizeList:'',
        channelIdList:'',
        requestParam: {
          id: '',
          createTime: '',
          sizeId: '',
          oldInventory: '',
          inventory: '',
          price: '',
          dwPrice: '',
          poundage: '',
          theirPrice: '',
          profits: '',
          waybillNo: '',
          addressId: ''
        },
      }
    },
    onLoad(options) {
      if (options) {
        this.id = options.id ? options.id : '';
        if (this.id) {
          this.getDetailById(this.id)
        }
      }
    },
    mounted() {
      this.listSysDict()
    },
    methods: {
      changeLog(e) {
      },
      keyup1() {
        let poundage =  this.$getPoundage(this.requestParam.dwPrice)
        this.requestParam.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice =  this.requestParam.dwPrice - poundage
        this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam.theirPrice - 10
            - this.requestParam.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
      },
      showSxType() {
        if (this.type ==1){
          return
        }
        this.show_sx_type = true
      },
      confirm_sx_type(e) {
        this.show_sx_type = false
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.form.type = fieldValue
        this.form.typeStr = fieldName
      },
      handleSubmit(e) {
        this.requestParam.createTime = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
      },
      confirmHandle() {
        if (this.requestParam.oldInventory < this.requestParam.inventory) {
          this.$toast('原始库存小于剩余库存')
          return
        }
        this.requestParam.createTime = this.requestParam.createTime ? this.$parseTime(this.requestParam.createTime) : ''
        goodsInventoryApi.update(this.requestParam).then(res => {
          this.$toast(res.subMsg);
          if (res.subCode === 1000) {
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/store/index',
              });
            }, 1000)
        }
        })
      },
      handleClick() {
        this.requestParam.id = this.orderData.id
        this.requestParam.sizeId = this.orderData.sizeId
        this.requestParam.channelId = this.orderData.channelId
        if (this.orderData.createTime){
          this.requestParam.createTime  = uni.$u.timeFormat(this.orderData.createTime, 'yyyy-mm-dd hh:MM:ss');
          this.dateCurrent = parseInt(new Date( this.orderData.createTime).getTime())
        }else{
          this.dateCurrent = parseInt(new Date().getTime())
        }
        this.requestParam.oldInventory = this.orderData.oldInventory
        this.requestParam.inventory = this.orderData.inventory
        this.requestParam.price = this.orderData.price
        this.requestParam.dwPrice = this.orderData.dwPrice
        this.requestParam.waybillNo = this.orderData.waybillNo
        this.requestParam.addressId = this.orderData.addressId
        if (!this.orderData.poundage) {
          let poundage = this.$getPoundage(this.requestParam.dwPrice)
          this.requestParam.poundage = parseFloat(poundage).toFixed(2)
        } else {
          this.requestParam.poundage = this.orderData.poundage
        }
        if (!this.orderData.theirPrice) {
          let theirPrice =  this.requestParam.dwPrice
              - this.$getPoundage(this.requestParam.dwPrice)
          this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)
        } else {
          this.requestParam.theirPrice = this.orderData.theirPrice
        }
        if (!this.orderData.profits) {
          let profits = this.requestParam.theirPrice - 10
              - this.requestParam.price
          this.requestParam.profits = parseFloat(profits).toFixed(2)
        } else {
          this.requestParam.profits = this.orderData.profits
        }
      },
      getDetailById(id) {
        if (id) {
          goodsInventoryApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.orderData = res.data ? res.data : {};
              this.handleClick()
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : [];
        this.channelIdList = sysDictList.filter(item => item.typeValue == 47)
        goodsBaseApi.listDropDownSizes({ type: '' }, false).then(res => {
          if (res.subCode === 1000) {
            this.sizeList = res.data
            for (let i = 0; i < this.sizeList.length; i++) {
              this.sizeList[i].value = this.sizeList[i].id
              this.sizeList[i].text = this.sizeList[i].size
            }
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
