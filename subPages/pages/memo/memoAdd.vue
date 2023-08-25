<template lang="html">
  <view class="login">
    <u-navbar :title="type==1 ? '查看' : type==2 ? '编辑' : '新增'" bgColor="#F3F4F5">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view v-if="type == 1" @click="type=2" class="u-nav-slot" slot="right"
            style="font-size: 15px;">
        去修改
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
        <u-form-item label-width="25vw"  label="事项名称" borderBottom>
          <u--input :disabled="type == 1" disabledColor="#fff" inputAlign="right"
                    v-model="form.name" border="none"></u--input>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw" label="类型" borderBottom @click="showSxType(); $hideKeyboard()">
          <u--input inputAlign="right" disabledColor="#fff"
                    placeholderStyle="font-size: 14px;color:#c0c4cc"
                    v-model="form.typeStr" border="none" disabled></u--input>
          <u-icon v-if="type != 1"  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw" label="日历类型" borderBottom @click="showSxDateType(); $hideKeyboard()">
          <u--input inputAlign="right" disabledColor="#fff"
                    placeholderStyle="font-size: 14px;color:#c0c4cc"
                    v-model="form.dateTypeStr" border="none" disabled></u--input>
          <u-icon v-if="type != 1"  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label-width="25vw" label="时间" v-if="form.type == 2 || form.dateType == 2" borderBottom>
          <u--input :disabled="type == 1" disabledColor="#fff" inputAlign="right" placeholder="请输入MM-dd或者yyyy-MM-dd"
                    v-model="form.happenTime" border="none"></u--input>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label-width="25vw" label="时间" v-else borderBottom>
          <u--input :disabled="type == 1" disabledColor="#fff" inputAlign="right" placeholder="请输入1到31数字"
                    v-model="form.happenTime" border="none"></u--input>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label-width="25vw" label="提醒标题" borderBottom>
          <u--textarea
              :disabled="type == 1"
              v-model="form.title"
              count
          ></u--textarea>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label-width="25vw" label="提醒内容" borderBottom>
          <u--textarea
              :disabled="type == 1"
              v-model="form.content"
              count
          ></u--textarea>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>

      </view>
    </u--form>
    <u-picker :show="show_sx_type" :columns="columns" @cancel="show_sx_type= false" :defaultIndex="defaultIndex"
              @confirm="confirm_sx_type" keyName="fieldName"></u-picker>
    <u-picker :show="show_sx_datetype" :columns="columnsdate" @cancel="show_sx_datetype= false" :defaultIndex="defaultDateIndex"
              @confirm="confirm_sx_datetype" keyName="fieldName"></u-picker>
    <view class="baisebeijing " v-if="type != 1" style="width:100%;position:fixed;bottom:0;
     border-top: solid #E2DDDD 1px;">
      <view class="shuipingjuzhong">
        <u-button style="width: 50vw; margin: 10px 15px;" type="primary" @click="submit">
          <text style=" font-size: 17px;font-weight: 600">确认保存</text>
        </u-button>
      </view>
    </view>
  </view>
</template>

<script>
  import {memoApi} from '@/api/memo'

  export default {
    components: {
    },
 data() {
      return {
        fileUrl: this.$fileUrl,
        show_sx_type: false,
        defaultIndex: [0],
        show_sx_datetype: false,
        defaultDateIndex: [0],
        form: {
          type: 1,
          dateType: 1,
          typeStr: '信用卡还款日',
          dateTypeStr: '公历',
          actNo: '',
          name: '',
          imgUrl: '',
          brand: '',
          remark: '',
          price: ''
        },
        typeList: [],
        columns: [],
        columnsdate: [],
        type: '',
        id: '',
      }
    },
    onLoad(options) {
      if (options) {
        this.id = options.id ? options.id : '';
        if (this.id) {
          this.getDetailById(this.id)
        }
        this.type = options.type ? options.type : ''
      }
    },
    mounted() {
      this.listSysDict()
    },
    methods: {
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
      showSxDateType() {
        if (this.type ==1){
          return
        }
        this.show_sx_datetype = true
      },
      confirm_sx_datetype(e) {
        this.show_sx_datetype = false
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.form.dateType = fieldValue
        this.form.dateTypeStr = fieldName
      },
      getDetailById(id) {
        if (id) {
          memoApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {};
              if (this.form.type){
                this.form.typeStr = this.$typeToStr(49,this.form.type)
                this.defaultIndex = [this.$getTypeIndex(49,this.form.type)]
              }
              if (this.form.dateType){
                this.form.dateTypeStr = this.$typeToStr(50,this.form.dateType)
                this.defaultDateIndex = [this.$getTypeIndex(50,this.form.dateType)]
              }
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      submit() {
        if (!this.form.name) {
          this.$toast('名称非空')
          return false
        }
        if (!this.form.type) {
          this.$toast('类型非空')
          return false
        }
        if (!this.form.happenTime) {
          this.$toast('时间非空')
          return false
        }
        if (!this.form.dateType) {
          this.$toast('日历类型非空')
          return false
        }
        if (!this.form.title) {
          this.$toast('提醒标题非空')
          return false
        }
        if (!this.form.content) {
          this.$toast('提醒内容非空')
          return false
        }
        if(this.form.type == 1){
          let happenTime = this.form.happenTime
          if(happenTime.startsWith('0')){
            this.form.happenTime = happenTime.substring(1,happenTime.length)
          }
          const reg = /^([1-9]|[1-2][0-9]|3[0-1])$/
          if(!reg.test(this.form.happenTime)){
            this.$toast('请输入1到31数字')
            return false
          }
          if(this.form.happenTime > 31 || this.form.happenTime < 1){
            this.$toast('请输入1到31数字')
            return false
          }
          if (this.form.happenTime < 9){
            this.form.happenTime = '0'+this.form.happenTime
          }
        }else{
          let happenTime = this.form.happenTime
          const reg1 = /^(0?[1-9]|1[0-2])-(0?[1-9]|[1-2][0-9]|3[0-1])$/;
          let reg2 = /^(\d{4})-(\d{2})-(\d{2})$/
          if(!reg1.test(happenTime) && !reg2.test(happenTime)){
            this.$toast('请输入 MM-dd (07-27) 或者 yyyy-MM-dd (2018-09-19')
            return false
          }
        }
        if (this.type == 2) {
          memoApi.update(this.form).then(res => {
            if (res.subCode === 1000) {
              this.$toast('操作成功');
              setTimeout(() => {
                this.$navigateTo('/subPages/pages/memo/index')
              }, 1000)
            } else {
              this.$toast(res.subMsg)
            }
          })
        } else {
          memoApi.add(this.form).then(res => {
            if (res.subCode === 1000) {
              this.$toast('添加成功，即将返回列表');
              setTimeout(() => {
                this.$navigateTo('/subPages/pages/memo/index')
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
        this.typeList = sysDictList.filter(item => item.typeValue == 49)
        this.dateTypeList = sysDictList.filter(item => item.typeValue == 50)
        this.columns.push(this.typeList)
        this.columnsdate.push(this.dateTypeList)
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

</style>
