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
    <view class="xuanzhequyu">
      <view class="width80 zuoyouduiqi">
        <view style="padding: 10px 0;" @click="isShowSort = !isShowSort ;">
          <text style="font-size: 16px;font-weight: 600" :class="sortName != '请选择地址' ? 'color-url': ''">{{ sortName}}</text>
          <image v-if="!isShowSort && sortName == '请选择地址'" class="paixutupianxuanz" src="../../static/img/tab_down.png"></image>
          <image v-if="!isShowSort && sortName != '请选择地址'" class="paixutupianxuanz" src="../../static/img/tab_down_url.png"></image>
          <image v-if="isShowSort && sortName != '请选择地址'" class="paixutupianxuanz" src="../../static/img/tab_up_url.png"></image>
          <image v-if="isShowSort && sortName == '请选择地址'" class="paixutupianxuanz" src="../../static/img/tab_up.png"></image>
        </view>
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

    <view  v-if="chartData1" style="background-color: #fff ;    padding-top: 4vw; margin-top: 16vw">
      <view class="charts-box">
        <qiun-data-charts
            type="pie"
            :opts="opts2"
            :chartData="chartData1"
        />
      </view>
    </view>

    <view style="    margin-top: 5px;">
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
        opts2: {
          color: ["#409eff", "#00c2c2", "#F56C6C", "#FAC858", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc","#5F9EA0"],
          padding: [5, 5, 5, 5],
          enableScroll: false,
          extra: {
            pie: {
              activeOpacity: 0.5,
              activeRadius: 10,
              offsetAngle: 0,
              labelWidth: 15,
              border: false,
              borderWidth: 3,
              borderColor: "#FFFFFF"
            }
          }
        },
        chartData1: {},
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
      jumpDetail(months) {
        if (months == '合计') {
          return
        }
        let url = '/pages/report/putinDetail?months=' + months
        this.$navigateTo(url)
      },
      getName(addressId) {
        let typeData = this.addressList.filter(item => item.fieldValue == addressId)
        if (!typeData || typeData.length == 0) {
          return null
        }
        let name = typeData[0].fieldName
        if (!name) {
          return null
        }
        name = name.substring(0, name.indexOf('-'))
        return name
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
            let data = []
            for (let i = 0; i < this.tableData.length; i++) {
              let name = this.getName(this.tableData[i].months)
              if (!name) {
                continue
              }
              let info = { name: name, value: this.tableData[i].successNum }
              data.push(info)
            }

            let res1 = {
              series: [
                {
                  data: data
                }
              ]
            };
            this.chartData1 = JSON.parse(JSON.stringify(res1));
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
