<template>
  <div>
    <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
      <el-form-item label="商户名称：" prop="merchantId">
        <el-select
          v-model="form.merchantId"
          filterable
          reserve-keyword
          placeholder="请输入所属商户"
          :loading="merchant.selLoading">
          <el-option key="全部" label="全部" value=""></el-option>
          <el-option
            v-for="item in merchant.options"
            :key="item.merchantId"
            :label="item.merchantName"
            :value="item.merchantId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间：" prop="date">
       <!-- <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          v-model="form.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker> -->
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
        <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>查询</el-button>
        <el-button type="info" icon="el-icon-circle-close-outline" @click.native="onReset">重置</el-button>
        <!-- <el-button type="danger" icon="el-icon-upload2" @click.native='onAdd'>添加产品</el-button> -->
      </el-form-item>
    </el-form>
    <el-row style="margin:0px 0 10px;">
      <el-col :span="24" >
        <el-button size="small" type="primary" icon="el-icon-edit-outline" @click.native='onAdd'>添加产品</el-button>
      </el-col>
    </el-row>
    <el-table
      class="tableList"
      header-row-class-name="headname"
      style="width: 100%"
      stripe
      v-loading="page.loading"
      :data="page.tableData" >
      <el-table-column
        label="产品编号"
        prop="productCode">
      </el-table-column>
      <el-table-column
        label="产品名称"
        prop="productName">
      </el-table-column>
      <el-table-column
        label="公司名称"
        prop="merchantName">
      </el-table-column>
      <el-table-column
        label="排序"
        prop="productSort">
      </el-table-column>
      <el-table-column
        label="结算方式"
        prop="computeWayName">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime">
        <template slot-scope="props">
          {{props.row.createTime | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="isEnable">
        <template slot-scope="props">
          <el-switch
          active-value='1'
          inactive-value='0'
          active-text="启用"
          inactive-text="关闭"
          active-icon-class="switchOpen"
          inactive-icon-class="switchClose"
          active-color="#13ce66"
          inactive-color="#ff4949"
          v-model="props.row.isEnable"
          @change="setIsOpen(props.row.isEnable, props.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" size="mini" icon="el-icon-view" type="primary" plain>查看</el-button> -->
          <el-button @click="handleEdit(scope.row)" v-if="scope.row.merchantIsEnable === '1'" size="mini" icon="el-icon-edit" type="warning" plain>编辑</el-button>
          <!-- <el-button @click="handleDel(scope.row)"  size="mini" icon="el-icon-delete" type="danger" plain>删除</el-button> -->
        </template>
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
    <dialogRecommend :show.sync='dialog.visible' @change="handleDialogChange" :row.sync='modRow' v-if="dialog.visible" />
  </div>
</template>
<script>
import moment from 'moment'
import dialogRecommend from './component/dialogRecommend'
import productApi from '@/api/product'
import { pageMixin } from '@/views/component/mixin'
export default {
  mixins: [pageMixin],
  components: {
    dialogRecommend
  },
  data () {
    return {
      // 查询条件相关
      form: {
        productName: '',
        merchantId: '',
        channelCode: '',
        date: [moment().subtract(15, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
      },
      merchant: {
        selLoading: false,
        options: []
      },
      channel: {
        selLoading: false,
        options: []
      },
      // 修改
      modRow: {}
    }
  },
  methods: {
    // 公用分页参数
    getParam () {
      return Object.assign({
        startDate: this.form.date.length > 0 ? this.form.date[0] : '',
        endDate: this.form.date.length > 0 ? this.form.date[1] : '',
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      }, this.form)
    },
    // 条件下拉
    getBusinessOption () {
      productApi['SELECT_COMBINE']().then(response => {
        const result = response.data
        if (result.code === 200) {
          this.merchant.options = result.datas.merchant
          this.channel.options = result.datas.channel
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 启用开关
    setIsOpen (isEnable, row) {
      this.upDateList(row, {isEnable, productId: row.id, productCode: row.productCode})
    },
    // 更新接口数据
    upDateList (row, updateObj = {}) {
      // 需要传多个额外参数的时候需要用到 assign
      productApi['RECOMMEND_STATUS'](Object.assign({}, updateObj)).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.getSyncList()
        } else {
          this.$message.warning({
            message: result.message
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 查询
    getSyncList (option = {}) {
      this.page.loading = true
      productApi['RECOMMEND_LIST'](Object.assign(
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
    this.getBusinessOption()
    this.getSyncList(this.form)
  }
}
</script>
