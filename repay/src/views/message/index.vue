<template>
  <div class="page">
    <section>
      <div class="box" v-for="(item, index) in message" :key ='index'>
        <div class="boxhead">
        <!--<span class="isread" v-if="item.isRead==1 && (item.category==21 || item.category==100)"></span>-->
          <h3>{{item.title}}</h3><span>{{item.createTime}}</span>
        </div>
        <div class="activity">
          <div class="content" v-if="item.content == '' || item.content == null || item.content === undefined ? false : true">
            <h4 v-if="item.category == 21 || item.category == 100" v-html="item.content.substring(0,100)+'...'"></h4>
            <h6 v-else v-html="item.content"></h6>
            <img :src="item.picUrl" v-if="item.picUrl === null || item.picUrl === '' || item.picUrl === undefined ? false : true">
            <p class="detail" @click="toDetail(item)" v-if="item.category == 21 || item.category == 100"><span class="more">查看详情</span><x-icon type="ios-arrow-forward" size="30"></x-icon></p>
          </div>
        </div>
      </div>
    </section>
    <!--<section class="footer">
      <h3 class="log-footer"><span><img src="../../assets/safe.png"></span>通过中国人民银行安全认证检查</h3>
    </section>-->
  </div>
</template>
<script>
import { XHeader } from 'vux'
import messageApi from '@/api/message'
const localStorage = require('localStorage')
export default {
  components: {
    XHeader
  },
  data () {
    return {
      message: [],
      article: true
    }
  },
  created () {
  },
  methods: {
    onBlur () {
    },
    setParams () {
      return {
        category: this.$route.query.category,
        pageNo: this.$route.query.pageNo || 0,
        size: 200,
        userId: this.$route.query.userId,
        appName: this.$route.query.appName || '佰联钱包'
      }
    },
    toDetail (item) {
      console.log(item)
      this.$router.push({path: `/message/${item.id}`})
      localStorage.setItem('item', JSON.stringify(item))
    }
  },
  mounted () {
    messageApi['messageChannel'](Object.assign(this.setParams()))
    .then((response) => {
      let res = response.data
      if (res.code === '0') {
        this.message = response.data.data.result
      } else {
        this.$vux.toast.text(response.data.data.result.msg, 'middle')
      }
      this.$vux.loading.hide()
    })
    .catch((error) => {
      console.log(error)
    })
  },
  beforeCreate () {
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
body, html {
  background-color: #ffffff!important;
}
.page {
  margin-bottom: 50px;
}
.page.main {
  background: #ffffff!important;
  // height: 100%;
  padding-bottom: 50px /*no*/
}
.img {
  max-width: 100%;
}
.pagehead {
  margin-top: 0.4992rem;
  margin-left: 0.2031rem;
}
.log {
  background-repeat: repeat-y;
  background-size: 100%;
  padding-bottom: .15rem;
}
.wrap {
  color: #adadad;
}
.weui-cell.input {
  padding: 0rem 0.2rem 0.28rem
}
.weui-toast__content {
  font-size: 16px !important; /*no*/
}
.log-footer {
  text-align: center;
  color: #979eac;
  font-size: 0.2899rem;
}
.log-footer img {
  width: 0.2818rem;
  height: 0.2979rem;
  margin-right: 0.2254rem;
}
.footer {
  position: fixed;
  bottom: 0;
  background: #f7f7f7;
  width: 100%;
  height: 0.8857rem;
}
.datetime {
  text-align: center;
  background: #dcdcdc;
  height: 0.8052rem;
  line-height: 0.8052rem;
  display: block;
  margin: 0 auto;
  border-radius: 100px;
  color: #ffffff;
  font-size: 0.3382rem;
  font-weight: bold;
  width: 4.8309rem;
  margin-top: 0.7246rem;
  margin-bottom: 0.4831rem;
}
.desc {
  background: #ffffff;
  color: #333333;
  text-align: center;
  height: 1.8277rem;
  line-height: 1.8277rem;
  font-size: 0.3865rem;
}
.box {
  padding: 0 0.3rem;
}
h3, h4 {
  font-weight: normal;
}
.activity {
  background: #ffffff;
  padding: 0 0 0.15rem 0.15rem;
  border-bottom: 1px solid #ddd;
}
.activity img {
  width: 100%;
  padding-bottom: 0.4831rem;
  border-bottom: 1px solid #dddddd;
  display: block;
  height: 4.3559rem;
}
.activity h3 {
  font-size: 0.3865rem;
  margin-bottom: 0.4026rem;
  font-weight: bold;
}
.activity h4 {
  font-size: 46px;
  color: #979eac;
  line-height: 0.6441rem;
  overflow: hidden;
  width: 100%;
}
.more {
  // height: 1.0789rem;
  height: 116px;
  line-height: 116px;
  width: 93%;
  position: relative;
  display: inline-block;
  font-size: 0.38rem;
  color: #FF6A63;
}
.vux-header {
  padding: 0.3221rem 0 0.3221rem!important;
  background: #ffffff!important;
}
.vux-header .vux-header-title {
  color: #333333!important;
  font-weight: bold!important;
}
.vux-header .vux-header-left .left-arrow:before {
  top: 0.35rem!important;
  border: 3px solid #000000!important;
  border-width: 5px 0 0 5px!important;
}
.detail svg {
  width: 0.6441rem;
  height: 0.6441rem;
  top: 20px;
  position: relative;
  right: -17px;
}
.vux-x-icon {
  fill: #bfbfbf;
}
.content h6 {
  font-size: 42px;
  color: #979eac;
  overflow: hidden;
  width: 100%;
  font-weight: normal;
  line-height: 70px;
  margin-top: 24px;
  // margin-bottom: 30px;
  // height: 45px;
}
.content h4 {
  margin-top: 24px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 0.38rem;
}
.boxhead h3 {
  font-size: 48px;
  display: inline-block;
  font-weight: 400;
  padding: 0 0.2rem;
  width: 70%;
  overflow: hidden;
  height: 70px;
  line-height: 70px;
}
.boxhead span {
  display: inline-block;
  float: right;
  text-align: right;
  font-size: 42px;
  color: #979EAC;
}
.boxhead {
  margin-top: 70px;
  height: 55px;
}
.isread {
  display: inline-block;
  width:  20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ef250f;
  float: left!important;
  top: 10px;
  position: relative;
}
</style>
