<template lang="html">
  <view class="hello">
    <u-navbar title="商品详情">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view class="u-nav-slot" style="font-size: 15px;" slot="right">
        <rudon-rowMenuDotDotDot :localdata="localdata" @change="menuAction($event)">
          <image style="height: 25px;width: 25px" src="../../static/img/slh.png"></image>
        </rudon-rowMenuDotDotDot>
      </view>
    </u-navbar>
    <view class="ui-flex justify-center center"
         style="width: 100vw; height: 220px;background-color: white;margin-top: 10px;">
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
        <view>
          <strong  style="color: #333;font-size: 18px;">¥</strong>
          <strong v-if="form.sellPrice && form.sellPrice != 0" style="color: #333;font-size: 24px;margin-left: 2px;" >{{form.sellPrice}}</strong>
          <strong v-else  style="color: #333;font-size: 24px;margin-left: 2px;">899</strong>
        </view>
      </view>
      <view style="padding-top: 2px;
    padding-right: 10px;
    padding-bottom: 5px;
    padding-left: 10px;">
        <strong style="color: #333;font-size: 14px;line-height: 22px;">
          {{form.name}}
        </strong>
      </view>
      <view style="padding-top: 4px;
    padding-right: 10px;
    padding-bottom: 10px;    margin-left: -2px;
    padding-left: 10px;
  ">
        <text  style="font-size: 13px;
    background-color: #f3f2f8;
    padding: 5px;
    border-radius: 5px;">
          {{form.type | dictToDescTypeValue(20221108)}}
        </text>
        <text  v-if="form.brand" style="font-size: 13px;
    background-color: #f3f2f8;
    padding: 5px;     margin-left: 7px;
    border-radius: 5px;">
          {{form.brand}}
        </text>
        <text v-if="form.sellDate" style="font-size: 13px;
    background-color: #f3f2f8;
    margin-left: 7px;
    padding: 5px;
    border-radius: 5px;">
          {{form.sellDate}}
        </text>
      </view>
      <view class="xianglian" style="padding-top: 2px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  ">
        <strong style="color: #333;font-size: 14px;">
          {{form.actNo}}
          <image @click="$copyUrl(form.actNo)" style="margin-bottom: -3px;" class="fuzhitupian"
                 src="../../static/img/copy.png"></image>
        </strong>
      </view>
    </view>
    <view class="my-pay-5" v-if="tableData.length">
      <view>
        <h5 style="font-size: 17px;margin-left: 15px;font-weight: 600;color: #333333">尺码列表</h5>
      </view>
      <view>

        <view class="dingdans_item_dw" style=" display: flex;    border-bottom: 2px solid #f4f3f8;
    justify-content: space-between;
    align-items: center;"
        >
          <view class="dingdans_top_dw" style="
          width: 20vw;
          font-weight: 600;
          padding-bottom: 0px;
          border-bottom: 0; color: #333333">
            <view class="dingdans_top_left_dw" style=" ">
              <text>尺码</text>
            </view>
          </view>
          <view class="dingdans_top_dw" style="
          width: 20vw;          padding-bottom: 0px;    margin-left: -8px;
                    font-weight: 600;
          border-bottom: 0; color: #333333">
            <view class="dingdans_top_left_dw" style=" ">
              <text>得物价</text>
            </view>
          </view>
          <view class="dingdans_top_dw" style="
          width: 20vw;    margin-left: 7px;      font-weight: 600;padding-bottom: 0px;
          border-bottom: 0; color: #333333">
            <view class="dingdans_top_left_dw" style=" ">
              <text>到手价</text>
            </view>
          </view>
          <view  v-if="tableData[0].inPrice"  class="dingdans_top_dw" style="
          width: 15vw;       margin-left: 2px;       font-weight: 600;padding-bottom: 0px;
          border-bottom: 0; color: #333333">
            <view class="dingdans_top_left_dw" style=" ">
              <text>库存</text>
            </view>
          </view>
          <view  v-if="tableData[0].inPrice" class="dingdans_top_dw" style="
          width: 20vw;          font-weight: 600;padding-bottom: 0px;margin-right: 5px;
          border-bottom: 0; color: #333333">
            <view class="dingdans_top_left_dw" style=" ">
              <text>入库价</text>
            </view>
          </view>
          <view  v-if="tableData[0].inPrice" class="dingdans_top_dw" style="
          width: 15vw;    margin-left: 5px;        margin-right: 2px;  font-weight: 600;padding-bottom: 0px;
          border-bottom: 0; color: #333333">
            <view class="dingdans_top_left_dw" style=" ">
              <text>利润</text>
            </view>
          </view>
        </view>
        <view class="dingdans_item_dw" @click="rowClick(item)" style=" display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    border-bottom: 2px solid rgb(244, 243, 248);
"
             v-for="(item,index) in tableData"
             :key="index"
        >
          <view class="dingdans_top_dw" style="
          width: 20vw;padding-bottom: 0px;
          border-bottom: 0; ">
            <view class="dingdans_top_left_dw" style=" color: #7a7a7a">
              <text style="font-weight: bolder;font-size: 14px;" class="color-url">{{item.size }}</text>
            </view>
          </view>
          <view class="dingdans_top_dw" style="
          width: 20vw;padding-bottom: 0px;
          border-bottom: 0; ">
            <view class="dingdans_top_left_dw" style="color: #7a7a7a ">
              <text>¥</text>
              <text>{{item.price }}</text>
            </view>
          </view>
          <view  class="dingdans_top_dw" style="
          width: 25vw;padding-bottom: 0px;
          border-bottom: 0; ">
            <view class="dingdans_top_left_dw" style="color: #7a7a7a ">
              <text v-if="item.price ">¥</text>
              <text v-if="item.price "> {{item.price | getThePrice}}</text>
            </view>
          </view>
          <view  v-if="tableData[0].inPrice" class="dingdans_top_dw" style="
          width: 15vw;padding-bottom: 0px;    margin-left: 5px;
          border-bottom: 0; ">
            <view class="dingdans_top_left_dw" style=" color: #7a7a7a;margin-left: 7px;">
              <text>{{item.inventory }}</text>
            </view>
          </view>
          <view  v-if="tableData[0].inPrice" class="dingdans_top_dw" style="
          width: 20vw;padding-bottom: 0px;
          border-bottom: 0; ">
            <view class="dingdans_top_left_dw" style=" color: #7a7a7a">
              <text v-if="item.inPrice ">¥</text>
              <text v-if="item.inPrice ">
                {{item.inPrice }}
              </text>
            </view>
          </view>
          <view  v-if="tableData[0].inPrice"  class="dingdans_top_dw" style="
          width: 25vw;padding-bottom: 0px;
          border-bottom: 0; ">
            <view class="dingdans_top_left_dw" style="color: #7a7a7a ">
              <text v-if="item.inPrice ">¥</text>
              <text  v-if="item.inPrice"
                     :class="$getProfits(item.price,item.inPrice) > 0 ? 'color-danger' : 'color-success'"
              >
                {{item.price | getProfits(item.inPrice)}}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <u-popup :show="isShowDialog2" @close="close" :duration="100" :closeable="true" mode="center">
      <view style="    width: 100vw;padding: 60px 4vw 0px 5vw;">
        <view style="" class="store-list-1-1" >
          <view  class="store-list-1-li-1">
            <view class="overview1">
              <p><strong>当前价格</strong></p>
              <p class="color-url">{{priceData.price}}</p>
            </view>
            <view class="overview2">
              <p><strong>到手价</strong></p>
              <p class="color-url">{{priceData.theirPrice}} </p>
            </view>
          </view>
          <view  class="store-list-1-li-1">
            <view class="overview1">
              <p><strong>年度最高</strong></p>
              <p class="color-url">{{priceData.price365}}</p>
            </view>
            <view class="overview2">
              <p><strong>到手价</strong></p>
              <p class="color-url">{{priceData.theirPrice365}}</p>
            </view>
          </view>
          <view  class="store-list-1-li-1">
            <view class="overview1">
              <p><strong>半年最高</strong></p>
              <p class="color-url">{{priceData.price180}}</p>
            </view>
            <view class="overview2">
              <p><strong>到手价</strong></p>
              <p class="color-url">{{priceData.theirPrice180}}</p>
            </view>
          </view>
          <view  class="store-list-1-li-1">
            <view class="overview1">
              <p><strong>30天最高</strong></p>
              <p class="color-url">{{priceData.price30}}</p>
            </view>
            <view class="overview2">
              <p><strong>到手价</strong></p>
              <p class="color-url">{{priceData.theirPrice30}}</p>
            </view>
          </view>
        </view>
        <view class="zuoyouduiqi" style="
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;">
          <u-button type="primary" size="small" shape="circle" @click="profitData(30)"
                    style="margin-right: 10px" text="30天走势图" :plain="queryParam1.dayNum != 30"></u-button>
          <u-button type="primary" size="small" shape="circle" @click="profitData(180)"
                    style="margin-left: 10px" text="半年走势图" :plain="queryParam1.dayNum != 180"></u-button>
          <u-button type="primary" size="small" shape="circle" @click="profitData(365)"
                    style="margin-left: 10px" text="年度走势图" :plain="queryParam1.dayNum != 365"></u-button>
        </view>

        <view class="charts-box">
          <qiun-data-charts
              type="line"
              :opts="opts"
              :chartData="chartData"
              :ontouch="true"/>
        </view>
      </view>
    </u-popup>

    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="imageZoom" mode="widthFix"  class="showImg"></image>
      </view>
    </view>
    <view>
      <uni-fab ref="fab" :pattern="pattern"  horizontal="right" @fabClick="storeAdd" />
    </view>
  </view>
</template>

<script>
  import { goodsBaseSizeApi } from '@/api/goodsBaseSize'
  import { goodsBaseSizePriceApi } from '@/api/goodsBaseSizePrice'
  import {goodsBaseApi} from '@/api/goodsBase'
  export default {
    components:{
    },
    data(){
      return {
        isShowDialog2: false,
        pictureZoomShow: false,
        imageZoom: '',
        props: {
          lazy: false,
          multiple: true
        },
        queryParam: {
          goodsId: ''
        },
        reqCount: 0,
        type30: 'primary',
        type180: 'default',
        type365: 'default',
        chartSettings: {
          xAxisType: 'time',
          area: false,
          scale: [true],
          axisSite: { right: ['date'] },
          labelAlias: {
            'price': '价格',
            'date': '日期',
          }
        },
        opts: {
          color: ["#409eff", "#00c2c2", "#F56C6C", "#FAC858", "#73C0DE", "#3CA272", "#FC8452",
            "#9A60B4", "#ea7ccc"],
          padding: [15,10,0,15],
          enableScroll: false,
          dataPointShape: false,
          dataLabel: false,
          legend: {},
          xAxis: {
            labelCount: 4,
            rotateLabel: true,
            fontSize: 12,
            rotateAngle: 45,
            disableGrid: true
          },
          yAxis: {
            gridType: "dash",
            dashLength: 2
          },
          extra: {
            line: {
              type: "curve",
              width: 2,
              activeType: "hollow"
            }
          }
        },
        chartData: {
        },
        priceData: {
        },
        pattern: {
          color: '#7A7E83',
          backgroundColor: '#fff',
          selectedColor: '#409eff',
          buttonColor: '#409eff',
          iconColor: '#fff'
        },
        queryParam1: {
          goodsId: '',
          sizeId: '',
          dayNum: 30
        },
        loading: false,
        dataEmpty: false,
        sizeTitle: '',
        size: '',
        date: '',
        tableData: [],
        sizeList: [],
        fileSize: 2,
        type: '',
        id: '',
        photo: '',
        options: [],
        uploadData: {},
        typeList: [],
        requestParam: {
          sizeId: '',
          actNo: ''
        },
        form: {
          actNo: ''
        },
        localdata: [
          {
            value: 'getImgUrl',
            text: '更新'
          },
          {
            value: 'update',
            text: '手动更新'
          }
        ],
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
    },
    methods:{
      menuAction(action, rowId) {
        if (action === '') {
          return
        }
        if ('getImgUrl' == action) {
          this.getImgUrl()
        }
        if ('update' == action) {
          this.update()
        }
      },
      close() {
        this.isShowDialog2 = false
      },
      profitData(dayNum) {
        this.queryParam1.dayNum = dayNum
        this.getPriceData()
      },
      storeAdd() {
        let url = '/pages/store/storeAdd?goodsId=' + this.id
        this.$navigateTo(url)
      },
      rowClick(row) {
        this.size = row.size
        this.queryParam1.goodsId = this.form.id
        this.queryParam1.sizeId = row.sizeId
        this.getPriceData()
        this.isShowDialog2 = true
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      getImgUrl() {
        let data = {actNo: this.form.actNo , sizeId: this.form.sizeId }
        goodsBaseApi.getGoodsByActNoAndSizeH5(data).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.form = res.data ? res.data : {}
            this.queryParam.goodsId = this.form.id
            this.getPage()
          }
        })
      },
      update() {
        let url = '/pages/goodsBase/goodsAdd?type=2&id=' + this.id
        this.$navigateTo(url)
      },
      getDetailById(id) {
        if (id) {
          goodsBaseApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {}
              this.queryParam.goodsId = this.form.id
              this.getPage()
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      getPriceData() {
        goodsBaseSizePriceApi.getPriceData(this.queryParam1).then(res => {
          if (res.subCode === 1000) {
            this.priceData = res.data
            this.dataEmpty = false
            this.loading = false
            this.chartData = JSON.parse(JSON.stringify(res.data.lineVo));
            let theirPrice = this.$getThePrice(res.data.price)
            this.priceData.theirPrice = parseFloat(theirPrice).toFixed(2)

            let theirPrice30 =  this.$getThePrice(res.data.price30)
            this.priceData.theirPrice30 = parseFloat(theirPrice30).toFixed(2)

            let theirPrice180 =  this.$getThePrice(res.data.price180)
            this.priceData.theirPrice180 = parseFloat(theirPrice180).toFixed(2)

            let theirPrice365 =  this.$getThePrice(res.data.price365)
            this.priceData.theirPrice365 = parseFloat(theirPrice365).toFixed(2)
            this.date = this.priceData.date
          } else if (res.subCode === 10086) {
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      getPage() {
        goodsBaseSizeApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            let totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.form.sizeVoList && this.tableData) {
              for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].sizeId && this.tableData[i].inventory) {
                  this.queryParam1.goodsId = this.form.id
                  this.queryParam1.sizeId = this.tableData[i].sizeId
                  this.size = this.tableData[i].size
                  this.getPriceData()
                  break
                }
              }
            }
            if (this.form.sizeList && totalCount < this.form.sizeList.length && this.reqCount < 5) {
              setTimeout(()=>{
                this.reqCount ++
                this.getPage()
              },2000)
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
    }
  }
</script>

<style>

  @import '@/assets/index/style.css';
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
  .my-pay-5 {
    margin-top: 15px;
    border-radius: 10px;
    width: 92%;
    margin-left: 4%;
    padding-top: 4vw;
    background-color: #fff;
    border-bottom-color: rgba(185, 185, 185, .14);
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }
  .store-list-1-1 {
    display: -webkit-box;
    margin-top: -15px;
    margin-bottom: 20px;
    text-align: center;
    margin-left: -11px;
  }
  .store-list-1-li-1 {
    border-radius: 10px;
    text-align: center;
    background-color: #EEF2F7;
    width: 24%;
    color: #333;
    font-size: 15px;
    box-sizing: border-box;
    margin-top: 0vw;
    margin-right: 2vw;
    margin-bottom: 0vw;
    margin-left: 0vw;
    padding: 3px;
  }
</style>
