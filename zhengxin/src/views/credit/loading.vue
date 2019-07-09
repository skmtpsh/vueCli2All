<template>
  <div class="loadingPage">
  <Scroll class="wrapper" ref="wrapper" style="bottom: 0">
  <div>
    <div class="loadingHead">
      <div class="run-ball-inner">
        <img :src="require(`@/asset/credit/dunload.png`)" class="icoImg" />
      </div>
      <div class="run-ball">
        <span class="sk-inner-circle">
          <span class="sk-inner-circle-small"></span>
        </span>
      </div>
    </div>
    <h4 class="loadingTxt">正在为您生成征信报告...</h4>
    <div class="loadingBody">
      <ul class="loadingList">
        <li><span>信用评级</span><loadingTime :time="600" /></li>
        <li><span>黑名单</span><loadingTime :time="800" /></li>
        <li><span>网贷痕迹</span><loadingTime :time="1100" /></li>
        <li><span>欺诈评估</span><loadingTime :time="1400" /></li>
        <li><span>网贷逾期</span><loadingTime :time="1900" /></li>
      </ul>
    </div>
  </div>
  </Scroll>
  </div>
</template>
<script>
import Scroll from '@/components/scroll/index'
import loadingTime from './loadingTime'
export default {
  components: {
    Scroll,
    loadingTime
  },
  data () {
    return {
    }
  },
  mounted () {
    setTimeout(() => {
      this.$router.push({path: '/authentication/credit/report', query: Object.assign({}, this.$route.query)})
    }, 2000)
  }
}
</script>
<style lang="less">
@import url('./credit.less');
.loadingPage {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.loadingBody {
  width: 350px;
  padding-bottom: 100px;
  position: relative;
  margin: 0 auto;
  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 0;
    .font-dpr(28px);
  }
}
.loadingHead {
  width: 100%;
  padding-top: 120px;
  position: relative;
}
.run-ball {
  border: 4px solid #4ce781;
  width: 310px;
  height: 310px;
  border-radius: 100%;
  position: relative;
  margin: 0 auto;
  -webkit-animation: sk-innerCircle 2.5s linear infinite;
  -moz-animation: sk-innerCircle 2.5s linear infinite;
  -o-animation: sk-innerCircle 2.5s linear infinite;
  animation: sk-innerCircle 2.5s linear infinite;
}
.run-ball-inner {
  position: relative;
  background-color: #4ce781;
  width: 280px;
  height: 280px;
  margin: 0 auto -295px;
  border-radius: 148px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  .icoImg {
    width: 132px;
    height: 148px;
  }
}
.run-ball .sk-inner-circle {
  display: block;
  background-color: #fff;
  width: 100px;
  height: 100px;
  position: absolute;
  border-radius: 100%;
  top: 100px;
  left: -50px;
  .sk-inner-circle-small {
    position: absolute;
    left: 50px;
    top: 95px;
    width: 10px;
    height: 10px;
    background-color: #4ce781;
    border-radius: 5px;
  }
}
.loadingTxt {
  .font-dpr(32px);
  color: #35df81;
  text-align: center;
  margin: 80px 0 40px;
}
@-webkit-keyframes sk-innerCircle {
  0% {
    -webkit-transform: rotate(0deg)
  }
  100% {
    -webkit-transform: rotate(360deg)
  }
}

@-moz-keyframes sk-innerCircle {
  0% {
    -moz-transform: rotate(0deg)
  }
  100% {
    -moz-transform: rotate(360deg)
  }
}

@-o-keyframes sk-innerCircle {
  0% {
    -o-transform: rotate(0deg)
  }
  100% {
    -o-transform: rotate(360deg)
  }
}

@keyframes sk-innerCircle {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>
