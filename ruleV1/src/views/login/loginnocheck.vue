<template>
  <div>
    <span v-loading.fullscreen.lock="fullscreenLoading"></span>
  </div>
</template>
<style scope>
</style>
<script>
// import { getCrypto } from '@/utils/common'
export default {
  components: {
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        type: 'sso'
      },
      fullscreenLoading: false
    }
  },
  created () {
    this.loginForm.username = this.$route.query.user

    this.loginForm.password = this.$route.query.password.slice(6)
    // console.log(this.$route.query.password)
    if (!this.loginForm.username) {
      this.$message.warning({
        message: '用户名不能为空'
      })
      return false
    }
    if (!this.loginForm.password) {
      this.$message.warning({
        message: '密码不能为空'
      })
      return false
    }
    // console.log(this.loginForm)
    this.openFullScreen()
  },
  methods: {
    openFullScreen () {
      this.fullscreenLoading = true
      this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
        this.fullscreenLoading = false
        this.$router.push({ path: '/' })
      }).catch(() => {
        this.fullscreenLoading = false
      })
    }
  }
}
</script>
