<template>
<div>
<!-- <x-header :left-options="{backText: ''}" >借款协议</x-header> -->
  <div class="page">
    <p>借款支付授权委托书 <br>
      一、为保证本借款用于指定用途，本人同意并不可撤销的授权<u>{$company_name}（</u>以下称为{$abbreviation}）将批准的借款直接支付给符合协议约定用途的特约合作商户的账户中，具体收款的特约合作商户、支付金额、账户名称、账号、开户行等，以本人向{$abbreviation}提交的申请为准，{$abbreviation}有权监督借款的使用。 <br>
      二、本授权书是本人向<u>{$abbreviation}</u>做出的单方承诺，效力具有独立性，不因《翼钱包居间服务协议》的任何条款无效而失效。 <br>
      以上授权期限为本人作出本授权承诺之日起至本人在借款人处所有业务终结之日止。 <br>
      若本人与被授权人发生任何纠纷或争议，首先应友好协商解决；协商不成的，本人同意将纠纷或争议提交本授权书签订地（即衢州仲裁委员会）有管辖权的人民法院管理。本授权书的成立、生效、履行、解释及纠纷解决，适用中华人名共和国大陆地区法律（不包括冲突法） <br>
      本人已知悉本授权书所有内容的意义以及由此产生的法律效力，自愿作出上述授权，本授权书是本人真实的意思表示，本人同意承担由此带来的一切法律后果。 <br>
      特此授权！ <br>
      <br>
      年-月-日 </p>
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

