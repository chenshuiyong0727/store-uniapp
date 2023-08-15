<template lang="html">
  <view class="login">
    <u-navbar title="出售" bgColor="#F3F4F5">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
    </u-navbar>
    <view class="width92 baisebeijing" style="margin-top: 43px;">
      <view style="width: 85vw;margin-left: 4vw;    padding-top: 10px;">
        <text>
          <strong v-if="orderData.goodsId"
                  @click="goodsDetail(orderData.goodsId) "
                  style="  color: #333333;font-size: 14px;">
            {{orderData.goodsName }}
          </strong>
        </text>
      </view>
      <view class="dingdans_item" style="margin-bottom: 7px; border-bottom:0px ;padding:10px">
        <view class="dingdans_con" style="padding:0">
          <view style="  width: 200px;    border: 1px solid #f1f1f1;
    height: 100px;
    position: relative;
    border-radius: 5px;">
            <image mode="widthFix"  v-if="orderData.img"  @click="avatarShow(orderData.img)" style="  width: 80%;
    margin-top: 28px;
    margin-left: 10%;" :src="orderData.img"></image>
            <image mode="widthFix" @click="avatarShow(orderData.img)" style="  width: 80%;
    margin-top: 28px;
    margin-left: 10%;" :src="$fileUrl+orderData.imgUrl" v-if="!orderData.img && orderData.imgUrl"></image>
          </view>
          <view class="diangdans_con_right">
            <view class="dingdans_con_right_top xianglian">
              <view class="xianglian">
                <text>
                  {{orderData.actNo}}
                </text>
                <image @click="$copyUrl(orderData.actNo)" class="fuzhitupian"
                       src="../../static/img/copy.png"></image>
              </view>
              <view class="shugangfengexian">
                <text>|</text>
              </view>
              <view>
                尺码：
                <text>{{orderData.size}}</text>
              </view>
            </view>
            <view class="dingdans_con_right_top xianglian">
              <text>入库价：</text>
              <u--text mode="price" :text="orderData.price"></u--text>
            </view>

          </view>
        </view>
      </view>
    </view>
    <u--form
        class=" width92 baisebeijing"
        labelPosition="left"
        :model="form"
        ref="uForm"
    >
      <view style="width: 85vw;margin-left: 5vw;">
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
        <u-form-item label-width="32vw" label="发货截止时间"  >
          <uni-datetime-picker :clearIcon="false" style="color: #303133 !important; text-align: right;font-size: 14px;" type="datetime" v-model="requestParam.deliveryDeadlineTime"  :border="false"/>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </view>
    </u--form>


    <view class="width92 baisebeijing" style="margin-top: 10px;">
      <view style="width: 85vw;margin-left: 4vw;    padding: 12px 0;">
        <view style="margin-right: 3px;">
          <text style="font-weight: 600;font-size: 14px;margin-top: 5px;">出售价格</text>
        </view>
        <view class="zuoyouduiqi"
              style="font-weight: 600;caret-color:#409eff;  border-bottom: 2px solid #333333;margin-top: 10px;">
          <view style="width: 10vw">
            <u-text
                size="20"
                color="#333333"
                text="￥"
                margin="0 3px 0 0"
            ></u-text>
          </view>
          <view style="margin-left: -8vw;width: 78vw">
            <u--input
                placeholderStyle="font-size: 24px;color:#c0c4cc"
                @change="keyup2"
                v-model="requestParam.shelvesPrice"
                placeholder="输入价格" color="#333333" clearable border="none" fontSize="30px"
                type="digit">
            </u--input>
          </view>

          <view style="width: 20vw; margin-right: 4vw;margin-left: -30vw">
            <text style="font-size: 12px;color: #808080">
              {{tipMsg}}
            </text>
          </view>
        </view>
      </view>
      <view v-if="requestParam.shelvesPrice"
            style="width: 85vw;margin-left: 4vw;color: #808080;font-size: 12px;padding-bottom: 18px;">
        <view class="zuoyouduiqi " style="margin-top: 5px;">
          <view>
            <text>技术服务费</text>
            <text style="margin-left: 3px">5.00%</text>
          </view>
          <view class="xianglian">
            <text v-if="requestParam.jsfwf<=15"
                  style="padding: 1px; background-color: #E9EDF2;margin-right: 3px;">已达下限
            </text>
            <text v-if="requestParam.jsfwf>=249"
                  style="padding: 1px; background-color: #E9EDF2;margin-right: 3px;">已达上限
            </text>
            <u--text mode="price" color="#808080" size="12" :text="requestParam.jsfwf"></u--text>
          </view>
        </view>
        <view class="zuoyouduiqi" style="margin-top: 5px;">
          <view>
            <text>转账手续费</text>
            <text style="margin-left: 3px">1.00%</text>
          </view>
          <view>
            <u--text mode="price" color="#808080" size="12" :text="requestParam.zzsxf"></u--text>
          </view>
        </view>
        <view class="zuoyouduiqi" style="margin-top: 5px;">
          <view>
            <text>操作服务费</text>
          </view>
          <view>
            <u--text mode="price" color="#808080" size="12" :text="requestParam.czfwf"></u--text>
          </view>
        </view>
        <view class="zuoyouduiqi" style="margin-top: 5px;">
          <view>
            <text>售后无忧服务费</text>
            <text style="margin-left: 3px">{{requestParam.shwffwfBl}}0%</text>
          </view>
          <view>
            <u--text mode="price" color="#808080" size="12" :text="requestParam.shwffwf"></u--text>
          </view>
        </view>
        <view class="zuoyouduiqi" style="margin-top: 5px;">
          <view>
            <text>消费者邮费补贴</text>
          </view>
          <view>
            <u--text mode="price" color="#808080" size="12" :text="requestParam.xfzyfbt"></u--text>
          </view>
        </view>
      </view>
    </view>
    <view style="height: 170px"></view>
    <view class="baisebeijing " style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <view class="width92">
        <view class="zuoyouduiqi"
              style="font-weight: 600;font-size: 15px;padding-top: 15px;color: #333333">
          <view>
            <text>手续费总额</text>
          </view>
          <view>
            <u--text style="font-weight: 600;" @click="handlePoundage = true" v-if="!handlePoundage" :bold="true" mode="price" color="#333333" size="17"
                     :text="requestParam.poundage"></u--text>
            <view  v-else style="display: flex">
              <text style="font-weight: 600;font-size: 17px;color: #808080" >￥</text>
              <u--input style="font-weight: 600; text-align: right;width: 16vw" @change="keyup1"  inputAlign="right" color="#808080"
                        v-model="requestParam.poundage" border="none" fontSize="17px"
                        type="digit">
              </u--input>
            </view>
          </view>
        </view>
        <view class="zuoyouduiqi"
              style="font-weight: 600;font-size: 15px;padding-top: 10px;color: #333333">
          <view>
            <text>预计最高收入</text>
          </view>
          <view>
            <u--text style="font-weight: 600;" :bold="true" mode="price" color="#333333" size="17"
                     :text="requestParam.theirPrice"></u--text>
          </view>
        </view>
        <view class="zuoyouduiqi"
              style="font-weight: 600;font-size: 15px;padding-top: 10px;color: #333333">
          <view>
            <text>预计利润</text>
          </view>
          <view>
            <u--text style="font-weight: 600;" :bold="true" mode="price" color="#333333" size="17"
                     :text="requestParam.profits"></u--text>
          </view>
        </view>
      </view>
      <view class="shuipingjuzhong">
        <u-button style="width: 50vw; margin: 10px 15px;" type="primary" @click="confirmHandle">
          <text style=" font-size: 17px;font-weight: 600">确认出售</text>
        </u-button>
      </view>
    </view>

    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="imageZoom" mode="widthFix" class="showImg"></image>
      </view>
    </view>
  </view>
</template>

<script>
  import {goodsOrderApi} from '@/api/goodsOrder'
  import { parseTime } from '@/utils/index'

  export default {
    data() {
      return {
        form: {
          sizeVoList: '',
          name: '',
          actNo: '',
          imgUrl: '',
          img: '',
        },
        array: [{name: '中国'}, {name: '美国'}, {name: '巴西'}, {name: '日本'}],
        index: 2,
        isShowDialog2: false,
        pictureZoomShow: false,
        imageZoom: false,
        channelIdList: [],
        range: [
          {value: 1, text: "线下"},
          {value: 2, text: "线上"}
        ],
        handlePoundage: false,
        inventoryIndex: '',
        activeIndex: [],
        tipMsg: '',//请以9结尾
        goodsId: '',
        id: '',
        unifiedPrice: '',
        unifiedDwPrice: '',
        tableData: [],
        totalCount: 1,
        orderData: '',
        max1: '',
        addressList: [],
        statusList: [],
        saleTypeList: [],
        requestParam: {
          poundage: '',
          theirPrice: '',
          profits: '',
          inventoryId: '',
          type: 1,
          num: '',
          shelvesPrice: '',
          jsfwf: 15,
          zzsxf: '',
          czfwf: 38,
          shwffwf: '',
          shwffwfBl: 1.5,
          xfzyfbt: '',
          id: '',
          status: 3,
          saleType: 1,
          addressId: '',
          deliveryDeadlineTime: '',
          shelvesPrice: '',
          theirPrice: '',
          subsidiesPrice: ''
        },
      }
    },
    onLoad(options) {
      this.listSysDict()
      if (options) {
        this.id = options.id ? options.id : '';
        if (this.id) {
          this.getDetailById(this.id)
        }
      }
    },
    methods: {
      keyup1() {
        let theirPrice = this.requestParam.shelvesPrice - this.requestParam.poundage
        this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam.theirPrice - 10
            - this.orderData.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
      },
      keyup2() {
        let shelvesPrice = this.requestParam.shelvesPrice + ''
        if (shelvesPrice < 100) {
          this.tipMsg = '请提高价格'
        } else if (shelvesPrice > 299) {
          let price2 = shelvesPrice.substring(shelvesPrice.length - 1, shelvesPrice.length)
          if (price2 != 9) {
            this.tipMsg = '请以9结尾'
          } else {
            this.tipMsg = ''
          }
        } else {
          this.tipMsg = ''
        }
        if (!shelvesPrice) {
          this.tipMsg = ''
        }

        let jsfwf = shelvesPrice * 0.05
        if (jsfwf < 15) {
          jsfwf = 15
        }
        if (jsfwf > 249) {
          jsfwf = 249
        }
        this.requestParam.jsfwf = parseFloat(jsfwf).toFixed(2)

        let zzsxf = shelvesPrice * 0.01
        this.requestParam.zzsxf = parseFloat(zzsxf).toFixed(2)

        let shwffwfBl = 1.5
        if (shelvesPrice >= 600 && shelvesPrice < 2000) {
          shwffwfBl = 1.6
        } else if (shelvesPrice >= 2000) {
          shwffwfBl = 1.8
        }
        this.requestParam.shwffwfBl = shwffwfBl
        let shwffwf = shelvesPrice * 0.01 * shwffwfBl
        this.requestParam.shwffwf = parseFloat(shwffwf).toFixed(2)

        let xfzyfbt = 6
        if (shelvesPrice >= 200 && shelvesPrice < 300) {
          xfzyfbt = 6.5
        } else if (shelvesPrice >= 300) {
          xfzyfbt = 8.5
        }
        this.requestParam.xfzyfbt = parseFloat(xfzyfbt).toFixed(2)

        let poundage = jsfwf + zzsxf + shwffwf + xfzyfbt + 38
        this.requestParam.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice = shelvesPrice - poundage
        this.requestParam.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam.theirPrice - 10
            - this.orderData.price
        this.requestParam.profits = parseFloat(profits).toFixed(2)
      },

      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.statusList = sysDictList.filter(item => item.typeValue == 37)
        this.saleTypeList = sysDictList.filter(item => item.typeValue == 46)
      },
      confirmHandle() {
        if (!this.requestParam.shelvesPrice) {
          this.$toast('请输入出售价格')
          return
        }
        if (!this.requestParam.addressId) {
          this.$toast('请选择发货地址')
          return
        }
        if (!this.requestParam.deliveryDeadlineTime) {
          this.$toast('请选择发货截止时间')
          return
        }
        // 出售
        goodsOrderApi.sellGoods(this.requestParam).then(res => {
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
      goodsDetail(id) {
        if (!id) {
          return
        }
        let url = '/pages/goodsBase/detail?id=' + id
        this.$navigateTo(url)
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      jumpactNo(actNo) {
        let url = '/pages/store/index?actNo=' + actNo
        this.$navigateTo(url)
      },
      getDetailById(id) {
        if (id) {
          goodsOrderApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.orderData = res.data ? res.data : {}
              this.requestParam.addressId = this.orderData.addressId
              this.requestParam.id = this.orderData.id
              this.requestParam.deliveryDeadlineTime =  parseTime(this.orderData.deliveryDeadlineTime)
              this.requestParam.shelvesPrice = this.orderData.shelvesPrice
              this.requestParam.subsidiesPrice = this.orderData.subsidiesPrice
              this.keyup2()
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      }
    }
  }

</script>

<style lang="less" scoped>
  @import '@/assets/index/style.css';

  * {
    /*margin: 0;*/
    /*padding: 0;*/
    box-sizing: border-box;
  }

  /* 这里直接设置 1rem = 50px begin */
  html {
    font-size: 10px;
  }

  /* 这里直接设置 1rem = 50px end */
  html,
  body {
    /*font-family: "微软雅黑";*/
    /*color: #333;*/
    /*background: #fff;*/
  }

  strong {
    font-weight: 600;
  }


  .clearfix {
    &:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }
  }

  .btm-distance {
    margin-bottom: 15px;
  }


</style>
