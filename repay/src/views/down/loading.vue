<template>
  <div></div>
</template>
<script>
import DownPath from '@/utils/downurl'
export default {
  data () {
    return {}
  },
  methods: {
    goLink () {
      this.$vux.loading.hide()
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  // 判断iPhone|iPad|iPod|iOS
        window.location.href = DownPath.iosURL
        // window.open(DownPath.iosURL)
      } else if (/(Android)/i.test(navigator.userAgent)) {   // 判断Android
        // 判断微信浏览器
        if (navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1) {
          this.$router.push({path: '/downwx', query: {phone: this.tel, nav: 'wx'}})
          return false
        }
        window.location.href = DownPath.androidURL
        // this.$router.push({path: '/down', query: {channelCode: this.$route.query.channelCode}})
        // window.open(DownPath.androidURL)
      }
      // window.close()
    }
  },
  mounted () {
    setTimeout(() => {
      this.goLink()
    }, 500)
  },
  created () {
    console.log(this.$route)
    this.$vux.loading.show({
      text: '页面跳转中...'
    })
  },
  beforeCreate () {
    document.title = '页面跳转中...'
  }
}
</script>
