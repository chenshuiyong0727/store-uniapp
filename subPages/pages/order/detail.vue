<template lang="html">
  <view class="hello">
    <u-navbar title="订单详情" bgColor="#F3F4F5">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <image class="back_icon" :src="fileUrl +'/static/img/back3.png'"></image>
      </view>
      <view class="u-nav-slot" style="font-size: 15px;" slot="right">
        <rudon-rowMenuDotDotDot :localdata="optionsOp" @change="menuActionList($event)">
          <text v-if="[2,3,4,5,6,11].includes(form.status)">更多</text>
          <text v-else >操作</text>
        </rudon-rowMenuDotDotDot>
      </view>
    </u-navbar>
    <view v-if="form.status == 3"
          style="color: white;width: 100vw; height: 140px;background-color: #2b2d3c;margin-top: -3.1px;">
      <view class="zuoyouduiqi" style="color: white; padding-top: 25px;">
        <view style="margin-left: 20px;">
          <strong style="font-size: 18px;">{{ form.status | dictToDescTypeValue(37) }}</strong>
        </view>
        <view style="margin-right: 15px;">
          <strong v-if="days" style="font-size: 18px;">
            {{days}}
          </strong>
          <text v-if="days">天</text>
          <strong v-if="hours" style="font-size: 18px;">
            {{hours}}
          </strong>
          <text v-if="hours">时</text>
          <strong style="font-size: 18px;">
            {{minutes}}
          </strong>
          <text>分</text>
          <strong style="font-size: 18px;">
            {{seconds}}
          </strong>
          <text>秒</text>
        </view>
      </view>

      <view class="zuoyouduiqi" style="color: white; padding-top: 10px;">
        <view style="margin-left: 15px;width: 69vw;">
          <text style="font-size: 13px;color: #edf0f9">
            买家已付款，请在{{form.deliveryDeadlineTime | formateTime }}
            之前发货并上传正确的物流单号，超时将扣除保证金。
          </text>
        </view>
        <view style="margin-right: 15px;width: 28vw;    text-align: right;    margin-top: -38px;">
          <text style="font-size: 14.5px;color: #edf0f9">
            发货剩余时间
          </text>
        </view>
      </view>
    </view>
    <view v-else-if="form.status == 7"
          style="color: white;width: 100vw; background-color: #2b2d3c;margin-top: -3.1px;    padding-bottom: 20px;">
      <view class="zuoyouduiqi" style="color: white; padding-top: 25px;">
        <view style="margin-left: 20px;">
          <strong style="font-size: 17.5px;">{{ form.status | dictToDescTypeValue(37) }}</strong>
        </view>
      </view>

      <view class="secInfodata">
        <view class="zuoyouduiqi secInfo">
          <view style="width: 60vw;">
            <strong style="font-size: 17px;">
              预计收入
            </strong>
          </view>
          <view style="width: 40vw;    text-align: right;margin-right: -2vw;">
            <strong style="font-size: 14px;">
              ¥
            </strong>
            <strong style="font-size: 20px ;margin-left: 3px;">
              {{form.theirPrice}}
            </strong>
            <image mode="widthFix" style=" margin-left: -2px;   margin-top: -9px;width: 17px;"
                   :src="fileUrl +'/static/img/more-dw.jpg'"></image>
          </view>
        </view>
        <view class="package-status-dw" style="overflow-y:scroll;">
          <view class="status-box-dw">
            <ul class="status-list-dw">
              <li class="">
                <view class="status-time-before-dw zuoyouduiqi">
                  <strong style="font-size: 15.5px">
                    已到账
                  </strong>
                  <text>
                    2023-07-17 11:36:41
                  </text>
                </view>
                <view class="status-content-before-dw">
                  <view style="width: 79vw;margin-left: 21px">
                    <text>
                      收入金额已发放至您的
                    </text>
                    <text class="color-dw-1">
                      钱包余额
                    </text>
                    <text style="margin-left: 1px">
                      ，请前往
                    </text>
                    <text class="color-dw-1">
                      结算账单
                    </text>
                  </view>
                  <view style="margin-left: 21px;">
                    <text>
                      查看明细
                    </text>
                  </view>
                  <view style="font-size: 12px;margin-top: 7px;margin-left: 21px;color: #848388">
                    <text>
                      展开全部
                    </text>
                    <image mode="widthFix" style="margin-top: -2px;width: 16px;"
                           :src="fileUrl +'/static/img/xiala.png'"></image>
                  </view>
                </view>
                <view class="status-line-dw"></view>
              </li>
            </ul>
          </view>
        </view>
      </view>

    </view>


    <view v-else
          style="color: white;width: 100vw; background-color: #2b2d3c;margin-top: -3.1px;">
      <view style="margin-left: 20px; padding-top: 30px;">
        <strong v-if="form.status == 4 || form.status == 5" style="font-size: 18px;">待平台收货</strong>
        <strong v-else-if="form.status == 6" style="font-size: 18px;">待平台查验鉴别</strong>
        <strong v-else="form.status == 2 || form.status == 11 || form.status == 8"
                style="font-size: 18px;">{{ form.status | dictToDescTypeValue(37) }}</strong>
      </view>
      <view style="margin-left: 20px; padding-top: 5px;padding-bottom: 25px;">
        <text v-if="form.status == 4 || form.status == 5 " style="font-size: 13px;color: #edf0f9">
          平台将在收到您的商品后进行鉴别。
        </text>
        <text v-if="form.status == 2 || form.status == 11 " style="font-size: 13px;color: #edf0f9">
          商品已上架,等待买家购买。
        </text>
        <text v-if="form.status == 6" style="font-size: 13px;color: #edf0f9">鉴别师正在鉴别，请耐心等待。</text>
        <text v-if="form.status == 8" style="font-size: 13px;color: #edf0f9">未通过平台鉴别，请尽快处理。</text>
      </view>
    </view>

    <view
        v-if="requestParamWl.waybillNo && ( form.status == 4 || form.status ==  5 || form.status == 6 || form.status == 7)"
        style="color: #333333;width: 100vw; height: 40px;background-color: white;">
      <view class="zuoyouduiqi" style="padding-top: 25px;">
        <view style="margin-left: 10px;" class="xianglian">
          <image style="width: 28px; margin-right: 3px" mode="widthFix"
                 src="../../static/img/ysz.png"></image>
          <strong v-if="form.status == 7" style="font-size: 15px;">查验鉴别通过</strong>
          <strong v-else style="font-size: 15px; ">{{ form.status | dictToDescTypeValue(37)
            }}</strong>
        </view>
        <view v-if="requestParamWl.waybillNo" style="margin-right: 15px;" class="xianglian">
          <text v-if="!wldataLastDate" style="font-size: 15px; color: #5f6772">暂未物流信息</text>
          <text v-if="wldataLastDate" @click="gotoWl" style="font-size: 15px; color: #5f6772">查看物流
          </text>
          <image mode="widthFix" v-if="wldataLastDate" @click="gotoWl" style="    margin-top: -2px;
    width: 18px;" src="../../static/img/more-dw.jpg"></image>
        </view>
      </view>
    </view>
    <view
        v-if="requestParamWl.waybillNo  && ( form.status == 4 || form.status ==  5 || form.status == 6 || form.status == 7)"
        style="color: #808082;width: 100vw; background-color: white;">
      <view class="zuoyouduiqi" style="padding-top: 17px;
          margin-bottom: 7px;
    padding-right: 19px;
    padding-bottom: 13px;
    padding-left: 25px;
    background-color: white;">
        <view style="margin-left: 17px;width: 71vw;">
          <text style="font-size: 15px; margin-left: -3px;">
            {{wldataLastDate | formateTime }}
          </text>
        </view>
      </view>
    </view>

    <view v-if="form.addressId"
          style="color: #333333;width: 100vw; height: 40px;background-color: white;">
      <view class="zuoyouduiqi" style="padding-top: 25px;">
        <view style="margin-left: 10px;" class="xianglian">
          <image mode="widthFix" style="width: 28px;margin-top: -5px;"
                 :src="fileUrl +'/static/img/shouhuodizhi.png'"></image>
          <strong style="font-size: 15px; margin-left: -1px;">收货人：得物App白冰冰</strong>
                 src="../../static/img/shouhuodizhi.png"></image>
          <text style="font-size: 15px;font-weight: 600 ">收货人：得物App白冰冰</text>
        </view>
        <view style="margin-right: 15px;">
          <strong style="font-size: 16px;">021-80392283</strong>
        </view>
      </view>
    </view>
    <view v-if="form.addressId"
          style="color: #808082;width: 100vw; background-color: white;">
      <view class="zuoyouduiqi" style="padding-top: 15px;
    padding-right: 19px;
    padding-bottom: 13px;
    padding-left: 25px;
    background-color: white;">
        <view style="margin-left: 10px;width: 71vw;">
          <text style="font-size: 14px; margin-left: -3px;">
            {{form.addressId | dictToDescTypeValue(51)}}
          </text>
        </view>
        <view style="
    text-align: right;
    margin-top: -19px;">
          <text class="dw-button-common-a2"  @click="$copyUrl(form.waybillNo )"
                  style="    padding: 1px 5px;">复制
          </text>
        </view>
      </view>
    </view>

    <view class="dingdans_item_dw" style="margin-top: 7px;
    border-bottom: 0px;
">
      <view class="dingdans_con_dw">
        <view class="dingdans_con_left_dw" @click="avatarShow(form.img)">
          <image mode="widthFix" :src="form.img" v-if="form.img"></image>
          <image mode="widthFix" :src="fileUrl+form.imgUrl" style="margin-top: 10px;" v-if="!form.img && form.imgUrl" ></image>
          <p class="mark_dw">
            <text class="text_dw">
              {{ form.saleType | dictToDescTypeValue(46) }}
            </text>
          </p>
        </view>
        <view class="diangdans_con_right_dw" style="padding-right: 3%;
    padding-left: 3%;">
          <view class="dingdans_con_right_top_dw" @click="goodsDetail(form.goodsId) ">
            <!--              <text>-->
            <!--                {{form.goodsName | sizeFilterNum(40) }}-->
            <!--              </text>-->
            <text class="chaochu" style="width: 65vw">
              {{form.goodsName }}
            </text>
          </view>

          <view class="dingdans_con_right_top_dw_3">
            <text v-if="form.status == 3 && form.deliveryDeadlineTime" style="margin-left: 2px">
              <text>发货截止时间</text>
            </text>
            <text v-if="form.status == 3 && form.deliveryDeadlineTime" style="margin-left: 4px"
                  class="dingdans_con_dw_time">
              {{form.deliveryDeadlineTime | formateTime }}
            </text>
          </view>
          <view class="dingdans_con_right_top_dw_1 xianglian">
            <text @click="jumpactNo(form.actNo)">
              {{form.actNo}}
            </text>
            <image @click="$copyUrl(form.actNo)" class="fuzhitupian"
                   :src="fileUrl +'/static/img/copy.png'"></image>
          </view>
          <view v-if="form.surplusDay && form.saleType ==2  && form.status != 7 "
                style="margin-bottom: 5px;">
            <text v-if="form.surplusDay >12">剩余天数</text>
            <text v-if="form.surplusDay >=0 && form.surplusDay <=12" class="color-danger">剩余天数
            </text>
            <text v-if="form.surplusDay < 0" class="color-danger">到期天数</text>
            <text v-if="form.surplusDay >12">
              {{form.surplusDay}}
            </text>
            <strong v-if="form.surplusDay >=0 && form.surplusDay <=12" class="color-danger">
              {{form.surplusDay}}
            </strong>
            <strong v-if="form.surplusDay < 0" class="color-danger">
              {{ 0 - form.surplusDay}}
            </strong>
          </view>
          <view class="dingdans_con_right_top_dw_2">
            <view>
              <text>
                尺码：{{form.size}}
              </text>
            </view>
            <view>
              <text style="margin-left: 3px;color: #333333;font-size: 15px">
                <text style="font-size: 13px">¥</text>
                <strong style="margin-left: 3px;">{{form.shelvesPrice}}</strong>
              </text>
            </view>
          </view>
        </view>
      </view>

      <view class="dingdans_bottom_dw">
        <view v-if="[2,11].includes(form.status)" class="dingdans_top_left_dw">
          <text v-if="form.thisTimePrice">最低售价</text>
          <text v-if="form.thisTimePrice">{{form.thisTimePrice }} ,</text>
          <text v-if="form.thisTimeProfits" style="margin-left: 3px">预估利润</text>
          <text v-if="form.thisTimeProfits">{{form.thisTimeProfits }}</text>
        </view>
        <view v-else class="dingdans_top_left_dw">
          <text>利润</text>
          <text class="color-danger" style="margin-left: 3px">{{form.profits }}</text>
        </view>
        <!--          操作栏-->
        <view class="dingdans_top_right_dw">
          <text v-if="form.theirPrice && ![2,11].includes(form.status)">预计收入</text>
          <strong v-if="form.theirPrice && ![2,11].includes(form.status)"
                  style="margin-left: 3px;color: #333333">
            ¥
          </strong>
          <strong v-if="form.theirPrice && ![2,11].includes(form.status)"
                  style="font-size: 17px ;margin-left: 3px;color: #333333">
            {{form.theirPrice}}
          </strong>
        </view>
      </view>
    </view>
    <view
        style="color: #808082;width: 100vw; background-color: white;margin-top: 7px;font-size: 14px; ">
      <view style="padding-top: 15px;
    padding-right: 19px;padding-bottom: 10px;
    padding-left: 20px;color: #333333;">
        <view style="">
          <strong>
            订单费用
          </strong>
        </view>
      </view>
      <view class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>入库价：</text>
        </view>
        <view style="text-align: left; ">
          <text>¥</text>
          <text>{{form.price}}</text>
        </view>
      </view>
      <view v-if="form.subsidiesPrice" class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>补贴价：</text>
        </view>
        <view style="text-align: left; ">
          <text>¥</text>
          <text>{{form.subsidiesPrice}}</text>
        </view>
      </view>
      <view class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>手续费：</text>
        </view>
        <view style="text-align: left; ">
          <text>¥</text>
          <text>{{form.poundage}}</text>
        </view>
      </view>
      <view class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>运费：</text>
        </view>
        <view style="text-align: left; ">
          <text>¥</text>
          <text>{{form.freight}}</text>
        </view>
      </view>
      <view class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text></text>
        </view>
        <view style="text-align: left; ">
        </view>
      </view>
    </view>
    <!--订单信息-->
    <view
        style="color: #808082;width: 100vw; background-color: white;margin-top: 7px;font-size: 14px; ">
      <view style="padding-top: 15px;
    padding-right: 19px;padding-bottom: 10px;
    padding-left: 20px;color: #333333;">
        <view style="">
          <strong>
            订单信息
          </strong>
        </view>
      </view>
      <view class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>订单编号：</text>
        </view>
        <view style="text-align: right; ">
          <text>{{form.orderNo}}</text>
          <text class="dw-button-common-a2" @click="$copyUrl(form.orderNo )"
                  style=" margin-left: 3px;   padding: 1px 5px;">复制
          </text>
        </view>
      </view>
      <view v-if="form.waybillNo" class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>物流单号：</text>
        </view>
        <view style="text-align: right; ">
          <text>{{form.waybillNo}}</text>
          <text class="dw-button-common-a2" @click="$copyUrl(form.waybillNo )"
                  style=" margin-left: 3px;   padding: 1px 5px;">复制
          </text>
        </view>
      </view>
      <view class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>创建时间：</text>
        </view>
        <view style="text-align: right; ">
          <text>{{form.createTime | formateTime }}</text>
        </view>
      </view>
      <view v-if="form.sellTime" class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>付款时间：</text>
        </view>
        <view style="text-align: right; ">
          <text>{{form.sellTime | formateTime }}</text>
        </view>
      </view>
      <view v-if="form.deliveryDeadlineTime" class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>发货截止时间：</text>
        </view>
        <view style="text-align: right; ">
          <text>{{form.deliveryDeadlineTime | formateTime }}</text>
        </view>
      </view>
      <view v-if="form.successTime" class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>交易成功时间：</text>
        </view>
        <view style="text-align: right; ">
          <text>{{form.successTime | formateTime }}</text>
        </view>
      </view>

      <view v-if="form.inStoreTime" class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>入仓时间：</text>
        </view>
        <view style="text-align: right; ">
          <text>{{form.inStoreTime | formateTime }}</text>
        </view>
      </view>

      <view v-if="form.inStoreTimeEnd" class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>仓储免费时间：</text>
        </view>
        <view style="text-align: right; ">
          <text>{{form.inStoreTimeEnd | formateTime }}</text>
        </view>
      </view>

      <view v-if="form.inStoreFreeDay" class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text>免费天数：</text>
        </view>
        <view style="text-align: right; ">
          <text>{{form.inStoreFreeDay}}</text>
        </view>
      </view>
      <view class="zuoyouduiqi orderInfoleft">
        <view style="width: 30vw;">
          <text></text>
        </view>
        <view style="text-align: left; ">
        </view>
      </view>
    </view>

    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="imageZoom" mode="widthFix" class="showImg"></image>
      </view>
    </view>

    <view style="height: 70px"></view>
    <view class="baisebeijing shuipingjuzhong" style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <u-button v-if="form.status==2" style="width: 50vw; margin: 10px 15px;" type="primary"  @click="toSell(form.id)">
        <text class="dibuanniuwenzi">出售</text>
      </u-button>
      <u-button v-else-if="form.status==3" style="width: 50vw; margin: 10px 15px;" type="primary"  @click="toDelivery(form.id)">
        <text class="dibuanniuwenzi">发货</text>
      </u-button>
      <u-button v-else-if="form.status==4" style="width: 50vw; margin: 10px 15px;" type="primary"   @click="changeStatusComfirm(form.id,5,'确认揽件')">
        <text class="dibuanniuwenzi">揽件</text>
      </u-button>
      <u-button v-else-if="form.status==5" style="width: 50vw; margin: 10px 15px;" type="primary"   @click="changeStatusComfirm(form.id,6,'确认收货')">
        <text class="dibuanniuwenzi">收货</text>
      </u-button>
      <u-button  v-else-if="[6,11].includes(form.status)"  style="width: 50vw; margin: 10px 15px;"   type="primary" @click="update(form,'交易成功')">
        <text class="dibuanniuwenzi">成功</text>
      </u-button>
<!--      <text v-if="item.status==2" class="dw-button-common" @click="toSell(item.id)">出售</text>-->
<!--      <text v-else-if="item.status==3" class="dw-button-common" @click="toDelivery(item.id)">发货</text>-->
<!--      <text v-else-if="item.status==4" class="dw-button-common" @click="changeStatusComfirm(item.id,5,'确认揽件')">揽件</text>-->
<!--      <text v-else-if="item.status==5" class="dw-button-common" @click="changeStatusComfirm(item.id,6,'确认收货')">收货</text>-->
<!--      <text v-else-if="[6,11].includes(item.status)"  class="dw-button-common" @click="update(item,'交易成功')">成功</text>-->
    </view>
  </view>
</template>

<script>
  import {goodsOrderApi} from '@/api/goodsOrder'
  import {parseTime} from '@/utils'
  export default {
    components: {},
 data() {
      return {
        fileUrl: this.$fileUrl,
        optionsOp: [
          {
            value: 'update',
            text: '修改'
          },
          {
            value: 'gotoDw',
            text: '得物'
          }
        ],
        form: {},
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        imageZoom: '',
        isShowDialogWl: false,
        requestParamWl: {
          receiverAddress: '',
          addressId: '',
          waybillNo: '',
          freight: '',
        },
        wlData: [],
        wlDataSize: '',
        wldataLastDate: '',
        pictureZoomShow: false,
        dataStatusList: [],
        statusList: [],
        addressList: [],
        saleTypeList: [],
        type: '',
        id: '',
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
    methods: {
      menuActionList(action) {
        let item = this.form
        if (action === '') {
          return
        }
        if ('update' == action) {
          this.update(item )
        }
        if ('gotoDw' == action) {
          this.gotoDw(item.spuId )
        }
      },
      gotoDw(spuId) {
        if (!spuId){
          return
        }
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId="+ spuId;
        // #ifdef APP-PLUS
        plus.runtime.openURL(url) //这里默认使用外部浏览器打开而不是内部web-view组件打开
        // #endif
        // #ifdef H5
        window.open(url)
        // #endif
      },
      changeStatusComfirm(id,status,msg) {
        var _this = this;
        uni.showModal({
          title: '',
          confirmColor: '#409eff',
          content: msg,
          success: function (res) {
            if (res.confirm) {
              _this.changeStatus(_this,id,status)
            } else if (res.cancel) {
            }
          }
        });
      },
      changeStatus(_this,id,status) {
        let data={}
        data.status = status
        data.id = id
        goodsOrderApi.update(data).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            _this.getDetailById(id)
          }
        })
      },
      toSell(id) {
        this.$navigateTo('/pages/order/toSell?type=1&id=' +id)
      },
      toDelivery(id) {
        this.$navigateTo('/pages/order/toDelivery?type=1&id=' +id)
      },
      update(row,titleName) {
        let url = '/pages/order/update?type=1&id=' + row.id
        if (titleName){
          url = url + '&titleName=' +titleName
        }
        this.$navigateTo(url)
      },
      jumpactNo(actNo) {
        let url = '/pages/store/index?actNo=' + actNo
        this.$navigateTo(url)
      },
      goodsDetail(id) {
        if (!id) {
          return
        }
        let url = '/subPages/pages/goodsBase/detail?id=' + id
        this.$navigateTo(url)
      },
      countdown(deliveryDeadlineTime) {
        let endTime = new Date(deliveryDeadlineTime).getTime();
        let startTime = new Date().getTime();
        let totalSeconds = endTime - startTime;
        let interval = setInterval(() => {
          if (totalSeconds > 0) {
            this.days = Math.floor(totalSeconds / (24 * 60 * 60 * 1000));
            this.hours = Math.floor(
                (totalSeconds - this.days * 24 * 60 * 60 * 1000) / (60 * 60 * 1000)
            );
            this.minutes = Math.floor(
                (totalSeconds -
                    this.days * 24 * 60 * 60 * 1000 -
                    this.hours * 60 * 60 * 1000) /
                (60 * 1000)
            );
            this.seconds = Math.floor(
                (totalSeconds -
                    this.days * 24 * 60 * 60 * 1000 -
                    this.hours * 60 * 60 * 1000 -
                    this.minutes * 60 * 1000) /
                1000
            );
            totalSeconds -= 1000;
          } else {
            clearInterval(interval);
          }
        }, 1000);
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      getDetailById(id) {
        if (id) {
          goodsOrderApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {}
              if (this.form.deliveryDeadlineTime) {
                this.countdown(parseTime(this.form.deliveryDeadlineTime))
              }
              if (this.form.profits && this.form.price) {
                // 利润比
                let profitsThan = (this.form.profits / this.form.price) * 100
                this.form.profitsThan = parseFloat(profitsThan).toFixed(2)
                this.form.profitsThan = this.form.profitsThan + '%'
              } else {
                this.form.profitsThan = ''
              }
              if (this.form.theirPrice && this.form.price) {
                // 预估利润
                let forecastProfits = this.form.theirPrice - this.form.price - 10
                this.form.forecastProfits = parseFloat(forecastProfits).toFixed(2)
              } else {
                this.form.forecastProfits = ''
              }
              this.form.deliveryDeadlineTime = this.form.deliveryDeadlineTime ? parseTime(
                  this.form.deliveryDeadlineTime) : ''
              this.form.inStoreTimeEnd = this.form.inStoreTimeEnd ? parseTime(
                  this.form.inStoreTimeEnd) : ''
              this.form.inStoreTime = this.form.inStoreTime ? parseTime(this.form.inStoreTime) : ''
              this.form.sellTime = this.form.sellTime ? parseTime(this.form.sellTime) : ''
              this.form.successTime = this.form.successTime ? parseTime(this.form.successTime) : ''
              this.form.createTime = this.form.createTime ? parseTime(this.form.createTime) : ''
              this.form.updateTime = this.form.updateTime ? parseTime(this.form.updateTime) : ''
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      getWl() {
        if (!this.form.addressId || !this.form.waybillNo) {
          // this.$toast('没有物流单号')
          return
        }
        this.requestParamWl.addressId = this.form.addressId
        this.requestParamWl.waybillNo = this.form.waybillNo
        goodsOrderApi.waybillNoList(this.requestParamWl).then(res => {
          if (res.subCode === 1000) {
            if (res.data.list.length) {
              this.wlDataSize = res.data.list.length
              this.requestParamWl.receiverAddress = res.data.receiverAddress
              this.requestParamWl.freight = res.data.realAmount
              this.wlData = []
              for (let i = 0; i < res.data.list.length; i++) {
                let dataInfo = res.data.list[i]
                if (i == 0 && dataInfo && dataInfo.date) {
                  this.wldataLastDate = dataInfo.date
                }
                let status = '运输中'
                if (dataInfo.message.indexOf("已收取快件") >= 0) {
                  status = '已揽件'
                } else if (dataInfo.message.indexOf("可查看签收人信息") >= 0) {
                  status = '已签收'
                }
                dataInfo.status = status
                this.wlData.push(dataInfo)
              }
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      gotoWl() {
        this.isShowDialogWl = true
      },
    }
  }
</script>

<style>
  @import '@/assets/index/style.css';

  strong {
    font-weight: 600;
  }

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
  }

  /* 给要上拉的容器设置 begin */
  .hello {
    background-color: #f3f2f8;
    padding-top: 12vw;
    font-size: 13px;
    height: 100vh;
    overflow-y: auto;
  }

  .orderInfoleft {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 19px;
    padding-left: 20px;
  }

  .secInfo {
    margin-top: 24px;
    padding-top: 14px;
    padding-bottom: 14px;
    width: 86vw;
    margin-left: 4vw;
    border-bottom: 1px solid #f0f0f0;
  }

  .secInfodata {
    margin-left: 3vw;
    border-radius: 5px;
    color: rgb(51, 51, 51);
    background-color: rgb(255, 255, 255);
    width: 94vw;
  }


  .package-status-dw {
    color: #2c2a34;
    margin-left: 15px;
    padding: 18px 0 0 0
  }

  .package-status-dw .status-list-dw {
    margin: 0;
    padding: 0;
    margin-top: -5px;
    padding-left: 9px;
    list-style: none;
  }

  .package-status-dw .status-list-dw li {
    /*border-left: 1px solid #f1f1f1;*/
    width: 84vw;
    text-align: left;
  }

  .package-status-dw .status-list-dw li:before { /* 流程点的样式 */
    content: '';
    border: 4px solid #1ba5ad;
    background-color: #ffffff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    margin-left: -9px;
    margin-right: 10px;
  }

  .package-status-dw .status-list-dw .latest:before {
    background-color: #333;
    border-color: #333;
  }

  .package-status-dw .status-box-dw {
    overflow: hidden
  }

  .package-status-dw .status-list-dw li {
    height: auto;
  }

  .package-status-dw .status-list-dw {
    margin-top: -8px
  }

  .package-status-dw .status-box-dw {
    position: relative
  }

  .package-status-dw .status-box-dw:before {
    content: " ";
    background-color: #f3f3f3;
    display: block;
    position: absolute;
    top: -8px;
    left: 20px;
    width: 10px;
    height: 4px
  }

  .package-status-dw .status-list-dw {
    margin-top: 0px;
  }

  .status-list-dw li:not(:first-child) {
    padding-top: 10px;
  }

  .status-content-before-dw {
    text-align: left;
    margin-right: 20px;
    margin-left: -1px;
    margin-top: 5px;
    font-size: 12.5px;
    border-left: 1px solid #f1f1f1;
  }


  .status-time-before-dw {
    text-align: left;
    margin-left: 21px;
    font-size: 15px;
    margin-top: -20px;

  }

  .status-line-dw {
    padding-top: 15px;
  }

  .color-dw-1 {
    font-weight: 600;
    color: #1ba5ad;
    margin-right: -3px;
  }
</style>
