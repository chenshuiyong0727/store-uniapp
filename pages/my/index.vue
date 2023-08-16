<template lang="html">
  <view class="car2" ref="content"
        style="height: 100%;font-size: 15px; border-top:0;    overflow: auto;">
    <u-navbar title="个人中心" bgColor="#f3faff">
      <view @click="scanCode" class="u-nav-slot" slot="left">
        <image style="width: 23px; height: 23px;" src="../../static/img/saoyisao4.png"></image>
      </view>
      <view @click="comfirm(1)" class="u-nav-slot" slot="right">
        <image style=" width: 26px;height: 26px;" src="../../static/img/setting0.png"></image>
      </view>
    </u-navbar>

    <view style="
        margin-top: 44px;
        padding-bottom: 35vw;
        padding-top: 5vw;
         background-image: linear-gradient(#e5f4ff, #f3f2f8);">
      <view class="header zuoyouduiqi">
        <view @click="userInfo" class="header-icon xianglian" style="margin-left: 6vw;">
          <image v-if="imgUrl" style="width: 50px;height: 50px;border-radius: 100%;" :src="fileUrl + imgUrl"></image>
          <image v-else style="width: 50px;height: 50px;border-radius: 100%;" :src="fileUrl + '/static/operateSteps/1692081866811.jpg'"></image>
          <text style="margin-left: 12px;">{{
            form.userRealName ? form.userRealName : form.userAccount ? form.userAccount : '系统用户'
            }}
          </text>
        </view>
        <view class="my-indent-right" style="margin-right: 6vw;">
          <u-button type="primary" @click="comfirm(2)" class="custom-style" shape="circle" round>
            账户管理
          </u-button>
        </view>
      </view>
    </view>


    <view class="main" :style="!flag? 'margin-top: -138px;': ''">
      <view class="my-indent" style="    margin-bottom: -10px;"  @click="$navigateTo('/pages/order/index?backUrl=/pages/my/index')">
        <text class="my-indent-left">订单</text>
        <view class="my-indent-right">
          <text style="font-weight: 500">全部</text>
          <image class="my-indent-img" src="../../static/img/more.png"></image>
        </view>
      </view>

      <view class="my-pay">
        <view  @click="$navigateTo('/pages/order/index?backUrl=/pages/my/index&current=1&status=3')">
          <image
              :class="orderIofo.count3 > 0 ? 'count3' : ''"
              src="../../static/img/new/daifahuo.png"></image>
          <i v-if="orderIofo.count3" class="danger-num">{{orderIofo.count3}}</i>
          <p style="color: #333">待发货</p>
        </view>
        <view   @click="$navigateTo('/pages/order/index?backUrl=/pages/my/index&current=2&status=4')">
          <!--                  <text class="icon2-thecar"></text>-->
          <image
              :class="orderIofo.count4 > 0 ? 'count3' : ''"
              src="../../static/img/new/fahuo.png"></image>
          <i v-if="orderIofo.count4" style="margin-left: -14px" class="danger-num">{{orderIofo.count4}}</i>
          <p style="color: #333">已发货</p>
        </view>

        <view  @click="$navigateTo('/pages/order/index?backUrl=/pages/my/index&current=3&status=5')">
          <image
              :class="orderIofo.count5 > 0 ? 'count3' : ''"
              src="../../static/img/new/yilanjian.png"></image>
          <i v-if="orderIofo.count5" class="danger-num">{{orderIofo.count5}}</i>
          <p style="color: #333">运输中</p>
        </view>

        <view @click="$navigateTo('/pages/order/index?backUrl=/pages/my/index&current=4&status=6')">
          <image
              :class="orderIofo.count6 > 0 ? 'count3' : ''"
              src="../../static/img/new/yishouhuo.png"></image>
          <i v-if="orderIofo.count6" class="danger-num">{{orderIofo.count6}}</i>
          <p style="color: #333">已收货</p>
        </view>

      </view>

      <view class="my-indent" style="    margin-bottom: -10px;" @click="putin">
        <text class="my-indent-left">报表</text>
      </view>
      <view class="my-settle1" style="margin-top: 0;border-top-style:none">
        <view @click="putin" class="my-settle1-top">
          <view>
            <image style="width: 27px;height: 27px;" src="../../static/img/new/ruku.png"></image>
          </view>

          <p>
            <text style="color: #333">入库报表</text>
            <image class="my-indent-img-1" src="../../static/img/more.png"></image>
          </p>
        </view>
        <view @click="$navigateTo('/pages/report/channelStorage')" class="my-settle1-top">
          <view>
            <image style="width: 27px;height: 27px;"
                   src="../../static/img/new/qudao.png"></image>
          </view>

          <p>
            <text style="color: #333">入库渠道报表</text>
            <image class="my-indent-img-1" src="../../static/img/more.png"></image>
          </p>
        </view>
        <view @click="$navigateTo('/pages/report/sellList')" class="my-settle1-bottom">
          <view>
            <image style="width: 27px;height: 27px;"
                   src="../../static/img/new/xiaoshou.png"></image>
          </view>
          <p>
            <text style="color: #333">销售报表</text>
            <image class="my-indent-img-1" src="../../static/img/more.png"></image>
          </p>
        </view>
        <view @click="$navigateTo('/pages/report/areaSellList')" class="my-settle1-bottom">
          <view>
            <image style="width: 27px;height: 27px;" src="../../static/img/new/quyu.png"></image>
          </view>
          <p>
            <text style="color: #333">区域销售报表</text>
            <image class="my-indent-img-1" src="../../static/img/more.png"></image>
          </p>
        </view>
      </view>
      <view class="my-indent" style="    margin-bottom: -10px;">
        <text class="my-indent-left">服务</text>
      </view>
      <view class="my-pay-1" style="border-bottom-style:none;">
        <view @click="$navigateTo('/pages/goodsBase/act')">
          <image
              style="margin-top: 7px;margin-bottom: -4px;width: 27px;height: 27px;"
              src="../../static/img/new/huodong.png"></image>
          <p style="color: #333">活动</p>
        </view>
        <view @click="$navigateTo('/pages/other/index')">
          <image
              style="margin-top: 7px;margin-bottom: -4px;width: 27px;height: 27px;"
              src="../../static/img/new/qita.png"></image>
          <p style="color: #333">其他收支</p>
        </view>
        <view @click="$navigateTo('/pages/goodsDefects/index')">
          <image
              style="margin-top: 7px;margin-bottom: -4px;width: 27px;height: 27px;"
              src="../../static/img/new/xiaci.png"></image>
          <p style="color: #333">瑕疵商品</p>
        </view>
        <view @click="$navigateTo('/pages/gift/index')">
          <image
              style="margin-top: 7px;margin-bottom: -4px;width: 27px;height: 27px;"
              src="../../static/img/new/hongbao.png"></image>
          <p style="color: #333">红包</p>
        </view>
      </view>
      <view class="my-pay-1" style="padding-bottom: 5vw">
        <view  @click="$navigateTo('/pages/memo/index')"style="width: 25%">
          <image
              style="margin-top: 7px;margin-bottom: -4px;width: 27px;height: 27px;"
              src="../../static/img/new/memo.png"></image>
          <p style="color: #333">备忘录</p>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
 data() {
      return {
        fileUrl: this.$fileUrl,
        flag: false,
        imgUrl: uni.getStorageSync('userIcon'),
        fileUrl: this.$fileUrl,
        orderIofo: {},
        form: {
          userAccount: '',
          userMobile: '',
          userRealName: '',
          imgUrl: ''
        }
      }
    },
    onLoad(options) {
      if (options && options.userRealName) {
        this.form.userRealName = options.userRealName
      }
      this.init()
    },
    onPullDownRefresh() {
      uni.stopPullDownRefresh();
      this.init();
    },
    methods: {
      init() {
        this.getUcUser();
        this.getData()
      },
      userInfo() {
        this.$navigateTo('/pages/my/userInfo')
      },
      putin() {
        this.$navigateTo('/pages/report/putin')
      },

      scanCode() {
        this.$navigateTo('/pages/goodsBase/scanCode?photo=1')
      },
      comfirm(type) {
        this.$navigateTo('/pages/login/logout?type=' + type)
      },
      getData() {
        this.$request({
          url: '/gw/op/v1/goodsOrder/orderData',
          method: 'get'
        }).then(res => {
          if (res.subCode === 1000) {
            this.orderIofo = res.data ? res.data.countDto : {}
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      getUcUser() {
        this.$request({
          url: '/gw/op/v1/auth/getUcUser',
          method: 'get'
        }).then(res => {
          if (res.subCode === 1000) {
            this.form = res.data ? res.data : {};
            if (this.form.imgUrl) {
              if (this.imgUrl != this.form.imgUrl){
                this.imgUrl = this.form.imgUrl
                uni.setStorageSync('userIcon', this.form.imgUrl);
              }
            // } else {
            //   this.imgUrl = '../../static/img/userimg5.jpg'
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '@/assets/fz.less';
  @import '@/assets/index/style.css';

  * {
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
    background-color: #f3f2f8;
  }

  .car2 {
    width: 100%;
    /*padding-bottom: 14vw;*/
    background-color: #f3f2f8;
    border-top: 1vw solid #eee;

    .header {
      width: 100%;
      height: 100px;
      background-size: auto 100%;
      padding: 3.2vw 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      .header-icon {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
        border-radius: 50%;
        font-size: 15px;
      }

      > text {
        margin-left: 3.2vw;
        .fz(font-size, 30);
        color: #333;
        letter-spacing: .2vw;
        width: 50vw;
      }
    }

    .main {
      width: 92vw;
      margin-left: 4vw;
      /*height: 100%;*/
      margin-bottom: 50px;
      background-color: #f3f2f8;

      .my-indent {
        width: 100%;
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 5vw;
        height: 15vw;
        line-height: 15vw;
        background-color: #fff;
        margin-top: 10px;
        font-weight: 600;
        //.bd();

        &:active {
          background-color: rgb(224, 227, 230)
        }

        .my-indent-right {
          text {
            display: inline-block;
            .fz(font-size, 28);
            color: rgba(0, 0, 0, .4);
            position: relative;
          }

          i {
            position: relative;
            top: .8vw;
          }
        }
      }

      .my-pay {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        padding: 2vw 0;
        background-color: #fff;
        .bd();

        > view {
          display: block;
          width: 33.33%;
          color: #999;
          text-align: center;

          > text {
            .fz(font-size, 50);
            margin-top: 2.3vw;
            display: block;
            text-align: center;
          }

          p {
            padding-top: 22px;
            text-align: center;
            padding-bottom: 10px;
          }

          image {
            margin-top: 10px;
            margin-bottom: -20px;
            width: 30px;
            height: 30px;
          }
        }
      }

      .my-vip, .my-service, .my-settle1 {
        width: 100%;
        .mt();
        .bd();
        .bt();
        color: #333;

        > view {
          background-color: #fff;
          display: block;
          width: 100%;
          display: -ms-flex;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 15vw;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          padding: 0 6vw;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;

          &:active {
            background-color: rgb(224, 227, 230);
          }

          > view {
            -ms-flex: 2;
            -webkit-box-flex: 2;
            flex: 2;
            padding-top: 1.3vw;
          }

          .my-vip-top-view {
            padding-top: 0;
          }

          > p {
            -ms-flex: 10;
            -webkit-box-flex: 10;
            flex: 10;
            position: relative;

            &:active {
              background-color: rgb(224, 227, 230);
            }

            i {
              position: absolute;
              right: 0;
              top: .4vw;
            }
          }
        }

      }
    }
  }

  /*图标大小不一，重新定义*/

  .icon-go {
    .fz(font-size, 36);

    &::before {
      color: #aba8a8;
    }
  }

  [class^="icon2-"],
  [class*=" icon2-"] {
    .fz(font-size, 50);
  }

  .icon2-service {
    .fz(font-size, 34);
  }

  .danger-num {
    padding: 0px 6px;
    min-width: 11px;
    text-align: center;
    height: 12px;
    line-height: 12px;
    color: #fff;
    background-color: #409eff;
    font-size: 12px;
    top: 0;
    right: 0;
    border-radius: 8px;
    margin-left: -8px;
    position: sticky;
    font-style: normal;
  }

  .count3 {
    margin-left: 12px;
  }

  .my-pay-1 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    padding: 2vw 0;
    background-color: #fff;
    .bd();

    > view {
      display: block;
      width: 33.33%;
      color: #999;
      text-align: center;

      > text {
        .fz(font-size, 50);
        margin-top: 2.3vw;
        display: block;
        text-align: center;
      }

      p {
        padding-top: 1.3vw;
        text-align: center;
      }
    }
  }

  .my-indent-img {
    width: 13px;
    height: 13px;
    margin-left: 4px;
    margin-bottom: -1px;
  }

  .my-indent-img-1 {
    width: 13px;
    height: 13px;
    margin-left: 4px;
    margin-bottom: -1px;
    position: absolute;
    right: 0;
    top: 0.4vw;
  }

  .custom-style {
    width: 86px;
    font-size: 12px;
    height: 32px;
  }
</style>
