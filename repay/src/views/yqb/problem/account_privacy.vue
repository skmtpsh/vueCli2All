<template>
  <div>
    <group>
      <cell
      title="我提交的资料会泄漏给第三方吗？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent001 ? 'up' : 'down'"
      @click.native="showContent001 = !showContent001"></cell>
      <template v-if="showContent001">
        <cell-box :border-intent="false" class="sub-item" is-link>
          翼钱包严格遵守国家相关法律法规，对用户的隐私信息进行严格地保护。翼钱包的IT团队来自甲骨文、腾讯、百度等知名互联网企业及国内各大银行，并有来自中国大陆、香港及印度的各地精英，在信息安全及数据安全的保护方面有着非常丰富的经验，能有效防止入侵及盗用数据，确保交易数据安全。 翼钱包承诺在任何情况下都绝不会出售、出租或以任何其他形式泄漏翼钱包用户的信息。同时翼钱包用户的所有隐私信息及数据都会经过多重加密和数字签名处理，用以提供信息的保密性和完整性保护，从而防止任何人盗取和篡改用户信息。 
        </cell-box>
      </template>
      <cell
      title="是否与家人联系人公司等联系，会透漏借款信息吗？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent002 ? 'up' : 'down'"
      @click.native="showContent002 = !showContent002"></cell>
      <template v-if="showContent002">
        <cell-box :border-intent="false" class="sub-item" is-link>在正常借款期间，我们不会以任何方式联系您填写的联系人。当您逾期时，我们也会先与您本人进行联络沟通，绝不会打扰您的联系人；如果您因客观原因无法及时还款，我们也会提供延期还款的服务，或者酌情减免一些费用；只有当您严重逾期且失联的情况下，我们才会通过其它方式联络您。 </cell-box>
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
  data () {
    return {
      showContent001: false,
      showContent002: false
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