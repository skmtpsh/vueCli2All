<template>
  <x-address @on-hide="handleHide" :title="title" placeholder="请选择" v-model="value" :list="addressData" value-text-align="right"></x-address>
</template>
<script>
// import ChinaAddressV4Data from './chinaAddressV4.min.json'
import { XAddress, Value2nameFilter as value2name } from 'vux'
export default {
  components: {
    XAddress
  },
  props: ['title'],
  data () {
    return {
      // addressData: ChinaAddressV4Data, // 地址列表
      addressData: [], // 地址列表
      value: []
    }
  },
  methods: {
    handleHide (close) {
      if (close) {
        this.$emit('change', value2name(this.value, ChinaAddressV4Data))
      }
    }
  }
}
</script>
