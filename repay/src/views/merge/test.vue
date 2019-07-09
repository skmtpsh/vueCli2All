<template> 
  <div class="wrapper" ref="wrapper"> 
    <ul class="content"> 
      <li v-for="(item, index) in data" :key="index">{{item}}</li> 
    </ul>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { setTimeout } from 'timers';
export default {
  data() {
    return {

    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    })
  }
}
</script>