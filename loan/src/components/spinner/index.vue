<template>
  <div class="custom-spinner-zone" v-show="visible" :class="{'fixed': fixed}">
    <div class="content">
      <atom-spinner
        :animation-duration="1000"
        :size="60"
        :color="'#409EFF'"
      />
      <div class="text">{{text}}</div>
    </div>
  </div>
</template>
<script>
import { AtomSpinner } from 'epic-spinners' // 选择了epic-spinners里面的一种loading效果，还有很多种可以按需切换
export default {
  components: {
    AtomSpinner
  },
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    text: String,
    fixed: Boolean
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss">
  .custom-spinner-zone {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, .8);
    z-index: 5;

    .content > .text {
      margin-top: 16px;
      width: 100%;
      text-align: center;
      color: #64cc34;
    }

    &.fixed {
      position: fixed!important;
    }
  }
</style>
