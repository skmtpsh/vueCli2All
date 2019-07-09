<template>
  <div class="page applyindex">
    <Scroll class="wrapper" ref="wrapper" style="bottom: 0">
    <section class="tishi" v-if="tishi">
        <div class="success">
          <p class="tishi-txt">{{confirmTitle}}</p>
          <!-- <p class="tishi-txt">借款订单审核中</p> -->
          <p class="tishi-desc">{{confirmMsg}}</p>
          <button class="confirm" @click="tishiSearch" v-if="toggleBtn">征信查询</button>
          <button class="confirm" @click="tishiConfirm" v-else>确定</button>
          <div class="close" @click="tishiConfirm">
            <img src="../asset/close.png">
          </div>
      </div>
      </section>
    <div>
    <div>
    <div class="mainpage" :style="{'bottom': !btnShow ? '0px' : ''}">
      <!-- <ProductList @handlequery='sonquerydata'/> -->
      <header class="header">
      <h2 style="font-weight:600;">{{ productName }}</h2>
      <h3>{{ productSubHead }}</h3>
    </header>
    <section class="price">
      <div class="price-l">
       <group>
      <x-input type="tel" v-model="borrowAmount" ref="input" step="100" @on-blur="handleBlur()" class="input" :show-clear="false" :disabled="isDisable" placeholder=""  mask="999999"  :max="9"/>
       </group>
        <span v-if="displayAmount" class="iconWrap" @click="setOpen"><img class="icon-img" src="../asset/edit.png"></span>
        <p class="price-desc">{{ borrowLimitInfo }}</p>
      </div>
      <div class="price-r">
        <div class="selectMore">
          <span class="peroidName" @click="test1()" >{{peroid}}</span>
          <div v-transfer-dom>
              <popup v-model="show1" position="bottom">
                <popup-header
                  left-text="取消"
                  title="选择期限"
                  :show-bottom-border="false"
                  @on-click-left="show1 = false"
                  @on-click-right="show1 = false">
                  </popup-header>
                <group>
                   <radio :options="peroids"  @on-change='onChange'>
                     <template slot-scope="props" slot="each-item">
                      <p :class="{'classActive': props.label === peroid}">{{props.label}}</p>
                 </template>
                   </radio>
                </group>
              </popup>
            </div>
        </div >
        <p class="price-desc qixian">{{ loanPeriodInfo }}</p>
      </div>
      <div class="fee">
      <flexbox>
      <flexbox-item>
        <div class="flex-demo">{{ arriveMoney }}</div>
        <p class="desc">到账金额</p>
        </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">{{ goodsMoney }}</div>
        <p class="desc">综合费用</p>
        </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">{{ loanRate }}</div>
        <p class="desc">借款费率</p>
        </flexbox-item>
    </flexbox>
    </div>
    <div class="detail" style="height:100px;line-height:100px;"><a @click="detailMore">查看产品详情&nbsp;<img class="jiantou" src="../asset/jiantou.png"></a></div>
    </section>
      <main class="content" id="contentIndex">
        <div class="authBaseTit">
          <h2>申请条件</h2>
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
              <h2 style="font-size:22px" class="authTit indexTitle" :class="filterToStatus(item) ? 'authas' : ''">{{item.verifyName}}</h2>
            </div>
            <div class="authBtn">
              <span class="authtxt" :class="filterToClass(item)">{{filterToText(item)}}</span>
              <svg-icon icon-class="arrow" v-if="!filterToStatus(item)" />
            </div>
          </li>
          <li v-for="(item, index) in authList.advancedAuth" :key="index+44" @click="handleClick(item, 'advance')">
            <div class="icon-cont">
              <div class="icon-main" :class="filterToStatus(item) ? item.verifyType : ''">
                <img v-if="filterToStatus(item)" :src="checkIconIs(item, 'hover')" class="icon-logo" />
                <img v-else :src="checkIconIs(item)" class="icon-logo" />
              </div>
            </div>
            <div>
              <h2 style="font-size:22px" class="authTit indexTitle" :class="filterToStatus(item) ? 'authas' : ''">{{item.verifyName}}</h2>
            </div>
            <div class="authBtn">
              <span class="authtxt" :class="filterToClass(item)">{{filterToText(item)}}</span>
              <svg-icon icon-class="arrow" v-if="!filterToStatus(item)" />
            </div>
          </li>
          <li>
            <div class="icon-cont">
              <div :class="bankcardstatus? 'icon-main-red' : 'icon-main' ">
                <img src="/static/statusBank.png" class="icon-logo" />
              </div>
            </div>
            <div>
              <h2 style="font-size:22px" class="authTit indexTitle">绑定银行卡</h2>
            </div>
            <div class="authBtn" v-if="certificate" @click="goConfirm()" style='width:auto;padding-right:22px'>
              <span class="authtxt">{{bankcardstatus ? bankcardstatus :'去绑卡'}}
              </span>
              <svg-icon icon-class="arrow" />
            </div>
            <div class="authBtn" v-else @click="goOpen()">
              <span class="authtxt"></span>
              <svg-icon icon-class="arrow"/>
            </div>
          </li>
          <li>
           <div v-transfer-dom class="xuanze">
              <popup v-model="show12" position="bottom">
                <popup-header
                  left-text="取消"
                  title="选择收款银行卡"
                  :show-bottom-border="false"
                  @on-click-left="show12 = false"
                  @on-click-right="show12 = false">
                  </popup-header>
                <group>
                   <radio :options="banklist"  @on-change='changebankcard'>
                     <template slot-scope="props" slot="each-item">
                     <img src='/static/yinlian.png' class='bank_pic'>
                    <p class='bank_name'>{{props.label}}</p>
                    <p class='bank_tip'>{{props.icon}}</p>
                 </template>
                   </radio>
                </group>
                <div style="padding: 15px;">
                  <x-button @click.native="openBank" plain type="primary">+ 添加银行卡 </x-button>
                </div>
              </popup>
            </div>
          </li>
        </ul>
      </main>
      <div class="zhanwei"></div>
    </div>
    </div>
    </div>
      <section class="payBtn">
        <x-button type="primary" class="payNow" @click.native="payNow">申请借款</x-button>
      </section>
    </Scroll>
  </div>
</template>
<script>
import Scroll from '@/components/scroll/index'
// import Scroll from '@/components/scroll/scroll'
import listApi from '@/api/list'
import indexApi from '@/api/index'
import { CheckIcon, XButton, PopupHeader, Popup, TransferDom, Group, XSwitch, Radio, dateFormat, Checker, CheckerItem, Cell, XInput, FlexboxItem, Flexbox, PopupPicker, XHeader, PopupRadio, Loading } from 'vux'
// import ProductList from '@/views/product/productList'
import myMixin from '@/views/mixin'
import md5 from 'js-md5'
// 10 未认证 ; 11 认证中 ; 12 已失效；20 已认证; 30 失败
// 新的 0 待认证； 1 认证成功；2认证中；3认证失败；4：初审驳回；5：复审驳回；6：失效
const STATUS_SUCESS = '1'
const STATUS_FAIL = '0'
const STATUS_DOING = '2'
const STATUS_UNABLE = '6'
const STATUS_CONFUSE = '3'
const STATUS_REFUSE = '4'
const STATUS_REVIEW = '5'
const STATUS_TYPE_IDENTIFY = 'statusIdentity' // 身份认证
export default {
  directives: {
    TransferDom
  },
  components: {
    Scroll,
    CheckIcon,
    XButton,
    PopupHeader,
    Popup,
    Group,
    XSwitch,
    Radio,
    Checker,
    CheckerItem,
    Cell,
    XInput,
    FlexboxItem,
    Flexbox,
    PopupPicker,
    XHeader,
    PopupRadio,
    Loading
  },
  mixins: [myMixin],
  data () {
    return {
      banktemp:'',
      top: 0,
      authList: {},
      outAble: false,
      confuseIs: false,
      btnShow: false,
      agree: true,
      protocolList: [],
      audit: [],
      tishi: false,
      terms: '',
      show1: false,
      certificate: true,
      show12: false,
      bankcardstatus:false, //申请条件——银行卡
      userBankId:'',
      borrowAmount:'',
      confirmMsg: '',
      banklist:[], // 银行卡raido渲染列表
      clicked: false,
      days: 0,
      agree: true,
      show13: false,
      title1: '',
      peroids: ['1', '2', '3'],
      peroid: '',
      tel: '5000',
      isDisable: false,
      displayAmount: true,
      productName: '',
      productSubHead: '',
      maxBorrowLimit: '',
      borrowLimitInfo: '',
      loanPeriodInfo: '',
      loanRate: '',
      // borrowAmount: this.$route.query.maxBorrowLimit,
      minDefaultCreditRating: '',
      goodsMoney: '',
      arriveMoney: '',
      terms: '',
      filterobj:{},
      termarr: [],
      show1: false,
      confirmTitle: '',
      confirmBtn: '确定',
      toggleBtn: false,
      views: false,
      btnObj: {
        text: '',
        status: '',
        outAble: false,
        money: 0
      }
    }
  },
  created () {
    var query = this.$route.query
    this.productName = query.productName
    this.productSubHead = query.productSubHead
    this.borrowAmount = Math.ceil(sessionStorage.getItem('borrowAmount')) ? Math.ceil(sessionStorage.getItem('borrowAmount')) : Math.ceil(query.maxBorrowLimit)
    this.borrowLimitInfo = query.borrowLimitInfo
    this.loanPeriodInfo = query.loanPeriodInfo
    this.loanRate = query.loanRate
    this.productCode = query.productCode
    this.productType = query.productType
    this.appOs = query.appOs
    this.userId = query.userId
    this.$vux.loading.show({
      text: '数据加载..'
    })
    indexApi.getIndex({
      type: this.$route.query.authType,
      token: this.$route.query.token,
      productType: this.$route.query.productType,
      platform: this.$route.query.platform,
      mobile: this.$route.query.mobile,
      appId: this.$route.query.appId,
    })
      .then((response) => {
        let res = response.data
        if (res.code === 200) {
          // this.$vux.loading.hide()
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
        this.$vux.toast.text(error, 'middle')
      })
    // 不等于3的时候显示按钮
    if (this.$route.query.productType && (this.$route.query.productType === '2' || this.$route.query.productType === '1' || this.$route.query.productType === '0')) {
      this.btnShow = true
    }
    // 获取列表接口数据
      listApi.productIndex({
      appName: this.$route.query.productName,
      userId: this.$route.query.userId,
      productCode: this.$route.query.productCode,
      appOs: this.$route.query.appOs
    })
      .then((response) => {
        if (response.data.code === 200) {
        this.$vux.loading.hide()
        let res = response.data.datas
        this.minDefaultCreditRating = res.minDefaultCreditRating
        this.maxUsableCreditRating = res.maxUsableCreditRating
        let termLineList = res.termLineList
        this.termarr = res.termLineList
        this.audit = res.audit
        if (res.userBankList.length > 0) {
            res.userBankList.forEach(item => {
              let tempobj = {}
              tempobj.value = item.bankCardNickName
              tempobj.key = item.userBankId
              tempobj.icon = item.tip
              this.banklist.push(tempobj)
            })
             this.bankcardstatus = this.banklist[0].value
             this.userBankId = this.banklist[0].key
             this.$route.query.userBankId =  this.banklist[0].key
             this.$route.query.bankCardNickName = this.banklist[0].value
          }
          // 获取认证项接口
          this.authList.baseAuth.forEach(item => {
            switch (item.verifyType) {
              case 'statusBasic':
                item.verifyStatus = this.audit.statusBasic
                break
              case 'statusCertification':
                item.verifyStatus = this.audit.statusCertification
                break
              case 'statusContacts':
                item.verifyStatus = this.audit.statusContacts
                break
              case 'statusTelecomOperator':
                item.verifyStatus = this.audit.statusTelecomOperator
                break
              case 'statusIdentity':
                item.verifyStatus = this.audit.statusIdentity
                item.verifyStatusLive = this.audit.statusLiveness
                break
              case 'statusInsure':
                item.verifyStatus = this.audit.statusInsure
                break
              case 'statusBasicOther':
                item.verifyStatus = this.audit.statusBasicOther
                break
              case 'statusChsi':
                item.verifyStatus = this.audit.statusChsi
                break
              case 'statusZhima':
                item.verifyStatus = this.audit.statusZhima
                break
              case 'statusTaobao':
                item.verifyStatus = this.audit.statusTaobao
                break
            }
          })
          this.authList.advancedAuth.forEach(item => {
            switch (item.verifyType) {
              case 'statusInsure':
                item.verifyStatus = this.audit.statusInsure
                break
              case 'statusBasicOther':
                item.verifyStatus = this.audit.statusBasicOther
                break
              case 'statusChsi':
                item.verifyStatus = this.audit.statusChsi
                break
              case 'statusZhima':
                item.verifyStatus = this.audit.statusZhima
                break
              case 'statusIdentity':
                item.verifyStatus = this.audit.statusIdentity
                item.verifyStatusLive = this.audit.statusLiveness
                break
              case 'statusTaobao':
                item.verifyStatus = this.audit.statusTaobao
                break
              case 'statusBasic':
                item.verifyStatus = this.audit.statusBasic
                break
              case 'statusCertification':
                item.verifyStatus = this.audit.statusCertification
                break
              case 'statusContacts':
                item.verifyStatus = this.audit.statusContacts
                break
              case 'statusTelecomOperator':
                item.verifyStatus = this.audit.statusTelecomOperator
                break
            }
          })
          this.minDefaultCreditRating = res.minDefaultCreditRating
          this.maxUsableCreditRating = res.maxUsableCreditRating
          this.amount = res.maxUsableCreditRating
          this.protocolList = res.protocolList
          sessionStorage.setItem('protocolList',JSON.stringify(res.protocolList))
        let test = []
        let terms = []
        termLineList.forEach((item) => {
          this.filterobj[item.days] = item.terms
          test.push((item.days).toString())
          terms.push(item.terms)
        })
        this.peroids = test
        this.peroid = sessionStorage.getItem('peroid') ? sessionStorage.getItem('peroid') : Math.max(...test)
        this.terms =sessionStorage.getItem('terms') ? sessionStorage.getItem('terms') : this.filterobj[this.peroid]
        this.emitmethods()
        // 调用综合费用接口
        listApi.listFee({
          appName: this.$route.query.productName,
          productCode: this.$route.query.productCode,
          userId: this.$route.query.userId,
          borrowAmount: this.borrowAmount,
          loanType: this.$route.query.productType,
          days: this.peroid,
          terms: this.terms
        })
          .then((response) => {
            let result = response.data.datas
            this.goodsMoney = result.goodsMoney
            this.arriveMoney = this.borrowAmount - this.goodsMoney
          })
          .catch((error) => {
            this.$vux.loading.hide()
          })
        } else {
          this.$vux.toast.text(response.data.message, 'middle')
        }
      })
      .catch((error) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(error.message, 'middle')
      })
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
      if (this.outAble) {
        try {
          // if (this.$route.query.platform === 'ios') {
          window.webkit.messageHandlers.submitCertifications.postMessage('')
          // } else {
          //   window.javaObj.closeSDK()
          // }
        } catch (error) {
          window.javaObj.submitCertifications()
        }
      } else {
        this.$vux.toast.text('请完成基础认证', 'middle')
        return false
      }
    },
    handleClick (item, itemType, type = 'base') {
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
      const authType = this.$route.query.authType
      // 基础项点击去认证后跳转到sdk的集合页
      try {
      if (this.$route.query.platform === 'ios') {
        // window.location.href = 'http://www.baidu.com'
        window.webkit.messageHandlers.goSDK.postMessage(authType)
        } else {
          window.loanmarket.openYishieldSDK(authType)
        }
      } catch (error) {
        console.log(error)
      }
      /**
       * 1. 前一项是否认证
       * 2. 基础认证是否通过
       * 3. 认证提示信息
       * 4. 如果其中有一项为失败,其他项都不能点击
      */
      // 如果其中有一项为失败,其他项都不能点击
      // let confusePass = this.authList.baseAuth.some((list) => {
      //   let confuse = false
      //   if (list.verifyType === STATUS_TYPE_IDENTIFY) {
      //     if (list.verifyStatusLive === STATUS_CONFUSE || list.verifyStatus === STATUS_CONFUSE) {
      //       confuse = true
      //     }
      //   } else {
      //     if (list.verifyStatus === STATUS_CONFUSE) {
      //       confuse = true
      //     }
      //   }
      //   return confuse
      // })
      // if (confusePass) {
      //   this.$vux.toast.text('您的综合信用评分不足，请过一段时间后再申请', 'middle')
      //   return false
      // }
      // 高级认证须基础认证先认证
      if (type === 'advance') {
        // 判断是否认证
      let strSuccessTip = '此项已认证'
        if (item.verifyStatus === STATUS_SUCESS) {
          this.$vux.toast.text(strSuccessTip, 'middle')
          return false
        }
        const authType = this.$route.query.authType
        // 基础项点击去认证后跳转到sdk的集合页
        try {
        if (this.$route.query.platform === 'ios') {
          window.webkit.messageHandlers.openYishieldSDK.postMessage(authType)
          } else {
            window.loanmarket.openYishieldSDK(authType)
          }
        } catch (error) {
          console.log(error)
        }
        // let pass = this.authList.baseAuth.every((item) => {
        //   let boolPass = false
        //   if (item.verifyType === STATUS_TYPE_IDENTIFY) {
        //     if (item.verifyStatusLive === STATUS_SUCESS && item.verifyStatus === STATUS_SUCESS) {
        //       boolPass = true
        //     }
        //   } else {
        //     if (item.verifyStatus === STATUS_SUCESS) {
        //       boolPass = true
        //     }
        //   }
        //   return boolPass
        // })
        // if (!pass) {
        //   this.$vux.toast.text('请先认证基础项', 'middle')
        //   return false
        // }
      }
      // 第一项是否认证
      if (type === 'base') {
        if (this.noStatusArr && this.noStatusArr.length > 0) {
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
      // this.gotoURL(item.verifyType, item.verifyStatusLive, item.verifyStatus)
    },
    filterToText (item) {
      if (item.verifyType === STATUS_TYPE_IDENTIFY) { // 如果是身份认证判断活体和身份证
        if (item.verifyStatusLive === STATUS_SUCESS && item.verifyStatus === STATUS_SUCESS) {
          return '已认证'
        } if (item.verifyStatusLive === STATUS_UNABLE && item.verifyStatus === STATUS_SUCESS) {
          return '去认证'
        } if (item.verifyStatusLive === STATUS_CONFUSE || item.verifyStatus === STATUS_CONFUSE) {
          return '去认证'
        } else {
          return '去认证'
        }
      }
      if (item.verifyStatus === STATUS_SUCESS) {
        return '已认证'
      } else if (item.verifyStatus === STATUS_FAIL || item.verifyStatus === STATUS_REFUSE || item.verifyStatus === STATUS_REVIEW) {
        return '去认证'
      } else if (item.verifyStatus === STATUS_UNABLE) {
        return '去认证'
      } else if (item.verifyStatus === STATUS_DOING) {
        return '去认证'
      } else if (item.verifyStatus === STATUS_CONFUSE) {
        return '去认证'
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
    },
    payNow () {
      let clickpass = true
      let array = this.authList.baseAuth
      array.forEach((item) => {
        if (item.verifyStatus === '0' || item.verifyStatus === '4') {
          this.$vux.toast.text('请先完成认证及绑卡操作', 'middle')
          clickpass = false
          // return false
        }
      })
      let array1 = this.authList.advancedAuth
      array1.forEach((item) => {
        if (item.verifyStatus === '0' || item.verifyStatus === '4') {
          this.$vux.toast.text('请先完成认证及绑卡操作', 'middle')
          clickpass = false
          return false
        }
      })
      if (this.bankcardstatus === false) {
        this.$vux.toast.text('请先完成绑卡操作', 'middle')
        clickpass = false
        return false
      }
      if (clickpass === true) {
    listApi.applyBuy({
      appName: this.$route.query.productName,
      productCode: this.$route.query.productCode,
      userId: this.$route.query.userId,
      loanType: this.$route.query.productType,
    })
      .then((response) => {
        let result = response.data.datas[this.$route.query.productType]
        if (result.quotaState !== '1') {
          if (result.quotaState === '2') {
            this.toggleBtn = false
            this.confirmTitle = '借款订单审核中'
            this.confirmMsg = result.msg
            this.tishi = true
            return false
          } else if (result.quotaState === '3') {
            this.confirmTitle = '借款订单未通过'
            this.toggleBtn = true
            this.confirmMsg = result.msg
            this.tishi = true
            return false
          } else if (result.quotaState === '4') {
            this.confirmTitle = '有在途订单'
            this.confirmMsg = '当前有未结清订单或额度不足，请及时还款并保持良好信用'
            this.tishi = true
            return false
          } else {
            this.confirmTitle = '借款订单审核中'
            this.confirmMsg = result.msg
            this.tishi = true
            return false
          }
        } else {
          if (result.quota < 800) {
            this.confirmTitle = '借款订单未通过'
            this.confirmMsg = '当前有未结清订单或额度不足，请及时还款并保持良好信用'
            this.tishi = true
            return false
          } else {
          this.creditAmount = result.quota
          this.$route.query.borrowAmount = this.borrowAmount
          this.$router.push({path: '/authentication/product/productUage',query:this.$route.query})
          sessionStorage.setItem('creditAmount', this.creditAmount)
          }
        }
      })
      .catch((error) => {
        // this.$vux.loading.hide()
        this.$vux.toast.text(error, 'middle')
      })
      }
    },
    // 关闭提示弹框
    tishiConfirm () {
      this.tishi = false
    },
    tishiSearch () {
      window.location.href = '/authentication/credit/check?loginPhone=' + this.$route.query.mobile + '&userId=' + this.$route.query.userId + '&token=' + this.$route.query.token
      // this.$router.push({path: '/authentication/credit/check',
      //   query: Object.assign({}, {phone: this.$route.query.mobile, loginPhone: this.$route.query.mobile, userId: this.$route.query.userId, token: this.$route.query.token, time: Math.random()})})
    },
    detailOrder () {
    },
    // 银行卡认证调用app接口
    goConfirm () { // 未绑卡直接跳转到绑卡部分
    let clickpass = true
    let array = this.authList.baseAuth
    array.forEach((item) => {
      if (item.verifyType === 'statusIdentity' && item.verifyStatus === '0') {
        this.$vux.toast.text('请先进行身份认证', 'middle')
        clickpass = false
      }
    })
    let productCode = this.$route.query.productCode
    let productName = this.$route.query.productName
    if (clickpass === true) {
      if (this.bankcardstatus === false) {
        try {
          if (this.$route.query.platform === 'ios') {
            window.webkit.messageHandlers.goBank.postMessage('')
          } else {
            window.loanmarket.goBank(productCode, productName)
          }
        } catch (error) {
          console.log(error)
        }
      } else { // 有银行卡信息打开poopup
      this.show12 = true
      }
    }
    },
    goOpen () {
    },
    // 刷新页面方法
    reload(){
      window.reload()
    },
    changebankcard(userBankId,bankCardNickName){
      this.userBankId = userBankId
      this.bankcardstatus = bankCardNickName
      this.$route.query.userBankId = userBankId
      this.$route.query.bankCardNickName = bankCardNickName
      this.show12 = false
    },
    openBank () {
      let productCode = this.$route.query.productCode
      let productName = this.$route.query.productName
      try {
          if (this.$route.query.platform === 'ios') {
            window.webkit.messageHandlers.goBank.postMessage('')
          } else {
            window.loanmarket.goBank(productCode, productName)
          }
        } catch (error) {
          console.log(error)
        }
    },
    sonquerydata (val) {
      this.$route.query.days = val.days
      this.$route.query.termLine = val.termLine
      this.$route.query.terms = val.terms
    },
    onChange (val, key) {
      sessionStorage.setItem('peroid', val)
      sessionStorage.setItem('terms', this.filterobj[val])
      this.peroid = sessionStorage.getItem('peroid')
      this.terms = sessionStorage.getItem('terms')
      // this.peroid = val
      this.emitmethods()
      listApi.listFee({
      appName: this.$route.query.productName,
      productCode: this.$route.query.productCode,
      userId: this.$route.query.userId,
      borrowAmount: this.borrowAmount,
      loanType: this.$route.query.productType,
      days: this.peroid,
      terms: this.filterobj[val]
    })
      .then((response) => {
        let result = response.data.datas
        this.goodsMoney = result.goodsMoney
        this.arriveMoney = this.borrowAmount - this.goodsMoney
      })
      .catch((error) => {
        // this.$vux.loading.hide()
        this.$vux.toast.text(error, 'middle')
      })
      this.show1 = false
    },
    onShow () {
    },
    onHide (type) {
      console.log(type)
    },
    setOpen () {
      this.displayAmount = false
      this.$refs.input.focus()
    },
    handleBlur () {
      this.displayAmount = true
      var inputValue = this.$refs.input.value
      this.borrowAmount = inputValue
      this.borrowAmount = Math.ceil(inputValue/100)*100
      if (this.borrowAmount < this.$route.query.minBorrowLimit) {
        this.borrowAmount = this.$route.query.minBorrowLimit
        sessionStorage.setItem('borrowAmount', this.borrowAmount)
      } else if (this.borrowAmount > this.$route.query.maxBorrowLimit) {
        this.borrowAmount = Math.ceil(this.$route.query.maxBorrowLimit)
        sessionStorage.setItem('borrowAmount', this.borrowAmount)
      } else {
        var inputValue = this.$refs.input.value
        this.borrowAmount = Math.ceil(inputValue/100)*100
        sessionStorage.setItem('borrowAmount', this.borrowAmount)
      }
      if (this.borrowAmount > this.$route.query.maxBorrowLimit || this.borrowAmount < this.$route.query.minBorrowLimit) {
        this.$vux.toast.text('该产品申请额度为'+this.borrowLimitInfo, 'middle')
      }
      // var inputValue = this.$refs.input.value
      // this.borrowAmount = Math.ceil(inputValue/100)*100
      sessionStorage.setItem('borrowAmount', this.borrowAmount)
      this.emitmethods()
      listApi.listFee({
      appName: this.$route.query.productName,
      productCode: this.$route.query.productCode,
      userId: this.$route.query.userId,
      borrowAmount: this.borrowAmount,
      loanType: this.$route.query.productType,
      days: this.peroid,
      terms: this.filterobj[this.peroid]
    })
      .then((response) => {
        let result = response.data.datas
        this.goodsMoney = result.goodsMoney
        this.arriveMoney = this.borrowAmount - this.goodsMoney
      })
      .catch((error) => {
        this.$vux.loading.hide()
      })
    },
    emitmethods () {
      let termobj = {}
      window.borrowAmount = this.borrowAmount
      this.termarr.forEach(item => {
        if (this.peroid === item.days || this.peroid === item.days+'') {
          this.$route.query.days = item.days
           this.$route.query.termLine = item.termLine
           this.$route.query.terms = item.terms
        }
      })
    },
    detailMore () {
      this.$router.push({path: '/authentication/product/productDetail',
        query: this.$route.query})
    },
    changeperoid () {
      this.show1 = false
    },
    test1 () {
      this.show1 = true
    }
  },
  beforeCreate () {
    document.getElementsByTagName('body')[0].className = 'main'
  },
  mounted() {
    window.reload = this.reload
  }
}
</script>
<style lang="less">
@import url('../style/theme.less');
@import url('../style/variable.less');
.applyindex {
  -webkit-overflow-scrolling:touch;
}
.page {
   .header {
  padding: 30px;
  background: #5d97f5;
  height: 521px;
  margin-top: -2px;
  h2 {
    font-size: 50px;
    margin: 30px 0 0;
    color: #ffffff;
  }
  h3 {
    margin: 30px 0 0;
    font-size: 26px;
    color: #ffffff;
  }
}
}
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
  // margin-bottom: 180px;
  padding: 20px 20px 0;
  background-color: #fff;
  .authBaseTit {
    padding: 20px;
    h2 {
      .font-dpr(36px);
      font-size: 42px;
      font-weight: bold;
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
      margin-top: 30px;
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
        font-size: 32px!important;
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
        width: 125px;
        justify-content: flex-start;
        .authtxt {
          white-space: nowrap;
          // font-size: 28px;
          .font-dpr(28px);
          color: #397be6;
          // color: @text-sub-color;
          position: relative;
          &.red {
            color: @danger-color;
          }
          &.green {
            color: @success-color;
            left: 50px;
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
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background-color: #9ca4b6;
    display: flex;
    justify-content: center;
    align-items: center;
    &.statusIdentity {
      background-color: #ff4e4a;
    }
    &.statusContacts {
      background-color: #ff4e4a;
    }
    &.statusBasic {
      background-color: #ff4e4a;
    }
    &.statusTelecomOperator {
      background-color: #ff4e4a;
    }
    &.statusZhima {
      background-color: #ff4e4a;
    }
    &.statusTaobao {
      background-color: #ff4e4a;
    }
    &.statusCertification {
      background-color: #ff4e4a;
    }
    &.statusBank {
      background-color: #ff4e4a;
    }
    .icon-logo {
      display: block;
      // width: 22px;
      height: 22px;
    }
  }
  .icon-main-red{
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background-color: #ff4e4a;
    display: flex;
    justify-content: center;
    align-items: center;
     .icon-logo {
      display: block;
      // width: 22px;
      height: 22px;
    }
  }
}
#contentIndex {
  margin-top: -300px;
  margin-left: 38px;
  margin-right: 38px;
  border-radius: 8px;
  // margin-bottom: 127px;
}
.vux-check-icon {
  height: 100px;
  float: left;
  margin-right: 17px;
}
.proto {
  margin-left: 30px;
  margin-right: 30px;
  height: 200px;
}
.proto span {
  color: #9ca4b6;
  line-height: 50px;
  display: block;
}
.proto span > a {
  color: #397be6;
}
.proto ul {
  float: right;
}
.proto ul li {
  float: left;
  display: inline-block;
}
.proto ul li a {
  color: #397be6;
}
.weui-icon-success,.weui-icon-circle {
  font-size: 30px!important;
  margin-top: 11px;
}
.payBtn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 96px;
  background: #3278fb;
  text-align: center;
  color: #ffffff;
  line-height: 96px;
  font-size: 32px;
}
.indexTitle {
  font-size: 32px!important;
}
.authItem {
  padding-bottom: 50px;
}
.tishi {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.6);
  z-index: 999;
}
.tishi-txt {
  color: #333;
  font-size: 38px;
  text-align: center;
  top: 50%;
  position: relative;
  font-weight: bold;
  line-height: 0.6rem;
  width: 36%;
  margin: 0 auto;
  text-align: center;
}
.success {
  background: url('../asset/tishi-fail.png');
  background-repeat: no-repeat;
  height: 100%;
  position: relative;
  transform: translate(-50%);
  left: 50%;
  background-position: center;
  background-size: 76%;
}
.confirm {
  background: #397be6;
  background-size: 100%;
  top: 68%;
  position: absolute;
  width: 60%;
  height: 80px;
  border: none;
  color: #ffffff;
  border-radius: 5px;
  margin: 0 auto;
  display: block;
  left: 20%;
  font-size: 32px;
  border-radius: 80px;
}
.bank_pic{
  // width:70px;
  height:90px;
  float:left;
  margin-right:40px;
}
.bank_name{
  font-size:30px;
  line-height:30px;
  color:#333;
  text-align: left!important;
}
.bank_tip{
  font-size:26px;
  line-height:26px;
  padding-top:30px;
  color:#979eac;
  text-align: left!important;
}
.close {
  position: relative;
  top: 75%;
  left: 45%;
  transform: translate(0 -50%)
}
.close > img {
  width: 72px;
  height: 72px;
  display: inline-block;
}
</style>
<style lang="less" scoped>
  .popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}
.popup2 {
  padding-bottom:15px;
  height:400px;
}
.position-vertical-demo {
  background-color: #ffe26d;
  color: #000;
  text-align: center;
  padding: 15px;
}
.position-horizontal-demo {
  position: relative;
  height: 100%;
  .vux-close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(4);
    color: #000;
  }
}
.zhanwei {
  height: 300px;
}
// 头部样式
.page {
  .btnbox {
    padding: 30px;
    &>div {
      margin-top: 30px;
      margin-bottom: 90px;
    }
  }
  .linkpro {
    font-size: 39px;
    color: #397be6;
  }
  .vux-header {
    height: 90px;
  }
  .price {
    height: 542px;
    top: -280px;
    background: #ffffff;
    position: relative;
    // width: 95%;
    margin-left: 30px;
    margin-right: 30px;
    border-radius: 8px;
    // box-shadow: 3px 3px 3px #ecf0f6;
    margin-bottom: 40px;
    // padding: 0 60px;
  }
  .price-l,.price-r {
    width: 50%;
    float: left;
    padding-top: 40px;
    padding-left: 40px;
    height: 270px;
  }
  .input {
    font-size: 65px;
    font-weight: 600;
    max-width: 220px;
    display: inline-block;
    height: 120px;
    overflow: hidden;
  }
  .icon-img {
    width: 30px;
    height: 30px;
    display: inline-block;
    margin-left: 10px;
  }
  .price-desc {
    font-size: 26px;
    color: #959FB5;
    margin-bottom: 79px;
    clear: both;
  }
  .iconWrap {
    display: inline-block;
    top: 30px;
    position: relative;
    // margin-left: 30px;
  }
  .flex-demo {
    text-align: center;
    color: #333333;
    font-size: 40px;
    border-radius: 4px;
    background-clip: padding-box;
    font-weight: 500;
    margin-bottom: 15px;
  }
  .desc {
    text-align: center;
    color: #959FB5;
    font-size: 26px;
  }
  .price .vux-flexbox {
    padding-bottom: 50px;
  }
  .detail > a {
    display: block;
    font-size: 26px;
    color: #959fb5;
    text-align: center;
    height: 100px;
    line-height: 100px;
    border-top: 1px solid #dddddd;
    width: 92%;
    margin: 0 auto;
  }
  .apply {
    top: -280px;
    background: #ffffff;
    position: relative;
    width: 95%;
    margin-left: 40px;
  }
  .apply h3 {
    font-size: 63px;
    color: #333333;
    font-weight: 600;
    padding-top: 30px;
    padding-left: 40px;
    padding-bottom: 25px;
  }
  .proto {
    top: -280px;
    position: relative;
    color: #9ca4b6;
    font-size: 39px;
    margin-top: 50px;
    width: 95%;
    margin-left: 40px;
    line-height: 75px;
  }
  .payNow {
    border-radius: 0!important;
    position: fixed;
    bottom: 0;
  }
  .header {
  padding: 30px;
  background: #5d97f5;
  height: 521px;
  margin-top: -2px;
  h2 {
    font-size: 50px;
    margin: 30px 0 0;
    color: #ffffff;
  }
  h3 {
    margin: 30px 0 0;
    font-size: 26px;
    color: #ffffff;
  }
}
  .content {
    background: #fff;
  }
  .vux-check-icon {
    height: 100px;
    float: left;
    margin-right: 27px;
  }
  .selectMore {
    width: 200px;
    height: 85px;
    float: left;
    background: url('../asset/icon-down.png');
    background-repeat: no-repeat;
    background-position: right 25px;
    margin-right: 95px;
    background-size: 70%;
    margin-top: 10px;
  }
  .vux-popup-picker-value {
    font-size: 105px!important;
  }
  .iconDown {
    top: 60px;
    position: relative;
  }
  .qixian {
    margin-top: 124px!important;
    position: relative;
  }
  .vux-header {
    max-height: 999999px;
    background-color: #5d97f5 !important;
    padding: 20px 0 45px !important;
  }
  .page .vux-header .vux-header-left .left-arrow:before {
    border: 5px solid #ffffff !important;
    border-width: 5px 0 0 5px !important;
    width: 0.3rem!important;
    height: 0.3rem!important;
    top: 0.958333rem!important;
    left: 0.25rem!important;
  }
  .amountText {
    padding-top: 10px;
  }
}
.vux-check-icon > span {
    color: #9ca4b6;
  }
  .jiantou {
    width: 15px;
    top: 4px;
    position: relative;
    // height: 30px;
  }
</style>
<style>
.price-l .vux-no-group-title {
  width: 72%;
  float: left;
}
.detail {
  height: 100px;
  line-height: 100px;
}
.peroid-cancel {
  position: fixed;
  left: 30px;
}
.weui-cell__bd p {
  text-align: center;
}
.weui-cells_radio .weui-cell__ft {
  position: fixed;
  right: 37%;
}
.classActive {
  color: #397be6;
  font-weight: bold;
}
.applyindex .weui-cells_radio .weui-check:checked + .weui-icon-checked:before {
  display: none;
}
.peroidValue {
  width: 100px;
  height: 40px;
  font-size: 30px;
}
.peroidName {
  width: 180px;
  height: 1.41176471em;
  font-size: 54px;
  border: none;
  outline: none;
  font-weight: bold;
  line-height: 1.41176471em;
  display: inline-block;
}
.tishi-desc {
  top: 52%;
  position: relative;
  width: 56%;
  margin: 0 auto;
  font-size: 30px;
  line-height: 50px;
}
</style>


