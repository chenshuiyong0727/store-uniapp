<template lang="html">
  <view class="login">
    <u-navbar title="库存添加">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <image class="back_icon" :src="fileUrl +'/static/img/back3.png'"></image>
      </view>
<!--      <view  @click="goAdd" class="u-nav-slot" slot="right" style="font-size: 15px;margin-right: 23vw">-->
<!--        提交-->
<!--      </view>-->
    </u-navbar>
    <view class="dingdans_item" style="margin-top: 50px; margin-bottom: 7px; border-bottom:0px ;padding:0" >
      <view class="dingdans_con" style="padding:5px">
        <view style="  width: 200px;
  height: 84px;
  position: relative;
  border-radius: 5px;" >
          <image v-if="form.img" mode="widthFix"    @click="avatarShow(form.img)" style="  width: 80%;margin-top: 16px;margin-left: 10%;" :src="form.img"  ></image>
          <image :src="fileUrl+form.imgUrl" v-if="!form.img && form.imgUrl" mode="widthFix"    @click="avatarShow(form.imgUrl)" style="  width: 100%;"  ></image>
        </view>
        <view class="diangdans_con_right" style=" margin-right: 10px;">
          <view class="dingdans_con_right_top">
            <text>
              <strong v-if="form.id"
                      @click="goodsDetail(form.id) "
                      style="margin-right: 10px; color: #333333;font-size: 14px;">
                {{form.name }}
              </strong>
            </text>
            <view style="margin-top: 7px; font-size: 15px;color: #666" class="xianglian">
              <text @click="jumpactNo(form.actNo)">
              {{form.actNo}}
              </text>
              <image @click="$copyUrl(form.actNo)" class="fuzhitupian"
                     :src="fileUrl +'/static/img/copy.png'"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view style="
        margin-bottom: 7px;
    font-size: 10px;
    padding-top: 3.4vw;
    padding-left: 3vw;
    background: #ffffff;" >
      <text style="font-size: 17px;color: #333333">入库尺码</text>
      <view style="margin-top: 12px; ">
        <view style="text-align: center" @click="addSizeHandle(item, index)"
             :class="activeIndex.includes(index) ? 'city cityActive' : 'city'"
             v-for="(item, index) in form.sizeVoList" :key="item.id">
              <text>
                {{item.size}}
              </text>
        </view>
      </view>
    </view>
    <view style="
        border-bottom: 1vw solid #eee;
    font-size: 10px;
    padding-top: 3.4vw;
    padding-left: 4vw;
    padding-right: 3vw;
    background: #ffffff;" >
      <text style="font-size: 17px;margin-bottom: 12px; color: #333333">尺码列表</text>
      <view  style="margin-top: 12px; " class="clearfix btm-distance">
        <uni-table
            :style="tableData.length?'padding-bottom: 25vw;':''"
            ref="table"
            border
            stripe
            emptyText="暂无更多数据">
          <uni-tr>
            <uni-th width="60" align="center">尺码</uni-th>
            <uni-th width="80" align="center">库存</uni-th>
            <uni-th width="80" align="center">进价</uni-th>
            <uni-th width="80" align="center">售价</uni-th>
            <uni-th width="70" align="center">渠道</uni-th>
            <uni-th width="70" align="center">到手价</uni-th>
            <uni-th width="70" align="center">手续费</uni-th>
            <uni-th width="70" align="center">利润</uni-th>
          </uni-tr>
          <uni-tr v-for="(item, index) in tableData" :key="index">
            <uni-td>
              <text>
                {{ item.size }}
              </text>
            </uni-td>
            <uni-td>
              <view>
                <u-input type="number" v-model="item.inventory"></u-input>
              </view>
            </uni-td>
            <uni-td align="center">
              <view>
                <u-input  type="digit" v-model="item.price"></u-input>
              </view>
            </uni-td>
            <uni-td align="center">
              <view>
                <u-input  type="digit" v-model="item.dwPrice"></u-input>
              </view>
            </uni-td>
            <uni-td>
              <view>
                <uni-data-select
                    v-model="item.channelId"
                    :localdata="range"
                    :clear="false"
                ></uni-data-select>
              </view>
            </uni-td>

            <uni-td>
              <text>
                {{item.dwPrice | getThePrice}}
              </text>
            </uni-td>

            <uni-td>
              <text>
                {{item.dwPrice | getPoundage}}
              </text>
            </uni-td>

            <uni-td>
              <text>
                {{item.dwPrice | getProfits(item.price)}}
              </text>
            </uni-td>
          </uni-tr>
        </uni-table>
      </view>
    </view>

    <view>
      <u-popup :show="isShowDialog1" @close="isShowDialog1=!isShowDialog1" :duration="100" mode="center">
        <view style="width: 90vw;margin-left: 5vw;">
          <u-navbar title="详情" :fixed="false" :border="true">
            <view @click="isShowDialog1 = false" style="font-size: 15px;" class="u-nav-slot" slot="left">
              <text>关闭</text>
            </view>
          </u-navbar>
          <view>
            <u--form >
              <u-form-item label-width="25vw" label="尺码" borderBottom>
                <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                           v-model="orderData1.size" border="none" color="#333333"></u--input>
                <u-icon class="biaodan-gengduo" style="margin-right: 15px;" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label-width="25vw" label="尺码" borderBottom>
                <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                           v-model="orderData1.channelIdStr" border="none" color="#333333"></u--input>
                <u-icon class="biaodan-gengduo" style="margin-right: 15px;" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label-width="25vw" label="库存" borderBottom>
                <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                           v-model="orderData1.inventory" border="none" color="#333333"></u--input>
                <u-icon class="biaodan-gengduo" style="margin-right: 15px;" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label-width="25vw" label="进价" borderBottom>
                <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                           v-model="orderData1.price" border="none" color="#333333"></u--input>
                <u-icon class="biaodan-gengduo" style="margin-right: 15px;" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label-width="25vw" label="售价" borderBottom>
                <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                           v-model="orderData1.dwPrice" border="none" color="#333333"></u--input>
                <u-icon class="biaodan-gengduo" style="margin-right: 15px;" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label-width="25vw" label="手续费" borderBottom>
                <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                           v-model="orderData1.poundage" border="none" color="#333333"></u--input>
                <u-icon class="biaodan-gengduo" style="margin-right: 15px;" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label-width="25vw" label="到手价" borderBottom>
                <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                           v-model="orderData1.theirPrice" border="none" color="#333333"></u--input>
                <u-icon class="biaodan-gengduo" style="margin-right: 15px;" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label-width="25vw" label="利润" borderBottom>
                <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                           v-model="orderData1.profits" border="none" color="#333333"></u--input>
                <u-icon class="biaodan-gengduo" style="margin-right: 15px;" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
            </u--form>
          </view>
        </view>
      </u-popup>
    </view>

    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="imageZoom" mode="widthFix"  class="showImg"></image>
      </view>
    </view>
    <view class="baisebeijing shuipingjuzhong" style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <u-button style="width: 50vw; margin: 10px 15px;" type="primary"  @click="goAdd">
        <text class="dibuanniuwenzi">确认修改</text>
      </u-button>
    </view>
  </view>
</template>

<script>
  import { goodsBaseApi } from '@/api/goodsBase'
  import { goodsInventoryApi } from '@/api/goodsInventory'
  export default {
    data(){
      return {
        fileUrl: this.$fileUrl,
        form: {
          sizeVoList: '',
          name: '',
          actNo: '',
          imgUrl: '',
          img: '',
        },
        array: [{name:'中国'},{name: '美国'}, {name:'巴西'}, {name:'日本'}],
        index: 2,
        isShowDialog2: false,
        pictureZoomShow: false,
        imageZoom: '',
        channelIdList: [],
        range: [
          { value: 1, text: "线下" },
          { value: 2, text: "线上" }
        ],
        isShowDialog1: false,
        orderData1: '',
        inventoryIndex:'',
        activeIndex: [],
        goodsId: '',
        unifiedPrice: '',
        unifiedDwPrice: '',
        tableData: [],
        totalCount: 1
      }
    },
    onLoad(options) {
      if (options) {
        this.goodsId = options.goodsId ? options.goodsId : '';
        this.form.goodsId = this.goodsId
        if (this.goodsId) {
          this.getDetailById(this.goodsId)
        }
      }
    },
    mounted() {
      this.listSysDict()
    },
    methods:{
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.channelIdList = sysDictList.filter(item => item.typeValue == 47)
      },
      changeStatusDialog1(index,row) {
        this.inventoryIndex = index
        this.orderData1 = row
        if (this.orderData1.dwPrice)  {
          let poundage = this.$getPoundage(this.orderData1.dwPrice)
          this.orderData1.poundage = parseFloat(poundage).toFixed(2)

          let theirPrice =  this.orderData1.dwPrice
              - poundage
          this.orderData1.theirPrice = parseFloat(theirPrice).toFixed(2)
        }
        if (this.orderData1.theirPrice && this.orderData1.price)  {
          let profits = this.orderData1.theirPrice - 10
              - this.orderData1.price
          this.orderData1.profits = parseFloat(profits).toFixed(2)
        }
        this.orderData1.channelIdStr = this.orderData1.channelId == 1 ? '线下' : '线上'
        this.isShowDialog1 = true
      },
      goAdd() {
        for (let i = 0; i < this.tableData.length; i++) {
          let data1 = this.tableData[i]
          let size = data1.size
          if (!data1.inventory) {
            this.$toast('请输入尺码 ' + size + ' 的库存')
            return
          }
          if (!data1.price) {
            this.$toast('请输入尺码 ' + size + ' 的进价')
            return
          }
          if (!data1.dwPrice) {
            this.$toast('请输入尺码 ' + size + ' 的售价')
            return
          }
          if (!data1.channelId) {
            data1.channelId = 1
          }
        }
        goodsInventoryApi.add({ sizeDtos: this.tableData }).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/store/index',
              });
            }, 1000)
          }
        })
      },
      goodsDetail(id) {
        if (!id) {
          return
        }
        let url = '/subPages/pages/goodsBase/detail?id=' + id
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
        let url = '/subPages/pages/goodsBase/detail?id=' + id
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
      },
      delItem(item) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id == item.id) {
            this.tableData.splice(i, 1)
          }
        }
      },
      getDetailById(id) {
        if (id) {
          goodsBaseApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {}
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
  strong{
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
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .btm-distance {
    margin-bottom: 15px;
  }
  .city {
    width: 63px;
    border-radius: 5px;
    font-size: 15px;
    background-color: #F6F6F6;
    padding: 7px 0px;
    margin-right: 6px;
    margin-bottom: 13px;
    display: inline-block;
  }

  .cityActive {
    font-size: 16px;
    background-color: #BEBEBE;
    padding: 8px 0px;
  }


</style>
