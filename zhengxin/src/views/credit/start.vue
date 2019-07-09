<template>
  <div class="startPage">
    <loading :show="!show" :text="text"></loading>
  </div>
</template>
<script>
import creditApi from '@/api/credit'
import { Loading } from 'vux'
export default {
  components: {
    Loading
  },
  data () {
    return {
      show: false,
      text: '检查数据中...'
    }
  },
  mounted () {
    /**
     * 立即查看-0 立即支付-1 支付中-2 查询报告-3
     */
    creditApi.getOverDue({
      productNo: 3,
      name: '张三',
      idCard: '370784199901015689'
    })
      .then((response) => {
        let res = response.data
        if (res.code === 200) {
          let status = res.datas.status
          if (status === 1) {
            this.$router.push({path: '/authentication/credit/check'})
          } else {
            this.$router.push({path: '/authentication/credit/login'})
          }
        } else {
          this.$vux.toast.text(res.message, 'middle')
        }
      })
      .catch((error) => {
        this.$vux.toast.text(error, 'middle')
      })
  }
}
</script>
<style lang="less">
.startPage {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>

