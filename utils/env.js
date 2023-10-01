// prod 生产 dev 开发
// const env = "test"


const baseUrl = {
	test: 'http://192.168.43.245:28027', // 华为
	// test: 'http://192.168.1.7:28027',
	// test: 'http://192.168.6.150:28027',
	// test: 'http://192.168.1.125:28027',
	// test: 'http://localhost:28027',
	prod: 'https://www.zyqx312.asia'
	// prod: 'http://114.132.243.79:28027'
}

const imgHost = {
  test: 'https://oss.zyqx312.asia',
  // test: 'http://114.132.243.79:9000',
  // prod: 'http://114.132.243.79:9000',
  prod: 'https://oss.zyqx312.asia'
}

// const env = process.env.NODE_ENV === 'production' ? 'prod' : 'test'
const env = 'test'
// const env = 'prod'

export const envSetting = {
  baseURL: baseUrl[env],
  fileUrl: imgHost[env]
}
