<template>
  <div>
    <h3 class="boxtitle">今日统计</h3>
    <el-row type="flex" class="rowbox" justify="space-between" :gutter="20">
      <el-col :sm="12" :md="8">
        <div class="gridcell">
          <div class="gridico"><i class="el-icon-date"></i></div>
          <div class="gridtxt">
            <p>今日拒绝量</p>
            <div class="gridnum"><h4>3013</h4><span>50.65%</span></div>
          </div>
        </div>
      </el-col>
      <el-col :sm="12" :md="8">
        <div class="gridcell">
          <div class="gridico"><i class="el-icon-sold-out"></i></div>
          <div class="gridtxt">
            <p>今日人工审核量</p>
            <div class="gridnum"><h4>2570</h4><span>43.20%</span></div>
          </div>
        </div>
      </el-col>
      <el-col :sm="12" :md="8">
        <div class="gridcell">
          <div class="gridico"><i class="el-icon-message"></i></div>
          <div class="gridtxt">
            <p>今日通过量</p>
            <div class="gridnum"><h4>366</h4><span>6.15%</span></div>
          </div>
        </div>
      </el-col>
      <el-col :sm="12" :md="8">
        <div class="gridcell">
          <div class="gridico"><i class="el-icon-printer"></i></div>
          <div class="gridtxt">
            <p>今日总量</p>
            <div class="gridnum"><h4>5949</h4><span>100%</span></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <h3 class="boxtitle">风险事件统计</h3>
    <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
      <el-form-item label="统计时间：" prop="date">
        <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          v-model="form.date"
          type="daterange"
          align="left"
          unlink-panels
          :clearable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="form.dateRadio" size="small">
          <el-radio-button label="今天"></el-radio-button>
          <el-radio-button label="昨天"></el-radio-button>
          <el-radio-button label="最近七天"></el-radio-button>
          <el-radio-button label="最近三十天"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="事件类型：" prop="channelCode">
        <el-select
          v-model="form.channelCode"
          filterable
          reserve-keyword
          placeholder="请输入所属频道"
          :loading="channel.selLoading">
          <el-option key="全部" label="全部" value=""></el-option>
          <el-option
            v-for="channel in channel.options"
            :key="channel.channelCode"
            :label="channel.channelName"
            :value="channel.channelCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>搜索</el-button>
      </el-form-item>
    </el-form>
    <div style="padding:30px 0;">
      <chart :options="option" :theme="theme" auto-resize/>
    </div>
    <div style="padding:30px 0;">
      <chart :options="option2" :theme="theme" auto-resize/>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import theme from '@/components/charts/theme/macarons.json'
export default {
  data () {
    var colors = ['#5793f3', '#d14a61', '#675bba']
    return {
      theme: theme,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            picker.$emit('pick', [moment().subtract(7, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            picker.$emit('pick', [moment().subtract(1, 'M').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            picker.$emit('pick', [moment().subtract(3, 'M').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')])
          }
        }]
      },
      form: {
        dateRadio: '今天',
        channelCode: '',
        date: [moment().subtract(15, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
      },
      channel: {
        selLoading: false,
        options: []
      },
      option2: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          x: 'right',
          y: 'center',
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '广告',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '广告',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '广告',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
              itemStyle: {
                normal: {
                  lineStyle: {
                    type: 'dashed'
                  }
                }
              },
              data: [
                [{type: 'min'}, {type: 'max'}]
              ]
            }
          },
          {
            name: '百度',
            type: 'bar',
            barWidth: 5,
            stack: '搜索引擎',
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: '谷歌',
            type: 'bar',
            stack: '搜索引擎',
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: '必应',
            type: 'bar',
            stack: '搜索引擎',
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: '其他',
            type: 'bar',
            stack: '搜索引擎',
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      },
      option: {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['蒸发量', '降水量', '平均温度']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '蒸发量',
            min: 0,
            max: 250,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '降水量',
            min: 0,
            max: 250,
            position: 'right',
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '降水量',
            type: 'bar',
            yAxisIndex: 1,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 2,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      }
    }
  },
  methods: {
  },
  created () {

  }
}
</script>
<style lang="scss" scoped>
.echarts {
  width: 100% !important;
}
.rowbox {
  margin-bottom:20px;
  background-color: #fff;
}
.gridcell {
  padding: 20px;
  // background-color: #f2f2f2;
  border-radius: 10px;
  border: 1px solid #cfe2ff;
  border-top: 3px solid #3080fe;

  // box-shadow: 1px 1px 12px #f2f2f2;
}
.gridcell, .gridnum, .gridico{
  display: flex;
  justify-content: center;
  align-items: center;
}
.gridico {
  font-size: 40px;
  color: #3080fe;
  align-items: center;
  margin-right: 20px;
}
.gridcell {
  p, h4 {
    margin: 0;
  }
}
.gridnum {
  justify-content: space-between;
  h4 {
    font-size: 28px;
  }
  span {
    font-size: 12px;
  }
}
.gridtxt {
  flex: 1;
  p {
    font-size: 12px;
    color: #666;
    margin: 0 0 10px;
    font-weight: 450;
  }
}
.boxtitle {
  font-size: 18px;
  padding: 15px 0px;
  border-bottom: 1px solid rgb(240, 240, 240);
  margin: 0px 0 20px 0;
  font-weight: 500;
  color: #3f3f3f;
}
</style>
