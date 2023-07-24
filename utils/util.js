import {
  myRequest
} from '@/utils/request.js' // 引入api文件
let payOrderId = null
/**
 * 执行页面的跳转
 * @param {string} url 需要跳转的page路径
 * @param {any} [args] (可选)需要给打开的页面传送的数据对象或页面跳转成功的回调, 如果需要转送数据, 又需要回调, 则第二个参数是数据对象，第三个参数为回调
 */
const navigateTo = (url, ...args) => {
	debugger
  const tabPage = [
    '/pages/index/index'
    // '/pages/archives/index',
    // '/pages/my/index'
  ]
	const has = tabPage.some((item) => {
		return url.includes(item)
	})
  if (has) {
    // 解决从二级页面跳转switchTab到指定tab的时候，会先出现上一次打开的一级tab页面，然后再跳到正确的页面，会闪一下
    uni.switchTab({
      url
    })
  } else {
    uni.navigateTo({
      url,
      success: (res) => {
        if (typeof args[0] === 'function') {
          args[0]()
        } else {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('preLoad', args[0])
        }
        if (typeof args[1] === 'function') {
          args[1]()
        }
      }
    })
  }
}

/**
 * 判断token是否即将过期
 * @param {*} time
 * @returns
 */
const isTokenExpire = (time) => {
  let curTime = new Date().getTime()
  let tokenExpireTime = new Date(time).getTime()
  let expierTime = tokenExpireTime - curTime
  let getMinutesTime = expierTime < 0 ? -1 : new Date(expierTime).getMinutes()
  if (getMinutesTime >= 0 && getMinutesTime <= 5) {
    // 即将过期
    return 1
  } else if (getMinutesTime < 0) {
    // 已过期
    return 2
  }
  return 3
}

/**
 * @descripting 轮询管理器功能
 * @param {Function} callback 轮询方法
 * @param {Number} interval 轮询间隔
 */
const pollIntervalManager = (callback, interval = 1000) => {
  let timer
  let isStop = false
  const stop = () => {
    isStop = true
    clearTimeout(timer)
  }
  const start = async () => {
    isStop = false
    await loop()
  }
  const loop = async () => {
    try {
      await callback(stop)
    } catch (err) {
      throw new Error('轮询出错：', err)
    }
    if (isStop) return
    return (timer = setTimeout(loop, interval))
  }
  return {
    start,
    stop
  }
}

/**
 * @descripting 获取url参数
 * @param {String} name 参数名
 */
const getQueryString = (url, name) => {
  let p = url.split('?')[1]
  let params = new URLSearchParams(p)
  return params.get(name)
}

const encrypt = (word, secret_key) => {
  let key = CryptoJS.enc.Utf8.parse(secret_key)
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

/**
 * @formatTime 格式化时间
 * @param {String} time 参数名
 */
const formatTime = (time)=>{
  
	const nDate = new Date(time.replace(/-/g,"/"))
	const year = nDate.getFullYear().toString().padStart(2, 0)
	const month = (nDate.getMonth() +1 ).toString().padStart(2, 0)
	const day = nDate.getDate().toString().padStart(2, 0)
	return year +'-'+ month +'-'+ day
}
const isTimeExpire = () => {
  let userInfo = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : {}
  if (!userInfo || JSON.stringify(userInfo) === '{}') {
    // 未登录
    return false
  }
  let guidTime = userInfo.loginTime ? new Date(userInfo.loginTime.replace(/-/g,"/")).getTime() : new Date().getTime()
  let endTime = guidTime + 7 * 24 * 60 * 60 * 1000
  let beginTime = new Date().getTime()
  if (endTime - beginTime > 0) {
    // 7天内
    return true
  } else {
    return false
  }
}
const getUserInfoGlobal = () => {
  let userInfo = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : {}
	if (JSON.stringify(userInfo) === '{}') {
		return
	}
	return myRequest({
		url: '/gw/h5/v1/front/user/getUcUser',
		method: 'post',
		data: {
			token: userInfo.token,
		},
	}).then((infoRes) => {
		if (infoRes.status === 1000) {
			userInfo.info = infoRes.data
			uni.setStorageSync('userInfo', JSON.stringify(userInfo))
		} else if (infoRes.status === 50302) { // 用户不存在了；可能被删了
			uni.removeStorageSync('userInfo')
			uni.navigateTo({
				url: '/pages/login/index'
			})
		}
	})
}
module.exports = {
  encrypt,
  navigateTo,
  isTokenExpire,
  pollIntervalManager,
  getQueryString,
  formatTime,
	getUserInfoGlobal,
  isTimeExpire
}
