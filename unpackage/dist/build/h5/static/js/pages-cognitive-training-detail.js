(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cognitive-training-detail"],{"000f":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 产品相关 */.container[data-v-fac460d4]{width:%?750.02?%;max-width:%?750.02?%;box-sizing:border-box;font-size:%?21.97?%;color:#333;overflow:hidden;margin:0 auto}',""]),t.exports=e},"08e3":function(t,e,a){"use strict";(function(t){a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("99af");var i=n(a("6f26")),o=n(a("f907")),d=n(a("7413")),s=a("1493"),r={props:{detail:{type:Object,default:function(){return{}}},pageType:{type:String,default:"1"},ewmName:{type:String,default:""}},components:{payment:i.default,payResult:o.default,kfCode:d.default},data:function(){return{userInfo:{},payOrderId:"",isShowPayResult:!1,paySuccess:!1,isShowKfCode:!1,payReturnMsg:{},isWechat:this.$isWechat}},mounted:function(){if(this.userInfo=uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):{},!this.$pad){var t=getCurrentPages(),e=(t[t.length-1].route,t[t.length-1].options||t[t.length-1].$route.query),a=e.status,n=e.payOrderId;a&&(this.payReturnMsg=2==a?{payRes:!0,payOrderId:n}:{payRes:!1,payOrderId:n},this.isShowPayResult=!0)}},methods:{nextHandle:function(t){this.payOrderId=t.payOrderId,1==this.pageType?(0,s.navigateTo)("/pages/evaluation/sort?payOrderId="+t.payOrderId):this.goEvaluation()},closePayResultHandle:function(e){t.log(e),this.paySuccess=e.payRes,this.payOrderId=e.payOrderId},goEvaluation:function(){"2210081722147310027"==this.detail.businessType?getApp().goCognitiveTraining({token:this.userInfo.token,isNeedLandscape:"yes",payOrderId:this.payOrderId?this.payOrderId:this.detail.payOrderId}):getApp().goEvalution({token:this.userInfo.token,requestType:1,payOrderId:this.payOrderId?this.payOrderId:this.detail.payOrderId,backType:2})},appointmentHandle:function(t){(0,s.navigateTo)("/pages/evaluation/artificial?goodsId=".concat(t.goodsId,"&amount=").concat(t.amount,"&originalAmount=").concat(t.originalAmount,"&addressFlag=").concat(t.addressFlag))},goAppointmentDetail:function(t){getApp().goHealthConsulting({payOrderId:t,token:this.userInfo.token,type:2})},closeKfHandle:function(){this.isShowKfCode=!1},showKfCode:function(){this.isShowKfCode=!0},goNextHandle:function(){this.isShowPayResult=!1,1==this.pageType?(0,s.navigateTo)("/pages/evaluation/sort?payOrderId="+this.payReturnMsg.payOrderId):this.goEvaluation(this.payReturnMsg.payOrderId)},closeHandle:function(){this.isShowPayResult=!1;var t=getCurrentPages(),e=(t[t.length-1].route,t[t.length-1].options||t[t.length-1].$route.query),a="";for(var n in e)"payOrderId"!=n&&"status"!=n&&"mchOrderNo"!=n&&(a+="&"+n+"="+e[n]);var i="";i=a?"".concat(location.href.split("?")[0],"?").concat(a):"".concat(location.href.split("?")[0]),window.history.replaceState(null,null,i)}}};e.default=r}).call(this,a("5a52")["default"])},3739:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 产品相关 */.content[data-v-7713d1f2]{padding:%?0?% %?0?% %?73.24?% %?0?%}.rich-text img[data-v-7713d1f2]{width:100%}.bottom[data-v-7713d1f2]{width:%?750.02?%;max-width:%?750.02?%;height:%?64.45?%;background-color:#fff;display:flex;align-items:center;justify-content:space-between;position:fixed;bottom:0;left:50%;margin-left:%?-375.01?%}.bottom .kf[data-v-7713d1f2]{margin-left:%?32.23?%}.bottom .kf uni-image[data-v-7713d1f2]{width:%?32.23?%;height:%?32.23?%;margin:0 auto;display:block}.bottom .kf > uni-view[data-v-7713d1f2]{font-size:%?11.72?%;color:#5796f8}.bottom .btm-right[data-v-7713d1f2]{display:flex;align-items:center}.bottom .btm-right .btn-buy[data-v-7713d1f2], .bottom .btm-right .btn-buy-get[data-v-7713d1f2]{display:flex;justify-content:center;align-items:center;box-sizing:border-box;background-color:#43c9a7;height:%?55.68?%;color:#fff;font-size:%?21.98?%;font-weight:700;border-radius:%?7.33?%;margin-right:%?14.65?%}.bottom .btm-right .btn-buy .price-1[data-v-7713d1f2], .bottom .btm-right .btn-buy-get .price-1[data-v-7713d1f2]{padding-left:%?21.98?%;font-size:%?23.44?%}.bottom .btm-right .btn-buy .price-2[data-v-7713d1f2], .bottom .btm-right .btn-buy-get .price-2[data-v-7713d1f2]{font-size:%?13.19?%;color:#fff;padding-left:%?7.33?%;text-decoration:line-through}.bottom .btm-right .btn-buy[data-v-7713d1f2]{width:%?629.3?%;margin-right:%?21.98?%}.bottom .btm-right .btn-buy-get[data-v-7713d1f2]{width:%?307.69?%}.bottom .btm-right .btn-pg-group[data-v-7713d1f2]{display:flex;align-items:center}.bottom .btm-right .btn-pg-group > uni-view[data-v-7713d1f2]:nth-child(1){background-color:#fff;border:1px solid #43c9a7;color:#43c9a7;box-sizing:border-box;margin-right:%?7.33?%;position:relative}.bottom .btm-right .btn-pg-group > uni-view[data-v-7713d1f2]:nth-child(1)::after{content:"您已购买";width:%?80.59?%;height:%?31.5?%;line-height:%?31.5?%;display:block;background-color:#fc6666;border-radius:%?12.45?% %?12.45?% 0 %?12.45?%;font-size:%?13.19?%;color:#fff;font-weight:700;position:absolute;top:%?-16.85?%;left:%?43.96?%;text-align:center}@media screen and (max-width:500px){.bottom[data-v-7713d1f2]{height:%?116?%}.bottom .kf[data-v-7713d1f2]{margin-left:%?16?%}.bottom .kf uni-image[data-v-7713d1f2]{width:%?60?%;height:%?60?%}.bottom .kf > uni-view[data-v-7713d1f2]{font-size:%?22?%}.bottom .btm-right .btn-buy[data-v-7713d1f2], .bottom .btm-right .btn-buy-get[data-v-7713d1f2]{height:%?92?%;font-size:%?34?%}.bottom .btm-right .btn-buy .price-1[data-v-7713d1f2], .bottom .btm-right .btn-buy-get .price-1[data-v-7713d1f2]{padding-left:%?21.98?%;font-size:%?44?%}.bottom .btm-right .btn-buy .price-2[data-v-7713d1f2], .bottom .btm-right .btn-buy-get .price-2[data-v-7713d1f2]{font-size:%?24?%;color:#fff;padding-left:%?10?%;text-decoration:line-through}.bottom .btm-right .btn-buy-get[data-v-7713d1f2]{flex-direction:column-reverse}.bottom .btm-right .btn-buy-get .price-1[data-v-7713d1f2], .bottom .btm-right .btn-buy-get .price-2[data-v-7713d1f2]{font-size:%?26?%}.bottom .btm-right .btn-buy[data-v-7713d1f2]{width:%?600?%}.bottom .btm-right .btn-buy-get[data-v-7713d1f2]{width:%?305?%}.bottom .btm-right .btn-pg-group > uni-view[data-v-7713d1f2]:nth-child(1){margin-right:%?10?%;position:relative}.bottom .btm-right .btn-pg-group > uni-view[data-v-7713d1f2]:nth-child(1)::after{width:%?115?%;height:%?36?%;line-height:%?36?%;border-radius:18px 18px 2px 18px;font-size:%?24?%;top:%?-18?%;left:%?-10?%}}',""]),t.exports=e},3910:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"rich-text"},[t._t("default")],2)],1),n("v-uni-view",{staticClass:"bottom"},[n("v-uni-view",{staticClass:"kf",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showKfCode.apply(void 0,arguments)}}},[n("v-uni-image",{attrs:{src:a("5c28")}}),n("v-uni-view",[t._v("客服咨询")])],1),n("v-uni-view",{staticClass:"btm-right"},["2210081722313010031"==t.detail.businessType||"2210081722147310027"==t.detail.businessType?["2210081722147310027"==t.detail.businessType?n("v-uni-view",[t.paySuccess||t.detail.payStatus&&0!=t.detail.payStatus?n("v-uni-view",{staticClass:"btn-buy",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goEvaluation.apply(void 0,arguments)}}},[t._v("立即训练")]):n("v-uni-view",[n("payment",{attrs:{price:t.detail.amount,goodsId:t.detail.goodsId,addressFlag:+t.detail.addressFlag,btnText:"训练",buyType:"5"},on:{nextHandle:function(e){arguments[0]=e=t.$handleEvent(e),t.nextHandle.apply(void 0,arguments)},closePayResultHandle:function(e){arguments[0]=e=t.$handleEvent(e),t.closePayResultHandle.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"btn-buy"},[n("v-uni-text",[t._v("立即购买")]),t.paySuccess||t.detail.payStatus&&0!=t.detail.payStatus?t._e():n("v-uni-text",{staticClass:"price-1"},[t._v(t._s(t.detail.amount/100>0?"¥"+t.detail.amount/100:"限时免费"))]),n("v-uni-text",{staticClass:"price-2"},[t._v("¥"+t._s(t.detail.originalAmount/100))])],1)],1)],1)],1):n("v-uni-view",{class:[t.paySuccess||t.detail.payStatus&&0!=t.detail.payStatus?"btn-pg-group":""]},[t.paySuccess||t.detail.payStatus&&0!=t.detail.payStatus?n("v-uni-view",{class:[t.paySuccess||t.detail.payStatus&&0!=t.detail.payStatus?"btn-buy-get":"btn-buy"],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goEvaluation.apply(void 0,arguments)}}},[t._v("立即评估")]):t._e(),n("v-uni-view",[n("payment",{attrs:{price:t.detail.amount,goodsId:t.detail.goodsId,addressFlag:+t.detail.addressFlag,btnText:"评估",buyType:"1"},on:{nextHandle:function(e){arguments[0]=e=t.$handleEvent(e),t.nextHandle.apply(void 0,arguments)},closePayResultHandle:function(e){arguments[0]=e=t.$handleEvent(e),t.closePayResultHandle.apply(void 0,arguments)}}},[n("v-uni-view",{class:[t.paySuccess||t.detail.payStatus&&0!=t.detail.payStatus?"btn-buy-get":"btn-buy"]},[n("v-uni-text",[t._v("立即购买")]),n("v-uni-view",[n("v-uni-text",{staticClass:"price-1"},[t._v(t._s(t.detail.amount/100>0?"¥"+t.detail.amount/100:"限时免费"))]),n("v-uni-text",{staticClass:"price-2"},[t._v("¥"+t._s(t.detail.originalAmount/100))])],1)],1)],1)],1)],1)]:[t.paySuccess||t.detail.payStatus&&0!=t.detail.payStatus?n("v-uni-view",{staticClass:"btn-buy",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goAppointmentDetail(t.detail.payOrderId)}}},[t._v("查看预约")]):n("v-uni-view",{staticClass:"btn-buy",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.appointmentHandle(t.detail)}}},[t._v("立即预约")])]],2)],1),t.isShowPayResult?n("pay-result",{attrs:{payReturnMsg:t.payReturnMsg,btnText:"2210081722147310027"==t.detail.businessType?"训练":"评估"},on:{closeHandle:function(e){arguments[0]=e=t.$handleEvent(e),t.closeHandle.apply(void 0,arguments)},goNextHandle:function(e){arguments[0]=e=t.$handleEvent(e),t.goNextHandle.apply(void 0,arguments)}}}):t._e(),t.isShowKfCode?n("kf-code",{attrs:{ewmName:t.ewmName},on:{closeKfHandle:function(e){arguments[0]=e=t.$handleEvent(e),t.closeKfHandle.apply(void 0,arguments)}}}):t._e()],1)},i=[]},"5eb2":function(t,e,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("4de4"),a("d3b7");var i=n(a("37cf")),o=n(a("bb66")),d=n(a("f0d4")),s=(a("1493"),a("912e")),r={mixins:[s.mixin],components:{navBar:o.default,tempDetail:d.default,fab:i.default},data:function(){return{userInfo:{},goodsId:"",detail:{},isPad:this.$pad,isRcommend:"false",backdelta:1}},mounted:function(){this.userInfo=uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):{},this.getGoodsList()},onLoad:function(t){this.goodsId=t.goodsId?t.goodsId:"",this.isRcommend=t.isRcommend?t.isRcommend:"false",t.backdelta&&(this.backdelta=t.backdelta)},methods:{getGoodsList:function(){var t=this;this.$request({url:"/gw/h5/v1/front/goods/goodsList",method:"post",data:{token:this.userInfo.token,type:2,userId:this.userInfo.userId}}).then((function(e){if(1e3===e.status){var a=e.data?e.data.filter((function(e){return e.goodsId==t.goodsId})):[];t.detail=a.length?a[0]:{}}else uni.showToast({title:e.msg,icon:"none",duration:2e3})}))}}};e.default=r},"912e":function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.mixin=void 0;e.mixin={data:function(){return{isShowFab:!0}},onHide:function(){this.isShowFab=!1},onShow:function(){this.isShowFab=!0},methods:{}}},a57f:function(t,e,a){"use strict";a.r(e);var n=a("08e3"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},ae42:function(t,e,a){"use strict";a.r(e);var n=a("c17b"),i=a("e475");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("e0cf");var d=a("f0c5"),s=Object(d["a"])(i["default"],n["b"],n["c"],!1,null,"fac460d4",null,!1,n["a"],void 0);e["default"]=s.exports},c17b:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("nav-bar",{attrs:{title:"认知症数字疗法",backdelta:t.backdelta}}),a("v-uni-view",{staticClass:"container"},[a("temp-detail",{attrs:{detail:t.detail,pageType:"2",ewmName:"false"==t.isRcommend?"szlf-xqy":"szlf-xqy-tj"}},[a("v-uni-view",[a("v-uni-rich-text",{attrs:{nodes:t.isPad?t.detail.info:t.detail.appInfo}})],1)],1)],1),t.isShowFab?a("fab",{attrs:{isOpenFabMenu:!!t.isPad}}):t._e()],1)},i=[]},d10c:function(t,e,a){var n=a("000f");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("377f318e",n,!0,{sourceMap:!1,shadowMode:!1})},d79a:function(t,e,a){var n=a("3739");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("247d7c9c",n,!0,{sourceMap:!1,shadowMode:!1})},e0cf:function(t,e,a){"use strict";var n=a("d10c"),i=a.n(n);i.a},e475:function(t,e,a){"use strict";a.r(e);var n=a("5eb2"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},ec4c:function(t,e,a){"use strict";var n=a("d79a"),i=a.n(n);i.a},f0d4:function(t,e,a){"use strict";a.r(e);var n=a("3910"),i=a("a57f");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("ec4c");var d=a("f0c5"),s=Object(d["a"])(i["default"],n["b"],n["c"],!1,null,"7713d1f2",null,!1,n["a"],void 0);e["default"]=s.exports}}]);