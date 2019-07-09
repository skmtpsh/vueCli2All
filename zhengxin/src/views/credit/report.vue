<template>
  <div class="page">
    <x-header class="report" :class="{'hight': scoreGrade === '高', 'medium':  scoreGrade === '中'}" :left-options="{backText: '', preventGoBack: true}" @on-click-back="handleBackHome">征信-报告</x-header>
    <Scroll class="wrapper" ref="wrapper" style="bottom: 0">
      <div>
        <div class="creditHead" :class="{'hight': scoreGrade === '高', 'medium':  scoreGrade === '中'}">
          <div class="innerCont">
            <div class="dunBox">
              <div class="dunImg">
                <div class="dunTitle">
                  <p class="p1">信用历史</p>
                  <p class="p2">身份特征</p>
                  <p class="p3">还款能力</p>
                  <p class="p4">人脉关系</p>
                  <p class="p5">交易行为</p>
                  <p class="p6">外部征信</p>
                </div>
                <div class="dunTxt">
                  <p class="score">
                    <countup :start-val="0" :start="true" :end-val="result.cheat.cheatSore ? result.cheat.cheatSore : 0" :duration="1.5"></countup>
                    <span class="scoreTxt">分</span>
                  </p>
                  <p v-if="result.cheat">{{scoreGrade}}风险</p>
                </div>
                <img :src="require(`@/asset/credit/dun${scoreGrade === '低' ? 4 : 3}.png`)" />
              </div>
            </div>
          </div>
        </div>
        <div class="creditBody">
          <div class="card">
            <h4 class="cardHead">基本信息</h4>
            <div class="cardBody">
              <div class="cell">
                <div class="cell-bd">借 款 人:</div>
                <div class="cell-ft">{{result.base.name}}</div>
              </div>
              <div class="cell">
                <div class="cell-bd">手 机 号:</div>
                <div class="cell-ft">{{result.base.phone}}</div>
              </div>
              <div class="cell">
                <div class="cell-bd">身份证号:</div>
                <div class="cell-ft">{{result.base.idCard}}</div>
              </div>
              <!-- <div class="cell">
                <div class="cell-bd">所在地区:</div>
                <div class="cell-ft">{{result.base.area}}</div>
              </div> -->
              <div class="cell">
                <div class="cell-bd">查询时间:</div>
                <div class="cell-ft">{{result.base.findTime | dateFormat}}</div>
              </div>
            </div>
          </div>
          <div class="card">
            <h4 class="cardHead">黑名单</h4>
            <div class="cardBody">
              <x-table :cell-bordered="false" full-bordered>
                <tbody>
                  <tr>
                    <td width="50%">历史欺诈记录</td>
                    <td><span class="black">{{result.black.historyRecord}}次</span></td>
                  </tr>
                  <tr>
                    <td>高危用户</td>
                    <td><span class="black">{{result.black.dangerRecord}}次</span></td>
                  </tr>
                  <tr>
                    <td>信贷逾期</td>
                    <td><span class="black">{{result.black.loanRecord}}次</span></td>
                  </tr>
                </tbody>
              </x-table>
              <dl class="panel">
                <dt>历史欺诈记录：<span>{{result.black.historyRecord}}次</span></dt>
                <dd>
                  <p v-if="result.black.historyRecord > 0">您当前可能存在已经生效的法院判决等失信情况，建议您尽快处理，以免影响信用评估。</p>
                  <p v-else>您个人信用记录良好，未命中失信名单。</p>
                </dd>
              </dl>
              <dl class="panel">
                <dt>高危用户：<span>{{result.black.dangerRecord}}次</span></dt>
                <dd>
                  <p v-if="result.black.dangerRecord">您当前在其他机构可能属于高危用户，建议您尽快处理，以免影响信用评估。</p>
                  <p v-else>您个人信用记录良好，不属于高危用户。</p>
                </dd>
              </dl>
              <dl class="panel">
                <dt>信贷逾期：<span>{{result.black.loanRecord}}次</span></dt>
                <dd>
                  <p v-if="result.black.dangerRecord">您当前在其他机构可能存在贷款逾期，建议您尽快处理，以免影响信用评估。</p>
                  <p v-else>您良好个人履约行为，当前未存在信贷逾期记录。</p>
                </dd>
              </dl>
            </div>
          </div>
          <div class="card">
            <h4 class="cardHead">网贷痕迹</h4>
            <div class="cardBody">
              <x-table :cell-bordered="false" full-bordered>
                <tbody>
                  <tr>
                    <td width="50%">近7天</td>
                    <td><span class="black">{{result.net.d7}}次</span></td>
                  </tr>
                  <tr>
                    <td>近1个月</td>
                    <td><span class="black">{{result.net.d30}}次</span></td>
                  </tr>
                  <tr>
                    <td>近3个月</td>
                    <td><span class="black">{{result.net.d90}}次</span></td>
                  </tr>
                </tbody>
              </x-table>
              <dl class="panel">
                <dd>
                  <p>最近三个月内申请贷款的频次统计，建议根据自己的需求合理进行贷款申请，以免过多的申请影响您的信用记录。</p>
                </dd>
              </dl>
            </div>
          </div>
          <div class="card">
            <h4 class="cardHead">网贷逾期</h4>
            <div class="cardBody">
              <x-table :cell-bordered="false" full-bordered>
                <tbody>
                  <tr>
                    <td width="50%">多机构逾期数</td>
                    <td><span class="black">{{result.overdue.organizationOverdue}}次</span></td>
                  </tr>
                  <tr>
                    <td>多笔逾期笔数</td>
                    <td><span class="black">{{result.overdue.manyOverdue}}次</span></td>
                  </tr>
                  <tr>
                    <td>大额逾期笔数</td>
                    <td><span class="black">{{result.overdue.bigOverdue}}次</span></td>
                  </tr>
                </tbody>
              </x-table>
              <dl class="panel">
                <dd>
                  <p>正常履约行为将帮助您获得更多的借贷机会，失信行为将给您的信用评估带来负面影响</p>
                </dd>
              </dl>
            </div>
          </div>
          <div class="card">
            <h4 class="cardHead">欺诈评估</h4>
            <div class="cardBody">
              <dl class="panel">
                <dt>综合欺诈评估：<span>{{blackLevel === '' || blackLevel === null ? '未命中' : blackLevel}}</span></dt>
                <dd>
                  <p>综合欺诈评估是从信贷逾期、信用风险、历史欺诈、欺诈风险、政府失信等维度综合处理和评估的。</p>
                </dd>
              </dl>
              <dl class="panel">
                <dt>历史欺诈记录：<span>{{result.black.historyRecord > 0 ? '命中' : '未命中'}}</span></dt>
                <dd>
                  <p v-if="result.black.historyRecord > 0">您当前可能存在历史欺诈情况，建议您及时守约，以免影响综合评估。</p>
                  <p v-else>恭喜您，欺诈记录良好，当前不存在历史欺诈记录。</p>
                </dd>
              </dl>
              <dl class="panel">
                <dt>欺诈风险提示：<span>{{result.black.dangerAlertRecord > 0 ? '命中' : '未命中' }}</span></dt>
                <dd>
                  <p v-if="result.black.dangerAlert > 0"> 您当前欺诈风险极高，建议规范操作习惯，维护自己的综合评估。</p>
                  <p v-else> 您的个人信息未命中欺诈风险，请继续保持良好的操作行为，维持自己的信用等级。</p>
                </dd>
              </dl>
            </div>
          </div>
          <div class="card">
            <h4 class="cardHead">个人资质</h4>
            <div class="cardBody">
              <dl class="panel">
                <dt>综合资质：<span>{{scoreGrade === '低' ? '极好' : scoreGrade === '中' ? '良好' : '较差'}}</span></dt>
                <dd>
                  <p v-if="scoreGrade === '低'">您的综合资质比较稳定，保持或加强历史、行为等维度的表现，如丰富守约行为等，这有助于更好的了解你。</p>
                  <p v-if="scoreGrade === '中'">您的综合资质良好，保持个人信用记录稳定，避免发生逾期行为，这对于您的综合资质非常重要。</p>
                  <p v-if="scoreGrade === '高'">您可能频繁的申请网贷或者发生逾期，这将影响您的个人资质，请合理规范自己的行为，维护自己信用记录。</p>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script>
import Scroll from '@/components/scroll/index'
import { Cell, Group, XTable, dateFormat, cookie } from 'vux'
export default {
  components: {
    Group,
    Cell,
    XTable,
    Scroll
  },
  data () {
    return {
      result: {
        base: {},
        black: {},
        cheat: {},
        net: {},
        overdue: {}
      }
    }
  },
  computed: {
    blackLevel () {
      let level = this.result.black.blackLevel
      let txt = ''
      if (level === 'A') {
        txt = '极黑账户'
      } else if (level === 'B') {
        txt = '高危用户'
      } else if (level === 'C') {
        txt = '关注账户'
      } else if (level === 'D') {
        txt = '灰度账户'
      } else {
        txt = level
      }
      return txt
    },
    scoreGrade () {
      let cheatGrade = this.result.cheat.cheatEvaluate
      let cheatTxt = '低'
      if (cheatGrade) {
        try {
          cheatTxt = cheatGrade.substr(0, 1)
        } catch (error) {
          console.log(error)
        }
      }
      return cheatTxt
    }
  },
  filters: {
    dateFormat (val) {
      return dateFormat(val, 'YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    changeColor () {
      let Random = Math.floor(Math.random() * 3)
      let Level = ['高', '中', '低']
      this.result.cheat.cheatEvaluate = Level[Random]
    },
    handleBackHome () {
      this.$router.push({path: '/authentication/credit/check', query: Object.assign({}, this.$route.query)})
    },
    getCredit () {
      let credit = cookie.get('credit')
      if (!credit) {
        this.$vux.toast.text('征信信息为空重新获取', 'middle')
        setTimeout(() => {
          this.$router.push({path: '/authentication/credit/check', query: Object.assign({}, this.$route.query)})
        }, 200)
        return false
      }
      return new Promise(async resolve => {
        resolve(await credit)
      })
    }
  },
  mounted () {
    this.$vux.loading.show({
      text: '数据加载..'
    })
    this.getCredit().then(data => {
      setTimeout(() => {
        this.$vux.loading.hide()
        if (data) {
          this.result = JSON.parse(data)
        }
      }, 500)
    })
  }
}
</script>
<style lang="less">
@import url('./credit.less');
.creditHead.hight .dunBox .dunImg .dunTitle p {
  background-color: #d44834;
}
.creditHead.medium .dunBox .dunImg .dunTitle p {
  background-color: #ea8a33;
}
.dunBox {
  width: 100%;
  position: relative;
  height: 510px;
  display: flex;
  justify-content: center;
  align-items: center;
  .dunImg {
    position: relative;
    width: 665px;
    height: 510px;
    .dunTitle {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      p {
        position: absolute;
        display: inline-block;
        background-color: #19a14e;
        padding: 10px 15px;
        color: #fff;
        border-radius: 3px;
        .font-dpr(28px);
        &.p1 {
          left: 60px;
          top: 40px;
        }
        &.p2 {
          top: -5px;
          right: 80px;
        }
        &.p3 {
          left: 10px;
          top: 195px;
        }
        &.p4 {
          right: 10px;
          top: 190px;
        }
        &.p5 {
          left: 40px;
          bottom: 30px;
        }
        &.p6 {
          right: 35px;
          bottom: 2px;
        }
      }
    }
    .dunTxt {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .font-dpr(32px);
      color: #fff;
      .score {
        .font-dpr(100px);
        font-weight: bold;
        .scoreTxt {
          font-weight: normal;
          .font-dpr(32px);
          color: rgba(255, 255, 255, .8);
          margin-left: -30px;
        }
        margin-bottom: 20px;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.innerCont {
  padding: 12px 32px 40px;
}
.creditHead {
  // padding-top: 88px; 250px
  padding-top: 180px;
  .gradient();
  &.hight {
    .gradient(#ec513b, #e24631);
  }
  &.medium {
    .gradient(#fe9c17, #fd930c);
  }
}
.creditBody {
  padding-bottom: 80px;
  .card {
    padding: 22px 32px;
    background-color: #fff;
    margin-bottom: 26px;
  }
  .cardHead {
    .font-dpr(32px);
    color: #333;
    margin: 16px 0;
    border-left: 10px solid #397be6;
    padding-left: 16px;
  }
  .cardBody {
    padding: 20px 0 0;
    .font-dpr(28px);
    line-height: 1.8;
    color: #959fb5;
    .vux-table td, .vux-table th {
      padding: 15px;
    }
    .black {
      color: #333;
    }
    .panel {
      margin: 10px 0 10px;
      dt {
        font-weight: bold;
        color: #333333;
        padding-bottom: 10px;
        span {
          font-weight: normal;
          .font-dpr(36px);
          color: #ff4e4a
        }
      }
      dd {
        padding: 10px 0;
        p {
          margin-bottom: 10px;
        }
      }
    }
  }
  .cell {
    padding: 14px 0px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    .font-dpr(28px);
    .cell-bd {
      width: 6em;
      color: #959fb5;
    }
    .cell-ft {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      color: #333;
    }
  }
}
</style>
