<template lang="html">
  <view class="login">
    <u-navbar title="新增商品" bgColor="#F3F4F5">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <image class="back_icon" :src="fileUrl +'/static/img/back3.png'"></image>
      </view>
      <view  @click="gotoAdd" class="u-nav-slot" slot="right" style="font-size: 15px;">
        手动添加
      </view>
    </u-navbar>
    <view class="fenlei_top_2">
      <view class="shoudongtianjia" >
        <view  class="zuoyouduiqi width92">
          <text style="width: 25vw;">根据货号获取</text>
          <view class="searchInput" style="width: 48vw;">
            <u--input
                prefixIcon="search"
                placeholder="请输入货号"
                placeholderStyle="font-size: 14px;color:#c0c4cc"
                v-model="form.actNo"
                prefixIconStyle="font-size: 24px;color:#c0c4cc"
                :show-action="false"
                clearable
            >
            </u--input>
          </view>
          <text style="margin-left: 2vw;" class="color-url" @click="getImgUrl()">获取信息</text>
        </view>
      </view>
      <view class="shoudongtianjia"  >
        <view  class="xianglian width92">
          <text style="width: 25vw;">根据图片获取</text>
          <u-upload
              style="border-radius: 100%;"
              @afterRead="afterRead"
              name="1"
              multiple
              :maxCount="1"
              :width="70"
              :height="70"
              ref="uUpload"
          >
            <text style="margin-left: 2vw;" class="color-url">拍摄照片</text>
          </u-upload>
        </view>
      </view>
    </view>

<!--    -->
    <view  v-if="form.id" class="width92 baisebeijing" style="margin-top :160px;">
      <u--form
          style="background-color: white"
          class="julibiaoti"
          labelPosition="left"
          :model="form"
          ref="uForm"
      >
        <view style="width: 83vw;margin-left: 5vw;">
          <u-form-item  v-if="form.img"  label-width="34vw"  label="图片" borderBottom>
            <image  style="width: 50vw;" :src="form.img"
                     @click="pictureZoomShow = true"
                     mode="widthFix"></image>
          </u-form-item>
          <u-form-item   label-width="20vw"  label="货号" borderBottom>
            <u--text align="right" :text="form.actNo"></u--text>
          </u-form-item>
          <u-form-item label-width="20vw"  label="名称" borderBottom>
            <u--text align="right" :text="form.name"></u--text>
          </u-form-item>
          <u-form-item  label-width="20vw"  label="品牌" borderBottom>
            <u--text align="right" :text="form.brand"></u--text>
          </u-form-item>
          <u-form-item  label-width="20vw"  label="发售日期" borderBottom>
            <u--text align="right" :text="form.sellDate"></u--text>
          </u-form-item>
          <u-form-item  label-width="20vw"  label="发售价格">
            <u--text align="right" :text="form.sellPrice"></u--text>
          </u-form-item>


        </view>
      </u--form>
    </view>

    <view v-if="form.id" style="margin-top:10px;" class="width92">
      <view >
        <view class="my-pay-6" v-if="tableData.length">
          <view>
            <h5 style="font-size: 17px;margin-left: 15px;font-weight: 600;color: #333333">尺码列表</h5>
          </view>
          <view>
            <view class="dingdans_item_dw" style=" display: flex;    border-bottom: 2px solid #f4f3f8;
    justify-content: space-between;
    align-items: center;"
            >
              <view class="dingdans_top_dw" style="
          width: 20vw;
          font-weight: 600;
          padding-bottom: 0px;
          border-bottom: 0; color: #333333">
                <view class="dingdans_top_left_dw" style=" ">
                  <text>尺码</text>
                </view>
              </view>
              <view class="dingdans_top_dw" style="
          width: 20vw;          padding-bottom: 0px;    margin-left: -8px;
                    font-weight: 600;
          border-bottom: 0; color: #333333">
                <view class="dingdans_top_left_dw" style=" ">
                  <text>得物价</text>
                </view>
              </view>
              <view class="dingdans_top_dw" style="
          width: 20vw;    margin-left: 7px;      font-weight: 600;padding-bottom: 0px;
          border-bottom: 0; color: #333333">
                <view class="dingdans_top_left_dw" style=" ">
                  <text>到手价</text>
                </view>
              </view>

              <view v-if="tableData[0].inPrice" class="dingdans_top_dw" style="
          width: 15vw;       margin-left: 2px;       font-weight: 600;padding-bottom: 0px;
          border-bottom: 0; color: #333333">
                <view class="dingdans_top_left_dw" style=" ">
                  <text>库存</text>
                </view>
              </view>
              <view  v-if="tableData[0].inPrice" class="dingdans_top_dw" style="
          width: 20vw;          font-weight: 600;padding-bottom: 0px;margin-right: 5px;
          border-bottom: 0; color: #333333">
                <view class="dingdans_top_left_dw" style=" ">
                  <text>入库价</text>
                </view>
              </view>
              <view  v-if="tableData[0].inPrice" class="dingdans_top_dw" style="
          width: 15vw;    margin-left: 5px;        margin-right: 2px;  font-weight: 600;padding-bottom: 0px;
          border-bottom: 0; color: #333333">
                <view class="dingdans_top_left_dw" style=" ">
                  <text>利润</text>
                </view>
              </view>
            </view>
            <view class="dingdans_item_dw" @click="rowClick(item)" style=" display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    border-bottom: 2px solid rgb(244, 243, 248);
"
                 v-for="(item,index) in tableData"
                 :key="index"
            >
              <view class="dingdans_top_dw" style="
          width: 20vw;padding-bottom: 0px;
          border-bottom: 0; ">
                <view class="dingdans_top_left_dw" style=" color: #7a7a7a">
                  <text style="font-weight: bolder;font-size: 14px;" class="color-url">{{item.size }}</text>
                </view>
              </view>
              <view class="dingdans_top_dw" style="
          width: 20vw;padding-bottom: 0px;
          border-bottom: 0; ">
                <view class="dingdans_top_left_dw" style="color: #7a7a7a ">
                  <text>¥</text>
                  <text>{{item.price }}</text>
                </view>
              </view>
              <view class="dingdans_top_dw" style="
          width: 25vw;padding-bottom: 0px;
          border-bottom: 0; ">
                <view class="dingdans_top_left_dw" style="color: #7a7a7a ">
                  <text v-if="item.price ">¥</text>
                  <text v-if="item.price "> {{item.price | getThePrice}}</text>
                </view>
              </view>
              <view  v-if="tableData[0].inPrice"  class="dingdans_top_dw" style="
          width: 15vw;padding-bottom: 0px;    margin-left: 5px;
          border-bottom: 0; ">
                <view class="dingdans_top_left_dw" style=" color: #7a7a7a;margin-left: 7px;">
                  <text>{{item.inventory ? item.inventory : '' }}</text>
                </view>
              </view>
              <view  v-if="tableData[0].inPrice" class="dingdans_top_dw" style="
          width: 20vw;padding-bottom: 0px;
          border-bottom: 0; ">
                <view class="dingdans_top_left_dw" style=" color: #7a7a7a">
                  <text v-if="item.inPrice ">¥</text>
                  <text v-if="item.inPrice ">{{item.inPrice }}</text>
                </view>
              </view>
              <view v-if="tableData[0].inPrice"  class="dingdans_top_dw" style="
          width: 25vw;padding-bottom: 0px;
          border-bottom: 0; ">
                <view class="dingdans_top_left_dw" style="color: #7a7a7a ">
                  <text v-if="item.inPrice ">¥</text>
                  <text  v-if="item.inPrice"
                         :class="$getProfits(item.price,item.inPrice) > 0 ? 'color-danger' : 'color-success'"
                  >
                    {{item.price | getProfits(item.inPrice)}}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="form.img" alt="" mode="widthFix"   class="showImg"></image>
      </view>
    </view>

      <u-popup :show="isShowDialog2" @close="close" :duration="100" :closeable="true" mode="center">
        <view style="    width: 100vw;padding: 60px 4vw 0px 5vw;">
          <view style="" class="store-list-1-1" >
            <view  class="store-list-1-li-1">
              <view class="overview1">
                <p><strong>当前价格</strong></p>
                <p class="color-url">{{priceData.price}}</p>
              </view>
              <view class="overview2">
                <p><strong>到手价</strong></p>
                <p class="color-url">{{priceData.theirPrice}} </p>
              </view>
            </view>
            <view  class="store-list-1-li-1">
              <view class="overview1">
                <p><strong>年度最高</strong></p>
                <p class="color-url">{{priceData.price365}}</p>
              </view>
              <view class="overview2">
                <p><strong>到手价</strong></p>
                <p class="color-url">{{priceData.theirPrice365}}</p>
              </view>
            </view>
            <view  class="store-list-1-li-1">
              <view class="overview1">
                <p><strong>半年最高</strong></p>
                <p class="color-url">{{priceData.price180}}</p>
              </view>
              <view class="overview2">
                <p><strong>到手价</strong></p>
                <p class="color-url">{{priceData.theirPrice180}}</p>
              </view>
            </view>
            <view  class="store-list-1-li-1">
              <view class="overview1">
                <p><strong>30天最高</strong></p>
                <p class="color-url">{{priceData.price30}}</p>
              </view>
              <view class="overview2">
                <p><strong>到手价</strong></p>
                <p class="color-url">{{priceData.theirPrice30}}</p>
              </view>
            </view>
          </view>
          <view class="zuoyouduiqi" style="
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;">
            <u-button type="primary" size="small" shape="circle" @click="profitData(30)"
                      style="margin-right: 10px" text="30天走势图" :plain="queryParam1.dayNum != 30"></u-button>
            <u-button type="primary" size="small" shape="circle" @click="profitData(180)"
                      style="margin-left: 10px" text="半年走势图" :plain="queryParam1.dayNum != 180"></u-button>
            <u-button type="primary" size="small" shape="circle" @click="profitData(365)"
                      style="margin-left: 10px" text="年度走势图" :plain="queryParam1.dayNum != 365"></u-button>
          </view>

          <view class="charts-box">
            <qiun-data-charts
                type="line"
                :opts="opts"
                :chartData="chartData"
                :ontouch="true"/>
          </view>
        </view>
      </u-popup>

  </view>
</template>

<script>
  import { goodsOtherApi} from '@/api/goodsOther'
  import { envSetting } from '@/utils/env.js'
  import { goodsBaseApi} from '@/api/goodsBase'
  import { goodsBaseSizeApi } from '@/api/goodsBaseSize'
  import { goodsBaseSizePriceApi } from '@/api/goodsBaseSizePrice'
  export default {
    components: {
    },
 data() {
      return {
        fileUrl: this.$fileUrl,
        imgevent: '',
        fileList1: [],
        pictureZoomShow: false,
        imageZoom: '',
        defaultIndex: [1],
        queryParam: {
          goodsId: ''
        },
        priceData: {
        },
        isShowDialog2: false,
        queryParam1: {
          goodsId: '',
          sizeId: '',
          dayNum: 30
        },
        columns: [],
        type: '',
        id: '',
        opts: {
          color: ["#409eff", "#00c2c2", "#F56C6C", "#FAC858", "#73C0DE", "#3CA272", "#FC8452",
            "#9A60B4", "#ea7ccc"],
          padding: [15,10,0,15],
          enableScroll: false,
          dataPointShape: false,
          dataLabel: false,
          legend: {},
          xAxis: {
            labelCount: 4,
            rotateLabel: true,
            fontSize: 12,
            rotateAngle: 45,
            disableGrid: true
          },
          yAxis: {
            gridType: "dash",
            dashLength: 2
          },
          extra: {
            line: {
              type: "curve",
              width: 2,
              activeType: "hollow"
            }
          }
        },
        chartData: {},
        loading: false,
        dataEmpty: false,
        sizeTitle: '',
        size: '',
        date: '',
        tableData: [],
        sizeList: [],
        fileSize: 2,
        type: '',
        photo: '',
        options: [],
        requestParam: {
          sizeId: '',
          actNo: ''
        },
        reqCount: 0,
        form: {
          actNo: ''
        },
      }
    },
    onLoad(options) {
      this.listSysDict()
      if (options) {
        this.id = options.id ? options.id : '';
        this.photo = options.photo ? options.photo : '';
        if (this.id) {
          this.getDetailById(this.id)
        }
        if(this.photo){
          setTimeout(()=>{
            this.uploadMaterial()
          },100)
        }
        this.type = options.type ? options.type : ''
      }
    },
    methods: {
      async afterRead(event) {
        uni.showLoading({title: '识别中'});
        this.imgevent = event;
        let lists = [].concat(event.file);
        let fileListLen = this[`fileList${event.name}`].length;
        lists.map((item) => {
          this[`fileList${event.name}`].push({
            ...item,
            status: 'uploading',
            message: '上传中'
          })
        });
        for (let i = 0; i < lists.length; i++) {
          await this.uploadFilePromise(lists[i].url);
          uni.hideLoading();
        }
      },
      uploadMaterial() {
        this.$refs.uUpload.chooseFile()
      },
      uploadFilePromise(url) {
        var _this = this;
        return new Promise((resolve, reject) => {
          let a = uni.uploadFile({
            url: envSetting.baseURL + '/gw/op/v1/file/v2/uploadFileStore',
            filePath: url,
            name: 'file',
            formData: {
              user: 'test'
            },
            success: (res) => {
              //隐藏加载框
              setTimeout(() => {
                let resDta = JSON.parse(res.data);
                if (resDta.sub_code != 1000) {
                  this.$toast('识别失败，请上传10 MB 以内的图片');
                  _this.deletePic(_this.imgevent)
                  resolve(res.data)
                } else {
                  this.$toast('识别成功');
                  this.form = resDta.data ? resDta.data : {}
                  if (this.form.id){
                    this.queryParam.goodsId = this.form.id
                    this.getPage()
                  }
                  resolve(res.data.data)
                }
              }, 1000)
            },
            fail: (res) => {
              this.$toast('识别失败，请上传10 MB 以内的图片');
              resolve(res)
            }
          });
        })
      },
      close() {
        this.isShowDialog2 = false
      },
      submit() {
        if (!this.form.type) {
          this.$toast('类型非空');
          return false
        }
        if (!this.form.price) {
          this.$toast('金额非空');
          return false
        }
        if (!this.form.name) {
          this.$toast('名称非空');
          return false
        }
        if (this.form.price > 0 && this.form.type == 2) {
          this.form.price = 0 - this.form.price
        }
        if (this.type == 2) {
          goodsOtherApi.update(this.form).then(res => {
            if (res.subCode === 1000) {
              this.$toast('操作成功');
              setTimeout(() => {
                this.$navigateTo('/pages/other/index')
              }, 1000)
            } else {
              ``;
              this.$toast(res.subMsg)
            }
          })
        } else {
          goodsOtherApi.add(this.form).then(res => {
            if (res.subCode === 1000) {
              this.$toast('添加成功，即将返回列表');
              setTimeout(() => {
                this.$navigateTo('/pages/other/index')
              }, 1000)
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : [];
        this.typeList = sysDictList.filter(item => item.typeValue == 39);
        this.columns.push(this.typeList)
      },
      gotoAdd() {
        this.$navigateTo('/subPages/pages/goodsBase/goodsAdd?type=3')
      },
      profitData(dayNum) {
        this.queryParam1.dayNum = dayNum
        this.getPriceData()
      },
      rowClick(row) {
        this.size = row.size
        this.getTitle()
        this.queryParam1.goodsId = this.form.id
        this.queryParam1.sizeId = row.sizeId
        this.getPriceData()
        this.isShowDialog2 = true
      },
      getTitle() {
        this.sizeTitle = '尺码：' + this.size  + ' 更新日期：' + this.date
        if (this.size) {
          this.sizeTitle = '尺码：' + this.size
        }
        if (this.date) {
          this.sizeTitle = this.sizeTitle  + ' 更新日期：' + this.date
        }
      },
      getPriceData() {
        goodsBaseSizePriceApi.getPriceData(this.queryParam1).then(res => {
          if (res.subCode === 1000) {
            this.priceData = res.data
            this.dataEmpty = false
            this.loading = false
            this.chartData = JSON.parse(JSON.stringify(res.data.lineVo));
            let theirPrice = this.$getThePrice(res.data.price)
            this.priceData.theirPrice = parseFloat(theirPrice).toFixed(2)

            let theirPrice30 =  this.$getThePrice(res.data.price30)
            this.priceData.theirPrice30 = parseFloat(theirPrice30).toFixed(2)

            let theirPrice180 =  this.$getThePrice(res.data.price180)
            this.priceData.theirPrice180 = parseFloat(theirPrice180).toFixed(2)

            let theirPrice365 =  this.$getThePrice(res.data.price365)
            this.priceData.theirPrice365 = parseFloat(theirPrice365).toFixed(2)
            this.date = this.priceData.date
            this.getTitle()
          } else if (res.subCode === 10086) {
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      getPage() {
        goodsBaseSizeApi.page(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data.list : []
            let totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.form.sizeVoList && this.tableData) {
              for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].sizeId) {
                  this.queryParam1.goodsId = this.form.id
                  this.queryParam1.sizeId = this.tableData[i].sizeId
                  this.size = this.tableData[i].size
                  this.getTitle()
                  this.getPriceData()
                  break
                }
              }
            }
            if (this.form.sizeList && totalCount < this.form.sizeList.length && this.reqCount < 5) {
              setTimeout(()=>{
                this.reqCount ++
                this.getPage()
              },2000)
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      getDetailById(id) {
        if (id) {
          goodsBaseApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {}
              this.queryParam.goodsId = this.form.id
              this.getPage()
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      getImgUrl() {
        if (!this.form.actNo) {
          this.$toast('请输入货号')
          return false
        }
        let data = {actNo: this.form.actNo , sizeId: this.form.sizeId }
        goodsBaseApi.getGoodsByActNoAndSize(data).then(res => {
          if (res.subCode === 1000) {
            this.form = res.data ? res.data : {}
            this.queryParam.goodsId = this.form.id
            this.getPage()
          }else{
            this.$toast(res.subMsg)
          }
        })
      },
    }
  }

</script>

<style lang="less" scoped>
  @import '@/assets/index/style.css';

  .login {
    > view {
      .tip {
        padding: 6vw 3vw;
        color: rgb(224, 145, 71);
        letter-spacing: 2px;
        font-size: 16px;
      }
    }
  }
  .fenlei_top_2 {
    display: -ms-flexbox;
    -ms-flex-align: center;
    -ms-flex-pack: justify;
    background: #fff;
    position: fixed;
    font-size: 14px;
    z-index: 99;
    margin-top: 64px;
  }


  .store-list-1-1 {
    display: -webkit-box;
    margin-top: -15px;
    margin-bottom: 20px;
    text-align: center;
    margin-left: -11px;
  }
  .store-list-1-li-1 {
    border-radius: 10px;
    text-align: center;
    background-color: #EEF2F7;
    width: 24%;
    color: #333;
    font-size: 15px;
    box-sizing: border-box;
    margin-top: 0vw;
    margin-right: 2vw;
    margin-bottom: 0vw;
    margin-left: 0vw;
    padding: 3px;
  }
</style>
