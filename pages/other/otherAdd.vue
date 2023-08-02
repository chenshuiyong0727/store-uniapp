<template lang="html">
  <div class="login">
    <!--    <mt-header title="其他收支详情">-->
    <!--      <div slot="left">-->
    <!--        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>-->
    <!--      </div>-->
    <!--      <div slot="right">-->
    <!--        <mt-button size="normal" style="font-size: 16px"  @click="submit">保存</mt-button>-->
    <!--      </div>-->
    <!--    </mt-header>-->
    <!--    <section style="padding-top:46px">-->
    <!--      <mt-field-->
    <!--        label="图片"-->
    <!--      >-->
    <!--        <el-upload-->
    <!--          :disabled="type == 1 "-->
    <!--          class="avatar-uploader"-->
    <!--          action="/gw/op/v1/file/uploadFileMinio"-->
    <!--          :show-file-list="false"-->
    <!--          :on-error="handleImageError"-->
    <!--          :on-success="handleImageSuccess"-->
    <!--          :before-upload="beforeImageUpload"-->
    <!--        >-->
    <!--          <img-->
    <!--            :disabled="type == 1 "-->
    <!--            style="height: 62vw"-->
    <!--            class="select100"-->
    <!--            v-if="form.imgUrl"-->
    <!--            :src="fileUrl + form.imgUrl"-->
    <!--          />-->
    <!--          <el-button :disabled="type == 1 " type="text" class="select100" v-show="!form.imgUrl"  style=" margin-left: -108vw;"-->
    <!--          >上传图片-->
    <!--          </el-button-->
    <!--          >-->
    <!--        </el-upload>-->
    <!--      </mt-field>-->
    <!--      <mt-field label="类型">-->
    <!--&lt;!&ndash;          <select class="select100" v-model="form.type"  :disabled="type == 1 ">&ndash;&gt;-->
    <!--&lt;!&ndash;            <option :disabled="true" value="" selected>请选择类型</option>&ndash;&gt;-->
    <!--&lt;!&ndash;            <option v-for="x in typeList" :value="x.fieldValue">{{x.fieldName}}</option>&ndash;&gt;-->
    <!--&lt;!&ndash;          </select>&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-select size="small" class="select100" v-model="form.type" :disabled="type == 1 " >&ndash;&gt;-->
    <!--&lt;!&ndash;        <el-option :disabled="true" value="" selected>请选择类型</el-option>&ndash;&gt;-->
    <!--&lt;!&ndash;        <el-option&ndash;&gt;-->
    <!--&lt;!&ndash;          v-for="item in typeList"&ndash;&gt;-->
    <!--&lt;!&ndash;          :key="item.fieldValue"&ndash;&gt;-->
    <!--&lt;!&ndash;          :label="item.fieldName"&ndash;&gt;-->
    <!--&lt;!&ndash;          :value="+item.fieldValue">&ndash;&gt;-->
    <!--&lt;!&ndash;        </el-option>&ndash;&gt;-->
    <!--&lt;!&ndash;          </el-select>&ndash;&gt;-->
    <!--        <select class=" select100_select select" v-model="form.type" :disabled="type == 1 " >-->
    <!--          <option label="请选择类型"  value=""></option>-->
    <!--          <option-->
    <!--            v-for="item in typeList"-->
    <!--            :key="item.fieldValue"-->
    <!--            :label="item.fieldName"-->
    <!--            :value="+item.fieldValue">-->
    <!--          </option>-->
    <!--        </select>-->
    <!--      </mt-field>-->
    <!--      <mt-field-->
    <!--        :disabled="type == 1 "-->
    <!--       label="货号"-->
    <!--        placeholder="请输入货号"-->
    <!--        type = "text"-->
    <!--        v-model = "form.actNo"-->
    <!--        >-->
    <!--      </mt-field>-->
    <!--      <mt-field-->
    <!--        :disabled="type == 1 "-->
    <!--       label="品牌"-->
    <!--        placeholder="请输入品牌"-->
    <!--        type = "text"-->
    <!--        v-model = "form.brand"-->
    <!--        >-->
    <!--      </mt-field>-->
    <!--      <mt-field-->
    <!--        :disabled="type == 1 "-->
    <!--       label="名称"-->
    <!--        placeholder="请输入名称"-->
    <!--        type = "text"-->
    <!--        v-model = "form.name"-->
    <!--        >-->
    <!--      </mt-field>-->
    <!--      <mt-field-->
    <!--        :disabled="type == 1 "-->
    <!--       label="金额"-->
    <!--        placeholder="请输入金额"-->
    <!--        type = "number"-->
    <!--        v-model = "form.price"-->
    <!--        >-->
    <!--      </mt-field>-->
    <!--      <mt-field-->
    <!--        :disabled="type == 1 "-->
    <!--       label="备注"-->
    <!--        placeholder="请输入备注"-->
    <!--        type = "textarea"-->
    <!--        v-model = "form.remark"-->
    <!--         rows="4"-->
    <!--        >-->
    <!--      </mt-field>-->
    <!--    </section>-->
    <!--    <div style="    margin-left: 20vw;-->
    <!--    margin-top: 20px;">-->
    <!--      <mt-button v-if="type != 1" style="bottom: 10px"-->
    <!--        type="primary"-->
    <!--        @click="submit">提交</mt-button>-->
    <!--      <mt-button v-else style="bottom: 10px"-->
    <!--        type="primary"-->
    <!--        @click="goEdit">编辑</mt-button>-->
    <!--      <mt-button style="bottom: 10px"-->
    <!--        @click="$router.go(-1)">取消</mt-button>-->
    <!--      <mt-button style="bottom: 10px"-->
    <!--        type="primary"-->
    <!--        @click="gotoIndex">回到首页</mt-button>-->
    <!--    </div>-->


    <!--  </div>-->
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
          <!--        <u&#45;&#45;input :disabled="type == 1" disabledColor="#fff" inputAlign="right" v-model="form.remark" border="none"></u&#45;&#45;input>-->
          <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <!--      <u-form-item-->
        <!--          label-width="150"-->
        <!--          label="手机号"-->
        <!--          borderBottom-->
        <!--          ref="item1"-->
        <!--      >-->
        <!--        <u&#45;&#45;input-->
        <!--            color="#717171"-->
        <!--            inputAlign="right"-->
        <!--            v-model="form.userMobile"-->
        <!--            border="none"-->
        <!--        ></u&#45;&#45;input>-->
        <!--        <u-icon v-if="type != 1"-->
        <!--            class="biaodan-gengduo"-->
        <!--            slot="right"-->
        <!--            name="arrow-right"-->
        <!--        ></u-icon>-->
        <!--      </u-form-item>-->
        <!--      <u-form-item-->
        <!--          label="姓名"-->
        <!--          ref="item1"-->
        <!--      >-->
        <!--        <u&#45;&#45;input-->
        <!--            color="#717171"-->
        <!--            inputAlign="right"-->
        <!--            v-model="form.userRealName"-->
        <!--            border="none"-->
        <!--        ></u&#45;&#45;input>-->
        <!--        <u-icon v-if="type != 1" class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>-->
        <!--      </u-form-item>-->
      </view>
    </u--form>
  </div>
</template>

<script>
  // import Header from '@/common/_header.vue'
  import {goodsOtherApi} from '@/api/goodsOther'

  export default {
    components: {
      // 'v-header':Header
    },
    data() {
      return {
        fileList1: [],
        form: {
          type: 2,
          actNo: '',
          name: '',
          imgUrl: '',
          brand: '',
          remark: '',
          price: ''
        },
        typeList: [],
        dataStatusList: [],
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
                // console.info(res)
                // console.info(res.data)
                let resDta = JSON.parse(res.data);
                // console.info(resDta)
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
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
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
