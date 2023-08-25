<template>
  <view class="hello">
    <u-navbar
        :title="titleName"
    >
      <view
          @click="$goBack"
          class="u-nav-slot"
          slot="left"
      >
        <u-icon
            name="arrow-left"
            size="20"
        ></u-icon>
      </view>
    </u-navbar>

    <view class="fenlei_top zuoyouduiqi">
      <view class="fenlei_top_left">
        <view @click="showFrom= true">
          <u--input
              style="width: 43vw;"
              class="searchInput"
              readonly="readonly"
              prefixIcon="calendar"
              prefixIconStyle="font-size: 20px;color:#c0c4cc"
              placeholder="开始时间"
              placeholderStyle="font-size: 15px;color:#c0c4cc"
              v-model="queryParam.createTimeFrom"
              clearable
          >
          </u--input>
        </view>
      </view>
      <view>
        <image  class="hengtupianbaobiao" :src="fileUrl +'/static/img/heng.png'"></image>
      </view>
      <view class="fenlei_top_left">
        <view @click="showTo= true">
          <u--input
              placeholderStyle="font-size: 15px;color:#c0c4cc"
              style="width: 43vw;margin-left: 4px;"
              class="searchInput"
              readonly="readonly"
              prefixIcon="calendar"
              placeholder="结束时间"
              v-model="queryParam.createTimeTo"
              prefixIconStyle="font-size: 20px;color:#c0c4cc"
              clearable
          >
          </u--input>
        </view>
      </view>
    </view>
    <u-datetime-picker
        title="开始时间"
        :show="showFrom"
        v-model="dateCurrent"
        mode="year-month"
        :minDate="1646064000000"
        @confirm="confirmFrom"
        @cancel="cancelFrom"
    ></u-datetime-picker>
    <u-datetime-picker
        title="结束时间"
        :show="showTo"
        v-model="dateCurrent"
        mode="year-month"
        :minDate="1646064000000"
        @confirm="confirmTo"
        @cancel="cancelTo"
    ></u-datetime-picker>
    <!--    列表开始-->

    <view style="padding-top:  44px;">
      <view class="dingdans_item" v-for="(item,index) in tableData" :key="index">
        <view v-if="item.actNo == '合计'"  style="    height: 50px;
    padding-top: 20px;">
          <view class="dingdans_top" >
            <view class="dingdans_top_left" style="    padding-left: 5px;
    font-size: 15px;">
              <p>
                <text>合计入库 ：</text> <strong>{{item.oldInventory}}</strong>
                <!--               <text  style="margin-left: 20px">合计入库金额 ：</text> <strong>{{item.inventoryAmount}}</strong>-->
              </p>
              <p style="margin-top: 5px">
                <text>合计入库金额 ：</text> <strong>{{item.inventoryAmount}}</strong>
                <text
                    class="color-url"
                    style="margin-left: 40px;"
                    type="primary"
                    size="small"
                    @click="jumpDetail(months )">查看库存
                </text>
              </p>
            </view>
          </view>
        </view>
        <view v-else>

          <view class="dingdans_con_dw">
            <view  class="dingdans_con_left_dw"
                 @click="avatarShow(item.img)">
              <image :src="item.img" mode="widthFix"></image>
            </view>
            <view class="diangdans_con_right_dw">
              <view class="dingdans_con_right_top_dw" @click="goodsDetail(item.goodsId)">
              <text class="chaochu"  style="width: 65vw">
                {{item.goodsName }}
              </text>
              </view>
              <view class="dingdans_con_right_top_dw_11 zuoyouduiqi" >
                <view class="jiagejiage">
                  <text>
                     入库价
                  </text>
                  <text  class="color-danger" >{{item.price}} </text>
                  <text>
                  入库总额
                  </text>
                  <text  class="color-danger" >{{item.inventoryAmount}} </text>
                  <text>
                  得物价
                  </text>
                  <text  class="color-danger" >{{item.dwPrice}} </text>
                </view>
              </view>

              <view class="dingdans_con_right_top_dw_1 zuoyouduiqi">
                <view class="xianglian">
                   <text @click="warehouseDetail(item.goodsId ,item.actNo ,item.img )">
              {{item.actNo}}
              </text>
                  <image @click.stop="$copyUrl(item.actNo)" class="fuzhitupian"
                         :src="fileUrl +'/static/img/copy.png'"></image>
                </view>
                <view class="jiagejiage">
                  <text style="font-weight: 400">尺码</text>
                  <text >{{item.size}} </text>
                </view>
              </view>
              <view class="dingdans_con_right_top_dw_1 zuoyouduiqi" style="font-weight: 400;margin-top: -5px;">
                <view class="jiagejiage">
                  库存
                  <text  class="color-danger" >{{item.inventory}} </text>
                  <text style="color: #7a7a7a;" >/{{item.oldInventory }} </text>
                </view>
                <view class="jiagejiage">
                  交易成功
                  <text>{{item.successCount}} </text>
                  ，上架
                  <text  >{{item.galleryCount }} </text>
                </view>
              </view>
            </view>
          </view>
          <view class="dingdans_bottom_dw">
            <view class="dingdans_top_left_dw jiagejiage">
              <text>
                预计利润
              </text>
              <text  class="color-danger" >
                {{item.dwPrice | getProfits(item.price)}}
              </text>
            </view>
            <!--          操作栏-->
            <view class="dingdans_top_right_dw">
              <text> {{item.createTime |formateTime }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--    列表结束-->
    <view v-show="tableData.length" class="meiyougengduo">
      <u-loadmore fontSize="18"  color="#a6a6a6" nomoreText="最硬球鞋"  loadingText="最硬球鞋" status="nomore"/>
    </view>
    <u-empty
        v-if="!tableData.length"
        mode="list"
        marginTop="50"
        textSize="16"
        textColor="#8a8a8a"
        :icon="fileUrl +'/static/operateSteps/empity_7.png'">
    </u-empty>
    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="imageZoom" mode="widthFix" class="showImg"></image>
      </view>
    </view>
  </view>
</template>
<script>

  export default {
 data() {
      return {
        fileUrl: this.$fileUrl,
        dateCurrent: parseInt(new Date().getTime()),
        showFrom: false,
        showTo: false,
        allLoaded: false,
        emtityMsg: '没有更多了',
        titleName: '入库报表',
        pictureZoomShow: false,
        imageZoom: false,
        queryParam: {
          createTimeFrom: '',
          createTimeTo: ''
        },
        tableData: [],
      }
    },
    onLoad(options) {
      if (options) {
        this.months = options.months ? options.months : '';
        if (this.months) {
          this.titleName = this.months + ' ' + this.titleName
          this.queryParam.createTimeFrom = this.months
          this.queryParam.createTimeTo = this.months
          this.getPage()
        }
      }
    },
    methods: {
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      cancelFrom() {
        this.showFrom = false;
        this.queryParam.createTimeFrom = '';
        this.getPage()
      },
      cancelTo() {
        this.showTo = false;
        this.queryParam.createTimeTo = '';
        this.getPage()
      },
      confirmFrom(e) {
        this.showFrom = false;
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm');
        this.queryParam.createTimeFrom = timeValue;
        this.getPage()
      },
      confirmTo(e) {
        this.showTo = false;
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm');
        this.queryParam.createTimeTo = timeValue;
        this.getPage()
      },
      jumpDetail(months) {
        this.$navigateTo('/pages/store/index?months=' + months)
      },
      warehouseDetail(goodsId , actNo,img) {
        this.$navigateTo('/subPages/pages/store/warehouseDetail?goodsId=' + goodsId +'&actNo=' +actNo +'&img=' +img)
      },
      goodsDetail(id) {
        if (!id) {
          return
        }
        let url = '/subPages/pages/goodsBase/detail?id=' + id
        this.$navigateTo(url)
      },
      getPage() {
        this.allLoaded = false;
        this.$request({
          url: '/gw/op/v1/report/putInStorageDayDetail',
          method: 'get',
          data: this.queryParam
        }).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data : [];
            if (this.tableData.length == 0) {
              this.emtityMsg = '暂无相关数据';
              this.allLoaded = true
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

<style lang="less" scoped>
  @import '@/assets/index/rt_style.less';
  @import '@/assets/index/style.css';
</style>
