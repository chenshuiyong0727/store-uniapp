<template lang="html">
  <view class="hello" ref="hello" style="height: 100%;padding-top: 0px;    overflow: auto;">
    <view class="car1">
      <u-navbar title="移动仓库" >
        <view class="u-nav-slot" slot="left">
          <image style="width: 23px; height: 23px;"  src="../../static/img/logo/logo-333-1.png"></image>
        </view>
        <view @click="scanCode(1)"  class="u-nav-slot" slot="right">
          <image style=" width: 26px;height: 26px;"  src="../../static/img/photo2.png"></image>
        </view>
      </u-navbar>
      <view class="julibiaoti" style="
        padding-bottom: 40vw;
    background-image: linear-gradient(#e5f4ff, #f3f2f8);">
        <view class="header">
          <view class="my-indent-right-1" style="margin-left: 4vw;">
            <u--input
                class="searchInputW"
                prefixIcon="search"
                placeholder="请输入货号/商品名"
                placeholderStyle="font-size: 14px;color:#c0c4cc"
                v-model = "queryParamTop.actNo"
                prefixIconStyle="font-size: 24px;color:#c0c4cc"
                :show-action="false"
                @change="jumpGoods(queryParamTop.actNo)"
                clearable
            >
            </u--input>
          </view>
        </view>
      </view>

      <view class="my-pay-2"
               :style="!flag? 'border-bottom-style:none;margin-top: -141px;padding-top: 4vw; '
               : 'border-bottom-style:none;padding-top: 4vw; '">
        <view :to="{ path: '/store'}">
          <text style="    margin-top: -3px;">
             <image
                 style="margin-top: 11px;
    margin-bottom: -3px;
    width: 28px;height: 28px;" src="../../static/img/goods-1.png"></image>
          </text>
          <text style="color: #333;font-size: 14px;    margin-top: 1px;">库存管理</text>
        </view>
        <image style="    margin-left: 10px;
    height: 55px;width:7px;
    margin-top: 10px;" src="../../static/img/more-1.png"></image>
        <view :to="{ path: '/store?today=7'}">
          <text :class="storeData.upCout > 0 ? 'color-danger-strong' : 'color-font'">{{storeData.upCout}}</text>
          <text style="color: #8c8a8a;font-size: 14px;">变更</text>
        </view>
        <view :to="{ path: '/store?today=2'}">
          <text :class="storeData.successNumLast > 0 ? 'color-danger-strong' : 'color-font'">{{storeData.successNumLast}}</text>
          <text style="color: #8c8a8a;font-size: 14px;">待上架</text>
        </view>
        <view :to="{ path: '/store?today=3'}">
          <text :class="storeData.waitMoveCout > 0 ? 'color-danger-strong' : 'color-font'">{{storeData.waitMoveCout}}</text>
          <text style="color: #8c8a8a;font-size: 14px;">待移库</text>
        </view>
      </view>

      <view class="main" style="">
        <h1 class="section1-title" style="border-top-style:none">
      <text style="    margin-left: 20px;">
        订单管理
      </text>
          <view class="link-top"></view>
        </h1>
        <view class="my-pay-2" style="border-bottom-style:none;">
          <view :to="{ path: '/order?status=3'}">
            <text :class="orderIofo.count3 > 0 ? 'color-danger-strong' : 'color-font'">{{orderIofo.count3}}</text>
            <text style="color: #8c8a8a;font-size: 14px;">待发货</text>
          </view>
          <view :to="{ path: '/order?status=4'}">
            <text :class="orderIofo.count4 > 0 ? 'color-danger-strong' : 'color-font'">{{orderIofo.count4}}</text>
            <text style="color: #8c8a8a;font-size: 14px;">已发货</text>
          </view>
          <view :to="{ path: '/order?status=5'}">
            <text :class="orderIofo.count5 > 0 ? 'color-danger-strong' : 'color-font'">{{orderIofo.count5}}</text>
            <text style="color: #8c8a8a;font-size: 14px;">运输中</text>
          </view>
          <view :to="{ path: '/order?status=6'}">
            <text :class="orderIofo.count6 > 0 ? 'color-danger-strong' : 'color-font'">{{orderIofo.count6}}</text>
            <text style="color: #8c8a8a;font-size: 14px;">已收货</text>
          </view>
        </view>
        <view class="my-pay-2" style="border-bottom-style:none;">
          <view :to="{ path: '/order?status=11&scrollNum=4'}">
            <text class="color-font">{{orderIofo.count11}}</text>
            <text style="color: #8c8a8a;font-size: 14px;">已入库</text>
          </view>
          <view :to="{ path: '/order?status=2&scrollNum=7'}">
            <text class="color-font">{{orderIofo.count2}}</text>
            <text style="color: #8c8a8a;font-size: 14px;">已上架</text>
          </view>
          <view :to="{ path: '/order?status=7&scrollNum=7'}">
            <text class="color-font">{{orderIofo.count7}}</text>
            <text style="color: #8c8a8a;font-size: 14px;">交易成功</text>
          </view>
          <view :to="{ path: '/order?status=8&scrollNum=7'}">
            <text class="color-font">{{orderIofo.count8}}</text>
            <text style="color: #8c8a8a;font-size: 14px;">瑕疵</text>
          </view>
        </view >
        <view  @click="order(1,6)" class="zuoyouduiqi my-pay-21" v-if="orderIofo.countTheExpire">
          <view class="wenzitupduiqi" style="margin-left: 4vw;">
            <image style="width: 30px; height: 30px"  src="../../static/img/timeout_2.png"></image>
            <text style="color: #333;font-size: 15px;margin-left: 10px">即将到期订单</text>
          </view>
          <view class="wenzitupduiqi" style="margin-right: 4vw;">
            <text class="color-font-strong" style="font-size: 25px;">{{orderIofo.countTheExpire}}</text>
            <image style="width: 20px;height: 20px" src="../../static/img/more.png"></image>
          </view>
        </view>
      </view>
    </view>
    <!--    销售走势-->
    <view style="
    background-color: rgb(255, 255, 255);
">
      <h1 class="index-title" style="border-top-style:none">
      <text >
        销售走势
      </text>
        <view class="link-top-1"></view>
      </h1>

      <view class="index-list" style=" padding-top: 4vw" >
          <view class="li">
            <view>
              <text class="color-font"><strong>{{orderData.successNum}}</strong> </text>
            </view>
            <view>
            <text class="section1name" >月订单数</text>
            </view>
            <view>
            <text class="color-font"><strong>{{orderData.expectSuccessNum}}</strong> </text>
            </view>
            <view>
            <text class="section1name" >预计总数</text>
            </view>
            <view>
            <text :class="orderData.successNumRate<0 ? 'color-success' : 'color-danger'" >{{orderData.successNumRate}} %</text>
            </view>
            <view>
            <text class="section1name" >同比上月</text>
            </view>
          </view>

          <view class="li">
            <view>
            <text class="color-font"><strong>{{orderData.profitsAmount}}</strong> </text>
            </view>
            <view>
            <text class="section1name" >本月利润</text>
            </view>
            <view>
            <text class="color-font"><strong>{{orderData.expectProfitsAmount}}</strong> </text>
            </view>
            <view>
            <text class="section1name" >预计利润</text>
            </view>
            <view>
            <text :class="orderData.profitsAmountRate<0 ? 'color-success' : 'color-danger'" >{{orderData.profitsAmountRate}} %</text>
            </view>
            <view>
            <text class="section1name" >同比上月</text>
            </view>
          </view>
          <view  class="li">
            <view>
            <text class="color-font"><strong>{{orderData.orderAmount}}</strong> </text>
            </view>
            <view>
            <text class="section1name" >本月总额</text>
            </view>
            <view>
            <text class="color-font"><strong>{{orderData.expectOrderAmount}}</strong> </text>
            </view>
            <view>
            <text class="section1name" >预计总额</text>
            </view>
            <view>
            <text :class="orderData.orderAmountRate<0 ? 'color-success' : 'color-danger'" >{{orderData.orderAmountRate}} %</text>
            </view>
            <view>
            <text class="section1name" >同比上月</text>
            </view>
          </view>
      </view>
      <view class="zuoyouduiqi" style="
    padding-right: 60px;
    padding-bottom: 14px;
    padding-left: 60px;">
        <u-button type="primary"  size="small" shape="circle" @click="profitData(1)" style="margin-right: 10px"  text="月利润" :plain="dataType == 0"></u-button>
        <u-button type="primary"  size="small" shape="circle" @click="profitData(0)" style="margin-left: 10px"   text="日利润" :plain="dataType == 1"></u-button>
      </view>

      <view style="
      margin-left: 2vw;
      display: flex;
    align-items: center;
    justify-content: space-between;
    width: 92vw;">
        <view  @click="showFrom= true">
          <u--input
              style="width: 44vw;"
              class="searchInput"
              readonly="readonly"
              prefixIcon="calendar"
              prefixIconStyle="font-size: 20px;color:#c0c4cc"
              placeholder="开始时间"
              placeholderStyle="font-size: 15px;color:#c0c4cc"
              v-model = "queryParam.createTimeFrom"
              clearable
          >
          </u--input>
        </view>
        <text style="    font-size: 15px;margin: 2vw;">至</text>
          <view   @click="showTo= true">
            <u--input
                placeholderStyle="font-size: 15px;color:#c0c4cc"
                style="width: 44vw;"
                class="searchInput"
                readonly="readonly"
                prefixIcon="calendar"
                placeholder="结束时间"
                v-model = "queryParam.createTimeTo"
                prefixIconStyle="font-size: 20px;color:#c0c4cc"
                clearable
            >
            </u--input>
          </view>
      </view>
      <view style="margin-top: 20px;">
        <view class="charts-box">
          <qiun-data-charts :type="dataType==1 ? 'line': 'column'" :opts="dataType==1 ? opts: opts1" :chartData="chartData" :ontouch="true"/>
        </view>
      </view>
    </view>
    <u-datetime-picker
        :show="showFrom"
        mode="year-month"
        :minDate="1646064000000"
        @confirm="confirmFrom"
        @cancel="cancelFrom"
    ></u-datetime-picker>
    <u-datetime-picker
        :show="showTo"
        mode="year-month"
        :minDate="1646064000000"
        @confirm="confirmTo"
        @cancel="cancelTo"
    ></u-datetime-picker>

    <view class="section2">
      <!--    <h1 class="section1-title"  style="border-top-style:none">-->
      <!--      <span style="    margin-left: 20px;">仓库值-->
      <!--      </span>-->
      <!--    </h1>-->
      <h1 class="section1-title2" style="border-top-style:none">
      <span style="    margin-left: 20px;">
        仓库值
      </span>
        <view class="link-top"></view>
      </h1>
      <view style="background-color: #fff ; padding-top: 4vw">
<!--        <ve-pie height="320px"-->
<!--                :data="chartData1" :settings="chartSettings1" ></ve-pie>-->
        <view class="charts-box">
          <qiun-data-charts
              type="pie"
              :opts="opts2"
              :chartData="chartData1"
          />
        </view>
      </view>
      <view class="section1-list">
        <view style="width: 47.6%">
            <p><strong class="color-url"> {{countDay}}</strong>{{count}}</p>
            <p class="section1name">春节倒计时</p>
        </view>
        <view>
            <p class="color-url">{{form.inventoryNum}}</p>
            <p class="section1name" >库存总数</p>
        </view>
        <view>
            <p class="color-url">{{form.profitsAmount | numFilterTo0}}</p>
            <p class="section1name">利润总额</p>
        </view>
      </view>
      <view class="section1-list">
          <view :to="{name:'销售报表'}">
            <p class="color-url">{{form.profitsAverage}}</p>
            <p class="section1name">平均利润</p>
          </view>
          <view :to="{name:'仓库'}">
            <p class="color-url">{{form.inventoryCost | numFilterTo0}}</p>
            <p  class="section1name">库存成本</p>
          </view>
          <view :to="{name:'仓库'}">
            <p class="color-url" v-if="form.inventoryNum  && form.goodsPutInNum">{{form.inventoryRatio}}%</p>
            <p v-else> 0%</p>
            <p  class="section1name">库存比例</p>
          </view>
          <view :to="{name:'商品'}">
            <p class="color-url">{{form.goodsNum}}</p>
            <p class="section1name">商品款式</p>
          </view>
      </view>
      <view class="section1-list" >
          <view :to="{ path: '/store?warehouseId=2'}">
            <p class="color-url">{{form.ytInventory | numFilterTo0}}</p>
            <p class="section1name">云头库存</p>
          </view>
          <view :to="{ path: '/store?warehouseId=2'}">
            <p class="color-url">{{form.ytAmount}}</p>
            <p class="section1name">云头货值</p>
          </view>
          <view :to="{ path: '/store?warehouseId=1'}">
            <p class="color-url">{{form.qpInventory }}</p>
            <p class="section1name">前埔库存</p>
          </view>
          <view :to="{ path: '/store?warehouseId=1'}">
            <p class="color-url">{{form.qpAmount | numFilterTo0}}</p>
            <p class="section1name">前埔货值</p>
        </view>
      </view>
      <view class="section1-list" >
          <view :to="{name:'入库报表'}">
            <p>{{form.goodsPutInNum}}</p>
            <p class="section1name">入库商品</p>
          </view>
          <view :to="{name:'入库报表'}">
            <p>{{form.inventoryAmount | numFilterTo0}}</p>
            <p class="section1name">入库总额</p>
          </view>
          <view :to="{name:'销售报表'}">
            <p>{{form.successNum}}</p>
            <p class="section1name">交易成功</p>
          </view>
          <view :to="{name:'销售报表'}">
            <p>{{form.orderAmount | numFilterTo0}}</p>
            <p class="section1name">成功总额</p>
          </view>
      </view>
      <view class="section1-list" >
          <view :to="{ path: '/order?status=7'}">
            <p>{{form.freight |numFilterTo0}}</p>
            <p class="section1name">总运费</p>
          </view>
          <view :to="{ path: '/order?status=7'}">
            <p>{{form.poundage | numFilterTo0}}</p>
            <p class="section1name">手续费</p>
          </view>
          <view :to="{name:'其他收支'}">
            <p>{{form.otherRevenue| numFilterTo0}}</p>
            <p class="section1name">其他收支</p>
          </view>
          <view :to="{name:'入库报表'}">
            <p>{{form.inboundAverage}}</p>
            <p class="section1name">库存均价</p>
          </view>
      </view>
      <view class="section1-list" >
          <view :to="{name:'销售报表'}">
            <p>{{form.orderAmountAverage}}</p>
            <p class="section1name">成功均价</p>
          </view>
          <view :to="{ path: '/order?status=7'}">
            <p>{{form.freightAverage}}</p>
            <p class="section1name">运费均价</p>
          </view>
          <view :to="{ path: '/order?status=7'}">
            <p>{{form.costAverage}}</p>
            <p class="section1name">成本均价</p>
          </view>
          <view :to="{ path: '/order?status=7'}">
            <p>{{form.profitsProportion}}%</p>
            <p class="section1name">利润比例</p>
          </view>
      </view>
      <view class="section1-list" style="padding-bottom: 5vw;">
          <view :to="{name:'瑕疵商品'}">
            <p>{{form.defectsNum}}</p>
            <p class="section1name">瑕疵数</p>
          </view>
          <view :to="{ name:'销售报表'}">
            <p>{{form.passRatio}} % </p>
            <p class="section1name">通过比例</p>
          </view>
          <view :to="{  path: '/order?saleType=2'}">
            <p>{{orderIofo.countSd}}</p>
            <p class="section1name">闪电直发</p>
          </view>
          <view :to="{  path: '/order?status=11'}">
            <p>{{orderIofo.count11}}</p>
            <p class="section1name">寄售入库</p>
          </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        showFrom: false,
        showTo: false,
        flag: false,
        loading: true,
        form: {},
        orderIofo: {},
        queryParam: {
          dataType: 1,
          createTimeFrom: '',
          createTimeTo: ''
        },
        queryParamTop: {
          actNo: ''
        },
        dataType: 1,
        extend: {
          // x轴的文字倾斜
          "xAxis.0.axisLabel.rotate": 45,
          yAxis: {
            //是否显示y轴线条
            axisLine: {
              show: true,
            },
            // 纵坐标网格线设置，同理横坐标
            splitLine: {
              show: false,
            },
            // 线条位置
            position: "left",
          },
          xAxis: {
            axisLine: {
              show: true,
            },
          },
          series: {
            label: { show: true, position: "top" },
          },
          //数据过多时出现横向滚动条
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 50,
            },
            {
              type: "inside",
              realtime: true,
              start: 0,
              end: 50,
            },
          ],
        },
        // chartData2: {
        //   columns: ['months', '订单数', '订单金额(千)', '利润(百)'],
        //   rows: []
        // },
        createTime: '',
        chartSettings: {
          // xAxisType: 'time',
          area: false,
          axisSite: { right: ['profitsAmount'] },
          labelAlias: {
            'successNum': '订单数',
            'orderAmount': '订单金额(千)',
            'profitsAmount': '利润(百)'
          }
        },
        chartData: {},
        chartData1: {},
        opts: {
          color: ["#409eff","#00c2c2","#F56C6C","#FAC858","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
          padding: [15,10,0,15],
          enableScroll: true,
          dataLabel: false,
          legend: {},
          xAxis: {
            disableGrid: true,
            scrollShow: true,
            itemCount: 4
          },
          yAxis: {
            gridType: "dash",
            dashLength: 2
          },
          extra: {
            line: {
              type: "straight",
              width: 2,
              activeType: "hollow"
            }
          }
        },
        opts1: {
          color: ["#409eff","#00c2c2","#F56C6C","#FAC858","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
          padding: [15,15,0,5],
          enableScroll: true,
          legend: {},
          xAxis: {
            disableGrid: true,
            scrollShow: true,
            itemCount: 4
          },
          yAxis: {
            data: [
              {
                min: 0
              }
            ]
          },
          extra: {
            column: {
              type: "group",
              width: 30,
              activeBgColor: "#000000",
              activeBgOpacity: 0.08
            }
          }
        },
        opts2: {
          color: ["#409eff","#00c2c2","#F56C6C","#FAC858","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
          padding: [5,5,5,5],
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
        // chartSettings1: { type: 'pie' },
        // chartData1: {
        //   columns: ['key', 'value'],
        //   rows: [
        //   ]
        // },
        countDay: 0, // 倒计时
        count: '', // 倒计时
        seconds: 0, // 10天的秒数
        nowDate: '',
        nowTime: '',
        nowWeek: '',
        pickerValue:new Date(),
        pickerValueType: '',
        orderData: {},
        storeData: {},
        dateType: 'month',
        valueFormat: 'yyyy-MM',
        dayLl: 'default',
        mouthLl: 'primary',
        loading: false,
        dataEmpty: false,
      }
    },
    onPullDownRefresh() {
      uni.stopPullDownRefresh()
      this.initTime()
      this.time()
      this.getData()
      this.getData1()
      this.getData2()
    },
    created(){
      this.initTime()
      this.time()
      this.getData()
      this.getData1()
      this.getData2()
    },
    methods: {
      cancelFrom() {
        this.showFrom=false
        this.queryParam.createTimeFrom = ''
        this.getData1()
      },
      cancelTo() {
        this.showTo=false
        this.queryParam.createTimeTo = ''
        this.getData1()
      },
      confirmFrom(e) {
        this.showFrom = false;
        let timeValue =  uni.$u.timeFormat(e.value, 'yyyy-mm');
        this.queryParam.createTimeFrom = timeValue
        this.getData1()
      },
      confirmTo(e) {
        this.showTo = false;
        let timeValue =  uni.$u.timeFormat(e.value, 'yyyy-mm');
        this.queryParam.createTimeTo = timeValue
        this.getData1()
      },
      order(theExpire,scrollNum) {
        this.$router.push({ path: '/order', query: { theExpire,scrollNum }})
      },
      handleScroll () {
        let scrollTop = this.$refs.hello.scrollTop
        console.info(scrollTop)
        if (scrollTop < 40){
          this.flag = false
        } else{
          this.flag = true
        }
      },
      jumpGoods(actNo) {
        this.$router.push({ path: '/GoodsBase', query: { actNo } })
      },
      initTime() {
        let myDate = new Date().getTime()
        let endTime = '2024/02/10 00:00:00'
        let timestamp2 = Date.parse(new Date(endTime))
        this.seconds = (timestamp2 - myDate) / 1000
      },
      countDown() {
        let d = parseInt(this.seconds / (24 * 60 * 60))
        if (d > 0) {
          // d = d < 10 ? '0' + d : d
          let h = parseInt(this.seconds / (60 * 60) % 24);
          h = h < 10 ? '0' + h : h
          let m = parseInt(this.seconds / 60 % 60);
          m = m < 10 ? '0' + m : m
          let s = parseInt(this.seconds % 60);
          s = s < 10 ? '0' + s : s
          this.count = '天' + h + '时' + m + '分' + s + '秒'
        }
        this.countDay = d
      },
      time() {
        setInterval(() => {
          this.seconds -= 1
          this.countDown()
        }, 1000)
      },
      getData() {
        this.$request({
          url: '/gw/op/v1/goodsOrder/indexData',
          method: 'get'
        }).then(res => {
          if (res.subCode === 1000) {
            this.form = res.data ? res.data.commonDto : {}
            this.orderIofo = res.data ? res.data.countDto : {}
            if (this.form.inventoryCost && this.form.inventoryNum) {
              this.form.inboundAverage = parseFloat(
                  this.form.inventoryCost / this.form.inventoryNum).toFixed(2)
            }
            if (this.form.successNum) {
              this.form.orderAmountAverage = parseFloat(
                  this.form.orderAmount / this.form.successNum).toFixed(2)
              this.form.freightAverage = parseFloat(
                  this.form.freight / this.form.successNum).toFixed(2)
              this.form.profitsAverage = parseFloat(
                  this.form.profitsAmount / this.form.successNum).toFixed(2)
            }
            this.form.costAverage = parseFloat(
                this.form.inboundAverage / 1 + this.form.freightAverage / 1).toFixed(2)
            this.form.inventoryRatio = parseFloat(
                this.form.inventoryNum / this.form.goodsPutInNum * 100).toFixed(2)
            this.form.profitsProportion = parseFloat(
                this.form.profitsAverage / this.form.costAverage * 100).toFixed(2)
            // let  inventoryNum = {key: "22", value: 1393  }
            // let  successNum = {key: "23", value: 1393  }
            // let  successNum = {name: "成功数量", value: this.form.successNum }
            // let  inventoryNum = {name: "库存总数", value: this.form.inventoryNum }
            // let  successNum = {key: "successNum", value: this.form.successNum }
            // this.chartData1.rows.push(inventoryNum)
            // this.chartData1.rows.push(successNum)
            let res1 = {
              series: [
                {
                  data: [
                      {"name":"成功数量","value": this.form.successNum },
                      {"name":"库存总数","value": this.form.inventoryNum}
                    ]
                }
              ]
            }
            // let listdata = []
            // listdata.push(successNum)
            // listdata.push(inventoryNum)
            // let res ={}
            // let series =[]
            // let series

            this.chartData1 = JSON.parse(JSON.stringify(res1));
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      scanCode(photo) {
        this.$router.push({ path: '/scanCode', query: { photo } })
      },
      chosseTime(pickerValueType) {
        this.pickerValueType = pickerValueType
        this.$refs.picker.open();
        if (this.dataType == 1){
          this.$refs.picker.$el.getElementsByClassName('picker-slot')[2].style.display = 'none'
        } else {
          this.$refs.picker.$el.getElementsByClassName('picker-slot')[2].style.display = ''
        }
      },
      handleConfirm(val) {
        let year = new Date(val).getFullYear()
        let month = new Date(val).getMonth() + 1
        if (month < 10 ){
          month = '0' + month
        }
        let res = year + '-' +month
        if (this.dataType == 0){
          let day = new Date(val).getDate()
          if (day < 10 ){
            day = '0' + day
          }
          res = res + '-' + day
        }
        if(this.pickerValueType == 1) {
          this.queryParam.createTimeFrom = res
        }else {
          this.queryParam.createTimeTo = res
        }
        this.getData1()
      },
      profitData(dataType) {
        this.dataType = dataType
        this.queryParam = {
          dataType: dataType,
          createTimeFrom: '',
          createTimeTo: ''
        }
        if (dataType == 1) {
          this.mouthLl = 'primary'
          this.dayLl = 'default'
          this.dateType = 'month'
          this.valueFormat = 'yyyy-MM'
        } else {
          this.mouthLl = 'default'
          this.dayLl = 'primary'
          this.dateType = 'date'
          this.valueFormat = 'yyyy-MM-dd'
        }
        this.getData1()
      },
      getData1() {
        // goodsOrderApi.indexOrderData(this.queryParam)
        this.$request({
          url: '/gw/op/v1/goodsOrder/indexOrderData',
          method: 'get',
          data: this.queryParam
        }).then(res => {
          if (res.subCode === 1000) {
            this.dataEmpty = false
            this.loading = false
            // this.chartData.rows = res.data.rows
            // this.chartData2.rows = res.data.rowsDate
            this.chartData = JSON.parse(JSON.stringify(res.data.lineVo));
            this.orderData = res.data
            if (this.orderData) {
              this.orderData.successNumRate = parseFloat(
                  (this.orderData.successNum - this.orderData.successNumLast)
                  / this.orderData.successNumLast * 100).toFixed(2)
              this.orderData.profitsAmountRate = parseFloat(
                  (this.orderData.profitsAmount - this.orderData.profitsAmountLast)
                  / this.orderData.profitsAmountLast * 100).toFixed(2)
              this.orderData.orderAmountRate = parseFloat(
                  (this.orderData.orderAmount - this.orderData.orderAmountLast)
                  / this.orderData.orderAmountLast * 100).toFixed(2)
              var date = new Date()
              let todaydate = date.getDate()
              let expectSuccessNum = this.orderData.successNum / (todaydate/30)
              this.orderData.expectSuccessNum = parseFloat(expectSuccessNum).toFixed(0)
              let expectProfitsAmount = this.orderData.profitsAmount / (todaydate/30)
              this.orderData.expectProfitsAmount = parseFloat(expectProfitsAmount).toFixed(2)
              let expectOrderAmount = this.orderData.orderAmount / (todaydate/30)
              this.orderData.expectOrderAmount = parseFloat(expectOrderAmount).toFixed(2)
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      getData2() {
        this.$request({
          url: '/gw/op/v1/goodsOrder/todaySync',
          method: 'get',
          data: this.queryParam
        }).then(res => {
          if (res.subCode === 1000) {
            this.storeData = res.data
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
    }
  }
</script>


<style lang="less" scoped>
  @import '@/assets/fz.less';
  @import '@/assets/index/style.css';
  .mint-button--small {
    display: inline-block;
    font-size: 4vw;
    height: 6vw;
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
    /*overflow:hidden;*/

    overflow-y: auto;
  }

  .index-title {
    .bt();
    background-color: #ffffff;
    text-align: left;
    padding: 3vw 0;
    margin-top: 4vw;
    font-size: 16px;
    color: #333;
    position: relative;
    margin-left: 20px;
    font-weight: 600;

    i {
      position: absolute;
      right: 6vw;
      top: 50%;
      .fz(font-size, 36);
      .fz(margin-top,-16);

      &::before {
        color: rgb(159, 159, 159);
      }
    }
  }
  .index-title-2 {
    .bt();
    background-color: #ffffff;
    text-align: center;
    padding: 3vw 0;
    margin-top: 4vw;
    .fz(font-size, 40);
    color: #333;
    position: relative;

    i {
      position: absolute;
      right: 6vw;
      top: 50%;
      .fz(font-size, 36);
      .fz(margin-top,-16);

      &::before {
        color: rgb(159, 159, 159);
      }
    }
  }
  .section1name{
    color: #8c8a8a;
  }
  .index-list {
    display: flex;
    justify-content: space-around;
    padding: 0vw 2vw 4vw 2vw;
    .li {
      text-align: center;
      border-radius: 10px;
      background-color: #EEF2F7;
      width: 30%;
      padding: 1vw;
      color: #333;
      margin: 1.1vw;
      font-size: 4.2vw;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      /*img {*/
      /*  width: 100%;*/
      /*  display: block;*/
      /*}*/
      view{
        padding-top: 1vw;
      }
    }
  }
  .my-indent-right-2 {
    /*font-size: 16px;*/
    /*color: #333;*/
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 5vw;
    height: 10vw;
    line-height: 6vw;
    background-color: #fff;
    .bd();
    &:active {
      background-color: rgb(224, 227, 230)
    }
  }
  .link-top-1 {
    width: 98%;
    margin-left: -2vw;
    height: 1px;
    border-top: solid #E2DDDD 1.5px;
    margin-bottom: -15px;
    margin-top: 13px;
  }
  .section1-title {
    .bt();
    background-color: #ffffff;
    text-align: left;
    padding: 3vw 0;
    margin-top: 4vw;
    font-size: 16px;
    color: #333;
    position: relative;
    font-weight: 600;
    width: 92%;
    margin-left: 4%;
    i {
      position: absolute;
      right: 6vw;
      top: 50%;
      .fz(font-size, 36);
      .fz(margin-top,-16);

      &::before {
        color: rgb(159, 159, 159);
      }
    }
  }
  .car1 {
    width: 100%;
    /*overflow: auto;*/
    background-color: #f3f2f8;
    .header {
      width: 100%;
      height: 25vw;
      background-size: auto 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      .header-icon {
        border: .4vw solid #ffffff;
        background-color: @cl;
        margin-left: 4vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 14vw;
        height: 14vw;
        line-height: 16vw;
        text-align: center;
        border-radius: 50%;
        text {
          .fz(font-size, 54);
          &::before {
            color: #ffffff;
          }
        }
      }
      >text {
        margin-left: 3.2vw;
        .fz(font-size, 30);
        color: #ffffff;
        letter-spacing: .2vw;
      }
    }
    .main {
      width: 100%;
      .my-indent {
        width: 100%;
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 5vw;
        height: 15vw;
        line-height: 15vw;
        background-color: #fff;
        .bd();
        &:active {
          background-color: rgb(224, 227, 230)
        }

        .my-indent-right {
          text {
            display: inline-block;
            .fz(font-size, 28);
            color: rgba(0, 0, 0, .4);
            position: relative;
          }
          i {
            position: relative;
            top: .8vw;
          }
        }
      }

      .my-pay {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        padding: 2vw 0;
        background-color: #fff;
        .bd();

        >view {
          display: block;
          width: 33.33%;
          color: #999;
          text-align: center;

          >text {
            .fz(font-size, 50);
            margin-top: 2.3vw;
            display: block;
            text-align: center;
          }

          p {
            padding: 2.3vw 0;
            text-align: center;
          }
        }
      }

      .my-vip,.my-service,.my-settle {
        width: 100%;
        .mt();
        .bd();
        .bt();
        >view {
          background-color: #fff;
          display: block;
          width: 100%;
          display: -ms-flex;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 15vw;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          padding: 0 6vw;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: #333;
          &:active {
            background-color: rgb(224, 227, 230);
          }
          >view {
            -ms-flex: 2;
            -webkit-box-flex: 2;
            flex: 1.2;
            padding-top: 1.3vw;
          }

          .my-vip-top-view {
            padding-top: 0;
          }
          >p {
            -ms-flex: 10;
            -webkit-box-flex: 10;
            flex: 10;
            position: relative;
            font-size: 4.1vw;
            top: 0.7VW;
            &:active {
              background-color: rgb(224, 227, 230);
            }

            i {
              position: absolute;
              right: 0;
              top: 1.2vw;
            }
            samp {
              font-weight: 600;
              /*margin-left: 42vw;*/
              font-size: 4.5vw;
            }
          }
        }

      }
    }
  }
  /*图标大小不一，重新定义*/

  .icon-go {
    .fz(font-size, 36);
    &::before {
      color: #aba8a8;
    }
  }

  [class^="icon2-"],
  [class*=" icon2-"] {
    .fz(font-size, 50);
  }
  .link-top {
    width: 92%;
    margin-left: 4%;
    height: 1px;
    border-top: solid #E2DDDD 1.5px;
    margin-bottom: -15px;
    margin-top: 13px;
  }

  .icon2-service {
    .fz(font-size, 34);
  }
  .my-pay-2 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 92%;
    margin-left: 4%;
    padding: 2vw 0;
    background-color: #fff;
    .bd();

    > view {
      display: block;
      width: 33.33%;
      color: #999;
      text-align: center;

      > text {
        font-size: 22px;
        margin-top: 2.3vw;
        display: block;
        text-align: center;
      }

      p {
        padding: 2.3vw 0;
        text-align: center;
      }
    }
  }
  .my-pay-21 {
    background-color: #fff;
    border-bottom-color: rgba(185, 185, 185, 0.14);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    margin-top: 4vw;
    padding-top: 4vw;
    padding-bottom: 4vw;
    margin-left: 4vw;
    width: 92vw;
  }
  .charts-box {
    width: 95%;
    height: 200px;
  }


  .section2 {
    margin-bottom: 30px;
    margin-top: 4vw;
    background-color: #fff;
    .section1-title2 {
      .bt();
      background-color: #ffffff;
      text-align: left;
      padding: 3vw 0;
      font-size: 16px;
      color: #333;
      position: relative;
      /*margin-left: 20px;*/
      font-weight: 600;

      i {
        position: absolute;
        right: 6vw;
        top: 50%;
        .fz(font-size, 36);
        .fz(margin-top,-16);

        &::before {
          color: rgb(159, 159, 159);
        }
      }
    }

    .section1-list {
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      flex-wrap: wrap;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      padding: 2vw 2vw 4vw 2vw;
      view {
        border-radius: 10px;
        background-color: #EEF2F7;
        width: 22.7%;
        padding: 1.6vw;
        color: #333;
        margin: 1vw;
        font-size: 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        p{
          padding-top: 1vw;
        }
      }
      display: -webkit-box;
      flex-wrap: wrap;
      /* padding: 0vw 1vw; */
      padding-top: 0vw;
      padding-right: 1vw;
      padding-bottom: 0vw;
      padding-left: 2vw;
    }

    .section1-banner {
      display: block;
      width: 100vw;
      img {
        width: 100%;
        height: 24vw;
      }
    }
  }
  .section1name{
    color: black;
    /*font-weight: 600;*/
  }
  .link-top {
    width: 92%;
    margin-left: 4%;
    height: 1px;
    border-top: solid #E2DDDD 1.5px;
    margin-bottom: -15px;
    margin-top: 13px;
  }

</style>

