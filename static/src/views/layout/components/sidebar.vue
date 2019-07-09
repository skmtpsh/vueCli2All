<template>
  <el-aside width="200px" id="sidebar" class="sidebar">
    <el-scrollbar class="scrollbar-wrapper">
      <div class="logotxt"><img :src="require(`@/assets/logo.png`)"/></div>
      <el-menu background-color="#333d54"
        text-color="rgba(255,255,255,0.5)"
        active-text-color="rgba(255,255,255)"
        :default-active="$route.name"
        @select="handleSel"
        :collapse="isCollapse"
        :default-openeds="openMenu"
        v-if="sidebarList"
        >
          <div v-for="(item, index) in sidebarList" :key="index">
            <TreeMenu :treedata="item"></TreeMenu>
          </div>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
import path from 'path'
// import { mapMutations, mapGetters } from 'vuex'
import sideBar from '@/meta/sidebar'
import TreeMenu from '@/components/tree/treemenu'
export default {
  name: 'Sidebar',
  components: {
    TreeMenu
  },
  data () {
    return {
      isCollapse: false,
      openMenu: []
    }
  },
  computed: {
    sidebarList () {
      return sideBar.mainbar()
    }
    // ...mapGetters([
    //   'sidebarList'
    // ])
  },
  methods: {
    // ...mapMutations({
    //   setSidebarList: 'SET_SIDEBAR_LIST'
    // }),
    handleSel (key, keyPath) {
      // console.log(path.resolve(process.cwd(), ...keyPath))
      let sitePath = path.resolve(process.cwd(), ...keyPath)
      this.$router.push({path: sitePath})
    }
  },
  created () {
    // this.setSidebarList('mainbar')
    this.sidebarList.forEach((item) => {
      this.openMenu.push(item.key)
    })
  },
  watch: {
    sidebarList () {
      if (this.sidebarList) {
        this.sidebarList.forEach((item) => {
          this.openMenu.push(item.key)
        })
      }
    }
  }
}
</script>
