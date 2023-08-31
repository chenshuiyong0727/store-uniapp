import Vue from 'vue'
import { request } from '@/utils/request.js' // 引入api文件
import { envSetting } from '@/utils/env.js'
import { formatTime ,gotoDw,navigateTo,toast,getLocalPath,goBack,hideKeyboard,copyUrl,reLaunch} from '@/utils/util.js'

// #ifdef H5
// import "@/utils/iosNoScale.js"
// #endif

import '@/utils/filter'


// #ifdef H5
// import VConsole from 'vconsole'
// const vConsole = new VConsole()
// Vue.use(vConsole)
//
// import networkTip from '@/components/network-tip'
// Vue.use(networkTip)
// #endif


Vue.filter('formatTime', formatTime)

Vue.prototype.$gotoDw = gotoDw // 挂载到原型上
Vue.prototype.$reLaunch = reLaunch // 挂载到原型上
Vue.prototype.$navigateTo = navigateTo // 挂载到原型上
Vue.prototype.$request = request // 挂载到原型上
Vue.prototype.$fileUrl = envSetting.fileUrl
Vue.prototype.$actionUrl = envSetting.baseURL + '/gw/op/v1/file/uploadFileMinio'
Vue.prototype.$hideKeyboard = hideKeyboard // 挂载到原型上
Vue.prototype.$copyUrl = copyUrl // 挂载到原型上
Vue.prototype.$getLocalPath = getLocalPath // 挂载到原型上
Vue.prototype.$toast = toast // 挂载到原型上
Vue.prototype.$goBack = goBack // 挂载到原型上


// 判断是否是平板
uni.getSystemInfo({
  success: (res) => {
    Vue.prototype.$windowWidth = res.screenWidth
    Vue.prototype.$screenScale = res.windowWidth / res.windowHeight
    Vue.prototype.$platform = res.platform
    Vue.prototype.$systemInfo = res
    if (res.screenWidth > 500) {
      Vue.prototype.$pad = true
    } else {
      Vue.prototype.$pad = false
    }
  }
});

// 判断是否是微信浏览器
// #ifdef H5
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    // 判断是微信浏览器，将头部隐藏
    Vue.prototype.$isWechat = true
  } else {
    Vue.prototype.$isWechat = false
  }

// #endif

// #ifdef APP-PLUS
Vue.prototype.$openType = 'APP'
// #endif

// #ifdef H5
Vue.prototype.$openType = 'H5'
// #endif

// #ifdef MP-WEIXIN
Vue.prototype.$openType = 'APPLET'
// #endif
