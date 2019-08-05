<template>
  <div>
    <van-skeleton v-if="type === 'image'" class="imageSke" :animate="animate" title title-width="100%" :loading="loading">
      <div>
        <slot></slot>
      </div>
    </van-skeleton>
    <van-skeleton v-if="type === 'title'"  class="titSke" :animate="animate" :row="2" title title-width="100%" :loading="loading">
      <div>
        <slot></slot>
      </div>
    </van-skeleton>
    <van-skeleton v-if="type === 'avatar'"  class="avatarSke" :animate="animate" avatar-size="50px" :row="3" avatar-shape="square" title title-width="100%" avatar :loading="loading">
      <div>
        <slot></slot>
      </div>
    </van-skeleton>
  </div>
</template>
<script>
export default {
  props: ['type', 'loading'],
  data () {
    return {
      animate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.imageSke {
  margin-bottom: 20px;
  .van-skeleton__title {
    height: 90px;
  }
}
.titSke {
  margin-bottom: 20px;
  .van-skeleton__title {
    height: 40px;
  }
}
.avatarSke {
  margin-bottom: 20px;
  .van-skeleton__title {
    height: 30px;
  }
  .van-skeleton__row {
    // height: 30px;
  }
}
</style>
