<template>
  <div>
    <el-submenu v-if="treedata.child && treedata.child.length > 0" :index="treedata.key">
      <template slot="title">
        <svg-icon :icon-class="treedata.ico" v-if="treedata.ico" />
        <span slot="title">{{treedata.value}}</span>
      </template>
      <div v-for="(item, index) in treedata.child" :key="index">
        <treeItem :treedata="item"></treeItem>
      </div>
    </el-submenu>
    <el-menu-item v-else :index="treedata.key" >
      <template slot="title">
        <svg-icon :icon-class="treedata.ico" v-if="treedata.ico" />
        <span slot="title">{{treedata.value}}</span>
      </template>
    </el-menu-item>
  </div>
</template>
<script>
export default {
  name: 'treeItem',
  props: ['treedata'],
  data () {
    return {}
  }
}
</script>
