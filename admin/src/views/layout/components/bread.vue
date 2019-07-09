<template>
  <el-breadcrumb id="breadnav" separator="/">
    <template v-for="(item, index) in $route.matched">
      <el-breadcrumb-item :key="index">{{item.meta.title}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script>
export default {
  data () {
    return {
      breadPath: []
    }
  },
  created () {
    console.log(this.$route)
  }
}
</script>
