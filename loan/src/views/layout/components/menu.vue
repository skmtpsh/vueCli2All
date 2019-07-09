<template>
  <el-menu background-color="#333d54"
    text-color="rgba(255,255,255,0.5)"
    active-text-color="rgba(255,255,255)"
    :default-active="$route.name"
    @select="handleSel"
    :collapse="isCollapse"
    :default-openeds="openMenu"
    :mode="mode"
    v-if="sidebarList"
    >
      <div v-for="(item, index) in sidebarList" :key="index">
        <TreeMenu :treedata="item" :index="index"></TreeMenu>
      </div>
  </el-menu>
</template>
<script>
import path from 'path'
// import { mapMutations, mapGetters } from 'vuex'
import sideBar from '@/meta/sidebar'
import TreeMenu from '@/components/tree/treemenu'
export default {
  components: {
    TreeMenu
  },
  props: ['mode'],
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
      // console.log(keyPath)
      let sitePath = path.resolve(process.cwd(), ...keyPath)
      console.log(sitePath)
      // let siteRoute = path.resolve(...keyPath.slice(1))
      // let newRoutes = sideBar.baseBar.concat([
      //   {
      //     name: '',
      //     meta: {title: '频道管理'},
      //     path: `${sitePath}`,
      //     component: resolve => require([`@/views${siteRoute}`], resolve)
      //   }
      // ])
      // this.$router.addRoutes(newRoutes)
      // let iRoute = JSON.parse(getRoute())
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
