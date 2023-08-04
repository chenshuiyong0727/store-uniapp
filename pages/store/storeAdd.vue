<template lang="html">
  <view class="login">
    <!--    <v-header>-->
    <!--      <h1 slot="title">商品详情</h1>-->
    <!--    </v-header>-->
<!--    <mt-header title="库存添加">-->
<!--      <view slot="left">-->
<!--        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>-->
<!--      </view>-->
<!--      <view slot="right">-->
<!--        <mt-button size="normal" style="font-size: 16px"  @click="goAdd">保存</mt-button>-->
<!--      </view>-->
<!--    </mt-header>-->

    <u-navbar title="库存添加">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
<!--      <view class="u-nav-slot" style="font-size: 15px;" slot="right">-->
<!--        <rudon-rowMenuDotDotDot :localdata="options" @change="menuAction($event)">-->
<!--          <image style="height: 25px;width: 25px" src="../../static/img/slh.png"></image>-->
<!--        </rudon-rowMenuDotDotDot>-->
<!--      </view>-->
      <view  @click="goAdd" class="u-nav-slot" slot="right" style="font-size: 15px;">
        提交
      </view>
    </u-navbar>
    <view class="dingdans_item" style="margin-top: 50px; margin-bottom: 7px; border-bottom:0px ;padding:0" >
      <view class="dingdans_con" style="padding:0">
        <view style="  width: 210px;
  height: 84px;
  position: relative;
  border-radius: 5px;" >
          <image mode="widthFix"    @click="avatarShow(form.img)" style="  width: 80%;
  margin-top: 16px;
  margin-left: 10%;" :src="form.img"  ></image>
        </view>
        <view class="diangdans_con_right" style="font-size: 16px;    width: 130vw;
    padding-left: 5px;
    margin-right: 10px;">
          <view class="dingdans_con_right_top">
            <text>
              <strong v-if="form.id"
                      @click="goodsDetail(form.id) "
                      style="  color: #333333;font-size: 14px;">
                {{form.name }}
              </strong>
            </text>
            <view style="margin-top: 7px; font-size: 15px;color: #666" class="xianglian">
              <text @click="jumpactNo(form.actNo)">
              {{form.actNo}}
              </text>
              <image @click="$copyUrl(form.actNo)" class="fuzhitupian"
                     src="../../static/img/copy.png"></image>
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
             :class="activeIndex.includes(index) ? 'cityActive' : 'city'"
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
<!--        <el-table1 style="margin-top: 20px" border :data="tableData">-->
<!--          &lt;!&ndash;          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>&ndash;&gt;-->
<!--          <el-table-column align="center" prop="size" width="50" label="尺码"/>-->
<!--          <el-table-column align="center" prop="inventory" width="70" label="库存">-->
<!--            <template scope="scope">-->
<!--              <view class="input-box">-->
<!--                <input class="elInput1" type="number" v-model="scope.row.inventory"></input>-->
<!--              </view>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="price"  width="80"  label="进价">-->
<!--            <template scope="scope">-->
<!--              <view class="input-box">-->
<!--                <input class="elInput1"  type="number" v-model="scope.row.price"></input>-->
<!--              </view>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="dwPrice"    label="售价">-->
<!--            <template scope="scope">-->
<!--              <view class="input-box">-->
<!--                <input class="elInput1" type="number"  v-model="scope.row.dwPrice"></input>-->
<!--              </view>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="channelId"  width="80"  label="渠道">-->
<!--            <template scope="scope">-->
<!--              <view class="input-box">-->
<!--                <select class="select" v-model="scope.row.channelId">-->
<!--                  <option label="渠道"  value=""></option>-->
<!--                  <option-->
<!--                      v-for="item in channelIdList"-->
<!--                      :key="item.fieldValue"-->
<!--                      :label="item.fieldName"-->
<!--                      :value="item.fieldValue">-->
<!--                  </option>-->
<!--                </select>-->
<!--                &lt;!&ndash;                <input class="elInput1" type="number"  v-model="scope.row.dwPrice"></input>&ndash;&gt;-->
<!--              </view>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column fixed="right" align="center" label="操作" width="55">-->
<!--            <template scope="scope">-->
<!--              <el-button type="text" @click="changeStatusDialog1(scope.row.sizeIndex,scope.row)">详情-->
<!--              </el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table1>-->
        <uni-table
            :style="tableData.length?'padding-bottom: 25vw;':''"
            ref="table"
            border
            stripe
            emptyText="暂无更多数据">
          <uni-tr>
            <uni-th width="50" align="center">尺码</uni-th>
            <uni-th width="70" align="center">库存</uni-th>
            <uni-th width="80" align="center">进价</uni-th>
            <uni-th width="80" align="center">售价</uni-th>
            <uni-th width="70" align="center">渠道</uni-th>
          </uni-tr>
          <uni-tr v-for="(item, index) in tableData" :key="index">
            <uni-td>
              <text class="color-url" @click="changeStatusDialog1(index,item)">
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
<!--                <picker @change="bindPickerChange" :value="item.channelId" :range="channelIdList" range-key="name">-->
<!--                  <view class="uni-input">{{channelIdList[index].name}}</view>-->
<!--                </picker>-->
<!--                <picker @change="bindPickerChange(item)" :value="item.channelId" :range="channelIdList" range-key="fieldName">-->
<!--                  <view class="uni-input">{{channelIdList[item.channelId].fieldName}}</view>-->
<!--                </picker>-->
                <uni-data-select
                    v-model="item.channelId"
                    :localdata="range"
                    :clear="false"
                    @change="change"
                ></uni-data-select>
              </view>
            </uni-td>
          </uni-tr>
        </uni-table>
      </view>
    </view>
<!--    <mt-popup-->
<!--        v-model="isShowDialog1">-->
<!--      <mt-header title="查看详情">-->
<!--        <view slot="right">-->
<!--          <mt-button size="normal"  @click="isShowDialog1 = false" style="font-size: 15px">关闭</mt-button>-->
<!--        </view>-->
<!--        <view slot="left">-->
<!--          <mt-button size="normal" @click="goDel" style="font-size: 16px">移除</mt-button>-->
<!--        </view>-->
<!--      </mt-header>-->
<!--      <section style="height: 90vw;width: 80vw">-->
<!--        <mt-field label="尺码" style="margin-top: 11vw;"  v-model="orderData1.size" :disabled="true"></mt-field>-->
<!--        <mt-field label="仓库">-->
<!--            <select size="small" class="select80_select" :disabled="true" v-model="orderData1.channelId"  >-->
<!--          <o 80vn :disabled="true" value="" selected>渠道</option>-->
<!--          <option-->
<!--              v-for="item in channelIdList"-->
<!--              :key="item.fieldValue"-->
<!--              :label="item.fieldName"-->
<!--              :value="+item.fieldValue">-->
<!--          </option>-->
<!--            </select>-->
<!--        </mt-field>-->
<!--        <mt-field label="库存" v-model="orderData1.inventory" :disabled="true"></mt-field>-->
<!--        <mt-field label="进价" v-model="orderData1.price" :disabled="true"></mt-field>-->
<!--        <mt-field label="售价" v-model="orderData1.dwPrice" :disabled="true"></mt-field>-->
<!--        <mt-field label="手续费" :disabled="true" v-model="orderData1.poundage"></mt-field>-->
<!--        <mt-field label="到手价" :disabled="true" v-model="orderData1.theirPrice"></mt-field>-->
<!--        <mt-field label="利润" :disabled="true" v-model="orderData1.profits"></mt-field>-->
<!--      </section>-->
<!--    </mt-popup>-->
    <!--    <view style="    margin-left: 20vw;-->
    <!--    margin-top: 20px;">-->
    <!--      <el-button style="bottom: 10px"-->
    <!--        type="primary"-->
    <!--                 size="small"-->
    <!--        @click="goAdd">提交</el-button>-->
    <!--      <el-button style="bottom: 10px"-->
    <!--                 size="small"-->
    <!--                 @click="$router.go(-1)">取消</el-button>-->
    <!--      <el-button style="bottom: 10px"-->
    <!--        type="primary"-->
    <!--                 size="small"-->
    <!--                 @click="gotoIndex">回到首页</el-button>-->
    <!--    </view>-->
    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="imageZoom" mode="widthFix"  class="showImg"></image>
      </view>
    </view>
  </view>
</template>

<script>
  import { goodsBaseApi } from '@/api/goodsBase'
  import { goodsInventoryApi } from '@/api/goodsInventory'
  export default {
    data(){
      return {
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
    // created() {
    //   const { goodsId } = this.$route.query
    //   this.goodsId = goodsId
    //   this.form.goodsId = goodsId
    //   if (this.goodsId) {
    //     this.getDetailById(this.goodsId)
    //   }
    // },
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
      change(e) {
        console.log("e:", e);
      },
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.channelIdList = sysDictList.filter(item => item.typeValue == 47)
      },
      changeStatusDialog1(index,row) {
        this.inventoryIndex = index
        this.orderData1 = row
        console.info(row)
        console.info(index)
        if (this.orderData1.dwPrice)  {
          let poundage = this.orderData1.dwPrice * 0.075 + 38 + 8.5
          this.orderData1.poundage = parseFloat(poundage).toFixed(2)

          let theirPrice =  this.orderData1.dwPrice
              - (this.orderData1.dwPrice * 0.075 + 38 + 8.5)
          this.orderData1.theirPrice = parseFloat(theirPrice).toFixed(2)
        }
        if (this.orderData1.theirPrice && this.orderData1.price)  {
          let profits = this.orderData1.theirPrice - 10
              - this.orderData1.price
          this.orderData1.profits = parseFloat(profits).toFixed(2)
        }
        this.isShowDialog1 = true
        console.info(this.orderData1)
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
        debugger
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
      // goodsDetail(id, flag) {
      //   this.$router.push({ path: '/goodsDetail', query: { id, flag } })
      // },
      goodsDetail(id) {
        debugger
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
          // this.$forceUpdate()
        } else {
          this.del(index)
          this.delItem(item)
        }
        console.info(this.tableData)
      },
      goDetail(item) {
        console.info(item)
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
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
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
