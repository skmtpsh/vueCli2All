<template>
  <div id="app">
  <!-- <div id="app"> -->
    <!-- <view-box ref="viewBox"> -->
      <!-- <keep-alive> -->
      <router-view v-if="isRouterAlive"></router-view>
      <!-- </keep-alive> -->
    <!-- </view-box> -->
  </div>
</template>
<script>
import RouteConfig from '@/router/config'
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      console.log(3)
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    naviGoBack () {
      let routePramas = {
        firstLevel: [],
        secondLevel: []
      }
      RouteConfig.routesList.forEach((item) => {
        if (!item.children && item.compath !== 'index') {
          routePramas.firstLevel.push(`/${RouteConfig.routePath}/${item.path}`)
        }
        if (item.children) {
          routePramas.secondLevel.push(`/${RouteConfig.routePath}/${item.path}`)
        }
      })
      // 判断路由中是否有认定的值跳转到集合页面否则返回上一页
      routePramas.firstLevel.filter((item) => {
        // console.log(item, this.$route.path)
        return item === this.$route.path
      })

      if (routePramas.firstLevel.filter(item => item === this.$route.path).length > 0) {
        this.$router.push({path: `/${RouteConfig.routePath}/status`, query: this.$route.query ? this.$route.query : ''})
      } else {
        if (routePramas.secondLevel.filter(item => item === this.$route.path).length > 0) {
          this.$router.go(-1)
        } else {
          this.$router.push({path: `/${RouteConfig.routePath}/status`, query: this.$route.query ? this.$route.query : ''})
        }
      }
    }
  },
  mounted () {
    window.naviGoBack = this.naviGoBack
  }
}
</script>
