<template>
  <div class="page wrapper" ref="wrapper">
    <div class="mergeWrap">
    <!-- <x-header :left-options="{backText: ''}" >购买商品获取机构信用券</x-header> -->
      <section class="merge">
        <div class="price"><span class="money">￥</span>{{mergeMoney}}</div>
      </section>
      <p class="totalCount"><img src="../../assets/mergeStar.png" class="star">已有{{ pursePerson }}人购买</p>
      <div class="mergeDesc">
        <group v-for="(item, index) in lists" :key="index" class="mergeContent">
          <flexbox orient="vertical">
            <flexbox-item><div class="flex-demo title"><img src="../../assets/circle.png"  class="circle">{{item.title}}</div></flexbox-item>
            <flexbox-item><div class="flex-demo intro" v-html="item.intro"></div></flexbox-item>
        </flexbox>
        </group>
      </div>
      <section class="btnBox" v-if="app">
        <x-button @click.native="goBack" type="primary" class="confirm"></x-button>
      </section>
      <section class="btnBox" v-else>
        <x-button @click.native="Back" type="primary" class="confirm"></x-button>
      </section>
    </div>
  </div>
</template>
<script>
import { Cell, Group } from 'vux'
import BScroll from 'better-scroll'
// import { setTimeout } from 'timers'
export default {
  data () {
    return {
      lists: [
        {show: true, title: '生活无忧PLUS卡是什么?', intro: '生活无忧plus卡是由微博商城提供的专属商品增值服务，享有该商城多种商品的折扣以及其合作商户的折扣券权益包等，根据用户的等级拥有更多权益。'},
        {show: true, title: '生活无忧PLUS卡如何使用?', intro: '用户购买并付款成功后，APP会将商品领取链接通过消息推送的方式发送到用户手中，用户即可领取使用。<br/>领取位置：我的-消息-商品消息'},
        {show: true, title: '如何支付"生活无忧PLUS卡"商品费用?', intro: '用户申请借款成功后，购买商品的费用会在借款费用中扣除，无需用户自己操作支付。'}
      ],
      mergeMoney: '',
      pursePerson: '',
      app: true
    }
  },
  components: {
    Cell,
    Group
  },
  mounted () {
    setTimeout(() => {
      // var h = document.body.offsetHeight
      // document.getElementById('body').style.height = h + 1 + 'px'
      this.initScroll()
    }, 20)
    // this.$nextTick(() => {
    //   let bscrollDom = this.$refs.wrapper
    //   this.aBscroll = new BScroll(bscrollDom, {})
    // })
  },
  initScroll () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          pullDownRefresh: {
            threshold: 120, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
            stop: 80 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
          },
          pullUpLoad: false, // 关闭上拉
          click: true,
          scrollY: true,
          momentum: true,
          probeType: 3
        })
      } else {
        this.scroll.refresh()
      }
      this.scroll.on('scroll', (pos) => {
        if (this.beforePullDown) {
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 5)}px`
        }
        if (this.isRebounding) {
          this.pullDownStyle = `top:${5 - (this.scroll.options.pullDownRefresh.stop - pos.y)}px`
        }
      })
      this.scroll.on('touchEnd', () => {
        // this.pulltxt = '↓'
        this.$emit('touchEnd')
      })
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.$emit('pullingDown')
      })
    })
  },
  beforeCreate () {
    document.getElementsByTagName('body')[0].className = 'intro'
  },
  created () {
    this.setParams()
    sessionStorage.setItem('mergeMoney', this.$route.query.mergeMoney)
    this.mergeMoney = sessionStorage.getItem('mergeMoney')
    this.getDay()
    if (this.$route.query.h5) {
      this.app = false
    }
  },
  methods: {
    // 返回按钮操作
    goBack () {
      var u = navigator.userAgent
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)  // ios终端
      if (isIOS) {  // 判断iPhone|iPad|iPod|iOS
        window.webkit.messageHandlers.goBack.postMessage('')
      } else {
        window.creditBill.goBack()
      }
    },
    // 返回上一页
    Back () {
      this.$router.go(-1)
    },
    // 获取地址栏参数
    setParams () {
      return {
        mergeMoney: this.$route.query.mergeMoney
      }
    },
    // 计算一年中的天数
    getDay () {
      const getDay = Math.ceil((new Date() - new Date(new Date().getFullYear().toString())) / (24 * 60 * 60 * 1000)) + 1
      var now = new Date()
      var hour = now.getHours()
      var pursePerson = 1240 + getDay * 24 + hour
      console.log(getDay)
      console.log(hour * 100)
      console.log(getDay * 24 + hour)
      this.pursePerson = pursePerson
    }
  }
}
</script>
<style lang="less" scoped>
.intro {
  color: #999999;
  line-height: 1.5;
  padding: 10px 30px 70px 60px;
  font-size: 0.35rem;
}
.slide {
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.btnBox {
  padding: 30px;
}
// 样式开始
.title {
  font-size: 54px;
  padding: 0.45rem 0.25rem 0.05rem!important
}
.merge {
  width: 96%;
  height: 5rem;
  margin: 0 auto;
  top: 20px;
  position: relative;
  margin-bottom: 20px;
  background: url('../../assets/merge_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 32px;
}
.mergeDesc {
  margin-bottom: 160px;
}
.totalCount {
  text-align: right;
  padding: 0.25rem;
  font-size: 0.4rem;
  color: #DB9E49;
}
.price {
  font-size: 1.2rem;
  color: #ffffff;
  position: absolute;
  bottom: 0.6rem;
  right: 0.6rem;
  font-weight: bold;
}
.money {
  font-size: 0.6rem;
}
.circle {
  margin-right: 20px;
  bottom: 10px;
  position: relative;
}
.confirm {
  background: url('../../assets/purse.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 150px;
  border-radius: 10px;
  z-index: 99999;
}
.star {
  width: 50px;
  margin-right: 10px;
}
.vux-no-group-title {
  position: initial!important;
}
.btnBox {
  position: fixed;
  width: 100%;
  bottom: 20px;
  margin-top: 350px;
  z-index: 999;
}
.wrapper {
  width: 100%;
  // height: 100%;
  overflow: hidden;
  // position: absolute;
  left:0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
<style>
.mergeContent .weui-cells {
  position: inherit!important;
}
</style>


