<template>
  <div>
    <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
      <el-form-item label="关键词：" prop="keyWord">
        <el-input v-model="form.keyWord" placeholder="请输入关键词"></el-input>
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
      <el-form-item label="所属商户：" prop="merchantName">
        <el-select
          style="width:100%"
          v-model="form.merchantName"
          filterable
          remote
          reserve-keyword
          placeholder="请输入所属商户"
          :loading="busiLoading">
          <el-option
            key="全部"
            label="全部"
            value=""></el-option>
          <el-option
            v-for="item in busiOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算APP：" prop="productName">
        <el-select
          style="width:100%"
          v-model="form.productName"
          filterable
          remote
          reserve-keyword
          placeholder="请输入结算APP"
          :loading="appLoading">
          <el-option
            key="全部"
            label="全部"
            value=""></el-option>
          <el-option
            v-for="item in proOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
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
      <template
        v-for="(item, index) in tableColumn"
        >
          <el-table-column
            :key="index"
            :label="item.columnName"
            :prop="item.columnProp">
            <template slot-scope="props">
              <span v-if="item.columnProp === 'createTime'">{{props.row[item.columnProp] | FilterTime }}</span>
              <span v-else>{{props.row[item.columnProp]}}</span>
            </template>
          </el-table-column>
      </template>
     <!-- <el-table-column
        width="80"
        label="app版本"
        prop="marketAppVersion">
      </el-table-column>
      <el-table-column
        width="120"
        label="姓名"
        prop="userName">
      </el-table-column>
      <el-table-column
        width="120"
        label="手机号"
        prop="userMobile">
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
        label="结算APP"
        prop="productName">
      </el-table-column>
      <el-table-column
        label="所属商户"
        prop="merchantName">
      </el-table-column>
      <el-table-column
        label="结算方式"
        prop="computeWay">
      </el-table-column>
      <el-table-column
        label="登录IP"
        prop="userIp">
      </el-table-column>
      <el-table-column
        label="手机IMEI"
        prop="userImei">
      </el-table-column>
      <el-table-column
        width="150"
        label="手机品牌+型号"
        prop="userBrand">
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
import balanceApi from '@/api/balance'
import { pageMixin } from '@/views/component/mixin'
import {exportExcel} from '@/utils/common'
export default {
  mixins: [pageMixin],
  data () {
    return {
      tableColumn: [],
      options: [{
        value: 1,
        label: '版本汇总'
      }, {
        value: 0,
        label: '明细展示'
      }],
      // 查询条件相关
      form: {
        keyWord: '',
        date: [moment().subtract(15, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        productName: '',
        merchantName: '',
        summaryMode: 0,
        countMode: 0
      },
      rules: {
      },
      busiLoading: false,
      appLoading: false,
      busiOptions: [], // 商户
      proOptions: [] // 结算app
    }
  },
  methods: {
    // 公用分页参数
    getParam () {
      return {
        startDate: this.form.date.length > 0 ? this.form.date[0] : '',
        endDate: this.form.date.length > 0 ? this.form.date[1] : '',
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      }
    },
    setColumn () {
      let column = [
        {columnName: 'app版本', columnProp: 'marketAppVersion', type: [0]},
        {columnName: '渠道名称', columnProp: 'canalName', type: [0]},
        {columnName: '姓名', columnProp: 'userName', type: [0]},
        {columnName: '手机号', columnProp: 'userMobile', type: [0]},
        {columnName: '发生时间', columnProp: 'createTime', type: [0]},
        {columnName: '结算APP', columnProp: 'productName', type: [0, 1]},
        {columnName: '所属商户', columnProp: 'merchantName', type: [0, 1]},
        {columnName: '内部审核版汇总', columnProp: 'dianH5Count', type: [1]},
        {columnName: '结算方式', columnProp: 'computeWay', type: [0]},
        {columnName: '登录IP', columnProp: 'userIp', type: [0]},
        {columnName: '手机IMEI', columnProp: 'userImei', type: [0]},
        {columnName: '手机品牌+型号', columnProp: 'userBrand', type: [0]},
        {columnName: '点点花汇总', columnProp: 'dianCount', type: [1]},
        {columnName: '佰联汇总', columnProp: 'baiCount', type: [1]},
        {columnName: '钱达达汇总', columnProp: 'qianCount', type: [1]},
        {columnName: '总计', columnProp: 'count', type: [1]}
      ]
      this.tableColumn = column.filter((item) => {
        return item.type.indexOf(this.form.summaryMode) > -1
      })
    },
    // 导出excel
    onExport () {
      if (this.page.tableData.length === 0) {
        this.$message.warning({
          message: '没有要导出的数据'
        })
        return false
      }
      balanceApi['BANLANCE_EXPORT'](Object.assign(
        this.getParam(),
        this.form
      )).then(response => {
        let result = response.data
        exportExcel(result)
      }).catch(error => {
        console.log(error)
      })
    },
    // 下拉框
    getFilterOption () {
      // if (query !== '') {
      balanceApi['BANLANCE_FILTER']().then(response => {
        const result = response.data
        if (result.code === 200) {
          this.proOptions = result.datas.productList
          this.busiOptions = result.datas.merchantList
          this.getSyncList()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 查询
    getSyncList (option = {}) {
      this.setColumn()
      this.page.loading = true
      balanceApi['BANLANCE_LIST'](Object.assign(
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
    this.getFilterOption()
  }
}
</script>
