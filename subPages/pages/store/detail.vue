<template lang="html">
  <view class="hello">
    <u-navbar title="库存详情" >
      <view @click="$goBack"  class="u-nav-slot" slot="left">
        <image class="back_icon" :src="fileUrl +'/static/img/back3.png'"></image>
      </view>
      <view class="u-nav-slot" style="font-size: 15px;" slot="right">
        <rudon-rowMenuDotDotDot :localdata="optionsOp" @change="menuActionList($event)">
<!--          <text v-if="form.inventory > form.galleryCount" >更多</text>-->
<!--          <text v-else >操作</text>-->
          <image style="height: 25px;width: 25px" :src="fileUrl +'/static/img/gd1.png'"></image>
        </rudon-rowMenuDotDotDot>
      </view>
    </u-navbar>
    <view class="ui-flex justify-center center"
         style="width: 100vw; height: 220px;background-color: white;margin-top:34px;">
      <view class="cell">
        <image mode="widthFix"
               @click="avatarShow(form.img)"
               :disabled="true "
               style="width: 80vw;margin: 0 auto;"
               v-if="form.img"
               :src="form.img"
        ></image>
        <image mode="widthFix"
               @click="avatarShow(form.img)"
               :disabled="true "
               style="width: 80vw;margin: 0 auto;"
               :src="fileUrl+form.imgUrl"
               v-if="!form.img && form.imgUrl"
        ></image>
      </view>
    </view>
    <view class="my-pay-3">
      <view style="padding-top: 15px;
    padding-right: 10px;
    padding-left: 10px;
    color: #333;
     display: flex;
    justify-content: space-between;
    align-items: center;
  ">
        <view class="xianglian">
          <strong  style="color: #333;font-size: 18px;">¥</strong>
          <strong v-if="form.thisTimeThePrice" style="color: #333;font-size: 25px;margin-left: 2px;" >{{form.thisTimeThePrice}}</strong>
          <strong v-else  style="color: #333;font-size: 25px;" v-if="!form.thisTimeThePrice && form.theirPrice">{{form.theirPrice}}</strong>
          <text style="color: #333; margin-left: 2px;">得物到手价</text>
          <text style="font-size: 15px;margin-left: 10px;text-decoration:line-through;color: #7a7a7a;" v-if="form.thisTimePrice">
          {{form.thisTimePrice}}
         </text>
          <text style="font-size: 15px;margin-left: 10px;text-decoration:line-through;color: #7a7a7a;" v-else >
          {{form.dwPrice}}
        </text>
        </view>
        <view>
          <text v-if="form.thisTimePrice"  >
          <text class="color-font-strong" style="font-size: 15px;margin-right: 1px;">{{form.thisTimeProfits}}</text>
            利润</text>
          <text   v-else>
          <text class="color-font-strong" style="font-size: 15px;margin-right: 1px;">
            {{form.dwPrice | getProfits(form.price)}}

<!--            {{(form.dwPrice - (form.dwPrice * 0.075 + 38 + 8.5) - form.price - 10) | numFilter}}-->
          </text>利润
        </text>
        </view>

      </view>
      <view style="padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 5px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
">
        <view>
            <text style="font-size: 15px;color: #7a7a7a;">
            {{form.price}}
           </text>
          <text style="color: #7a7a7a; margin-left: 2px;">入库价</text>
        </view>
        <view  v-if="form.difference && form.thisTimePrice" class="xianglian">
          <text>变更</text>
          <text v-if="form.difference > 0" class="color-font-strong"> +{{form.difference }}</text>
          <text v-else class="color-dw-strong">{{form.difference }}</text>
        </view>
      </view>
      <view style="padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 5px;
    padding-left: 10px;">
        <strong style="color: #333;font-size: 15px;line-height: 22px;" @click="goodsDetail(form.goodsId) ">
          {{form.goodsName}}
        </strong>
      </view>
      <view style="padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  ">
        <text  style="font-size: 14px;
    background-color: #f3f2f8;
    padding: 5px;
    border-radius: 5px;">
          {{form.type | dictToDescTypeValue(20221108)}}
        </text>
      </view>
      <view style="padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  ">
        <view>
          <strong style="color: #333;font-size: 15px;">
            {{form.actNo}}
            <image @click="$copyUrl(form.actNo)" style="margin-bottom: -3px;" class="fuzhitupian"
                   :src="fileUrl +'/static/img/copy.png'"></image>
          </strong>
        </view>
        <view>
          <text>
            尺码
          </text>
        <text class="color-danger" style="font-size: 15px;margin-left: 3px;margin-top: 3px">
         {{form.size}}
        </text>
        </view>
      </view>
    </view>
    <view class="my-pay-4">
      <view style="border-right-color: rgba(185, 185, 185, .14);
  border-right-style: solid;">
        <text style="color: #7a7a7a;font-size: 15px;">
          库存
        </text>
      </view>
      <view style="border-right-color: rgba(185, 185, 185, .14);
  border-right-style: solid;">
        <p>剩余</p>
        <strong>
          {{form.inventory}}
        </strong>
      </view>
      <view style="border-right-color: rgba(185, 185, 185, .14);
  border-right-style: solid;">
        <p>原库存</p>
        <strong>
          {{form.oldInventory}}
        </strong>
      </view>
      <view style="border-right-color: rgba(185, 185, 185, .14);
  border-right-style: solid;">
        <p>已上架</p>
        <strong>
          {{form.galleryCount}}
        </strong>
      </view>
      <view style="border-right-color: rgba(185, 185, 185, .14);
  border-right-style: solid;">
        <p>交易成功</p>
        <strong>
          {{form.successCount}}
        </strong>
      </view>
    </view>
    <view class="my-pay-4">
      <view style="    border-right-color: rgba(185, 185, 185, .14);
    border-right-style: solid;
    height: 12vw;
    margin-top: 26px;">
        <text style="color: #7a7a7a;font-size: 15px;">
          信息
        </text>
      </view>
      <view style="width: 75vw;">
        <text style="color: #7a7a7a;font-size: 15px;text-align: left;margin-left: 15px;">入库时间
          <text  style="color: #333;font-size: 15px;text-align: left;margin-left: 5px;">
                {{form.createTime |formateTime }}
          </text>
        </text>
        <text style="color: #7a7a7a;font-size: 15px;text-align: left;margin-left: 15px;">入库渠道
          <text  style="color: #333;font-size: 15px;text-align: left;margin-left: 5px;">
                {{form.channelId | dictToDescTypeValue(47) }}
          </text>
        </text>
        <text style="color: #7a7a7a;font-size: 15px;text-align: left;margin-left: 15px;margin-bottom: 5px;">所在库存
          <text  style="color: #333;font-size: 15px;text-align: left;margin-left: 5px;">
                {{form.warehouseId | dictToDescTypeValue(40) }}
          </text>
        </text>
      </view>
    </view>
    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="imageZoom" mode="widthFix"  class="showImg"></image>
      </view>
    </view>
    <view style="height: 70px"></view>
    <view v-if="form.inventory > form.galleryCount" class="baisebeijing shuipingjuzhong" style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <u-button style="width: 50vw; margin: 10px 15px;" type="primary"   @click="gallery(form.id)">
        <text class="dibuanniuwenzi">上架</text>
      </u-button>
    </view>
  </view>
</template>

<script>
  import {goodsInventoryApi} from '@/api/goodsInventory'
  export default {
    data(){
      return {
        form: {
        },
        fileUrl: this.$fileUrl,
        optionsOp: [
          {
            value: 'warehouseDetail',
            text: '库存信息'
          },
          {
            value: 'update',
            text: '修改'
          },
          // {
          //   value: 'gotoDw',
          //   text: '得物'
          // },
          {
            value: 'jumpOrder',
            text: '订单'
          }
        ],
        imageZoom: '',
        pictureZoomShow: false,
        addressList: [],
        statusList: [],
        warehouseList: [],
        channelIdList: [],
        todayList: ''
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
    methods:{
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      menuAction(action, rowId) {
        // 忽略初始化时的传入的空操作
        if (action === '') {
          return
        }
        if ('add' == action) {
          this.goDetail()
        }
        if ('resetHandle' == action) {
          this.resetHandle()
        }
      },
      menuActionList(action ) {
        let item = this.form
        if (action === '') {
          return
        }
        if ('warehouseDetail' == action) {
          this.warehouseDetail(item.goodsId ,item.actNo ,item.img )
        }
        if ('update' == action) {
          this.update(item )
        }
        if ('gotoDw' == action) {
          this.gotoDw(item.spuId )
        }
        if ('jumpOrder' == action) {
          this.jumpOrder(item.actNo)
        }
      },
      gallery(id) {
        this.$navigateTo('/pages/store/storeUp?id=' + id)
      },
      goodsDetail(id) {
        if (!id) {
          return
        }
        let url = '/pages/goodsBase/detail?id=' + id
        this.$navigateTo(url)
      },
      warehouseDetail(goodsId , actNo,img) {
        this.$navigateTo('/pages/store/warehouseDetail?goodsId=' + goodsId +'&actNo=' +actNo +'&img=' +img)
      },
      update(row) {
        this.$navigateTo('/pages/store/update?id=' + row.id)
      },
      gotoDw(spuId) {
        if (!spuId){
          return
        }
        this.$navigateTo('/pages/webview/webview?spuId=' + spuId)
      },
      jumpOrder(actNo) {
        let url= this.$getLocalPath()
        uni.reLaunch({
          url: '/pages/order/index?backUrl='+url+'&actNo=' + actNo
        });
      },
      // getLocalPath(){
      //   let curPage = getCurrentPages();
      //   let route = curPage[curPage.length - 1].route; //获取当前页面的路由
      //   let params = curPage[curPage.length - 1].options; //获取当前页面参数，如果有则返回参数的对象，没有参数返回空对象{}
      //   let param = ''
      //   for (let key in params) {
      //     let flag = ''
      //     if (param.indexOf("?") == -1){
      //       flag = '?'
      //     } else{
      //       flag = '&'
      //     }
      //     param += flag + key + '=' + params[key]
      //   }
      //   let res = route + param
      //   return '/'+ res
      // },
      getDetailById(id) {
        if (id) {
          goodsInventoryApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {}
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '@/assets/index/style.css';
  @import '@/assets/fz.less';
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
  strong{
    font-weight: 600;
  }

  .ui-flex {
    display: -webkit-box !important;
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    display: flex !important;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap
  }

  .ui-flex, .ui-flex *, .ui-flex :after, .ui-flex :before {
    box-sizing: border-box
  }

  .ui-flex.justify-center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center
  }
  .ui-flex.center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center
  }
  .my-pay-3 {
    border-radius: 10px;
    margin-top: 15px;
    width: 92%;
    margin-left: 4%;
    background-color: #fff;
  }

  .my-pay-4 {
    margin-top: 15px;
    border-radius: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 92%;
    margin-left: 4%;
    padding: 2vw 0;
    background-color: #fff;
    .bd();

    > view {
      display: block;
      width: 20%;
      color: #999;
      text-align: center;

      > text {
        font-size: 22px;
        margin-top: 2.3vw;
        display: block;
        text-align: center;
      }

      p {
        color: #8c8a8a;font-size: 14px; margin-top: 3px;margin-bottom: 4px;
      }
      strong {
        color: #333;font-size: 15px;
      }
    }
  }
</style>
