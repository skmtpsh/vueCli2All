<template>
  <div class="page">
    <!-- <x-header :left-options="{backText: '', preventGoBack: true}" @on-click-back="handleBackHome">征信-登录</x-header> -->
    <x-header :left-options="{backText: ''}">征信-登录</x-header>
    <!-- <Scroll class="wrapper" ref="wrapper" style="bottom: 0"> -->
    <div>
      <header class="credit-login">
        <div class="login-bg" :style="{backgroundImage:'url('+require('@/asset/credit/creditbg.png')+')'}">
          <h4>大数据征信查询</h4>
          <h5>为您的信用做个检查</h5>
        </div>
      </header>
      <div class="mainpage">
        <main class="credit-content">
          <div class="login-content">
            <div class="input-box">
              <div class="input-ico">
                <img :src="require(`@/asset/credit/user.png`)" />
              </div>
              <div class="input-txt">
                <x-input placeholder="请填写真实姓名" v-model="login.userName"  @on-blur="handleBlur" @on-focus="handleFocus" :show-clear="false"></x-input>
              </div>
            </div>
            <div class="input-box">
              <div class="input-ico">
                <img :src="require(`@/asset/credit/idcard.png`)" />
              </div>
              <div class="input-txt">
                <x-input placeholder="请填写身份证号" v-model="login.idCard"  @on-blur="handleBlur" @on-focus="handleFocus"  :show-clear="false"></x-input>
              </div>
            </div>
            <div class="input-box">
              <div class="input-ico">
                <img :src="require(`@/asset/credit/phone.png`)" />
              </div>
              <div class="input-txt">
                <x-input type="tel" placeholder="请填写手机号" v-model="login.telPhone" @on-blur="handleBlur" @on-focus="handleFocus" novalidate :show-clear="false" :max='11' mask="99999999999" ></x-input>
              </div>
            </div>
            <div class="input-box">
              <div class="input-ico">
                <img :src="require(`@/asset/credit/dun.png`)" />
              </div>
              <div class="input-txt">
                <x-input v-model="login.checkCode" novalidate placeholder="请填写验证码" @on-blur="handleBlur" @on-focus="handleFocus" :max='8' :show-clear="false">
                  <x-button slot="right" mini plain action-type="button" class="resetBtn" @click.native="getSms" :disabled="smsObj.disabled">{{smsObj.text}}</x-button>
                </x-input>
              </div>
            </div>
            <section class="protobox pd0">
              <check-icon :value.sync="agree"> 我已阅读并同意钱达达 </check-icon><a href="javascript:;" class="linkpro" @click="saveLocal" >《用户授权协议》</a>
            </section>
            <box class='marg'>
              <x-button type="primary" class="btnRadius" :disabled="btnAbled" @click.native="handleSubmit">立即检查</x-button>
            </box>
          </div>
        </main>
      </div>
    </div>
    <!-- </Scroll> -->
  </div>
</template>
<script>
import creditApi from '@/api/credit'
import Scroll from '@/components/scroll/index'
import { CheckIcon, XButton, Group, Box, Cell, cookie } from 'vux'
// 手机正则
const regTel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
export default {
  components: {
    Scroll,
    XButton,
    Group,
    Box,
    Cell,
    CheckIcon
  },
  data () {
    return {
      agree: true,
      btnAbled: false,
      login: {
        userName: '',
        idCard: '',
        telPhone: '',
        checkCode: ''
      },
      smsObj: {
        text: '获取验证码',
        disabled: false
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.name === 'login' && from.name === 'check') {
    }
    next()
  },
  beforeRouteLeave (to, from, next) {
    // let locLogin = cookie.get('login')
    // if (locLogin) {
    //   cookie.remove('login')
    // }
    cookie.remove('login')
    next()
  },
  mounted () {
    let locLogin = cookie.get('login')
    if (locLogin) {
      this.login = JSON.parse(locLogin)
    }
  },
  methods: {
    handleBackHome () {
      this.$router.push({path: '/authentication/credit/check', query: Object.assign({}, this.$route.query)})
    },
    saveLocal () {
      if (Object.values(this.login).join('') !== '') {
        cookie.set('login', JSON.stringify(this.login))
      }
      window.location.href = 'http://web.bl.9iyizu.com/proto/credit_search_dc'
    },
    scrollToEnd () {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        if (/(11_)/i.test(navigator.userAgent)) { // 针对11做特殊处理
          return
        }
        document.body.scrollTop = document.body.scrollHeight
      }
    },
    handleBlur () {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.interval = setTimeout(() => {
          this.scrollToEnd()
        }, 300)
      }
    },
    handleFocus () {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && this.interval) {
        clearInterval(this.interval)
      }
    },
    getSms () {
      if (!regTel.test(this.login.telPhone)) {
        this.$vux.toast.text('输入正确的手机号格式!', 'middle')
        return false
      }
      this.sendSms()
    },
    sendSms () {
      this.authTime = 60
      this.smsObj.disabled = true
      return new Promise(async resolve => {
        console.log(this.login.telPhone)
        await creditApi.getVerify({
          phone: this.login.telPhone
        })
          .then((response) => {
            this.$vux.loading.hide()
            let res = response.data
            if (res.code === 200) {
              this.$vux.toast.text(res.message, 'middle')
              // 设置短信倒计时
              let authTimeTimer = setInterval(() => {
                this.smsObj.text = this.authTime + '秒重发送'
                this.authTime--
                if (this.authTime <= 0) {
                  this.smsObj.text = '获取验证码'
                  this.smsObj.disabled = false
                  clearInterval(authTimeTimer)
                }
              }, 1000)
            } else {
              this.$vux.toast.text(res.message, 'middle')
              this.smsObj.disabled = false
            }
          })
          .catch((error) => {
            this.$vux.loading.hide()
            console.log(error)
            // this.$vux.toast.text(error, 'middle')
          })
      })
    },
    handleSubmit () {
      if (!this.agree) {
        this.$vux.toast.text('您未选中协议', 'middle')
        return false
      }
      let OrderId = cookie.get('orderId')
      if (!OrderId) {
        this.$vux.toast.text('订单ID不能为空', 'middle')
        setTimeout(() => {
          this.$router.push({path: '/authentication/credit/check', query: Object.assign({}, this.$route.query)})
        }, 200)
        return false
      }
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      let regcard = /^[\u4E00-\u9FA5]+$/
      if (this.login.userName === '') {
        this.$vux.toast.text('输入姓名', 'middle')
        return false
      }
      if (!regcard.test(this.login.userName)) {
        this.$vux.toast.text('填写正确姓名格式', 'middle')
        return false
      }
      if (this.login.idCard === '') {
        this.$vux.toast.text('输入身份证号', 'middle')
        return false
      }
      if (!reg.test(this.login.idCard)) {
        this.$vux.toast.text('填写正确身份证号格式', 'middle')
        return false
      }
      if (!regTel.test(this.login.telPhone)) {
        this.$vux.toast.text('输入正确的手机号格式', 'middle')
        return false
      }
      if (this.login.checkCode === '') {
        this.$vux.toast.text('输入手机验证码', 'middle')
        return false
      }

      this.$vux.loading.show({
        text: '数据加载..'
      })
      this.btnAbled = true
      return new Promise(async resolve => {
        await creditApi.getReport(Object.assign({
          name: this.login.userName,
          phone: this.login.telPhone,
          idCard: this.login.idCard,
          checkCode: this.login.checkCode,
          orderId: OrderId
        }, this.$route.query))
          .then((response) => {
            this.$vux.loading.hide()
            let res = response.data
            if (res.code === 200) {
              // this.result = res.datas
              cookie.set('credit', JSON.stringify(res.datas))
              setTimeout(() => {
                this.$router.push({path: '/authentication/credit/loading', query: Object.assign({}, this.$route.query)})
              }, 300)
              resolve()
            } else {
              this.$vux.toast.text(res.datas.msg, 'middle')
            }
            this.btnAbled = false
          })
          .catch((error) => {
            this.btnAbled = false
            this.$vux.loading.hide()
            console.log(error)
            // this.$vux.toast.text(error, 'middle')
          })
      })
    }
  }
}
</script>
<style lang="less">
@import url('./credit.less');
.credit-login {
  padding: 0 32px;
  background-color: #397be6;
  .login-bg {
    // padding: 102px 0;
    padding: 250px 0 102px;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: bottom right;
  }
  h5 {
    .font-dpr(32px);
    color: #fff;
  }
  h4 {
    color: #fff;
    .font-dpr(48px);
    margin: 16px 0 20px;
  }
}
.credit-content {
  padding: 20px 32px 80px;
  .login-content {
    // margin-top: -70px;
    padding: 50px 28px 30px 24px;
    background-color: #fff;
    border-radius: 20px;
    .weui-btn_disabled.weui-btn_primary {
      background-color: #3278fb;
    }
  }
}
.btnRadius {
  height: 96px;
  line-height: 96px;
  border-radius: 48px !important;
}
.resetBtn {
  border-color: #ffb030 !important;
  border-radius: 0 !important;
  height: 56px;
  line-height: 56px;
  color: #ffb030 !important;
  .font-dpr(24px);
  &.weui-btn_plain-disabled {
    color: #8b8686 !important;
    border-color: #a6a6a6 !important;
  }
}
.input-box {
  display: flex;
  .input-ico {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: left;
    img {
      width: 34px;
    }
  }
  .input-txt {
    padding: 42px 0;
    flex: 1;
    position: relative;
    &:after {
      .setBottomLine();
    }
  }
}
</style>

