<template>
  <sh-container>
      <!-- <van-loading size="24px" :vertical="true" v-if="pageLoading">加载中...</van-loading> -->
    <skeleton type="image" :loading="pageLoading"><swipe :images="images" type="cards"></swipe></skeleton>
    <skeleton type="title" :loading="pageLoading">
      <section class="modu">
        <h2 class="tit">快速办卡</h2>
        <div class="box">
          <van-grid :border="false" :column-num="3" :gutter="0">
            <van-grid-item>
              <div class="cardwrap">
                <span class="imgcard"><img :src="require(`@/assets/images/js2.png`)" /></span>
                <h5>招商银行</h5>
                <p>5分钟极速办卡</p>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div class="cardwrap">
                <span class="imgcard"><img :src="require(`@/assets/images/jshe.png`)" /></span>
                <h5>交通银行</h5>
                <p>天天交通日</p>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div class="cardwrap">
                <span class="imgcard"><img :src="require(`@/assets/images/pufa.png`)" /></span>
                <h5>华夏银行</h5>
                <p>活动大额卡</p>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div class="cardwrap">
                <span class="imgcard"><img :src="require(`@/assets/images/guangda.png`)" /></span>
                <h5>建设银行</h5>
                <p>周三会员日</p>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div class="cardwrap">
                <span class="imgcard"><img :src="require(`@/assets/images/aa3.png`)" /></span>
                <h5>光大银行</h5>
                <p>10元看大片</p>
              </div>
            </van-grid-item>
          </van-grid>
          <p class="loadMore">点击加载更多 </p>
        </div>
      </section>
    </skeleton>
    <skeleton type="image" :loading="pageLoading"><swipe :images="imagesSmall" class="cards-bot"></swipe></skeleton>
    <skeleton type="image" :loading="pageLoading">
      <section class="modu">
        <h2 class="tit">主题分类</h2>
        <div class="box">
          <van-row class="cardClass">
            <van-col span="12">
              <div class="subject">
                <div class="subjectTxt">
                  <h3>招商银行荣耀卡</h3>
                  <p>充值享5%优惠</p>
                </div>
                <img v-lazy="require(`@/assets/images/bn4.jpg`)" />
              </div>
            </van-col>
            <van-col span="12">
              <div class="subject small">
                <div class="subjectTxt">
                  <h3>中信IC信用卡</h3>
                  <p>刷卡免年费</p>
                </div>
                <img v-lazy="require(`@/assets/images/bn3.jpg`)" />
              </div>
              <div class="subject small">
                <div class="subjectTxt">
                  <h3>交行青年黑卡</h3>
                  <p>刷卡10元看大片</p>
                </div>
                <img v-lazy="require(`@/assets/images/bn4jpg.jpg`)" />
              </div>
            </van-col>
          </van-row>
        </div>
      </section>
    </skeleton>
    <skeleton type="avatar" :loading="pageLoading">
      <section class="modu">
        <h2 class="tit">热门排行</h2>
        <div class="box">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-row class="cardOrder" v-for="(item, index) in list" :key="index">
              <van-col span="10"><div class="cardImg"><img v-lazy="require(`@/assets/images/${item.img}`)" /></div></van-col>
              <van-col span="14" class="cardTxt">
                <h3>{{item.tit}}</h3>
                <p>{{item.intro}}</p>
                <div class="tags">
                  <template v-for="(tag, index) in item.tag">
                    <span class="tag" :class="{ 'blue': (index + 1) % 2 === 0 }" :key="index">{{tag}}</span>
                  </template>
                </div>
              </van-col>
            </van-row>
          </van-list>
        </div>
      </section>
    </skeleton>
  </sh-container>
</template>

<script>
import Swipe from './component/swipe'
import Skeleton from './component/skeleton'
export default {
  components: {
    Swipe,
    Skeleton
  },
  data () {
    return {
      loading: false,
      finished: false,
      pageLoading: true,
      images: [
        'bn1.jpg',
        'bn1.jpg'
      ],
      imagesSmall: [
        'bn2.jpg',
        'bn2.jpg'
      ],
      currentPage: 1,
      list: [
        {
          img: '12.png',
          tit: '光大经典卡',
          intro: '首年免年费,周五满30减10',
          tag: ['支付立减', '定制卡面']
        },
        {
          img: '12.png',
          tit: '光大经典卡',
          intro: '首年免年费,周五满30减10',
          tag: ['支付立减', '定制卡面']
        }
      ]
    }
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        // let currentList = this.list.slice(2, 4)
        // this.list.concat(currentList)
        this.list.push({
          img: '12.png',
          tit: '光大经典卡',
          intro: '首年免年费,周五满30减10',
          tag: ['支付立减', '定制卡面']
        },
        {
          img: '12.png',
          tit: '光大经典卡',
          intro: '首年免年费,周五满30减10',
          tag: ['支付立减', '定制卡面']
        },
        {
          img: '12.png',
          tit: '光大经典卡',
          intro: '首年免年费,周五满30减10',
          tag: ['支付立减', '定制卡面']
        },
        {
          img: '12.png',
          tit: '光大经典卡',
          intro: '首年免年费,周五满30减10',
          tag: ['支付立减', '定制卡面']
        },
        {
          img: '12.png',
          tit: '光大经典卡',
          intro: '首年免年费,周五满30减10',
          tag: ['支付立减', '定制卡面']
        },
        {
          img: '12.png',
          tit: '光大经典卡',
          intro: '首年免年费,周五满30减10',
          tag: ['支付立减', '定制卡面']
        })
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 12) {
          this.finished = true
        }
      }, 2000)
    }
  },
  mounted () {
    this.$toast.loading({
      mask: false,
      message: '加载中...'
    })
    setTimeout(() => {
      this.$toast.clear()
      this.pageLoading = false
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
$sizeTit: 18px;
$sizeIntro: 14px;
$color: #333;
@mixin fontTit {
  font-size: $sizeTit;
  font-weight: normal;
  color: $color
}
@mixin fontIntro {
  font-size: $sizeIntro;
  font-weight: normal;
  color: $color
}
.modu {
  margin-bottom: 20px;
  .tit {
    font-size: 20px;
    margin: 16px 0;
    color: $color;
  }
  .box {}
  .cardwrap {
    text-align: center;
    .imgcard {
      display: flex;
      width: 40px;
      height: 40px;
      padding: 10px;
      margin: 0 auto;
      border-radius: 100%;
      background-color: #fafafa;
      box-shadow: 0px 5px 5px 0px #f4f5f7;
      align-items: center;
      justify-content: center;
      img {
        max-width: 100%;
        width: auto;
      }
    }
    h5 { @include fontTit; margin: 5px 0 5px; }
    p { font-size: $sizeIntro; color: #999999;}
  }
  .cardClass {
    .subject {
      position: relative;
      z-index: 2;
      padding-right: 2px;
      &.small {
        padding-left: 2px;
        padding-right: 0px;
        &:first-of-type {
          margin-bottom: 4px;
        }
      }
      .subjectTxt {
        position: absolute;
        left: 15px;
        top: 15px;
        color: $color;
        h3 {
          @include fontTit;
          margin-bottom: 2px;
        }
        p {
          font-size: $sizeIntro;
        }
      }
    }
  }
  .cardOrder {
    margin: 20px 0;
    .cardImg {
      width: 150px;
    }
    .cardTxt {
      padding: 5px 5px 0 15px;
      line-height: 1;
      h3 {
        @include fontTit;
      }
      p {
        font-size: 14px;
        color: #666666;
        margin: 8px 0 12px;
      }
      .tags {
        height: 18px;
        .tag {
          font-size: 14px;
          padding: 2px 4px;
          margin-right: 5px;
          border-radius: 10px 0px 10px 0px;
          border: solid 1px #ff5c41;
          color: #ff5c41;
          display: inline-block;
        }
        .tag.blue {
          border-color: #0284f4;
          color: #0284f4;
        }
      }
    }
  }
  .loadMore {
    font-size: 14px;
    text-align: center;
    color: #999999;
    margin: 10px 0;
  }
}
</style>
