<template>
  <sh-container>

  </sh-container>
</template>
<script>
// import v2Api from '@/api/loanv2'
export default {
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$toast.loading({
      mask: false,
      message: '加载中...'
    })
    this.$toast.clear()
  }
}
</script>
<style lang="scss" scoped>
</style>
