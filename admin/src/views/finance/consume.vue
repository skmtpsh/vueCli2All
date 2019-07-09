<template>
  <div>
    <el-form :inline="true" :model="formInline" ref="formInline" size="mini" >
      <el-row>
        <el-col :lg="24" >
          <el-form-item label="查询时间：">
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="formInline.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="产品名称：">
          <el-select v-model="formInline.channelId" placeholder="请选择">
              <el-option
                v-for="item in MenuDataNew"
                :key="item.id"
                :label="item.channelName"
                :value="item.channelId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" icon="el-icon-search" @click.native='onSearch' round>查询</el-button>
            <el-button type="success" icon="el-icon-upload2" @click.native='onExport' round>导出</el-button>
            <el-button type="info" icon="el-icon-circle-close-outline" @click.native="resetFilter" round>重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      header-row-class-name="headname"
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="产品名称"
        prop="channelName">
      </el-table-column>
      <el-table-column
        label="产品类型"
        prop="serviceTypeName">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="custname">
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="custphone">
      </el-table-column>
      <el-table-column
        label="身份证"
        prop="custIdcard">
      </el-table-column>
      <el-table-column
        width="280"
        label="公司名称"
        prop="appName">
      </el-table-column>
      <!-- <el-table-column
        label="联系人"
        prop="contactMan">
      </el-table-column> -->
      <el-table-column
        label="查询时间"
        prop="requestTime">
        <template slot-scope="props">
          {{props.row.requestTime | FilterTime}}
        </template>
      </el-table-column>
      <el-table-column
        label="计费模式"
        prop="feeTypeName">
      </el-table-column>
      <el-table-column
        label="本次扣费"
        prop="saleAmt">
        <template slot-scope="props">
          {{props.row.saleAmt == '0' ? '-' : props.row.saleAmt }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableTotal">
    </el-pagination>
  </div>
</template>
<script>
// import moment from 'moment'
import consumeApi from '@/api/consume'
import { Message } from 'element-ui'
import {exportExcel} from '@/utils/common'
export default {
  data () {
    return {
      formInline: {
        // date: [moment().subtract('days', 6).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        date: [],
        channelId: '',
        channelName: ''
      },
      tableData: [],
      tableTotal: 0,
      loading: false,
      pagesize: 10,
      currentPage: 0,
      MenuData: '',
      channelName: '',
      channelId: '',
      subType: [],
      subData: [],
      subChannel: [],
      MenuDataNew: [],
      export: false
    }
  },
  methods: {
    getParam () {
      return {
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        channelId: this.formInline.channelId,
        startDate: this.formInline.date ? this.formInline.date[0] : '',
        endDate: this.formInline.date ? this.formInline.date[1] : ''
      }
    },
    getList () {
      this.loading = true
      consumeApi['CONSUMELIST'](this.getParam()).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.loading = false
          this.tableData = result.datas.list
          this.tableTotal = result.datas.total
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getName () {
      this.loading = true
      consumeApi['CONSUMEMENU']({
        pageNum: 0,
        pageSize: 15
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.loading = false
          this.subData = result.datas.subChannel
          var MenuData = result.datas
          let tempArr = [{channelName: '全部', channelId: '', id: '0'}]
          MenuData.forEach(item => {
            item.subType.forEach(obj => {
              tempArr.push(...obj.subChannel)
            })
          })
          console.log(tempArr)
          this.MenuDataNew = tempArr
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      console.log(val)
      this.currentPage = val
      this.getList()
    },
    addNotice () {
    },
    onSubmit () {
      console.log('submit!')
    },
    onExport () {
      if (this.formInline.date.length === 0) {
        Message.warning({
          message: '请选择查询时间'
        })
        return false
      }
      if (this.tableData.length === 0) {
        Message.warning({
          message: '没有要导出的数据'
        })
        return false
      }
      consumeApi['FINANCEAMOUTEXPORT'](this.getParam()).then(response => {
        let result = response.data
        exportExcel(result)
      }).catch(error => {
        console.log(error)
      })
    },
    onSearch () {
      this.getList()
    },
    resetFilter () {
      this.$refs['formInline'].resetFields()
      this.formInline.date = ''
      this.formInline.channelId = ''
      this.getList()
    }
  },
  created () {
    this.getList()
    this.getName()
  }
}
</script>
