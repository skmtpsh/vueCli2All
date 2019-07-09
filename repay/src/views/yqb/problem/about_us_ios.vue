<template>
  <div class="page">
    <div class="Wrapcontent">
      <section class="aboutLogo"> 
        <img src="http://s.yipurse.com/help/img/about_logo.png" /> 
      </section> 
      <p>
       山东鲁信汇金商务信息咨询有限公司是一家专注为年轻人提供智能消费金融服务的互联网金融公司，公司自成立以来，始终坚持“创一流企业、一流产品、一流信誉、一流服务”的企业目标。对系统、对产品严格把关不断超越，以安全的产品、卓越的管理、优秀的品质和周到的服务赢得用户的一致好评和认可！
      </p>
      <p>翼钱包是银鑫旗下的一款集现金短借跟商品分期的APP，翼钱包是提供快速借款的信用钱包APP，只要您有信用，资金分秒必达。同时，翼钱包具有借款超市和正规银行信用卡申请通道，支持免费申请信用卡。</p>
      <p>翼钱包的“手机分期”“0元购机计划”是与中国电信联合推出的一款分期产品，自从上线以来深受广大消费者的喜爱。</p>
    </div>
  </div>
</template>
<script>
import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

export default {
  mounted () {
    setTimeout(() => {
      this.money = -1024
    }, 2000)
  },
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
  },
  data () {
    return {
    }
  }
}
</script>
<style scoped>
html,body {
  background: #ffffff!important;
}
.Wrapcontent{
  position: absolute;
  background: #ffffff;
}
.aboutLogo>img{
  width: 18%;
  margin: 0 auto;
  display: block;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  box-shadow: 2px 6px 15px #cccccc;
  border-radius: 17px;
}
.aboutCon{
  padding:0 0.2rem;
  margin:0 auto;
  font-size: 0.16rem;
}
.weui-cell {
  line-height: 0.6rem;
}
.Wrapcontent p {
  font-size: .4rem;
  padding: 0.2rem 0.5rem;
  text-align: justify;
  text-indent: 0.8rem;
}
</style>
<style>
html,body {
  background: #ffffff!important;
}
</style>
