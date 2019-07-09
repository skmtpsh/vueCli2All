<template>
  <div>
    <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
      <el-form-item label="关键词：" prop="keyWord">
        <el-input v-model="form.keyWord" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item label="注册时间：" prop="date">
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
      <el-form-item label="请求时间：" prop="reqdate">
        <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          v-model="form.reqdate"
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
      <el-form-item label="排序方式：" prop="index">
        <el-radio-group v-model="form.index" size="small">
          <el-radio-button label="1">UV</el-radio-button>
          <el-radio-button label="2">浏览</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>查询</el-button>
        <el-button type="success" icon="el-icon-upload2" @click.native='onExport'>导表</el-button>
        <el-button type="info" icon="el-icon-circle-close-outline" @click.native="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      class="tableList"
      header-row-class-name="headname"
      style="width: 100%"
      stripe
      v-loading="page.loading"
      :data="page.tableData" >
      <el-table-column
        label="USERID"
        prop="userId">
      </el-table-column>
      <el-table-column
        label="渠道来源"
        prop="channelName">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="userName">
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="mobile">
      </el-table-column>
      <el-table-column
        label="注册时间"
        prop="registerTime">
        <template slot-scope="props">
          {{props.row.registerTime | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="近期登录时间"
        prop="lastLoginTime">
        <template slot-scope="props">
          {{props.row.lastLoginTime | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="产品浏览UV"
        prop="uvCount">
      </el-table-column>
      <el-table-column
        label="产品浏览PV"
        prop="pvCount">
      </el-table-column>
      <el-table-column
        label="活跃天数"
        prop="activeDays">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" size="mini" icon="el-icon-edit" type="warning" plain>查看</el-button>
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
    <dialogChannel :show.sync='dialog.visible' @change="handleDialogChange" :row.sync='modRow' v-if="dialog.visible" />
  </div>
</template>
<script>
import moment from 'moment'
import dialogChannel from './component/dialogProduct'
import userApi from '@/api/user'
import { pageMixin } from '@/views/component/mixin'
import { exportExcel } from '@/utils/common'
export default {
  mixins: [pageMixin],
  components: {
    dialogChannel
  },
  data () {
    return {
      // 查询条件相关
      form: {
        keyWord: '',
        index: 1,
        date: [moment().subtract(15, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        reqdate: [moment().subtract(15, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
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
        dataStartDate: this.form.reqdate.length > 0 ? this.form.reqdate[0] : '',
        dataEndDate: this.form.reqdate.length > 0 ? this.form.reqdate[1] : '',
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      }, this.form)
    },
    // 导出功能
    onExport () {
      userApi['USER_EXPORT'](Object.assign(
        this.getParam()
      )).then(response => {
        const result = response.data
        if (result.length === 0) {
          this.$message({
            message: '没有要导出的数据'
          })
          return false
        }
        exportExcel(result)
      }).catch(error => {
        console.log(error)
      })
    },
    // 查询
    getSyncList (option = {}) {
      this.page.loading = true
      userApi['USER_LIST'](Object.assign(
        this.getParam()
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
    this.getSyncList(this.form)
  }
}
</script>
