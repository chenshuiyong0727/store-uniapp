<template>
  <view>
    <u-navbar title="仓库" bgColor="#f3faff">
      <view @click="goBack"  class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view class="u-nav-slot" style="font-size: 15px;" slot="right">
        <rudon-rowMenuDotDotDot :localdata="localdata" @change="menuAction($event)">
          <image style="height: 25px;width: 25px" src="../../static/img/slh.png"></image>
        </rudon-rowMenuDotDotDot>
      </view>
    </u-navbar>
    <view class="fenlei_top_tab" style="display: flex;">
      <view style="width: 94vw">
        <u--input
            class="searchInputW"
            prefixIcon="search"
            placeholder="请输入货号/商品名/尺码"
            placeholderStyle="font-size: 14px;color:#c0c4cc"
            v-model="queryParam.actNo"
            prefixIconStyle="font-size: 24px;color:#c0c4cc"
            :show-action="false"
            @change="search1"
            clearable
        >
        </u--input>
      </view>
    </view>
    <view class="searchListSort">
      <view class="u-demo-block__content">
        <u-tabs
            @change="tabClick"
            :duration="200"
            :lineWidth="30"
            :current="current"
            lineColor="#409eff"
            :activeStyle="{
              color: '#333333',
              fontSize: '17px',
              fontWeight: 'bold'
					  }"
            :inactiveStyle="{
              color: '#333333',
              fontSize: '16px'
					}"
            :list="list2"
            itemStyle="padding-left: 13px; padding-right: 13px; height:44px;"
          >
        </u-tabs>
      </view>
    </view>
    <view class="filterquyu">
      <view class="width80 zuoyouduiqi">
        <view @click="isShowSort = !isShowSort ;isShowDialog2 =false ;">
          <text :class="sortName != '排序' ? 'color-url': ''">{{ sortName}}</text>
          <image v-if="!isShowSort && sortName == '排序'" class="paixutupian" src="../../static/img/tab_down.png"></image>
          <image v-if="!isShowSort && sortName != '排序'" class="paixutupian" src="../../static/img/tab_down_url.png"></image>
          <image v-if="isShowSort && sortName != '排序'" class="paixutupian" src="../../static/img/tab_up_url.png"></image>
          <image v-if="isShowSort && sortName == '排序'" class="paixutupian" src="../../static/img/tab_up.png"></image>
        </view>
        <view
            v-if="queryParam.size
                   || queryParam.createTimeFrom
                   || queryParam.createTimeTo
                   || queryParam.createUserName
                   || queryParam.profitsFrom
                   || queryParam.profitsTo
                   || queryParam.inventory != 1
                   || queryParam.warehouseId
                   || queryParam.channelId
                   || queryParam.today
                   || queryParam.goodType
                    "
            @click="isShowDialog2 = !isShowDialog2; isShowSort= false;">
          <text class="color-url">筛选</text>
          <image  class="shaixuantupian" src="../../static/img/search.png"></image>
        </view>
        <view v-else @click="isShowDialog2 = !isShowDialog2; isShowSort= false;">
          <text>筛选</text>
          <image  class="shaixuantupian"  src="../../static/img/search_no.png"></image>
        </view>
      </view>
    </view>
    <view></view>
    <view  @touchmove.stop.prevent="moveHandle" @click="isShowSort = !isShowSort"  v-if="isShowSort" class="mask">
    </view>
    <view class="paixudiv" v-if="isShowSort" style="height: 41vh;">
      <scroll-view   scroll-y="true"  class="width92" style="height: 100%">
        <view v-for="(item,index) in sortList"
              :key="index"
              class="paixuliebiao"
              :style="sortList.length==(index+1) ? 'border-bottom: 0px' : ''"
              @click="chooseSort(item)"
        >
            <text :class="sortName == item.fieldName ? 'color-url': ''">{{item.fieldName}}</text>
        </view>
      </scroll-view>
    </view>

    <view  @touchmove.stop.prevent="preventHandler">
      <u-popup :show="isShowDialog2" @close="isShowDialog2 = !isShowDialog2"  :duration="100" mode="right">
        <view  style="height: 90vh;">
          <scroll-view  scroll-y="true"  class="saixuanquyu">
            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  尺码
                </text>
              </view>
              <view class="julishang10">
                <u--input
                    class="saixuanInput"
                    placeholder="请输入尺码"
                    placeholderStyle="font-size: 14px;color:#c0c4cc"
                    v-model="queryParam.size"
                    @change="search1"
                    clearable
                >
                </u--input>
              </view>
            </view>
              <view class="saixuanquxiang" >
                <view>
                  <text class="zitijiachu zihao14">
                    利润
                  </text>
                </view>
                <view class="julishang10 xianglian saixuanshijian">
                  <view >
                    <u--input
                        class="searchInputFilter"
                        placeholder="最低利润"
                        @change="search1"
                        placeholderStyle="font-size: 14px;color:#c0c4cc"
                        v-model="queryParam.profitsFrom"
                        type="digit"
                        clearable
                    ></u--input>
                  </view>
                  <view>
                    <image  class="hengtupian" src="../../static/img/heng.png"></image>
                  </view>
                  <view  >
                    <u--input
                        class="searchInputFilter"
                        placeholder="最高利润"
                        @change="search1"
                        placeholderStyle="font-size: 14px;color:#c0c4cc"
                        v-model="queryParam.profitsTo"
                        type="digit"
                        clearable
                    ></u--input>
                  </view>
                </view>
              </view>
            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  入库时间
                </text>
              </view>
              <view class="julishang10 xianglian saixuanshijian">
                <view  @click="showFrom= true;showTo= false">
                  <u--input
                      readonly="readonly"
                      class="searchInputFilter"
                      placeholder="开始时间"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.createTimeFrom"
                      clearable
                  ></u--input>
                </view>
                <view>
                  <image  class="hengtupian" src="../../static/img/heng.png"></image>
                </view>
                <view  @click="showTo= true;showFrom= false">
                  <u--input
                      readonly="readonly"
                      class="searchInputFilter"
                      placeholder="结束时间"
                      placeholderStyle="font-size: 14px;color:#c0c4cc"
                      v-model="queryParam.createTimeTo"
                      clearable
                  ></u--input>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  状态
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in inventoryToList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.inventory = item.fieldValue; changeCurrent();">
                    <text :class="queryParam.inventory == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  退货状态
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in returnList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.status = item.fieldValue;search1();">
                    <text :class="queryParam.status == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  仓库
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in warehouseList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.warehouseId = item.fieldValue;search1();">
                    <text :class="queryParam.warehouseId == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  渠道
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in channelIdList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.channelId = item.fieldValue;search1();">
                    <text :class="queryParam.channelId == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  特殊条件
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in todayList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.today = item.fieldValue;changeCurrent();">
                    <text :class="queryParam.today == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  商品类型
                </text>
              </view>
              <view class="julishang_10 saixuanxuanzhefuji">
                <view v-for="(item,index) in typeList"
                      :key="index"
                      class="saixuanxuanzhe julishang_10">
                  <u-button color="#f4f3f8" size="small" @click="queryParam.goodType = item.fieldValue;search1();">
                    <text :class="queryParam.goodType == item.fieldValue ? 'xuanzhongziti' : 'putongziti'">{{item.fieldName}}</text>
                  </u-button>
                </view>
              </view>
            </view>

            <view class="saixuanquxiang" >
              <view>
                <text class="zitijiachu zihao14">
                  创建人
                </text>
              </view>
              <view class="julishang10">
                <u--input
                    class="saixuanInput"
                    placeholder="请输入创建人"
                    placeholderStyle="font-size: 14px;color:#c0c4cc"
                    v-model="queryParam.createUserName"
                    @change="search1"
                    clearable
                >
                </u--input>
              </view>
            </view>

          </scroll-view >
          <view class="baisebeijing shuipingjuzhong" style="position:fixed;bottom:0;width: 80vw;">
            <u-button style="width: 20vw; margin: 5px" @click=" isShowDialog2 = false;resetSort();resetHandle()">
              <text style=" font-size: 15px;">重置</text>
            </u-button>
            <u-button style="width: 50vw; margin: 5px" type="primary" @click="search2">
              <text style=" font-size: 15px;">
                确定（{{totalCount}} 款商品）
              </text>
            </u-button>
          </view>
        </view>
      </u-popup>
    </view>
    <u-datetime-picker
        title="开始时间"
                :show="showFrom"
        v-model="dateCurrent"
        mode="date"
        :minDate="1646064000000"
        @confirm="confirmFrom"
        @cancel="cancelFrom"
    ></u-datetime-picker>
    <u-datetime-picker
        title="结束时间"
                :show="showTo"
        v-model="dateCurrent"
        mode="date"
        :minDate="1646064000000"
        @confirm="confirmTo"
        @cancel="cancelTo"
    ></u-datetime-picker>
    <view
        style="height: 100vh"
        @touchstart.stop="onTouchStart" @touchend.stop="handleTouchend" >
      <view class="julibiaoti4" >
      <view class="dingdans_item_dw"
            v-for="(item,index) in tableData"
            :key="index"
      >
        <!--        头部-->
        <view class="dingdans_top_dw" @click="goDetail(item.id) ">
          <view class="dingdans_top_left_dw">
            <text>入库时间:</text>
            <text>{{item.createTime |formateTime}}</text>
          </view>
          <view class="dingdans_top_right_dw" v-if="item.difference && item.thisTimePrice">
            变更
            <strong style="font-size: 13px;margin-left: 1vw;" v-if="item.difference > 0" class="color-danger"> +{{item.difference }}</strong>
            <strong style="font-size: 13px;margin-left: 1vw;" v-else class="color-success">{{item.difference }}</strong>
          </view>
        </view>
        <!--        中间-->
        <view class="dingdans_con_dw" @click="goDetail(item.id) ">

          <view v-if="showSd" style="
    margin-left: -2px;
    margin-right: 2px;">
            <u-checkbox-group>
              <u-checkbox  size="18"
                           :checked="item.checked"
                           @change="changeChecked(item)"
                           activeColor="#409eff"
                           shape="circle">

              </u-checkbox>
            </u-checkbox-group>
          </view>

          <view  class="dingdans_con_left_dw"
               @click.stop="avatarShow(item.img)">
            <image mode="widthFix" :src="item.img" v-if="item.img"></image>
            <image mode="widthFix" :src="fileUrl+item.imgUrl" style="margin-top: 10px;" v-if="!item.img && item.imgUrl" ></image>
            <p class="mark_dw">
              <text class="text_dw">
                {{ item.channelId | dictToDescTypeValue(47) }}
              </text>
            </p>
          </view>
          <view class="diangdans_con_right_dw">
            <view class="dingdans_con_right_top_dw" >
              <text class="chaochu"  style="width: 65vw">
                {{item.goodsName }}
              </text>
            </view>
            <view class="dingdans_con_right_top_dw_1 zuoyouduiqi">
              <view xianglian>
                <text @click.stop="jumpOrder(item.actNo)">
                  {{item.actNo}}
                </text>
                <image @click.stop="$copyUrl(item.actNo)" class="fuzhitupian"
                       src="../../static/img/copy.png"></image>
              </view>
              <text>
                <strong style="font-size: 13px;margin-left: 1vw;" v-if="item.status == 2" class="color-danger">需退货</strong>
              </text>
            </view>
            <view v-if="item.warehouseId" style="margin-bottom: 5px;
    margin-top: 10px;">
              <text  class="dingdans_con_dw_address">
                {{item.warehouseId | dictToDescTypeValue(40)}}
              </text>
            </view>
            <view class="dingdans_con_right_top_dw_2">
              <view>
                 <text>
                {{item.size}} × {{item.inventory}}
              </text>
              </view>
              <view>
                <strong style="color: #333333">
                  ¥
                </strong>
                <strong  v-if="item.thisTimeThePrice" style="font-size: 17px ;color: #333333">
                  {{item.thisTimeThePrice}}
                </strong>
                <strong v-if="!item.thisTimeThePrice && item.theirPrice" style="font-size: 17px ;color: #333333">
                  {{item.theirPrice}}
                </strong>
                <text v-if="item.thisTimePrice" style="margin-left: 5px;text-decoration:line-through;">
                  {{item.thisTimePrice}}
                </text>
                <text v-else style="margin-left: 5px;text-decoration:line-through;">
                  {{item.dwPrice}}
                </text>
              </view>
            </view>
          </view>
        </view>
        <!--底部-->
        <view class="dingdans_bottom_dw">
          <view class="dingdans_top_left_dw">
            <text >入库价</text>
            <text style="margin-left: 2px;" class="color-danger">{{item.price}}</text>
            <text >, 预估利润</text>
            <text style="margin-left: 3px;"  :class="item.thisTimeProfits>= 0 ? 'color-danger': 'color-success'"  v-if="item.thisTimePrice" >{{item.thisTimeProfits }}</text>
            <text style="margin-left: 3px;"  v-else
                  :class="$getProfits(item.dwPrice,item.price) > 0 ? 'color-danger' : 'color-success'">
              {{item.dwPrice | getProfits(item.price)}}
            </text>
          </view>
          <view class="dingdans_top_right_dw">
            <view class="dingdans_con_right_down_2_1 xianglian">
              <text v-if="item.inventory > item.galleryCount"  class="dw-button-common" @click="gallery(item)">上架</text>
              <rudon-rowMenuDotDotDot :localdata="optionsOp" @change="menuActionList($event,item)">
                <text v-if="item.inventory > item.galleryCount"  class="dw-button-common">更多</text>
                <text v-else class="dw-button-common">操作</text>
              </rudon-rowMenuDotDotDot>
            </view>
          </view>
        </view>
      </view>
    </view>

      <view>
        <u-popup :show="isShowDialog" @close="close"  :duration="0" :closeable="true" mode="center">
          <view style="width: 80vw;margin-left: 5vw;margin-right: 5vw;">
            <u-navbar title="当前价格" :fixed="false" :border="true">
              <view class="u-nav-slot" slot="left">
<!--                <image style="width: 23px; height: 23px;"-->
<!--                       src="../../static/img/logo/logo-333-1.png"></image>-->
              </view>
<!--              <view @click="isShowDialog = false" style="font-size: 15px;" class="u-nav-slot" slot="left">-->
<!--                <text>关闭</text>-->
<!--              </view>-->
<!--              <view @click="confirmHandle" class="u-nav-slot" style="font-size: 15px;" slot="right">-->
<!--                <text>确定</text>-->
<!--              </view>-->
            </u-navbar>
            <view>
              <u--form>
                <u-form-item label-width="20vw" label="当前价格" borderBottom>
                  <u--input  disabledColor="#fff" inputAlign="right" @change="keyup1"
                             v-model="requestParamDw.thisTimePrice" type="digit" border="none"></u--input>
                  <u-icon  class="biaodan-gengduo" slot="right" name="arrow-right"></u-icon>
                </u-form-item>
                <u-form-item :disabled="true"  label-width="20vw" label="出售价格" borderBottom>
                  <u--input  disabledColor="#fff" inputAlign="right"   color="#d1d1d1"
                             v-model="requestParamDw.dwPrice" type="digit" border="none"></u--input>
                </u-form-item>
                <u-form-item  :disabled="true" label-width="20vw" label="入库价" borderBottom>
                  <u--input  disabledColor="#fff" inputAlign="right"  color="#d1d1d1"
                             v-model="requestParamDw.price" type="digit" border="none"></u--input>
                </u-form-item>
                <u-form-item label-width="20vw" label="手续费" borderBottom>
                  <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                             v-model="requestParamDw.poundage" type="digit" border="none" color="#d1d1d1"></u--input>
                </u-form-item>

                <u-form-item label-width="20vw" label="到手价" borderBottom>
                  <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                             v-model="requestParamDw.theirPrice" type="digit" border="none" color="#d1d1d1"></u--input>
                </u-form-item>

                <u-form-item label-width="20vw" label="利润" borderBottom>
                  <u--input  :disabled="true" disabledColor="#fff" inputAlign="right"
                             v-model="requestParamDw.profits" type="digit" border="none" color="#d1d1d1"></u--input>
                </u-form-item>
              </u--form>
              <view class="shuipingjuzhong">
                <u-button style="width: 50vw; margin: 10px 15px;"  size="small"   type="primary" @click="confirmHandle">
                  <text class="dibuanniuwenzi">确认</text>
                </u-button>
              </view>
            </view>
          </view>
        </u-popup>
      </view>

    <view v-show="tableData.length" class="meiyougengduo">
      <u-loadmore fontSize="18"  color="#a6a6a6" nomoreText="最硬球鞋" :status="loadStatus"/>
    </view>
    <u-empty
        v-if="!tableData.length && !isLoading"
        mode="list"
        marginTop="50"
        textSize="16"
        textColor="#8a8a8a"
        :icon="fileUrl +'/static/operateSteps/empity_7.png'">
    </u-empty>
    </view>
    <view class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <view class="imageShow">
        <image :src="imageZoom" mode="widthFix"  class="showImg"></image>
      </view>
    </view>
    <view v-if="storeData.upCout && !showSd">
      <uni-fab ref="fab" :pattern="pattern"  horizontal="right" @fabClick="syncOldPriceToNew1" />
    </view>

    <view v-if="showSd" class="zuoyouduiqi sdzf">
      <view style="margin-left: 20px;">
        <u-checkbox-group>
          <u-checkbox  size="20" :checked="checkAll"  @change="checkedAll" activeColor="#409eff"  shape="circle" label="全选"></u-checkbox>
        </u-checkbox-group>
      </view>
      <view class="xianglian">
        <text style="font-size: 14px;">已选</text>
        <text class="color-url" style=" font-size: 17px;margin-left: 8px;font-weight: bolder">{{ids.length}}</text>
        <u-button  type="primary" shape="circle" size="small" style="
        width: 20vw;
        margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;" @click="plsc">批量删除</u-button>
        <u-button  type="primary" shape="circle" size="small" style="
        width: 15vw;
        margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
        margin-right: 10px" @click="showSd = !showSd">退出
        </u-button>
      </view>
    </view>
  </view>
</template>
<script>
  import {goodsInventoryApi} from '@/api/goodsInventory'
  import { parseTime } from '@/utils/index'

  export default {

 data() {
      return {
        fileUrl: this.$fileUrl,
        pattern: {
          icon:'checkmarkempty',
          color: '#7A7E83',
          backgroundColor: '#fff',
          selectedColor: '#409eff',
          buttonColor: '#409eff',
          iconColor: '#fff'
        },
        startX: 0, // 触摸开始时的x坐标
        startY: 0, // 触摸开始时的Y坐标
        startTimeTouch : 0, // 触摸开始时的Y坐标
        dateCurrent: parseInt(new Date().getTime()),
        showFrom: false,
        showTo: false,
        show_sx_type: false,
        emtityMsg: '',
        current: 0,
        pictureZoomShow: false,
        imageZoom: '',
        localdata: [
          {
            value: 'add',
            text: '商品入库'
          },
          {
            value: 'batchOp',
            text: '批量操作'
          }
        ],
        optionsOp: [
          {
            value: 'goodsDetail',
            text: '商品详情'
          },
          {
            value: 'warehouseDetail',
            text: '库存信息'
          },
          // {
          //   value: 'syncPrice',
          //   text: '同步价格'
          // },
          {
            value: 'dwPrice',
            text: '当前价格'
          },
          {
            value: 'update',
            text: '修改'
          },
          {
            value: 'gotoDw',
            text: '得物'
          },
          {
            value: 'jumpOrder',
            text: '订单'
          },
          {
            value: 'goDel',
            text: '删除'
          }
        ],
        backUrl: '',
        storeData: {},
        list2: [
          {
            inventory: 1,
            today: '',
            name: '现货'
          },{
            inventory: 1,
            today: 7,
            name: '变更',
            badge: {
              value:0
            }
          }, {
            inventory: 1,
            today: 2,
            name: '待上架',
            badge: {
              value:0
            }
          },  {
            inventory: 1,
            today: 3,
            name: '待移库',
            badge: {
              value:0
            }
          }, {
            inventory: 0,
            today: '',
            name: '售空'
          }
        ],
        typeList: [],
        columns: [],
        isLoadMore: false,
        isLoading: false,
        loadStatus: 'loadmore',
        requestParam1: {
          poundage: '',
          theirPrice: '',
          profits: '',
          inventoryId: '',
          type: 1,
          num: '',
          shelvesPrice: ''
        },
        sizeList:'',
        requestParamDw: {
          id: '',
          sizeId: '',
          oldInventory: '',
          inventory: '',
          price: '',
          dwPrice: '',
          thisTimePrice: '',
          poundage: '',
          theirPrice: '',
          profits: ''
        },
        requestParam: {
          id: '',
          createTime: '',
          sizeId: '',
          oldInventory: '',
          inventory: '',
          price: '',
          dwPrice: '',
          poundage: '',
          theirPrice: '',
          profits: '',
          waybillNo: '',
          addressId: ''
        },
        emtityMsg: '',
        orderData: '',
        isShowDialog: false,
        orderData1: '',
        isShowDialog1: false,
        orderData2: '',
        isShowDialog2: false,
        isShowSort: false,
        today: '',
        months: '',
        showClearIcon: false,

        queryParam: {
          today: '',
          syncTimeFrom: '',
          syncTimeTo: '',
          createTimeFrom: '',
          createTimeTo: '',
          id: '',
          warehouseId: '',
          status: '',
          goodType: '',
          channelId: '',
          inventory: 1,
          sort:'',
          profitsFrom: '',
          profitsTo: '',
          createUserName: '',
          inventoryFrom: '',
          inventoryTo: '',
          size: '',
          actNo: '',
          goodsId: '',
          pageSize: 10,
          pageNum: 1
        },
        sortName:'排序',
        warehouseList: [],
        returnList: [],
        channelIdList: [],
        addressList: [],
        todayList: [],
        inventoryToList: [
          { fieldValue: 1, fieldName: '现货' }, { fieldValue: 0, fieldName: '售空' },
          { fieldValue: 2, fieldName: '未上架' }
        ],
        sortList: [
          { fieldValue: ' TRUNCATE(g.price - (g.price * 0.075 + 38 + 8.8) - a.price - 10 , 2 ) asc ,', fieldName: '利润升序' },
          { fieldValue: ' TRUNCATE(g.price - (g.price * 0.075 + 38 + 8.8) - a.price - 10 , 2 ) desc ,', fieldName: '利润降序' },
          { fieldValue: '(g.price - a.dw_price ) desc  ,', fieldName: '涨价降序' },
          { fieldValue: '(g.price - a.dw_price ) asc  ,', fieldName: '降价降序' },
          { fieldValue: 'c.size asc ,', fieldName: '尺码升序' },
          { fieldValue: 'c.size desc ,', fieldName: '尺码降序' },
          { fieldValue: 'a.price asc ,', fieldName: '入库价升序' },
          { fieldValue: 'a.price desc ,', fieldName: '入库价降序' },
          { fieldValue: 'g.price asc ,', fieldName: '市场价升序' },
          { fieldValue: 'g.price desc ,', fieldName: '市场价降序' },
          { fieldValue: 'a.inventory asc ,', fieldName: '库存升序' },
          { fieldValue: 'a.inventory desc ,', fieldName: '库存降序' },
          { fieldValue: ' TRUNCATE(g.price - (g.price * 0.075 + 38 + 8.8),2 ) desc ,', fieldName: '到手降序' },
          { fieldValue: ' TRUNCATE(g.price - (g.price * 0.075 + 38 + 8.8),2 ) asc ,', fieldName: '到手升序' },
          { fieldValue: 'a.create_time asc ,', fieldName: '入库时间升序' },
          { fieldValue: 'a.create_time desc ,', fieldName: '入库时间降序' },
        ],
        startDate: new Date(),
        createTime: '',
        updateTime: '',
        status: '',
        selectedId: [],
        ids: [],
        tableData: [],
        totalCount: 1,
        showSd: false,
        checkAll: false,
      }
    },
    onLoad(options) {
      this.initBatch()
      this.listSysDict()
      this.resetData()
      if (options) {
        this.queryParam.actNo = options.actNo ? options.actNo : '';
        this.months = options.months ? options.months : '';
        if (this.months) {
          this.queryParam.createTimeFrom = this.months
          this.queryParam.createTimeTo = this.months
        }
        this.current = options.current ? +options.current : 0 ;
        this.queryParam.size = options.size ? options.size : '';
        this.queryParam.warehouseId = options.warehouseId ? options.warehouseId : '';
        this.queryParam.channelId = options.channelId ? options.channelId : '';
        this.queryParam.today = options.today ? options.today : '';
        this.backUrl = options.backUrl ? options.backUrl : '';
      }
      this.getPage()
    },

    onPullDownRefresh() {
      this.resetHandle()
      uni.stopPullDownRefresh()
    },
    onReachBottom() {
      if (this.isLoadMore) {  //此处判断，上锁，防止重复请求
        this.loadStatus = 'loading';
        this.queryParam.pageNum++;
        this.getPage()
      }
    },
    methods: {

      handleClick(row) {
        this.orderData = row
        this.requestParamDw.id = this.orderData.id
        this.requestParamDw.sizeId = this.orderData.sizeId
        this.requestParamDw.channelId = this.orderData.channelId
        if (this.orderData.createTime){
          this.requestParamDw.createTime  = uni.$u.timeFormat(this.orderData.createTime, 'yyyy-mm-dd hh:MM:ss');
          this.dateCurrent = parseInt(new Date( this.orderData.createTime).getTime())
        }else{
          this.dateCurrent = parseInt(new Date().getTime())
        }
        this.requestParamDw.oldInventory = this.orderData.oldInventory
        this.requestParamDw.inventory = this.orderData.inventory
        this.requestParamDw.price = this.orderData.price
        this.requestParamDw.dwPrice = this.orderData.dwPrice
        this.requestParamDw.thisTimePrice = this.orderData.thisTimePrice ? this.orderData.thisTimePrice : null
        this.requestParamDw.waybillNo = this.orderData.waybillNo
        this.requestParamDw.addressId = this.orderData.addressId
        if (!this.orderData.poundage) {
          let poundage = this.$getPoundage(this.requestParamDw.dwPrice)
          this.requestParamDw.poundage = parseFloat(poundage).toFixed(2)
        } else {
          this.requestParamDw.poundage = this.orderData.poundage
        }
        if (!this.orderData.theirPrice) {
          let theirPrice =  this.requestParamDw.dwPrice
              - this.$getPoundage(this.requestParamDw.dwPrice)
          this.requestParamDw.theirPrice = parseFloat(theirPrice).toFixed(2)
        } else {
          this.requestParamDw.theirPrice = this.orderData.theirPrice
        }
        if (!this.orderData.profits) {
          let profits = this.requestParamDw.theirPrice - 10
              - this.requestParamDw.price
          this.requestParamDw.profits = parseFloat(profits).toFixed(2)
        } else {
          this.requestParamDw.profits = this.orderData.profits
        }
        this.isShowDialog = !this.isShowDialog
      },
      // close() {
      //   this.isShowDialog2 = false
      // },
      keyup1() {
        this.requestParamDw.dwPrice = this.requestParamDw.thisTimePrice
        let poundage =  this.$getPoundage(this.requestParamDw.dwPrice)
        this.requestParamDw.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice =  this.requestParamDw.dwPrice - poundage
        this.requestParamDw.theirPrice = parseFloat(theirPrice).toFixed(2)

        let profits = this.requestParamDw.theirPrice - 10
            - this.requestParamDw.price
        this.requestParamDw.profits = parseFloat(profits).toFixed(2)
      },
      confirmHandle() {
        if(!this.requestParamDw.thisTimePrice) {
          this.$toast('请输入当前价格')
          return
        }
        goodsInventoryApi.update(this.requestParamDw).then(res => {
          this.$toast(res.subMsg);
          if (res.subCode === 1000) {
            this.search1()
            this.isShowDialog = false
            // setTimeout(() => {
            //   uni.reLaunch({
            //     url: '/pages/store/index',
            //   });
            // }, 1000)
          }
        })
      },
      onTouchStart(e) {
        this.startTimeTouch = Date.now();
        this.startX = e.changedTouches[0].clientX;
        this.startY = e.changedTouches[0].clientY;
      },
      handleTouchend(e) {
        const endTime = Date.now();
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const differ = Math.abs(endY - this.startY);
        const dirvalX = endX - this.startX;
        // 纵轴偏移量不得超过 30，否则默认页面进行滚动操作
        if (differ <= 30) {
          // 按下时长不得超过 2秒，X轴滑动距离必须大于 40
          if (endTime - this.startTimeTouch > 2000 || Math.abs(dirvalX) <= 40) {
            return
          };
          // 判断滑动方向
          if (dirvalX > 0) {
            this.current > 0 ? this.current -- : ''
            let resdata = this.list2[this.current]
            this.tabClick(resdata)
          } else if (dirvalX < 0){
            this.current < this.list2.length -1 ? this.current ++ : ''
            let resdata = this.list2[this.current]
            this.tabClick(resdata)
          }
        }
      },
      handleChange() {
        this.$request({
          url: '/gw/op/v1/goodsBase/listDropDownSizes',
          method: 'post',
          data: { type: '' }
        }).then(res => {
          if (res.subCode === 1000) {
            this.sizeList = res.data
          }
        })
      },
      close1() {
        this.isShowDialog1 = false
        console.log('close');
      },
      syncOldPriceToNew1() {
        this.$request({
          url: '/gw/op/v2/goodsBase/syncOldPriceToNew',
          method: 'get'
        }).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.search1()
            this.isShowDialog1 = false
          }
        })
      },
      syncPrice(actNo) {
        let data = {actNo: actNo}
        this.$request({
          url: '/gw/op/v1/dwGoods/updateSkuPriceByActNo',
          method: 'get',
          data: data
        }).then(res => {
          this.$toast(res.subMsg)
          if (res.subCode === 1000) {
            this.search1()
            this.isShowDialog1 = false
          }
        })
      },
      getData2() {
        this.$request({
          url: '/gw/op/v1/goodsOrder/todaySync',
          method: 'get'
        }).then(res => {
          if (res.subCode === 1000) {
            this.storeData = res.data
            this.list2[1].badge.value=this.storeData.upCout
            this.list2[2].badge.value=this.storeData.successNumLast
            this.list2[3].badge.value=this.storeData.waitMoveCout
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      goBack() {
        if (this.backUrl) {
          this.$navigateTo(this.backUrl)
        }else{
          this.$goBack
        }
      },
      menuAction(action, rowId) {
        // 忽略初始化时的传入的空操作
        if (action === '') {
          return
        }
        if ('add' == action) {
          this.add()
        }
        if ('batchOp' == action) {
          this.batchOp()
        }
      },
      menuActionList(action, item) {
        if (action === '') {
          return
        }
        if ('goodsDetail' == action) {
          this.goodsDetail(item.goodsId)
        }
        if ('warehouseDetail' == action) {
          this.warehouseDetail(item.goodsId ,item.actNo ,item.img )
        }
        if ('update' == action) {
          this.update(item )
        }
        if ('dwPrice' == action) {
          this.handleClick(item )
        }
        if ('gotoDw' == action) {
          this.gotoDw(item.spuId )
        }
        if ('jumpOrder' == action) {
          this.jumpOrder(item.actNo)
        }
        if ('gallery' == action) {
          this.gallery(item)
        }
        if ('goDel' == action) {
          this.goDel(item.id)
        }
        if ('syncPrice' == action) {
          this.syncPrice(item.actNo)
        }
      },
      preventHandler() {
        return
      },
      cancelFrom() {
        this.showFrom = false
        this.queryParam.createTimeFrom = ''
        this.search1()
      },
      cancelTo() {
        this.showTo = false
        this.queryParam.createTimeTo = ''
        this.search1()
      },
      confirmFrom(e) {
        this.showFrom = false;
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.queryParam.createTimeFrom = timeValue
        this.search1()
      },
      confirmTo(e) {
        this.showTo = false;
        let timeValue = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
        this.queryParam.createTimeTo = timeValue
        this.search1()
      },
      moveHandle() {},
      confirm_sx_type(e) {
        this.show_sx_type = false
        let fieldValue = e.value[0].fieldValue
        let fieldName = e.value[0].fieldName
        this.queryParam.type = fieldValue
        this.queryParam.typeStr = fieldName
        this.search1()
      },
      goodsDetail(id) {
        if (!id) {
          return
        }
        let url = '/pages/goodsBase/detail?id=' + id
        this.$navigateTo(url)
      },
      gotoDw(spuId) {
        if (!spuId){
          return
        }
        let url = "https://m.dewu.com/router/product/ProductDetail?spuId="+ spuId;
        // #ifdef APP-PLUS
        plus.runtime.openURL(url) //这里默认使用外部浏览器打开而不是内部web-view组件打开
        // #endif
        // #ifdef H5
        window.open(url)
        // #endif
      },
      jumpOrder(actNo) {
        uni.reLaunch({
          url: '/pages/order/index?backUrl=/pages/store/index&actNo=' + actNo
        });
      },
      converData(item) {
        let list = []
        if (item.inventory > item.galleryCount) {
          list.push({
            value: 'gallery',
            text: '上架'
          })
        }
        if (list.length){
            this.optionsOp.forEach(e => {
            list.push(e)
          })
        } else{
          list = this.optionsOp
        }
        item.optionsOp=list
      },
      getPage() {
        this.isLoading = true
        if (this.queryParam.inventory == 1) {
          this.queryParam.inventoryFrom = 1
          this.queryParam.inventoryTo = ''
        } else if (this.queryParam.inventory == 0) {
          this.queryParam.inventoryFrom = ''
          this.queryParam.inventoryTo = 0
        } else {
          this.queryParam.inventoryFrom = ''
          this.queryParam.inventoryTo = ''
        }
        this.getData2()
        this.emtityMsg = ''
        goodsInventoryApi.pageGoods(this.queryParam).then(res => {
          this.isLoading = false
          if (res.subCode === 1000) {
            this.totalCount = res.data ? res.data.pageInfo.totalCount : 0
            if (this.totalCount == 0) {
              this.emtityMsg = '暂无相关数据'
              this.loadStatus = 'nomore';
              this.isLoadMore = false
            } else {
              res.data.list.forEach(e => {
                this.converData(e)
                this.tableData.push(e)
              })
              if (this.totalCount <= this.tableData.length) {
                this.loadStatus = 'nomore';
                this.isLoadMore = false
              } else {
                this.loadStatus = 'nomore';
                this.isLoadMore = true
              }
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      },
      resetData() {
        this.queryParam = {
          warehouseId: '',
          channelId: '',
          createTimeFrom: '',
          createTimeTo: '',
          syncTimeFrom: '',
          syncTimeTo: '',
          goodType: '',
          id: '',
          sort:'',
          inventory: 1,
          inventoryFrom: '',
          createUserName: '',
          profitsFrom: '',
          profitsTo: '',
          status: '',
          inventoryTo: '',
          size: '',
          actNo: '',
          goodsId: '',
          pageSize: 10,
          pageNum: 1
        }
        this.isShowDialog2 = false
      },
      listSysDict() {
        let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(
            uni.getStorageSync('sysDictList')) : []
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.statusList = sysDictList.filter(item => item.typeValue == 37)
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
        this.warehouseList = sysDictList.filter(item => item.typeValue == 40)
        this.returnList = sysDictList.filter(item => item.typeValue == 55)
        this.channelIdList = sysDictList.filter(item => item.typeValue == 47)
        this.todayList = sysDictList.filter(item => item.typeValue == 44)
        this.typeList = sysDictList.filter(item => item.typeValue == 20221108)
        this.columns.push(this.typeList)
      },
      search() {
        if (!this.queryParam.name) {
          this.$toast('请输入名称')
          return
        }
        this.queryParam.pageNum = 1
        this.getPage()
      },
      close() {
        this.isShowDialog = false
      },
      changeCurrent() {
        this.search1()
        let paramInventory = this.queryParam.inventory
        let paramToday = this.queryParam.today
        if (paramInventory == 1 && paramToday == 7) {
          this.current = 1
        } else if (paramInventory == 1 && paramToday == 2) {
          this.current = 2
        } else if (paramInventory == 1 && paramToday == 3) {
          this.current = 3
        } else if (paramInventory == 0 && !paramToday) {
          this.current = 4
        }else {
          this.current = 0
        }
      },
      search1() {
        this.tableData = []
        this.queryParam.pageNum = 1
        this.isLoadMore = false
        this.getPage()
      },
      search2() {
        this.tableData = []
        this.queryParam.pageNum = 1
        this.isLoadMore = false
        this.isShowDialog2 = false
        this.getPage()
      },
      chooseSort(item) {
        this.isShowSort = false
        this.queryParam.sort = item.fieldValue
        this.sortName = item.fieldName
        this.search1()
      },
      resetSort() {
        this.isShowSort = false
        this.queryParam.sort = ''
        this.sortName ='排序'
      },
      resetHandle() {
        this.queryParam = {
          warehouseId: '',
          channelId: '',
          syncTimeFrom: '',
          goodType: '',
          syncTimeTo: '',
          createUserName: '',
          createTimeFrom: '',
          createTimeTo: '',
          status: '',
          id: '',
          sort:'',
          inventory: 1,
          inventoryFrom: '',
          inventoryTo: '',
          profitsFrom: '',
          profitsTo: '',
          size: '',
          actNo: '',
          goodsId: '',
          pageSize: 10,
          pageNum: 1
        }
        this.current = 0
        this.search1()
      },
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      tabClick(item) {
        this.queryParam.inventory = item.inventory
        this.queryParam.today = item.today
        this.search1()
      },
      goDetail(id) {
        this.$navigateTo('/pages/store/detail?id=' + id)
      },
      add() {
        uni.reLaunch({
          url: '/pages/goodsBase/index'
        });
      },

      goDel(id) {
        var _this = this;
        uni.showModal({
          title: '',
          confirmColor: '#409eff',
          content: '是否删除',
          success: function (res) {
            if (res.confirm) {
              goodsInventoryApi.delById(id).then(res => {
                _this.$toast(res.subMsg)
                if (res.subCode === 1000) {
                  _this.search1()
                }
              })
            } else if (res.cancel) {
            }
          }
        });
      },
      update(row) {
        this.$navigateTo('/pages/store/update?id=' + row.id)
      },
      batchOp() {
        this.showSd = !this.showSd
      },
      warehouseDetail(goodsId , actNo,img) {
        this.$navigateTo('/pages/store/warehouseDetail?goodsId=' + goodsId +'&actNo=' +actNo +'&img=' +img)
      },
      gallery(row) {
        this.$navigateTo('/pages/store/storeUp?id=' + row.id)
      },
      delItem(id) {
        for (let i = 0; i < this.ids.length; i++) {
          if (this.ids[i] === id) {
            this.ids.splice(i, 1)
          }
        }
      },
      checkedAll() {
        this.checkAll = !this.checkAll
        this.ids = []
        this.tableData.map(item => {
          if (this.checkAll) {
            this.ids.push(item.id)
          } else {
            this.delItem(item.id)
          }
        })
        this.tableData.forEach((obj) => (obj.checked = this.checkAll));
      },
      initBatch() {
        this.showSd = false
        this.checkAll = false
        this.ids = []
        this.tableData.forEach((obj) => (obj.checked = false));
      },
      changeChecked(row) {
        row.checked = !row.checked
        this.tableData.map(item => {
          if (item.id === row.id) {
            if (item.checked) {
              this.ids.push(item.id)
            } else {
              this.delItem(item.id)
            }
          }
        })
        let idLength = this.ids.length
        if (idLength == this.tableData.length) {
        // if (idLength == this.totalCount) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      },
      showSdClick() {
        this.showSd = !this.showSd
      },
      plsc() {
        if (!this.ids.length) {
          this.$toast('请选择商品')
          return
        }
        var _this = this;
        uni.showModal({
          title: '',
          confirmColor: '#409eff',
          content: '是否删除'+ _this.ids.length + "条商品",
          success: function (res) {
            if (res.confirm) {
              goodsInventoryApi.batchdelete(_this.ids).then(res => {
                _this.$toast(res.subMsg)
                if (res.subCode === 1000) {
                  _this.search1()
                }
              })
            } else if (res.cancel) {
            }
          }
        });
      }
    }
  };
</script>

<style>
  @import '@/assets/index/style.css';
</style>
