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

      <section class="login_form" style="margin-top: 30px">
        <u--input
            :password-icon="true"
            class="common-input"
            style="width: 70vw;margin-top: 10px"
            placeholder="原密码"
            prefixIcon="lock"
            type="password"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            prefixIconStyle="font-size: 22px;color:#c0c4cc"
            clearable
            v-model="param.oldPwd">
        </u--input>
        <u--input
            :password-icon="true"
            class="common-input"
            style="width: 70vw;margin-top: 10px"
            placeholder="新密码"
            prefixIcon="lock"
            type="password"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            prefixIconStyle="font-size: 22px;color:#c0c4cc"
            clearable
            v-model="param.newPwd">
        </u--input>
        <u--input
            :password-icon="true"
            class="common-input"
            style="width: 70vw;margin-top: 10px"
            placeholder="确认密码"
            prefixIcon="lock"
            type="password"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            prefixIconStyle="font-size: 22px;color:#c0c4cc"
            clearable
            v-model="param.confirmPwd">
        </u--input>

<!--        <el-input-->
<!--          show-password-->
<!--          style="margin-top: 10px"-->
<!--          placeholder="原密码"-->
<!--          prefix-icon="el-icon-warning"-->
<!--          type="password"-->
<!--          v-model="param.oldPwd">-->
<!--        </el-input>-->
<!--        <el-input-->
<!--          show-password-->
<!--          style="margin-top: 10px"-->
<!--          placeholder="新密码"-->
<!--          prefix-icon="el-icon-warning"-->
<!--          type="password"-->
<!--          v-model="param.newPwd">-->
<!--        </el-input>-->
<!--        <el-input-->
<!--          show-password-->
<!--          style="margin-top: 10px"-->
<!--          placeholder="确认密码"-->
<!--          prefix-icon="el-icon-warning"-->
<!--          type="password"-->
<!--          v-model="param.confirmPwd">-->
<!--        </el-input>-->
      </section>
<!--      <div class="clearfix btm-distance">-->
<!--        <el-button style="margin-top: 25px;" type="primary" @click="modifyPwd" >确认修改</el-button>-->
<!--        <el-button  @click="$router.go(-1)" >取消</el-button>-->
<!--                </div>-->

      <view class=" btm-distance">
        <u-button style="margin-top: 25px;    width: 50vw;" type="primary" @click="modifyPwd">
          <text style=" font-size: 16px;font-weight: 600">确认修改</text>
        </u-button>
<!--        <view style="margin-top: 25px;    width: 50vw; text-align: center"  @click="loginByCode">-->
<!--          <text class="color-url" style=" font-size: 16px;">验证码登录</text>-->
<!--        </view>-->
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
          this.$navigateTo('/subPages/pages/login/index')
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
