<template>
  <div>
    <group>
      <cell
      title="可以提前还款吗？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent001 ? 'up' : 'down'"
      @click.native="showContent001 = !showContent001"></cell>
      <template v-if="showContent001">
        <cell-box :border-intent="false" class="sub-item" is-link> 可以的，借款人可提前偿还部分或全部还款。您可以选择APP还款功能用绑定的银行卡还款。</cell-box>
      </template>
      <cell
      title="如何还款？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent002 ? 'up' : 'down'"
      @click.native="showContent002 = !showContent002"></cell>
      <template v-if="showContent002">
        <cell-box :border-intent="false" class="sub-item" is-link>  您可以选择主动还款和自动还款两种方式。 主动还款：用户可通过点击APP账户资产中的“还款”按钮，选择您要还的金额以及您绑定的银行卡，进行还款。用户还款当日，APP全天24小时支持主动还款。 自动还款：用户需根据预还款的金额在绑定的银行卡内存入足够的款项，翼钱包将在还款日凌晨和当天下午5点自动从该银行卡中扣款。您应保证还款期间银行账户不会出现挂失、账户冻结、金额不足等问题，以维护您良好的信用。 </cell-box>
      </template>
      <cell
      title="如果没有及时还款会怎样？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent003 ? 'up' : 'down'"
      @click.native="showContent003 = !showContent003"></cell>
      <template v-if="showContent003">
        <cell-box :border-intent="false" class="sub-item" is-link> 当您发生逾期还款现象时，您的逾期记录将被提交至多家翼钱包合作征信机构，会影响到您日后个人信用记录，敬请用户珍惜个人信用记录。另外，从逾期首日起，将收取催收服务费和逾期滞纳金（实际金额以合同内容为准)，并保留相关追诉权利，相关信息已在合同内清晰说明，如在多次催收后，仍拒不还款者，我方将通过法律诉讼追究其法律责任，建议您在获取借款后，及时了解个人每月还款时间及妥善安排资金使用，以免因个人原因延误还款时间。 </cell-box>
      </template>
    </group>
  </div>
</template>
<script>
import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

export default {
  mounted () {
    setTimeout(() => {
      this.money = -1024
    }, 2000)
  },
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
  },
  methods: {
    onClick () {
      console.log('on click')
    }
  },
  data () {
    return {
      showContent001: false,
      showContent002: false,
      showContent003: false
    }
  }
}
</script>

<style scoped>
.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.weui-cell {
  line-height: 0.6rem;
}
</style>