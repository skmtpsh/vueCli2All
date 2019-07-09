<template>
  <div class="page">
    <!-- <Scroll class="wrapper" :lists='pageInfo' @pullingDown="pullingDown" > -->
    <div>
      <Skeleton v-if="!init"></Skeleton>
      <div v-else>
      <!-- <div> -->
        <div class="mainpage">
          <header id="header">
            <h5>{{borrowTxt}}</h5>
            <div v-if="Object.keys(pageInfo).length > 0">
              <h4> {{borrowRange}} </h4>
              <h3>{{pageInfo.loanRate}}  {{pageInfo.loanPeriod}}</h3>
            </div>
            <button class="reqButton" @click="goURL">立即申请</button>
          </header>
          <main class="content">
            <h2 class="title">申请流程</h2>
            <div class="info">
              <img :src="require(`@/asset/info.png`)" style="max-width:100%" />
            </div>
            <h2 class="title">我们帮您快速解决</h2>
            <section class="group">
              <div class="group-title">
                <span>Q1</span>
                <p>申请条件</p>
              </div>
              <div class="group-content">
                <p>我可以申请吗？</p>
                <div class="incont" v-html="pageInfo.applyCondition">
                </div>
              </div>
            </section>
            <section class="group">
              <div class="group-title">
                <span>Q2</span>
                <p>申请材料</p>
              </div>
              <div class="group-content">
                <p>需要提交哪些材料</p>
                <div class="incont" v-html="pageInfo.applyMaterial">
                  二代身份证、本人银行卡
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
    <!-- </Scroll> -->
  </div>
</template>
<script>
import { XHeader, Group, Cell } from 'vux'
// import Scroll from '@/components/scroll/scroll'
import Skeleton from './skeleton'
import indexApi from '@/api/index'
const APPID = 'qiandada87654321'
export default {
  components: {
    Group,
    Cell,
    XHeader,
    // Scroll,
    Skeleton
  },
  // mixins: [myMixin],
  data () {
    return {
      init: false,
      pageInfo: {}
    }
  },
  computed: {
    borrowRange () {
      let txt = '0'
      if (this.pageInfo.minBorrowLimit) {
        txt = `${this.pageInfo.minBorrowLimit} ~ ${this.pageInfo.maxBorrowLimit}`
      } else {
        txt = `${this.pageInfo.maxBorrowLimit}`
      }
      return txt
    },
    borrowTxt () {
      let txt = ''
      if (this.pageInfo.minBorrowLimit) {
        txt = `借款额度范围(元)`
      } else {
        txt = `最高可借额度(元)`
      }
      return txt
    }
  },
  created () {
    this.getSyncList()
  },
  methods: {
    goURL () {
      // let appId = this.getAppId(this.$route.query.appName)[0].id
      let appId = APPID
      let requestObj = Object.assign({}, this.$route.query, {marketAppVersion: this.$route.query.appVersion, appId})
      // console.log(requestObj)
      indexApi.setRequest(requestObj)
      .then((response) => {
        let result = response.data
        // this.$vux.loading.hide()
        if (result.code === 200) {
        }
      })
      .catch((error) => {
        console.log(error)
        // this.$vux.loading.hide()
        // this.$vux.toast.text(error, 'middle')
      })
      window.location.href = this.pageInfo.productLink
    },
    pullingDown () {
      this.getSyncList()
    },
    getAppId (appName) {
      const AppSet = [
        {
          id: 'qiandada12345678',
          key: '汇信财富'
        },
        {
          id: 'diandianhua12345',
          key: '点点花'
        },
        {
          id: 'yipurse123456789',
          key: '翼钱包'
        },
        {
          id: 'bailian123456789',
          key: '佰联钱包'
        },
        {
          id: 'qiandada87654321',
          key: '钱达达'
        }
      ]
      return AppSet.filter(item => {
        if (item.key === appName) {
          return item
        }
      })
    },
    getSyncList () {
      // this.$vux.loading.show({
      //   text: '加载中'
      // })
      // let appId = this.getAppId(this.$route.query.appName)[0].id
      let appId = APPID
      let requestObj = Object.assign({}, this.$route.query, {marketAppVersion: this.$route.query.appVersion, appId})
      indexApi.getIndex(requestObj)
      .then((response) => {
        let result = response.data
        // this.$vux.loading.hide()
        if (result.code === 200) {
          if (Object.keys(result.datas).length === 0) {
            this.$vux.toast.text('返回数据不准确', 'middle')
          } else {
            if (result.datas.isEnable === '0') {
              // this.$vux.toast.text(result.datas.message, 'middle')
              var u = navigator.userAgent
              var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)  // ios终端
              try {
                if (isIOS) {  // 判断iPhone|iPad|iPod|iOS
                  window.webkit.messageHandlers.goBack.postMessage(result.datas.message)
                } else {
                  window.loanmarket.goBack(result.datas.message)
                }
                return
              } catch (error) {
                console.log(error)
              }
            }
            this.pageInfo = result.datas
            document.title = this.pageInfo.productName ? this.pageInfo.productName : ''
          }
        }
        this.init = true
      })
      .catch((error) => {
        console.log(error)
        // this.$vux.loading.hide()
        // this.$vux.toast.text(error, 'middle')
      })
    }
  },
  beforeCreate () {
    document.getElementsByTagName('body')[0].className = 'main'
  }
}
</script>
<style lang="less">
@import url('../style/theme.less');
@import url('../style/variable.less');
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 110px;
  // height: 100%;
  width: 100%;
  z-index: 480;
}
.content {
  font-family: PingFangSC-Regular,Helvetica Neue,Tahoma,Arial,Hiragino Sans GB,Microsoft Yahei,sans-serif;
  margin-bottom: 20px;
  padding: 0px 24px 0;
  background-color: #fff;
}
#header {
  background-color: @header-background-color;
  text-align: center;
  padding: 58px 0px 48px;
  h5 {
    .font-dpr(24px);
    color: @text-main-color
  }
  h4 {
    .font-dpr(90px);
    margin: 36px 0;
    color: #ff4e4a;
  }
  h3 {
    .font-dpr(24px);
    color: #959FB5;
  }
  .reqButton {
    width: 100%;
    border-width: 0;
    outline: 0;
    -webkit-appearance: none;
    background: @normal-color;
    color: #fff;
    .font-dpr(32px);
    height: 90px !important;
    width: 360px !important;
    border-radius: 90px !important;
    margin: 48px auto 0;
    box-shadow: 0 0 10px @normal-color !important;
  }
}
.mainpage {
  .info {
    padding: 50px 42px;
    img {
      width: 100%;
      display: block;
    }
    overflow: hidden;
  }
  .title {
    .font-dpr(32px);
    color: @text-main-color;
    text-align: center;
    margin-top: 45px;
    font-weight: bold;
  }
  .group {
    margin: 75px 54px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    div {
      flex: 1;
    }
    .group-title {
      flex: none;
      width: 92px;
      line-height: 1.6;
      padding: 0 20px;
      .font-dpr(24px);
      position: relative;
      &:before {
        .setRightLine(#000)
      }
      span {
        color: @primary-color;
        .font-dpr(36px);
      }
    }
    .group-content {
      padding: 0 28px;
      .font-dpr(28px);
      p {
      }
      .incont {
        margin: 10px 0;
        color: #959fb5
      }
    }
  }
}

</style>
