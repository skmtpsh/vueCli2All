<template>
  <div class="login-page">
  <div class="logo"><img src="../../assets/logo.png" /></div>
  <div class="container">
    <div class="login-container">
      <el-form ref="loginForm" class="login-form" :model="loginForm" :rules="loginRules" label-width="0" id="login-form"> <!--:rules="loginRules"-->
        <h3 class="text-center" id="login-title">翼盾中心管理系统</h3>
        <el-form-item prop="username">
          <p class="username">用户名</p>
          <el-input
            prefix-icon="el-icon-mobile-phone"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            auto-complete="on"
            @keyup.enter.native="login()"
          />
        </el-form-item>
        <el-form-item prop="password">
          <p class="username">密码</p>
          <el-input
            prefix-icon="el-icon-view"
            v-model="loginForm.password"
            placeholder="请输入密码"
            name="password"
            type="password"
            auto-complete="on"
            @keyup.enter.native="login()"
          />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin" @keyup.enter.native="login()" style="width:100%;" class="loginBtn" round>登录</el-button>
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
        password: ''
        // checkcode: ''
      },
      imgsrc: '',
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, min: 3, max: 30, message: '密码长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  created () {
  },
  methods: {
    login () {
      this.handleLogin()
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
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
<style lang="scss" scoped>
.username {
  height: 24px;
  line-height: 24px;
  margin: 0;
}
#login-form>.el-form-item__content {
  margin-left: 0px!important;
}
.login-page .logo {
  position: absolute;
  top: 77px!important;
  left: 50px!important;
}
#login-title {
  font-size: 26px;
}
.login-page .loginBtn {
  border-radius: 8px;
}
</style>
