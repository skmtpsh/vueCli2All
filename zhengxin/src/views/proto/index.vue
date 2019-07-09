<template>
  <div class="page">
    <x-header :left-options="{backText: ''}" >{{protoTitle}}</x-header>
    <Scroll class="wrapper" ref="wrapper" style="bottom: 0">
      <div>
        <component :is="compName" class="pageProto"></component>
      </div>
    </Scroll>
  </div>
</template>
<script>
import Scroll from '@/components/scroll/index'
export default {
  name: 'proto',
  components: {
    Scroll,
    userAuthTag: () => import('./userAuth.vue'),
    userBuyTag: () => import('./userBuy.vue')
  },
  data () {
    return {
      protoTitle: '协议',
      compName: 'userAuthTag'
    }
  },
  created () {
    this.protoTitle = this.$route.query.title
    this.compName = this.$route.query.compName
  }
}
</script>
<style lang="less">
@import url('../credit/credit.less');
.pageProto {
  // padding-top: 180px;
  .font-dpr(32px);
  line-height: 1.8;
  padding: 180px 32px 32px;
}
</style>