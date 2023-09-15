<template lang="html">
  <view class="login">
    <u-navbar title="选择尺码">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
<!--      <view  @click="goAdd" class="u-nav-slot" slot="right" style="font-size: 15px;">-->
<!--        提交-->
<!--      </view>-->
    </u-navbar>
    <u-popup :show="isShowDialog2" @close="isShowDialog2 = !isShowDialog2" :duration="100" :closeable="true" mode="center">
      <view style=" width: 80vw;padding-top: 37px">
        <view style="padding: 2vw 4vw;">
          <view style=" display: flex;flex-wrap: wrap;">
            <view v-for="(item,index) in typeList"
                  :key="index"
                  class="typebutton-pop">
              <u-button color="#f4f3f8" size="small" @click="chooseType(item)">
                <text :class="queryParam.type == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
              </u-button>
            </view>
          </view>
        </view>
        <view>
          <u--input
              style=" margin-top: 3vw;   margin-left: 5vw;width: 70vw"
              class="saixuanInput"
              placeholder="请输入尺码"
              placeholderStyle="font-size: 14px;color:#c0c4cc"
              v-model="handelSize"
              clearable
          >
          </u--input>
        </view>
        <view style=" margin: 5vw 0;    display: flex;justify-content: center;">
          <u-button style="width: 30vw;" type="primary" @click="addOrUpdateSize">
            <text style=" font-size: 15px;">
              添加
            </text>
          </u-button>
        </view>
      </view>
    </u-popup>
    <view style="margin-top: 50px;" class="baisebeijing">
      <view class="width92 zuoyouduiqi" style="border-bottom: 1px solid #eee;padding: 3vw 0;">
        <view class="xianglian">
          <text class="color-font">已选尺码</text>
          <text class="color-danger" v-if="queryParam.sizeVoList && activeIndex.length != queryParam.sizeVoList.length" style="font-size: 13px;margin-left: 2vw">深色按钮为已选</text>
        </view>
       <view>
         <text class="dw-button-common"  @click="isShowDialog2 = !isShowDialog2">手动添加</text>
       </view>
      </view>
      <view style="
        margin-bottom: 7px;
    font-size: 10px;
    padding-top: 3.4vw;
    padding-left: 3vw;
    background: #ffffff;" >
        <view >

          <view v-if="!queryParam.sizeVoList || !queryParam.sizeVoList.length" style="padding-bottom: 3vw;font-size: 16px;text-align: center;" class="color-danger">
            <text>
              请选择尺码
            </text>
          </view>
          <view v-else style="text-align: center" @click="addSizeHandle(item, index)"
                 :class="activeIndex.includes(index) ? 'city cityActive' : 'city'"
                 v-for="(item, index) in queryParam.sizeVoList" :key="item.id">
            <text>
              {{item.size}}
            </text>
          </view>
        </view>
      </view>
    </view>

    <view style="margin-top: 7px;" class="baisebeijing">
      <view class="width92 " style="border-bottom: 1px solid #eee;padding: 3vw 0;">
        <text class="color-font">选择商品类型</text>
      </view>
      <view style="padding: 3vw 0;">
        <view class="width92 saixuanxuanzhefuji">
          <view v-for="(item,index) in typeList"
                :key="index"
                class="typebutton">
            <u-button color="#f4f3f8" size="small" @click="chooseType(item)">
              <text :class="queryParam.type == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
            </u-button>
          </view>
        </view>
      </view>
    </view>

    <view style="margin-top: 7px;" class="baisebeijing">
      <view class="width92 zuoyouduiqi" style="border-bottom: 1px solid #eee;padding: 3vw 0;">
        <text class="color-font">{{typeName}}-尺码</text>
        <text class="dw-button-common" v-if="!allChoose"   @click="chooseAll">全选</text>
      </view>
      <view style="padding: 3vw 0;">
        <view class="width92 saixuanxuanzhefuji">
          <view v-for="(item,index) in goodsTypeSizeList"
                :key="index"
                class="sizebutton">
            <u-button color="#f4f3f8" size="small" :disabled="tableDataId.includes(item.id)" @click="chooseSizeNew(item)">
              <text :class="tableDataId.includes(item.id)  ? 'xuanzhongziti' : 'putongziti'">{{item.size}}</text>
            </u-button>
          </view>
        </view>
      </view>
    </view>
    <view style="height: 70px"></view>
    <view class="baisebeijing shuipingjuzhong" style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <u-button style="width: 50vw; margin: 10px 15px;" type="primary"  @click="confirmHandle">
        <text class="dibuanniuwenzi">确认选择</text>
      </u-button>
    </view>
  </view>
</template>

<script>
  import { goodsBaseApi } from '@/api/goodsBase'
  export default {
    data(){
      return {
        queryParam: {
          sizeVoList: [],
          type: '01'
        },
        handelSize:'',
        goodsTypeSizeList: [],
        goodsId: '',
        opType: 2,
        typeName: '',
        isShowDialog2: false,
        allChoose: false,
        activeIndex: [],
        tableData: [],
        tableDataId: [],
        typeList: [],
      }
    },
    onLoad(options) {
      if (options) {
        this.goodsId = options.goodsId ? options.goodsId : '';
        this.queryParam.type = options.type ? options.type : '01';
        if (this.goodsId) {
          this.opType = 2
          this.getDetailById(this.goodsId)
        }else{
          this.opType = 3
          this.typeName = this.$typeToStr(20221108,this.queryParam.type)
          let itemTypeData = {}
          itemTypeData.fieldName =  this.typeName
          itemTypeData.fieldValue = this.queryParam.type
          this.chooseType(itemTypeData)
        }
      }
    },
    mounted() {
      this.listSysDict()
    },
    methods:{
      addOrUpdateSize() {
        if (!this.handelSize) {
          this.$toast('请输入尺码')
          return
        }
        let rqData ={}
        rqData.size = this.handelSize
        rqData.type = this.queryParam.type
        goodsBaseApi.addOrUpdateSize(rqData).then(res => {
          this.$toast(res.subMsg);
          if (res.subCode === 1000) {
            let item = res.data
            this.queryParam.sizeVoList.push(item)
            this.addSizeHandle(item, this.activeIndex.length)
            this.isShowDialog2 = !this.isShowDialog2
            item.fieldValue = item.type
            item.fieldName = this.$typeToStr(20221108,item.type)
            this.chooseType(item)
            // setTimeout(() => {
            //   uni.reLaunch({
            //     url: '/pages/store/index',
            //   });
            // }, 1000)
          }
        })
      },
      confirmHandle() {
        this.queryParam.sizeList = this.tableDataId
        if (!this.queryParam.sizeList || !this.queryParam.sizeList.length) {
          this.$toast('请选择尺码')
          return
        }
        if (this.opType == 2){
          goodsBaseApi.update(this.queryParam).then(res => {
            if (res.subCode === 1000) {
              this.$toast('操作成功')
              uni.setStorageSync('goodsAddForm', null);
              setTimeout(() => {
                // this.$goBack()
                this.$navigateTo('/pages/goodsBase/index')
              }, 1000)
            } else {
              this.$toast(res.subMsg)
            }
          })
        } else {
          let sizeListStr = this.tableData.map(item => item.size);
          this.$navigateTo('/pages/goodsBase/goodsAdd?type=3&sizeList='+this.tableDataId+'&sizeListStr='+ sizeListStr)
        }
      },
      chooseAll() {
        for (let i = 0; i < this.goodsTypeSizeList.length; i++) {
          this.chooseSizeNew(this.goodsTypeSizeList[i])
        }
      },
      chooseSizeNew(item) {
        if (this.queryParam.sizeVoList && this.queryParam.sizeVoList.length &&  this.queryParam.sizeVoList.includes(item)) {
          this.addSizeHandle(item, this.activeIndex.length)
        }else{
          this.queryParam.sizeVoList.push(item)
          this.addSizeHandle(item, this.activeIndex.length)
        }
        this.getIsAllChoose()
      },
      chooseType( item) {
        this.queryParam.type = item.fieldValue
        this.typeName = item.fieldName
        let typedata = {}
        typedata.type =  item.fieldValue
        goodsBaseApi.listDropDownSizes(typedata).then(res => {
          if (res.subCode === 1000) {
            this.goodsTypeSizeList = res.data
          }
        })
      },
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)
      },
      getDetailById(id) {
        if (id) {
          goodsBaseApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.queryParam = res.data ? res.data : {}
              if (res.data.sizeVoList && res.data.sizeVoList.length){
                for (let i = 0; i < res.data.sizeVoList.length; i++) {
                  this.addSizeHandle(res.data.sizeVoList[i],i)
                }
              }else{
                this.queryParam.sizeVoList =[]
              }
              this.typeName = this.$typeToStr(20221108,this.queryParam.type)
              let itemTypeData = {}
              itemTypeData.fieldName =  this.typeName
              itemTypeData.fieldValue = this.queryParam.type
              this.chooseType(itemTypeData)
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      addSizeHandle(item, index = 0) {
        if (!this.activeIndex.includes(index)) {
          this.activeIndex.push(index)
          this.tableData.push(item)
          this.tableDataId.push(item.id)
        } else {
          this.del(index)
          this.delItem(item)
          this.delItemId(item)
        }
      },
      getIsAllChoose(){
        let idList = this.goodsTypeSizeList.map(item => item.id);
        this.allChoose = idList.every(item =>  this.tableDataId.includes(item));
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
      delItemId(item) {
        for (let i = 0; i < this.tableDataId.length; i++) {
          if (this.tableDataId[i] == item.id) {
            this.tableDataId.splice(i, 1)
          }
        }
      },

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
 .typebutton{
   margin: 1vw 1vw;width: 28.5vw;
 }
 .typebutton-pop{
   margin: 1vw 1vw;width: 22vw;
 }
 .sizebutton{
   margin: 1vw 1vw;width: 21vw;
 }

</style>
