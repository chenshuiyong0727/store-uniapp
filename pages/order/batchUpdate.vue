<template lang="html">
  <view class="login">
    <u-navbar title="批量操作" bgColor="#F3F4F5">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
    </u-navbar>
<!--    <view class=" baisebeijing " style="    border-bottom: 5px solid #F3F4F5;  position: fixed;-->
<!--    top: 0px;margin-top: 43px;z-index:2">-->

<!--      <view class="dingdans_item" style="border-bottom:0px ;padding:10px">-->
<!--        <view class="dingdans_con" style="padding:0">-->
<!--          <view style="  width: 95px;    border: 1px solid #f1f1f1;-->
<!--    height: 100px;-->
<!--    position: relative;-->
<!--    border-radius: 5px;">-->
<!--            <image mode="widthFix" @click="avatarShow(orderData.img)" style="  width: 80%;-->
<!--    margin-top: 28px;-->
<!--    margin-left: 10%;" :src="orderData.img"></image>-->
<!--          </view>-->
<!--          <view class="diangdans_con_right">-->
<!--            <view class="dingdans_con_right_top xianglian">-->
<!--              <text v-if="orderData.goodsId"-->
<!--                    @click="goodsDetail(orderData.goodsId) " class="chaochu"  style="color: #333333;font-size: 14px;width: 60vw;font-weight: 600">-->
<!--                  {{orderData.goodsName }}-->
<!--              </text>-->
<!--            </view>-->

<!--            <view class="dingdans_con_right_top xianglian">-->
<!--              <view class="xianglian">-->
<!--                <text @click="jumpactNo(orderData.actNo)">-->
<!--                  {{orderData.actNo}}-->
<!--                </text>-->
<!--                <image @click="$copyUrl(orderData.actNo)" class="fuzhitupian"-->
<!--                       src="../../static/img/copy.png"></image>-->
<!--              </view>-->
<!--              <view class="shugangfengexian">-->
<!--                <text>|</text>-->
<!--              </view>-->
<!--              <view>-->
<!--                尺码：-->
<!--                <text>{{orderData.size}}</text>-->
<!--              </view>-->
<!--            </view>-->

<!--            <view class="dingdans_con_right_top xianglian">-->
<!--              <text>当前状态：</text>-->
<!--              <text v-if="orderData.status == 7" class="color-success">{{ orderData.status |-->
<!--                dictToDescTypeValue(37) }}-->
<!--              </text>-->
<!--              <text v-else-if="[3,4,5,6,8].includes(orderData.status)" class="color-danger">{{-->
<!--                orderData.status | dictToDescTypeValue(37) }}-->
<!--              </text>-->
<!--              <text v-else>{{ orderData.status | dictToDescTypeValue(37) }}</text>-->
<!--            </view>-->

<!--          </view>-->
<!--        </view>-->
<!--      </view>-->
<!--    </view>-->
    <u--form
        style="margin-top: 43px;background-color: white"
        class="julibiaoti"
        labelPosition="left"
        ref="uForm"
    >
      <view style="width: 90vw;margin-left: 5vw;">
<!--        <u-form-item label="货号" label-width="25vw" borderBottom>-->
<!--          <u&#45;&#45;input :disabled="true" disabledColor="#fff" inputAlign="right" color="#d1d1d1"-->
<!--                    v-model="orderData.actNo" border="none"></u&#45;&#45;input>-->
<!--        </u-form-item>-->
<!--        <u-form-item label="尺码" label-width="25vw" borderBottom>-->
<!--          <u&#45;&#45;input :disabled="true" disabledColor="#fff" inputAlign="right" color="#d1d1d1"-->
<!--                    v-model="orderData.size" border="none"></u&#45;&#45;input>-->
<!--        </u-form-item>-->
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
        <u-form-item label-width="30vw" label="寄售入仓时间" borderBottom >
          <uni-datetime-picker placeholder="请选择" style="color: #303133 !important; text-align: right;font-size: 14px;" type="datetime" v-model="requestParam.inStoreTime"   :border="false"/>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="30vw" label="发货截止时间" >
          <uni-datetime-picker  placeholder="请选择"  style="color: #303133 !important; text-align: right;font-size: 14px;" type="datetime" v-model="requestParam.deliveryDeadlineTime"   :border="false"/>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </view>
    </u--form>
    <view style="height: 70px"></view>

<!--    <u-datetime-picker-->
<!--       :show="showFrom"-->
<!--        v-model="dateCurrent"-->
<!--        :minDate="1646064000000"-->
<!--        @confirm="confirmFrom"-->
<!--        @cancel="cancelFrom"-->
<!--    ></u-datetime-picker>-->
    <view class="baisebeijing shuipingjuzhong" style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <u-button style="width: 50vw; margin: 10px 15px;" type="primary" @click="confirmHandle3">
        <text style=" font-size: 17px;font-weight: 600">确认提交</text>
      </u-button>
    </view>
<!--    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">-->
<!--      <view class="imageShow">-->
<!--        <image :src="imageZoom" mode="widthFix" class="showImg"></image>-->
<!--      </view>-->
<!--    </view>-->
  </view>
</template>

<script>
  import {goodsOrderApi} from '@/api/goodsOrder'
  export default {
    data() {
      return {
        // datetimesingle:  Date.now() - 2*24*3600*1000,
        dateCurrent: parseInt(new Date().getTime()),
        // showFrom: false,
        // fileList1: [],
        addressList: [],
        statusList: [],
        dataStatusList: [],
        saleTypeList: [],
        // show_sx_type: false,
        // defaultIndex: [1],
        // form: {
        //   type: 2,
        //   typeStr: '支出',
        //   actNo: '',
        //   name: '',
        //   imgUrl: '',
        //   brand: '',
        //   remark: '',
        //   price: ''
        // },
        typeList: [],
        id: '',
        // pictureZoomShow: false,
        // imageZoom: false,
        // orderData: '',
        // sizeList:'',
        // channelIdList:'',
        // requestParam: {
        //   id: '',
        //   status: '',
        //   saleType: '',
        //   price: '',
        //   shelvesPrice: '',
        //   deliveryDeadlineTime: '',
        //   subsidiesPrice: '',
        //   freight: '',
        //   poundage: '',
        //   theirPrice: '',
        //   profits: '',
        //   waybillNo: '',
        //   reason: '色差',
        //   addressId: ''
        // },
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
      if (options) {
        this.ids = options.ids ? options.ids : '';
        if (this.ids) {
          this.ids = this.ids.split(',')
          this.requestParam.ids = this.ids
          this.getDetailById()
        }
      }
    },
    mounted() {
      this.listSysDict()
    },
    methods: {
      // avatarShow(e) {
      //   this.imageZoom = e
      //   this.pictureZoomShow = true
      // },
      changeLog(e) {
      },
      // keyup2() {
      //   let poundage = this.$getPoundage( this.requestParam.shelvesPrice)
      //   this.requestParam.poundage = parseFloat(poundage).toFixed(2)
      //
      //   let profits = this.requestParam.theirPrice - this.requestParam.freight
      //       - this.requestParam.price
      //   this.requestParam.profits = parseFloat(profits).toFixed(2)
      // },
      // keyup1() {
      //   let poundage =  this.$getPoundage( this.requestParam.shelvesPrice)
      //   this.requestParam.poundage = parseFloat(poundage).toFixed(2)
      //
      //   let theirPrice = this.requestParam.subsidiesPrice * 1 + this.requestParam.shelvesPrice * 1
      //       -  this.$getPoundage( this.requestParam.shelvesPrice)
      //   this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)
      //
      //   let profits = this.requestParam.theirPrice - this.requestParam.freight
      //       - this.requestParam.price
      //   this.requestParam.profits = parseFloat(profits).toFixed(2)
      // },
      // showSxType() {
      //   if (this.type ==1){
      //     return
      //   }
      //   this.show_sx_type = true
      // },
      // cancelFrom() {
      //   this.showFrom = false
      //   this.requestParam.createTime = ''
      //   this.search1()
      // },
      // confirmFrom(e) {
      //   this.showFrom = false;
      //   let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM');
      //   this.requestParam.createTime = timeValue
      //   // this.search1()
      // },
      // confirm_sx_type(e) {
      //   this.show_sx_type = false
      //   let fieldValue = e.value[0].fieldValue
      //   let fieldName = e.value[0].fieldName
      //   this.form.type = fieldValue
      //   this.form.typeStr = fieldName
      // },
      //
      // confirmHandle() {
      //   if (this.requestParam.oldInventory < this.requestParam.inventory) {
      //     // this.$toast('原始库存小于剩余库存')
      //     this.$toast('原始库存小于剩余库存')
      //     return
      //   }
      //   this.requestParam.createTime = this.requestParam.createTime ? this.$parseTime(this.requestParam.createTime) : ''
      //   goodsInventoryApi.update(this.requestParam).then(res => {
      //     this.$toast(res.subMsg);
      //     if (res.subCode === 1000) {
      //       setTimeout(() => {
      //         uni.reLaunch({
      //           url: '/pages/store/index',
      //         });
      //       }, 1000)
      //   }
      //   })
      // },
      // confirmHandle() {
      //   if (this.requestParam.status == 7 && !this.requestParam.freight) {
      //     this.$toast('请输入运费')
      //     return
      //   }
      //   if (this.requestParam.status == 3 && !this.requestParam.addressId) {
      //     this.$toast('请选择地址')
      //     return
      //   }
      //   if (this.requestParam.status == 8 && !this.requestParam.reason) {
      //     this.$toast('请输入瑕疵原因')
      //     return
      //   }
      //   if (this.requestParam.status == 3 && !this.requestParam.deliveryDeadlineTime) {
      //     this.$toast('发货截止时间为空')
      //     return
      //   }
      //   // 利润= 到手价-运费-原价
      //   let profits = this.requestParam.theirPrice - this.requestParam.freight
      //       - this.requestParam.price
      //   this.requestParam.profits = parseFloat(profits).toFixed(2)
      //   this.requestParam.deliveryDeadlineTime = this.requestParam.deliveryDeadlineTime ? this.$parseTime(this.requestParam.deliveryDeadlineTime) : ''
      //   goodsOrderApi.sellGoods(this.requestParam).then(res => {
      //     this.$toast(res.subMsg)
      //     if (res.subCode === 1000) {
      //       setTimeout(() => {
      //         uni.reLaunch({
      //           url: '/pages/order/index',
      //         });
      //       }, 1000)
      //     }
      //   })
      // },

      // handleClick() {
      //   this.requestParam.id = this.orderData.id
      //   this.requestParam.saleType = this.orderData.saleType
      //   this.requestParam.price = this.orderData.price
      //   this.requestParam.shelvesPrice = this.orderData.shelvesPrice
      //   this.requestParam.subsidiesPrice = this.orderData.subsidiesPrice
      //   this.requestParam.deliveryDeadlineTime = this.$parseTime(this.orderData.deliveryDeadlineTime)
      //   this.requestParam.freight = this.orderData.freight
      //   this.requestParam.waybillNo = this.orderData.waybillNo
      //   this.requestParam.addressId = this.orderData.addressId ? this.orderData.addressId :''
      //   // if (this.orderData.status != 11) {
      //   //   this.requestParam.status = this.orderData.status + 1
      //   // } else {
      //   //   this.requestParam.status = 7
      //   // }
      //   if (this.orderData.status == 7 || this.orderData.status ==11) {
      //     this.requestParam.status = 7
      //   }else{
      //     this.requestParam.status = this.orderData.status + 1
      //
      //   }
      //   if (!this.orderData.poundage) {
      //     let poundage = this.$getPoundage(this.requestParam.shelvesPrice)
      //     this.requestParam.poundage = parseFloat(poundage).toFixed(2)
      //   } else {
      //     this.requestParam.poundage = this.orderData.poundage
      //   }
      //   if (!this.orderData.theirPrice) {
      //     let theirPrice = this.requestParam.subsidiesPrice * 1 + this.requestParam.shelvesPrice
      //         - this.$getPoundage(this.requestParam.shelvesPrice)
      //     this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)
      //   } else {
      //     this.requestParam.theirPrice = this.orderData.theirPrice
      //   }
      //   if (!this.orderData.profits) {
      //     let profits = this.requestParam.theirPrice - this.requestParam.freight
      //         - this.requestParam.price
      //     this.requestParam.profits = parseFloat(profits).toFixed(2)
      //   } else {
      //     this.requestParam.profits = this.orderData.profits
      //   }
      //   this.isShowDialog = true
      // },
      // getDetailById(id) {
      //   if (id) {
      //     goodsOrderApi.getDetailById(id).then(res => {
      //       if (res.subCode === 1000) {
      //         this.orderData = res.data ? res.data : {};
      //         this.handleClick()
      //       } else {
      //         this.$toast(res.subMsg)
      //       }
      //     })
      //   }
      // },
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
              this.requestParam.inStoreTime = res.data ? this.$parseTime(res.data.inStoreTime) : ''
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
      // submit() {
      //   if (!this.form.type) {
      //     this.$toast('类型非空');
      //     return false
      //   }
      //   if (!this.form.price) {
      //     this.$toast('金额非空');
      //     return false
      //   }
      //   if (!this.form.name) {
      //     this.$toast('名称非空');
      //     return false
      //   }
      //   if (this.form.price > 0 && this.form.type == 2) {
      //     this.form.price = 0 - this.form.price
      //   }
      //   if (this.type == 2) {
      //     goodsOtherApi.update(this.form).then(res => {
      //       if (res.subCode === 1000) {
      //         this.$toast('操作成功');
      //         setTimeout(() => {
      //           this.$navigateTo('/pages/other/index')
      //         }, 1000)
      //       } else {
      //         this.$toast(res.subMsg)
      //       }
      //     })
      //   } else {
      //     goodsOtherApi.add(this.form).then(res => {
      //       if (res.subCode === 1000) {
      //         this.$toast('添加成功，即将返回列表');
      //         setTimeout(() => {
      //           this.$navigateTo('/pages/other/index')
      //         }, 1000)
      //       } else {
      //         this.$toast(res.subMsg)
      //       }
      //     })
      //   }
      // },
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
        this.requestParam.deliveryDeadlineTime = this.requestParam.deliveryDeadlineTime ? this.$parseTime(this.requestParam.deliveryDeadlineTime) : ''
        this.requestParam.inStoreTime = this.requestParam.inStoreTime ? this.$parseTime(this.requestParam.inStoreTime) : ''
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
