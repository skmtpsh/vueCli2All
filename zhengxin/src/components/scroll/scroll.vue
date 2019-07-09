<template>
  <div ref="wrapper">
    <slot></slot>
    <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle">
      <div class="before-trigger" v-if="beforePullDown">
        <span>{{pulltxt}}</span>
      </div>
      <div class="after-trigger" v-else>
        <div v-if="isPullingDown" class="loading">
          <inline-loading></inline-loading>
        </div>
        <!-- <div v-else><span>刷新成功</span></div> -->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { InlineLoading } from 'vux'
import BScroll from 'better-scroll'
export default {
  components: {
    InlineLoading
  },
  props: {
    lists: {
      type: Object,
      default: () => {
        return {}
      }
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pulltxt: '',
      probeType: 3,
      dropDown: false,
      loading: false,
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      pullUpDirty: true,
      pullDownStyle: ''
    }
  },
  created () {
    this.pullDownInitTop = -50
  },
  mounted () {
    setTimeout(() => {
      // var h = document.body.offsetHeight
      // document.getElementById('body').style.height = h + 1 + 'px'
      this.initScroll()
    }, 20)
  },
  watch: {
    lists () {
      setTimeout(() => {
        this.forceUpdate(true)
      }, 20)
    },
    status () {
      console.log(1)
      setTimeout(() => {
        this.forceUpdate(true)
      }, 20)
    }
  },
  methods: {
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
    destroy () {
      this.scroll.destroy()
    },
    rebuildScroll () {
      this.$nextTick(() => {
        this.destroy()
        this.initScroll()
      })
    },
    forceUpdate () {
      if (this.isPullingDown) {
        this.isPullingDown = false
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      } else {
        this.scroll.refresh()
      }
    },
    _reboundPullDown () {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          resolve()
        }, 600)
      })
    },
    _afterPullDown () {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.scroll.refresh()
      }, this.scroll.options.bounceTime)
    }
  }
}
</script>
<style lang="less" scoped>
// .wrapper {
//   position: absolute;
//   height: 100%;
//   width: 100%;
//   overflow: hidden;
// }
.pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  top: -50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #979eac;
  transition: all;
  .after-trigger {
    margin-top: 10px;
  }
}
</style>
