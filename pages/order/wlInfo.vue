<template lang="html">
  <view class="login">
    <u-navbar title="物流详情" bgColor="#F3F4F5">
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
            <image mode="widthFix" @click="avatarShow(orderData.img)" style="  width: 80%;
    margin-top: 28px;
    margin-left: 10%;" :src="orderData.img"></image>
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
                顺丰速运：
                <text>
                  {{requestParamWl.waybillNo}}
                </text>
              </view>
<!--              <view class="shugangfengexian">-->
<!--                <text>|</text>-->
<!--              </view>-->
<!--              <view>-->
<!--                到手：-->
<!--                <text>{{orderData.theirPrice}}</text>-->
<!--              </view>-->
            </view>
            <view v-if="requestParamWl.freight" class="dingdans_con_right_top xianglian">
              <view class="xianglian">
                实际金额：
                <text>
                  {{requestParamWl.freight}}
                </text>
              </view>
            </view>
            <view class="dingdans_con_right_top xianglian">
              <view class="xianglian">
<!--                <text style="width: 20vw">-->
<!--                  收货地址：-->
<!--                </text>-->
                <view style="width: 60vw">
                  <text>
                    {{requestParamWl.receiverAddress}}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view style="    padding-bottom: 20px;" class="width92 baisebeijing">
      <view class="package-status">
        <view class="status-box" >
          <view class="status-list">
            <view
                :style="wlDataSize==(index+1) ? 'border-left : 0;margin-left: 2px;margin-top: -6px;' : ''"
                :class="index==0 || wlDataSize==(index+1) ? 'li latest' : 'li'"
                v-for="(item,index) in wlData" :key="index">
              <view
                  :class="index==0 || wlDataSize==(index+1) ? 'status-time-latest' : 'status-time-before'">
                <strong>
                  {{item.status}}
                </strong>
                <text style="margin-left: 4px;">
                     {{item.date | formateTime('{m}-{d} {h}:{i}') }}
                  </text>
              </view>
              <view
                  :class="index==0 || wlDataSize==(index+1) ? 'status-content-latest' : 'status-content-before'">
                {{item.message}}
              </view>
              <view class="status-line"></view>
            </view>
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

<!--    <u&#45;&#45;form-->
<!--        class=" width92 baisebeijing"-->
<!--        labelPosition="left"-->
<!--        :model="form"-->
<!--        ref="uForm"-->
<!--    >-->
<!--      <view style="width: 85vw;margin-left: 5vw;">-->
<!--        <u-form-item label-width="25vw"  label="地址"  borderBottom>-->
<!--          <hpy-form-select-->
<!--              v-if="addressList"-->
<!--              :dataList="addressList"-->
<!--              :hideBorder="true"-->
<!--              :hideArrow="true"-->
<!--              text="fieldName"-->
<!--              name="fieldValue"-->
<!--              v-model="requestParam.addressId"/>-->
<!--          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>-->
<!--        </u-form-item>-->
<!--        <u-form-item label-width="25vw"  label="运单号" borderBottom>-->
<!--          <u&#45;&#45;input  disabledColor="#fff" inputAlign="right"-->
<!--                     v-model="requestParam.waybillNo" border="none"></u&#45;&#45;input>-->
<!--          <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>-->
<!--        </u-form-item>-->
<!--      </view>-->
<!--    </u&#45;&#45;form>-->

<!--    &lt;!&ndash;    <view style="height: 70px"></view>&ndash;&gt;-->

<!--    <view class="baisebeijing shuipingjuzhong" style="width:100%;position:fixed;bottom:0;-->
<!--     border-top: solid #E2DDDD 1px;">-->
<!--      <u-button style="width: 50vw; margin: 10px 15px;" type="primary" @click="confirmHandle">-->
<!--        <text style=" font-size: 17px;font-weight: 600">确认发货</text>-->
<!--      </u-button>-->
<!--    </view>-->
    <view style="height: 30px"></view>
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
        // form: {
        //   sizeVoList: '',
        //   name: '',
        //   actNo: '',
        //   imgUrl: '',
        //   img: '',
        // },
        // array: [{name: '中国'}, {name: '美国'}, {name: '巴西'}, {name: '日本'}],
        // index: 2,
        // isShowDialog2: false,
        pictureZoomShow: false,
        imageZoom: false,
        // channelIdList: [],
        // range: [
        //   {value: 1, text: "线下"},
        //   {value: 2, text: "线上"}
        // ],
        // inventoryIndex: '',
        // activeIndex: [],
        // tipMsg: '',//请以9结尾
        // goodsId: '',
        // id: '',
        // unifiedPrice: '',
        // unifiedDwPrice: '',
        // tableData: [],
        // totalCount: 1,
        orderData: '',
        // max1: '',
        // addressList: [],
        // statusList: [],
        // saleTypeList: [],
        // requestParam: {
          id: '',
        //   status: 4,
        //   waybillNo: '',
        //   addressId: ''
        // },
        requestParamWl: {
          receiverAddress: '',
          addressId: '',
          waybillNo: '',
          freight: '',
        },
        wlDataSize: '',
        wlData: [],

      }
    },
    onLoad(options) {
      if (options) {
        this.id = options.id ? options.id : '';
        if (this.id) {
          this.getDetailById(this.id)
        }
        this.requestParamWl.addressId = options.addressId ? options.addressId : '';
        this.requestParamWl.waybillNo = options.waybillNo ? options.waybillNo : '';
        if (this.requestParamWl.waybillNo) {
          this.waybillNoList()
        }
      }
    },
    // mounted() {
    //   // this.listSysDict()
    // },
    methods: {

      // listSysDict() {
      //   let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
      //       uni.getStorageSync('sysDictList')) : []
      //   this.addressList = sysDictList.filter(item => item.typeValue == 38)
      // },
      // confirmHandle() {
      //   if (!this.requestParam.addressId) {
      //     this.$toast('请选择发货地址')
      //     return
      //   }
      //   if (!this.requestParam.waybillNo) {
      //     this.$toast('请输入物流单号')
      //     return
      //   }
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
      // jumpactNo(actNo) {
      //   let url = '/pages/store/index?actNo=' + actNo
      //   this.$navigateTo(url)
      // },
      getDetailById(id) {
        if (id) {
          goodsOrderApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.orderData = res.data ? res.data : {}
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      waybillNoList() {
        goodsOrderApi.waybillNoList(this.requestParamWl).then(res => {
          if (res.subCode === 1000) {
            if (res.data.list.length) {
              this.wlDataSize = res.data.list.length
              this.requestParamWl.receiverAddress = res.data.receiverAddress
              this.requestParamWl.freight = res.data.realAmount
              this.wlData = []
              for (let i = 0; i < res.data.list.length; i++) {
                let dataInfo = res.data.list[i]
                let status = '运输中'
                if (dataInfo.message.indexOf("已收取快件") >= 0) {
                  status = '已揽件'
                } else if (dataInfo.message.indexOf("可查看签收人信息") >= 0) {
                  status = '已签收'
                }
                dataInfo.status = status
                this.wlData.push(dataInfo)
              }
              this.isShowDialogWl = true
            } else {
              this.$toast("暂无物流信息，请核对物流单号")
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
        // if (id) {
        //   goodsOrderApi.getDetailById(id).then(res => {
        //     if (res.subCode === 1000) {
        //       this.orderData = res.data ? res.data : {}
        //       this.requestParam.id = this.orderData.id
        //       this.requestParam.addressId = this.orderData.addressId
        //       this.requestParam.waybillNo = this.orderData.waybillNo
        //     } else {
        //       this.$toast(res.subMsg)
        //     }
        //   })
        // }
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

  .package-status {
    overflow-y:scroll;
    color: #abaab0;
    /*color: #b8b8b8;*/
    padding: 18px 0 0 15px;
    font-size: 13px;
  }

  .package-status .status-list {
    margin: 0;
    padding: 0;
    margin-top: -5px;
    padding-left: 7px;
    list-style: none;
  }

  .package-status .status-list .li {
    border-left: 2px dashed #d9d9d9;
    width: 84vw;
    text-align: left;
  }

  .package-status .status-list .li:before { /* 流程点的样式 */
    content: '';
    border: 3px solid #f3f3f3;
    background-color: #d9d9d9;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin-left: -9px;
    margin-right: 10px
  }

  .package-status .status-list .latest:before {
    content: '';
    display: block;
    margin-right: 9px;
    width: 18px;
    height: 18px;
    margin-left: -12px;
    background-size: 100% 100%;
    background-image: url('../../static/img/wuliu.png');
  }

  .package-status .status-box {
    overflow: hidden
  }

  .package-status .status-list .li {
    height: auto;
  }

  .package-status .status-list {
    margin-top: -8px
  }

  .package-status .status-box {
    position: relative
  }

  .package-status .status-box:before {
    content: " ";
    background-color: #f3f3f3;
    display: block;
    position: absolute;
    top: -8px;
    left: 20px;
    width: 10px;
    height: 4px
  }

  .package-status .status-list {
    margin-top: 0px;
  }

  /* .package-status .status-list .latest{border:none} */
  /* .package-status .status-list li{margin-bottom:-2px} */


  .status-list .li:not(:first-child) {
    padding-top: 10px;
  }

  .status-content-before {
    text-align: left;
    margin-right: 20px;
    margin-left: 25px;
    margin-top: 3px;
  }

  .status-content-latest {
    text-align: left;
    margin-right: 20px;
    margin-left: 25px;
    color: #333;
    margin-top: 3px;
  }

  .status-time-before {
    text-align: left;
    margin-left: 25px;
    font-size: 15px;
    margin-top: -20px;

  }

  .status-time-latest {
    text-align: left;
    margin-left: 25px;
    color: #333;
    font-size: 15px;
    margin-top: -20px;
  }

  .status-line {
    padding-top: 15px;
  }

  .rigth-content-bottom {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 2px;
    /*margin-top: 16px;*/
    overflow: scroll;
  }
  .wlInfo {
    width: 80vw;
    border-bottom: 1px solid #ccc;
    margin-top: 10vw;
    text-align: left;
    margin-left: 40px;
    padding: 3vw;
    color: rgb(51, 51, 51);
    font-size: 4.2vw;
  }
</style>
