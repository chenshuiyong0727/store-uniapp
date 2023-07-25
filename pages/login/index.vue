<template>
  <view class="login_new">
    <mt-header title=""></mt-header>
    <view style="
    font-size: 10px;
    padding-top: 15vw;
    padding-left: 0vw;
    max-width: 264px!important;
    max-height: 494px!important;
    margin: 42px auto!important;
    width: 100%!important;
    display: flex;
    flex-direction: column;
    align-items: center;">
      <view>
        <img style="
        margin-left: 72px;
        margin-top: 20px;
    margin-bottom: -3px;
    width: 14.2vw;
    display: block;
    top: 0px;
    left: 0px;
" src="../../static/img/logo/logo.png"></img>
        <h5 style="font-size: 25px; font-weight: 600; margin-top: 17px;">欢迎来到移动仓库</h5>
      </view>

      <section class="login_form" style="margin-top: 30px">
        <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-s-custom"
            v-model="loginForm.loginAccount"
            clearable>
        </el-input>
        <el-input
            show-password
            style="margin-top: 10px"
            placeholder="请输入密码"
            prefix-icon="el-icon-warning"
            type="password"
            clearable
            v-model="loginForm.loginPassword">
        </el-input>
      </section>
      <view class="clearfix btm-distance">
        <el-button style="margin-top: 25px;    width: 50vw;" type="primary" @click="login">登录
        </el-button>
      </view>
      <!-- <view class="clearfix btm-distance">
        <el-button style="margin-top: 15px;    width: 50vw;" type="text" @click="loginByCode">验证码登录</el-button>
      </view> -->
    </view>

  </view>
</template>

<script>
  import navBar from '@/components/nav-bar'
  import {navigateTo} from '@/utils/util.js'
  import {deepCopy, encrypt} from '@/utils'
  // import { initSysDict } from '@/utils/initRequest'
  // import { userContainerApi } from '@/api/user'

  export default {
    data() {
      return {
        loginForm: {
          loginAccount: '',
          loginPassword: '',
          accountType: 1,
          loginSystem: '12'
          // verifyCode: ''
        },
        // account:'',
        // password:'',
        // flag: '',
        // toggle:!this.$store.state.login.token
      }
    },
    components: {
      navBar,
    },
    mounted() {
      let org_token_auth = uni.getStorageSync('org_token_auth');
      if (org_token_auth) {
        uni.showToast({title: '您处于登录状态，自动为您跳转到首页', icon: 'none',})
        navigateTo('/pages/index/index')
      }
    },
    methods: {
      login() {
        if (!this.loginForm.loginAccount || !this.loginForm.loginPassword) {
          uni.showToast({title: '账号密码不能为空', icon: 'none',})
          return
        }
        let loginInfo = deepCopy(this.loginForm)
        loginInfo.loginPassword = encrypt(loginInfo.loginPassword, '58d10555a17a4039')
        this.$request({
          url: '/gw/op/v1/auth/loginH5',
          method: 'post',
          data: loginInfo
        }).then(res => {
          if (res.subCode === 1000) {
            uni.showToast({title: '登录成功', icon: 'none',})
            if (res.data) {
              debugger
              const {data} = res
              uni.setStorageSync('functionList', JSON.stringify(data.functionList))
              uni.setStorageSync('org_token_auth', data.token)
              uni.setStorageSync('tokenExpireTime', data.tokenExpireTime)
              uni.setStorageSync('projectList', JSON.stringify(data.projectList))
              uni.setStorageSync('systemList', JSON.stringify(data.systemList))
              uni.setStorageSync('refresh_org_token_auth', data.refreshToken)
              uni.setStorageSync('user_id', data.userId)
              uni.setStorageSync('user_name', data.userAccount)
              uni.setStorageSync('isActUser', data.isActUser)
              if (data.isActUser == 1) {
                // initSysDict().then(() => {
                //   // this.$router.push({ path: '/goodsAct' })
                // })
              } else {
                navigateTo('/pages/index/index')
                // this.gotopath()
              }
            }
          } else {
            console.info(res)
            uni.showToast({title: res.msg, icon: 'none',})
          }
        })
      },
      // gotopath() {
      //   navigateTo('/pages/index/index"')
      //   // initSysDict().then(() => {
      //   //   this.$router.push({ path: '/' })
      //   // })
      // },

      loginByCode() {
        this.$router.push({path: '/loginByCode'})
      },
      toHome() {
        alert(1)
        navigateTo('/pages/index/index"')
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '@/assets/fz.less';
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
    /*font-family: "微软雅黑";*/
    /*color: #333;*/
    /*background: #fff;*/
  }

  /*.login {*/
  /*  >section {*/
  /*    .tip {*/
  /*      padding: 6vw 3vw;*/
  /*      color:rgb(224, 145, 71);*/
  /*      letter-spacing: 2px;*/
  /*      font-size: 16px;*/
  /*    }*/
  /*  }*/
  /*}*/
  .clearfix {
    &:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }
  }
</style>
