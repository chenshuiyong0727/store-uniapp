import App from './App'

import '@/utils/prototype.js'
import '@/static/style/common.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(ElementUI);
Vue.use(MintUI)

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