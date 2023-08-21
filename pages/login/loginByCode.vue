<template>
  <view class="login_new">
    <view class="login_new_welcome">
      <!-- #ifndef MP-WEIXIN-->
      <view style="position:relative;">
        <image class="login_new_welcome_image" src="../../static/img/logo/logo.png"></image>
        <h5 class="login_new_welcome_text">欢迎来到移动仓库</h5>
      </view>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN-->
      <view style="text-align: center;">
        <image class="login_new_welcome_image_mp" src="../../static/img/logo/logo.png"></image>
        <h5 class="login_new_welcome_text">欢迎来到移动仓库</h5>
      </view>
      <!-- #endif -->

      <view class="login_form " style="width: 70vw;margin-top: 30px">
        <view class="baisebeijing">
        <u--input
            class="common-input"
            prefixIcon="account"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            placeholder="请输入账号"
            v-model="loginForm.loginAccount"
            prefixIconStyle="font-size: 22px;color:#c0c4cc"
            clearable
        >
        </u--input>
        </view>
        </view>
        <view class="baisebeijing xianglian"  style="width: 70vw;margin-top: 10px">
          <view style="width: 70vw">
            <u--input
                class="common-input"
                prefixIcon="lock-fill"
                placeholderStyle="font-size: 14px;color:#c0c4cc"
                placeholder="请输入验证码"
                v-model="loginForm.verifyCode"
                prefixIconStyle="font-size: 22px;color:#c0c4cc"
            >
            </u--input>
          </view>
          <view  style="text-align: right;
    margin-left: -29vw;
    z-index: 2;
    width: 29vw;
    font-size: 13px;">
            <text style="margin-right: 8px;padding: 4px 10px;  border: 1px solid #409eff;    border-radius: 3px;
  color: #409eff !important;" v-if="countDownNum == 60 || countDownNum == 0" @click="getCode"  class="color-url" >{{codeText}}</text>
            <text style="margin-right: 15px;color: #b8bbbf" v-else >{{countDownNum}} 秒</text>
          </view>
      </view>
      <view style="margin-top: 25px;">
        <u-button style="  width: 50vw;" type="primary" @click="login">
          <text style=" font-size: 16px;font-weight: 600">登录</text>
        </u-button>
        <view style="margin-top: 25px;    width: 50vw; text-align: center"  @click="loginByCode">
          <text class="color-url" style=" font-size: 16px;">账号密码登录</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import {deepCopy} from '@/utils'

  export default {
 data() {
      return {
        fileUrl: this.$fileUrl,
        tips: '',
        value: '',
        countDownNum:60,
        codeText:"获取验证码",
        isSend: 0,
        loginForm: {
          loginAccount: '',
          verifyCode: '',
          accountType: 1,
          loginSystem: '12'
        },
      }
    },
    components: {},
    mounted() {
      let org_token_auth = uni.getStorageSync('org_token_auth');
      if (org_token_auth) {
        uni.showToast({title: '您处于登录状态，自动为您跳转到首页', icon: 'none',});
        this.$navigateTo('/pages/index/index')
      }
    },
    methods: {
      countDown:function(){
        this.timer=setInterval(() => {
          this.countDownNum--;
          if(this.countDownNum<=0){
            clearInterval(this.timer);
          }
        },1000);
      },
      getCode(){
        if(this.loginForm.loginAccount=="") {
          this.$toast('账号不能为空');
          return
        }
        let loginInfo = deepCopy(this.loginForm)
        this.$request({
          url: '/gw/op/v1/auth/sendPhoneVal',
          method: 'post',
          data: loginInfo
        }).then(res => {
          if (res.subCode === 1000) {
            this.$toast("发送成功")
            this.countDown()
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      //
      // codeChange(text) {
      //   this.tips = text;
      // },
      // getCode1(){
      //   if(this.loginForm.loginAccount=="") {
      //    this.$toast('账号不能为空');
      //     return
      //   }
      //   let loginInfo = deepCopy(this.loginForm)
      //   userContainerApi.sendPhoneVal(loginInfo).then(res => {
      //     if (res.subCode === 1000) {
      //       Toast("发送成功")
      //       this.countDown()
      //     } else {
      //       Toast(res.subMsg)
      //     }
      //   })
      // },
      // getCode() {
      //   if(this.loginForm.loginAccount=="") {
      //     this.$toast('账号不能为空');
      //     return
      //   }
      //   uni.showLoading({
      //     title: '正在获取验证码'
      //   })
      //   let loginInfo = deepCopy(this.loginForm)
      //   if (this.$refs.uCode.canGetCode) {
      //     // 模拟向后端请求验证码
      //     // userContainerApi.sendPhoneVal(loginInfo)
      //     this.$request({
      //       url: '/gw/op/v1/auth/sendPhoneVal',
      //       method: 'post',
      //       data: loginInfo
      //     }).then(res => {
      //       if (res.subCode === 1000) {
      //         this.$toast("发送成功")
      //         this.$refs.uCode.start();
      //       } else {
      //         this.$toast(res.subMsg)
      //       }
      //     })
      //   } else {
      //     uni.$u.toast('倒计时结束后再发送');
      //   }
      // },
      login() {
        if(this.loginForm.loginAccount=="" || this.loginForm.verifyCode=="") {
          this.$toast('账号，验证码不能为空');
          return
        }
        let loginInfo = deepCopy(this.loginForm);
        this.$request({
          url: '/gw/op/v1/auth/regeditOrLogin',
          method: 'post',
          data: loginInfo
        }).then(res => {
          if (res.subCode === 1000) {
            uni.showToast({title: '登录成功', icon: 'none',});
            if (res.data) {
              const {data} = res;
              uni.setStorageSync('functionList', JSON.stringify(data.functionList));
              uni.setStorageSync('org_token_auth', data.token);
              uni.setStorageSync('tokenExpireTime', data.tokenExpireTime);
              uni.setStorageSync('projectList', JSON.stringify(data.projectList));
              uni.setStorageSync('systemList', JSON.stringify(data.systemList));
              uni.setStorageSync('refresh_org_token_auth', data.refreshToken);
              uni.setStorageSync('user_id', data.userId);
              uni.setStorageSync('user_name', data.userAccount);
              uni.setStorageSync('isActUser', data.isActUser);
              uni.setStorageSync('userRealName', data.userRealName)
              if (data.isActUser == 1) {
                this.$navigateTo('/pages/goodsBase/act')
              }else{
                this.$navigateTo('/pages/index/index')
              }
            }
          } else {
            uni.showToast({title: res.msg, icon: 'none',})
          }
        })
      },
      loginByCode() {
        this.$navigateTo('/pages/login/index')
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '@/assets/index/style.css';

  * {
    /*margin: 0;*/
    /*padding: 0;*/
    box-sizing: border-box;
  }

  /* 这里直接设置 1rem = 50px begin */
  html {
    font-size: 10px;
  }

  /* 这里直接设置 1rem = 50px end */
  html,
  body {
  }

</style>
