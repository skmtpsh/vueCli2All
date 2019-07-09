<template>
  <div>
    <group>
      <cell
      title="费用有哪些？"
      is-link
      :border-intent="false"
      :arrow-direction="showContent001 ? 'up' : 'down'"
      @click.native="showContent001 = !showContent001"></cell>
      <template v-if="showContent001">
        <cell-box :border-intent="false" class="sub-item" is-link> 收费包括：实名认证费、借款利息、借款手续费、快速审核费、账户管理费、保险服务费、催收服务费、逾期滞纳金，具体收费标准详见借款合同。</cell-box>
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
      showContent001: false
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