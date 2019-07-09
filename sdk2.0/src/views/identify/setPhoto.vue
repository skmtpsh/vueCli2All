<template>
  <div>
    <div class="danger">
      必须使用本人身份证，身份证将联网公安部门认证
    </div>
    <div class="cardFront cardBox">
      <img :src="frontPicUrl" @click="openOcr('front')" />
    </div>
    <div class="cardBack cardBox">
      <img :src="backPicUrl" @click="openOcr('back')"  />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      frontPicUrl: require(`@/asset/card_front.png`),
      backPicUrl: require(`@/asset/card_back.png`)
    }
  },
  methods: {
    setFrontPic (picUrl) {
      this.frontPicUrl = picUrl
    },
    setBackPic (picUrl) {
      this.backPicUrl = picUrl
    },
    uploadFinish (strName, strID) {
      this.$router.push({path: `/authentication/identify/user/${strName}/card/${strID}`, query: this.$route.query ? this.$route.query : ''})
      // this.$router.push({path: `/authentication/identify/user/${strName}/card/${strName}`, query: this.$route.query ? Object.assign({}, this.$route.query, {user: strName + '', card: '' + strID}) : ''})
    },
    openOcr (type) {
      try {
        if (this.$route.query.platform === 'ios') {
          window.webkit.messageHandlers.openOcr.postMessage(type)
        } else {
          window.javaObj.openOcr(type)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    window.setFrontPic = this.setFrontPic
    window.setBackPic = this.setBackPic
    window.uploadFinish = this.uploadFinish
  },
  beforeCreate () {
    document.getElementsByTagName('body')[0].className = 'card'
  }
}
</script>
<style lang="less" scoped>
@import url('../../style/variable.less');
.cardBox {
  width: 600px;
  height: 400px;
  margin: 50px auto;
  background: #edf6fd;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 0px 15px #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    // width: 392px;
    // height: 248px;
    width: 500px;
    height: 316px;
  }
}
</style>
