<template>
<div>
  <el-form :inline="true" :model="formInline" ref="formInline" size="mini" >
    <el-row>
      <el-col :lg="24" >
        <el-form-item label="公司ID：" prop="businessId">
          <el-input v-model="formInline.businessId" placeholder="公司ID"></el-input>
        </el-form-item>
        <el-form-item label="公司名称：" prop="businessName">
          <el-input v-model="formInline.businessName" placeholder="公司名称" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="contactMan">
          <el-input v-model="formInline.contactMan" placeholder="联系人"></el-input>
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
      label="公司名称"
      prop="businessName">
      <template slot-scope="props">
        <span @click="handleShowInfo(props.row.appId)">{{props.row.businessName}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="公司ID"
      prop="businessId">
    </el-table-column>
    <el-table-column
      label="联系人"
      prop="contactMan">
    </el-table-column>
    <el-table-column
      label="联系电话"
      prop="contactManMobile">
    </el-table-column>
    <el-table-column
      label="余额"
      prop="balance">
    </el-table-column>
    <el-table-column
      width="180"
      label="操作">
      <template slot-scope="props">
        <el-button type="primary" size="mini" icon="el-icon-document" round @click.native="handleInfo(props.row.appId)">详情</el-button>
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
  <el-dialog
    title="详情"
    :visible.sync="dialogVisibleAdd"
    width="60%">
    <el-table
      header-row-class-name="headname"
      v-loading="dialogLoading"
      :data="dialogTableData"
      style="width: 100%">
      <el-table-column
        width=""
        label="产品名称"
        prop="channelName">
      </el-table-column>
      <el-table-column
        width=""
        label="产品类型"
        prop="typeCode">
      </el-table-column>
      <el-table-column
        width=""
        label="计费模式"
        prop="feeTypeName">
      </el-table-column>
      <el-table-column
        width=""
        label="价格"
        prop="feeTypeId">
        <template slot-scope="props">
          {{ props.row.feeTypeId | FilterTypeId(props.row) }}
        </template>
      </el-table-column>
      <el-table-column
        width=""
        label="剩余总数"
        prop="cntReaminTotal">
        <template slot-scope="props">
          {{ props.row.feeTypeId != '14' && props.row.feeTypeId != '15' ? '-' : props.row.cntReaminTotal }}
        </template>
      </el-table-column>
      <el-table-column
        width=""
        label="起始日期"
        prop="startDate">
        <template slot-scope="props">
          {{ (props.row.feeTypeId != '14' && props.row.feeTypeId != '15' ? '-' : props.row.startDate) | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        width=""
        label="截止日期"
        prop="endDate">
        <template slot-scope="props">
          {{ (props.row.feeTypeId != '14' && props.row.feeTypeId != '15' ? '-' : props.row.endDate) | FilterTime }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange1"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next, jumper"
      :total="dialogTableTotal">
    </el-pagination>
  </el-dialog>
</div>
</template>
<script>
import financeApi from '@/api/finance'
import productApi from '@/api/product'
import { Message } from 'element-ui'
import {exportExcel} from '@/utils/common'
export default {
  data () {
    return {
      formInline: {
        businessName: '',
        businessId: '',
        contactMan: ''
      },
      pagesize: 10,
      currentPage: 1,
      tableData: [],
      tableTotal: 0,
      loading: false,
      dialogLoading: false,
      dialogVisibleAdd: false,
      dialogTableTotal: 0,
      dialogTableData: []
    }
  },
  methods: {
    getParam () {
      return {
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        businessName: this.formInline.businessName,
        businessId: this.formInline.businessId,
        contactMan: this.formInline.contactMan
      }
    },
    getList () {
      this.loading = true
      financeApi['FINANCEAMOUTLIST'](this.getParam()).then(response => {
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
    handleCurrentChange1 (val) {
      this.currentPage = val
      this.getDialogList(this.appId)
    },
    onExport () {
      if (this.tableData.length === 0) {
        Message.warning({
          message: '没有要导出的数据'
        })
        return false
      }
      financeApi['FINANCEAMOUTEXPORT'](this.getParam()).then(response => {
        let result = response.data
        exportExcel(result)
      }).catch(error => {
        console.log(error)
      })
    },
    handleInfo (appId) {
      this.dialogLoading = true
      this.dialogVisibleAdd = true
      this.getDialogList(appId)
    },
    getDialogList (appId) {
      this.dialogLoading = false
      this.appId = appId
      productApi['PRODUCTLIST']({
        appId: appId,
        pageNum: this.currentPage,
        pageSize: this.pagesize
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.dialogLoading = false
          this.dialogTableData = result.datas.list
          this.dialogTableTotal = result.datas.total
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 启用关闭
     */
    setIsOpen (isAllow, id) {
      financeApi['FINANCEALLOW']({
        id,
        isAllow
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.getList()
        }
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
  filters: {
    FilterTypeId (val, row) {
      let tempPrice = ''
      switch (val) {
        case '11':
          tempPrice = row.singleQueryPrice
          break
        case '12':
          tempPrice = row.singleQueryokPrice
          break
        case '13':
          tempPrice = '-'
          break
        case '16':
          tempPrice = row.singleHitPrice
          break
        case '14':
          tempPrice = row.monthPrice
          break
        case '15':
          tempPrice = row.yearPrice
          break
        default:
          break
      }
      return tempPrice
    }
  },
  created () {
    this.getList()
  }
}
</script>
