<template>
  <el-header id="header">
    <ul class="navbar">
      <li class="toggle">
        <svg-icon icon-class="cate" />
      </li>
      <li class="nav">
        <router-link tag="a" to="/auths/list" active-class="routeActive">认证列表</router-link>
        <router-link tag="a" to="/auths/manage" active-class="routeActive">产品配置</router-link>
      </li>
      <li></li>
      <li class="info">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-button size="middle" type="danger" circle>{{(info.staffName && info.staffName) ? info.staffName.substring(0, 1) : ''}}</el-button>
          </span>
          <el-dropdown-menu slot="dropdown"  style="width:200px;">
            <el-dropdown-item class="userinfo" disabled="">
              <el-button size="mini" icon="el-icon-mobile-phone" circle style="margin-right:10px;"></el-button>{{info.staffName}}
            </el-dropdown-item>
            <!-- <el-dropdown-item>个人资料</el-dropdown-item> -->
            <!-- <el-dropdown-item>帮助中心</el-dropdown-item> -->
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </el-header>
</template>
<script>
import { mapGetters } from 'vuex'
import { removeToken, removeSide } from '@/utils/token'
export default {
  name: 'SubHead',
  data () {
    return {
      user: ''
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
  mounted () {
    // console.log(this.info, this.info.staffName)
  },
  methods: {
    logOut () {
      removeToken()
      removeSide()
      localStorage.clear()
      if (this.info.systemOs === 'sso') {
        window.location.href = process.env.LOGIN_OUT_RUL
      } else {
        window.location.reload()
      }
    },
    toPinyin () {
    }
  }
}
</script>
