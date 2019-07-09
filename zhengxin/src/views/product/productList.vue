<template>
  <div class="page">
    <header class="header">
      <h2 style="font-weight:600;">{{ productName }}</h2>
      <h3>{{ productSubHead }}</h3>
    </header>
    <section class="price">
      <div class="price-l">
       <group>
      <x-input type="tel" v-model="borrowAmount" ref="input" step="100" @on-blur="handleBlur()" class="input" :show-clear="false" :disabled="isDisable" placeholder=""  mask="999999"  :max="9"/>
       </group> 
        <span v-if="displayAmount" class="iconWrap" @click="setOpen"><img class="icon-img" src="../../asset/edit.png"></span>
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
    <div class="detail" style="height:100px;line-height:100px;"><a @click="detailMore">查看产品详情&nbsp;<img class="jiantou" src="../../asset/jiantou.png"></a></div>
    </section>
  </div>
</template>
<script>
import listApi from '@/api/list'
import myMixin from '@/views/mixin'
import md5 from 'js-md5'
import { Checker, CheckerItem, Cell, Group, CheckIcon, Flexbox, FlexboxItem, PopupPicker, XInput, XHeader, XButton, dateFormat, PopupRadio, PopupHeader, Popup, Radio, TransferDom, XSwitch } from 'vux'
export default {
  directives: {
    TransferDom
  },
  mixins: [myMixin],
  components: {
    CheckIcon,
    Checker,
    CheckerItem,
    Group,
    Cell,
    XInput,
    FlexboxItem,
    Flexbox,
    PopupPicker,
    XHeader,
    XButton,
    PopupRadio,
    Popup,
    PopupHeader,
    Radio,
    XSwitch
  },
  data () {
    return {
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
      borrowAmount: this.$route.query.maxBorrowLimit,
      minDefaultCreditRating: '',
      goodsMoney: '',
      arriveMoney: '',
      terms: '',
      filterobj:{},
      termarr: [],
      show1: false
    }
  },
  created () {
    var query = this.$route.query
    this.productName = query.productName
    this.productSubHead = query.productSubHead
    this.borrowAmount = query.maxBorrowLimit
    this.borrowLimitInfo = query.borrowLimitInfo
    this.loanPeriodInfo = query.loanPeriodInfo
    this.loanRate = query.loanRate
    this.productCode = query.productCode
    this.productType = query.productType
    this.appOs = query.appOs
    this.userId = query.userId
    // 获取列表接口数据
      listApi.productIndex({
      appName: this.$route.query.productName,
      userId: this.$route.query.userId,
      productCode: this.$route.query.productCode
    })
      .then((response) => {
        this.$vux.loading.hide()
        let res = response.data.datas
        this.minDefaultCreditRating = res.minDefaultCreditRating
        this.maxUsableCreditRating = res.maxUsableCreditRating
        let termLineList = res.termLineList
        this.termarr = res.termLineList
        let test = []
        let terms = []
        termLineList.forEach((item) => {
          this.filterobj[item.days] = item.terms
          test.push((item.days).toString())
          terms.push(item.terms)
        })
        this.peroids = test
        // this.peroid = sessionStorage.getItem('peroid') !== null && sessionStorage.getItem('peroid') !== undefined ? sessionStorage.getItem('peroid') : Math.max(...test)
        // this.terms = sessionStorage.getItem('terms') !== null && sessionStorage.getItem('terms') !== undefined ? sessionStorage.getItem('terms') : this.filterobj[this.peroid]
        this.peroid = Math.max(...test)
        sessionStorage.setItem('peroid1', Math.max(...test))
        this.terms = this.filterobj[this.peroid]
        sessionStorage.setItem('terms1', this.filterobj[this.peroid])
        this.emitmethods()
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
      })
      .catch((error) => {
        this.$vux.loading.hide()
      })
     // 获取综合费用接口
  },
  mounted () {
  },
  methods: {
    onChange (val, key) {
      sessionStorage.setItem('peroid', val)
      sessionStorage.setItem('terms', this.filterobj[val])
      this.peroid = val
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
        this.$vux.loading.hide()
        this.$vux.toast.text(error, 'middle')
      })
      this.show1 = false
    },
    onShow () {
    },
    onHide (type) {
      console.log(type)
    },
    payNow () {
      this.$router.push({path: '/item'})
    },
    setOpen () {
      this.displayAmount = false
      this.$refs.input.focus()
    },
    handleBlur () {
      this.displayAmount = true
      var inputValue = this.$refs.input.value
      this.borrowAmount = Math.ceil(inputValue/100)*100
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
          termobj.days = item.days 
          termobj.termLine = item.termLine
          termobj.terms = item.terms
          this.$emit('handlequery',termobj)
        }
      })
    },
    detailMore () {
      let AppKey = 'c808f285fb68b7e33e997d089da2885d'
      let TimeStamp = dateFormat(new Date(), 'YYYYMMDDHHmmss')
      this.$router.push({path: '/authentication/product/productDetail',
        query: this.$route.query})
    },
    changeperoid () {
      this.show1 = false
    },
    test1 () {
      this.show1 = true
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variable.less';
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
    width: 220px;
    display: inline-block;
    height: 120px;
    // border: 1px solid #f8f8f8;
    overflow: hidden;
  }
  .icon-img {
    width: 30px;
    height: 30px;
    display: inline-block;
    // margin-left: 10px;
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
    margin-left: 30px;
    // top: -36px;
    // position: relative;
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
    background: url('../../asset/icon-down.png');
    background-repeat: no-repeat;
    background-position: right 30px;
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
</style>
