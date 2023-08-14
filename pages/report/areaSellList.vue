<template>
  <view class="hello">
    <u-navbar
        bgColor="#f3f2f8"
        title="入库渠道报表"
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

<!--    <view class="fenlei_top zuoyouduiqi">-->
<!--      <view>-->
<!--        <uni-data-select-->
<!--            v-model="queryParam.addressId"-->
<!--            :localdata="addressList"-->
<!--            :clear="false"-->
<!--        ></uni-data-select>-->
<!--      </view>-->
<!--    </view>-->
    <view class="xuanzhequyu">
      <view class="width80 zuoyouduiqi">
        <view style="padding: 10px 0;" @click="isShowSort = !isShowSort ;">
          <text style="font-size: 16px;font-weight: 600" :class="sortName != '请选择地址' ? 'color-url': ''">{{ sortName}}</text>
          <image v-if="!isShowSort && sortName == '请选择地址'" class="paixutupianxuanz" src="../../static/img/tab_down.png"></image>
          <image v-if="!isShowSort && sortName != '请选择地址'" class="paixutupianxuanz" src="../../static/img/tab_down_url.png"></image>
          <image v-if="isShowSort && sortName != '请选择地址'" class="paixutupianxuanz" src="../../static/img/tab_up_url.png"></image>
          <image v-if="isShowSort && sortName == '请选择地址'" class="paixutupianxuanz" src="../../static/img/tab_up.png"></image>
        </view>
<!--        <view-->
<!--            v-if="queryParam.size-->
<!--                   || queryParam.createTimeFrom-->
<!--                   || queryParam.createTimeTo-->
<!--                   || queryParam.inventory != 1-->
<!--                   || queryParam.warehouseId-->
<!--                   || queryParam.channelId-->
<!--                   || queryParam.today-->
<!--                   || queryParam.goodType-->
<!--                    "-->
<!--            @click="isShowDialog2 = !isShowDialog2; isShowSort= false;">-->
<!--          <text class="color-url">筛选</text>-->
<!--          <image  class="shaixuantupian" src="../../static/img/search.png"></image>-->
<!--        </view>-->
        <view v-if="sortName!='请选择地址'" @click="reset">
          <text style="font-size: 16px;">重置</text>
        </view>
      </view>
    </view>
    <view></view>
    <view  @touchmove.stop.prevent="moveHandle" @click="isShowSort = !isShowSort"  v-if="isShowSort" class="mask">
    </view>
    <view class="paixudiv" v-if="isShowSort" style="    margin-top: 59px;height: 39vh;">
      <scroll-view   scroll-y="true"  class="width92" style="height: 100%">
        <view v-for="(item,index) in addressList"
              :key="index"
              class="paixuliebiao"
              :style="addressList.length==(index+1) ? 'border-bottom: 0px' : ''"
              @click="chooseSort(item)"
        >
          <text :class="sortName == item.fieldName ? 'color-url': ''">{{item.fieldName}}</text>
        </view>
      </scroll-view>
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
       title="结束时间"c
                :show="showTo"
        v-model="dateCurrent"
        mode="year-month"
        :minDate="1646064000000"
        @confirm="confirmTo"
        @cancel="cancelTo"
    ></u-datetime-picker>
    <!--    列表开始-->

    <view style="    padding-top: 61px;">
      <view   @click="jumpDetail(item.months )" class="dingdans_item_rt" v-for="(item,index) in tableData" :key="index">
        <view class="dingdans_top_rt">
          <strong style="margin-left: 12px;" v-if="item.months != '合计'">{{ item.months | dictToDescTypeValue(38) }}</strong>
          <strong style="margin-left: 12px;" v-else>{{ item.months }}</strong>
        </view>
        <view class="dingdans_con_rt">
          <view style="width: 33vw">
            <strong>
              {{item.successNum}}
            </strong>
            <p>销售数</p>
          </view>
          <view style="width: 33vw">
            <strong>
              {{item.orderAmount}}
            </strong>
            <p>销售金额</p>
          </view>
          <view style="width: 33vw;   border-right-width: 0vw;">
            <strong>
              {{item.profitsAmount}}
            </strong>
            <p>利润</p>
          </view>
        </view>
        <view class="dingdans_con_rt">
          <view>
            <strong v-if="item.successNum">
              {{item.orderAmount / item.successNum | numFilter}}
            </strong>
            <strong v-else>
              0
            </strong>
            <p>销售均价</p>
          </view>
          <view>
            <strong v-if="item.successNum">
              {{item.profitsAmount / item.successNum | numFilter}}
            </strong>
            <strong v-else>
              0
            </strong>
            <p>平均利润</p>
          </view>
          <view>
            <strong>
              {{item.defectsNum}}
            </strong>
            <p>瑕疵数</p>
          </view>
          <view style="border-right-width: 0vw;">
            <strong v-if="item.defectsNum">
              {{item.defectsNum /  (item.successNum +  item.defectsNum) * 100   | numFilter}} %
            </strong>
            <strong v-else>
              0
            </strong>
            <p>瑕疵比例</p>
          </view>
        </view>
      </view>
    </view>

<!--    <view1 style="    padding-top: 44px;">-->
<!--      <view  class="dingdans_item_rt" v-for="(item,index) in tableData" :key="index">-->
<!--        <view class="dingdans_top_rt">-->
<!--&lt;!&ndash;          <strong style="margin-left: 12px;">月份：</strong>&ndash;&gt;-->
<!--&lt;!&ndash;          <strong style="color: #409eff"&ndash;&gt;-->
<!--&lt;!&ndash;                 > {{item.months}} </strong>&ndash;&gt;-->
<!--          <strong style="margin-left: 12px;"-->
<!--                  v-if="item.months == '合计'"> {{item.months}} </strong>-->
<!--          <strong v-else style="margin-left: 12px;"> {{item.months | dictToDescTypeValue(38)  }} </strong>-->
<!--        </view>-->
<!--        <view class="dingdans_con_rt">-->
<!--          <view style="">-->
<!--            <strong>-->
<!--              {{item.successNum}}-->
<!--            </strong>-->
<!--            <p>入库数</p>-->
<!--          </view>-->
<!--          <view style="">-->
<!--            <strong>-->
<!--              {{item.orderAmount}}-->
<!--            </strong>-->
<!--            <p>入库总额</p>-->
<!--          </view>-->
<!--          <view>-->
<!--            <strong>-->
<!--              {{item.profits}}-->
<!--            </strong>-->
<!--            <p>已产生利润</p>-->
<!--          </view>-->
<!--          <view style="   border-right-width: 0vw;">-->
<!--            <strong>-->
<!--              {{item.profitsAmount}}-->
<!--            </strong>-->
<!--            <p>市价总额</p>-->
<!--          </view>-->
<!--        </view>-->
<!--        <view class="dingdans_con_rt">-->
<!--          <view>-->
<!--            <strong v-if="item.successNum">-->
<!--              {{item.orderAmount / item.successNum | numFilter}}-->
<!--            </strong>-->
<!--            <strong v-else>-->
<!--              0-->
<!--            </strong>-->
<!--            <p>入库均价</p>-->
<!--          </view>-->
<!--          <view>-->
<!--            <strong v-if="item.successNum">-->
<!--              {{item.profitsAmount / item.successNum | numFilter}}-->
<!--            </strong>-->
<!--            <strong v-else>-->
<!--              0-->
<!--            </strong>-->
<!--            <p>市价均价</p>-->
<!--          </view>-->
<!--          <view>-->
<!--            <strong>-->
<!--              {{item.inventory}}-->
<!--            </strong>-->
<!--            <p>剩余库存</p>-->
<!--          </view>-->
<!--          <view style="border-right-width: 0vw;">-->
<!--            <strong>-->
<!--              {{item.inventoryPrice}}-->
<!--            </strong>-->
<!--            <p>剩余总额</p>-->
<!--          </view>-->
<!--        </view>-->
<!--        <view class="dingdans_con_rt">-->
<!--          <view>-->
<!--            <strong>-->
<!--              {{item.saleNum}}-->
<!--            </strong>-->
<!--            <p>已售数量</p>-->
<!--          </view>-->
<!--          <view>-->
<!--            <strong>-->
<!--              {{item.theirPrice}}-->
<!--            </strong>-->
<!--            <p>出售金额</p>-->
<!--          </view>-->
<!--          <view>-->
<!--            <strong v-if="item.saleNum">-->
<!--              {{item.profits / item.saleNum | numFilter}}-->
<!--            </strong>-->
<!--            <strong v-else>0</strong>-->
<!--            <p>利润均价</p>-->
<!--          </view>-->
<!--          <view style=" border-right-width: 0vw;">-->
<!--            <strong>-->
<!--              {{item.thisTimeProfits}}-->
<!--            </strong>-->
<!--            <p>预估利润</p>-->
<!--          </view>-->
<!--        </view>-->

<!--      </view>-->
<!--    </view1>-->
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
        :icon="$fileUrl +'/static/operateSteps/empity_7.png'">
    </u-empty>
    <!--    <p style="padding: 0.5rem 0;" class="to-the-bottom">{{emtityMsg}}</p>-->
  </view>
</template>
<script>
  // import Baseline from '@/common/_baseline.vue'
  // import Footer from '@/common/_footer.vue'
  // import {reportApi} from '@/api/report'

  export default {
    components: {
      // 'v-baseline': Baseline,
      // 'v-footer': Footer
    },
    name: "HelloWorld",
    data() {
      return {
        isShowDialog2: false,
        isShowSort: false,
        sortName:'请选择地址',
        addressList: [],
        dateCurrent: parseInt(new Date().getTime()),
        showFrom: false,
        showTo: false,
        allLoaded: false,
        emtityMsg: '没有更多了',
        queryParam: {
          addressId: ''
        },
        tableData: [],
      }
    },
    mounted() {
      this.getPage()
      this.listSysDict()
    },
    methods: {
      chooseSort(item) {
        this.isShowSort = false
        this.queryParam.addressId = item.fieldValue
        this.sortName = item.fieldName
        this.getPage()
      },
      reset() {
        this.isShowSort = false
        this.queryParam.addressId = ''
        this.sortName = '请选择地址'
        this.getPage()
      },

      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
      },
      // cancelFrom() {
      //   this.showFrom = false;
      //   this.queryParam.createTimeFrom = '';
      //   this.getPage()
      // },
      // cancelTo() {
      //   this.showTo = false;
      //   this.queryParam.createTimeTo = '';
      //   this.getPage()
      // },
      // confirmFrom(e) {
      //   this.showFrom = false;
      //   let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
      //   this.queryParam.createTimeFrom = timeValue;
      //   this.getPage()
      // },
      // confirmTo(e) {
      //   this.showTo = false;
      //   let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
      //   this.queryParam.createTimeTo = timeValue;
      //   this.getPage()
      // },
      // jumpDetail(months) {
      //   if (months == '合计') {
      //     return
      //   }
      //   this.$router.push({path: '/putinDetail', query: {months}})
      // },
      jumpDetail(months) {
        if (months == '合计') {
          return
        }
        let url = '/pages/report/putinDetail?months=' + months
        this.$navigateTo(url)
        // this.$router.push({path: '/putinDetail', query: {months}})
      },
      getPage() {
        this.allLoaded = false;
        this.$request({
          url: '/gw/op/v1/report/areaSellList',
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
