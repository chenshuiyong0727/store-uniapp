<template>
  <view class="login_new">
    <view class="login_new_welcome">
      <view style="position:relative;">
        <image class="login_new_welcome_image" src="../../static/img/logo/logo.png"></image>
        <h5 class="login_new_welcome_text">欢迎来到移动仓库</h5>
      </view>

      <view class="login_form" style="margin-top: 30px">
        <u--input
            class="common-input"
            style="width: 70vw;"
            prefixIcon="account"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            placeholder="请输入账号"
            v-model="loginForm.loginAccount"
            prefixIconStyle="font-size: 22px;color:#c0c4cc"
            clearable
        >
        </u--input>
        <u--input
            :password-icon="passwordIcon"
            class="common-input"
            style="width: 70vw;margin-top: 10px"
            placeholder="请输入密码"
            prefixIcon="lock"
            type="password"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            prefixIconStyle="font-size: 22px;color:#c0c4cc"
            clearable
            v-model="loginForm.loginPassword">
        </u--input>
      </view>
      <view class=" btm-distance">
        <u-button style="margin-top: 25px;    width: 50vw;" type="primary" @click="login">
          <text style=" font-size: 16px;font-weight: 600">登录</text>
        </u-button>
        <view style="margin-top: 25px;    width: 50vw; text-align: center"  @click="loginByCode">
          <text class="color-url" style=" font-size: 16px;">验证码登录</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import {deepCopy, encrypt} from '@/utils'

  export default {
 data() {
      return {
        fileUrl: this.$fileUrl,
        passwordIcon: true,
        loginForm: {
          loginAccount: '',
          loginPassword: '',
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
      login() {
        if (!this.loginForm.loginAccount || !this.loginForm.loginPassword) {
          uni.showToast({title: '账号密码不能为空', icon: 'none',});
          return
        }
        let loginInfo = deepCopy(this.loginForm);
        loginInfo.loginPassword = encrypt(loginInfo.loginPassword, '58d10555a17a4039');
        this.$request({
          url: '/gw/op/v1/auth/loginH5',
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
              } else {
                this.$navigateTo('/pages/index/index')
              }
            }
          } else {
            uni.showToast({title: res.msg, icon: 'none',})
          }
        })
      },
      loginByCode() {
        this.$navigateTo('/pages/login/loginByCode')
      },
    }
  }
</script>

<style lang="less" scoped>
  /*@import '@/assets/fz.less';*/
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
