<template>
  <div class="page">
    <Scroll class="wrapper" ref="wrapper">
    <div>
    <div>
    <div class="mainpage" :style="{'bottom': !btnShow ? '0px' : ''}">
      <!-- <header id="header" :style="{'background-color': authList.appColor}" style="display:none;">
        <h5>当前预授信额度(元)</h5>
        <h4><countup v-if="authList && authList.creditSum >= 0" :start-val="0" :start="true" :end-val="authList.creditSum" :duration="1.5"></countup></h4>
        <div class="authItemBox">
          <ul class="authNum">
            <li>
              <h6>{{authList.authNumber || 0}}</h6>
              <p>已完成认证</p>
            </li>
            <li>
              <h6>{{authList.unauthNumber || 0}}</h6>
              <p>未完成认证</p>
            </li>
          </ul>
          <div class="authItemBg"></div>
        </div>
      </header> -->
      <main class="content">
        <div class="authBaseTit">
          <h2>基础认证</h2>
          <p>完成基础认证，即可获得您的专属额度</p>
        </div>
        <ul class="authItem" v-if="authList&&authList.baseAuth" >
          <li v-for="(item, index) in authList.baseAuth" :key="index" @click="handleClick(item)">
            <div class="icon-cont">
              <div class="icon-main" :class="filterToStatus(item) ? item.verifyType : ''">
                <img v-if="filterToStatus(item)" :src="checkIconIs(item, 'hover')" class="icon-logo" />
                <img v-else :src="checkIconIs(item)" class="icon-logo" />
              </div>
            </div>
            <div>
              <h2 class="authTit" :class="filterToStatus(item) ? 'authas' : ''">{{item.verifyName}}</h2>
              <!-- <p class="authIntro">{{item.creditLineDepict}} <span class="price" :class="filterToStatus(item) ? 'authas' : ''">{{item.creditLine}}</span> 元</p> -->
            </div>
            <div class="authBtn">
              <span class="authtxt" :class="filterToClass(item)">{{filterToText(item)}}</span>
              <svg-icon icon-class="arrow" v-if="!filterToStatus(item)" />
            </div>
          </li>
        </ul>
      </main>
      <main class="content" v-if="authList&&authList.advancedAuth&&authList.advancedAuth.length>0">
        <div class="authBaseTit">
          <h2>高级认证</h2>
          <p>完成高级认证，可提高您的审核通过率</p>
        </div>
        <ul class="authItemAdvance" v-if="authList&&authList.advancedAuth" >
          <li v-for="(item, index) in authList.advancedAuth" :key="index" @click="handleClick(item, 'advance')">
            <div class="icon-main">
              <img v-if="filterToStatus(item)" :src="checkIconIs(item, 'hover')" class="icon-logo" />
              <img v-else :src="checkIconIs(item)" class="icon-logo" />
            </div>
            <p :class="filterToStatus(item) ? 'authas' : ''">{{item.verifyName}}</p>
          </li>
        </ul>
      </main>
      <footer id="footer"><i class="icon"></i> 所有信息仅用于身份验证</footer>
    </div>

    <!-- <div id="tabbar" :class="{'on': outAble }">
      <div class="tabbaritem"><p>完成提额认证，可大幅提升借款额度</p></div>
      <button :disabled="!outAble" class="btn" @click="handleOut">提交</button>
    </div> -->

    </div>
    </div>
    <div id="tabbar" :class="{'on': outAble }" v-if="btnShow">
      <!-- <div class="tabbaritem"><p>完成提额认证，可大幅提升借款额度</p></div> -->
      <button class="btn" @click="handleOut" :style="{'background-color': outAble ? authList.appBtnColor : ''}">提交获取专属额度</button>
    </div>
    </Scroll>

  </div>
</template>
<script>
import Scroll from '@/components/scroll/index'
import indexApi from '@/api/index'
import myMixin from '@/views/mixin'
// 10 未认证 ; 11 认证中 ; 12 已失效；20 已认证; 30 失败
const STATUS_SUCESS = '20'
const STATUS_FAIL = '10'
const STATUS_DOING = '11'
const STATUS_UNABLE = '12'
const STATUS_CONFUSE = '30'
const STATUS_TYPE_IDENTIFY = 'statusIdentity' // 身份认证
export default {
  components: {
    Scroll
  },
  mixins: [myMixin],
  data () {
    return {
      top: 0,
      authList: {},
      outAble: false,
      confuseIs: false,
      btnShow: false
    }
  },
  created () {
    this.$vux.loading.show({
      text: '数据加载..'
    })
    indexApi.getIndex()
      .then((response) => {
        this.$vux.loading.hide()
        let res = response.data
        if (res.code === 200) {
          this.authList = res.datas
          // 基础认证排序
          this.authList.baseAuth && this.authList.baseAuth.sort((a, b) => {
            return a.order - b.order
          })
          // 提额认证排序
          this.authList.advancedAuth && this.authList.advancedAuth.sort((a, b) => {
            return a.order - b.order
          })
          // 判断基本认证是否都全部通过 && 高级认证项任意有认证通过的即可
          if (this.checkBasePass() && this.checkAdvancePass()) {
            this.outAble = true
          }
          // 判断基本认证是否有拒绝认证
          if (this.checkConfuse()) {
            this.confuseIs = true
          }
          // 把未认证其他项 和 未认证过的身份认证 的选出来 运营商为已失效也要加进去
          let noStatusArr
          noStatusArr = this.authList.baseAuth.filter((item) => {
            return item.verifyStatus === STATUS_FAIL || item.verifyStatus === STATUS_UNABLE || (item.verifyStatus === STATUS_SUCESS && (item.verifyStatusLive && item.verifyStatusLive !== STATUS_SUCESS))
          })
          this.noStatusArr = noStatusArr.length > 0 ? noStatusArr : null
        } else {
          this.$vux.toast.text(res.message, 'middle')
        }
      })
      .catch((error) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(error, 'middle')
      })
    // 不等于3的时候显示按钮
    if (this.$route.query.type && (this.$route.query.type === '2' || this.$route.query.type === '1' || this.$route.query.type === '0')) {
      this.btnShow = true
    }
  },
  methods: {
    /*
    * 检查图片是否存在
    */
    checkIconIs (item, type) {
      let path = ''
      try {
        path = type ? require(`@/asset/${item.verifyType}_hover.png`) : require(`@/asset/${item.verifyType}.png`)
      } catch (error) {
        path = type ? require(`@/asset/nopic_hover.png`) : require(`@/asset/nopic.png`)
      }
      return path
    },
    /*
    检查拒绝通过
    */
    checkConfuse () {
      return this.authList.baseAuth.some((list) => {
        let pass = false
        if (list.verifyType === STATUS_TYPE_IDENTIFY) {
          if (list.verifyStatusLive === STATUS_CONFUSE || list.verifyStatus === STATUS_CONFUSE) {
            pass = true
          }
        } else {
          if (list.verifyStatus === STATUS_CONFUSE) {
            pass = true
          }
        }
        return pass
      })
    },
    /*
    检查基础认证是否全部认证,使提交按钮高亮
    */
    checkBasePass () {
      return this.authList.baseAuth.every((list) => {
        let pass = false
        if (list.verifyType === STATUS_TYPE_IDENTIFY) {
          if (list.verifyStatusLive === STATUS_SUCESS && list.verifyStatus === STATUS_SUCESS) {
            pass = true
          }
        } else {
          if (list.verifyStatus === STATUS_SUCESS) {
            pass = true
          }
        }
        return pass
      })
    },
    /*
    检查高级认证是否认证,使提交按钮高亮.目前是其中 一项 认证即可
    */
    checkAdvancePass () {
      /*
      * 第一步先判断高级认证是否有数据 第二步 再判断是否认证通过
      * 如果没有高级认证项目 直接返回True 就不用判断高级认证了
      */
      let authLength = false
      if (this.authList.advancedAuth && this.authList.advancedAuth.length > 0) {
        authLength = true
      }
      if (authLength) {
        // 第二个方案 认证一项即可点亮
        return this.authList.advancedAuth.some((list) => {
          let pass = false
          if (list.verifyStatus === STATUS_SUCESS) {
            pass = true
          }
          return pass
        })
      } else {
        return true
      }
      // 第一个方案 可以通用 到时解开注释即可
      // let authTotal = 1 // 需要认证项目的总数
      // let authCount = 0
      // this.authList.advancedAuth.forEach(item => {
      //   if (item.verifyStatus === STATUS_SUCESS) {
      //     authCount++
      //   }
      // })
      // if (authCount >= authTotal) {
      //   return true
      // }
      // return false
    },
    /*
    退出SDK
    */
    handleOut () {
      console.log(this.outAble)
      if (this.outAble) {
        try {
          // if (this.$route.query.platform === 'ios') {
          window.webkit.messageHandlers.submitCertifications.postMessage('')
          // } else {
          //   window.javaObj.closeSDK()
          // }
        } catch (error) {
          window.javaObj.submitCertifications()
          // console.log(error)
        }
      } else {
        this.$vux.toast.text('请完成基础认证', 'middle')
        return false
      }
    },
    handleClick (item, type = 'base') {
      /**
       * 1. 前一项是否认证
       * 2. 基础认证是否通过
       * 3. 认证提示信息
       * 4. 如果其中有一项为失败,其他项都不能点击
      */
      // 如果其中有一项为失败,其他项都不能点击
      let confusePass = this.authList.baseAuth.some((list) => {
        let confuse = false
        if (list.verifyType === STATUS_TYPE_IDENTIFY) {
          if (list.verifyStatusLive === STATUS_CONFUSE || list.verifyStatus === STATUS_CONFUSE) {
            confuse = true
          }
        } else {
          if (list.verifyStatus === STATUS_CONFUSE) {
            confuse = true
          }
        }
        return confuse
      })
      if (confusePass) {
        this.$vux.toast.text('您的综合信用评分不足，请过一段时间后再申请', 'middle')
        return false
      }
      // 高级认证须基础认证先认证
      if (type === 'advance') {
        let pass = this.authList.baseAuth.every((item) => {
          let boolPass = false
          if (item.verifyType === STATUS_TYPE_IDENTIFY) {
            if (item.verifyStatusLive === STATUS_SUCESS && item.verifyStatus === STATUS_SUCESS) {
              boolPass = true
            }
          } else {
            if (item.verifyStatus === STATUS_SUCESS) {
              boolPass = true
            }
          }
          return boolPass
        })
        if (!pass) {
          this.$vux.toast.text('请先认证基础项', 'middle')
          return false
        }
      }
      // 判断是否认证
      let strSuccessTip = '此项已认证'
      if (item.verifyType === STATUS_TYPE_IDENTIFY) {
        if (item.verifyStatusLive === STATUS_SUCESS && item.verifyStatus === STATUS_SUCESS) {
          this.$vux.toast.text(strSuccessTip, 'middle')
          return false
        }
      } else {
        if (item.verifyStatus === STATUS_SUCESS) {
          this.$vux.toast.text(strSuccessTip, 'middle')
          return false
        }
      }
      // 第一项是否认证
      if (type === 'base') {
        if (this.noStatusArr.length > 0) {
          let prePass = true
          let preAuth = this.noStatusArr[0]
          if (item.verifyType === preAuth.verifyType) { // 点击项与第一项一样时候
            prePass = true
          } else { // 点击项与第一项不一样时候
            if (preAuth.verifyType === STATUS_TYPE_IDENTIFY) { // 身份认证
              if (preAuth.verifyStatusLive === STATUS_SUCESS && preAuth.verifyStatus === STATUS_SUCESS) {
                prePass = true
              } else {
                prePass = false
              }
            }
            if (preAuth.verifyStatus !== STATUS_SUCESS) {
              prePass = false
            }
          }
          if (!prePass) {
            this.$vux.toast.text(preAuth.verifyName + '需要先认证', 'middle')
            return false
          }
        }
      }
      // 是否认证通过之后
      this.gotoURL(item.verifyType, item.verifyStatusLive, item.verifyStatus)
    },
    filterToText (item) {
      if (item.verifyType === STATUS_TYPE_IDENTIFY) { // 如果是身份认证判断活体和身份证
        if (item.verifyStatusLive === STATUS_SUCESS && item.verifyStatus === STATUS_SUCESS) {
          return '已认证'
        } if (item.verifyStatusLive === STATUS_UNABLE && item.verifyStatus === STATUS_SUCESS) {
          return '已失效'
        } if (item.verifyStatusLive === STATUS_CONFUSE || item.verifyStatus === STATUS_CONFUSE) {
          return '失败'
        } else {
          return '去认证'
        }
      }
      if (item.verifyStatus === STATUS_SUCESS) {
        return '已认证'
      } else if (item.verifyStatus === STATUS_FAIL) {
        return '去认证'
      } else if (item.verifyStatus === STATUS_UNABLE) {
        return '已失效'
      } else if (item.verifyStatus === STATUS_DOING) {
        return '认证中'
      } else if (item.verifyStatus === STATUS_CONFUSE) {
        return '失败'
      }
    },
    filterToStatus (item) {
      if (item.verifyType === STATUS_TYPE_IDENTIFY) { // 如果是身份认证判断活体和身份证
        if (item.verifyStatusLive === STATUS_SUCESS && item.verifyStatus === STATUS_SUCESS) {
          return true
        } else {
          return false
        }
      }
      if (item.verifyStatus === STATUS_SUCESS) {
        return true
      }
      return false
    },
    filterToClass (item) { // 判断颜色
      if (item.verifyType === STATUS_TYPE_IDENTIFY) { // 如果是身份认证判断活体和身份证
        if (item.verifyStatusLive === STATUS_SUCESS && item.verifyStatus === STATUS_SUCESS) {
          return 'green'
        } if (item.verifyStatusLive === STATUS_UNABLE && item.verifyStatus === STATUS_SUCESS) {
          return 'red'
        } if (item.verifyStatusLive === STATUS_CONFUSE || item.verifyStatus === STATUS_CONFUSE) {
          return 'red'
        }
      } else {
        if (item.verifyStatus === STATUS_SUCESS) {
          return 'green'
        } else if (item.verifyStatus === STATUS_UNABLE) {
          return 'red'
        } else if (item.verifyStatus === STATUS_DOING) {
          return 'blue'
        } else if (item.verifyStatus === STATUS_CONFUSE) {
          return 'red'
        }
      }
      // 各项失败及其身份认证第一步为成功,第二部为失败的情况
      if (item.verifyStatus === STATUS_FAIL || (item.verifyStatus === STATUS_SUCESS && (item.verifyStatusLive && item.verifyStatusLive !== STATUS_SUCESS))) {  // 按顺序查找未认证然后第一个为蓝色默认为灰色
        if (this.confuseIs) {
          return ''
        }
        if (this.noStatusArr && this.noStatusArr[0].verifyType === item.verifyType) {
          return 'blue'
        } else {
          return ''
        }
      }
    }
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
// .mainpage {
//   // position: absolute;
//   // top: 0;
//   // left: 0;
//   // right: 0;
//   // // height: 100%;
//   // // bottom: 90px;
//   // bottom: 110px;
//   // overflow-y: scroll;
//   // /* 增加该属性，可以增加弹性 */
//   // -webkit-overflow-scrolling: touch;
//   // width: 100%;
// }
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
  .authBaseTit {
    padding: 20px;
    h2 {
      .font-dpr(36px);
      margin-top: 20px;
      color: @text-main-color;
    }
    p {
      .font-dpr(24px);
      margin: 18px 0;
      color: @text-sub-color;
    }
  }
  .authItem {
    li {
      display: flex;
      &>div {
        display: flex;
        flex: 1;
        // justify-content: center;
        align-items: center; /*2.0.1*/
        // padding: 24px 0;
        padding: 16px 0; /*2.0.1*/
        position: relative;
        &:not(:first-child):after {
          .setBottomLine();
        }
      }
      &:last-child>div {
        &:not(:first-child):after {
          height: 0px !important;
          border-bottom: 0px none !important;
        }
      }
      .authIntro {
        .font-dpr(24px);
        line-height: 1;
        color: @text-sub-color;
        .price {
          .font-dpr(28px);
          &.authas {
            color: @warning-color;
            display: inline-block;
            vertical-align: baseline;
          }
        }
      }
      .authTit {
        .font-dpr(30px);
        // margin-bottom: 14px;
        color: @text-sub-color;
        &.authas  {
          color: @text-main-color;
        }
      }
      .authBtn {
        flex: none;
        display: flex;
        align-items: center;
        width: 140px;
        justify-content: flex-start;
        .authtxt {
          // font-size: 28px;
          .font-dpr(28px);
          color: @text-sub-color;
          position: relative;
          &.red {
            color: @danger-color;
          }
          &.green {
            color: @success-color;
          }
          &.blue {
            color: @normal-color;
          }
        }
        .svg-icon {
          margin-left: 20px;
          margin-right: -20px;
        }
      }
    }
    .icon-cont {
      flex: none;
      margin: 0 26px 0 12px;
      border-bottom: 0 none;
    }
  }
  .authItemAdvance { 
    list-style: none;
    display: flex;
    padding: 20px 0 40px;
    li {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      p {
        margin-top: 16px;
        .font-dpr(28px);
        color: @text-sub-color;
        &.authas {
          color: @text-main-color;
        }
      }
    }
  }
  .icon-main {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    &.statusIdentity {
      background-color: #e4edfe;
    }
    &.statusContacts {
      background-color: #eaffea;
    }
    &.statusBasic {
      background-color: #e9efff;
    }
    &.statusTelecomOperator {
      background-color: #fcf3da;
    }
    &.statusZhima {
      background-color: #e6f0ff;
    }
    &.statusTaobao {
      background-color: #fff0e4;
    }
    &.statusCertification {
      background-color: #e9efff;
    }
    .icon-logo {
      display: block;
      width: 42px;
      height: 42px;
    }
  }
}
</style>
