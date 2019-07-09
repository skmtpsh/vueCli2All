<template>
<div>
  <el-form :model="formInline" ref="formInline" size="mini"  label-width="100px">
    <el-row>
      <el-col :lg="10" >
        <el-form-item label="充值渠道：" prop="rechargeType">
          <el-radio-group v-model="formInline.rechargeType" @change="handleChangeRadio">
            <el-radio label="01">线上充值</el-radio>
            <el-radio label="02">线下充值</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="交易时间：" prop="date">
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
        <el-form-item label="订单号：" prop="orderId">
          <el-input v-model="formInline.orderId" placeholder="订单号" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="订单状态：" prop="rechargeStatus">
          <el-select v-model="formInline.rechargeStatus">
            <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" icon="el-icon-search" round @click.native='onSearch'>查询</el-button>
            <el-button type="success" icon="el-icon-upload2" round @click.native='onExport'>导出</el-button>
            <el-button type="info" icon="el-icon-circle-close-outline" round @click.native="resetFilter">重置</el-button>
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
      width=""
      label="订单号"
      prop="orderId">
    </el-table-column>
    <el-table-column
      width="260"
      label="公司名称"
      prop="businessName">
    </el-table-column>
    <el-table-column
      width=""
      label="公司ID"
      prop="businessId">
    </el-table-column>
    <el-table-column
      width=""
      label="联系人"
      prop="contactMan">
    </el-table-column>
    <el-table-column
      width=""
      label="支付方式"
      prop="rechargeType">
      <template slot-scope="props">
        {{props.row.typeString}}
      </template>
    </el-table-column>
    <el-table-column
      width=""
      label="充值金额"
      prop="rechargeMoney">
    </el-table-column>
    <el-table-column
      width=""
      label="充值状态"
      prop="rechargeStatus">
      <template slot-scope="props">
        {{props.row.statusString}}
      </template>
    </el-table-column>
    <el-table-column
      width=""
      label="交易开始时间"
      prop="startTime">
      <template slot-scope="props">
        {{ props.row.startTime | FilterTime }}
      </template>
    </el-table-column>
    <el-table-column
      width=""
      label="交易结束时间"
      prop="remitDate">
      <template slot-scope="props">
        {{ props.row.completeTime | FilterTime }}
      </template>
    </el-table-column>
    <el-table-column
      v-if="formInline.rechargeType === '02'"
      width="180"
      label="操作">
      <template slot-scope="props">
        <el-button type="primary" size="mini" icon="el-icon-check" v-if="props.row.rechargeStatus === '0201'" round @click.native="handleConfirm(props.row, '0202')">确认</el-button>
        <el-button type="danger" size="mini" icon="el-icon-close" v-if="props.row.rechargeStatus === '0201'" round @click.native="handleConfirm(props.row, '0203')">取消</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="pagesize"
    :page-sizes="[5, 10, 15, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableTotal">
  </el-pagination>
</div>
</template>
<script>
// import moment from 'moment'
import financeApi from '@/api/finance'
import { Message } from 'element-ui'
import {exportExcel} from '@/utils/common'
const opt = {
  online: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '待支付',
      value: '0101'
    },
    {
      label: '支付成功',
      value: '0102'
    },
    {
      label: '支付取消',
      value: '0103'
    }
  ],
  offline: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '待确认',
      value: '0201'
    },
    {
      label: '支付成功',
      value: '0202'
    },
    {
      label: '支付取消',
      value: '0203'
    }
  ]
}
export default {
  data () {
    return {
      formInline: {
        // date: [moment().subtract('month', 1).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        date: [],
        orderId: '',
        rechargeType: '02',
        rechargeStatus: ''
      },
      options: opt.offline,
      pagesize: 10,
      currentPage: 1,
      tableData: [],
      tableTotal: 0,
      loading: false
    }
  },
  methods: {
    getParam () {
      return {
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        rechargeStatus: this.formInline.rechargeStatus,
        rechargeType: this.formInline.rechargeType,
        orderId: this.formInline.orderId,
        startDate: this.formInline.date[0],
        endDate: this.formInline.date[1]
      }
    },
    getList () {
      this.loading = true
      financeApi['FINANCECHARGELIST'](this.getParam()).then(response => {
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
    handleSizeChange (val) {
      this.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    handleConfirm (item, status) {
      financeApi['FINANCECHARGECONFIRM']({
        appId: item.appId,
        id: item.id,
        rechargeStatus: status
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.getList()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleCancel (item) {

    },
    handleChangeRadio (val) {
      if (val === '01') {
        this.options = opt.online
        this.formInline.rechargeStatus = ''
      } else if (val === '02') {
        this.options = opt.offline
        this.formInline.rechargeStatus = ''
      }
      this.getList()
    },
    onExport () {
      if (this.formInline.date.length === 0) {
        Message.warning({
          message: '请选择交易时间'
        })
        return false
      }
      if (this.tableData.length === 0) {
        Message.warning({
          message: '没有要导出的数据'
        })
        return false
      }
      financeApi['FINANCECHARGEEXPORT'](this.getParam()).then(response => {
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
      this.getList()
    }
  },
  created () {
    this.getList()
  }
}
</script>
