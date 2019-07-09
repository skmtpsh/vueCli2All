<template>
  <el-main id="main">
    <router-view />
  </el-main>
</template>
<script>
export default {
  name: 'MainApp',
  data () {
    return {}
  },
  created () {
    console.log(this.$route)
  }
}
</script>
