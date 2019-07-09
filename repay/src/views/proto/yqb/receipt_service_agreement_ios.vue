<template>
<div>
<!-- <x-header :left-options="{backText: ''}" >借款协议</x-header> -->
  <div class="page">

    <h3 class="text-center">客户收货确认书</h3>
<p>编号： </p>
<p>      今收到由翼钱包平台根据《商品分期服务居间协议》（协议编号：     ）所提供金额购买的产品，借款金额     ，分期期数：     ，月还款金额：    ，月还款日    ，产品类型            ，产品品牌：   ，产品型号：     ，产品金额:      ，收货地址为购买门店  ，地址：       。收货时间：       年     月     日，如货物发生质量问题或货物丢失或者货物损失等问题，与翼钱包APP无关，翼钱包APP不承担任何责任。</p>
<p>      收货人：</p>
<p>      身份证号码：</p>
<p>      日期：</p>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  beforeCreate () {
    document.getElementsByTagName('body')[0].className = 'intro'
  }
}
</script>
<style lang="less" scoped>
.page {
  padding: 30px;
  color: #333;
  line-height: 1.8;
  font-size: 48px;
  text-indent: 2em;
  h2, h3, h4, h5 {
    margin: 30px 0
  }
}
</style>

