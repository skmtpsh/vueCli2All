<template>
  <el-aside width="200px" id="sidebar" class="sidebar">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="logotxt">
        <router-link tag="a" to="/"><img :src="require(`@/assets/logo.png`)"/></router-link>
      </div>
      <LeftMenu mode="vertical"></LeftMenu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
import LeftMenu from './menu'
export default {
  name: 'Sidebar',
  components: {
    LeftMenu
  }
}
</script>
