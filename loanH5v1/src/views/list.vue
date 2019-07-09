<template>
  <div class="page">
    <!-- <Scroll class="wrapper" ref="wrapper"> -->
    <Skeleton v-if="!init"></Skeleton>
    <div v-else>
      <div>
        <div class="mainpage">
          <header id="header" style="background-color: #2b74fb;">
            <h5>当前预授信额度(元)</h5>
            <h4><countup :start-val="0" :start="true" :end-val="5000" :duration="1.5"></countup></h4>
            <div class="authItemBox">
              <ul class="authNum">
                <li>
                  <h6>0</h6>
                  <p>已完成认证</p>
                </li>
                <li>
                  <h6>0</h6>
                  <p>未完成认证</p>
                </li>
              </ul>
              <div class="authItemBg"></div>
            </div>
          </header>
          <main class="content">
            <div class="authBaseTit">
              <h2>基础认证</h2>
              <p>完成基础认证，即可获得您的专属额度</p>
            </div>
            <ul class="authItem">

            </ul>
          </main>
          <footer id="footer"> 所有信息仅用于身份验证 </footer>
        </div>
      </div>
    </div>
    <!-- <div id="tabbar" class="on" >
      <button class="btn">立即申请</button>
    </div> -->
    <!-- </Scroll> -->
  </div>
</template>
<script>
import Scroll from '@/components/scroll/index'
import Skeleton from './skeleton'
import indexApi from '@/api/index'
export default {
  components: {
    Scroll,
    Skeleton
  },
  // mixins: [myMixin],
  data () {
    return {
      init: false
    }
  },
  created () {
    // this.$vux.loading.show()
    indexApi.getIndex()
    .then((response) => {
      // this.$vux.loading.hide()
      setTimeout(() => {
        this.init = true
      }, 0)
    })
    .catch((error) => {
      // this.$vux.loading.hide()
      this.$vux.toast.text(error, 'middle')
    })
  },
  methods: {
  },
  beforeCreate () {
    document.getElementsByTagName('body')[0].className = 'main'
  }
}
</script>
<style lang="less">
@import url('../style/theme.less');
@import url('../style/variable.less');
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 110px;
  // height: 100%;
  width: 100%;
  z-index: 480;
}
#header {
  background-color: @normal-color;
  text-align: center;
  padding: 28px 0px 0;
  h5 {
    .font-dpr(24px);
    color: rgba(255, 255, 255, .5)
  }
  h4 {
    color: #fff;
    .font-dpr(64px);
    margin: 16px 0 40px;
  }
  .authItemBox {
    position: relative;
    .authItemBg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      opacity: .05;
      z-index: 2;
    }
    .authNum {
      display: flex;
      position: relative;
      z-index: 3;
      li {
        padding: 16px 0;
        position: relative;
        flex: 1;
        &:first-child:before {
          .setRightLine()
        }
        h6 {
          .font-dpr(40px);
          color: #fff;
          margin-bottom: 12px;
        }
        p {
          .font-dpr(24px);
          color: rgba(255, 255, 255, .5)
        }
      }
    }
  }
}
#footer {
  .font-dpr(22px);
  text-align: center;
  padding: 40px 0 60px;
  color: #bfbfbf;
  vertical-align: middle;
}
.mainpage {
}
#tabbar {
  display: flex;
  position: fixed;
  // position: absolute;
  z-index: 500;
  right: 0;
  left: 0;
  bottom: 10px;
  width: 100%;
  height: 90px;
  line-height: 90px;
  &.on {
    .tabbaritem {
      background-color: #434343;
    }
    .btn {
      background: #2b74fb;
    }
  }
  .font-dpr(24px);
  .tabbaritem {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 0px 0 0;
    color: #fff;
    background-color: rgb(204, 204, 204);
    text-align: center;
    // -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .btn {
    width: 100%;
    border-radius: 10px;
    margin: 0 30px;
    border-width: 0;
    outline: 0;
    -webkit-appearance: none;
    padding: 0 80px;
    height: 90px;
    background: #ccc;
    color: #fff;
    .font-dpr(32px);
  }
  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    // border-top: 1px solid #c0bfc4; /*no*/
    color: #c0bfc4;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
}
.content {
  font-family: PingFangSC-Regular,Helvetica Neue,Tahoma,Arial,Hiragino Sans GB,Microsoft Yahei,sans-serif;
  margin-bottom: 20px;
  padding: 20px 20px 0;
  background-color: #fff;
}
</style>
