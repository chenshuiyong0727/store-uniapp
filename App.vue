<style lang="scss">
  @import "@/uni_modules/uview-ui/index.scss";
</style>
<script>
  export default {
    globalData: {
      canMounted: true,
      intervalManager: null,
      screenWidth: 500,
      isToday: true,
      isChangeScreen: false,
      isShowFab: true,
      currentScreenStatus: 'portrait'
    },
    onLaunch: function() {
      // 加载字典
      this.initSysDict()
      uni.getSystemInfo({
        success: function(res) {
          console.log('DPR：' + res.pixelRatio)
          console.log('宽度：' + res.screenWidth)
          console.log('高度：' + res.screenHeight)
        }
      })
	  //离线推送点击
		plus.push.addEventListener("click", function(msg) {
			// 存储离线推送点击（此处重点处理离线点击业务，但在线也会走此方法，所以进入具体页面时需要清除缓存，否则在线消息点击进入具体页面后返回首页将会重复跳转）
			uni.setStorageSync("appLaunchedByPush", msg.payload)
			  // console.info(msg)
			// uni.navigateTo({
			//   url: "/pages/my/index"
			// });
      this.$navigateTo('/pages/my/userInfo')
    })
		uni.onPushMessage((res) => {
		let data=res.data.payload;
		// switch (data.type) {
		// 	case "物业管理通知":
		// 		uni.navigateTo({
		// 			url: `/message/detail?id=${data.buzId}&accountId=${uni.getStorageSync('accountId')}&areaId=${data.areaId}`
		// 		});
		// 		break;
		// 	default:
		// 		break;
		// }
		// uni.navigateTo({
		//   url: "/pages/my/userInfo"
		// });
    //   this.$navigateTo('/pages/my/userInfo')
      console.log("收到推送消息：", data) //监听推送消息
		plus.runtime.setBadgeNumber(0)
	});

    },
    onShow() {
      // #ifdef APP-PLUS
      uni.getPushClientId({
        success: (res) => {
          let push_clientid = res.cid
          console.log('客户端推送标识cid:',push_clientid)
          uni.setStorageSync('push_clientid', push_clientid);
          this.bindCid(push_clientid)
        },
        fail(err) {
          console.log(err)
        }
      })
      // #endif
      // #ifdef MP || H5
      uni.onWindowResize((res) => {

        this.globalData.isChangeScreen = !this.globalData.isChangeScreen
        this.globalData.screenWidth = res.size.windowWidth
      })
      // #endif

    },
    mounted() {

    },
    methods: {
      initSysDict() {
        this.$request({
          url: '/gw/op/v1/base/sys/dict/listSysDict',
          method: 'post'
        }).then(res => {
          if (res.status === 1000) {
            uni.setStorageSync('sysDictList', JSON.stringify(res.data))
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
      bindCid(uniPushCid) {
        let data = {}
        data.userId = uni.getStorageSync("user_id")
        if (!data.userId){
          console.info('userid为空')
          return
        }
        data.uniPushCid = uniPushCid
        this.$request({
          url: '/gw/op/v1/auth/update',
          method: 'put',
          data: data
        }).then(res => {
          console.info('更新cid ' ,res)
        })
      },
    }
  }
</script>

<style lang="scss">
</style>
