<template>
  <div>
    <group>
      <cell
      title="可以同时借多笔钱吗？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent001 ? 'up' : 'down'"
      @click.native="showContent001 = !showContent001"></cell>
      <template v-if="showContent001">
        <cell-box :border-intent="false" class="sub-item" is-link> 不可以，翼钱包针对每一位用户在一段时间内只提供一笔借款，如在可用额度内申请大额度的借款，可做提前还款后再进行申请。</cell-box>
      </template>
      <cell
      title="注册页面的邀请码是什么？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent002 ? 'up' : 'down'"
      @click.native="showContent002 = !showContent002"></cell>
      <template v-if="showContent002">
        <cell-box :border-intent="false" class="sub-item">邀请人的手机号码，非必填项。</cell-box>
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