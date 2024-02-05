<template lang="html">
  <view class="login">
    <u-navbar title="新增商品" bgColor="#F3F4F5">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view  @click="gotoAdd(3)" class="u-nav-slot" slot="right" style="font-size: 15px;">
        手动添加
      </view>
    </u-navbar>
    <view class="fenlei_top_2">
      <view class="shoudongtianjia" >
        <view  class="zuoyouduiqi width92">
          <text style="width: 25vw;">是否Nike商品</text>
          <u-radio-group
              activeColor="#409eff"
              v-model="radiovalue1"
              placement="row"
              @change="groupChange"
          >
            <u-radio
                style="margin-right: 10px;"
                activeColor="#409eff"
                v-for="(item, index) in radiolist1"
                :key="index"
                :label="item.name"
                :name="item.name"
                @change="radioChange"
            >
            </u-radio>
          </u-radio-group>
        </view>
      </view>
      <view class="shoudongtianjia" >
        <view  class="zuoyouduiqi width92">
          <text style="width: 25vw;">根据货号获取</text>
          <u--input
              class="searchInput"
              style="width: 58vw;"
              prefixIcon="search"
              placeholder="请输入货号"
              placeholderStyle="font-size: 14px;color:#c0c4cc"
              v-model="form.actNo"
              prefixIconStyle="font-size: 24px;color:#c0c4cc"
              :show-action="false"
              clearable
          >
          </u--input>
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
<!--    v-if="form.id"-->
    <view  class="width92 baisebeijing" style="margin-top :170px;">
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
            <image v-if="form.actNo" @click.stop="$copyUrl(form.actNo)" class="fuzhitupian"
                   src="../../static/img/copy.png"></image>
          </u-form-item>
          <u-form-item label-width="20vw"  label="名称" borderBottom>
            <u--text align="right" :text="form.name"></u--text>
          </u-form-item>
          <u-form-item  label-width="20vw"  label="品牌" borderBottom>
            <u--text align="right" :text="form.brand"></u--text>
          </u-form-item>
<!--          <u-form-item  label-width="20vw"  label="发售日期" borderBottom>-->
<!--            <u&#45;&#45;text align="right" :text="form.sellDate"></u&#45;&#45;text>-->
<!--          </u-form-item>-->
          <u-form-item  label-width="20vw"  label="发售价格">
            <u--text align="right" :text="form.sellPrice"></u--text>
          </u-form-item>


        </view>
      </u--form>
    </view>
<!--    v-if="form.id"-->
    <view style="margin-top:10px;" class="width92">
      <view >
        <view class="my-pay-6" v-if="form.listVoList && form.listVoList.length">
          <view>
            <h5 style="font-size: 17px;margin-left: 15px;font-weight: 600;color: #333333">尺码列表</h5>
          </view>
          <view style="margin-top: 12px;     margin-left: 8px;">
            <view style="text-align: center"
                  class="sizeList"
                  v-for="(item, index) in form.listVoList" :key="item.id">
              <text>
                {{item.size}}
              </text>
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
    <view v-if="form.listVoList && form.listVoList.length && form.id" style="height: 70px"></view>
    <view v-if="form.listVoList && form.listVoList.length && form.id" class="baisebeijing shuipingjuzhong" style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <u-button style="width: 50vw; margin: 10px 15px;" type="primary"  @click="storeAdd">
        <text class="dibuanniuwenzi">商品入库</text>
      </u-button>
    </view>
  </view>
</template>

<script>
  import { envSetting } from '@/utils/env.js'
  import { goodsBaseApi} from '@/api/goodsBase'
  // import { goodsBaseSizeApi } from '@/api/goodsBaseSize'
  // import { goodsBaseSizePriceApi } from '@/api/goodsBaseSizePrice'
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
        radiolist1: [
            {
          name: '是',
          disabled: false
         },
          {
            name: '否',
            disabled: false
          }
        ],
        // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
        radiovalue1: '是',
        isNike: 1,
        columns: [],
        id: '',
        size: '',
        date: '',
        type: '',
        photo: '',
        form: {
          actNo: ''
        },
      }
    },
    onLoad(options) {
      // this.listSysDict()
      if (options) {
        // this.id = options.id ? options.id : '';
        this.photo = options.photo ? options.photo : '';
        // if (this.id) {
        //   this.getDetailById(this.id)
        // }
        if(this.photo){
          setTimeout(()=>{
            this.uploadMaterial()
          },100)
        }
        this.type = options.type ? options.type : ''
      }
    },
    methods: {
      groupChange(n) {
        console.log('groupChange', n);
      },
      radioChange(n) {
        console.log('radioChange', n);
        if (n == '是'){
          this.isNike = 1
        }else{
          this.isNike = 0
        }
      },
      storeAdd() {
        let url = '/pages/store/storeAdd?goodsId=' + this.form.id
        this.$navigateTo(url)
      },
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
        this.resetdata()
        var _this = this;
        return new Promise((resolve, reject) => {
          let a = uni.uploadFile({
            url: envSetting.baseURL + '/gw/op/v1/file/v4/uploadFileStore',
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
                  this.$toast(resDta.sub_msg + "，请手动添加商品");
                  // if (resDta.sub_code == 1234) {
                    setTimeout(() => {
                      this.gotoAdd(3)
                    }, 3000)
                  // }
                  _this.deletePic(_this.imgevent)
                  resolve(res.data)
                } else {
                  this.$toast('识别成功');
                  this.form = resDta.data ? resDta.data : {}
                  // if (this.form.id){
                  //   this.queryParam.goodsId = this.form.id
                  //   this.getPage()
                  // }
                  // this.queryParam.goodsId = this.form.id
                  // if (this.form.sizeList && this.form.sizeList.length){
                  //   this.getPage()
                  // // }else{
                  // //   this.getDetailById(this.form.id)
                  // }
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
      // close() {
      //   this.isShowDialog2 = false
      // },
      // submit() {
      //   if (!this.form.type) {
      //     this.$toast('类型非空');
      //     return false
      //   }
      //   if (!this.form.price) {
      //     this.$toast('金额非空');
      //     return false
      //   }
      //   if (!this.form.name) {
      //     this.$toast('名称非空');
      //     return false
      //   }
      //   if (this.form.price > 0 && this.form.type == 2) {
      //     this.form.price = 0 - this.form.price
      //   }
      //   if (this.type == 2) {
      //     goodsOtherApi.update(this.form).then(res => {
      //       if (res.subCode === 1000) {
      //         this.$toast('操作成功');
      //         setTimeout(() => {
      //           this.$navigateTo('/pages/other/index')
      //         }, 1000)
      //       } else {
      //         ``;
      //         this.$toast(res.subMsg)
      //       }
      //     })
      //   } else {
      //     goodsOtherApi.add(this.form).then(res => {
      //       if (res.subCode === 1000) {
      //         this.$toast('添加成功，即将返回列表');
      //         setTimeout(() => {
      //           this.$navigateTo('/pages/other/index')
      //         }, 1000)
      //       } else {
      //         this.$toast(res.subMsg)
      //       }
      //     })
      //   }
      // },
      // listSysDict() {
      //   let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
      //       uni.getStorageSync('sysDictList')) : [];
      //   this.typeList = sysDictList.filter(item => item.typeValue == 39);
      //   this.columns.push(this.typeList)
      // },
      gotoAdd(type) {
        let url = '/pages/goodsBase/goodsAdd?type='+type
        if (this.form.actNo){
          url = url+"&actNo="+this.form.actNo
        }
        if (this.form.id){
          url = url+"&id="+this.form.id
        }
        this.$navigateTo(url)
      },
      // profitData(dayNum) {
      //   this.queryParam1.dayNum = dayNum
      //   this.getPriceData()
      // },
      // rowClick(row) {
      //   this.size = row.size
      //   this.getTitle()
      //   this.queryParam1.goodsId = this.form.id
      //   this.queryParam1.sizeId = row.sizeId
      //   this.getPriceData(1)
      // },
      // getTitle() {
      //   this.sizeTitle = '尺码：' + this.size  + ' 更新日期：' + this.date
      //   if (this.size) {
      //     this.sizeTitle = '尺码：' + this.size
      //   }
      //   if (this.date) {
      //     this.sizeTitle = this.sizeTitle  + ' 更新日期：' + this.date
      //   }
      // },
      // getPriceData(flag) {
      //   goodsBaseSizePriceApi.getPriceData(this.queryParam1).then(res => {
      //     if (res.subCode === 1000) {
      //       this.priceData = res.data
      //       this.dataEmpty = false
      //       this.loading = false
      //       this.chartData = JSON.parse(JSON.stringify(res.data.lineVo));
      //       let theirPrice = this.$getThePrice(res.data.price)
      //       this.priceData.theirPrice = parseFloat(theirPrice).toFixed(2)
      //
      //       let theirPrice30 =  this.$getThePrice(res.data.price30)
      //       this.priceData.theirPrice30 = parseFloat(theirPrice30).toFixed(2)
      //
      //       let theirPrice180 =  this.$getThePrice(res.data.price180)
      //       this.priceData.theirPrice180 = parseFloat(theirPrice180).toFixed(2)
      //
      //       let theirPrice365 =  this.$getThePrice(res.data.price365)
      //       this.priceData.theirPrice365 = parseFloat(theirPrice365).toFixed(2)
      //       this.date = this.priceData.date
      //       this.getTitle()
      //       if(flag){
      //         this.isShowDialog2 = true
      //       }
      //     } else if (res.subCode === 10086) {
      //     } else {
      //       this.$toast(res.subMsg)
      //     }
      //   })
      // },
      // getPage() {
      //   goodsBaseSizeApi.page(this.queryParam).then(res => {
      //     if (res.subCode === 1000) {
      //       this.tableData = res.data ? res.data.list : []
      //       // let totalCount = res.data ? res.data.pageInfo.totalCount : 0
      //       // if (this.form.sizeList && this.tableData) {
      //       //   for (let i = 0; i < this.tableData.length; i++) {
      //       //     if (this.tableData[i].sizeId) {
      //       //       this.queryParam1.goodsId = this.form.id
      //       //       this.queryParam1.sizeId = this.tableData[i].sizeId
      //       //       this.size = this.tableData[i].size
      //       //       this.getTitle()
      //       //       this.getPriceData()
      //       //       break
      //       //     }
      //       //   }
      //       // }
      //       // if (this.form.sizeList && totalCount < this.form.sizeList.length && this.reqCount < 3) {
      //       //   setTimeout(()=>{
      //       //     this.reqCount ++
      //       //     this.getPage()
      //       //   },2000)
      //       // }
      //     } else {
      //       this.$toast(res.subMsg)
      //     }
      //   })
      // },
      // getDetailById(id) {
      //   if (id) {
      //     goodsBaseApi.getDetailById(id).then(res => {
      //       if (res.subCode === 1000) {
      //         this.form = res.data ? res.data : {}
      //         this.queryParam.goodsId = this.form.id
      //
      //         if (this.form.sizeList && this.form.sizeList.length){
      //           this.getPage()
      //         }else{
      //           this.$toast("暂无尺码信息，请手动添加尺码")
      //           setTimeout(() => {
      //             let url = '/pages/goodsBase/chooseSize?goodsId='+this.form.id
      //             this.$navigateTo(url)
      //           }, 2000)
      //         }
      //       } else {
      //         this.$toast(res.subMsg)
      //       }
      //     })
      //   }
      // },

      resetdata() {
        let actNo= this.form.actNo
        this.form = {}
        this.form.actNo = actNo
      },
      getImgUrl() {
        if (!this.form.actNo) {
          this.$toast('请输入货号')
          return false
        }
        uni.showLoading({title: '获取中'});
        this.resetdata()
        let data = {actNo: this.form.actNo}
        data.isNike = this.isNike
        goodsBaseApi.getGoodsByActNoAndSizeH5V4(data).then(res => {
          uni.hideLoading();
          if (res.subCode == 1000) {
            this.$toast("获取成功")
            this.form = res.data ? res.data : {}
          }else{
            this.$toast(res.subMsg + "，请手动添加商品")
            setTimeout(() => {
              this.gotoAdd(3)
            }, 3000)
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
    margin-top: 43px;
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
  .sizeList {
    width: 58px;
    border-radius: 5px;
    font-size: 14px;
    background-color: #F6F6F6;
    padding: 6px 0px;
    margin-right: 6px;
    margin-bottom: 13px;
    display: inline-block;
  }
</style>
