<template lang="html">
  <div class="login_new">
    <u-navbar title="修改密码">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
    </u-navbar>
    <div style="
    font-size: 10px;
    padding-top: 15vw;
    padding-left: 4vw;
    max-width: 264px!important;
    max-height: 494px!important;
    margin: 42px auto!important;
    width: 100%!important;
    height: 336px!important;
    display: flex;
    flex-direction: column;
    align-items: center;
" >
      <h5 style="font-size: 15px;margin-top: 40px;color: #999;">当前账号</h5>
      <h5 style="font-size: 35px; font-weight: 600; margin-top: 20px;">{{
        userName ? userName : '系统用户'
        }}</h5>

      <view class="login_form" style="width: 70vw;margin-top: 30px">
        <view  class="baisebeijing">
          <u--input
              :password-icon="true"
              placeholder="原密码"
              prefixIcon="lock"
              type="password"
              placeholderStyle="font-size: 14px;color:#c0c4cc"
              prefixIconStyle="font-size: 22px;color:#c0c4cc"
              clearable
              v-model="param.oldPwd">
          </u--input>
        </view>
        <view  class="baisebeijing"  style="margin-top: 10px">
        <u--input
            :password-icon="true"
            placeholder="新密码"
            prefixIcon="lock"
            type="password"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            prefixIconStyle="font-size: 22px;color:#c0c4cc"
            clearable
            v-model="param.newPwd">
        </u--input>
        </view>
        <view  class="baisebeijing"  style="margin-top: 10px">
        <u--input
            :password-icon="true"
            placeholder="确认密码"
            prefixIcon="lock"
            type="password"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            prefixIconStyle="font-size: 22px;color:#c0c4cc"
            clearable
            v-model="param.confirmPwd">
        </u--input>
        </view>
      </view>

      <view  style="margin-top: 25px;">
        <u-button style="  width: 50vw;" type="primary" @click="modifyPwd">
          <text style=" font-size: 16px;font-weight: 600">确认修改</text>
        </u-button>
      </view>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: uni.getStorageSync('user_name'),
      param: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      }
    }
  },
  methods: {
    // 登录按钮
    modifyPwd() {
      let userId = uni.getStorageSync('user_id')
      this.$request({
        url: '/gw/op/v1/sys/users/updateUserPwd',
        method: 'post',
        data: {...this.param, id: userId}
      }).then(async res => {
        if (res.subCode === 1000) {
          this.$toast('修改成功，即将重新登录');
          setTimeout(() => {
            this.logout()
          }, 1000)
        } else {
          this.$toast(res.subMsg)
        }
      })
    },
    logout() {
      this.$request({
        url: '/gw/op/v1/sys/users/logout',
        method: 'get'
      }).then(res => {
        if (res.subCode === 1000) {
          uni.clearStorageSync();
          uni.showToast({
            title: '退出登录成功',
            icon: 'none'
          });
          this.$navigateTo('/pages/login/index')
        }
      })
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
    background-color: #F8FCFF;
  }
  /*.login {*/
  /*  >view {*/
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
.login {
  >view {
    .tip {
      padding: 6vw 3vw;
      color:rgb(224, 145, 71);
      letter-spacing: 2px;
      font-size: 16px;
    }
  }
}
</style>
