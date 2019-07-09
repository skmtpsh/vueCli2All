<template>
  <div class="login-page">
  <div class="logo"><img :src="require(`@/assets/logo.png`)" /></div>
  <div class="container">
    <div class="login-container">
      <el-form ref="loginForm" class="login-form" :model="loginForm" :rules="loginRules" label-width="100px"> <!--:rules="loginRules"-->
        <h3 class="text-center">翼盾贷超管理系统</h3>
        <el-form-item prop="username" label="用户名">
          <el-input
            prefix-icon="el-icon-mobile-phone"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            auto-complete="on"
            @keyup.enter.native='handleLogin'
          />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            prefix-icon="el-icon-view"
            v-model="loginForm.password"
            placeholder="请输入密码"
            name="password"
            type="password"
            auto-complete="on"
            @keyup.enter.native='handleLogin'
          />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin" style="width:100%" round>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </div>
</template>
<style scope>
</style>
<script>
export default {
  components: {
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        checkcode: ''
      },
      imgsrc: '',
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, min: 3, max: 30, message: '密码长度在 2 到 30 个字符', trigger: 'blur' }]
      },
      loading: false
    }
  },
  created () {

  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then((mainBar) => {
            this.loading = false
            this.$router.push({ path: '/' })
            this.$router.addRoutes(mainBar)
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
