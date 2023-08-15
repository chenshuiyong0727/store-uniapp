<template lang="html">
  <view class="login">
    <u-navbar title="用户信息" bgColor="#F3F4F5">
      <view @click="goBackReflash" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view @click="submit" class="u-nav-slot" slot="right" style="font-size: 15px;">
        保存
      </view>
    </u-navbar>
    <u--form
        style="background-color: white"
        class="julibiaoti"
        labelPosition="left"
        :model="form"
        :rules="rules"
        ref="uForm"
    >
      <view style="width: 90vw;margin-left: 5vw;">
        <u-form-item
            label="头像"
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
          <u-icon
              class="biaodan-gengduo"
              slot="right"
              name="arrow-right"
          ></u-icon>
        </u-form-item>
        <u-form-item
            label="账号"
            borderBottom
            ref="item1"
        >
          <u--input
              :disabled="true"
              color="#d1d1d1"
              disabledColor="#fff"
              inputAlign="right"
              v-model="form.userAccount"
              border="none"
          ></u--input>
          <u-icon
              class="biaodan-gengduo"
              slot="right"
              name="arrow-right"
          ></u-icon>
        </u-form-item>
        <u-form-item
            label-width="150"
            label="手机号"
            borderBottom
            ref="item1"
        >
          <u--input
              color="#717171"
              inputAlign="right"
              v-model="form.userMobile"
              border="none"
          ></u--input>
          <u-icon
              class="biaodan-gengduo"
              slot="right"
              name="arrow-right"
          ></u-icon>
        </u-form-item>
        <u-form-item
            label="姓名"
            ref="item1"
        >
          <u--input
              color="#717171"
              inputAlign="right"
              v-model="form.userRealName"
              border="none"
          ></u--input>
          <u-icon
              class="biaodan-gengduo"
              slot="right"
              name="arrow-right"
          ></u-icon>
        </u-form-item>
      </view>
    </u--form>
  </view>
</template>

<script>
  import {envSetting} from '@/utils/env.js'
  export default {
    data() {
      return {
        fileList1: [],
        form: {
          userMobile: '',
          userAccount: '',
          userRealName: '',
          imgUrl: ''
        },
        actionUrl: envSetting.baseURL + '/gw/op/v1/file/uploadFileMinio',
        fileUrl: envSetting.fileUrl,
        imgevent: '',
        type: '',
        showSex: false,
        rules: {
          'userRealName': {
            type: 'string',
            required: true,
            message: '请输入姓名',
            trigger: ['blur', 'change']
          },
          'userMobile': {
            type: 'string',
            required: true,
            message: '请输入用户手机',
            trigger: ['blur', 'change']
          },
          'userAccount': {
            type: 'string',
            required: true,
            message: '请输入账号',
            trigger: ['blur', 'change']
          },
          'sex': {
            type: 'string',
            max: 1,
            required: true,
            message: '请选择男或女',
            trigger: ['blur', 'change']
          },
        },
        actions: [{
          name: '男',
        },
          {
            name: '女',
          },
          {
            name: '保密',
          },
        ],
      }
    },
    created() {
      this.getUcUser()
    },
    methods: {
      goBackReflash() {
          uni.reLaunch({
            url: '/pages/my/index',
          });
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
            url: this.actionUrl, // 仅为示例，非真实的接口地址
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
                  uni.setStorageSync('userIcon', this.form.imgUrl);
                  this.$request({
                    url: '/gw/op/v1/auth/update',
                    method: 'put',
                    data: this.form
                  }).then(res => {
                    if (res.subCode === 1000) {
                    } else {
                      this.$toast(res.subMsg)
                    }
                  })
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
      // hideKeyboard() {
      //   uni.hideKeyboard()
      // },
      getUcUser() {
        this.$request({
          url: '/gw/op/v1/auth/getUcUser',
          method: 'get'
        }).then(res => {
          if (res.subCode === 1000) {
            this.form = res.data ? res.data : {};
            if (this.form.imgUrl) {
              let url = this.fileUrl + this.form.imgUrl;
              let data1 = {};
              data1.url = url;
              this.fileList1.push(data1)
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },

      submit() {
        if (!this.form.imgUrl) {
          this.$toast('请上传头像');
          return false
        }
        if (!this.form.userMobile) {
          this.$toast('请输入手机');
          return false
        }
        if (!this.form.userRealName) {
          this.$toast('请输入姓名');
          return false
        }
        this.$request({
          url: '/gw/op/v1/auth/update',
          method: 'put',
          data: this.form
        }).then(res => {
          if (res.subCode === 1000) {
            this.$toast('修改成功');
            setTimeout(() => {
              this.goBackReflash()
            }, 1000)
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
    }
  }

</script>

<style>
  @import '@/assets/index/style.css';

</style>
