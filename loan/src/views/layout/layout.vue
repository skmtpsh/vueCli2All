<template>
  <el-container>
    <Sidebar />
    <el-container class="content">
      <subhead></subhead>
      <!-- <el-scrollbar id="pagescoll"> -->
      <bread></bread>
      <main-app></main-app>
      <!-- </el-scrollbar> -->
    </el-container>
  </el-container>
</template>
<script>
import MainApp from './components/mainapp'
import Sidebar from './components/sidebar'
import Subhead from './components/subhead'
import Bread from './components/bread'
export default {
  name: 'Layout',
  components: {
    MainApp,
    Sidebar,
    Subhead,
    Bread
  }
}
</script>
