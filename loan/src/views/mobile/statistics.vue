<template>
  <div>
    <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
      <el-form-item label="甲方名称：" prop="merchantName">
        <el-input v-model="form.merchantName" placeholder="请输入甲方名称"></el-input>
      </el-form-item>
      <el-form-item label="渠道名称：" prop="canalName">
        <el-input v-model="form.canalName" placeholder="请输入渠道名称"></el-input>
      </el-form-item>
      <el-form-item label="汇总方式：" prop="summaryMode">
        <el-select v-model="form.summaryMode" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间：" prop="date">
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
      <el-form-item label="统计方式：" prop="countMode">
        <el-radio-group v-model="form.countMode" size="small">
          <el-radio-button label="0">UV</el-radio-button>
          <el-radio-button label="1">浏览</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>查询</el-button>
        <el-button type="info" icon="el-icon-circle-close-outline" @click.native="onReset">重置</el-button>
        <!-- <el-button type="danger" icon="el-icon-edit-outline" @click.native='onExport'>添加</el-button> -->
      </el-form-item>
    </el-form>
    <el-row style="margin:0px 0 10px;">
      <el-col :span="24" >
        <el-button size="small" type="primary" icon="el-icon-edit-outline" @click.native='onExport'>导出Excel</el-button>
      </el-col>
    </el-row>
    <el-table
      class="tableList"
      header-row-class-name="headname"
      style="width: 100%"
      stripe
      v-loading="page.loading"
      :data="page.tableData" >
      <!-- <el-table-column
        width="80"
        label="ID"
        prop="id">
      </el-table-column> -->
      <!-- <el-table-column
        label="渠道名称"
        prop="canalName">
      </el-table-column>
      <el-table-column
        label="甲方产品"
        prop="productName">
      </el-table-column>
      <el-table-column
        label="甲方名称"
        prop="merchantName">
      </el-table-column> -->
      <template
        v-for="(item, index) in tableColumn"
        >
          <el-table-column
            :key="index"
            :label="item.columnName"
            :prop="item.columnProp">
            <template slot-scope="props">
              <span v-if="item.columnProp === 'createTime'">{{props.row[item.columnProp] | FilterTime }}</span>
              <span v-else-if="item.columnProp === 'distributeLink'">{{props.row[item.columnProp]}} <el-button class="btn" size="mini" :data-clipboard-text="props.row[item.columnProp]" v-copy>复制</el-button></span>
              <span v-else>{{props.row[item.columnProp]}}</span>
            </template>
          </el-table-column>
      </template>

      <!-- <el-table-column
        width="120"
        label="类型"
        prop="distributeMode">
      </el-table-column>
      <el-table-column
        width="120"
        label="URL"
        prop="productLink">
      </el-table-column>
      <el-table-column
        width="120"
        label="分发URL"
        prop="distributeLink">
      </el-table-column>
      <el-table-column
        width="180"
        label="发生时间"
        prop="createTime">
        <template slot-scope="props">
          {{props.row.createTime | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="Ip"
        prop="requestIp">
      </el-table-column>
      <el-table-column
        label="设备标识"
        prop="deviceIdentity">
      </el-table-column>
      <el-table-column
        label="来源"
        prop="deviceName">
      </el-table-column>
      <el-table-column
        label="汇总统计数"
        prop="count">
      </el-table-column> -->
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
</template>
<script>
import moment from 'moment'
import distributeApi from '@/api/distribute'
import { pageMixin } from '@/views/component/mixin'
import {exportExcel} from '@/utils/common'
export default {
  mixins: [pageMixin],
  data () {
    return {
      // 查询条件相关
      form: {
        summaryMode: 0,
        date: [moment().subtract(15, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        canalName: '',
        merchantName: '',
        countMode: 0
      },
      options: [{
        value: 1,
        label: '按甲方URL分组汇总'
      }, {
        value: 2,
        label: '按分发URL分组汇总'
      }, {
        value: 0,
        label: '明细展示'
      }],
      tableColumn: []
    }
  },
  computed: {

  },
  methods: {
    columnShow (item) {
      // console.log(this.form.summaryMode, item.columnProp, item.type, item.type.indexOf(this.form.summaryMode) > -1)
      return item.type.indexOf(this.form.summaryMode) > -1
    },
    // 公用分页参数
    getParam () {
      return {
        startDate: this.form.date.length > 0 ? this.form.date[0] : '',
        endDate: this.form.date.length > 0 ? this.form.date[1] : '',
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      }
    },
    // 导出excel
    onExport () {
      if (this.page.tableData.length === 0) {
        this.$message.warning({
          message: '没有要导出的数据'
        })
        return false
      }
      distributeApi['DISTRIBUTE_STATIS_EXPORT'](Object.assign(
        this.getParam(),
        this.form
      )).then(response => {
        let result = response.data
        exportExcel(result)
      }).catch(error => {
        console.log(error)
      })
    },
    //
    setColumn () {
      let column = [
        {columnName: '渠道名称', columnProp: 'canalName', type: [0, 2]},
        {columnName: '甲方产品', columnProp: 'productName', type: [0, 1, 2]},
        {columnName: '甲方名称', columnProp: 'merchantName', type: [0, 1, 2]},
        // {columnName: '分发类型', columnProp: 'distributeMode', type: [0]},
        {columnName: 'URL', columnProp: 'productLink', type: [1]},
        {columnName: '分发URL', columnProp: 'distributeLink', type: [2]},
        {columnName: 'IP', columnProp: 'requestIp', type: [0]},
        {columnName: '设备标识', columnProp: 'deviceIdentity', type: [0]},
        {columnName: '设备来源', columnProp: 'deviceName', type: [0, 3]},
        {columnName: '汇总统计数', columnProp: 'count', type: [1, 2, 3]},
        {columnName: '请求时间', columnProp: 'createTime', type: [0]}
      ]
      this.tableColumn = column.filter((item) => {
        return item.type.indexOf(this.form.summaryMode) > -1
      })
    },
    // 查询
    getSyncList (option = {}) {
      this.setColumn()
      this.page.loading = true
      distributeApi['DISTRIBUTE_STATIS_LIST'](Object.assign(
        this.getParam(),
        option
      )).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.page.loading = false
          this.page.tableData = result.datas.datalist
          this.page.tableTotal = result.datas.rsCount
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getSyncList()
  }
}
</script>
