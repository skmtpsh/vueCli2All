<template>
  <div class="page">
    <x-header :left-options="{backText: ''}" >展期</x-header>
    <header class="header">
      <h2>选择展期期限</h2>
      <h3>申请展期需支付展期服务费，建议您及时还款</h3>
    </header>
    <main class="content">
      <checker
      v-model="days"
      radio-required
      disabled-item-class= "item-disabled"
      default-item-class="item"
      selected-item-class="item-selected" v-if="applyObj.extensionDaysList">
        <checker-item v-for="(item, index) in applyObj.extensionDaysList"
          :value="item.extensionDay"
          :disabled="item.extensionState === '1'"
          :key="index"
          @on-item-click="onItemClick">
          <span>{{item.extensionDay}}</span> 天
        </checker-item>
      </checker>
      <group>
        <cell title="服务基础费" :is-loading="!applyObj.extensionAmount" :value="applyObj.extensionAmount"></cell>
        <cell title="利息" :is-loading="!applyObj.interest" :value="applyObj.interest"></cell>
        <cell title="逾期费用" :is-loading="!applyObj.overdueFine" :value="applyObj.overdueFine"></cell>
        <cell title="合计" :is-loading="!applyObj.extensionTotal" :value="applyObj.extensionTotal"></cell>
      </group>
    </main>
    <section class="btnbox">
      <check-icon :value.sync="agree"> 我已阅读并同意</check-icon><router-link :to="proto" class="linkpro" >《展期协议》 </router-link>
      <x-button type="primary" @click.native="payNow">立即申请</x-button>
    </section>
  </div>
</template>
<script>
import { Checker, CheckerItem, Cell, Group, CheckIcon } from 'vux'
import repayApi from '@/api/repay'
export default {
  components: {
    CheckIcon,
    Checker,
    CheckerItem,
    Group,
    Cell
  },
  data () {
    return {
      clicked: false,
      days: 0,
      agree: true,
      applyObj: {},
      proto: '/proto/exhibit'
    }
  },
  created () {
    this.query = { token: this.$route.query.token, userId: this.$route.query.userId, appName: this.$route.query.appName }
    if (this.query.appName === '小贷钱包') {
      this.proto = '/proto/extend_xdqb'
    }
    this.getExtenApply()
  },
  mounted () {
  },
  methods: {
    onItemClick (value, disabled) {
      if (!disabled) {
        this.getExtenApply(value)
        this.clicked = true
      }
    },
    payNow () {
      if (!this.agree) {
        this.$vux.toast.text('请选中同意协议', 'middle')
        return
      }
      if (this.days === '') {
        this.$vux.toast.text('请选择天数', 'middle')
        return
      }
      repayApi.repayNow(Object.assign({
        repayId: this.$route.query.repayid,
        days: this.days,
        paymentType: 2,
        rateVersion: this.applyObj.rateVersion
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
          console.log(error)
        })
    },
    getExtenApply (days = 0) {
      this.$vux.loading.show({
        text: '数据加载..'
      })
      return repayApi.repayExtenApply(Object.assign({
        repayId: this.$route.query.repayid,
        days
      }, this.query))
        .then((response) => {
          this.$vux.loading.hide()
          let res = response.data
          if (res.code === '0') {
            this.applyObj = res.data
            if (!this.clicked) {
              this.days = this.applyObj.extensionDaysList && this.applyObj.extensionDaysList.length > 0 && this.applyObj.extensionDaysList[0].extensionDay
            }
          } else {
            this.$vux.toast.text(res.msg, 'middle')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variable.less';
.page {
  .btnbox {
    padding: 30px;
    &>div {
      margin-top: 30px;
      margin-bottom: 90px;
    }
  }
  .linkpro {
    font-size: 48px;
    color: #456df1;
  }
}
.header {
  padding: 30px;
  background: #fff;
  h2 {
    font-size: 78px;
    margin: 30px 0 0;
    color: #333;
  }
  h3 {
    margin: 60px 0 0;
    font-size: 48px;
    color: #979eac;
  }
}
.content {
  background: #fff;
  .vux-checker-box {
    display: flex;
  }
  .vux-checker-item {
    flex: 1;
  }
  .item {
    width: 342px;
    height: 120px;
    line-height: 120px;
    margin: 120px 30px;
    border-radius: 20px;
    background-color: #f7f8fa;
    color: #979eac;
    text-align: center;
    span {
      font-size: 72px;
    }
  }
  .item-selected {
    color: #fff;
    background-color: #456df1;
  }
  .item-disabled {
    color: #999;
    // text-shadow: -1px -1px 0 #fff;/*no*/
    background-color: #ddd;
  }
}
</style>
