<template>
  <div>
    <div class="tip"><p>今日数据汇总</p></div>
    <div class="statics">
      <el-row :gutter="8">
        <el-col :span="6" >
            <el-alert
              type="success"
              :closable="false">
                <div class="flex">
                  <div class="flexitem">
                    <i class="el-icon-news"></i>
                    <p>调用总次数</p>
                  </div>
                  <h3 class="flexnum">{{statics.recordCnt}}</h3>
                </div>
            </el-alert>
        </el-col>
        <el-col :span="6" >
            <el-alert
              type="error"
              :closable="false">
                <div class="flex">
                  <div class="flexitem">
                    <i class="el-icon-date"></i>
                    <p>调用总金额</p>
                  </div>
                  <h3 class="flexnum">{{statics.recordAmount}}</h3>
                </div>
            </el-alert>
        </el-col>
        <el-col :span="6" >
            <el-alert
              type="warning"
              :closable="false">
                <div class="flex">
                  <div class="flexitem">
                    <i class="el-icon-tickets"></i>
                    <p>今日总充值</p>
                  </div>
                  <h3 class="flexnum">{{statics.rechargeAmount}}</h3>
                </div>
            </el-alert>
        </el-col>
        <el-col :span="6" >
            <el-alert
              type="success"
              :closable="false">
                <div class="flex">
                  <div class="flexitem">
                    <i class="el-icon-goods"></i>
                    <p>客户余额</p>
                  </div>
                  <h3 class="flexnum">{{statics.totalBalance}}</h3>
                </div>
            </el-alert>
        </el-col>
      </el-row>
    </div>
    <div class="tip"><p>趋势</p></div>
    <div style="padding:30px;">
      <el-form :model="formInline" >
        <el-form-item label="指标">
          <el-select v-model="formInline.trend" placeholder="请选择" @change='handleChangeTrend'>
            <el-option label="调用总次数" value="1"></el-option>
            <el-option label="调用总金额" value="2"></el-option>
            <el-option label="今日总充值" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            @change="handleChangeDate"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            v-model="formInline.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <chart :options="option" auto-resize/>
    </div>
  </div>
</template>
<script>
// import moment from 'moment'
import financeApi from '@/api/finance'
// import Option from '@/meta/echartOption'
export default {
  data () {
    return {
      statics: {
        rechargeAmount: 0,
        recordAmount: 0,
        recordCnt: 0,
        totalBalance: 0
      },
      formInline: {
        date: '',
        trend: '1'
      },
      option: {
        legend: {
          data: []
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          name: ''
        },
        yAxis: {
          type: 'value',
          name: ''
        },
        series: [{
          data: [],
          type: 'line',
          smooth: true,
          symbol: 'circle'
        }]
      }
    }
  },
  methods: {
    handleChangeDate () {
      this.getList()
    },
    handleChangeTrend () {
      this.getList()
    },
    getAmount () {
      financeApi['FINANCESUMARY']().then(response => {
        const result = response.data
        if (result.code === 200) {
          this.statics = result.datas
          console.log(this.statics)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getList () {
      financeApi['FINANCETREND']({
        index: this.formInline.trend,
        startDate: this.formInline.date ? this.formInline.date[0] : '',
        endDate: this.formInline.date ? this.formInline.date[1] : ''
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.option.xAxis.data = result.datas.labels
          this.option.series = [
            {
              data: result.datas.data
            }
          ]
          if (this.formInline.trend === '1') {
            this.option.xAxis.name = '时'
            this.option.yAxis.name = '次'
          } else if (this.formInline.trend === '2') {
            this.option.xAxis.name = '时'
            this.option.yAxis.name = '元'
          } else {
            this.option.xAxis.name = '时'
            this.option.yAxis.name = '元'
          }
          var date1 = new Date(this.formInline.date[0]).getTime()
          var date2 = new Date(this.formInline.date[1]).getTime()
          if ((date1 !== undefined && date2 !== undefined) && (date2 - date1 > 86400000)) {
            this.option.xAxis.name = '天'
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getAmount()
    this.getList()
  }
}
</script>
<style lang="scss">
.statics {
  .el-alert__content {
    display: block;
    width: 100%;
  }
}
.echarts {
  width: 100% !important;
}
</style>
