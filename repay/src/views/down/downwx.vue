<template>
  <div>
    <section class="wrapimg">
      <img src="../../assets/downhead.jpg" class="img" />
    </section>
    <section>
      <div class="wrap">
        <p style="margin-bottom: 30px;"><img src="../../assets/anddown.png" class="img" @click="goAndr" /></p>
        <p><img src="../../assets/iosdown.png" class="img" @click="goIos" /></p>
      </div>
    </section>
    <section class="wrapimg" style="margin-top:60px;">
      <img src="../../assets/downbot.jpg" class="img" />
    </section>
    <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}">
      <div class="wechat">
        <img src="../../assets/weixin.png" style="max-width:100%; width:50%;" />
        <div class="wechat2" @click="showDialogStyle = false">
          <icon type="cancel"></icon>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { Icon, XDialog } from 'vux'
import DownPath from '@/utils/downurl'
export default {
  components: {
    Icon,
    XDialog
  },
  data () {
    return {
      showDialogStyle: false
    }
  },
  methods: {
    goIos () {
      if (/(Android)/i.test(navigator.userAgent)) {
        this.$vux.toast.text('请点击设备相应的按钮下载', 'middle')
        return false
      }
      window.location.href = DownPath.iosURL
    },
    goAndr () {
      // 判断微信浏览器
      if (navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1) {
        this.showDialogStyle = true
        return false
      }
      window.location.href = DownPath.androidURL
    }
  },
  created () {
    if (this.$route.query.nav === 'wx' && navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1) {
      this.showDialogStyle = true
    }
  },
  beforeCreate () {
    document.getElementsByTagName('body')[0].className = 'down'
    document.title = '佰联钱包注册下载'
  }
}
</script>
<style lang="less">
.downbot {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.wechat {
  text-align: right;
}
.wechat2{
  padding: 0;
  height: 1.6rem;
  line-height: 1.6rem;
  display: block;
  width: 1.0667rem;
  text-align: center;
  .weui-icon-cancel {
    color: #000;
    font-size: 0.48rem;
  }
}
.wechat2 {
  width: 100%;
  .weui-icon-cancel {
    color: #fff;
    font-size: 0.56rem;
  }
}
.page {
  padding-bottom: 1.6rem;
}
.img {
  // max-width: 100%;
  width: 100%;
}
.wrapimg {
  font-size: 0;
}
.wrap {
  padding: 0 0.96rem;
  color: #adadad;
}
.btn {
  display: block;
  width: 100%;
  height: 1.36rem;
}
</style>
