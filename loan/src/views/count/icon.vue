<template>
  <div class="box">
    <ul>
      <li style="margin-left:0;">
          <h3>总注册用户量</h3>
          <p class="count">{{totalCount}}<span style="font-size:16px;">人</span></p>
      </li>
      <li>
          <h3>当日注册用户量</h3>
          <p class="count">{{currentCount}}<span style="font-size:16px;">人</span></p>
      </li>
      <li>
          <h3>日活跃用户数量</h3>
          <p class="count">{{activeCount}}<span style="font-size:16px;">人</span></p>
      </li>
      <li>
          <h3>当前甲方平台总量</h3>
          <p class="count">{{totalProdCount}}<span style="font-size:16px;">家</span></p>
      </li>
    </ul>
    <!-- uv量转换统计 -->
    <div class="countone">
      <div class="tip"><p>UV量转换统计</p></div>
      <div class="tab">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="当日" name="first"></el-tab-pane>
          <el-tab-pane label="近3日" name="second"></el-tab-pane>
          <el-tab-pane label="近7日" name="third"></el-tab-pane>
          <el-tab-pane label="近30日" name="fourth"></el-tab-pane>
        </el-tabs>
      </div>
      <p class="descr" v-if="first" style="text-align:right">今日uv总量：{{totalCount1}} 昨日uv总量：{{yesterdayCount}}</p>
      <p class="descr" v-if="second" style="text-align:right">近3日uv总量：{{totalCount1}}</p>
      <p class="descr" v-if="third" style="text-align:right">近7日uv总量：{{totalCount1}}</p>
      <p class="descr" v-if="fourth" style="text-align:right">近30日uv总量：{{totalCount1}}</p>
      <chart ref="chart1" :options="option" :auto-resize="true"></chart>
    </div>
    <!-- 甲方注册量统计 -->
    <div class="counttwo">
      <div class="tip"><p>甲方UV量统计</p></div>
      <div class="tab">
        <el-tabs v-model="activeName1" type="card" @tab-click="handleCountClick">
          <el-tab-pane label="当日" name="five"></el-tab-pane>
          <el-tab-pane label="近3日" name="six"></el-tab-pane>
          <el-tab-pane label="近7日" name="seven"></el-tab-pane>
          <el-tab-pane label="近30日" name="eight"></el-tab-pane>
        </el-tabs>
      </div>
      <p class="descr"></p>
      <chart :options="option1" :auto-resize="true"></chart>
    </div>
    <div class="activeCount">
      <div class="tip"><p>贷超总活跃</p></div>
    </div>
    <!-- 贷超总活跃 -->
    <div class="activeAll">
      <el-table
      class="tableList"
      header-row-class-name=""
      style="width: 100%"
      stripe
      @sort-change='sortChange'
      :data="dataList">
      <el-table-column
        label="平台名称"
        prop="productName">
      </el-table-column>
      <el-table-column
        label="当日"
        sortable='custom'
        prop="count1">
      </el-table-column>
      <el-table-column
        label="近3日"
        sortable='custom'
        prop="count3">
      </el-table-column>
      <el-table-column
        label="近7日"
        sortable='custom'
        prop="count7">
      </el-table-column>
      <el-table-column
        label="近14日"
        sortable='custom'
        prop="count14">
      </el-table-column>
      <el-table-column
        label="近30日"
        sortable='custom'
        prop="count30">
      </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="page.tableTotal">
    </el-pagination>
    </div>
  </div>
</template>
<script>
import countApi from '@/api/count'
import { pageMixin } from '@/views/component/mixin'
export default {
  mixins: [pageMixin],
  data () {
    return {
      prop: 0,
      order: 0,
      totalCount: 0,
      currentCount: 0,
      activeCount: 0,
      totalProdCount: 0,
      dataList: [],
      totalCount1: 0,
      yesterdayCount: 0,
      first: true,
      second: false,
      third: false,
      fourth: false,
      activeName: 'first',
      activeName1: 'five',
      option: {
        color: ['#f00'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        singleAxis: {
          splitArea: {
            interval: '2'
          }
        },
        xAxis: {
          type: 'category',
          // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          data: ['00:00-00:59', '01:00-01:59', '02:00-02:59', '03:00-03:59', '04:00-04:59', '05:00-05:59', '06:00-06:59', '07:00-07:59', '08:00-08:59', '09:00-09:59', '10:00-10:59', '11:00-11:59', '12:00-12:59', '13:00-13:59', '14:00-14:59', '15:00-15:59', '16:00-16:59', '17:00-17:59', '18:00-18:59', '19:00-19:59', '20:00-20:59', '21:00-21:59', '22:00-22:59', '23:00-23:59'],
          name: '',
          splitArea: {
            interval: 1
          },
          axisLabel: {
            interval: 1,
            rotate: -45,
            margin: 2,
            textStyle: {
              fontWeight: 'bolder',
              color: '#999999'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '',
          min: '0',
          minInterval: '1',
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [{
          data: [],
          name: 'UV量',
          type: 'line',
          areaStyle: {
            color: '#b8d9fe'
          },
          smooth: false,
          itemStyle: {
            color: '#f00',
            // 通常情况下：
            normal: {
              label: {
                show: false, // 开启显示
                position: 'top', // 在上方显示
                textStyle: { // 数值样式
                  color: 'white',
                  fontSize: 16
                }
              },
              // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: '#258dff'
            },
            // 鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      option1: {
        color: ['#0f75ff'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          name: ''
        },
        yAxis: {
          type: 'value',
          name: '',
          min: '0',
          minInterval: '1',
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [{
          data: [],
          name: '注册量',
          type: 'bar',
          smooth: true,
          itemStyle: {
            // 通常情况下：
            normal: {
              label: {
                show: true, // 开启显示
                position: 'top', // 在上方显示
                textStyle: { // 数值样式
                  color: 'black',
                  fontSize: 12
                }
              },
              // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: '#3497ff'
            },
            // 鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    }
  },
  mounted () {
  },
  created () {
    this.initial()
    this.trendUv(1)
    this.trendProd(1)
    this.getSyncList(1, 1)
  },
  methods: {
    // uv量转换切换显示
    handleClick (tab) {
      if (tab.name === 'first') {
        this.trendUv(1)
        this.first = true
        this.second = false
        this.third = false
        this.fourth = false
      } else if (tab.name === 'second') {
        this.trendUv(2)
        this.first = false
        this.second = true
        this.third = false
        this.fourth = false
      } else if (tab.name === 'third') {
        this.trendUv(3)
        this.third = true
        this.first = false
        this.fourth = false
        this.second = false
      } else if (tab.name === 'fourth') {
        this.trendUv(4)
        this.fourth = true
        this.first = false
        this.second = false
        this.third = false
      }
    },
    // 注册量切换显示
    handleCountClick (tab) {
      if (tab.name === 'five') {
        this.trendProd(1)
      } else if (tab.name === 'six') {
        this.trendProd(2)
      } else if (tab.name === 'seven') {
        this.trendProd(3)
      } else if (tab.name === 'eight') {
        this.trendProd(4)
      }
    },
    // 汇总计数统计
    initial () {
      countApi['STAS_COUNT']().then(response => {
        let result = response.data.datas
        this.totalCount = result.totalCount
        this.currentCount = result.currentCount
        this.activeCount = result.activeCount
        this.totalProdCount = result.totalProdCount
      }).catch(error => {
        console.log(error)
      })
    },
    // uv量转换统计
    trendUv (count) {
      countApi['TREND_UV']({
        indexUV: count
      }).then(response => {
        let result = response.data.datas
        this.totalCount1 = result.totalCount
        this.yesterdayCount = result.yesterdayCount
        this.option.series = [
          {
            data: result.data
          }
        ]
      }).catch(error => {
        console.log(error)
      })
    },
    // 甲方注册量统计
    trendProd (count) {
      countApi['TRNED_PROD']({
        indexProd: count
      }).then(response => {
        let result = response.data.datas
        this.option1.xAxis.data = result.labels
        this.option1.series = [
          {
            data: result.data
          }
        ]
        if (result.data.length < 10) {
          result.labels.push('', '', '', '', '', '')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 贷超总活跃量统计
    getSyncList (prop, order) {
      countApi['STAS_LIST']({
        indexList: prop,
        orderWay: order,
        pageNum: this.page.currentPage,
        pageSize: '10'
      }).then(response => {
        let result = response.data.datas
        this.dataList = result.datalist
        this.page.tableTotal = result.rsCount
      }).catch(error => {
        console.log(error)
      })
    },
    // 页面条数改变
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getSyncList(this.prop, this.order)
    },
    sortChange (column, prop, order) {
      this.page.currentPage = 1
      if (column.order === 'ascending') {
        this.order = 2
      } else {
        this.order = 1
      }
      if (column.prop === 'count1') {
        this.prop = 1
        sessionStorage.setItem('prop', prop)
      } else if (column.prop === 'count3') {
        this.prop = 2
      } else if (column.prop === 'count7') {
        this.prop = 3
      } else if (column.prop === 'count14') {
        this.prop = 5
      } else if (column.prop === 'count30') {
        this.prop = 4
      }
      this.getSyncList(this.prop, this.order)
    }
  }
}
</script>
<style scoped>
.box ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}
.box ul li {
  flex: 1;
  margin: 20px;
  padding: 10px ;
  /* box-shadow: 1px 1px 20px rgba(0,0,0,.1); */
  text-align: center;
  position: relative;
  transition: all .6s ease-out;
  text-align: left;
  border: 1px solid #ececec;
}
.box ul li div {
  text-align: center;
}
.box ul svg {
  margin: 20px auto;
  width: 50px;
  height: 50px;
}
.box ul li h3 {
  color: #333;
  font-size: 16px;
  margin: 10px 0;
  text-align: left;
}

.box ul li p {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  line-height: 1;
}

.box ul .on {
  background-color: #0f75ff;
}

.box ul .on h3, .box ul .on p {
  color: #fff
}

.count {
  text-align: right;
  font-size: 1.875rem!important;
  font-weight: bold;
}

.countone, .counttwo {
  width: 48%;
  float: left;
  margin-right: 2%;
  position: relative;
}

.tab {
  max-width: 330px;
  display: block;
  right: 0;
  position: absolute;
  margin-top: 20px;
}

.descr {
  text-align: right;
  height: 40px;
  margin: 0;
  padding: 0;
  line-height: 40px;
  margin-top: 80px;
}

.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #f00;
}
.el-tabs--card>.el-tabs__header .el-tabs__item {
    width: 80px;
}
.el-tabs__item.is-active{
  background: #f00!important;
  width: 80px;
}
.el-tabs__item .is-top {
    width: 80px;
}
#tab-first, #tab-second,#tab-third,#tab-fourth {
    width: 80px;
}
.echarts {
  width: 100%;
}

.activeCount {
  clear: both;
}

</style>
<style>
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  background: #0f75ff;
  color: #ffffff;
  width: 80px;
}
.el-tabs--card>.el-tabs__header .el-tabs__nav {
  text-align: center;
}
</style>
