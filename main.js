import App from './App'

import '@/utils/prototype.js'
import uView from 'uview-ui'
Vue.use(uView)
// import uView from '@/uni_modules/uview-ui'
// Vue.use(uView)
// 如此配置即可
// uni.$u.config.unit = 'rpx'
Vue.config.productionTip = false
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)
// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uView)之后执行
uni.$u.setConfig({
  // 修改$u.config对象的属性
  config: {
    // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
    unit: 'px'
  },
  // 修改$u.props对象的属性
  props: {
    // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
    radio: {
      size: 15
    }
    // 其他组件属性配置
    // ......
  }
})
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
