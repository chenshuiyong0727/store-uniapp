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
      <view class="login_form" style="width: 70vw;margin-top: 40px">
        <view class="baisebeijing">
          <u--input
              prefixIcon="account"
              placeholderStyle="font-size: 14px;color:#c0c4cc"
              placeholder="请输入账号"
              v-model="loginForm.loginAccount"
              prefixIconStyle="font-size: 22px;color:#c0c4cc"
              clearable
          >
          </u--input>
        </view>
        <view class="baisebeijing" style="width: 70vw;margin-top: 20px">
        <u--input
            :password-icon="passwordIcon"
            placeholder="请输入密码"
            prefixIcon="lock"
            type="password"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            prefixIconStyle="font-size: 22px;color:#c0c4cc"
            clearable
            v-model="loginForm.loginPassword">
        </u--input>
        </view>
<!--        <view class="baisebeijing xianglian"  style="width: 70vw;margin-top: 10px">-->
<!--          <view style="width: 70vw">-->
<!--            <u&#45;&#45;input-->
<!--                class="common-input"-->
<!--                prefixIcon="lock-fill"-->
<!--                placeholderStyle="font-size: 14px;color:#c0c4cc"-->
<!--                placeholder="请输入验证码"-->
<!--                v-model="verifyCode"-->
<!--                prefixIconStyle="font-size: 22px;color:#c0c4cc"-->
<!--            >-->
<!--            </u&#45;&#45;input>-->
<!--          </view>-->
<!--          <view  style="text-align: right;margin-left: -28vw;z-index: 2;width: 28vw;font-size: 13px;" @click="updateImageCode">-->
<!--            <canvas style="width:100px;height:35px;" canvas-id="canvas"></canvas>-->
<!--          </view>-->
<!--        </view>-->
      </view>
      <view  style="margin-top: 25px;">
        <u-button style="    width: 50vw;" type="primary" @click="login">
          <text style=" font-size: 16px;font-weight: 600">登录</text>
        </u-button>
        <view style=" margin-top: 25px; width: 50vw; text-align: center"  @click="loginByCode">
          <text class="color-url" style=" font-size: 16px;">验证码登录</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import {deepCopy, encrypt} from '@/utils'
  import { Mcaptcha  } from '@/utils/mcaptcha'

  export default {
 data() {
      return {
        // verifyCode: '',
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
    // onReady() {
    //   this.mcaptcha = new Mcaptcha({
    //     el: 'canvas',
    //     width: 80,
    //     height: 35,
    //     createCodeImg: ""
    //   });
    // },
    mounted() {
      let org_token_auth = uni.getStorageSync('org_token_auth');
      if (org_token_auth) {
        uni.showToast({title: '您处于登录状态，自动为您跳转到首页', icon: 'none',});
        this.$navigateTo('/pages/index/index')
      }
    },
    methods: {
      // 刷新验证码
      updateImageCode() {
        this.mcaptcha.refresh()
      },
      login() {
        // if(!this.verifyCode) {
        //   return uni.showToast({ icon: 'none',title: '请输入图形验证码' })
        // }
        // let validate = this.mcaptcha.validate(this.verifyCode)
        // if(!validate) {
        //   return uni.showToast({ icon: 'none',title: '图形验证码错误' })
        // }
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
              // #ifdef APP-PLUS
              this.bindCid(data.userId,data.uniPushCid)
              // #endif
            }
          } else {
            uni.showToast({title: res.msg, icon: 'none',})
          }
        })
      },
      bindCid(userId,oldUniPushCid) {
        uni.getPushClientId({
          success: (res) => {
            let push_clientid = res.cid
            console.log('客户端推送标识cid - 登录:',push_clientid)
            uni.setStorageSync('push_clientid', push_clientid);
            if(oldUniPushCid == push_clientid){
              return;
            }
            let data = {}
            data.userId = userId
            if (!data.userId){
              console.info('userid为空')
              return
            }
            data.uniPushCid = push_clientid
            this.$request({
              url: '/gw/op/v1/auth/update',
              method: 'put',
              data: data
            }).then(res => {
              console.info('更新cid ' ,res)
            })
          },
          fail(err) {
            console.log(err)
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
    background-color: #F8FCFF;
  }

</style>
