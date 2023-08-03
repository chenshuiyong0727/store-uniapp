<template lang="html">
  <view class="login">
    <u-navbar title="新增商品" bgColor="#F3F4F5">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view  @click="gotoAdd(null,3)" class="u-nav-slot" slot="right" style="font-size: 15px;">
        手动添加
      </view>
    </u-navbar>
    <view class="fenlei_top_2">
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
          >
            <text style="margin-left: 2vw;" class="color-url">拍摄照片</text>
          </u-upload>
        </view>
      </view>
    </view>


    <view class="width92" style="margin-top :131px;">
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
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="form.img" alt=""  class="showImg">
      </div>
    </div>
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
        queryParam1: {
          goodsId: '',
          sizeId: '',
          dayNum: 30
        },
        columns: [],
        type: '',
        id: '',
        chartData: {
          columns: ['date', 'price'],
          rows: []
        },
        loading: false,
        dataEmpty: false,
        sizeTitle: '',
        size: '',
        date: '',
        tableData: [],
        sizeList: [],
        fileSize: 2,
        type: '',
        id: '',
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
      if (options) {
        this.id = options.id ? options.id : '';
        if (this.id) {
          this.getDetailById(this.id)
        }else{
          this.getDetailById('1249050008221782016')
        }
        this.type = options.type ? options.type : ''
      }
    },
    // created() {
    //   const {id, type,flag,photo} = this.$route.query
    //   this.flag = flag
    //   this.id = id
    //   this.photo = photo
    //   this.type = type
    //   this.form.id = id
    //   if (this.id) {
    //     this.getDetailById(this.id)
    //   }
    //   if(this.photo){
    //     setTimeout(()=>{
    //       this.uploadMaterial()
    //     },200)
    //   }
    // },
    mounted() {
      this.listSysDict()
    },
    methods: {
      async afterRead(event) {
        console.info(event);
        this.imgevent = event;
        // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
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
          // const result = await this.uploadFilePromise(lists[i].url);
          // let item = this[`fileList${event.name}`][fileListLen];
          // this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
          //   status: 'success',
          //   message: '',
          //   url: result
          // }));
          // fileListLen++
        }
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
              setTimeout(() => {
                let resDta = JSON.parse(res.data);
                if (resDta.sub_code != 1000) {
                  this.$toast('上传失败，请上传10 MB 以内的图片');
                  _this.deletePic(_this.imgevent)
                } else {
                  this.$toast('上传成功');
                  this.form.imgUrl = resDta.data;
                  resolve(res.data.data)
                }
              }, 1000)
            }
          });
        })
      },
      // getDetailById(id) {
      //   if (id) {
      //     goodsOtherApi.getDetailById(id).then(res => {
      //       if (res.subCode === 1000) {
      //         this.form = res.data ? res.data : {};
      //         if (this.form.imgUrl) {
      //           let url = this.$fileUrl + this.form.imgUrl;
      //           let data1 = {};
      //           data1.url = url;
      //           this.fileList1.push(data1)
      //         }
      //         if (this.form.type){
      //           this.form.typeStr = this.$typeToStr(39,this.form.type)
      //           this.defaultIndex = [this.$getTypeIndex(39,this.form.type)]
      //         }
      //       } else {
      //         this.$toast(res.subMsg)
      //       }
      //     })
      //   }
      // },
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
              this.$toast('操作成功,即将返回列表');
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
      gotoAdd(id, type) {
        this.$router.push({ path: '/goodsAdd', query: {id,type } })
      },
      profitData(dayNum) {
        if (dayNum == 30) {
          this.type30 = 'primary'
          this.type180 = 'default'
          this.type365 = 'default'
        } else if (dayNum == 180) {
          this.type180 = 'primary'
          this.type30 = 'default'
          this.type365 = 'default'
        }else {
          this.type365 = 'primary'
          this.type180 = 'default'
          this.type30 = 'default'
        }
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
            let rows = res.data ? res.data.list : []
            this.chartData.rows = rows
            console.info(this.chartData.rows)
            let theirPrice = res.data.price - (res.data.price * 0.075 + 38 + 8.5)
            this.priceData.theirPrice = parseFloat(theirPrice).toFixed(2)

            let theirPrice30 = res.data.price30 - (res.data.price30 * 0.075 + 38 + 8.5)
            this.priceData.theirPrice30 = parseFloat(theirPrice30).toFixed(2)

            let theirPrice180 = res.data.price180 - (res.data.price180 * 0.075 + 38 + 8.5)
            this.priceData.theirPrice180 = parseFloat(theirPrice180).toFixed(2)

            let theirPrice365 = res.data.price365 - (res.data.price365 * 0.075 + 38 + 8.5)
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
              console.info(this.reqCount)
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
              // this.getImgUrl()
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      gotoAdd(id, type) {
        this.$router.push({path: '/goodsAdd', query: {id, type}})
      },
      getImgUrl() {
        if (!this.form.actNo) {
          this.$toast('请输入货号')
          return false
        }
        let data = {actNo: this.form.actNo , sizeId: this.form.sizeId }
        goodsBaseApi.getGoodsByActNoAndSizeH5(data).then(res => {
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
    > section {
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
    margin-top: 11.6vw;
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
    font-size: 16px;
    box-sizing: border-box;
    margin-top: 0vw;
    margin-right: 2vw;
    margin-bottom: 0vw;
    margin-left: 0vw;
    padding: 3px;
  }
</style>
