<template>
  <div class="prod">
    <Scroll class="wrapper" ref="wrapper">
      <div>
      <section class="header">
        <section class="topbg"></section>
        <div class="wrap">
          <div class="vcard">
            <van-row>
              <van-col span="4">
                <van-image fit="cover" class="vard-avator" :src="require('@/assets/images/yiqianbao.png')"/>
              </van-col>
              <van-col span="19" offset="1">
                <h2 class="vcard-tit">借吧</h2>
                <div class="tags">
                  <van-tag color="#F0F0F0" text-color="#848484">门槛低</van-tag>
                  <van-tag color="#F0F0F0" text-color="#848484">最受欢迎</van-tag>
                  <van-tag color="#F0F0F0" text-color="#848484">10秒审核</van-tag>
                </div>
              </van-col>
            </van-row>
            <van-grid :column-num="3" :border="false" class="vcard-bot">
              <van-grid-item>
                <span>2000-8000</span>
                <p>额度范围(元)</p>
              </van-grid-item>
              <van-grid-item>
                <span>0.05<em>%</em></span>
                <p>参考月利率</p>
              </van-grid-item>
              <van-grid-item>
                <span>1-3<em>月</em></span>
                <p>借款期限</p>
              </van-grid-item>
            </van-grid>
          </div>
          <van-button class="btnGo" type="default" square border="0" :block="true">查看产品详情 ></van-button>
        </div>
      </section>
      <section class="vbox">
        <h2 class="vbox-tit">放款趋势</h2>
        <div class="vbox-cont">
          <charts></charts>
        </div>
      </section>
      <section class="vbox">
        <h2 class="vbox-tit">申请流程</h2>
        <div class="vbox-cont">
          <div class="step">
            <div class="step-item">
              <div class="step-circle">
                <b>1</b>
              </div>
              <div class="step-line"></div>
              <div class="step-title">资料认证</div>
            </div>
            <div class="step-item">
              <div class="step-circle">
                <b>2</b>
              </div>
              <div class="step-line"></div>
              <div class="step-title">资料认证</div>
            </div>
            <div class="step-item">
              <div class="step-circle">
                <b>3</b>
              </div>
              <div class="step-line"></div>
              <div class="step-title">信息审核</div>
            </div>
            <div class="step-item">
              <div class="step-circle">
                <b>4</b>
              </div>
              <div class="step-line"></div>
              <div class="step-title">放款成功</div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </Scroll>
    <div id="tabbar" :class="{'on': outAble }">
      <button class="btn" @click="handleOut">申请借款</button>
    </div>
  </div>
</template>
<script>
import Scroll from '@/components/scroll/index'
import Charts from './components/charts'
export default {
  components: {
    Scroll,
    Charts
  },
  data () {
    return {
      outAble: true
    }
  },
  methods: {
    handleOut () {}
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
