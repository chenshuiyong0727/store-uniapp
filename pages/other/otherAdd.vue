<template lang="html">
  <div class="login">
    <u-navbar :title="type==1 ? '查看' : type==2 ? '编辑' : '新增'" bgColor="#F3F4F5">
      <view @click="$goBack" class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view v-if="type == 1" @click="type=2" class="u-nav-slot" slot="right"
            style="font-size: 15px;">
        去修改
      </view>
      <view v-else @click="submit" class="u-nav-slot" slot="right" style="font-size: 15px;">
        保存
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
        <u-form-item label="类型" borderBottom @click="showSxType(); $hideKeyboard()">
          <u--input inputAlign="right" disabledColor="#fff"
                    placeholderStyle="font-size: 14px;color:#c0c4cc"
                    v-model="form.typeStr" border="none" disabled></u--input>
          <u-icon v-if="type != 1"  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="货号" borderBottom>
          <u--input :disabled="type == 1" disabledColor="#fff" inputAlign="right"
                    v-model="form.actNo" border="none"></u--input>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="品牌" borderBottom>
          <u--input :disabled="type == 1" disabledColor="#fff" inputAlign="right"
                    v-model="form.brand" border="none"></u--input>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="名称" borderBottom>
          <u--input :disabled="type == 1" disabledColor="#fff" inputAlign="right"
                    v-model="form.name" border="none"></u--input>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label="金额" borderBottom>
          <u--input :disabled="type == 1" disabledColor="#fff" inputAlign="right"
                    v-model="form.price" type="digit" border="none"></u--input>
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="备注" borderBottom>
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
  </div>
</template>

<script>
  import {goodsOtherApi} from '@/api/goodsOther'

  export default {
    components: {
    },
    data() {
      return {
        fileList1: [],
        show_sx_type: false,
        defaultIndex: [1],
        form: {
          type: 2,
          typeStr: '支出',
          actNo: '',
          name: '',
          imgUrl: '',
          brand: '',
          remark: '',
          price: ''
        },
        typeList: [],
        columns: [],
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
      deletePic(event) {
        console.info(event);
        this[`fileList${event.name}`].splice(event.index, 1)
      },
      async afterRead(event) {
        console.info(event);
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
                  this.$toast('上传失败，请上传1mb 以内的图片');
                  _this.deletePic(_this.imgevent)
                } else {
                  this.$toast('上传成功');
                  this.form.imgUrl = resDta.data;
                  resolve(res.data.data)
                }
              }, 1000)
            }
          });
        })
      },
      getDetailById(id) {
        if (id) {
          goodsOtherApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {};
              if (this.form.imgUrl) {
                let url = this.$fileUrl + this.form.imgUrl;
                let data1 = {};
                data1.url = url;
                this.fileList1.push(data1)
              }
              if (this.form.type){
                this.form.typeStr = this.$typeToStr(39,this.form.type)
                this.defaultIndex = [this.$getTypeIndex(39,this.form.type)]
              }
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      submit() {
        if (!this.form.type) {
          this.$toast('类型非空');
          return false
        }
        if (!this.form.price) {
          this.$toast('金额非空');
          return false
        }
        if (!this.form.name) {
          this.$toast('名称非空');
          return false
        }
        if (this.form.price > 0 && this.form.type == 2) {
          this.form.price = 0 - this.form.price
        }
        if (this.type == 2) {
          goodsOtherApi.update(this.form).then(res => {
            if (res.subCode === 1000) {
              this.$toast('操作成功,即将返回列表');
              setTimeout(() => {
                this.$navigateTo('/pages/other/index')
              }, 1000)
            } else {
              ``;
              this.$toast(res.subMsg)
            }
          })
        } else {
          goodsOtherApi.add(this.form).then(res => {
            if (res.subCode === 1000) {
              this.$toast('添加成功，即将返回列表');
              setTimeout(() => {
                this.$navigateTo('/pages/other/index')
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
        this.typeList = sysDictList.filter(item => item.typeValue == 39);
        this.columns.push(this.typeList)
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
