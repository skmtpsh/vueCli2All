<template>
  <div class="page">
    <!-- <x-header :left-options="{backText: ''}">详情</x-header> -->
    <section class="pagehead">
      <h2 class="log-title">{{myValue.title}}</h2>
      <h4 class="log-sub-title">{{myValue.createTime}}</h4>
      <div class="description">
        <p v-html="myValue.content"></p>
      </div>
    </section>
  </div>
</template>
<script>
// import {localstorage} from '@/libs/localStorage.js'
import { XHeader } from 'vux'
const localStorage = require('localStorage')
export default {
  components: {
    XHeader
  },
  data () {
    return {
      message: [],
      myValue: null
    }
  },
  created () {
    this.query = this.$route.query
    this.myValue = JSON.parse(localStorage.getItem('item'))
    if (this.myValue.id.length === 0) {
      this.$router.go(-1)
    }
  },
  methods: {
    onBlur () {
    }
  },
  mounted () {
  },
  beforeCreate () {
    // document.getElementsByTagName('body')[0].className = 'main'
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
.page.main {
  background-color: #ffffff;
  height: 100%;
  padding-bottom: 50px /*no*/
}
.img {
  max-width: 100%;
}
img{
  max-width: 100%;
}
.pagehead {
  margin-top: 0.4992rem;
  padding: 0 0.2rem;
}
.log-title {
  font-size: 0.5314rem;
  margin-bottom: 0.4348rem;
  font-weight: normal;
  color: #333333;
}
.log-sub-title {
  font-size: 0.3382rem;
  color: #979eac;
  font-weight: normal;
  margin-bottom: 0.7568rem;
}
.vux-header {
  height: 1.0628rem;
  background: #ffffff!important;
}
.description p {
  font-size: 0.4106rem;
  color: #333333;
  text-indent:0.8212rem;
  line-height: 0.8052rem;
}
.vux-header {
  padding: 0.3221rem 0 0.3221rem !important;
  background: #ffffff!important;
}
.vux-header .vux-header-title {
  color: #333333!important;
  font-weight: bold!important;
}
.vux-header .vux-header-left .left-arrow:before {
  top: 0.35rem!important;
  border: 3px solid #000000!important;
  border-width: 5px 0 0 5px!important;
}
</style>
