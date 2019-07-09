<template>
<ul>
  <li class="checklist" v-for="(item, index) in datalist" :key="index" :class="{grey: item.state==='1'}">
    <flexbox > <!--@click.native="item.check = !item.check" 0 未还 1 已还 2 逾期-->
      <check-icon class="check" :value.sync="item.check" v-if="item.state!=='1' && showicon" @click.native="checkItem(item, index)"></check-icon>
      <flexbox-item><div class="pd font48" :class="{'color-danger': item.state === '2'}">{{item.term}}</div><p class="dt font42">{{item.planRepayDay}}</p></flexbox-item>
      <flexbox-item class="text-right"><div><span class="font72">{{item.totalAmt}}</span>元</div><p class="in font36">{{item.interest}}</p><p :class="{'color-danger': item.state === '2'}" class="font36">{{item.ovedueAmt}}</p></flexbox-item>
    </flexbox>
  </li>
</ul>
</template>
<script>
import { CheckIcon } from 'vux'
export default {
  props: {
    datalist: {
      type: Array,
      default: []
    },
    showicon: { // 是否显示单选框
      type: Boolean,
      default: false
    }
  },
  components: {
    CheckIcon
  },
  computed: {
    datalistMap () {
      return new Map(this.datalist.map((item, i) => [i, item]))
    }
  },
  methods: {
    // 如果选中中间的前面要选中如果取消中间的后面的要取消 1 已还款 0,2未还,逾期 "onRepay":true//是否可以还款
    checkItem (item, number) {
      for (let [i, list] of this.datalistMap) {
        if (i <= number && item.check) {
          list.check = true
        } else if (i > number && !item.check) {
          list.check = false
        }
      }
      let repayIDArr = []
      this.datalist.forEach((item, index) => {
        if (item.check && item.state !== '1') {
          repayIDArr.push(item.repayId)
        }
      })
      console.log(repayIDArr)
      this.$emit('select', repayIDArr)
    }
  }
}
</script>
<style lang="less" scoped>
  .check {
    margin-right: 30px;
  }
  .checklist {
    padding: 60px 30px;
    background-color: #fff;
    margin-bottom: 30px;
    &.grey {
      background-color: #efefef
    }
    .pd {
      margin-bottom: 30px;
    }
    .dt, .in  {
      color: #979eac;
      margin-bottom: 6px;
    }
  }
</style>
