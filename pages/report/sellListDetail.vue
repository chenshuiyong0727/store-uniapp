<template>
  <view class="hello">
    <u-navbar
        title="销售报表"
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
        <image  class="hengtupianbaobiao" src="../../static/img/heng.png"></image>
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
    <view style="    padding-top: 44px;">
      <view @click="jumpDetail(item.months )" class="dingdans_item_rt" v-for="(item,index) in tableData" :key="index">
        <view class="dingdans_top_rt">
          <strong style="margin-left: 12px;">月份：</strong>
          <strong style="color: #409eff"
                  > {{item.months}} </strong>
        </view>
        <view class="dingdans_con_rt">
          <view style="width:15vw">
            <strong>
              {{item.successNum}}
            </strong>
            <p>销售数</p>
          </view>
          <view style="width: 25vw">
            <strong>
              {{item.orderAmount}}
            </strong>
            <p>销售金额</p>
          </view>
          <view style="width: 20vw;">
            <strong>
              {{item.profitsAmount}}
            </strong>
            <p>利润</p>
          </view>
          <view style="width: 20vw;">
            <strong v-if="item.successNum">
              {{item.orderAmount / item.successNum | numFilter}}
            </strong>
            <strong v-else>
              0
            </strong>
            <p>销售均价</p>
          </view>
          <view   style="width:20vw;    border-right-width: 0vw;">
            <strong v-if="item.successNum">
              {{item.profitsAmount / item.successNum | numFilter}}
            </strong>
            <strong v-else>
              0
            </strong>
            <p>平均利润</p>
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
        months: '',
        allLoaded: false,
        emtityMsg: '没有更多了',
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
          this.months = this.months + '-01'
          let to = this.$getNextMonth(this.months)
          this.queryParam.createTimeFrom = this.months
          this.queryParam.createTimeTo = to
          this.getPage()
        }
      }
    },
    methods: {

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
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.queryParam.createTimeFrom = timeValue;
        this.getPage()
      },
      confirmTo(e) {
        this.showTo = false;
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.queryParam.createTimeTo = timeValue;
        this.getPage()
      },
      jumpDetail(months) {
        if (months == '合计') {
          return
        }
        let url = '/pages/order/index?months=' + months
        this.$navigateTo(url)
      },
      getPage() {
        this.allLoaded = false;
        this.$request({
          url: '/gw/op/v1/report/sellListDay',
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
