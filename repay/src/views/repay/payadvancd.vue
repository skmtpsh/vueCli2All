<template>
  <div class="page">
    <x-header :left-options="{backText: ''}" >还款</x-header>
    <header class="header">
      <h4>待还总金额(元)</h4>
      <h3 v-if="earlyObj&&earlyObj.earlyClearanceAmt">{{earlyObj.earlyClearanceAmt}}</h3>
      <section class="btnbox" v-if="earlyObj&&earlyObj.termRepayList&&earlyObj.termRepayList.length > 0">
        <x-button type="primary" @click.native="payNow">提前还清</x-button>
      </section>
    </header>
    <template v-if="earlyObj&&earlyObj.termRepayList">
      <check-list v-if="earlyObj.termRepayList" :datalist="earlyObj.termRepayList" :showicon="false"></check-list>
    </template>
    <template v-else>
      <no-mess title="没有分期数据"></no-mess>
    </template>
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
      this.request({
        repayIds: 0,
        repayType: 1,
        loanId: this.loanid
      }, 'repayItemComfirm', (res) => {
        let _this = this
        this.$vux.alert.show({
          content: res.msg,
          onHide () {
            _this.$router.push({path: '/', query: _this.query})
          }
        })
      }, (res) => {
        this.$vux.toast.text(res.msg, 'middle')
      })
    },
    getList () {
      this.request({
        loanId: this.loanid
      }, 'repayEarly', (res) => {
        this.earlyObj = res.data
      }, (res) => {
        this.$vux.toast.text(res.msg, 'middle')
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variable.less';
.page {
  .header {
    text-align: center;
    padding: 30px;
    background: #fff;
    h4 {
      font-size: 42px;
      margin: 30px 0 0;
      color: #979eac;
    }
    h3 {
      font-size: 99px;
      margin: 60px 0 0;
      color: #000;
    }
  }
  .btnbox {
    margin: 90px 230px 30px;
  }
}
</style>
