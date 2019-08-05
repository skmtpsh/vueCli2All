|<template>
  <van-swipe :autoplay="0" :class="type">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img :src="require(`@/assets/images/${image}`)" />
    </van-swipe-item>
  </van-swipe>
</template>
<script>
export default {
  props: ['images', 'type']
}
</script>
<style lang="scss">
  .cards .van-swipe__indicator {
    // width: 10px !important;
    // height: 3px !important;
    // border-radius: 0;
  }
  .cards-bot .van-swipe__indicators {
    // bottom: -4px;
  }
</style>
