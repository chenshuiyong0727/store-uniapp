import Vue from 'vue'
import DICT_KEYS from '@/utils/staticEnum'
import { parseTime } from './index'
import { request } from '@/utils/request.js' // 引入api文件

const typeToStr = (type,value) => {
  let res = sysDictList.filter(
      item => item.typeValue == type && item.fieldValue == value)
  return res.length ? res[0].fieldName : '--'
}
const getTypeIndex = (type,value) => {
  let list = sysDictList.filter(
      item => item.typeValue == type)
  for (let i = 0; i < list.length; i++) {
    if (list[i].fieldValue == value) {
      return i
    }
  }
  return 0;
  // return res.length ? res[0].fieldName : '--'
}

let sysDictList = uni.getStorageSync('sysDictList') ? JSON.parse(uni.getStorageSync('sysDictList')) : []
if (!sysDictList.length) {
  request({
    url: '/gw/op/v1/base/sys/dict/listSysDict',
    method: 'post'
  }).then(res => {
    if (res.status === 1000) {
      sysDictList = res.data
      uni.setStorageSync('sysDictList', JSON.stringify(res.data))
    } else {
      uni.showToast({
        title: res.msg,
        icon: 'none',
        duration: 2000
      })
    }
  })
}

Vue.filter('dictToDesc', (value, type) => {
  let res = sysDictList.filter(item => item.typeValue == DICT_KEYS[type] && item.fieldValue == value)
  return res.length ? res[0].fieldName : '--'
})
Vue.filter('dictToDesc', (value, type) => {
  let res = sysDictList.filter(
      item => item.typeValue == DICT_KEYS[type] && item.fieldValue == value)
  return res.length ? res[0].fieldName : '--'
})
Vue.filter('dictToDescTypeValue', (value, type) => {
  let res = sysDictList.filter(
      item => item.typeValue == type && item.fieldValue == value)
  return res.length ? res[0].fieldName : '--'
})
Vue.filter('dictToDescTypeValue2', (value, type) => {
  let res = sysDictList.filter(
      item => item.typeValue == type && item.fieldValue == value)
  let name= res.length ? res[0].fieldName : '--'
  // 截取当前数据到小数点后两位
  if (!name || name.length < 3) {
    return name
  }
  let realVal = name.substring(0,3)
  return realVal
})
Vue.filter('numFilter', (value) => {
  // 截取当前数据到小数点后两位
  let realVal = parseFloat(value).toFixed(2)
  return realVal
})
Vue.filter('numFilterTo0', (value) => {
  // 截取当前数据到小数点后两位
  let realVal = parseFloat(value).toFixed(0)
  return realVal
})
Vue.filter('numFilter0', (value) => {
  // 截取当前数据到小数点后两位
  let realVal = parseFloat(value).toFixed(0)
  let price1 = realVal.substring(0,realVal.length -1)
  let price2 = realVal.substring(realVal.length - 1,realVal.length)
  if (price2 != 9){
    price2=9
  }
  return price1 +""+price2
})
Vue.filter('sizeFilter', (value) => {
  // 截取当前数据到小数点后两位
  if (!value || value.length < 27) {
    return value
  }
  let realVal = value.substring(0,27) + '...'
  return realVal
})
Vue.filter('sizeFilterNum', (value , num) => {
  // 截取当前数据到小数点后两位
  if (!value || value.length < num) {
    return value
  }
  let realVal = value.substring(0,num)
  if (value.length > num ){
    realVal = realVal  + '...'
  }
  return realVal
})

Vue.filter('formateTime', parseTime)

const getPoundage = (shelvesPrice) => {
  let jsfwf = shelvesPrice * 0.05
  if (jsfwf < 15) {
    jsfwf = 15
  }
  if (jsfwf > 249) {
    jsfwf = 249
  }
  // jsfwf = parseFloat(jsfwf).toFixed(2)

  let zzsxf = shelvesPrice * 0.01
  // zzsxf = parseFloat(zzsxf).toFixed(2)

  let shwffwfBl = 1.5
  if (shelvesPrice >= 600 && shelvesPrice < 2000) {
    shwffwfBl = 1.6
  } else if (shelvesPrice >= 2000) {
    shwffwfBl = 1.8
  }
  let shwffwf = shelvesPrice * 0.01 * shwffwfBl
  // shwffwf = parseFloat(shwffwf).toFixed(2)

  let xfzyfbt = 6
  if (shelvesPrice >= 200 && shelvesPrice < 300) {
    xfzyfbt = 6.5
  } else if (shelvesPrice >= 300) {
    xfzyfbt = 8.5
  }
  // xfzyfbt = parseFloat(xfzyfbt).toFixed(2)

  let poundage = jsfwf + zzsxf + shwffwf + xfzyfbt + 38
  return parseFloat(poundage).toFixed(2)
}

const getThePrice = (shelvesPrice) => {
  let thePrice = shelvesPrice -  getPoundage(shelvesPrice)
  return parseFloat(thePrice).toFixed(2)
}

const getProfits = (shelvesPrice,inprice) => {
  let profits =  getThePrice(shelvesPrice) -inprice  - 10
  return parseFloat(profits).toFixed(2)
}

const getNextMonth = (date) => {
  let arr = date.split('-')
  let year = arr[0] // 获取当前日期的年份
  let month = arr[1] // 获取当前日期的月份
  let day = arr[2] // 获取当前日期的日
  let year2 = year
  let month2 = parseInt(month) + 1
  if (month2 === 13) {
    year2 = parseInt(year2) + 1
    month2 = 1
  }
  let day2 = day
  let days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  let m = year2 + '-' + month2 + '-' + day2
  return m
}
Vue.filter('getProfits', getProfits)
Vue.filter('getThePrice', getThePrice)
Vue.filter('getPoundage', getPoundage)

//
// const getProfits = (shelvesPrice,inprice) => {
//   let jsfwf = shelvesPrice * 0.05
//   if (jsfwf < 15) {
//     jsfwf = 15
//   }
//   if (jsfwf > 249) {
//     jsfwf = 249
//   }
//   // jsfwf = parseFloat(jsfwf).toFixed(2)
//
//   let zzsxf = shelvesPrice * 0.01
//   // zzsxf = parseFloat(zzsxf).toFixed(2)
//
//   let shwffwfBl = 1.5
//   if (shelvesPrice >= 600 && shelvesPrice < 2000) {
//     shwffwfBl = 1.6
//   } else if (shelvesPrice >= 2000) {
//     shwffwfBl = 1.8
//   }
//   let shwffwf = shelvesPrice * 0.01 * shwffwfBl
//   // shwffwf = parseFloat(shwffwf).toFixed(2)
//
//   let xfzyfbt = 6
//   if (shelvesPrice >= 200 && shelvesPrice < 300) {
//     xfzyfbt = 6.5
//   } else if (shelvesPrice >= 300) {
//     xfzyfbt = 8.5
//   }
//   // xfzyfbt = parseFloat(xfzyfbt).toFixed(2)
//
//   let poundage = jsfwf + zzsxf + shwffwf + xfzyfbt + 38
//
//   let profits = shelvesPrice - poundage - inprice - 10
//
//   return parseFloat(profits).toFixed(2)
// }
// Vue.filter('getPoundage ', (value) => {
//   // 截取当前数据到小数点后两位
//   return getPoundage(value)
// })
// Vue.filter('getThePrice ', (value) => {
//   // 截取当前数据到小数点后两位
//   return getThePrice(value)
// })
// Vue.filter('getProfits', (value,price) => {
//   // 截取当前数据到小数点后两位
//   return getProfits(value,price)
// })
Vue.prototype.$getNextMonth = getNextMonth // 挂载到原型上
Vue.prototype.$parseTime = parseTime // 挂载到原型上
Vue.prototype.$typeToStr = typeToStr // 挂载到原型上
Vue.prototype.$getPoundage = getPoundage // 挂载到原型上
Vue.prototype.$getThePrice = getThePrice // 挂载到原型上
Vue.prototype.$getProfits = getProfits // 挂载到原型上
Vue.prototype.$getTypeIndex = getTypeIndex // 挂载到原型上
