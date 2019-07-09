<template>
<div>
<!-- <scroll :lists="repay" @pullingDown="pullingDown"> -->
  <div class="headbox">
    <x-header :left-options="{showBack: true}" >还款</x-header>
    <header class="header">
      <h4>待还总金额(元)</h4>
      <h3 v-if="repay&&repay.remainTotal">{{repay.remainTotal}}</h3>
      <ul class="payItem">
        <li class="vux-1px-r">
          <h5 v-if="repay&&repay.remainTotalShort">{{repay.remainTotalShort}}</h5>
          <h4>短贷金额(元)</h4>
        </li>
        <li>
          <h5 v-if="repay&&repay.remainTotalTerm">{{repay.remainTotalTerm}}</h5>
          <h4>分期金额(元)</h4>
        </li>
      </ul>
    </header>
  </div>
  <main class="content">
    <section class="paylist">
      <template v-if="repay&&repay.repayList&&repay.repayList.length>0">
      <section class="payitem" v-for="(item, index) in repay.repayList" :key ='index'>
        <div class="dangerBox" v-if="item.overdue || item.extensionState=== '1'">
          <span v-if="item.overdue && item.extensionState=== '1'">您已逾期 <span class="font48">{{item.overdue}}</span> 天，申请展期可以缓解资金压力</span>
          <span v-if="item.overdue && item.extensionState=== '0'">您已逾期 <span class="font48">{{item.overdue}}</span> 天，请及时还款以免影响个人征信</span>
          <span v-if="item.extensionState=== '1' && !item.overdue">距离还款日 <span class="font48">{{item.remainDays}}</span> 天，申请展期可以缓解资金压力</span>
          <span></span>
          <span class="badgewarning" v-if="item.extensionState === '1'" @click="payApply(item.repayId)">申请展期</span>
        </div>
        <div class="index-container">
          <flexbox class="payTit">
            <flexbox-item class="payflex">
              <template v-if="item.loanType"><span class="badgedanger">短贷</span>应还金额</template>
              <template v-else><span class="badgenormal">现金</span>应还金额</template>
            </flexbox-item>
          </flexbox>
          <flexbox class="payPrice">
            <flexbox-item>
              <span class="font75" :class="{'color-danger': item.overdue}">{{item.remainAmount}}</span>
            </flexbox-item>
            <flexbox-item class="text-right">
              <a href="javascript:;" :class="[item.overdue ? 'payButtonDanger' : 'payButton']" @click="payNow(item.repayId)">立即还款</a>
            </flexbox-item>
          </flexbox>
          <flexbox class="payDate"><flexbox-item>还款日 {{item.playDate}}</flexbox-item></flexbox>
          <ul class="paylist" v-if="!item.loanType">
            <li class="vux-1px-r" @click="payItem(item.loanId, item.repayId)"><h4><svg-icon icon-class="list" /> 每期还款</h4></li>
            <li @click="payEarly(item.loanId)"><h4><svg-icon icon-class="list_check" /> 提前还清</h4></li>
          </ul>
        </div>
      </section>
      </template>
      <template v-if="mess">
        <no-mess title="没有待还账单"></no-mess>
      </template>
    </section>
  </main>
<!-- </scroll> -->
</div>
</template>
<script>
import Scroll from '@/components/scroll/scroll'
import NoMess from '@/components/nomess'
import repayApi from '@/api/repay'
export default {
  components: {
    Scroll,
    NoMess
  },
  data () {
    return {
      mess: false,
      repay: {
        remainTotal: 0.00,
        remainTotalShort: 0.00,
        remainTotalTerm: 0.00,
        repayList: []
      }
    }
  },
  created () {
    this.query = this.$route.query ? this.$route.query : null
    this.getList()
  },
  watch: {
    '$route' () {
      if (this.$route.path === '/') {
        this.getList()
      }
    }
  },
  methods: {
    payApply (repayid) {
      this.$router.push({path: '/apply', query: Object.assign({ repayid }, this.query)})
    },
    payEarly (loanid) {
      this.$router.push({path: '/advance', query: Object.assign({ loanid }, this.query)})
    },
    payItem (loanid) {
      this.$router.push({path: '/item', query: Object.assign({ loanid }, this.query)})
    },
    pullingDown () {
      this.getList()
    },
    getList () {
      this.$vux.loading.show({
        text: '数据加载..'
      })
      return repayApi.repayList(this.query)
        .then((response) => {
          this.$vux.loading.hide()
          let res = response.data
          if (res.code === '0') {
            this.repay = res.data
            if (this.repay && this.repay.repayList.length === 0) {
              this.mess = true
            }
            // this.repay = {}
          } else {
            this.$vux.toast.text(res.msg, 'middle')
          }
        })
        .catch((error) => {
          this.$vux.loading.hide()
          this.$vux.toast.text('服务器异常,请稍后重试', 'middle')
          console.log(error)
        })
    },
    payNow (repayId) {
      this.$vux.loading.show({
        text: '数据处理..'
      })
      repayApi.repayNow(Object.assign({
        repayId
      }, this.query))
        .then((response) => {
          this.$vux.loading.hide()
          let res = response.data
          if (res.code === '0') {
            window.location.href = res.data.payPageUrl
          } else {
            this.$vux.toast.text(res.msg, 'middle')
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
@import '~vux/src/styles/1px.less';
@import '../../style/variable.less';
.pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #979eac;
  transition: all;
  .after-trigger {
    margin-top: 10px;
  }
}
.headbox {
  padding: 60px 0 0;
  background-color: @header-background-color;
}
.header {
  // background-image: url('../../assets/header.jpg');
  // background-size: 100%;
  background-color: @header-background-color;
  text-align: center;
  padding: 30px;
  h4 {
    font-size: 42px;
    // .font-dpr(42px);
    margin: 30px 0 0;
    color: @color-white;
    color: rgba(255, 255, 255, .8)
  }
  h3 {
    font-size: 99px;
    margin: 60px 0 0;
    color: @color-white
  }
  h5 {
    color: @color-white;
    font-size: 60px;
  }
  .payItem {
    .flexitem(90px, 30px);
  }
}
.content {
  .dangerBox {
    .dangerbox()
  }
  .badgewarning {
    margin-left: 30px;
    .badge(#ef250f, #ffe7e4);
  }
  .index-container {
    padding: 60px 30px 0px;
    margin-bottom:60px;
    background-color: @color-white;
    position:relative;
    overflow: hidden;
    .payTit, .payPrice {
      margin-bottom: 30px;
    }
    .payflex {
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      position: relative;
      padding-left: 140px;
    }
    .payTit {
      font-size: 48px;
      line-height: 1;
    }
    .payDate {
      font-size: 42px;
      color: #979eac;
      margin-bottom: 60px;
    }
    .badgedanger {
      margin-right: 30px;
      left:0;
      .badge();
      position: absolute;
    }
    .badgenormal {
      left:0;
      margin-right: 30px;
      .badge(#456df1, #f3f6ff);
      position: absolute;
    }
    .paylist {
      position: relative;
      padding: 24px 0;
      .flexitem();
      margin-top: 60px;
      &:before {
        .setTopLine(#c7c7c7);
      }
      h4 {
        .svg-icon {
          color: #979eac
        }
        color: #333333;
        font-size: 48px;
        padding: 18px 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .payButton {
      .btnpay()
    }
    .payButtonDanger {
      .btnpay(#ff5542, #ef250f)
    }
  }
}
</style>