<template>
  <view>
    <u-navbar title="红包" >
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <image class="back_icon_0" :src="fileUrl +'/static/img/back3.png'"></image>
      </view>
    </u-navbar>
    <view class="fenlei_top" style="display: flex;">
      <view style="width: 83vw" class="baisebeijing">
        <u--input
            class="searchInput"
            prefixIcon="search"
            placeholder="请输入姓名"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            v-model="queryParam.name"
            prefixIconStyle="font-size: 24px;color:#c0c4cc"
            :show-action="false"
            @change="search1"
            clearable
        >
        </u--input>
      </view>
      <view class="fenlei_top_right" @click="isShowDialog2 = true">
        <image v-if="queryParam.type || queryParam.label"  :src="fileUrl +'/static/img/search.png'"></image>
        <image v-else  :src="fileUrl +'/static/img/search_no.png'"></image>
      </view>
    </view>
    <view class="fenlei_top_1_1">
      <view class="store-list-1_1" >

        <view  class="store-list-1-li_1" v-for="(item,index) in headerData" :key="index">
          <view class="overview1">
            <p><strong> {{item.name}}</strong></p>
            <p>  {{item.num}}/{{item.price}}</p>
          </view>
        </view>

      </view>
    </view>

    <view>
      <u-popup :show="isShowDialog" @close="isShowDialog != isShowDialog" :duration="100" mode="bottom">
        <view style="width: 90vw;margin-left: 5vw;">
          <u-navbar :title="tabName" :fixed="false" :border="true">
            <view @click="isShowDialog = false" style="font-size: 15px;" class="u-nav-slot" slot="left">
              <text>关闭</text>
            </view>
            <view @click="confirmHandle" class="u-nav-slot" style="font-size: 15px;" slot="right">
              <text>确定</text>
            </view>
          </u-navbar>
          <view>
            <u--form>
              <u-form-item label-width="25vw" label="姓名" borderBottom>
                <u--input  disabledColor="#fff" inputAlign="right"
                           v-model="requestParam.name" border="none" color="#333333"></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label-width="25vw" label="金额" borderBottom>
                <u--input  disabledColor="#fff" inputAlign="right"
                           v-model="requestParam.price" border="none" type="digit" color="#333333"></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label="类型" borderBottom @click="show_sx_type = true; $hideKeyboard()">
                <u--input inputAlign="right" placeholder="请选择类型" disabledColor="#fff"
                          placeholderStyle="font-size: 14px;color:#c0c4cc"
                          v-model="requestParam.typeStr" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label="关系" borderBottom @click="show_sx_label = true; $hideKeyboard()">
                <u--input inputAlign="right" placeholder="请选择关系" disabledColor="#fff"
                          placeholderStyle="font-size: 14px;color:#c0c4cc"
                          v-model="requestParam.labelStr" border="none" disabled></u--input>
                <u-icon class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
              </u-form-item>
            </u--form>
          </view>
        </view>
      </u-popup>
    </view>
    <u-picker :show="show_sx_type" :columns="columns" @cancel="show_sx_type= false"
              @confirm="confirm_sx_type" keyName="fieldName"></u-picker>
    <u-picker :show="show_sx_label" :columns="columnsLabel" @cancel="show_sx_label= false"
              @confirm="confirm_sx_label" keyName="fieldName"></u-picker>

    <view @touchmove.stop.prevent="preventHandler">
      <u-popup :show="isShowDialog2" @close="isShowDialog2 = !isShowDialog2"  :duration="100" mode="right">
        <view  style="height: 90vh;">
          <scroll-view  scroll-y="true"  class="saixuanquyu">
            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  类型
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in typeList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.type = item.fieldValue;search1();">
                    <text :class="queryParam.type == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  关系
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in labelList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.label = item.fieldValue;search1();">
                    <text :class="queryParam.label == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>
          </scroll-view >
          <view class="baisebeijing shuipingjuzhong" style="position:fixed;bottom:0;width: 80vw;">
            <u-button style="width: 20vw; margin: 5px" @click=" isShowDialog2 = false;resetHandle()">
              <text style=" font-size: 15px;">重置</text>
            </u-button>
            <u-button style="width: 50vw; margin: 5px" type="primary" @click="search2">
              <text style=" font-size: 15px;">
                确定（{{totalCount}} 条记录）
              </text>
            </u-button>
          </view>
        </view>
      </u-popup>
    </view>

    <view  class="hongbaoquyu">
      <view  class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <view class="dingdans_top">
          <view class="dingdans_top_left" style="     display: flex;
    justify-content: space-between;
    align-items: center;">
            <view style="width: 15vw">
              <strong> {{item.name}} </strong>
            </view>
            <view  style="width: 15vw">
              <strong style="margin-left: 10px"> {{item.price}} </strong>
            </view>
            <view  style="width: 15vw">
              <strong style="margin-left: 10px"> {{item.type | dictToDescTypeValue(41)}} </strong>
            </view>
            <view  style="width: 30vw">
              <strong style="margin-left: 10px"> {{item.label | dictToDescTypeValue(42)}} </strong>
            </view>
            <view  style="width: 8vw; text-align: center">
              <text class="dw-button-common"@click="tabName='新增';handleClick(item);">修改</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-show="tableData.length" style="    padding: 30px;" class="meiyougengduo">
      <u-loadmore fontSize="18"  color="#a6a6a6" nomoreText="最硬球鞋"  loadingText="最硬球鞋" status="nomore"/>
    </view>
    <u-empty
        v-if="!tableData.length && !isLoading"
        mode="list"
        marginTop="50"
        textSize="16"
        textColor="#8a8a8a"
        :icon="fileUrl +'/static/operateSteps/empity_7.png'">
    </u-empty>
    <view>
      <uni-fab ref="fab" :pattern="pattern"  horizontal="right" @fabClick="tabName='新增'; handleClick1();" />
    </view>
  </view>
</template>
<script>
  import { giftApi } from '@/api/gift'
  export default {
 data() {
      return {
        fileUrl: this.$fileUrl,
        tabName: '修改',
        isShowDialog: false,
        isShowDialog2: false,
        queryParam: {
          name: '',
          type: '',
          label: '',
          priceFrom: '',
          priceTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          pageSize: 100,
          pageNum: 1
        },
        columns: [],
        columnsLabel: [],
        show_sx_type: false,
        show_sx_label: false,
        requestParam: {
          id: '',
          name: '',
          price: '',
          typeIndex: [0],
          labelIndex: [0],
          type: 1,
          typeStr: '满月',
          label: 1,
          labelStr: '',
        },
        typeList: [],
        labelList: [],
        tableData: [],
        isLoading: false,
        headerData: [],
        totalCount: 1,
        pattern: {
          color: '#7A7E83',
          backgroundColor: '#fff',
          selectedColor: '#409eff',
          buttonColor: '#409eff',
          iconColor: '#fff'
        },
      }
    },
    onPullDownRefresh() {
      this.resetHandle()
      uni.stopPullDownRefresh()
    },
    mounted() {
      this.getPage()
      this.listSysDict()
    },
    methods: {
      confirm_sx_type(e) {
        this.show_sx_type = false
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.requestParam.type = fieldValue
        this.requestParam.typeStr = fieldName
      },
      preventHandler() {
        return
      },
      confirm_sx_label(e) {
        this.show_sx_label = false
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.requestParam.label = fieldValue
        this.requestParam.labelStr = fieldName
      },
      handleClick(orderData) {
        this.requestParam.id = orderData.id
        this.requestParam.name = orderData.name
        this.requestParam.price = orderData.price
        this.requestParam.type = orderData.type
        this.requestParam.label = orderData.label
        for (let i = 0; i < this.labelList.length; i++) {
          if(orderData.label == this.labelList[i].fieldValue){
            this.requestParam.labelStr =  this.labelList[i].fieldName
            this.requestParam.labelIndex = [i]
          }
        }
        for (let i = 0; i < this.typeList.length; i++) {
          if(orderData.type == this.typeList[i].fieldValue){
            this.requestParam.typeStr =  this.typeList[i].fieldName
            this.requestParam.typeIndex = [i]
          }
        }
        this.isShowDialog = true
      },
      handleClick1() {
        this.requestParam = {
          id: '',
          name: '',
          price: '',
          typeIndex: [0],
          labelIndex: [0],
          type: 1,
          typeStr: '满月',
          label: 1,
          labelStr: '',
        },
        this.isShowDialog = true
      },
      confirmHandle() {
        if(!this.requestParam.name) {
          this.$toast('请输入姓名')
          return
        }
        if(!this.requestParam.price) {
          this.$toast('请输入价格')
          return
        }
        if(!this.requestParam.type) {
          this.$toast('请选择类型')
          return
        }
        if(!this.requestParam.label) {
          this.$toast('请选择关系')
          return
        }
        if (this.requestParam.id) {
          giftApi.update(this.requestParam).then(res => {
            this.$toast(res.subMsg)
            if (res.subCode === 1000) {
              this.resetHandle()
              this.isShowDialog = false
            }
          })
        } else {
          giftApi.add(this.requestParam).then(res => {
            this.$toast(res.subMsg)
            if (res.subCode === 1000) {
              this.resetHandle()
              this.isShowDialog = false
            }
          })
        }
      },
      getPage() {
        giftApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
          } else {
            this.$toast(res.subMsg)
          }
        })
        giftApi.data().then(res => {
          if (res.subCode === 1000) {
            this.headerData = res.data
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.typeList = sysDictList.filter(item => item.typeValue == 41)
        this.columns.push(this.typeList)
        this.labelList = sysDictList.filter(item => item.typeValue == 42)
        this.columnsLabel.push(this.labelList)
      },
      search() {
        if (!this.queryParam.name ) {
          this.$toast('请输入姓名')
          return
        }
        this.queryParam.pageNum = 1
        this.getPage()
      },
      search1() {
        this.queryParam.pageNum = 1
        this.getPage()
      },
      search2() {
        this.queryParam.pageNum = 1
        this.isShowDialog2 = false
        this.getPage()
      },
      resetHandle() {
        this.queryParam = {
          name: '',
          type: '',
          label: '',
          priceFrom: '',
          priceTo: '',
          updateTimeFrom: '',
          updateTimeTo: '',
          pageSize: 100,
          pageNum: 1
        }
        this.titleName = '红包'
        this.search1()
      },
    }
  };
</script>

<style>

  @import '@/assets/index/style.css';
  .dingdans_item {
    padding: 2.4vw 1.2vw;
    background: #ffffff;
    border-bottom: 1vw solid #eee;
    padding-right: 3%;
    padding-left: 3%;
  }

  .dingdans_top {
    font-size: 3.68vw;
    height: 3.88vw;
    line-height: 3.88vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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

  .fenlei_top_1_1 {
    border-bottom: 1vw solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    width: 100vw;
    background: #fff;
    position: fixed;
    top: 88px;
    left: 0;
    z-index: 99;
  }
  .store-list-1_1 {
    margin-left: 2vw;
    display: flex;
    flex-wrap: wrap;
  }
  .store-list-1-li_1{
    border-radius: 10px;
    text-align: center;
    background-color: #EEF2F7;
    color: #333;
    font-size: 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 2px;
    margin-right: 6px;
    margin-bottom: 5px;
    margin-left: 4px;
    width: 75px;
  }
  .overview1 {
    padding-top: 5px;
    padding-right: 3px;
    padding-bottom: 1px;
    padding-left: 3px;
  }

  .fab-circle-icon {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    font-weight: 200;
    margin-bottom: 12px;
  }
</style>
