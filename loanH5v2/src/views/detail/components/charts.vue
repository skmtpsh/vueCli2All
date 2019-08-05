<template>
  <div>
    <van-row type="flex" justify="space-between" class="trend-txt">
      <van-col span="12">总计成功借款<span>152306人</span></van-col>
      <van-col span="8" style="text-align: right;">放款通过率<span>96%</span></van-col>
    </van-row>
    <div>
      <canvas id="myChart" class="mychart" :style="{width: screenWidth-20 + 'px'}"></canvas>
    </div>
  </div>
</template>
<script>
const F2 = require('@antv/f2')
export default {
  props: ['data'],
  data () {
    return {
      screenWidth: document.body.clientWidth
    }
  },
  watch: {
    screenWidth (val) {
      this.screenWidth = val
    }
  },
  methods: {
    dataChart () {
      // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      const data = [{
        date: '2017-06-05',
        value: 116
      }, {
        date: '2017-07-10',
        value: 91
      }, {
        date: '2017-07-11',
        value: 92
      }, {
        date: '2017-07-12',
        value: 113
      }, {
        date: '2017-07-13',
        value: 107
      }, {
        date: '2017-07-14',
        value: 131
      }, {
        date: '2017-07-15',
        value: 111
      }, {
        date: '2017-07-16',
        value: 64
      }, {
        date: '2017-07-17',
        value: 69
      }, {
        date: '2017-07-18',
        value: 88
      }, {
        date: '2017-07-19',
        value: 77
      }, {
        date: '2017-07-20',
        value: 83
      }, {
        date: '2017-07-21',
        value: 111
      }, {
        date: '2017-07-22',
        value: 57
      }, {
        date: '2017-07-23',
        value: 55
      }, {
        date: '2017-07-24',
        value: 60
      }]

      // Step 1: 创建 Chart 对象
      const chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      })

      // Step 2: 载入数据源
      chart.source(data, {
        value: {
          tickCount: 5,
          min: 0
        },
        date: {
          type: 'timeCat',
          range: [0, 1],
          tickCount: 3
        }
      })
      chart.tooltip({
        custom: true,
        showXTip: true,
        showYTip: true,
        snap: true,
        crosshairsType: 'xy',
        crosshairsStyle: {
          lineDash: [2]
        }
      })

      chart.axis('date', {
        label: function label (text, index, total) {
          var textCfg = {}
          if (index === 0) {
            textCfg.textAlign = 'left'
          } else if (index === total - 1) {
            textCfg.textAlign = 'right'
          }
          return textCfg
        }
      })
      chart.line().position('date*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF')
      chart.area().position('date*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF')
      chart.render()
    }
  },
  mounted () {
    this.dataChart()
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
        this.dataChart()
      })()
    }
  }
}
</script>
<style lang="scss" scoped>
  .trend-txt {
    margin: 0px 0 10px;
    color: #333333;
    font-size: 14px;
    span {
      color: #FE5A3F;
    }
  }
</style>
