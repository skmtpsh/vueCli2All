<template>
  <el-header id="header">
    <ul class="navbar">
      <li class="toggle">
        <svg-icon icon-class="cate" />
      </li>
      <li class="nav">
        <!-- <topMenu mode="horizontal"></topMenu> -->
      </li>
      <li></li>
      <li class="info">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-button size="small" circle><b> {{userName}} </b></el-button>
          </span>
          <el-dropdown-menu slot="dropdown"  style="width:200px;">
            <el-dropdown-item class="userinfo" disabled="">
              <i class="el-icon-mobile-phone"></i> {{info.staffName}}
            </el-dropdown-item>
            <!-- <el-dropdown-item>个人资料</el-dropdown-item> -->
            <!-- <el-dropdown-item>帮助中心</el-dropdown-item> -->
            <el-dropdown-item @click.native="logOut">
              <i class="el-icon-delete"></i> 退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </el-header>
</template>
<script>
import topMenu from './menu'
import { mapGetters } from 'vuex'
import { clearAll } from '@/utils/token'
// import PinYin from '@/components/pinyin/index'
export default {
  name: 'SubHead',
  components: {
    topMenu
  },
  data () {
    return {
      user: ''
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ]),
    userName () {
      // return this.info.staffName ? PinYin.cnToPinYin(this.info.staffName).substr(0, 1) : '匿'
      return this.info.staffName ? this.info.staffName.substr(0, 1) : '匿'
    }
  },
  mounted () {
    // console.log(this.info, this.info.staffName)
  },
  methods: {
    logOut () {
      clearAll()
      if (this.info.systemOs === 'sso') {
        window.location.href = process.env.LOGIN_OUT_RUL
      } else {
        window.location.reload()
      }
    }
  }
}
</script>
