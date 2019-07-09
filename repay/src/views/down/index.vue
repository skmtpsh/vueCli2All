<template>
  <div class="downpage">
    <section class="wrapimg">
      <img src="../../assets/header1.jpg" class="img" />
      <img src="../../assets/header2.jpg" class="img1" />
    </section>
    <section class="log">
      <div class="wrap">
        <div>
          <x-input type="tel" v-model="tel" novalidate class="input" :show-clear="false" @on-blur="handleBlur" @on-focus="handleFocus" :max='11' mask="99999999999" placeholder="请输入您的手机号"></x-input>
        </div>
        <div style="position:relative;" class="smsinput">
          <x-input type="text" novalidate  v-model="checkcode" @on-blur="handleBlur" @on-focus="handleFocus" :max='8' :show-clear="false" class="input" placeholder="手机验证码"></x-input>
          <x-button type="primary" action-type="button" class="smsbtn" @click.native="getSms" :disabled="smsObj.disabled">{{smsObj.text}}</x-button>
        </div>
      </div>
    </section>
    <section class="log">
      <div class="wrap">
        <img src="../../assets/log2.jpg" class="img" @click="regNow" />
      </div>
    </section>
    <section class="wrapimg">
      <img src="../../assets/bottom1.jpg" class="img" />
      <img src="../../assets/bottom2.jpg" class="img" />
    </section>
    <div class="footerbox">
      <footer class="footer" id="footer">
        <span class="first" @click="closeFoot"><icon type="cancel"></icon></span>
        <span class="first2"><img src="../../assets/logo.png" style="vertical-align:middle; width:100%" /> </span>
        <span class="fotitem center"> 立即下载，分秒必达 </span>
        <span class="fotitem last" @click="goLink"><b>立即下载</b></span>
      </footer>
    </div>
  </div>
</template>
<script>
import registerApi from '@/api/register'
import DownPath from '@/utils/downurl'
import { XInput, XButton, Toast, Icon, trim, Popup, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Icon,
    Toast,
    XInput,
    XButton,
    Popup
  },
  data () {
    return {
      show: false,
      tel: '',
      pwd: '',
      checkcode: '',
      isPost: false,
      smsObj: {
        text: '获取验证码',
        disabled: false
      },
      showTip: false
    }
  },
  created () {
    // 手机正则
    // this.regTel = /^1([38][0-9]|2[0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|8[0-9]|9[789])\d{8}$/
    this.regTel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    // 密码正则
    this.regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
    this.query = this.$route.query
  },
  methods: {
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
      // this.$vux.toast.text('3', 'middle')
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && this.interval) {
        clearInterval(this.interval)
      }
    },
    goLink () {
      this.$router.push({path: '/downgo', query: Object.assign({phone: this.tel}, this.query)})
    },
    goLink2 () {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  // 判断iPhone|iPad|iPod|iOS
        window.location.href = DownPath.iosURL
      } else if (/(Android)/i.test(navigator.userAgent)) {   // 判断Android
        // 判断微信浏览器
        if (navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1) {
          this.$router.push({path: '/downwx', query: {phone: this.tel, nav: 'wx'}})
          return false
        }
        window.location.href = DownPath.androidURL
      }
    },
    closeFoot () {
      document.getElementsByTagName('body')[0].className = 'main'
    },
    getSms () {
      if (Object.keys(this.query).length === 0) {
        this.$vux.toast.text('页面参数不正确', 'middle')
        return false
      }
      if (!this.query.channelCode) {
        this.$vux.toast.text('channelCode不能为空!', 'middle')
        return false
      }
      if (trim(this.query.channelCode) === '') {
        this.$vux.toast.text('channelCode不能为空!', 'middle')
        return false
      }
      if (!this.regTel.test(this.tel)) {
        this.$vux.toast.text('输入正确的手机号格式!', 'middle')
        return false
      }
      this.sendSms()
    },
    openDialog (mess) {
      let _this = this
      this.$vux.confirm.show({
        confirmText: '下载APP',
        content: `
          <p style='color:#3CC51F; margin-bottom: 0.1333rem'>${mess}</p>
          <p>快下载佰联钱包<br />申请最高20万元额度吧</p>
        `,
        onConfirm () {
          _this.goLink()
        }
      })
    },
    sendSms () {
      this.authTime = 60
      this.smsObj.disabled = true
      registerApi['registSmsCode']({
        phone: this.tel,
        channelCode: this.query.channelCode ? this.query.channelCode : 'BLQBZY'
      })
        .then((response) => {
          if (response.data.code === '0') {
            this.$vux.toast.text(response.data.msg, 'middle')
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
            if (response.data.code === '4') {
              this.openDialog(response.data.msg)
            } else {
              this.$vux.toast.text(response.data.msg, 'middle')
            }
            this.smsObj.disabled = false
          }
          this.$vux.loading.hide()
        })
        .catch((error) => {
          this.smsObj.disabled = false
          console.log(error)
        })
    },
    regNow () {
      // 设置注册按钮只能点一次
      if (this.isPost === true) {
        return false
      }
      if (!this.query.channelCode) {
        this.$vux.toast.text('channelCode不能为空!', 'middle')
        return false
      }
      if (trim(this.query.channelCode) === '') {
        this.$vux.toast.text('channelCode不能为空', 'middle')
        return false
      }
      if (!this.regTel.test(this.tel)) {
        this.$vux.toast.text('输入正确的手机号格式', 'middle')
        return false
      }
      if (this.checkcode === '') {
        this.$vux.toast.text('输入手机验证码', 'middle')
        return false
      }
      this.$vux.loading.show({
        text: '处理数据中'
      })
      registerApi['registChannel']({
        phone: this.tel,
        smsCode: this.checkcode,
        channelCode: this.query.channelCode
      })
        .then((response) => {
          if (response.data.code === '0') {
            this.isPost = true
            this.openDialog('您已经注册成功')
            document.getElementsByTagName('body')[0].className = ''
          } else {
            this.$vux.toast.text(response.data.msg, 'middle')
          }
          this.$vux.loading.hide()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  beforeCreate () {
    document.getElementsByTagName('body')[0].className = 'main'
    document.title = '佰联钱包注册下载'
  }
}
</script>
<style lang="less">
body.main .footer {
  display: none;
}
body.main {
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
  .weui-toast__content {
    font-size: 0.3733rem !important;
  }
  .vux-popup-dialog {
    background: #151a2e !important;
  }
}
.img {
  // max-width: 100%;
  width: 100%;
  display: block;
}
.img1 {
  margin-top: -3px; /*no*/
  width: 100%;
}
.img2 {
  margin-top: -7px; /*no*/
  width: 100%;
}
.downpage {
  background: #ffd737;
  padding-bottom: 1.6rem;
  // overflow-y: scroll;
  .weui-tab {
    height: auto!important;
  }
  .weui-tab__panel {
    padding-bottom: 0px!important;
    height: auto !important;
  }
  .wrapimg {
    font-size: 0;
  }
  .wrap {
    padding: 0 0.96rem;
    color: #adadad;
  }
  .input {
    padding: 0rem 0.2rem 0.28rem;
  }
  .weui-cell {
    padding: 0rem 0.2rem 0.28rem !important;
  }
  .smsinput .input {
    padding-right: 3rem !important;
  }
  .smsinput .smsbtn {
    height: 1.12rem !important;
    background-color: #fff !important;
  }
  .weui-cell.input {
    padding: 0rem 0.2rem 0.28rem
  }

  .btn {
    display: block;
    width: 100%;
    height: 1.36rem;
  }
  button.weui-btn {
    font-size: 0.3733rem !important;
    // height: 0.64rem !important;
    background: none !important;
    color: #682b01;
    width: 3rem;
    line-height: 1;
    position: absolute;
    right: 0.2rem;
    // top: 0.2667rem;
    top: 0;
    border-top: 2px solid #f4bf22 !important;
    border-right: 2px solid #f4bf22 !important;
    border-bottom: 2px solid #f4bf22 !important;
    border-left: 1px solid #682b01; /*no*/

    border-radius: inherit !important;
    border-top-right-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
    &:after {
      border: 0 none;
    }
  }
  .weui-input {
    font-size: 0.3733rem !important;
    padding: 0 0.2254rem;
    height: 1.12rem !important;
    color: #a87f7f;
    border-radius: 10px !important;
    border: 2px solid #f4bf22 !important;
    background-color: #fff !important;
  }
  .weui-btn_primary:not(.weui-btn_disabled):active {
    color: #682b01 !important;
  }
  .footer {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: absolute;
    z-index: 500;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: rgb(250, 247, 248);
  }
  .fotitem {
    font-size: 0.3733rem;
    padding: 0;
    height: 1.6rem;
    line-height: 1.6rem;
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #520000;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .first, .first2, .wechat2{
    padding: 0;
    height: 1.6rem;
    line-height: 1.6rem;
    display: block;
    width: 1.0667rem;
    text-align: center;
    .weui-icon-cancel {
      color: #020202;
      font-size: 0.48rem;
      font-weight: bold;
    }
  }
  .wechat2 {
    width: 100%;
    .weui-icon-cancel {
      color: #fff;
      font-size: 0.56rem;
    }
  }
  .fotitem.center {
    -webkit-box-flex: 2;
    -webkit-flex: 2;
    flex: 2;
    text-align: left;
    padding-left:10px;
  }
  .fotitem.last {
    color: #fff;
    background-color: #fe8000
  }
  .wechat {
    text-align: right;
  }
  .weui-dialog {
    width: 80% !important;
    max-width: none !important;
  }
  .weui-dialog__bd {
    font-size: 0.3733rem !important;
  }
  .weui-dialog__ft {
    font-size: 0.3733rem !important;
    line-height: 1.12rem !important;
  }
  .weui-dialog__bd:first-child {
    padding: 0.96rem 0.8rem 0.96rem !important;
  }
}
.tip {
  text-align: center;
  font-size: 0.3623rem;
  color: #4e0011;
  padding: 0.4026rem 0;
}
.tip > span {
  color: #520000;
  color: #f91b00;
  display: inline-block;
  padding: 0.2667rem 0;
  font-weight: bold;
  text-decoration: underline;
}
.close {
  margin-top: -0.1333rem;
  padding-top: 1.3333rem;
  // overflow: scroll;
  position: absolute;
  // height: 100%;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999;
  background: #151a2d;
}
.close img {
  width: 100%;
  display: block;
  margin-top: -3px /*no*/
}
.closeBtn {
  position: fixed;
  height: 1.3333rem;
  top: 0;
  left: 0;
  right: 0;
}
.weui-tab__panel {
  padding-bottom: 0px!important;
  height: auto !important;
}
.downtip {
  width:100%;
  // height:130%;
  position:absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y:scroll;
  z-index: 10000;
}
.downpage .footerbox {
  position: fixed;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  height: 180px;
  bottom: 0;
  left: 0;
  right: 0;
  // overflow:scroll
}
</style>
