<template>
  <div class="page">
    <div class="head">
    <!-- <x-header :left-options="{backText: ''}" class="detailHeader">平台详情</x-header> -->
    </div>
    <!-- 申请流程步骤 -->
    <div class="sqlc">
      <div class="wrap">
        <h2>
          <span>申请流程</span>
        </h2>
        <div >
          <img src="../../asset/ptdetail-1.png" class="img">
        </div>
        <ul class="process">
          <li>资料认证</li>
          <li>编辑资料</li>
          <li>信息审核</li>
          <li>放款成功</li>
        </ul>
      </div>
    </div>
    <!-- 申请条件 -->
    <div class="sqlc">
      <div class="wrap">
        <h2>
          <span>申请条件</span>
        </h2>
        <div >
          <p v-html="applyCondition"></p>
        </div>
      </div>
    </div>
    <!-- 费用说明 -->
    <div class="sqlc">
      <div class="wrap">
        <h2>
          <span>费用说明</span>
        </h2>
        <div >
          <p v-html="costDescription"></p>
          <!-- <p>按月计费，月费率1.65%</p>
          <p>举例，贷款12000元，期限12个月，到账12000元，每月还1210元</p> -->
        </div>
      </div>
    </div>
    <!-- 说明 -->
    <div class="sqlc">
      <div class="wrap">
        <h2>
          <span>还款说明</span>
        </h2>
        <div>
          <p v-html="repayDescription"></p>
        </div>
        <!-- <h3>还款方式</h3>
        <div >
          <p class="extra">银行贷扣：还款日当天19:30从银行卡中自动扣款</p>
          <p class="extra">主动还款</p>
        </div>
        <h3>提前还款</h3>
        <div >
          <p class="extra">单期提前还款：不支持</p>
          <p class="extra">全部结清：支持</p>
        </div>
        <h3>逾期策略</h3>
        <div>
          <p class="extra">当期应还金额2%+逾期天数*0.2%</p>
        </div> -->
      </div>
    </div>
    <!-- 产品介绍 -->
    <div class="sqlc">
      <div class="wrap">
        <h2>
          <span>产品介绍</span>
        </h2>
        <div >
          <p v-html="remark"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import listApi from '@/api/list'
import { XHeader } from 'vux'
export default {
  components: {
    XHeader
  },
  data () {
    return {
      applyMaterial: '',
      applyCondition: '',
      repayDescription: '',
      costDescription: '',
      remark: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      listApi.detailIndex({
        productCode: this.$route.query.productCode
      }).then((response) => {
        const result = response.data.datas
        this.applyCondition = (result.applyCondition).replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>')
        this.costDescription = (result.costDescription).replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>')
        this.repayDescription = (result.repayDescription).replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>')
        this.applyMaterial = (result.applyMaterial).replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>')
        this.remark = (result.remark).replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>')
      })
    }
  }
}
</script>
<style lang="less">
.page {
  .vux-header {
    background: #ffffff!important;
  }
  .btnbox {
    padding: 30px;
  }
  .detailHeader {
    color: #333333!important;
  }
  .vux-header {
    padding: 1rem 0 0.375rem!important;
  }
  .vux-header .vux-header-left .left-arrow:before {
    border: 5px solid #333333 !important;
    border-width: 5px 0 0 5px !important;
    width: 0.3rem!important;
    height: 0.3rem!important;
    top: 0.958333rem!important;
    left: 0.25rem!important;
  }
  .sqlc h2 {
    color: #333333;
    font-size: 34px;
    font-weight: bold;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .sqlc h2 span {
    border-left: 8px solid #397be6;
    display: inline-block;
    padding-left: 20px;
  }
  .sqlc {
    width: 100%;
    margin: 0 auto;
    background: #ffffff;
    margin-bottom: 20px;
  }
  .wrap {
    width: 94%;
    left: 3%;
    position: relative;
    padding-bottom: 40px;
  }
  .process {
    clear: both;
    overflow: hidden;
    padding-bottom: 38px;
  }
  .process li {
    float: left;
    width: 25%;
    text-align: center;
    font-size: 28px;
  }
  p {
    font-size: 28px;
    line-height: 50px;
    // height: 72px;
  }
  .extra {
    color: #959fb5;
  }
  h3 {
    margin-bottom: 15px;
    margin-top: 30px;
  }
}
.vux-header-title {
    color: #333333;
  }
  .head .vux-header-title {
    color: #333333!important;
    font-size: 36px!important;
  }
  .img {
    width: 100%;
  }
  // .vux-header .vux-header-title {
  //   color: #333333!important;
  // }
</style>
