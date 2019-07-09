<template>
  <icon type="success" class="sucLoading" v-if="loading"></icon>
  <div class="loading-rotate-full" v-else></div>
</template>
<script>
import { Icon } from 'vux'
export default {
  props: ['time'],
  components: {
    Icon
  },
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading = true
    }, this.time)
  }
}
</script>
<style lang="less">
.sucLoading::before {
  color: #35df81 !important;
}
.loading-rotate-full {
  margin-left: .2em;
  margin-right: .2em;
  width: 32px;
  height: 32px;
  border: 3px solid #35df81;
  border-top-color: transparent;
  border-radius: 50%;
  -webkit-animation: rotate 1s linear infinite;
}
@-webkit-keyframes rotate{
  from{
    -webkit-transform: rotate(0);
  }
  to{
    -webkit-transform: rotate(360deg);
  }
}
</style>
