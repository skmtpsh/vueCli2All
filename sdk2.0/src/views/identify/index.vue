<template>
<div style="position:relative">
  <div class="danger">
    请填写真实信息，否则可能导致审核不通过
  </div>
  <group>
    <x-input title="本人姓名" placeholder="输入本人姓名" v-model="userName" :show-clear="false" text-align="right"></x-input>
    <x-input title="身份证号" placeholder="输入真实身份证号码" :max='18' type="text" v-model="userCard" :show-clear="false" text-align="right"></x-input>
  </group>
  <box class="mg30">
    <p class="gotoIdenty" @click="gotoIdentify">扫身份证自动识别</p>
  </box>
  <box class="marg">
    <x-button type="primary" @click.native="submit">下一步</x-button>
  </box>
</div>
</template>
<script>
import indexApi from '@/api/index'
import myMixin from '@/views/mixin'
import { Group, XButton, Box } from 'vux'
export default {
  mixins: [myMixin],
  components: {
    Group,
    XButton,
    Box
  },
  data () {
    return {
      userName: '',
      userCard: ''
    }
  },
  beforeCreate () {
    document.getElementsByTagName('body')[0].className = ''
  },
  created () {
    // 获取上传身份证页面返回的值
    this.userName = this.$route.params.user ? this.$route.params.user : ''
    this.userCard = this.$route.params.card ? this.$route.params.card : ''
    console.log(this.$route)
  },
  methods: {
    gotoIdentify () {
      this.$router.push({path: '/authentication/identify/setPhoto', query: this.$route.query ? this.$route.query : ''})
    },
    submit () {
      if (this.userName === '') {
        this.$vux.toast.text('姓名不能为空', 'middle')
        return false
      }
      if (this.userCard === '') {
        this.$vux.toast.text('身份证号不能为空', 'middle')
        return false
      }
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      let regcard = /^[\u4E00-\u9FA5]+$/
      if (!regcard.test(this.userName)) {
        this.$vux.toast.text('填写正确姓名格式', 'middle')
        return false
      }
      if (!reg.test(this.userCard)) {
        this.$vux.toast.text('填写正确身份证号格式', 'middle')
        return false
      }
      this.$vux.loading.show({
        text: '数据加载..'
      })
      indexApi.identify({
        name: this.userName,
        idCard: this.userCard
      })
        .then((response) => {
          this.$vux.loading.hide()
          let res = response.data
          if (res.code === 200) {
            // this.$vux.toast.text(res.message, 'middle')
            this.gotoURL(res.datas.verifyTypeName, res.datas.verifyStatusLive, res.datas.verifyStatus)
            // this.$router.push({path: '/authentication/status', query: this.$route.query ? this.$route.query : ''})
          } else {
            if (res.code === 400126) {
              this.$router.push({path: '/authentication/status', query: this.$route.query ? this.$route.query : ''})
            }
            this.$vux.toast.text(res.message, 'middle')
          }
        })
        .catch((error) => {
          this.$vux.loading.hide()
          this.$vux.toast.text(error, 'middle')
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../style/variable.less');
.gotoIdenty {
  text-align: right;
  color: #1d7ffe;
  .font-dpr(28px);
}
</style>
