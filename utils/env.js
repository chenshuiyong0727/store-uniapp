// prod 生产 dev 开发
// const env = "test"

const domainName = {
  test: 'natt.yimed.cn',
  prod: 'www.hj-health.cn'
}

const downAppLink = {
  test: 'http://fir.hj-health.cn/portaltest',
  prod: 'http://fir-release.hj-health.cn/release'
}

const baseUrl = {
	test: 'http://192.168.1.125:28027',
	prod: 'http://114.132.243.79:28027'
}

const imgHost = {
  test: 'https://natt.yimed.cn:11902',
  prod: 'https://hjom-oss.hj-health.cn'
}

// const env = process.env.NODE_ENV === 'production' ? 'prod' : 'test'
const env = 'test'

export const envSetting = {
  baseURL: baseUrl[env],
	imgPrefix: imgHost[env],
  domainName: domainName[env],
  downAppLink: downAppLink[env]
}
