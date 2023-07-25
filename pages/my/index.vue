<template lang="html">

  <view class="car2" ref="content" style="height: 100%;font-size: 15px; border-top:0;    overflow: auto;">
    <view v-if="flag">
      <mt-header  title="个人中心">
        <view slot="left">
          <img  @click="scanCode(1)" style="width: 23px; "  src="../../static/img/saoyisao4.png">
        </view>
        <view slot="right">
          <img  @click="comfirm(1)" style="width: 26px; "  src="../../static/img/setting0.png">
        </view>
      </mt-header>
      <header class="header"
              style="
                height: 80px;
      margin-top: 42px;
      background-color: #fff;
      border-bottom-color: rgba(185, 185, 185, 0.14);
      border-bottom-style: solid;
      border-bottom-width: 1px;"
      >
        <view @click="userInfo" class="header-icon" style="margin-left: 6vw;">
          <img v-if="imgUrl" style="width: 50px;height: 50px;border-radius: 100%;" :src="imgUrl">
          <!--          <img v-if="form && !form.imgUrl" style="width: 50px;height: 50px;border-radius: 100%;" src="../../static/img/userimg5.jpg">-->
        </view>
        <text  @click="userInfo">{{
         form.userRealName ? form.userRealName : form.userAccount ? form.userAccount : '系统用户'
          }}</text>
        <view class="my-indent-right">
          <!--            <text style="-->
          <!--            margin-left: -10px;-->
          <!--      display: inline-block;-->
          <!--      font-size: 14px;-->
          <!--      color: rgba(0, 0, 0, 0.4);-->
          <!--      position: relative;">-->
          <!--              <el-button @click="comfirm(2)" style="    border: 1px solid #333; color: #333"-->
          <!--                         size="small" round>账户管理</el-button>-->
          <!--            </text>-->
          <el-button type="primary" @click="comfirm(2)" size="small" round>账户管理</el-button>
        </view>
      </header>
    </view>

    <view v-else style="
        padding-bottom: 40vw;
    background-image: linear-gradient(#e5f4ff, #f3f2f8);">
      <view class="zuoyouduiqi" style="    padding: 2.81vw 4.8vw !important;">
        <view @click="scanCode(1)" class="mint-header-button is-left">
          <img style="width: 23px; "  src="../../static/img/saoyisao4.png">
        </view>
        <view>
          <text style="font-size: 16px; color: black;" class="mint-header-title">
            个人中心
          </text>
        </view>
        <view @click="comfirm(1)" class="mint-header-button is-right">
          <img style="width: 26px; "  src="../../static/img/setting0.png">
        </view>
      </view>
      <view class="header"
           style="
                height:100px;"
      >
        <view @click="userInfo" class="header-icon" style="margin-left: 6vw;">
          <img v-if="imgUrl" style="width: 50px;height: 50px;border-radius: 100%;" :src="imgUrl">
          <!--          <img v-if="form && !form.imgUrl" style="width: 50px;height: 50px;border-radius: 100%;" src="../../static/img/userimg5.jpg">-->
        </view>
        <text @click="userInfo">{{
         form.userRealName ? form.userRealName : form.userAccount ? form.userAccount : '系统用户'
          }}</text>
        <view class="my-indent-right">
          <el-button type="primary" @click="comfirm(2)" size="small" round>账户管理</el-button>
        </view>
      </view>
    </view>


    <view class="main" :style="!flag? 'margin-top: -138px;': ''">
      <view class="my-indent" style="    margin-bottom: -10px;" :to="{ name: '订单'}">
        <text class="my-indent-left">订单</text>
        <view class="my-indent-right">
          <text style="font-weight: 500">全部</text>
<!--          <i class="icon-go"></i>-->
          <img class="my-indent-img" src="../../static/img/more.png">
        </view>
      </view>

      <view class="my-pay">
        <view :to="{ path: '/order?status=3'}">
          <!--                  <text class="icon2-money"></text>-->
          <img
              :class="orderIofo.count3 > 0 ? 'count3' : ''"
              src="../../static/img/new/daifahuo.png"></img>
          <i v-if="orderIofo.count3" class="danger-num">{{orderIofo.count3}}</i>
          <p style="color: #333">待发货</p>
        </view>
        <view :to="{ path: '/order?status=4'}">
          <!--                  <text class="icon2-thecar"></text>-->
          <img
              :class="orderIofo.count4 > 0 ? 'count3' : ''"
              src="../../static/img/new/fahuo.png"></img>
          <i v-if="orderIofo.count4" style="margin-left: -14px" class="danger-num">{{orderIofo.count4}}</i>
          <p style="color: #333">已发货</p>
        </view>

          <view :to="{ path: '/order?status=5'}">
            <!--                  <span class="icon2-thecar"></span>-->
            <img
                :class="orderIofo.count5 > 0 ? 'count3' : ''"
                src="../../static/img/new/yilanjian.png"></img>
            <i v-if="orderIofo.count5"  class="danger-num">{{orderIofo.count5}}</i>
            <p style="color: #333">运输中</p>
          </view>

        <view :to="{ path: '/order?status=6'}">
          <img
              :class="orderIofo.count6 > 0 ? 'count3' : ''"
              src="../../static/img/new/yishouhuo.png"></img>
          <i v-if="orderIofo.count6"  class="danger-num">{{orderIofo.count6}}</i>
          <p style="color: #333">已收货</p>
        </view>

      </view>

      <view class="my-indent" style="    margin-bottom: -10px;">
        <text class="my-indent-left">报表</text>
      </view>
      <view class="my-settle1" style="margin-top: 0;border-top-style:none">
        <view :to="{ name: '入库报表'}" class="my-settle1-top">
          <view>
            <img style="width: 27px;" src="../../static/img/new/ruku.png"></img>
          </view>

          <p>
            <text style="color: #333">入库报表</text>
            <img class="my-indent-img-1" src="../../static/img/more.png">
          </p>
        </view>
        <view :to="{ name: '入库渠道报表'}" class="my-settle1-top">
          <view>
            <img style="width: 27px;"
                 src="../../static/img/new/qudao.png"></img>
          </view>

          <p>
            <text style="color: #333">入库渠道报表</text>
            <img class="my-indent-img-1" src="../../static/img/more.png">
          </p>
        </view>
        <view :to="{ name: '销售报表'}" class="my-settle1-bottom">
          <view>
            <img style="width: 27px;"
                 src="../../static/img/new/xiaoshou.png"></img>
          </view>
          <p>
            <text style="color: #333">销售报表</text>
            <img class="my-indent-img-1" src="../../static/img/more.png">
          </p>
        </view>
        <view :to="{ name: '区域销售报表'}" class="my-settle1-bottom">
          <view>
            <img style="width: 27px;" src="../../static/img/new/quyu.png"></img>
          </view>
          <p>
            <text style="color: #333">区域销售报表</text>
            <img class="my-indent-img-1" src="../../static/img/more.png">
          </p>
        </view>
      </view>
      <view class="my-indent" style="    margin-bottom: -10px;">
        <text class="my-indent-left">服务</text>
        <!--        <view class="my-indent-right">-->
        <!--          <text>全部订单</text>-->
        <!--          <i class="icon-go"></i>-->
        <!--        </view>-->
      </view>
      <view class="my-pay-1" style="border-bottom-style:none;">
        <view :to="{ name: '活动'}">
          <!--                  <text class="icon2-money"></text>-->
          <img
              style="margin-top: 7px;margin-bottom: -4px;width: 27px;"
              src="../../static/img/new/huodong.png"></img>
          <p style="color: #333">活动</p>
        </view>
        <view :to="{ name: '其他收支'}">
          <!--                  <text class="icon2-thecar"></text>-->
          <img
              style="margin-top: 7px;margin-bottom: -4px;width: 27px;"
              src="../../static/img/new/qita.png"></img>
          <p style="color: #333">其他收支</p>
        </view>
        <view :to="{ name: '瑕疵商品'}">
          <!--                  <text class="icon2-thecar"></text>-->
          <img
              style="    margin-top: 4px;
    margin-bottom: -7px;
    width: 35px;" src="../../static/img/new/xiaci.png"></img>
          <p style="color: #333">瑕疵商品</p>
        </view>
        <view :to="{ name: '红包'}">
          <img
              style="margin-top: 7px;margin-bottom: -4px;width: 27px;"
              src="../../static/img/new/hongbao.png"></img>
          <p style="color: #333">红包</p>
        </view>
      </view>
      <view class="my-pay-1" style="padding-bottom: 5vw">
        <view :to="{ path: '/memo'}" style="width: 25%">
          <img
              style="margin-top: 7px;margin-bottom: -4px;width: 27px;"
              src="../../static/img/new/memo.png"></img>
          <p style="color: #333">备忘录</p>
        </view>
      </view>
    </view>
    <!--    <view style=" padding-top: 1px;"></view>-->
    <!-- <v-footer></v-footer> -->
  </view>
</template>

<script>
  // import * as mockData from '@/http/mock.js' //模拟数据
  // import {goodsBaseApi} from '@/api/goodsBase'
  // import {goodsOrderApi} from '@/api/goodsOrder'
  // import Footer from '@/common/_footer.vue'
  // import {userContainerApi} from '@/api/user'

  export default {
    components: {
      // 'v-footer': Footer
    },
    data() {
      return {
        flag: false,
        imgUrl: '',
        fileUrl: this.$fileUrl,
        orderIofo: {},
        // userName: localStorage.getItem('user_name'),
        // userRealName: localStorage.getItem('userRealName')
        form: {
          userAccount: '',
          userMobile: '',
          userRealName: '',
          imgUrl: ''
        }
      }
    },
    mounted(){
      this.$refs.content.onscroll = ()=>{
        this.handleScroll();
      }
    },
    created() {
      this.getUcUser()
      this.getData()
    },
    methods: {
      handleScroll () {
        let scrollTop = this.$refs.content.scrollTop;
        console.info(scrollTop)
        if (scrollTop < 10){
          this.flag = false
        } else{
          this.flag = true
        }
        // let blocks = document.querySelectorAll('.conBlock');
        // let tabblocks = document.querySelectorAll('.tab-title');
        // blocks.forEach((item, index) => {
        //   if (scrollTop >= item.offsetTop - 160) {
        //     this.activeId = index;
        //   }
        // })
        // if(tabblocks[this.activeId].offsetLeft > window.innerWidth-50){
        //   this.$refs['tab-content'].scrollLeft = tabblocks[this.activeId].offsetLeft;
        // }
        // if(this.$refs['tab-content'].scrollLeft>tabblocks[this.activeId].offsetLeft){
        //   this.$refs['tab-content'].scrollLeft = 0;
        // }
      },
      userInfo() {
        this.$router.push({path: '/userInfo'})
      },
      scanCode(photo) {
        this.$router.push({ path: '/scanCode', query: { photo } })
      },
      comfirm(type) {
        this.$router.push({path: '/logout', query: {type}})
      },
      // syncOldPriceToNew1() {
      //   this.$request({
      //     url: '/gw/op/v2/goodsBase/syncOldPriceToNew',
      //     method: 'post',
      //     data: loginInfo
      //   })
      //   goodsBaseApi.syncOldPriceToNew().then(res => {
      //     this.$toast(res.subMsg)
      //   })
      // },
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
            this.form = res.data ? res.data : {}
            if (this.form.imgUrl) {
              this.imgUrl = this.fileUrl + this.form.imgUrl
            } else {
              this.imgUrl = '../../static/img/userimg5.jpg'
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
    background-color: #f3f2f8;
  }

  .car2 {
    width: 100%;
    /*padding-bottom: 14vw;*/
    background-color: #f3f2f8;
    border-top: 1vw solid #eee;

    .header {
      width: 100%;
      height: 16vw;
      /*background: url(../../static/carbg.png) center 0 #f37d0f;*/
      /*background: url(../../static/img/bg1.png) center 0 #f37d0f;*/
      background-size: auto 100%;
      padding: 3.2vw 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      .header-icon {
        /*border: .4vw solid #ffffff;*/
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        /*width: 14vw;*/
        /*height: 14vw;*/
        /*line-height: 16vw;*/
        text-align: center;
        border-radius: 50%;

        text {
          .fz(font-size, 54);

          &::before {
            color: #ffffff;
          }
        }
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
            padding-top: 16px;
            text-align: center;
            padding-bottom: 10px;
          }
          img {
            margin-top: 10px;
            margin-bottom: -16px;
            width: 30px;
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
    margin-left: -10px;
  }

  .count3 {
    margin-left: 12px;
  }

  /*.count4 {*/
  /*  margin-left: 12px;*/
  /*}*/

  /*.count5 {*/
  /*  margin-left: 10px;*/
  /*}*/

  /*.count6 {*/
  /*  margin-left: 10px;*/
  /*}*/
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
  .my-indent-img{
    width: 13px;
    margin-left: 4px;
    margin-bottom: -1px;
  }
  .my-indent-img-1{
    width: 13px;
    margin-left: 4px;
    margin-bottom: -1px;
    position: absolute;
    right: 0;
    top: 0.4vw;
  }

  .msg {
        position: relative;
        width: 60px;
        height: 60px;
        margin: 60px;
        float:left;
      }
  .msg img {
    margin-top: 10px;
    margin-bottom: -5px;
    width: 28px;
  }
  .alarm {
    position: absolute;
    color: white;
    font-size: 17px;
    background-color: red;
    /*height: 24px;改前*/
    min-height: 24px;/*改后新增的代码*/
    min-width:24px;/*改后新增的代码*/
    line-height: 24px;
    right:-12%;
    top: -12px;
    text-align: center;
    -webkit-border-radius: 24px;
    border-radius: 24px;
    padding:2px;
  }
</style>
