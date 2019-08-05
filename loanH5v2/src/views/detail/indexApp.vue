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
                <h2 class="vcard-tit">翼钱包</h2>
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
        <h2 class="vbox-tit">借款额度</h2>
        <div class="vbox-cont">
          <van-cell-group>
            <van-cell is-link>
              <template slot="title">
                <span class="price"><b>￥</b>1934.00</span>
              </template>
              <span class="cont red">全部借出</span>
            </van-cell>
            <van-cell is-link>
              <template slot="title">
                <span class="tit">借款期限</span>
              </template>
              <span class="cont">30天/2期</span>
            </van-cell>
            <van-cell is-link>
              <template slot="title">
                <span class="tit">每期还款</span>
              </template>
              <span class="cont">首期还款 2634.4元</span>
            </van-cell>
            <van-cell is-link>
              <template slot="title">
                <span class="tit">综合管理费</span>
              </template>
              <span class="cont">155.68</span>
            </van-cell>
          </van-cell-group>
        </div>
      </section>
      <section class="vbox">
        <h2 class="vbox-tit">提额认证</h2>
        <div class="vbox-cont">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <p class="auth-tit">身份证实名认证</p>
                <img class="auth-bg" :src="require(`@/assets/images/lock_bg_hover.png`)" />
              </div>
              <div class="swiper-slide">
                <p class="auth-tit">紧急联系人</p>
                <img class="auth-bg-lock" :src="require(`@/assets/images/lock.png`)" />
                <img class="auth-bg" :src="require('@/assets/images/lock_bg.png')" />
              </div>
              <div class="swiper-slide">
                <p class="auth-tit">基本信息</p>
                <img class="auth-bg-lock" :src="require(`@/assets/images/lock.png`)" />
                <img class="auth-bg" :src="require('@/assets/images/lock_bg.png')" />
              </div>
              <div class="swiper-slide">
                <p class="auth-tit">芝麻信用</p>
                <img class="auth-bg-lock" :src="require(`@/assets/images/lock.png`)" />
                <img class="auth-bg" :src="require('@/assets/images/lock_bg.png')" />
              </div>
              <div class="swiper-slide">
                <p class="auth-tit">运营商认证</p>
                <img class="auth-bg-lock" :src="require(`@/assets/images/lock.png`)" />
                <img class="auth-bg" :src="require('@/assets/images/lock_bg.png')" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="vbox">
        <h2 class="vbox-tit">放款趋势</h2>
        <div class="vbox-cont">
          <charts></charts>
        </div>
      </section>
      <p class="copyright">资金由翼钱包平台提供</p>
      </div>
    </Scroll>
    <div id="tabproto">
      <van-checkbox checked-color="#FE5A3F" v-model="checked"> <span style="color:#999;">已阅读并同意</span> </van-checkbox>
      <router-link to="#" class="linkpro" >《借款协议》 </router-link>
    </div>
    <div id="tabbar" :class="{'on': outAble }">
      <button class="btn" @click="handleOut">申请借款</button>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import Scroll from '@/components/scroll/index'
import Charts from './components/charts'
import sdkApi from '@/api/sdk'
import loanv1Api from '@/api/loanv1'
export default {
  components: {
    Scroll,
    Charts
  },
  data () {
    return {
      outAble: true,
      checked: false,
      showIndicator: false,
      width: 100
    }
  },
  methods: {
    handleOut () {},
    swiperRun () {
      this.swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30
      })
    },
    getProduct () {
      loanv1Api.productIndex({
        appName: this.$route.query.productName,
        userId: this.$route.query.userId,
        productCode: this.$route.query.productCode
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getStatus () {
      return new Promise(async resolve => {
        await sdkApi.getIndex({
        })
          .then((response) => {
            console.log(response)
            resolve(response)
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  },
  mounted () {
    this.swiperRun()
    this.getStatus().then(() => {
      this.getProduct()
    })
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
.copyright {
  @extend %flexCenter;
  font-size: 12px;
  color: #C1C8D6;
  padding: 20px 0;
}
.wrapper {
  bottom: $btn-height*2 !important;
}
.van-cell {
  padding-right: 0;
  padding-left: 0;
}
.van-cell:not(:last-child)::after {
  left: 0;
}
.price {
  font-size: 18px;
  b {
    font-size: 12px;
  }
}
.tit {
  color: #999999;
}
.cont {
  color: #333333;
  &.red {
    color: #FE5A3F;
  }
}
.swiper-slide {
  @extend %flexCenter;
  height: 42px;
  position: relative;
  .auth-tit {
    color: #fff;
    font-size: 12px;
    position: relative;
    z-index: 2;
  }
  .auth-bg, .auth-bg-lock{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: -1;
  }
  .auth-bg-lock {
    z-index: 3;
  }
}
#tabproto {
  @extend %flexLeft;
  position: fixed;
  font-size: 14px;
  z-index: 501;
  right: 0;
  left: 0px;
  padding-left: 14px;
  bottom: 50px;
  width: 100%;
  height: $btn-height;
  line-height: $btn-height;
  background-color: #fff;
  a {
    color: #0F3290
  }
}
</style>
