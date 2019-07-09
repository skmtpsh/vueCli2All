<template>
  <div class="page">
    <x-header :left-options="{backText: ''}" >还款</x-header>
    <template v-if="earlyObj&&earlyObj.termRepayList">
      <check-list :datalist="earlyObj.termRepayList" :showicon="true" @select="getSel"></check-list>
    </template>
    <template v-else>
      <no-mess title="没有分期数据"></no-mess>
    </template>
    <section v-if="earlyObj&&earlyObj.termRepayList&&earlyObj.termRepayList.length > 0" class="btnbox">
      <x-button type="primary" @click.native="payNow">立即还款</x-button>
    </section>
  </div>
</template>
<script>
import CheckList from './components/checklist'
import NoMess from '@/components/nomess'
import repayApi from '@/api/repay'
export default {
  components: {
    CheckList,
    NoMess
  },
  data () {
    return {
      earlyObj: {
        termRepayList: []
      }
    }
  },
  created () {
    this.loanid = this.$route.query.loanid ? this.$route.query.loanid : null
    this.query = { token: this.$route.query.token, userId: this.$route.query.userId, appName: this.$route.query.appName }
    this.getList()
  },
  methods: {
    getSel (val) {
      this.repayID = val
    },
    request (params, inteface, sucess, fail) {
      this.$vux.loading.show({
        text: '数据处理...'
      })
      repayApi[inteface](Object.assign(params, this.query))
        .then((response) => {
          this.$vux.loading.hide()
          let res = response.data
          if (res.code === '0') {
            sucess(res, this)
          } else {
            fail(res)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    payNow () {
      if (typeof this.repayID === 'undefined') {
        this.$vux.toast.text('请选择分期', 'middle')
        return
      }
      if (this.repayID && this.repayID.length === 0) {
        this.$vux.toast.text('请选择分期', 'middle')
        return
      }
      this.request({
        repayType: 0,
        repayIds: this.repayID.join(','),
        loanId: this.$route.query.loanid
      }, 'repayItemComfirm', (response) => {
        let res = response
        if (res.code === '0') {
          window.location.href = res.data.payPageUrl
        } else {
          this.$vux.toast.text(res.msg, 'middle')
        }
        // let _this = this
        // this.$vux.alert.show({
        //   content: res.msg,
        //   onHide () {
        //     _this.$router.push({path: '/', query: _this.query})
        //   }
        // })
      }, (res) => {
        this.$vux.toast.text(res.msg, 'middle')
      })
    },
    getList () {
      this.request({
        loanId: this.loanid
      }, 'repayTerm', (res) => {
        if (!res.data.onRepay) {
          let _this = this
          this.$vux.alert.show({
            content: `第${res.data.terms}期正在还款`,
            onHide () {
              _this.$router.push({path: '/', query: _this.query})
            }
          })
          // return false
        }
        res.data.termRepayList.forEach(element => {
          element.check = false
        })
        this.earlyObj = res.data
      }, (res) => {
        this.$vux.toast.text(res.msg, 'middle')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.page {
  .btnbox {
    padding: 30px;
  }
}
</style>
