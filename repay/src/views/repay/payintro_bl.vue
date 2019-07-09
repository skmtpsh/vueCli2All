<template>
  <div>
    <group v-for="(item, index) in lists" :key="index">
      <cell
      :title="item.title"
      is-link
      :border-intent="false"
      :arrow-direction="item.show ? 'up' : 'down'"
      @click.native="item.show = !item.show"></cell>
      <div class="slide" :class="item.show ? 'animate' : ''">
        <div class="intro" v-html="item.intro"></div>
      </div>
    </group>
  </div>
</template>
<script>
import { Cell, Group } from 'vux'
export default {
  data () {
    return {
      lists: [
        {show: false, title: '什么是展期？', intro: '如果您短借订单到期，无法按时还款，佰联钱包提供延期还款服务以避免对您的信用造成影响。您可以在订单下方点击【申请展期】按钮，选择延期还款天数并支付展期费用，即可延期还款。展期不会影响您的信用评分，请放心使用。'},
        {show: false, title: '申请展期需要什么条件?', intro: '在您要在还款日前一天至逾期3日内，且信用记录良好，即可申请展期。'},
        {show: false, title: '申请展期后，多少天之后还款？', intro: '在申请展期过程中，您需要选择展期的周期，目前支持8天、15天;<br>如果您的订单<strong>未逾期</strong>状态下申请展期天数为8天，那么您实际还款日为： 原先还款日+8天;<br>如果您的订单是<strong>逾期</strong>状态下申请展期天数为15天，那么您实际还款日为：<strong>成功</strong>申请展期日+15天。'},
        {show: false, title: '展期费用如何计算？', intro: '展期综合费用 = 展期基础服务费 + 展期费率 * 借款金额 。'},
        {show: false, title: '我能申请多少次展期？', intro: '如果您资金一直紧张，您申请的展期到期后，即可再次发起展期，可展期多次。'}
      ]
    }
  },
  components: {
    Cell,
    Group
  },
  beforeCreate () {
    document.getElementsByTagName('body')[0].className = 'intro'
  }
}
</script>
<style lang="less" scoped>
.intro {
  color: #999999;
  line-height: 1.5;
  padding: 30px;
}
.slide {
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>

