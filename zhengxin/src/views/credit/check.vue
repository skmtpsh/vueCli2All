<template>
  <div class="page">
    <loading :show="loading" :text="text"></loading>
    <!-- <Scroll class="wrapper" ref="wrapper"> -->
    <x-header :left-options="{showBack: false}" >征信</x-header>
    <scroll class="wrapper" :status="views" @pullingDown="pullingDown">
    <div>
      <header id="header">
        <h4>让征信更安全 让生活更便捷</h4>
        <h5>大数据征信查询，为你的信用做个检查</h5>
      </header>
      <div class="mainpage">
        <main class="content">
          <div class="authBaseTit">
            <h2>— 检查项目 —</h2>
            <p>安全 · 实时 · 快捷</p>
          </div>
          <grid :cols="3" class="itembox" :show-lr-borders="false" :show-vertical-dividers="false">
            <grid-item v-for="(item, i) in lists" :key="i">
              <div class="icon-main">
                <img :src="require(`@/asset/credit/${item.image}.png`)" class="icon-logo" />
              </div>
              <h5>{{item.title}}</h5>
            </grid-item>
          </grid>
          <section class="protobox">
            <check-icon :value.sync="agree"> 我已阅读并同意钱达达 </check-icon><a href="http://web.bl.9iyizu.com/proto/credit_service_dc" class="linkpro" >《用户购买协议》</a>
          </section>
        </main>
      </div>
    </div>
    <div id="tabbar" :class="{'on': !btnObj.outAble}">
      <button class="btn" @click="handlePay" :disabled="btnObj.outAble">
        <inline-loading v-if="btnObj.outAble"></inline-loading>
        <span v-else>{{btnObj.text}}</span>
      </button>
    </div>
    </scroll>
    <!-- </Scroll> -->
  </div>
</template>
<script>
import Scroll from '@/components/scroll/scroll'
// import Scroll from '@/components/scroll/index'
import creditApi from '@/api/credit'
import { CheckIcon, XButton, Grid, GridItem, InlineLoading, cookie, Loading } from 'vux'
const imageList = {
  '信用评级': 'grade',
  '黑名单': 'black',
  '网贷痕迹': 'web',
  '欺诈评估': 'anti',
  '网贷逾期': 'time',
  '个人资质': 'per',
  '个人基本信息': 'per',
  '法院涉诉': 'grade'
}
export default {
  components: {
    Loading,
    Grid,
    GridItem,
    Scroll,
    XButton,
    CheckIcon,
    InlineLoading
  },
  data () {
    return {
      loading: true,
      text: '页面加载中',
      payMoney: 0,
      agree: true,
      lists: [],
      views: false,
      btnObj: {
        text: '',
        status: '',
        outAble: false,
        money: 0
      }
    }
  },
  methods: {
    pullingDown () {
      // if (this.btnObj.status === 2) {
      this.btnObj.outAble = true
      this.views = true
      this.getStatus().then(() => {
        this.views = false
      })
      // }
    },
    handlePay () {
      // 要删掉
      // this.btnObj.status = 3
      // cookie.set('orderId', '000001740378975')
      if (!this.agree) {
        this.$vux.toast.text('您未选中协议', 'middle')
        return false
      }
      if (this.btnObj.status === 0) {
        this.$router.push({path: '/authentication/credit/loading', query: Object.assign({}, this.$route.query)})
      } else if (this.btnObj.status === 1) {
        this.btnObj.outAble = true
        this.handlePayOrder()
      } else if (this.btnObj.status === 2) {
        // 点击支付按钮重新请求  备用方案 现在是下拉刷新
        this.btnObj.outAble = true
        this.getStatus()
        return false
      } else if (this.btnObj.status === 3) {
        this.$router.push({path: '/authentication/credit/login', query: Object.assign({}, this.$route.query)})
      }
    },
    // 立即支付
    handlePayOrder () {
      return new Promise(async resolve => {
        await creditApi.getPay({
          phone: this.$route.query.loginPhone,
          pageReturnUrl: window.location.href,
          orderMoney: this.btnObj.money
        })
          .then((response) => {
            let res = response.data
            if (res.code === 200) {
              let returnObj = res.datas
              cookie.set('orderId', returnObj.orderId)
              // setTimeout(() => {
              window.location.href = returnObj.url
              // }, 6000)
              // resolve(status)
            } else {
              this.$vux.toast.text(res.message, 'middle')
            }
            this.btnObj.outAble = false
          })
          .catch((error) => {
            console.log(error)
            // this.$vux.toast.text(error, 'middle')
          })
      })
    },
    /*
    * 获取状态
    */
    getCreditPayStatus () {
      return new Promise(async resolve => {
        await creditApi.getOverDue({
        })
          .then((response) => {
            let res = response.data
            if (res.code === 200) {
              resolve(res.datas)
            } else {
              this.$vux.toast.text(res.message, 'middle')
            }
          })
          .catch((error) => {
            console.log(error)
            // this.$vux.toast.text(error, 'middle')
          })
      })
    },
    /*
    * 获取模块
    */
    getCreditModule () {
      return new Promise(async resolve => {
        await creditApi.getModule({
        })
          .then((response) => {
            let res = response.data
            if (res.code === 200) {
              // let i = 0
              this.lists = res.datas && res.datas.map(item => {
                // i++
                return {
                  image: imageList[item.moduleName],
                  // image: Object.values(imageList)[i],
                  title: item.moduleName
                }
              })
              setTimeout(() => {
                resolve()
              }, 500)
            } else {
              this.$vux.toast.text(res.message, 'middle')
            }
            this.loading = false
          })
          .catch((error) => {
            this.loading = false
            console.log(error)
            // this.$vux.toast.text(error.message, 'middle')
          })
      })
    },
    getStatus () {
      return new Promise(async resolve => {
        this.getCreditPayStatus().then((res) => {
          this.btnObj.status = res.code
          this.btnObj.outAble = false
          let btnText = ''
          if (res.code === 0) {
            btnText = '立即查看'
            cookie.set('credit', JSON.stringify(res.credit))
          } else if (res.code === 1) {
            let payMoney = parseFloat(res.price / 100)
            btnText = `立即支付 ${payMoney} 元`
            this.btnObj.money = res.price
          } else if (res.code === 2) { // 支付中的按钮不能点击
            // this.btnObj.outAble = true
            btnText = '支付中'
          } else if (res.code === 3) {
            btnText = '查看报告'
            cookie.set('orderId', res.orderId)
          }
          this.btnObj.text = btnText
          resolve()
        })
      })
    }
  },
  mounted () {
    // 测试用 可删除
    // cookie.set('orderId', '000001740378975')
    this.btnObj.outAble = true
    this.getCreditModule().then(() => {
      this.getStatus()
    })
  }
}
</script>
<style lang="less">
@import url('./credit.less');
</style>

