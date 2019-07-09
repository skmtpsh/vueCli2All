<template>
  <section>
    <div class="text-center no-mess">
      <img src="../assets/np.png" />
      <p>{{title}}</p>
    </div>
  </section>
</template>
<style lang="less" scoped>
.no-mess {
  text-align: center;
  margin: 240px;
  font-size: 54px;
  color: #979eac;
  p {
    margin: 142px 0;
  }
  img {
    width: 400px;
    height: 400px;
  }
}
</style>
<script>
export default {
  props: ['title'],
  data () {
    return {}
  }
}
</script>
