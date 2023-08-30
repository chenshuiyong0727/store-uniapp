<template lang="html">
  <view class="login">
    <u-navbar :title="type==1 ? '查看' : type==2 ? '编辑' : '新增'" bgColor="#F3F4F5">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <image class="back_icon" :src="fileUrl +'/static/img/back3.png'"></image>
      </view>
    </u-navbar>
    <u--form
        style="background-color: white"
        class="julibiaoti"
        labelPosition="left"
        :model="form"
        ref="uForm"
    >
      <view style="width: 90vw;margin-left: 5vw;">
        <u-form-item
            label="图片"
            borderBottom
            label-width="66vw"
            ref="item1"
        >
          <u-upload
              style="border-radius: 100%;"
              :fileList="fileList1"
              @afterRead="afterRead"
              @delete="deletePic"
              name="1"
              multiple
              :maxCount="1"
              :width="70"
              :height="70"
          >
          </u-upload>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw"  label="类型" borderBottom @click="showSxType(); $hideKeyboard()">
          <u--input inputAlign="right" disabledColor="#fff"
                    placeholderStyle="font-size: 14px;color:#c0c4cc"
                    v-model="form.typeStr" border="none" disabled></u--input>
          <u-icon v-if="type != 1"  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw" label="名称" borderBottom>
          <u--input :disabled="type == 1" disabledColor="#fff" inputAlign="right"
                    v-model="form.name" border="none"></u--input>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw" label="货号" borderBottom>
          <u--input :disabled="type == 1" disabledColor="#fff" inputAlign="right"
                    v-model="form.actNo" border="none"></u--input>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw" label="品牌" borderBottom>
          <u--input :disabled="type == 1" disabledColor="#fff" inputAlign="right"
                    v-model="form.brand" border="none"></u--input>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw" label="发售日期" borderBottom>
          <u--input :disabled="type == 1" disabledColor="#fff" inputAlign="right"
                    v-model="form.sellDate"  border="none"></u--input>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw" label="发售价格" borderBottom>
          <u--input :disabled="type == 1" disabledColor="#fff" inputAlign="right"
                    v-model="form.sellPrice" type="digit" border="none"></u--input>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw" label="尺码" borderBottom>
          <rudon-multiSelector :is_using_slot="true" :localdata="options" @change="whenChanged">
            <view>
              <u--input inputAlign="right" disabledColor="#fff"
                        placeholderStyle="font-size: 14px;color:#c0c4cc"
                        v-model="sizeListStr" border="none" disabled></u--input>
            </view>
          </rudon-multiSelector>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw" label="备注" borderBottom>
          <u--textarea
              :disabled="type == 1"
              v-model="form.remark"
              count
          ></u--textarea>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </view>
    </u--form>
    <u-picker :show="show_sx_type" :columns="columns" @cancel="show_sx_type= false" :defaultIndex="defaultIndex"
              @confirm="confirm_sx_type" keyName="fieldName"></u-picker>
    <view class="baisebeijing " v-if="type != 1" style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <view class="shuipingjuzhong">
        <u-button style="width: 50vw; margin: 10px 15px;"    type="primary" @click="submit">
          <text class="dibuanniuwenzi">确认保存</text>
        </u-button>
      </view>
    </view>
  </view>
</template>

<script>
  import { goodsBaseApi } from '@/api/goodsBase'
  export default {
    data(){
      return {
        fileUrl: this.$fileUrl,
        fileList1: [],
        show_sx_type: false,
        defaultIndex: [1],
        props: {
          lazy: false,
          multiple: true
        },
        type: '',
        id: '',
        options: [
        ],
        uploadData: {},
        typeList: [],
        sizeVoList: [],
        columns: [],
        sizeListStr: '',
        form: {
          type: '01',
          typeStr: '男鞋',
          actNo: '',
          addressId: '',
          name: '',
          imgUrl: '',
          sellPrice: '',
          sellDate: '',
          brand: 'Nike',
          remark: '',
          sizeList: []
        },
      }
    },
    onLoad(options) {
      if (options) {
        this.type = options.type ? options.type : '';
        this.id = options.id ? options.id : '';
        if (this.id) {
          this.getDetailById(this.id)
        }else{
          this.listSysDict()
        }
      }
    },
    methods:{
      whenChanged(e) {
        let sizeList = []
        let sizeListStr = []
        for (let i = 0; i < e.length; i++) {
          let data = e[i]
          if (data.is_selected) {
            sizeList.push(data.value)
            sizeListStr.push(data.text)
          }
        }
        this.form.sizeList = sizeList
        this.sizeListStr = sizeListStr.join(",")
      },
      getDetailById(id) {
        if (id) {
          goodsBaseApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {}
              this.form.sizeList = []
              this.sizeVoList = res.data.sizeVoList

              let sizeList = []
              let sizeListStr = []
              for (let i = 0; i <  this.sizeVoList.length; i++) {
                let data =  this.sizeVoList[i]
                  sizeList.push(data.id)
                  sizeListStr.push(data.size)
              }
              this.form.sizeList = sizeList
              this.sizeListStr = sizeListStr.join(",")

              this.listSysDict()
              if (this.form.imgUrl) {
                let url = this.$fileUrl + this.form.imgUrl;
                let data1 = {};
                data1.url = url;
                this.fileList1.push(data1)
              }
              if (this.form.type){
                this.form.typeStr = this.$typeToStr(20221108,this.form.type)
                this.defaultIndex = [this.$getTypeIndex(20221108,this.form.type)]
              }
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      submit() {
        if (!this.form.type) {
          this.$toast('类型非空')
          return false
        }
        if (!this.form.actNo) {
          this.$toast('货号非空')
          return false
        }
        if (!this.form.sizeList.length) {
          this.$toast('请选择尺码')
          return false
        }
        if (this.type == 2) {
          goodsBaseApi.update(this.form).then(res => {
            if (res.subCode === 1000) {
              this.$toast('操作成功')
              setTimeout(() => {
                this.$navigateTo('/pages/goodsBase/index')
              }, 1000)
            } else {
              this.$toast(res.subMsg)
            }
          })
        } else {
          goodsBaseApi.add(this.form).then(res => {
            if (res.subCode === 1000) {
              this.$toast('添加成功，即将返回列表')
              // this.goBack()
              setTimeout(() => {
                this.$navigateTo('/pages/goodsBase/index')
              }, 1000)
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.columns.push(this.typeList)
        goodsBaseApi.listDropDownSizes().then(res => {
          if (res.subCode === 1000) {
            res.data.map(item => {
              this.options.push( {
                is_selected: false,
                value: item.id,
                text: item.size
              })
            })
          }
        })
      },
      // 登录按钮
      getImgUrl(actNo) {
        if (!actNo) {
          this.$toast('请输入货号')
          return false
        }
        fileApi.getImgUrl({ actNo }).then(res => {
          if (res.subCode === 1000) {
            this.$toast(res.subMsg)
            this.form.imgUrl = res.data.url
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      showSxType() {
        if (this.type ==1){
          return
        }
        this.show_sx_type = true
      },
      confirm_sx_type(e) {
        this.show_sx_type = false
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.form.type = fieldValue
        this.form.typeStr = fieldName
      },
      deletePic(event) {
        this[`fileList${event.name}`].splice(event.index, 1)
      },
      async afterRead(event) {
        uni.showLoading({title: '上传中'});
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
          const result = await this.uploadFilePromise(lists[i].url);
          uni.hideLoading();
          let item = this[`fileList${event.name}`][fileListLen];
          this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            status: 'success',
            message: '',
            url: result
          }));
          fileListLen++
        }
      },
      uploadFilePromise(url) {
        var _this = this;
        return new Promise((resolve, reject) => {
          let a = uni.uploadFile({
            url: this.$actionUrl, // 仅为示例，非真实的接口地址
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
            },
            fail: (res) => {
              this.$toast('上传失败，请上传10 MB 以内的图片');
              resolve(res)
            }
          });
        })
      },
    }
  }

</script>

<style lang="less" scoped>
  @import '@/assets/index/style.css';

  .login {
    >section {
      .tip {
        padding: 6vw 3vw;
        color:rgb(224, 145, 71);
        letter-spacing: 2px;
        font-size: 16px;
      }
    }
  }

</style>
