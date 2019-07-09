<template>
  <div>
    <el-submenu v-if="treedata.child && treedata.child.length > 0" :index="treedata.key" >
      <template slot="title">
        <svg-icon :icon-class="treedata.ico" v-if="treedata.ico" />
        <span slot="title">{{treedata.value}}</span>
      </template>
      <div v-for="(children, index) in treedata.child" v-bind:key="index">
        <el-menu-item :index="children.key">
          <svg-icon :icon-class="children.ico" v-if="children.ico"  />
          {{children.value}}
        </el-menu-item>
        <treeItem :treedata="children.child" v-if="children.child && children.child.length > 0"></treeItem>
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
