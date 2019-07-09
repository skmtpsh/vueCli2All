<template>
  <el-header id="header">
    <ul class="navbar">
      <li class="toggle">
        <svg-icon icon-class="cate" />
      </li>
      <li class="nav">
        <router-link tag="a" to="/company/list">企业中心</router-link>
        <router-link tag="a" to="/finance/statistics">财务中心</router-link>
        <router-link tag="a" to="/site/nlist">网站管理</router-link>
        <!-- <router-link tag="a" to="/mess/index">信息回调</router-link> -->
      </li>
      <li></li>
      <li class="info">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-button size="middle" type="danger" circle>{{info.staffName ? info.staffName.substring(0, 1) : ''}}</el-button>
          </span>
          <el-dropdown-menu slot="dropdown"  style="width:200px;">
            <el-dropdown-item class="userinfo">
              {{info.staffName}}
            </el-dropdown-item>
            <el-dropdown-item class="divider"></el-dropdown-item>
            <el-dropdown-item @click.native="logOut"><svg-icon icon-class="logout" /> 退出</el-dropdown-item>
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
      console.log(sessionStorage.getItem('type') === 'sso')
      if (sessionStorage.getItem('type') === 'sso') {
        window.location.href = 'http://sso.dun.yipurse.com/start/index.html#/user/login'
      } else {
        window.location.reload()
      }
    },
    toPinyin () {
    }
  }
}
</script>
