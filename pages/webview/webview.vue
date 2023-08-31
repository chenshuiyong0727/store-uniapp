<template>
  <web-view :src="url"></web-view>
</template>

<script>
  export default {
    data() {
      return {
        url: 'https://m.dewu.com/router/product/ProductDetail?spuId='
      }
    },
    onLoad(e) {
      // 传入需要跳转的链接 使用web-view标签进行跳转
      let url = 'https://m.dewu.com/router/product/ProductDetail?spuId='
      url = url + e.spuId
      this.url = decodeURIComponent(url)
      console.log(url)
    }
  }
</script>
