<template lang="html">
  <view class="login">
    <u-navbar title="上架" bgColor="#F3F4F5">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <!--      <view  @click="goAdd" class="u-nav-slot" slot="right" style="font-size: 15px;">-->
      <!--        提交-->
      <!--      </view>-->
    </u-navbar>
    <view class="width92 baisebeijing" style="margin-top: 60px;">
      <view style="width: 85vw;margin-left: 4vw;    padding-top: 10px;">
        <text>
          <strong v-if="orderData1.goodsId"
                  @click="goodsDetail(orderData1.goodsId) "
                  style="  color: #333333;font-size: 14px;">
            {{orderData1.goodsName }}
          </strong>
        </text>
      </view>
      <view class="dingdans_item" style="margin-bottom: 7px; border-bottom:0px ;padding:10px">
        <view class="dingdans_con" style="padding:0">
          <view style="  width: 210px;    border: 1px solid #f1f1f1;
    height: 100px;
    position: relative;
    border-radius: 5px;">
            <image mode="widthFix" @click="avatarShow(orderData1.img)" style="  width: 80%;
    margin-top: 28px;
    margin-left: 10%;" :src="orderData1.img"></image>
          </view>
          <view class="diangdans_con_right" style="font-size: 14px;
      padding-left: 12px;
      margin-right: 10px;">
            <view class="dingdans_con_right_top xianglian">
              <view class="xianglian">
                <text @click="jumpactNo(orderData1.actNo)">
                  {{orderData1.actNo}}
                </text>
                <image @click="$copyUrl(orderData1.actNo)" class="fuzhitupian"
                       src="../../static/img/copy.png"></image>
              </view>
              <view class="shugangfengexian">
                <text>|</text>
              </view>
              <view>
                尺码：
                <text>{{orderData1.size}}</text>
              </view>
            </view>

            <view class="dingdans_con_right_top xianglian">
              <view class="xianglian">
                库存：
                <text>
                  {{orderData1.inventory}}
                </text>
                /
                <text>
                  {{orderData1.oldInventory}}
                </text>
              </view>
              <view class="shugangfengexian">
                <text>|</text>
              </view>
              <view>
                已上架：
                <text>{{orderData1.galleryCount}}</text>
              </view>
            </view>

            <view class="dingdans_con_right_top xianglian">
              <text>入库价：</text>
              <u--text mode="price" :text="orderData1.price"></u--text>
            </view>

          </view>
        </view>
      </view>
    </view>


    <view class="width92 baisebeijing" style="margin-top: 10px;">
      <view class="zuoyouduiqi" style="width: 85vw;margin-left: 4vw;    padding: 12px 0;">
        <text style="font-weight: 600;font-size: 14px">出售数量</text>
        <u-number-box v-model="requestParam1.num" :max="max1"></u-number-box>
      </view>
    </view>

    <view class="width92 baisebeijing" style="margin-top: 10px;">
      <view style="width: 85vw;margin-left: 4vw;    padding: 12px 0;">
        <view style="margin-right: 3px;">
          <text style="font-weight: 600;font-size: 14px;margin-top: 5px;">出售价格</text>
        </view>
        <view class="zuoyouduiqi"
              style="font-weight: 600;caret-color:#409eff;  border-bottom: 2px solid #333333;margin-top: 10px;">
          <view>
            <u-text
                size="20"
                color="#333333"
                text="￥"
                margin="0 3px 0 0"
            ></u-text>
          </view>
          <view style="width: 60vw">
            <u--input
                placeholderStyle="font-size: 24px;color:#c0c4cc"
                @change="keyup2"
                v-model="requestParam1.shelvesPrice"
                placeholder="输入价格" color="#333333" clearable border="none" fontSize="30px"
                type="digit">
            </u--input>
          </view>

          <view style="width: 20vw">

            <text style="font-size: 12px;color: #808080">
              {{tipMsg}}
            </text>
          </view>
        </view>
      </view>
      <view v-if="requestParam1.shelvesPrice"
            style="width: 85vw;margin-left: 4vw;color: #808080;font-size: 12px;padding-bottom: 18px;">
        <view class="zuoyouduiqi " style="margin-top: 5px;">
          <view>
            <text>技术服务费</text>
            <text style="margin-left: 3px">5.00%</text>
          </view>
          <view class="xianglian">
            <text v-if="requestParam1.jsfwf<=15"
                  style="padding: 1px; background-color: #E9EDF2;margin-right: 3px;">已达下限
            </text>
            <text v-if="requestParam1.jsfwf>=249"
                  style="padding: 1px; background-color: #E9EDF2;margin-right: 3px;">已达上限
            </text>
            <u--text mode="price" color="#808080" size="12" :text="requestParam1.jsfwf"></u--text>
          </view>
        </view>
        <view class="zuoyouduiqi" style="margin-top: 5px;">
          <view>
            <text>转账手续费</text>
            <text style="margin-left: 3px">1.00%</text>
          </view>
          <view>
            <u--text mode="price" color="#808080" size="12" :text="requestParam1.zzsxf"></u--text>
          </view>
        </view>
        <view class="zuoyouduiqi" style="margin-top: 5px;">
          <view>
            <text>操作服务费</text>
          </view>
          <view>
            <u--text mode="price" color="#808080" size="12" :text="requestParam1.czfwf"></u--text>
          </view>
        </view>
        <view class="zuoyouduiqi" style="margin-top: 5px;">
          <view>
            <text>售后无忧服务费</text>
            <text style="margin-left: 3px">{{requestParam1.shwffwfBl}}0%</text>
          </view>
          <view>
            <u--text mode="price" color="#808080" size="12" :text="requestParam1.shwffwf"></u--text>
          </view>
        </view>
        <view class="zuoyouduiqi" style="margin-top: 5px;">
          <view>
            <text>消费者邮费补贴</text>
          </view>
          <view>
            <u--text mode="price" color="#808080" size="12" :text="requestParam1.xfzyfbt"></u--text>
          </view>
        </view>
        <view class="zuoyouduiqi"
              style="font-weight: 600;font-size: 15px;padding-top: 15px;color: #333333">
          <view>
            <text>手续费总额</text>
          </view>
          <view>
            <u--text style="font-weight: 600;" :bold="true" mode="price" color="#333333" size="17"
                     :text="requestParam1.poundage"></u--text>
          </view>
        </view>
        <view class="zuoyouduiqi"
              style="font-weight: 600;font-size: 15px;padding-top: 10px;color: #333333">
          <view>
            <text>预计最高收入</text>
          </view>
          <view>
            <u--text style="font-weight: 600;" :bold="true" mode="price" color="#333333" size="17"
                     :text="requestParam1.theirPrice"></u--text>
          </view>
        </view>
        <view class="zuoyouduiqi"
              style="font-weight: 600;font-size: 15px;padding-top: 10px;color: #333333">
          <view>
            <text>预计利润</text>
          </view>
          <view>
            <u--text style="font-weight: 600;" :bold="true" mode="price" color="#333333" size="17"
                     :text="requestParam1.profits"></u--text>
          </view>
        </view>

      </view>
    </view>
    <view style="height: 60px"></view>

    <view class="baisebeijing shuipingjuzhong" style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <u-button style="width: 50vw; margin: 10px 15px;" type="primary" @click="confirmHandle1">
        <text style=" font-size: 17px;font-weight: 600">提交</text>
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
  import {goodsInventoryApi} from '@/api/goodsInventory'

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
        orderData1: '',
        max1: '',
        requestParam1: {
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
          xfzyfbt: ''
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
      keyup2() {
        let shelvesPrice = this.requestParam1.shelvesPrice + ''
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
        this.requestParam1.jsfwf = parseFloat(jsfwf).toFixed(2)

        let zzsxf = shelvesPrice * 0.01
        this.requestParam1.zzsxf = parseFloat(zzsxf).toFixed(2)

        let shwffwfBl = 1.5
        if (shelvesPrice >= 600 && shelvesPrice < 2000) {
          shwffwfBl = 1.6
        } else if (shelvesPrice >= 2000) {
          shwffwfBl = 1.8
        }
        this.requestParam1.shwffwfBl = shwffwfBl
        let shwffwf = shelvesPrice * 0.01 * shwffwfBl
        this.requestParam1.shwffwf = parseFloat(shwffwf).toFixed(2)

        let xfzyfbt = 6
        if (shelvesPrice >= 200 && shelvesPrice < 300) {
          xfzyfbt = 6.5
        } else if (shelvesPrice >= 300) {
          xfzyfbt = 8.5
        }
        this.requestParam1.xfzyfbt = parseFloat(xfzyfbt).toFixed(2)

        let poundage = jsfwf + zzsxf + shwffwf + xfzyfbt + 38
        // let poundage = shelvesPrice * 0.075 + 38 + 8.5
        this.requestParam1.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice = shelvesPrice - poundage
        this.requestParam1.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParam1.theirPrice - 10
            - this.orderData1.price
        this.requestParam1.profits = parseFloat(profits).toFixed(2)

        // if (this.requestParam1.num > this.orderData1.inventory - this.orderData1.galleryCount) {
        //   this.requestParam1.num = this.orderData1.inventory - this.orderData1.galleryCount
        // }
      },

      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.channelIdList = sysDictList.filter(item => item.typeValue == 47)
      },
      changeStatusDialog1(index, row) {
        this.inventoryIndex = index
        this.orderData1 = row
        if (this.orderData1.dwPrice) {
          let poundage = this.orderData1.dwPrice * 0.075 + 38 + 8.5
          this.orderData1.poundage = parseFloat(poundage).toFixed(2)

          let theirPrice = this.orderData1.dwPrice
              - (this.orderData1.dwPrice * 0.075 + 38 + 8.5)
          this.orderData1.theirPrice = parseFloat(theirPrice).toFixed(2)
        }
        if (this.orderData1.theirPrice && this.orderData1.price) {
          let profits = this.orderData1.theirPrice - 10
              - this.orderData1.price
          this.orderData1.profits = parseFloat(profits).toFixed(2)
        }
        this.isShowDialog1 = true
      },
      confirmHandle1() {
        if (!this.requestParam1.num) {
          this.$toast("上架数量错误");
          return
        }
        if (this.requestParam1.num > this.orderData1.inventory) {
          this.$toast('上架数量大于当前库存')
          return
        }
        let data = {}
        data.inventoryId = this.requestParam1.inventoryId
        data.type = this.requestParam1.type
        data.num = this.requestParam1.num
        data.shelvesPrice = this.requestParam1.shelvesPrice
        goodsInventoryApi.shelvesGoods(data).then(res => {
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
      setUnifiedPrice() {
        if (!this.unifiedPrice) {
          this.$toast('请输入入库价格')
          return
        }
        let table1 = []
        for (let i = 0; i < this.tableData.length; i++) {
          let data1 = this.tableData[i]
          data1.price = this.unifiedPrice
          table1.push(data1)
        }
        this.tableData = table1
      },
      setUnifiedDwPrice() {
        if (!this.unifiedDwPrice) {
          this.$toast('请输入售价格')
          return
        }
        let table1 = []
        for (let i = 0; i < this.tableData.length; i++) {
          let data1 = this.tableData[i]
          data1.dwPrice = this.unifiedDwPrice
          table1.push(data1)
        }
        this.tableData = table1
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
        this.$router.push({path: '/store', query: {actNo}})
      },
      // 复制链接
      copyUrl(url) {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', url)
        input.select()
        if (document.execCommand('copy')) {
          document.execCommand('copy')
        }
        document.body.removeChild(input)
        this.$toast('已复制至剪切板')
      },
      addSizeHandle(item, index = 0) {
        if (!this.activeIndex.includes(index)) {
          this.activeIndex.push(index)
          item.sizeIndex = index
          item.sizeId = item.id
          item.goodsId = this.goodsId
          item.inventory = 1
          item.price = 1
          item.dwPrice = 1
          item.channelId = 1
          if (this.tableData.length) {
            let data1 = this.tableData[0]
            item.inventory = data1.inventory
            item.price = data1.price
            item.dwPrice = data1.dwPrice
            item.channelId = data1.channelId
          }
          this.tableData.push(item)
        } else {
          this.del(index)
          this.delItem(item)
        }
      },
      goDetail(item) {
      },
      goDel() {
        this.del(this.inventoryIndex)
        this.delItem(this.orderData1)
        this.isShowDialog1 = false
      },
      del(index) {
        for (let i = 0; i < this.activeIndex.length; i++) {
          if (this.activeIndex[i] == index) {
            this.activeIndex.splice(i, 1)
          }
        }
        console.log(this.activeIndex)
      },
      delItem(item) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id == item.id) {
            this.tableData.splice(i, 1)
          }
        }
        console.log(this.tableData)
      },
      getDetailById(id) {
        if (id) {
          goodsInventoryApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.orderData1 = res.data ? res.data : {}
              this.max1 = this.orderData1.inventory - this.orderData1.galleryCount

              this.requestParam1.inventoryId = this.orderData1.id
              this.requestParam1.num = this.orderData1.inventory - this.orderData1.galleryCount
              this.requestParam1.shelvesPrice = this.orderData1.dwPrice
              this.keyup2()
              // let poundage = this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5
              // this.requestParam1.poundage = parseFloat(poundage).toFixed(2)
              //
              // let theirPrice =  this.requestParam1.shelvesPrice
              //     - (this.requestParam1.shelvesPrice * 0.075 + 38 + 8.5)
              // this.requestParam1.theirPrice = parseFloat(theirPrice).toFixed(2)
              //
              // let profits = this.requestParam1.theirPrice - 10
              //     - this.orderData1.price
              // this.requestParam1.profits = parseFloat(profits).toFixed(2)
              // this.isShowDialog1 = true

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

  .dingdans_item {
    padding: 2.4vw 1.2vw;
    background: #ffffff;
    border-bottom: 1vw solid #eee;
    padding-right: 3%;
    padding-left: 3%;
  }

  .dingdans_top {
    font-size: 13px;
    height: 3.88vw;
    line-height: 3.88vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dingdans_con {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1.3vw 0;
  }

  .dingdans_con_left {
    width: 35vw;
    height: 20vw;
    display: flex;
  }

  .dingdans_con_left img {
    width: 100%;
    margin: auto;
    border-radius: 10px;
  }

  .diangdans_con_right {
    width: 130vw;
    padding-left: 10px;
  }

  .dingdans_con_right_down {
    margin-top: 1.4vw;
    font-size: 13px;
    margin-bottom: 2vw;
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

  .dingdans_con_right_top {
    padding-bottom: 10px;
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
