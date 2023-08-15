<template lang="html">
  <view class="login">
    <u-navbar title="发货" bgColor="#F3F4F5">
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
<!--            <image mode="widthFix" @click="avatarShow(orderData.img)" style="  width: 80%;-->
<!--    margin-top: 28px;-->
<!--    margin-left: 10%;" :src="orderData.img"></image>-->

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
              <view class="xianglian">
                售价：
                <text>
                  {{orderData.shelvesPrice}}
                </text>
              </view>
              <view class="shugangfengexian">
                <text>|</text>
              </view>
              <view>
                到手：
                <text>{{orderData.theirPrice}}</text>
              </view>
            </view>
            <view class="dingdans_con_right_top xianglian">
              <view class="xianglian">
                入库价：
                <text>
                  {{orderData.price}}
                </text>
              </view>
              <view class="shugangfengexian">
                <text>|</text>
              </view>
              <view>
                利润：
                <text>{{(orderData.theirPrice - orderData.price - 10 ) | numFilter}}</text>
              </view>
            </view>

<!--            <view class="dingdans_con_right_top xianglian">-->
<!--              <text>入库价：</text>-->
<!--              <u&#45;&#45;text mode="price" :text="orderData.price"></u&#45;&#45;text>-->
<!--            </view>-->

          </view>
        </view>
      </view>
    </view>


<!--    <view class="width92 baisebeijing" style="margin-top: 10px;">-->
<!--      <view class="zuoyouduiqi" style="width: 85vw;margin-left: 4vw;    padding: 12px 0;">-->
<!--        <text style="font-weight: 600;font-size: 14px">出售数量</text>-->
<!--        <u-number-box v-model="requestParam.num" :max="max1"></u-number-box>-->
<!--      </view>-->
<!--    </view>-->

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
        <u-form-item label-width="25vw"  label="运单号" borderBottom>
          <u--input  disabledColor="#fff" inputAlign="right"
                     v-model="requestParam.waybillNo" border="none"></u--input>
          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </view>
    </u--form>

<!--    <view style="height: 70px"></view>-->

    <view class="baisebeijing shuipingjuzhong" style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <u-button style="width: 50vw; margin: 10px 15px;" type="primary" @click="confirmHandle">
        <text style=" font-size: 17px;font-weight: 600">确认发货</text>
      </u-button>
    </view>

    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="imageZoom" mode="widthFix" class="showImg"></image>
      </view>
    </view>
  </view>
</template>

<script>
  // import {goodsInventoryApi} from '@/api/goodsInventory'
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
          id: '',
          status: 4,
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

      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
      },
      confirmHandle() {
        if (!this.requestParam.addressId) {
          this.$toast('请选择发货地址')
          return
        }
        if (!this.requestParam.waybillNo) {
          this.$toast('请输入物流单号')
          return
        }
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
              this.requestParam.id = this.orderData.id
              this.requestParam.addressId = this.orderData.addressId
              this.requestParam.waybillNo = this.orderData.waybillNo
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

  .mint-button--small {
    display: inline-block;
    font-size: 13px;
    height: 6vw;
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

  .elInput1 {
    font-size: 14px;
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }

  .btm-distance {
    margin-bottom: 15px;
  }

  .city {
    height: 33px;
    width: 63px;
    border-radius: 5px;
    font-size: 16px;
    background-color: #F6F6F6;
    padding: 8px 0px;
    margin-right: 6px;
    margin-bottom: 13px;
    display: inline-block;
  }
  .cityActive {
    /*height: 36px;*/
    /*width: 63px;*/
    /*border-radius: 5px;*/
    /*font-size: 17px;*/
    /*background-color: #BEBEBE;*/
    /*padding: 9px 0px;*/
    /*margin-right: 6px;*/
    /*margin-bottom: 13px;*/
    /*// 自动换行*/
    /*display: inline-block;*/

    height: 33px;
    width: 63px;
    border-radius: 5px;
    font-size: 16px;
    background-color: #BEBEBE;
    padding: 8px 0px;
    margin-right: 6px;
    margin-bottom: 13px;
    display: inline-block;
    /*height: 48px;*/
    /*width: 59px;*/
    /*border-radius: 15px;*/
    /*font-size: 20px;*/
    /*background-color: #BEBEBE;*/
    /*padding: 14px 10px;*/
    /*margin-right: 10px;*/
    /*margin-bottom: 10px;*/
    /*display: inline-block;*/
  }


</style>
