<template>
  <div>
    <group>
      <cell
      title="什么是信用额度？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent001 ? 'up' : 'down'"
      @click.native="showContent001 = !showContent001"></cell>
      <template v-if="showContent001">
        <cell-box :border-intent="false" class="sub-item" is-link> 信用额度是您在翼钱包的借款授信额度，拥有信用额度的用户，可在额度范围内快速借款，无需人工审核。</cell-box>
      </template>
      <cell
      title="如何获得授信额度？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent002 ? 'up' : 'down'"
      @click.native="showContent002 = !showContent002"></cell>
      <template v-if="showContent002">
        <cell-box :border-intent="false" class="sub-item">信用额度是根据您申请额度时提交的个人资料综合评估得来，可能会实时变更，以实际提现时的额度为准。</cell-box>
      </template>
      <cell
      title="我可以获得多少额度？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent003 ? 'up' : 'down'"
      @click.native="showContent003 = !showContent003"></cell>
      <template v-if="showContent003">
        <cell-box :border-intent="false" class="sub-item">根据您提交的资料，通过系统的审核，您将被给予500-20000元的信用额度。 </cell-box>
      </template>
      <cell
      title="如何首次评估的信用额度过低怎么办？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent004 ? 'up' : 'down'"
      @click.native="showContent004 = !showContent004"></cell>
      <template v-if="showContent004">
        <cell-box :border-intent="false" class="sub-item">您可通过提交更多的提额资料来获取更高的信用额度，总额度也将随着您信用记录的累积而提高，按时还款对提高额度有一定的帮助。</cell-box>
      </template>
      <cell
      title="申请信用额度后多久可以得到评估结果？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent005 ? 'up' : 'down'"
      @click.native="showContent005 = !showContent005"></cell>
      <template v-if="showContent005">
        <cell-box :border-intent="false" class="sub-item">正常工作时间评估周期是10分钟内，如遇节假日或活动期间，评估进度可能会有所延缓，请您敬请谅解并耐心等待。</cell-box>
      </template>
      <cell
      title="为何申请信用额度结果为零？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent006 ? 'up' : 'down'"
      @click.native="showContent006 = !showContent006"></cell>
      <template v-if="showContent006">
        <cell-box :border-intent="false" class="sub-item">若您在申请额度时被拒绝，首先请确保您填写的个人信息完整并真实、有效、上传的图片清晰且符合要求。另外，也可能是您暂时没有达到翼钱包的审核标准，暂时无法获取额度或借款，建议您后续保持一个良好的个人信用记录、还款习惯并且在平时保护好您的账号信息及个人隐私，系统也会不定期的更新您的个人情况。</cell-box>
      </template>
      <cell
      title="请问怎么取消额度申请？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent007 ? 'up' : 'down'"
      @click.native="showContent007 = !showContent007"></cell>
      <template v-if="showContent007">
        <cell-box :border-intent="false" class="sub-item">在申请结果出具之前，您无法取消额度申请，您可在审核通过后，不做提现处理。</cell-box>
      </template>
      <cell
      title="借款申请条件？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent008 ? 'up' : 'down'"
      @click.native="showContent008 = !showContent008"></cell>
      <template v-if="showContent008">
        <cell-box :border-intent="false" class="sub-item">只需要在手机上完善如下资料即可：个人信息、信用信息、联系信息、人脸认证、身份证照（正、反面）。注：必须使用正式有效的身份证，临时证明文件暂不支持。</cell-box>
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
      showContent003: false,
      showContent004: false,
      showContent005: false,
      showContent006: false,
      showContent007: false,
      showContent008: false
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