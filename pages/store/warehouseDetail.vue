<template>
  <view class="hello">
    <u-navbar :title="actNo"  bgColor="#f3f2f8">
      <view @click="$goBack"  class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
    </u-navbar>
    <view style="padding: 10px 5px ;position: fixed ;width: 100vw" class="zuoyouduiqi baisebeijing">
      <view class="store-list-1" >
        <view  style="display:flex ;align-items:center; background-color: white;border: 2px solid #f1f1f1 ;" class="store-list-1-view">
          <view style="border-radius: 10px;">
            <image
                v-if="img"
                :src="img"
                mode="widthFix"
                style="width: 17vw ; margin-top: 4vw;margin-left: 2vw"
                @click="avatarShow(img)"
            ></image>
          </view>
        </view>
        <view  class="store-list-1-view">
          <view class="overview1">
            <p><strong>库存数量</strong></p>
            <p>{{inventoryData.inventory}} / {{inventoryData.oldInventory}}</p>
          </view>
          <view class="overview2">
            <p><strong>库存成本</strong></p>
            <p>{{inventoryData.price}}</p>
          </view>
        </view>
        <view  class="store-list-1-view">
          <view class="overview1">
            <p><strong>入库总额</strong></p>
            <p>{{inventoryData.inputPrice}}</p>
          </view>
          <view class="overview2">
            <p><strong>市值总额</strong></p>
            <p>{{inventoryData.dwPrice}}</p>
          </view>
        </view>
        <view  class="store-list-1-view">
          <view class="overview1">
            <p><strong>实际利润</strong></p>
            <p>{{inventoryData.profits}}</p>
          </view>
          <view class="overview2">
            <p><strong>利润比例</strong></p>
            <p>{{(inventoryData.profits / inventoryData.inputPrice ) * 100 | numFilter}} %</p>
          </view>
        </view>
      </view>
    </view>
    <view style="margin-top: 106px;">
      <view class="dingdans_item_other" v-for="(item,index) in tableData" :key="index">
        <view class="dingdans_top_other zuoyouduiqi" style="border-left: 0px;">
          <view  style="width: 50px;
    margin-left: -2px;
    margin-right: 2px;" >
            <u-checkbox-group>
              <u-checkbox  size="18"
                           :checked="item.checked"
                           @change="changeChecked(item)"
                           activeColor="#409eff"
                           shape="circle">

              </u-checkbox>
            </u-checkbox-group>
          </view>


          <view style="margin-right: 12px;" @click="goDetail(item.id , 1)" >
            <strong>尺码：</strong>
            <strong style="color: #409eff"> {{item.size}} </strong>
          </view>
        </view>

        <view @click="goDetail(item.id , 1)"  class="zuoyouduiqi dingdans_con_other width92 bt1">
          <view  class="xianglian2">
            <view  class="dingdans_other_left">
              <text>剩余库存：</text>
            </view>
            <view   class="top_other_border">
              <text >{{item.inventory }}</text>
            </view>
          </view>
          <view  class="xianglian2">
            <view  class="dingdans_other_left">
              <text>原始库存：</text>
            </view>
            <view   class="top_other">
              <text >{{ item.oldInventory }}</text>
            </view>
          </view>
        </view>

        <view  @click="goDetail(item.id , 1)"  class="zuoyouduiqi dingdans_con_other width92 bt1">
          <view class="xianglian2">
            <view  class="dingdans_other_left">
              <text>入库渠道：</text>
            </view>
            <view   class="top_other_border">
              <text >{{ item.channelId | dictToDescTypeValue(47) }}</text>
            </view>
          </view>
          <view   class="xianglian2">
            <view  class="dingdans_other_left">
              <text>所在仓库：</text>
            </view>
            <view   class="top_other">
              <text >{{ item.warehouseId | dictToDescTypeValue(40) }}</text>
            </view>
          </view>
        </view>

        <view  @click="goDetail(item.id , 1)"  class="zuoyouduiqi dingdans_con_other width92 bt1">
          <view class="xianglian2">
            <view  class="dingdans_other_left">
              <text>入库价：</text>
            </view>
            <view   class="top_other_border">
              <text>{{ item.price }}</text>
            </view>
          </view>
          <view   class="xianglian2">
            <view  class="dingdans_other_left">
              <text>得物价：</text>
            </view>
            <view   class="top_other">
              <text v-if="item.thisTimePrice">{{ item.thisTimePrice }}</text>
              <text v-else>{{ item.dwPrice }}</text>
            </view>
          </view>
        </view>

        <view  @click="goDetail(item.id , 1)"  class="zuoyouduiqi dingdans_con_other width92 bt1">
          <view   class="xianglian2">
            <view  class="dingdans_other_left">
              <text>预计利润：</text>
            </view>
            <view   class="top_other_border " >
              <text class="color-danger" v-if="item.thisTimePrice">{{ item.thisTimeProfits }}</text>
              <text class="color-danger" v-else>{{item.dwPrice | getProfits(item.price)}}</text>
            </view>
          </view>
          <view class="xianglian2">
            <view  class="dingdans_other_left">
              <text> 到手价：</text>
            </view>
            <view   class="top_other">
              <text v-if="item.thisTimePrice">{{ item.thisTimeThePrice }}</text>
              <text v-if="!item.thisTimePrice && item.theirPrice">{{item.theirPrice}}</text>
            </view>
          </view>
        </view>
      </view>

    </view>
    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="imageZoom" alt="" mode="widthFix"   class="showImg"></image>
      </view>
    </view>
    <view v-show="tableData.length" class="meiyougengduo" style=" padding-bottom: 60px;">
      <u-loadmore fontSize="18"  color="#a6a6a6" nomoreText="最硬球鞋"  loadingText="最硬球鞋" status="nomore"/>
    </view>
    <view  class="zuoyouduiqi gengduocaozuo">
      <view style="margin-left: 20px;">
        <u-checkbox-group>
          <u-checkbox  size="20" :checked="checkAll"  @change="checkedAll" activeColor="#409eff"  shape="circle" label="全选"></u-checkbox>
        </u-checkbox-group>
      </view>
      <view class="xianglian">
        <text style="font-size: 14px;">已选</text>
        <text class="color-url" style=" font-size: 17px;margin-left: 8px;font-weight: bolder">{{ids.length}}</text>
        <u-button  type="primary" shape="circle" size="small" style="
        width: 20vw;
        margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;" @click="handleClick">移动仓库
        </u-button>
        <u-button  type="primary" shape="circle" size="small" style="
        width: 20vw;
        margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
        margin-right: 10px" @click="handleClickChannel">设置渠道
        </u-button>
      </view>
    </view>

    <view>
      <u-popup :show="isShowDialog" @close="isShowDialog = false"  :duration="0" :closeable="true" mode="center">
        <view style="width: 80vw;margin-left: 5vw;margin-right: 5vw;">
          <u-navbar title="移动仓库" :fixed="false" :border="true">
            <view class="u-nav-slot" slot="left">
            </view>
          </u-navbar>
          <view>
            <u--form>
              <u-form-item label-width="20vw" label="选中数" borderBottom>
                <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                           v-model="ids.length" border="none" color="#F56C6C"></u--input>
              </u-form-item>

              <u-form-item label="仓库" borderBottom @click="showWarehouseType = true; $hideKeyboard()">
                <u--input inputAlign="right" placeholder="请选择仓库" disabledColor="#fff"
                          placeholderStyle="font-size: 14px;color:#c0c4cc"
                          v-model="requestParam.warehouseIdStr" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
            </u--form>
            <view class="shuipingjuzhong">
              <u-button style="width: 50vw; margin: 10px 15px;"  size="small"   type="primary" @click="confirmHandle">
                <text class="dibuanniuwenzi">确认</text>
              </u-button>
            </view>
          </view>
        </view>
      </u-popup>
    </view>
    <u-picker :show="showWarehouseType" :columns="columnsWarehouse" @cancel="showWarehouseType= false" :defaultIndex="[1]"
              @confirm="confirmWarehouseType" keyName="fieldName"></u-picker>
    <view>
      <u-popup :show="isShowDialog1" @close="isShowDialog1 = false"  :duration="0" :closeable="true" mode="center">
        <view style="width: 80vw;margin-left: 5vw;margin-right: 5vw;">
<!--          <u-navbar title="选择渠道" :fixed="false" :border="true">-->
<!--            <view @click="isShowDialog1 = false" style="font-size: 15px;" class="u-nav-slot" slot="left">-->
<!--              <text>关闭</text>-->
<!--            </view>-->
<!--            <view @click="confirmHandleChannelId" class="u-nav-slot" style="font-size: 15px;" slot="right">-->
<!--              <text>确定</text>-->
<!--            </view>-->
<!--          </u-navbar>-->
          <u-navbar title="移动仓库" :fixed="false" :border="true">
            <view class="u-nav-slot" slot="left">
            </view>
          </u-navbar>
          <view>
            <u--form>
              <u-form-item label-width="25vw" label="选中数" borderBottom>
                <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                           v-model="ids.length" border="none" color="#F56C6C"></u--input>
              </u-form-item>

              <u-form-item label="渠道" borderBottom @click="showChannelIdType = true; $hideKeyboard()">
                <u--input inputAlign="right" placeholder="请选择渠道" disabledColor="#fff"
                          placeholderStyle="font-size: 14px;color:#c0c4cc"
                          v-model="requestParamChannelId.channelIdStr" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
            </u--form>
          </view>
          <view class="shuipingjuzhong">
            <u-button style="width: 50vw; margin: 10px 15px;"  size="small"   type="primary" @click="confirmHandleChannelId">
              <text class="dibuanniuwenzi">确认</text>
            </u-button>
          </view>
        </view>
      </u-popup>
    </view>
    <u-picker :show="showChannelIdType" :columns="columnsChannelId" @cancel="showChannelIdType= false" :defaultIndex="[1]"
              @confirm="confirmChannelIdType" keyName="fieldName"></u-picker>

  </view>
</template>
<script>
  import { goodsInventoryApi } from '@/api/goodsInventory'

  export default {
 data() {
      return {
        fileUrl: this.$fileUrl,
        requestParam: {
          ids: [],
          warehouseId: 2,
          warehouseIdStr: ''
        },
        requestParamChannelId: {
          ids: [],
          channelId: 2,
          channelIdStr:''
        },
        columnsChannelId: [],
        showChannelIdType: false,
        columnsWarehouse: [],
        showWarehouseType: false,
        isShowDialog: false,
        isShowDialog1: false,
        checkAll: false,
        titleName: '销售报表',
        emtityMsg: '没有更多了',
        imageZoom: '',
        pictureZoomShow: false,
        queryParam: {
          sort: ' c.size asc ,',
          goodsId: '',
          pageSize: 20,
          pageNum: 1
        },
        warehouseList: [],
        channelIdList: [],
        ids: [],
        actNo: '',
        imgUrl: '',
        img: '',
        tableData: [],
        inventoryData: {
          profits: '',
          inventory: '',
          oldInventory: '',
          inventoryCost: '',
          dwPrice: ''
        }
      }
    },
    onLoad(options) {
      this.listSysDict()
      if (options) {
        this.queryParam.goodsId  = options.goodsId ? options.goodsId : '';
        this.actNo = options.actNo ? options.actNo : '';
        this.img = options.img ? options.img : '';
        if (this.queryParam.goodsId) {
          this.getPage()
        }
      }
    },
    methods: {
      confirmWarehouseType(e) {
        this.showWarehouseType = false
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.requestParam.warehouseId = fieldValue
        this.requestParam.warehouseIdStr = fieldName
      },
      confirmChannelIdType(e) {
        this.showChannelIdType = false
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.requestParamChannelId.channelId = fieldValue
        this.requestParamChannelId.channelIdStr = fieldName
      },
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.warehouseList = sysDictList.filter(item => item.typeValue == 40)
        this.columnsWarehouse.push(this.warehouseList)
        this.channelIdList = sysDictList.filter(item => item.typeValue == 47)
        this.columnsChannelId.push(this.channelIdList)
      },
      confirmHandle() {
        goodsInventoryApi.batchupdateStatus(this.requestParam).then((res) => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.isShowDialog = false
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/store/index?current=3&today=3',
              });
            }, 1000)
          }
        })
      },
      confirmHandleChannelId() {
        goodsInventoryApi.batchupdateStatus(this.requestParamChannelId).then((res) => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.isShowDialog1 = false
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/store/index',
              });
            }, 1000)
          }
        })
      },
      handleClick() {
        this.requestParam.ids = this.ids
        if (!this.ids.length ) {
          this.$toast('请选择尺码')
          return
        }
        this.isShowDialog = true
        this.requestParam.warehouseIdStr = this.$typeToStr(40,2)
      },
      handleClickChannel() {
        this.requestParamChannelId.ids = this.ids
        if (!this.ids.length ) {
          this.$toast('请选择尺码')
          return
        }
        this.isShowDialog1 = true
        this.requestParamChannelId.channelIdStr = this.$typeToStr(47,2)
      },
      checkedAll() {
        this.checkAll = !this.checkAll
        this.ids= []
        this.tableData.map(item => {
          if (this.checkAll) {
            this.ids.push(item.id)
          } else {
            this.delItem(item.id)
          }
        })
        this.tableData.forEach((obj) => (obj.checked = this.checkAll));
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      delItem(id) {
        for (let i = 0; i < this.ids.length; i++) {
          if (this.ids[i] === id) {
            this.ids.splice(i, 1)
          }
        }
      },
      goDetail(id) {
        this.$navigateTo('/pages/store/detail?id=' + id)
      },
      changeChecked(row) {
        row.checked = !row.checked
        this.tableData.map(item => {
          if (item.id === row.id) {
            if (item.checked) {
              this.ids.push(item.id)
            } else {
              this.delItem(item.id)
            }
          }
        })
        let idLength = this.ids.length
        if (idLength == this.totalCount){
          this.checkAll = true
        }else{
          this.checkAll = false
        }
      },
      getPage() {
        goodsInventoryApi.pageGoods(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            this.inventoryData = res.data.goodsInventoryPageVo ? res.data.goodsInventoryPageVo
                : this.inventoryData
            console.info(res.data.goodsInventoryPageVo)
            if (this.totalCount == 0) {
              this.emtityMsg = '暂无相关数据'
            } else {
              this.emtityMsg = '没有更多了'
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      }
    }
  };
</script>

<style>

  @import '@/assets/index/style.css';

  strong{
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
  .overview1 {
    padding-top: 5px;
    padding-right: 3px;
    padding-bottom: 0px;
    padding-left: 3px;
  }
  .overview2 {
    padding: 3px;
  }
  .store-list-1 {
    display: -webkit-box;
  }
  .store-list-1-view {
    border-radius: 10px;
    text-align: center;
    background-color: #EEF2F7;
    width: 21.5vw;
    color: #333;
    font-size: 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 0vw;
    margin-right: 2vw;
    margin-bottom: 0vw;
    margin-left: 1vw;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
  }
</style>
