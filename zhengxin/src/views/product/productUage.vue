<template>
<div style="position:relative" class='borrowdetail'>
  <section class="tishi" v-if="tishi" @click='tishiConfirm'>
        <div class="success">
          <p class="tishi-txt"></p>
          <button class="confirm" @click.stop="detailOrder">查看订单</button>
          <div class="close"  @click.stop="detailOrder">
            <img src="../../asset/close.png">
          </div>
      </div>
      </section>
  <div class="card">
    <div class="amount">
      <p class='amount_title'>当前授信额度(元)</p>
      <p class='amount_number'>{{borrowAmount}}</p>
    </div>
    <div class='borrowmain'>
    <div v-for='(item, index) in staticdata' :key="index" class='static'>
      <p class='static_left'>{{item.title}}</p>
      <p class='static_right'>{{item.detail}}</p>
    </div>
    <div class='borrowrequest' >
    <div class='request_top'>借款信用要求</div>
    <div class='request_bottom' @click='gotoplus'>
      <check-icon :value.sync="requestagree" class='request_bottom_left'></check-icon>
      获取机构信用券
      <span class='request_bottom_right'>{{ruquestdata.amount}}</span>
    </div>
    </div>
    <div class='borrowpolicy'>
      <check-icon :value.sync="policyagree"></check-icon>
      <div class='checkion_right_txt'>
      我已阅读并同意
     <template v-if='apptype === "yqb"'> <span v-for='(val, key) in yqbprotocolList' :key='key+"yqb"' @click='pathto(val.url)'>{{val.name}}</span></template>
     <template v-else> <span v-for='(val, key) in blprotocolList' :key='key+"bl"' @click='pathto(val.url)' >{{val.name}}</span></template>
      <p class='seconed_line'> 并对此承担法律责任</p>
      </div>
    </div>
    </div>
    <div class='btn_blue' @click='submit'>确认借款</div>
  </div>
</div>
</template>
<script>
import listApi from '@/api/list'
import myMixin from '@/views/mixin'
import { CheckIcon } from 'vux'
export default {
  mixins: [myMixin],
  components: {
    CheckIcon 
  },
  data () {
    return {
      requestagree:false,
      policyagree:true,
      borrowAmount: 8000 ,
      termLine:  this.$route.query.termLine,
      userBankId:this.$route.query.userBankId,
      goodsName:'',
      purpose: '',
      contractNum:'',
      loanType:this.$route.query.productType,
      staticdata:[{
        title:'借款期限',detail:this.$route.query.termLine,
        },{
        title:'到期应还',detail:0,
        },{
        title:'收款银行卡',detail:this.$route.query.bankCardNickName
        }],
      ruquestdata:{href:``,amount:0},
      tishi:false,
      goodsMoney: 0,
      requestcont: 0,
      yqbprotocolList: [
        {name: '《借款协议》', url: 'http://web.bl.9iyizu.com/proto/borrow_yqb'},
        {name: '《增值服务协议》', url: 'http://web.bl.9iyizu.com/proto/increase_yqb'},
        {name: '《用户注册与隐私保护协议》', url: 'http://web.bl.9iyizu.com/proto/register_secret_yqb'},
      ],
      blprotocolList: [
        {name: '《增值服务协议》', url: 'http://web.bl.9iyizu.com/proto/increase_bl'},
        {name: '《借款协议》', url: 'http://web.bl.9iyizu.com/proto/borrow_bl'},
        {name: '《用户注册与隐私保护协议》', url: 'http://web.bl.9iyizu.com/proto/register_secret_bl'},        
      ]
    }
  },
  computed : {
    apptype () {
    if( this.$route.query.productName === '佰联钱包') {
    return   'bl'
    } else {
    return  'yqb'
    }  
    }
  },
  mounted () {
    this.borrowAmount = sessionStorage.getItem('creditAmount')
    listApi.listFee({
      appName: this.$route.query.productName,
      productCode: this.$route.query.productCode,
      userId: this.$route.query.userId,
      borrowAmount: this.borrowAmount,
      loanType: this.$route.query.productType,
      days: this.$route.query.days,
      terms: this.$route.query.terms,
    }).then(res => {
      if( res.data.code === 200 ) { 
      this.staticdata[1].detail = Number(this.borrowAmount) + Number(res.data.datas.interest)
      this.ruquestdata.amount = res.data.datas.goodsMoney
      this.ruquestdata.href= `http://39.105.170.100:18888/merge?mergeMoney=${res.data.datas.goodsMoney}&h5=1`
      } else {
        console.log(res.data.message)
      }
      })
      .catch((error) => {
        this.$vux.loading.hide()
        // this.$vux.toast.text(error, 'middle')
      })
      if (sessionStorage.getItem('count')>0) {
        this.requestagree = true
      }
  },
  methods: {
    submit () {
      if(this.requestagree === false ){
        this.$vux.toast.text('请先获取信用机构券', 'middle')
      return false
      } else if (this.policyagree === false ) {
        this.$vux.toast.text('请阅读相关协议', 'middle')
      return false
      }
      listApi.confirmbuy({
        appName: this.$route.query.productName,
        productCode: this.$route.query.productCode,
        userId: this.$route.query.userId, 
        borrowAmount: this.borrowAmount,
        termLine:  this.termLine,
        userBankId: this.userBankId,
        purpose: this.purpose,
        contractNum: this.contractNum,
        goodsName: this.goodsName,
        days:  this.$route.query.days,
        terms: this.$route.query.terms,
        loanType:this.loanType
      })
        .then((response) => {
          this.$vux.loading.hide()
          let res = response.data
          if (res.code === 200) {
             this.tishi = true
          } else {
            this.$vux.toast.text(res.message, 'middle')
          }
        })
        .catch((error) => {
          this.$vux.loading.hide()
          this.$vux.toast.text(error, 'middle')
        })
    },
    gotoplus () {
     window.location.href = this.ruquestdata.href
     sessionStorage.setItem('count',1)
    },
    pathto (val) {
    window.location.href = val
    },
    detailOrder () {
      try {
        if (this.$route.query.platform === 'ios') {
          window.webkit.messageHandlers.goLoanList.postMessage('')
        } else {
          window.loanmarket.goLoanList()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 关闭提示弹框
    tishiConfirm () {
      console.log(this.tishi)
      // this.tishi = false
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../style/variable.less');
.borrowdetail{
  background:linear-gradient(#659df8,#397be6);
  padding:20px 0px 114px;
  	font-Family:"PingFang-SC-Medium";
  // height:1000px;
  box-sizing:border-box;
.card{
  position:relative;
  width:750px;
  height:1500px;
  margin:auto;
background:url('/static/card.png') no-repeat 0 100%;
background-size:750px 1690px;
.amount{
  height:274px;
  .amount_title{
  font-size:32px;
  color:rgb(151,158,172);
  padding-top:60px;
  text-align:center;
  margin:auto;
}
.amount_number{
  padding-top:18px;
  text-align:center;
  font-size:72px;
  color:rgb(57,123,230);
}
}
.borrowmain{
  width:646px;
  height:675px;
  margin:auto;
  margin-top:45px;
  background:#fff;
  position:relative;
  .static{
    height:120px;
    border-bottom:1px solid #ddd;
    .static_left{
    font-size:32px;
    color:#333;
    line-height:120px;
    text-align:left;
    display:inline-block;
    font-weight: Medium;
    }
    .static_right{
    font-size:28px;
    color:#979eac;
     line-height:120px;
     text-align:right;
     float:right;
    }
  }
  .borrowrequest{
   height:200px;
   border-bottom:1px solid #ddd;
   font-size:32px;
   color:#333;
   .request_top{
    line-height:32px;
    padding-top:44px; 
   }
   .request_bottom{
      padding:48px 0 47px;
     .request_bottom_left{
      line-height:32px;
  
     }
     .request_bottom_right{
       color:#979eac;
       float:right;
       font-size:28px;
     }
   }
}
  .borrowpolicy{
    font-size:26px;
    line-height:48px;
    padding-top:21px;
    color:#979eac;
    float:left;
    position:relative;
    .checkion_right_txt{
    position:absolute;
    width:544px;
    top:22px;
    left:50px;
    font-size:24px;
    .seconed_line{
      display:inline;

    }
    >span{
      color:#397be6;
      display:inline-block;
      // margin-right:20px;
    }
    }
    
  }
 }
}

.gotoIdenty {
  text-align: right;
  color: #1d7ffe;
  .font-dpr(28px);
}
.btn_blue{
  width:626px;
  height:80px;
  margin:auto;
  border-radius:40px;
  font-size:32px;
  line-height:80px;
  background:rgb(57,123,230);
  text-align:center;
  color:#fff; 
  margin-top:60px;
  text-align:center;
}
.vux-check-icon {
  height:35px;
}
}
.tishi {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.6);
  z-index: 999;
}
.tishi-txt {
  color: #974e25;
  font-size: 0.4rem;
  text-align: center;
  top: 50%;
  position: relative;
  font-weight: bold;
  line-height: 0.6rem;
  width: 64%;
  margin: 0 auto;
  text-align: left;
}
.success {
  background: url('../../asset/tishi-success.png');
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
  top: 63%;
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
.close {
  position: relative;
  top: 84%;
  left: 45%;
  transform: translate(0 -50%)
}
.close > img {
  width: 72px;
  height: 72px;
  display: inline-block;
}
</style>
