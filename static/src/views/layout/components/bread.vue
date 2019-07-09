<template>
  <el-breadcrumb id="breadnav" separator="/">
    <template v-for="(item, index) in matched">
      <el-breadcrumb-item :key="index" :to="{ path: `${item.path}` }">{{item.meta.title}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script>
export default {
  data () {
    return {
      breadPath: [],
      matched: this.$route.matched
    }
  },
  watch: {
    '$route' (to, from) {
      this.matched = this.$route.matched
    }
  },
  created () {
    // console.log(this.$route)
  }
}
</script>
