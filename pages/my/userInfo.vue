<template lang="html">
  <view class="login">
<!--    <mt-header title="用户详情">-->
<!--      <view slot="left">-->
<!--        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>-->
<!--      </view>-->
<!--      <view slot="right">-->
<!--        <mt-button size="normal" style="font-size: 16px"  @click="submit">保存</mt-button>-->
<!--      </view>-->
<!--    </mt-header>-->
    <u-navbar title="用户信息" >
      <view @click="goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view @click="submit" class="u-nav-slot" slot="right">
        保存
      </view>
    </u-navbar>
    <u--form style ="margin-top: 20vw;"
        labelPosition="left"
        :model="form"
        :rules="rules"
        ref="uForm"
    >
      <u-form-item
          label="姓名"
          prop="userRealName"
          borderBottom
          ref="item1"
      >
        <u--input
            v-model="form.userRealName"
            border="none"
        ></u--input>
      </u-form-item>
      <u-form-item
          label="性别"
          prop="sex"
          borderBottom
          @click="showSex = true; hideKeyboard()"
          ref="item1"
      >
        <u--input
            v-model="form.sex"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择性别"
            border="none"
        ></u--input>
        <u-icon
            slot="right"
            name="arrow-right"
        ></u-icon>
      </u-form-item>
    </u--form>
    <u-action-sheet
        :show="showSex"
        :actions="actions"
        title="请选择性别"
        description="如果选择保密会报错"
        @close="showSex = false"
        @select="sexSelect"
    >
    </u-action-sheet>
<!--    <section style="padding-top:46px">-->
<!--      <mt-field-->
<!--        label="头像"-->
<!--      >-->
<!--        <el-upload-->
<!--          :disabled="type == 1 "-->
<!--          class="avatar-uploader"-->
<!--          :action="actionUrl"-->
<!--          :show-file-list="false"-->
<!--          :on-error="handleImageError"-->
<!--          :on-success="handleImageSuccess"-->
<!--          :before-upload="beforeImageUpload"-->
<!--        >-->
<!--          <img-->
<!--            :disabled="type == 1 "-->
<!--            style="height: 30vw;width: 30vw; margin-left: -90vw;"-->
<!--            class="select100"-->
<!--            v-if="form.imgUrl"-->
<!--            :src="fileUrl + form.imgUrl"/>-->
<!--          <el-button :disabled="type == 1 " style=" margin-left: -103vw;" type="text"-->
<!--                     v-else >上传头像-->
<!--          </el-button>-->
<!--        </el-upload>-->
<!--      </mt-field>-->
<!--      <mt-field-->
<!--        :disabled="true"-->
<!--       label="账号"-->
<!--        placeholder="请输入账号"-->
<!--        type = "text"-->
<!--        v-model = "form.userAccount"-->
<!--        >-->
<!--      </mt-field>-->
<!--      <mt-field-->
<!--        :disabled="type == 1 "-->
<!--       label="用户手机"-->
<!--        placeholder="请输入用户手机"-->
<!--        type = "number"-->
<!--        v-model = "form.userMobile"-->
<!--        >-->
<!--      </mt-field>-->
<!--      <mt-field-->
<!--        :disabled="type == 1 "-->
<!--       label="姓名"-->
<!--        placeholder="请输入姓名"-->
<!--        type = "text"-->
<!--        v-model = "form.userRealName"-->
<!--        >-->
<!--      </mt-field>-->
<!--    </section>-->


  </view>
</template>

<script>
// import Header from '@/common/_header.vue'
import { envSetting } from '@/utils/env.js'
// import { userContainerApi } from '@/api/user'
// import * as imageConversion from 'image-conversion'
// import { hideLoading, showLoading } from '@/components/Loading/loading'


export default {
  components:{
    // 'v-header':Header
  },
  data(){
    return {
      form: {
        userMobile: '',
        userAccount: '',
        userRealName: '',
        imgUrl: ''
      },
      actionUrl: envSetting.baseURL+'/gw/op/v1/file/uploadFileMinio',
      fileUrl: envSetting.fileUrl,
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
  methods:{
    goBack(){
      uni.navigateBack()
    },
    hideKeyboard(){
      uni.hideKeyboard()
    },
    getUcUser() {
      this.$request({
        url: '/gw/op/v1/auth/getUcUser',
        method: 'get'
      }).then(res => {
        if (res.subCode === 1000) {
          this.form = res.data ? res.data : {}
        } else {
          this.$toast(res.subMsg)
        }
      })
    },
    // goEdit() {
    //   this.type = 2
    // },
    // gotoAdd(id, type) {
    //   this.$router.push({ path: '/goodsAdd', query: { id, type } })
    // },
    // gotoIndex() {
    //   this.$router.push({ path: '/'})
    // },
    submit() {
      if (!this.form.imgUrl) {
        this.$toast('请上传头像')
        return false
      }
      if (!this.form.userMobile) {
        this.$toast('请输入手机')
        return false
      }
      if (!this.form.userRealName) {
        this.$toast('请输入姓名')
        return false
      }
      userContainerApi.update(this.form).then(res => {
        if (res.subCode === 1000) {
          this.$toast('修改成功')
          this.$router.go(-1)
        } else {
          this.$toast(res.subMsg)
        }
      })
      // userContainerApi.update(this.form).then(res => {
      //   console.info(res)
      //   if (res.subCode === 1000) {
      //     this.$toast('操作成功')
      //   } else {
      //     this.$toast(res.subMsg)
      //   }
      // })
      //
      // userContainerApi.update(this.form).then(res => {
      //   if (res.subCode === 1000) {
      //     this.$toast('操作成功')
      //     this.goBack()
      //   } else {
      //     this.$toast(res.subMsg)
      //   }
      // })
    },
    // goBack() {
    //   this.$router.push({ path: '/otherList'})
    // },
    async handleImageSuccess(res, file) {
      hideLoading()
      this.$toast('上传成功')
      this.form.imgUrl = res.data
    },
    async handleImageError(res, file) {
      hideLoading()
      this.$toast('上传失败')
    },
    async beforeImageUpload(file) {
      const fileName = file.name
      const fileType = fileName.substring(fileName.lastIndexOf('.'))
      if (
        fileType === '.jpg' ||
        fileType === '.png' ||
        fileType === '.jpeg' ||
        fileType === '.bmp' ||
        fileType === '.gif'
      ) {
      } else {
        this.$toast('不是,jpeg,.png,.jpg,.bmp,.gif文件,请上传正确的图片类型')
        return false
      }
      showLoading()
      let overSize = file.size / 1024 / 1024
      console.info("size1",overSize)
      if (overSize > 1) {
        file = await imageConversion.compressAccurately(file, 200)
      }
      overSize = file.size / 1024 / 1024
      console.info("size2",overSize)
      return file
    },
    // beforeImageUpload(file) {
    //   const fileName = file.name
    //   const fileType = fileName.substring(fileName.lastIndexOf('.'))
    //   if (
    //     fileType === '.jpg' ||
    //     fileType === '.png' ||
    //     fileType === '.jpeg' ||
    //     fileType === '.bmp' ||
    //     fileType === '.gif'
    //   ) {
    //   } else {
    //     this.$toast(
    //       '不是,jpeg,.png,.jpg,.bmp,.gif文件,请上传正确的图片类型'
    //     )
    //     return false
    //   }
    // },
  }
}

</script>

<style>
  @import '@/assets/index/style.css';
  .login {
    overflow: hidden;
    >section {
      .tip {
        padding: 6vw 3vw;
        color:rgb(224, 145, 71);
        letter-spacing: 2px;
        font-size: 16px;
      }
    }
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
</style>
