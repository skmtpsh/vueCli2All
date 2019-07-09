<template>
  <router-view />
</template>
<script>
export default {
  name: 'manage',
  watch: {
    '$route' (to, from) {
      if (to.path.indexOf('add') > -1) {
        if (to.query.appId) {
          to.meta.title = '修改产品'
        } else {
          to.meta.title = '添加产品'
        }
      }
    }
  }
}
</script>
